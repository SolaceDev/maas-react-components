#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const merger_1 = require("./merger");
const htmlGenerator_1 = require("./htmlGenerator");
// Define the program
const program = new commander_1.Command();
program
    .name("mrc-report-merger")
    .description("Merge multiple MRC usage report JSON files and generate a combined HTML report")
    .version("1.0.1")
    .argument("<json_files...>", "Paths to the MRC usage report JSON files to merge")
    .option("-o, --output-json <path>", "Output path for the merged JSON report", "merged-mrc-usage-report.json")
    .option("-h, --output-html <path>", "Output path for the merged HTML report", "merged-mrc-usage-report.html");
program.parse(process.argv);
const options = program.opts();
const jsonFiles = program.args;
async function main() {
    try {
        console.log(chalk_1.default.blue("MRC Report Merger Tool"));
        console.log(chalk_1.default.gray("------------------------"));
        if (jsonFiles.length < 2) {
            console.error(chalk_1.default.red("Error: At least two JSON files are required for merging."));
            process.exit(1);
        }
        const resolvedJsonFiles = jsonFiles.map((file) => path_1.default.resolve(file));
        const outputJsonPath = path_1.default.resolve(options.outputJson);
        const outputHtmlPath = path_1.default.resolve(options.outputHtml);
        console.log(chalk_1.default.yellow("Configuration:"));
        resolvedJsonFiles.forEach((file) => console.log(`  Input JSON: ${file}`));
        console.log(`  Output JSON: ${outputJsonPath}`);
        console.log(`  Output HTML: ${outputHtmlPath}`);
        console.log("");
        const reports = [];
        for (const filePath of resolvedJsonFiles) {
            if (!fs_1.default.existsSync(filePath)) {
                console.error(chalk_1.default.red(`Error: Report not found at ${filePath}`));
                process.exit(1);
            }
            reports.push(JSON.parse(fs_1.default.readFileSync(filePath, "utf8")));
        }
        // Merge reports
        console.log(chalk_1.default.yellow("Merging reports..."));
        const reportMerger = new merger_1.ReportMerger();
        const mergedReportData = reportMerger.mergeReports(reports);
        console.log(chalk_1.default.green("Reports merged successfully."));
        // Save merged JSON
        fs_1.default.writeFileSync(outputJsonPath, JSON.stringify(mergedReportData, null, 2));
        console.log(chalk_1.default.green(`Merged JSON report generated at ${outputJsonPath}`));
        // Generate HTML from merged JSON
        const htmlGenerator = new htmlGenerator_1.HtmlGenerator();
        await htmlGenerator.generateReport(mergedReportData, outputHtmlPath);
        console.log(chalk_1.default.green(`Merged HTML report generated at ${outputHtmlPath}`));
        console.log(chalk_1.default.green("Tool execution completed successfully!"));
    }
    catch (error) {
        console.error(chalk_1.default.red("Error during tool execution:"), error);
        process.exit(1);
    }
}
main();
