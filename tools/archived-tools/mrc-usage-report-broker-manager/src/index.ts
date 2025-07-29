#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import chalk from "chalk";
import fs from "fs";
import { FileScanner } from "./scanner/fileScanner";
import { ComponentParser } from "./parser/componentParser";
import { DataAggregator } from "./aggregator/dataAggregator";
import { HtmlReporter } from "./reporter/htmlReporter";
import { AnalysisConfig, MrcSourceType } from "./types";

// Define the program
const program = new Command();

program
  .name("mrc-usage-report")
  .description("Generate a report on MRC component usage across MFEs")
  .version("1.0.0")
  .option("-o, --output <path>", "Output directory for the report", "./reports")
  .option("-f, --format <format>", "Output format (html, json, csv)", "html")
  .option(
    "-r, --mrc-path <path>",
    "Path to the MRC repository",
    "/Users/ishanphadte/Desktop/maas-react-components"
  )
  .option("-b, --base-path <path>", "Base path for the project", process.cwd())
  .option(
    "-s, --source <type>",
    "Source type for MRC components (local or github)",
    "local"
  )
  .option(
    "-g, --github",
    "Use GitHub as the source for MRC components (shorthand for -s github)"
  )
  .option(
    "--github-url <url>",
    "GitHub repository URL for MRC components",
    "https://github.com/SolaceDev/maas-react-components"
  )
  .option(
    "--github-branch <branch>",
    "Branch name for GitHub repository",
    "main"
  );

program.parse(process.argv);

const options = program.opts();

// If -g flag is used, set source type to github
if (options.github) {
  options.source = "github";
}

// Main function
async function main() {
  try {
    console.log(chalk.blue("MRC Component Usage Report Generator"));
    console.log(chalk.gray("------------------------------------"));

    // Parse options
    const mfes: string[] = [];
    const basePath = path.resolve(options.basePath);
    const mrcPath = path.resolve(basePath, options.mrcPath);
    const outputDir = path.resolve(options.output);
    const outputFormats = options.format
      .split(",")
      .map((f: string) => f.trim());
    const mrcSourceType = options.source as MrcSourceType;
    const mrcGithubUrl = options.githubUrl;
    const mrcGithubBranch = options.githubBranch;

    // If no MFEs are specified, default to "broker-manager"
    if (mfes.length === 0) {
      mfes.push("broker-manager");
    }

    // Create config
    const config: AnalysisConfig = {
      mfes,
      mrcPath,
      outputDir,
      outputFormats,
      mrcSourceType,
      mrcGithubUrl,
      mrcGithubBranch,
    };

    console.log(chalk.yellow("Configuration:"));
    console.log(`  Base Path: ${basePath}`);
    console.log(`  MRC Path: ${mrcPath}`);
    console.log(
      `  MFEs: ${mfes.length > 0 ? mfes.join(", ") : "broker-manager"}`
    );
    console.log(`  Output Directory: ${outputDir}`);
    console.log(`  Output Format: ${outputFormats.join(", ")}`);
    console.log(`  MRC Source Type: ${mrcSourceType}`);
    if (mrcSourceType === "github") {
      console.log(`  MRC GitHub URL: ${mrcGithubUrl}`);
      console.log(`  MRC GitHub Branch: ${mrcGithubBranch}`);
    }
    console.log("");

    // Step 1: Scan for files
    console.log(chalk.yellow("Step 1: Scanning for files..."));
    const fileScanner = new FileScanner(
      basePath,
      mfes,
      mrcSourceType,
      mrcGithubUrl,
      mrcGithubBranch
    );
    const files = await fileScanner.scanForFiles();
    console.log(`Found ${files.length} files to analyze`);

    // Step 2: Scan for MRC components
    console.log(chalk.yellow("Step 2: Scanning for MRC components..."));
    const allComponents = await fileScanner.scanForMrcComponents(mrcPath);
    console.log(`Found ${allComponents.length} MRC component files`);

    // Step 3: Parse files for component usage
    console.log(chalk.yellow("Step 3: Parsing files for component usage..."));
    const componentParser = new ComponentParser(mrcPath, mrcSourceType);
    await componentParser.initialize(allComponents);

    let totalUsages = 0;
    const allUsages: any[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const mfe =
        mfes.length > 0
          ? file.split(path.sep).find((part) => mfes.includes(part)) || ""
          : "broker-manager";

      try {
        const usages = await componentParser.parseFile(file, mfe);
        totalUsages += usages.length;
        allUsages.push(...usages);

        // Log progress every 100 files
        if ((i + 1) % 100 === 0 || i === files.length - 1) {
          console.log(
            `  Processed ${i + 1}/${
              files.length
            } files, found ${totalUsages} component usages so far`
          );
        }
      } catch (error) {
        console.error(`Error parsing file ${file}:`, error);
      }
    }

    console.log(`Found ${totalUsages} total component usages`);

    // Step 4: Detect MRC versions for each MFE
    console.log(chalk.yellow("Step 4: Detecting MRC versions..."));
    const mrcVersions: Record<string, string> = {};

    if (mfes.length > 0) {
      for (const mfe of mfes) {
        try {
          const mfePath = path.join(basePath, "micro-frontends", mfe);
          const packageJsonPath = path.join(mfePath, "package.json");

          if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(
              fs.readFileSync(packageJsonPath, "utf8")
            );

            // Check dependencies and devDependencies
            const dependencies = packageJson.dependencies || {};
            const devDependencies = packageJson.devDependencies || {};

            const mrcPackageName = "@SolaceDev/maas-react-components";

            if (dependencies[mrcPackageName]) {
              mrcVersions[mfe] = dependencies[mrcPackageName];
              console.log(
                `  ${mfe}: MRC version ${dependencies[mrcPackageName]}`
              );
            } else if (devDependencies[mrcPackageName]) {
              mrcVersions[mfe] = devDependencies[mrcPackageName];
              console.log(
                `  ${mfe}: MRC version ${devDependencies[mrcPackageName]}`
              );
            } else {
              mrcVersions[mfe] = "not found";
              console.log(`  ${mfe}: MRC version not found`);
            }
          } else {
            mrcVersions[mfe] = "package.json not found";
            console.log(`  ${mfe}: package.json not found`);
          }
        } catch (error) {
          mrcVersions[mfe] = "error";
          console.error(`  Error getting MRC version for ${mfe}:`, error);
        }
      }
    } else {
      // Handle the case where no MFEs are specified
      const mfe = "broker-manager";
      try {
        const packageJsonPath = path.join(basePath, "package.json");
        if (fs.existsSync(packageJsonPath)) {
          const packageJson = JSON.parse(
            fs.readFileSync(packageJsonPath, "utf8")
          );
          const dependencies = packageJson.dependencies || {};
          const devDependencies = packageJson.devDependencies || {};
          const mrcPackageName = "@SolaceDev/maas-react-components";
          if (dependencies[mrcPackageName]) {
            mrcVersions[mfe] = dependencies[mrcPackageName];
            console.log(
              `  ${mfe}: MRC version ${dependencies[mrcPackageName]}`
            );
          } else if (devDependencies[mrcPackageName]) {
            mrcVersions[mfe] = devDependencies[mrcPackageName];
            console.log(
              `  ${mfe}: MRC version ${devDependencies[mrcPackageName]}`
            );
          } else {
            mrcVersions[mfe] = "not found";
            console.log(`  ${mfe}: MRC version not found`);
          }
        } else {
          mrcVersions[mfe] = "package.json not found";
          console.log(`  ${mfe}: package.json not found`);
        }
      } catch (error) {
        mrcVersions[mfe] = "error";
        console.error(`  Error getting MRC version for ${mfe}:`, error);
      }
    }

    // Step 5: Aggregate data
    console.log(chalk.yellow("Step 5: Aggregating data..."));
    const dataAggregator = new DataAggregator();
    const reportData = dataAggregator.aggregate(
      allUsages,
      config,
      allComponents,
      mrcVersions
    );
    console.log(
      `Generated report data with ${reportData.componentStats.length} component statistics`
    );
    console.log(
      `Found ${reportData.unusedComponents.length} unused components`
    );

    // Step 5: Generate report
    console.log(chalk.yellow("Step 5: Generating report..."));
    for (const format of outputFormats) {
      const outputPath = path.join(
        outputDir,
        `mrc-broker-manager-usage-report.${format}`
      );

      if (format === "html") {
        console.log(chalk.blue("Generating HTML report..."));
        const htmlReporter = new HtmlReporter();
        await htmlReporter.generateReport(reportData, outputPath);
        console.log(chalk.green("HTML report generation complete."));
      } else if (format === "json") {
        console.log(chalk.blue("Generating JSON report..."));
        const jsonOutput = JSON.stringify(reportData, null, 2);
        fs.writeFileSync(outputPath, jsonOutput);
        console.log(chalk.green(`JSON report generated at ${outputPath}`));
      } else if (format === "csv") {
        console.error("CSV format not yet implemented");
      }
    }

    console.log(chalk.green("Report generation completed successfully!"));
  } catch (error) {
    console.error(chalk.red("Error generating report:"), error);
    process.exit(1);
  }
}

// Run the main function
main();
