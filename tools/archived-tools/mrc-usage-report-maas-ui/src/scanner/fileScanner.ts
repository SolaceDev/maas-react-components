import path from "path";
import fs from "fs";
import { promisify } from "util";
import { exec } from "child_process";
import os from "os";
import axios from "axios";
import { MrcSourceType } from "../types";

const execPromise = promisify(exec);

// Regular expression to match export statements like:
// export { default as ComponentName } from "./path/to/Component";
const EXPORT_REGEX = /export\s*{\s*default\s+as\s+([A-Za-z0-9_]+)\s*}\s*from\s*["'](.+)["'];?/g;

/**
 * Scans for files in the specified MFEs
 */
export class FileScanner {
	private basePath: string;
	private mfes: string[];
	private mrcSourceType: MrcSourceType;
	private mrcGithubUrl?: string;
	private mrcGithubBranch: string;
	private tempDir?: string;

	constructor(basePath: string, mfes: string[], mrcSourceType: MrcSourceType = "local", mrcGithubUrl?: string, mrcGithubBranch: string = "main") {
		this.basePath = basePath;
		this.mfes = mfes;
		this.mrcSourceType = mrcSourceType;
		this.mrcGithubUrl = mrcGithubUrl;
		this.mrcGithubBranch = mrcGithubBranch;
	}

	/**
	 * Scans for all TypeScript and JavaScript files in the specified MFEs
	 * @returns Array of file paths
	 */
	async scanForFiles(): Promise<string[]> {
		const allFiles: string[] = [];

		for (const mfe of this.mfes) {
			const mfePath = path.join(this.basePath, "micro-frontends", mfe);

			// Check if the MFE directory exists
			if (!fs.existsSync(mfePath)) {
				console.warn(`MFE directory not found: ${mfePath}`);
				continue;
			}

			try {
				// Use find command to locate all TypeScript and JavaScript files
				const { stdout } = await execPromise(
					`find ${mfePath}/src -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \\) -not -path "*/node_modules/*" -not -name "*.d.ts" -not -name "*.test.*" -not -name "*.spec.*"`
				);

				const files = stdout.trim().split("\n").filter(Boolean);
				allFiles.push(...files);
			} catch (error) {
				console.error(`Error scanning files in ${mfePath}:`, error);
			}
		}

		return allFiles;
	}

	/**
	 * Extracts owner and repo from GitHub URL
	 * @param githubUrl GitHub repository URL
	 * @returns Object containing owner and repo
	 */
	private parseGithubUrl(githubUrl: string): { owner: string; repo: string } {
		// Handle URLs like https://github.com/owner/repo
		const urlMatch = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
		if (urlMatch) {
			return {
				owner: urlMatch[1],
				repo: urlMatch[2].replace(/\.git$/, "") // Remove .git if present
			};
		}
		throw new Error(`Invalid GitHub URL: ${githubUrl}`);
	}

	/**
	 * Gets the GitHub authentication token from environment variable
	 * @returns GitHub authentication token or undefined if not available
	 */
	private getGithubToken(): string | undefined {
		return process.env.GITHUB_TOKEN;
	}

	/**
	 * Fetches a file from GitHub API
	 * @param owner Repository owner
	 * @param repo Repository name
	 * @param path File path within the repository
	 * @param branch Branch name (default: main)
	 * @returns File content as string
	 */
	private async fetchFileFromGithub(owner: string, repo: string, path: string, branch?: string): Promise<string> {
		branch = branch || this.mrcGithubBranch;
		try {
			const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
			console.log(`Fetching file from GitHub: ${url}`);

			const headers: Record<string, string> = {};
			const token = this.getGithubToken();
			if (token) {
				headers.Authorization = `token ${token}`;
			}

			const response = await axios.get(url, { headers });
			return response.data;
		} catch (error) {
			console.error(`Error fetching file from GitHub:`, error);
			throw new Error(`Failed to fetch file from GitHub: ${path}`);
		}
	}

	/**
	 * Fetches directory contents from GitHub API
	 * @param owner Repository owner
	 * @param repo Repository name
	 * @param path Directory path within the repository
	 * @param branch Branch name (default: main)
	 * @returns Array of file paths
	 */
	private async fetchDirectoryFromGithub(owner: string, repo: string, path: string, branch?: string): Promise<string[]> {
		branch = branch || this.mrcGithubBranch;
		try {
			const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
			console.log(`Fetching directory from GitHub API: ${url}`);

			const headers: Record<string, string> = {
				Accept: "application/vnd.github.v3+json"
			};

			const token = this.getGithubToken();
			if (token) {
				headers.Authorization = `token ${token}`;
			}

			const response = await axios.get(url, { headers });

			// Process the response to extract file paths
			const files: string[] = [];
			const processItems = async (items: any[]) => {
				for (const item of items) {
					if (item.type === "file") {
						files.push(item.path);
					} else if (item.type === "dir") {
						// Recursively fetch subdirectory contents
						const subdirUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${item.path}?ref=${branch}`;
						const subdirResponse = await axios.get(subdirUrl, { headers });
						await processItems(subdirResponse.data);
					}
				}
			};

			await processItems(response.data);
			return files;
		} catch (error) {
			console.error(`Error fetching directory from GitHub:`, error);
			throw new Error(`Failed to fetch directory from GitHub: ${path}`);
		}
	}

	/**
	 * Prepares the MRC path based on the source type
	 * @param mrcPath Path to the MRC repository (used for local source type)
	 * @returns The path to the MRC repository or null if using GitHub API
	 */
	async prepareMrcPath(mrcPath: string): Promise<string | null> {
		// If source type is local, use the provided path
		if (this.mrcSourceType === "local") {
			return mrcPath;
		}

		// If source type is github, we'll use the GitHub API directly
		if (this.mrcSourceType === "github" && this.mrcGithubUrl) {
			console.log(`Using GitHub API for ${this.mrcGithubUrl}`);
			return null; // Return null to indicate we're using GitHub API
		}

		throw new Error("Invalid MRC source configuration");
	}

	/**
	 * Scans for all MRC components in the MRC repository
	 * @param mrcPath Path to the MRC repository
	 * @returns Array of MRC component paths
	 */
	async scanForMrcComponents(mrcPath: string): Promise<string[]> {
		// If using GitHub API, we don't need the local path
		if (this.mrcSourceType === "github" && this.mrcGithubUrl) {
			try {
				const { owner, repo } = this.parseGithubUrl(this.mrcGithubUrl);
				console.log(`Scanning for MRC components in GitHub repository: ${owner}/${repo}`);

				// Fetch all files in the components directory
				const files = await this.fetchDirectoryFromGithub(owner, repo, "src/components");

				// Filter out unwanted components
				const filteredFiles = files.filter((file) => {
					// Only include TypeScript/TSX files
					if (!file.endsWith(".ts") && !file.endsWith(".tsx")) return false;
					// Exclude test and definition files
					if (file.endsWith(".d.ts") || file.includes(".test.") || file.includes(".spec.")) return false;

					const fileName = path.basename(file);
					const componentName = path.parse(fileName).name;

					// Check if the file is in the table/components subdirectory
					const isInTableComponents = file.includes("/table/components/");

					// Exclude components with "Props", "Utils", "utils", "Icon" in the name,
					// React hooks (starting with "use"), and files in table/components subdirectory
					const shouldExclude =
						componentName.includes("Props") ||
						componentName.includes("Utils") ||
						componentName.toLowerCase().includes("utils") ||
						componentName.includes("Icon") ||
						componentName.startsWith("use") ||
						isInTableComponents;

					return !shouldExclude;
				});

				console.log(`Found ${filteredFiles.length} component files in GitHub repository`);
				return filteredFiles;
			} catch (error) {
				console.error(`Error scanning MRC components from GitHub:`, error);
				return [];
			}
		}

		// If using local path
		// Prepare the MRC path based on the source type
		const actualMrcPath = await this.prepareMrcPath(mrcPath);

		if (actualMrcPath) {
			const componentsPath = path.join(actualMrcPath, "src", "components");

			// Check if the components directory exists
			if (!fs.existsSync(componentsPath)) {
				throw new Error(`MRC components directory not found: ${componentsPath}`);
			}

			try {
				// Use find command to locate all component files
				const { stdout } = await execPromise(`find ${componentsPath} -type f \\( -name "*.ts" -o -name "*.tsx" \\) -not -name "*.d.ts" -not -name "*.test.*" -not -name "*.spec.*"`);

				// Filter out unwanted components
				const allFiles = stdout.trim().split("\n").filter(Boolean);
				const filteredFiles = allFiles.filter((file) => {
					const fileName = path.basename(file);
					const componentName = path.parse(fileName).name;

					// Check if the file is in the table/components subdirectory
					const isInTableComponents = file.includes("/table/components/");

					// Exclude components with "Props", "Utils", "utils", "Icon" in the name,
					// React hooks (starting with "use"), and files in table/components subdirectory
					const shouldExclude =
						componentName.includes("Props") ||
						componentName.includes("Utils") ||
						componentName.toLowerCase().includes("utils") ||
						componentName.includes("Icon") ||
						componentName.startsWith("use") ||
						isInTableComponents;

					return !shouldExclude;
				});

				console.log(`Filtered out ${allFiles.length - filteredFiles.length} components (Props, Utils/utils, Icon, hooks, table/components)`);

				return filteredFiles;
			} catch (error) {
				console.error(`Error scanning MRC components:`, error);
				return [];
			}
		}

		throw new Error("Invalid MRC source configuration");
	}

	/**
	 * Gets information about MRC components
	 * @param componentFiles Array of component file paths
	 * @param mrcPath Path to the MRC repository
	 * @returns Array of MRC component information
	 */
	async getMrcComponentInfo(componentFiles: string[], mrcPath: string): Promise<{ name: string; path: string }[]> {
		// Get export mappings from index.tsx
		const exportMappings = await this.getExportMappings(mrcPath);

		// If using GitHub API
		if (this.mrcSourceType === "github" && this.mrcGithubUrl) {
			// For GitHub, we need to match based on the relative path within the repository
			return componentFiles.map((file) => {
				// Try to find the export name for this file
				for (const [exportName, relativePath] of exportMappings) {
					// The file path from GitHub API will be something like "src/components/Button/Button.tsx"
					// The relativePath from index.tsx will be something like "./components/Button/Button"
					// We need to normalize them for comparison
					const normalizedFilePath = file.replace(/\.tsx?$/, ""); // Remove extension
					const normalizedRelativePath = relativePath.replace(/^\.\//, ""); // Remove leading ./

					if (normalizedFilePath.endsWith(normalizedRelativePath)) {
						return {
							name: exportName,
							path: file
						};
					}
				}

				// Fallback to using the file name if no export mapping is found
				const fileName = path.basename(file);
				const componentName = path.parse(fileName).name;
				return {
					name: componentName,
					path: file
				};
			});
		} else {
			// For local path, use the original approach
			// Create a mapping from file path to exported component name
			const filePathToExportName = new Map<string, string>();

			for (const [exportName, relativePath] of exportMappings) {
				// Convert relative path to absolute path
				const absolutePath = path.resolve(path.join(mrcPath, "src"), relativePath);
				filePathToExportName.set(absolutePath, exportName);
			}

			return componentFiles.map((file) => {
				// Check if we have an export mapping for this file
				const resolvedPath = path.resolve(file);

				// Try to find the export name for this file
				for (const [filePath, exportName] of filePathToExportName.entries()) {
					// Need to handle both with and without file extension
					const filePathWithoutExt = filePath.replace(/\.[^/.]+$/, "");
					const resolvedPathWithoutExt = resolvedPath.replace(/\.[^/.]+$/, "");

					if (resolvedPath === filePath || resolvedPathWithoutExt === filePathWithoutExt) {
						return {
							name: exportName,
							path: file
						};
					}
				}

				// Fallback to using the file name if no export mapping is found
				const fileName = path.basename(file);
				const componentName = path.parse(fileName).name;
				return {
					name: componentName,
					path: file
				};
			});
		}
	}

	/**
	 * Extracts export mappings from the MRC index.tsx file
	 * @param mrcPath Path to the MRC repository
	 * @returns Map of export name to relative file path
	 */
	private async getExportMappings(mrcPath: string): Promise<Map<string, string>> {
		const mappings = new Map<string, string>();
		let content: string;

		// If using GitHub API
		if (this.mrcSourceType === "github" && this.mrcGithubUrl) {
			try {
				const { owner, repo } = this.parseGithubUrl(this.mrcGithubUrl);
				console.log(`Fetching index.tsx from GitHub repository: ${owner}/${repo}`);
				content = await this.fetchFileFromGithub(owner, repo, "src/index.tsx");
				console.log(`Successfully fetched index.tsx from GitHub`);
				console.log(`First 500 characters of content: ${content.substring(0, 500)}...`);
			} catch (error) {
				console.error(`Error fetching index.tsx from GitHub:`, error);
				return mappings;
			}
		} else {
			// If using local path
			const indexPath = path.join(mrcPath, "src", "index.tsx");
			if (!fs.existsSync(indexPath)) {
				console.warn(`MRC index.tsx not found at ${indexPath}`);
				return mappings;
			}

			try {
				content = fs.readFileSync(indexPath, "utf-8");
				console.log(`Reading MRC index.tsx from ${indexPath}`);
				console.log(`First 500 characters of content: ${content.substring(0, 500)}...`);
			} catch (error) {
				console.error(`Error reading index.tsx:`, error);
				return mappings;
			}
		}

		try {
			let match;
			let matchCount = 0;
			let excludedCount = 0;

			while ((match = EXPORT_REGEX.exec(content)) !== null) {
				const exportName = match[1];
				const relativePath = match[2];

				// Check if the relative path is in the table/components subdirectory
				const isInTableComponents = relativePath.includes("/table/components/");

				// Exclude components with "Props", "Utils", "utils", "Icon" in the name,
				// React hooks (starting with "use"), and components from table/components subdirectory
				const shouldExclude =
					exportName.includes("Props") ||
					exportName.includes("Utils") ||
					exportName.toLowerCase().includes("utils") ||
					exportName.includes("Icon") ||
					exportName.startsWith("use") ||
					isInTableComponents;

				if (shouldExclude) {
					excludedCount++;
					continue;
				}

				mappings.set(exportName, relativePath);
				matchCount++;

				// Log the first few matches for debugging
				if (matchCount <= 5) {
					console.log(`Export mapping found: ${exportName} from ${relativePath}`);
				}
			}

			console.log(`Found ${mappings.size} export mappings in index.tsx (excluded ${excludedCount} Props/Utils/Icon/hooks)`);

			// Log a few examples of mappings where the export name differs from the file name
			let diffCount = 0;
			for (const [exportName, relativePath] of mappings.entries()) {
				const fileName = path.basename(relativePath);
				const fileNameWithoutExt = path.parse(fileName).name;

				if (exportName !== fileNameWithoutExt) {
					console.log(`Different naming: Export ${exportName} -> File ${fileNameWithoutExt}`);
					diffCount++;
					if (diffCount >= 5) break;
				}
			}

			return mappings;
		} catch (error) {
			console.error(`Error parsing MRC index.tsx:`, error);
			return mappings;
		}
	}
}
