#!/usr/bin/env node
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
const commander_1 = require("commander");
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const fileScanner_1 = require("./scanner/fileScanner");
const componentParser_1 = require("./parser/componentParser");
const dataAggregator_1 = require("./aggregator/dataAggregator");
const htmlReporter_1 = require("./reporter/htmlReporter");
// Define the program
const program = new commander_1.Command();
program
    .name("mrc-usage-report")
    .description("Generate a report on MRC component usage across MFEs")
    .version("1.0.0")
    .option("-o, --output <path>", "Output directory for the report", "./reports")
    .option("-f, --formats <formats>", "Comma-separated list of output formats (html, json, csv)", "html")
    .option("-m, --mfes <mfes>", "Comma-separated list of MFEs to analyze", "maas-ops-react,infra")
    .option("-r, --mrc-path <path>", "Path to the MRC repository", "../../maas-react-components")
    .option("-b, --base-path <path>", "Base path for the project", process.cwd())
    .option("-s, --source <type>", "Source type for MRC components (local or github)", "local")
    .option("-g, --github", "Use GitHub as the source for MRC components (shorthand for -s github)")
    .option("--github-url <url>", "GitHub repository URL for MRC components", "https://github.com/SolaceDev/maas-react-components")
    .option("--github-branch <branch>", "Branch name for GitHub repository", "main");
program.parse(process.argv);
const options = program.opts();
// If -g flag is used, set source type to github
if (options.github) {
    options.source = "github";
}
// Main function
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(chalk_1.default.blue("MRC Component Usage Report Generator"));
            console.log(chalk_1.default.gray("------------------------------------"));
            // Parse options
            const mfes = options.mfes
                .split(",")
                .map((mfe) => mfe.trim())
                .filter(Boolean);
            const basePath = path_1.default.resolve(options.basePath);
            const mrcPath = path_1.default.resolve(basePath, options.mrcPath);
            const outputDir = path_1.default.resolve(options.output);
            const outputFormats = options.formats.split(",").map((f) => f.trim());
            const mrcSourceType = options.source;
            const mrcGithubUrl = options.githubUrl;
            const mrcGithubBranch = options.githubBranch;
            // Create config
            const config = {
                mfes,
                mrcPath,
                outputDir,
                outputFormats,
                mrcSourceType,
                mrcGithubUrl,
                mrcGithubBranch
            };
            console.log(chalk_1.default.yellow("Configuration:"));
            console.log(`  Base Path: ${basePath}`);
            console.log(`  MRC Path: ${mrcPath}`);
            console.log(`  MFEs: ${mfes.join(", ")}`);
            console.log(`  Output Directory: ${outputDir}`);
            console.log(`  Output Formats: ${outputFormats.join(", ")}`);
            console.log(`  MRC Source Type: ${mrcSourceType}`);
            if (mrcSourceType === "github") {
                console.log(`  MRC GitHub URL: ${mrcGithubUrl}`);
                console.log(`  MRC GitHub Branch: ${mrcGithubBranch}`);
            }
            console.log("");
            // Step 1: Scan for files
            console.log(chalk_1.default.yellow("Step 1: Scanning for files..."));
            const fileScanner = new fileScanner_1.FileScanner(basePath, mfes, mrcSourceType, mrcGithubUrl, mrcGithubBranch);
            const files = yield fileScanner.scanForFiles();
            console.log(`Found ${files.length} files to analyze`);
            // Step 2: Scan for MRC components
            console.log(chalk_1.default.yellow("Step 2: Scanning for MRC components..."));
            const allComponents = yield fileScanner.scanForMrcComponents(mrcPath);
            console.log(`Found ${allComponents.length} MRC component files`);
            // Step 3: Parse files for component usage
            console.log(chalk_1.default.yellow("Step 3: Parsing files for component usage..."));
            const componentParser = new componentParser_1.ComponentParser(mrcPath, mrcSourceType);
            yield componentParser.initialize(allComponents);
            let totalUsages = 0;
            const allUsages = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const mfe = file.split(path_1.default.sep).find((part) => mfes.includes(part)) || "";
                try {
                    const usages = yield componentParser.parseFile(file, mfe);
                    totalUsages += usages.length;
                    allUsages.push(...usages);
                    // Log progress every 100 files
                    if ((i + 1) % 100 === 0 || i === files.length - 1) {
                        console.log(`  Processed ${i + 1}/${files.length} files, found ${totalUsages} component usages so far`);
                    }
                }
                catch (error) {
                    console.error(`Error parsing file ${file}:`, error);
                }
            }
            console.log(`Found ${totalUsages} total component usages`);
            // Step 4: Detect MRC versions for each MFE
            console.log(chalk_1.default.yellow("Step 4: Detecting MRC versions..."));
            const mrcVersions = {};
            for (const mfe of mfes) {
                try {
                    const mfePath = path_1.default.join(basePath, "micro-frontends", mfe);
                    const packageJsonPath = path_1.default.join(mfePath, "package.json");
                    if (fs_1.default.existsSync(packageJsonPath)) {
                        const packageJson = JSON.parse(fs_1.default.readFileSync(packageJsonPath, "utf8"));
                        // Check dependencies and devDependencies
                        const dependencies = packageJson.dependencies || {};
                        const devDependencies = packageJson.devDependencies || {};
                        const mrcPackageName = "@SolaceDev/maas-react-components";
                        if (dependencies[mrcPackageName]) {
                            mrcVersions[mfe] = dependencies[mrcPackageName];
                            console.log(`  ${mfe}: MRC version ${dependencies[mrcPackageName]}`);
                        }
                        else if (devDependencies[mrcPackageName]) {
                            mrcVersions[mfe] = devDependencies[mrcPackageName];
                            console.log(`  ${mfe}: MRC version ${devDependencies[mrcPackageName]}`);
                        }
                        else {
                            mrcVersions[mfe] = "not found";
                            console.log(`  ${mfe}: MRC version not found`);
                        }
                    }
                    else {
                        mrcVersions[mfe] = "package.json not found";
                        console.log(`  ${mfe}: package.json not found`);
                    }
                }
                catch (error) {
                    mrcVersions[mfe] = "error";
                    console.error(`  Error getting MRC version for ${mfe}:`, error);
                }
            }
            // Step 5: Aggregate data
            console.log(chalk_1.default.yellow("Step 5: Aggregating data..."));
            const dataAggregator = new dataAggregator_1.DataAggregator();
            const reportData = dataAggregator.aggregate(allUsages, config, allComponents, mrcVersions);
            console.log(`Generated report data with ${reportData.componentStats.length} component statistics`);
            console.log(`Found ${reportData.unusedComponents.length} unused components`);
            // Step 5: Generate report
            console.log(chalk_1.default.yellow("Step 5: Generating report..."));
            // Ensure output directory exists
            if (!fs_1.default.existsSync(outputDir)) {
                fs_1.default.mkdirSync(outputDir, { recursive: true });
            }
            for (const format of outputFormats) {
                const outputPath = path_1.default.join(outputDir, `mrc-maas-ops-ui-usage-report.${format}`);
                if (format === "html") {
                    const htmlReporter = new htmlReporter_1.HtmlReporter();
                    yield htmlReporter.generateReport(reportData, outputPath);
                    console.log(`HTML report generated at ${outputPath}`);
                }
                else if (format === "json") {
                    const jsonOutput = JSON.stringify(reportData, null, 2);
                    fs_1.default.writeFileSync(outputPath, jsonOutput);
                    console.log(`JSON report generated at ${outputPath}`);
                }
                else if (format === "csv") {
                    console.error("CSV format not yet implemented");
                    // Do not exit, continue with other formats if any
                }
                else {
                    console.warn(`Unsupported output format: ${format}. Skipping.`);
                }
            }
            console.log(chalk_1.default.green("Report generation completed successfully!"));
        }
        catch (error) {
            console.error(chalk_1.default.red("Error generating report:"), error);
            process.exit(1);
        }
    });
}
// Run the main function
main();
