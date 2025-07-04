"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileScanner = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const child_process_1 = require("child_process");
const axios_1 = __importDefault(require("axios"));
const execPromise = (0, util_1.promisify)(child_process_1.exec);
// Regular expression to match export statements like:
// export { default as ComponentName } from "./path/to/Component";
const EXPORT_REGEX = /export\s*{\s*default\s*as\s*([A-Za-z0-9_]+)\s*}\s*from\s*["'](.*?)["'];?/g;
/**
 * Scans for files in the specified MFEs
 */
class FileScanner {
    constructor(basePath, mfes, mrcSourceType = "local", mrcGithubUrl, mrcGithubBranch = "main") {
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
    scanForFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const allFiles = [];
            if (this.mfes.length === 0) {
                // No specific MFEs, scan the entire base path
                const mfePath = this.basePath;
                if (!fs_1.default.existsSync(mfePath)) {
                    console.warn(`Base path not found: ${mfePath}`);
                    return [];
                }
                try {
                    const { stdout } = yield execPromise(`find ${mfePath} -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \\) -not -path "*/node_modules/*" -not -path "*/dist/*" -not -path "*/build/*" -not -name "*.d.ts" -not -name "*.test.*" -not -name "*.spec.*"`);
                    const files = stdout.trim().split("\n").filter(Boolean);
                    allFiles.push(...files);
                }
                catch (error) {
                    console.error(`Error scanning files in ${mfePath}:`, error);
                }
            }
            else {
                // Scan specified MFEs
                for (const mfe of this.mfes) {
                    const mfePath = mfe === "broker-manager"
                        ? this.basePath
                        : path_1.default.join(this.basePath, mfe);
                    if (!fs_1.default.existsSync(mfePath)) {
                        console.warn(`MFE directory not found: ${mfePath}`);
                        continue;
                    }
                    try {
                        const { stdout } = yield execPromise(`find ${mfePath}/src -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \\) -not -path "*/node_modules/*" -not -name "*.d.ts" -not -name "*.test.*" -not -name "*.spec.*"`);
                        const files = stdout.trim().split("\n").filter(Boolean);
                        allFiles.push(...files);
                    }
                    catch (error) {
                        console.error(`Error scanning files in ${mfePath}:`, error);
                    }
                }
            }
            return allFiles;
        });
    }
    /**
     * Extracts owner and repo from GitHub URL
     * @param githubUrl GitHub repository URL
     * @returns Object containing owner and repo
     */
    parseGithubUrl(githubUrl) {
        // Handle URLs like https://github.com/owner/repo or git@github.com:owner/repo.git
        const urlMatch = githubUrl.match(/github\.com[/:]([^/]+)\/([^/]+?)(\.git)?$/);
        if (urlMatch) {
            return {
                owner: urlMatch[1],
                repo: urlMatch[2].replace(/\.git$/, ""), // Remove .git if present
            };
        }
        throw new Error(`Invalid GitHub URL: ${githubUrl}`);
    }
    /**
     * Gets GitHub authentication token from environment variable
     * @returns GitHub authentication token or undefined if not available
     */
    getGithubToken() {
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
    fetchFileFromGithub(owner, repo, path, branch) {
        return __awaiter(this, void 0, void 0, function* () {
            branch = branch || this.mrcGithubBranch;
            try {
                const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
                console.log(`Fetching file from GitHub: ${url}`);
                const headers = {};
                const token = this.getGithubToken();
                if (token) {
                    headers.Authorization = `token ${token}`;
                }
                const response = yield axios_1.default.get(url, { headers });
                return response.data;
            }
            catch (error) {
                console.error(`Error fetching file from GitHub:`, error);
                throw new Error(`Failed to fetch file from GitHub: ${path}`);
            }
        });
    }
    /**
     * Fetches directory contents from GitHub API
     * @param owner Repository owner
     * @param repo Repository name
     * @param path Directory path within the repository
     * @param branch Branch name (default: main)
     * @returns Array of file paths
     */
    fetchDirectoryFromGithub(owner, repo, path, branch) {
        return __awaiter(this, void 0, void 0, function* () {
            branch = branch || this.mrcGithubBranch;
            try {
                const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
                console.log(`Fetching directory from GitHub API: ${url}`);
                const headers = {
                    Accept: "application/vnd.github.v3+json",
                };
                const token = this.getGithubToken();
                if (token) {
                    headers.Authorization = `token ${token}`;
                }
                const response = yield axios_1.default.get(url, { headers });
                // Process the response to extract file paths
                const files = [];
                const processItems = (items) => __awaiter(this, void 0, void 0, function* () {
                    for (const item of items) {
                        if (item.type === "file") {
                            files.push(item.path);
                        }
                        else if (item.type === "dir") {
                            // Recursively fetch subdirectory contents
                            const subDirUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${item.path}?ref=${branch}`;
                            const subDirResponse = yield axios_1.default.get(subDirUrl, { headers });
                            yield processItems(subDirResponse.data);
                        }
                    }
                });
                yield processItems(response.data);
                return files;
            }
            catch (error) {
                console.error(`Error fetching directory from GitHub:`, error);
                throw new Error(`Failed to fetch directory from GitHub: ${path}`);
            }
        });
    }
    /**
     * Prepares the MRC path based on the source type.
     * If source type is local, returns the provided path.
     * If source type is github, returns null to indicate GitHub API usage.
     */
    prepareMrcPath(mrcPath) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    /**
     * Scans for all MRC components in the MRC repository
     * @param mrcPath Path to the MRC repository
     * @returns Array of MRC component paths
     */
    scanForMrcComponents(mrcPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const allComponents = [];
            // If using GitHub API
            if (this.mrcSourceType === "github" && this.mrcGithubUrl) {
                try {
                    const { owner, repo } = this.parseGithubUrl(this.mrcGithubUrl);
                    console.log(`Scanning for MRC components in GitHub repository: ${owner}/${repo}`);
                    // Fetch all files in the components directory to find index.ts/tsx files
                    const files = yield this.fetchDirectoryFromGithub(owner, repo, "src/components");
                    for (const file of files) {
                        // Only process index.ts or index.tsx files
                        if (file.endsWith("index.ts") || file.endsWith("index.tsx")) {
                            const fileContent = yield this.fetchFileFromGithub(owner, repo, file, this.mrcGithubBranch);
                            // Reset regex lastIndex for each file
                            EXPORT_REGEX.lastIndex = 0;
                            const match = EXPORT_REGEX.exec(fileContent);
                            if (match && match[1] && match[2]) {
                                const componentName = match[1];
                                const relativePath = match[2];
                                // Construct the full path to the actual component file
                                // The relativePath is relative to the index.ts file's directory
                                const componentDir = path_1.default.dirname(file);
                                const fullComponentPath = path_1.default.join(componentDir, relativePath);
                                // Assuming .tsx or .ts extension for the actual component file
                                let finalComponentPath = fullComponentPath;
                                if (!finalComponentPath.endsWith(".ts") &&
                                    !finalComponentPath.endsWith(".tsx")) {
                                    // Try .tsx first, then .ts
                                    // Note: For GitHub, we can't check fs.existsSync directly.
                                    // We'll assume .tsx for now or rely on the parser to handle it.
                                    // For a more robust solution, we'd need to list files in the componentDir on GitHub.
                                    finalComponentPath += ".tsx"; // Default to .tsx for GitHub
                                }
                                allComponents.push({
                                    name: componentName,
                                    path: finalComponentPath,
                                });
                            }
                        }
                    }
                    console.log(`Found ${allComponents.length} component files in GitHub repository`);
                    return allComponents;
                }
                catch (error) {
                    console.error(`Error scanning MRC components from GitHub:`, error);
                    return [];
                }
            }
            // If using local path
            const actualMrcPath = yield this.prepareMrcPath(mrcPath);
            if (actualMrcPath) {
                const componentsPath = path_1.default.join(actualMrcPath, "src", "components");
                // Check if the components directory exists
                if (!fs_1.default.existsSync(componentsPath)) {
                    throw new Error(`MRC components directory not found: ${componentsPath}`);
                }
                try {
                    // Use find command to locate all index.ts/tsx files within component subdirectories
                    const { stdout } = yield execPromise(`find ${componentsPath} -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \\) -not -path "*/node_modules/*" -not -path "*/dist/*" -not -path "*/build/*" -not -name "*.d.ts" -not -name "*.test.*" -not -name "*.spec.*"`);
                    const componentFiles = stdout.trim().split("\n").filter(Boolean);
                    for (const file of componentFiles) {
                        const componentName = path_1.default.basename(file, path_1.default.extname(file));
                        allComponents.push({ name: componentName, path: file });
                    }
                    console.log(`Found ${allComponents.length} MRC components from local path`);
                    return allComponents;
                }
                catch (error) {
                    console.error(`Error scanning MRC components:`, error);
                    return [];
                }
            }
            throw new Error("Invalid MRC source configuration");
        });
    }
}
exports.FileScanner = FileScanner;
