import * as fs from "fs";
import * as path from "path";

const reportPath = process.argv[2];

if (!reportPath) {
	// eslint-disable-next-line no-console
	console.error("Error: Report path not provided.");
	process.exit(1);
}

const absoluteReportPath = path.resolve(reportPath);

if (!fs.existsSync(absoluteReportPath)) {
	// eslint-disable-next-line no-console
	console.error(`Error: Report file not found at ${absoluteReportPath}`);
	process.exit(1);
}

const report = JSON.parse(fs.readFileSync(absoluteReportPath, "utf-8"));
const apps = Object.keys(report);

if (apps.length === 0) {
	// eslint-disable-next-line no-console
	console.error("Validation failed: The report contains no application data.");
	process.exit(1);
}

const emptyApps = apps.filter((app) => Object.keys(report[app].mfes).length === 0);
if (emptyApps.length > 0) {
	// eslint-disable-next-line no-console
	console.error(`Validation failed: The following applications have no MFE data: ${emptyApps.join(", ")}`);
	process.exit(1);
}

const mfeIssues: string[] = [];
apps.forEach((app) => {
	const mfes = Object.keys(report[app].mfes);
	mfes.forEach((mfe) => {
		if (Object.keys(report[app].mfes[mfe].components).length === 0) {
			mfeIssues.push(`${app}/${mfe}`);
		}
	});
});

if (mfeIssues.length > 0) {
	// eslint-disable-next-line no-console
	console.error(`Validation failed: The following MFEs have no component usage data: ${mfeIssues.join(", ")}`);
	process.exit(1);
}

// eslint-disable-next-line no-console
console.log("Validation successful: All applications and MFEs have component usage data.");
