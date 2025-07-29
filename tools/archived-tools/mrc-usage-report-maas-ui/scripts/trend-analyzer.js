/**
 * MRC Usage Report Trend Analyzer
 *
 * Analyzes trends between current and previous reports
 * Generates a simple HTML report showing changes over time
 */

const fs = require("fs");
const path = require("path");
const { generateTrendReport } = require("./trend-reporter");

// Paths
const REPORTS_DIR = path.join(__dirname, "../reports");
const ARCHIVE_DIR = path.join(REPORTS_DIR, "archive");
const CURRENT_REPORT_PATH = path.join(REPORTS_DIR, "mrc-usage-report.json");
const INDEX_PATH = path.join(REPORTS_DIR, "index.html");

// Ensure reports directory exists
if (!fs.existsSync(REPORTS_DIR)) {
	fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

// Ensure archive directory exists
if (!fs.existsSync(ARCHIVE_DIR)) {
	fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
}

// Load current report
let currentReport;
try {
	currentReport = require(CURRENT_REPORT_PATH);

	// Validate that the report has the expected structure
	if (!currentReport.componentStats || !currentReport.overallStats || !currentReport.unusedComponents) {
		throw new Error("Invalid report format: missing required fields");
	}
} catch (error) {
	console.error(`Error loading current report: ${error.message}`);
	console.error("Make sure the JSON report was generated successfully before running trend analysis");
	process.exit(1);
}

// Find previous reports
const archiveFiles = fs
	.readdirSync(ARCHIVE_DIR)
	.filter((file) => file.startsWith("mrc-usage-report-") && file.endsWith(".json"))
	.sort();

// First run - no previous data
if (archiveFiles.length <= 1) {
	console.log("First run - creating initial report");

	const simpleReport = {
		generatedAt: new Date().toISOString(),
		message: "First report - no trend data available yet",
		summary: {
			totalComponents: currentReport.componentStats.length,
			totalUsages: currentReport.overallStats.totalUsages,
			unusedComponents: currentReport.unusedComponents.length
		},
		topComponents: currentReport.componentStats
			.sort((a, b) => b.totalUsages - a.totalUsages)
			.slice(0, 10)
			.map((c) => ({ name: c.componentName, usages: c.totalUsages }))
	};

	// Generate HTML
	const html = generateTrendReport(simpleReport);
	fs.writeFileSync(INDEX_PATH, html);
	console.log("Created initial trend report");
	process.exit(0);
}

// Get previous report (most recent before current)
const previousReportFile = archiveFiles[archiveFiles.length - 2];
let previousReport;
try {
	previousReport = require(path.join(ARCHIVE_DIR, previousReportFile));

	// Validate that the report has the expected structure
	if (!previousReport.componentStats || !previousReport.overallStats || !previousReport.unusedComponents) {
		throw new Error("Invalid previous report format: missing required fields");
	}
} catch (error) {
	console.error(`Error loading previous report: ${error.message}`);
	console.error("Creating a new baseline report instead");

	// Create a simple report as if this is the first run
	const simpleReport = {
		generatedAt: new Date().toISOString(),
		message: "First report - previous report was invalid or corrupted",
		summary: {
			totalComponents: currentReport.componentStats.length,
			totalUsages: currentReport.overallStats.totalUsages,
			unusedComponents: currentReport.unusedComponents.length
		},
		topComponents: currentReport.componentStats
			.sort((a, b) => b.totalUsages - a.totalUsages)
			.slice(0, 10)
			.map((c) => ({ name: c.componentName, usages: c.totalUsages }))
	};

	// Generate HTML
	const html = generateTrendReport(simpleReport);
	fs.writeFileSync(INDEX_PATH, html);
	console.log("Created baseline report due to issues with previous report");
	process.exit(0);
}

// Simple trend analysis
const trends = {
	currentDate: new Date().toISOString(),
	previousDate: previousReport.generatedAt,
	summary: {
		totalComponents: {
			current: currentReport.componentStats.length,
			previous: previousReport.componentStats.length,
			change: currentReport.componentStats.length - previousReport.componentStats.length
		},
		totalUsages: {
			current: currentReport.overallStats.totalUsages,
			previous: previousReport.overallStats.totalUsages,
			change: currentReport.overallStats.totalUsages - previousReport.overallStats.totalUsages
		},
		unusedComponents: {
			current: currentReport.unusedComponents.length,
			previous: previousReport.unusedComponents.length,
			change: currentReport.unusedComponents.length - previousReport.unusedComponents.length
		}
	}
};

// Find new and removed components
const currentComponentNames = new Set(currentReport.componentStats.map((c) => c.componentName));
const previousComponentNames = new Set(previousReport.componentStats.map((c) => c.componentName));

trends.newComponents = [...currentComponentNames].filter((name) => !previousComponentNames.has(name));
trends.removedComponents = [...previousComponentNames].filter((name) => !currentComponentNames.has(name));

// Find components with significant usage changes
trends.changedComponents = [];

for (const component of currentReport.componentStats) {
	if (previousComponentNames.has(component.componentName)) {
		const previousComponent = previousReport.componentStats.find((c) => c.componentName === component.componentName);
		const change = component.totalUsages - previousComponent.totalUsages;

		if (Math.abs(change) > 0) {
			trends.changedComponents.push({
				name: component.componentName,
				current: component.totalUsages,
				previous: previousComponent.totalUsages,
				change: change,
				percentChange: previousComponent.totalUsages > 0 ? ((change / previousComponent.totalUsages) * 100).toFixed(1) : "N/A"
			});
		}
	}
}

// Sort by absolute change
trends.changedComponents.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));

// Generate HTML report
const html = generateTrendReport(trends);
fs.writeFileSync(INDEX_PATH, html);
console.log("Trend analysis complete");
