#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import chalk from "chalk";
import yaml from "js-yaml";
import fs from "fs";
import { FileScanner } from "./scanner/fileScanner";
import { ComponentParser } from "./parser/componentParser";
import { DataAggregator } from "./aggregator/dataAggregator";
import { HtmlReporter } from "./reporter/htmlReporter";
import { AnalysisConfig, MfeInfo, MrcSourceType } from "./types";

// Define the program
const program = new Command();

program
	.name("mrc-usage-report")
	.description("Generate a report on MRC component usage across MFEs")
	.version("1.0.0")
	.option("-o, --output <path>", "Output directory for the report", "./reports")
	.option("-f, --format <format...>", "Output format (html, json, yaml, csv)", "html")
	.option("-m, --mfes <mfes>", "Comma-separated list of MFEs to analyze")
	.option("--all", "Scan all MFEs across maas-ui, maas-ops-ui, and broker-manager")
	.option("--mrc-path <path>", "Path to the maas-react-components repository", path.resolve(process.cwd(), "../.."))
	.option("--maas-ui-path <path>", "Path to the maas-ui repository", "../../maas-ui")
	.option("--maas-ops-ui-path <path>", "Path to the maas-ops-ui repository", "../../maas-ops-ui")
	.option("--broker-manager-path <path>", "Path to the broker-manager repository", "../../broker-manager")
	.option("--base-path <path>", "Base path for the project", process.cwd())
	.option("-s, --source <type>", "Source type for MRC components (local or github)", "local")
	.option("-g, --github", "Use GitHub as the source for MRC components (shorthand for -s github)")
	.option(
		"--github-url <url>",
		"GitHub repository URL for MRC components",
		"https://github.com/SolaceDev/maas-react-components"
	)
	.option("--github-branch <branch>", "Branch name for GitHub repository", "main")
	.parse(process.argv);

const options = program.opts();

// If -g flag is used, set source type to github
if (options.github) {
	options.source = "github";
}

// Main function
async function main() {
	try {
		console.log(chalk.blue("MRC Component Usage Report Generator"));
		console.log(chalk.gray("----------------------------------------"));

		// Validate options
		if (!options.mfes && !options.all) {
			console.error(chalk.red("Error: Either --mfes or --all must be specified."));
			program.help();
			process.exit(1);
		}

		if (options.mfes && options.all) {
			console.error(chalk.red("Error: --mfes and --all cannot be used together."));
			program.help();
			process.exit(1);
		}

		// Parse options
		const basePath = path.resolve(options.basePath);
		const mrcPath = path.resolve(options.mrcPath);
		const outputDir = path.resolve(options.output);
		const outputFormat = options.format as "html" | "json" | "yaml" | "csv";
		const mrcSourceType = options.source as MrcSourceType;
		const mrcGithubUrl = options.githubUrl;
		const mrcGithubBranch = options.githubBranch;

		// Discover MFEs
		const mfeInfos = await discoverMfes(
			options.maasUiPath,
			options.maasOpsUiPath,
			options.brokerManagerPath,
			options.mfes,
			options.all
		);
		const mfes = mfeInfos.map((info) => info.name);

		// Create config
		const config: AnalysisConfig = {
			mfes,
			mrcPath,
			outputDir,
			outputFormat,
			mrcSourceType,
			mrcGithubUrl,
			mrcGithubBranch,
			mfeInfos
		};

		console.log(chalk.yellow("Configuration:"));
		console.log(`  Base Path: ${basePath}`);
		console.log(`  MRC Path: ${mrcPath}`);
		console.log(`  MFEs: ${mfes.join(", ")}`);
		console.log(`  Output Directory: ${outputDir}`);
		console.log(`  Output Format: ${outputFormat}`);
		console.log(`  MRC Source Type: ${mrcSourceType}`);
		if (mrcSourceType === "github") {
			console.log(`  MRC GitHub URL: ${mrcGithubUrl}`);
			console.log(`  MRC GitHub Branch: ${mrcGithubBranch}`);
		}
		console.log("");

		// Step 1: Scan for files
		console.log(chalk.yellow("Step 1: Scanning for files..."));
		const fileScanner = new FileScanner(basePath, mfeInfos, mrcSourceType, mrcGithubUrl, mrcGithubBranch);
		const files = await fileScanner.scanForFiles();
		console.log(`Found ${files.length} files to analyze`);

		// Step 2: Scan for MRC components
		console.log(chalk.yellow("Step 2: Scanning for MRC components..."));
		const componentFiles = await fileScanner.scanForMrcComponents(mrcPath);
		console.log(`Found ${componentFiles.length} MRC component files`);

		// Get component information
		const allComponents = await fileScanner.getMrcComponentInfo(componentFiles, mrcPath);

		// Step 3: Parse files for component usage
		console.log(chalk.yellow("Step 3: Parsing files for component usage..."));
		const componentParser = new ComponentParser(mrcPath, mrcSourceType);
		await componentParser.initialize(allComponents);

		let totalUsages = 0;
		const allUsages = [];

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const fileMfeInfo = mfeInfos.find((info) => file.startsWith(info.path));
			if (!fileMfeInfo) {
				console.warn(`Could not determine MFE for file: ${file}`);
				continue;
			}

			try {
				const usages = await componentParser.parseFile(file, fileMfeInfo.name);
				totalUsages += usages.length;
				allUsages.push(...usages);

				// Log progress every 100 files
				if ((i + 1) % 100 === 0 || i === files.length - 1) {
					console.log(`  Processed ${i + 1}/${files.length} files, found ${totalUsages} component usages so far`);
				}
			} catch (error) {
				console.error(`Error parsing file ${file}:`, error);
			}
		}

		console.log(`Found ${totalUsages} total component usages`);

		// Step 4: Detect MRC versions for each MFE
		console.log(chalk.yellow("Step 4: Detecting MRC versions..."));
		const mrcVersions: Record<string, string> = {};

		for (const mfeInfo of mfeInfos) {
			try {
				const packageJsonPath = path.join(mfeInfo.path, "package.json");

				if (fs.existsSync(packageJsonPath)) {
					const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

					// Check dependencies and devDependencies
					const dependencies = packageJson.dependencies || {};
					const devDependencies = packageJson.devDependencies || {};

					// Look for MRC package
					const mrcPackageName = "@SolaceDev/maas-react-components";

					if (dependencies[mrcPackageName]) {
						mrcVersions[mfeInfo.name] = dependencies[mrcPackageName];
						console.log(`  ${mfeInfo.name}: MRC version ${dependencies[mrcPackageName]}`);
					} else if (devDependencies[mrcPackageName]) {
						mrcVersions[mfeInfo.name] = devDependencies[mrcPackageName];
						console.log(`  ${mfeInfo.name}: MRC version ${devDependencies[mrcPackageName]}`);
					} else {
						mrcVersions[mfeInfo.name] = "not found";
						console.log(`  ${mfeInfo.name}: MRC version not found`);
					}
				} else {
					mrcVersions[mfeInfo.name] = "package.json not found";
					console.log(`  ${mfeInfo.name}: package.json not found`);
				}
			} catch (error) {
				mrcVersions[mfeInfo.name] = "error";
				console.error(`  Error getting MRC version for ${mfeInfo.name}:`, error);
			}
		}

		// Step 5: Aggregate data
		console.log(chalk.yellow("Step 5: Aggregating data..."));
		const dataAggregator = new DataAggregator();
		const reportData = dataAggregator.aggregate(allUsages, config, allComponents, mrcVersions);
		console.log(`Generated report data with ${reportData.componentStats.length} component statistics`);
		console.log(`Found ${reportData.unusedComponents.length} unused components`);

		// Step 5: Generate report
		console.log(chalk.yellow("Step 5: Generating report..."));
		const reportName = options.all ? "mrc-usage-report-all" : `mrc-usage-report-${mfes.join("-")}`;

		let outputFormats: string[];
		if (Array.isArray(options.format)) {
			outputFormats = options.format;
		} else if (typeof options.format === "string") {
			// Split by comma and trim whitespace from each part
			outputFormats = options.format
				.split(",")
				.map((format) => format.trim())
				.filter(Boolean);
		} else {
			// Handle cases where format might be undefined or null, default to ['html']
			outputFormats = ["html"];
		}

		for (const format of outputFormats) {
			const currentOutputPath = path.join(outputDir, `${reportName}.${format}`);

			if (format === "html") {
				const htmlReporter = new HtmlReporter();
				await htmlReporter.generateReport(reportData, currentOutputPath);
				console.log(`HTML report generated at ${currentOutputPath}`);
			} else if (format === "json") {
				const jsonOutput = JSON.stringify(reportData, null, 2);
				require("fs").writeFileSync(currentOutputPath, jsonOutput);
				console.log(`JSON report generated at ${currentOutputPath}`);
			} else if (format === "yaml") {
				const yamlOutput = yaml.dump(reportData, { indent: 2 });
				require("fs").writeFileSync(currentOutputPath, yamlOutput);
				console.log(`YAML report generated at ${currentOutputPath}`);
			} else if (format === "csv") {
				console.error("CSV format not yet implemented");
				// Optionally, you could decide to exit or continue if other formats are requested
			} else {
				console.error(`Unsupported format: ${format}`);
			}
		}

		console.log(chalk.green("Report generation completed successfully!"));
	} catch (error) {
		console.error(chalk.red("Error generating report:"), error);
		process.exit(1);
	}
}

async function discoverMfes(
	maasUiPath: string,
	maasOpsUiPath: string,
	brokerManagerPath: string,
	mfesOption: string,
	allOption: boolean
): Promise<MfeInfo[]> {
	const mfeInfos: MfeInfo[] = [];

	if (allOption) {
		// Discover all MFEs in maas-ui
		const excludedMfes = ["api-products", "msc"];
		const maasUiMfePath = path.join(maasUiPath, "micro-frontends");
		const maasUiMfes = fs
			.readdirSync(maasUiMfePath)
			.filter((file) => fs.statSync(path.join(maasUiMfePath, file)).isDirectory())
			.filter((mfe) => fs.existsSync(path.join(maasUiMfePath, mfe, "package.json")))
			.filter((mfe) => !excludedMfes.includes(mfe));
		for (const mfe of maasUiMfes) {
			mfeInfos.push({
				name: mfe,
				path: path.join(maasUiMfePath, mfe),
				repository: "maas-ui"
			});
		}

		// Discover all MFEs in maas-ops-ui
		const maasOpsUiMfePath = path.join(maasOpsUiPath, "micro-frontends");
		const maasOpsUiMfes = fs
			.readdirSync(maasOpsUiMfePath)
			.filter((file) => fs.statSync(path.join(maasOpsUiMfePath, file)).isDirectory())
			.filter((mfe) => fs.existsSync(path.join(maasOpsUiMfePath, mfe, "package.json")));
		for (const mfe of maasOpsUiMfes) {
			mfeInfos.push({
				name: mfe,
				path: path.join(maasOpsUiMfePath, mfe),
				repository: "maas-ops-ui"
			});
		}

		// Add broker-manager
		mfeInfos.push({
			name: "broker-manager",
			path: brokerManagerPath,
			repository: "broker-manager"
		});
	} else {
		const mfes = mfesOption.split(",").filter(Boolean);
		for (const mfe of mfes) {
			if (mfe === "broker-manager") {
				mfeInfos.push({
					name: "broker-manager",
					path: brokerManagerPath,
					repository: "broker-manager"
				});
			} else {
				// Assume MFEs are in maas-ui, but check maas-ops-ui if not found
				let mfePath = path.join(maasUiPath, "micro-frontends", mfe);
				let repository = "maas-ui";
				if (!fs.existsSync(mfePath)) {
					mfePath = path.join(maasOpsUiPath, "micro-frontends", mfe);
					repository = "maas-ops-ui";
				}

				if (fs.existsSync(mfePath)) {
					mfeInfos.push({
						name: mfe,
						path: mfePath,
						repository
					});
				} else {
					console.warn(`MFE not found in maas-ui or maas-ops-ui: ${mfe}`);
				}
			}
		}
	}

	return mfeInfos;
}

// Run the main function
main();
