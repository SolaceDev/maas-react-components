#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import chalk from "chalk";
import fs from "fs";
import { ReportMerger } from "./merger";
import { HtmlGenerator } from "./htmlGenerator";
import { ReportData } from "./types";

// Define the program
const program = new Command();

program
	.name("mrc-report-merger")
	.description("Merge multiple MRC usage report JSON files and generate a combined HTML report")
	.version("1.0.1")
	.argument("<json_files...>", "Paths to the MRC usage report JSON files to merge")
	.option(
		"-o, --output-json <path>",
		"Output path for the merged JSON report",
		"merged-mrc-usage-report.json"
	)
	.option(
		"-h, --output-html <path>",
		"Output path for the merged HTML report",
		"merged-mrc-usage-report.html"
	);

program.parse(process.argv);

const options = program.opts();
const jsonFiles = program.args;

async function main() {
	try {
		console.log(chalk.blue("MRC Report Merger Tool"));
		console.log(chalk.gray("------------------------"));

		if (jsonFiles.length < 2) {
			console.error(chalk.red("Error: At least two JSON files are required for merging."));
			process.exit(1);
		}

		const resolvedJsonFiles = jsonFiles.map((file) => path.resolve(file));
		const outputJsonPath = path.resolve(options.outputJson);
		const outputHtmlPath = path.resolve(options.outputHtml);

		console.log(chalk.yellow("Configuration:"));
		resolvedJsonFiles.forEach((file) => console.log(`  Input JSON: ${file}`));
		console.log(`  Output JSON: ${outputJsonPath}`);
		console.log(`  Output HTML: ${outputHtmlPath}`);
		console.log("");

		const reports: ReportData[] = [];
		for (const filePath of resolvedJsonFiles) {
			if (!fs.existsSync(filePath)) {
				console.error(chalk.red(`Error: Report not found at ${filePath}`));
				process.exit(1);
			}
			reports.push(JSON.parse(fs.readFileSync(filePath, "utf8")));
		}

		// Merge reports
		console.log(chalk.yellow("Merging reports..."));
		const reportMerger = new ReportMerger();
		const mergedReportData = reportMerger.mergeReports(reports);
		console.log(chalk.green("Reports merged successfully."));

		// Save merged JSON
		fs.writeFileSync(outputJsonPath, JSON.stringify(mergedReportData, null, 2));
		console.log(chalk.green(`Merged JSON report generated at ${outputJsonPath}`));

		// Generate HTML from merged JSON
		const htmlGenerator = new HtmlGenerator();
		await htmlGenerator.generateReport(mergedReportData, outputHtmlPath);
		console.log(chalk.green(`Merged HTML report generated at ${outputHtmlPath}`));

		console.log(chalk.green("Tool execution completed successfully!"));
	} catch (error) {
		console.error(chalk.red("Error during tool execution:"), error);
		process.exit(1);
	}
}

main();
