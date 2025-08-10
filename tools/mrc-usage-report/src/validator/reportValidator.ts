import * as fs from "fs";
import * as path from "path";
import * as cheerio from "cheerio";

// TYPES
type MfeInfo = {
	repository: string;
	name: string;
};

type MrcInfo = {
	[key: string]: string;
};

const validateHtmlReport = (): boolean => {
	const htmlReportPath = path.join(process.cwd(), "reports/mrc-usage-report-all.html");
	if (!fs.existsSync(htmlReportPath)) {
		// eslint-disable-next-line no-console
		console.warn(`HTML report not found at ${htmlReportPath}, skipping validation.`);
		return false;
	}

	const html = fs.readFileSync(htmlReportPath, "utf-8");
	const $ = cheerio.load(html);

	const mfeTable = $("#mfes-tab table tbody tr");
	const invalidMfes: string[] = [];

	mfeTable.each((i, row) => {
		const mfeName = $(row).find("td").eq(0).text().trim();
		const componentUsages = parseInt($(row).find("td").eq(2).text().trim(), 10);

		if (componentUsages < 1) {
			invalidMfes.push(mfeName);
		}
	});

	if (invalidMfes.length > 0) {
		// eslint-disable-next-line no-console
		console.error(`HTML validation failed: The following MFEs have no component usages: ${invalidMfes.join(", ")}`);
		return false;
	}

	// eslint-disable-next-line no-console
	console.log("HTML validation successful: All MFEs have at least one component usage.");
	return true;
};

const validateJsonReport = (): boolean => {
	const jsonReportPath = path.join(process.cwd(), "reports/mrc-usage-report-all.json");
	if (!fs.existsSync(jsonReportPath)) {
		// eslint-disable-next-line no-console
		console.warn(`JSON report not found at ${jsonReportPath}, skipping validation.`);
		return false;
	}

	const report = JSON.parse(fs.readFileSync(jsonReportPath, "utf-8"));

	const mfeInfos: MfeInfo[] = report.config?.mfeInfos;
	if (!mfeInfos || !Array.isArray(mfeInfos)) {
		// eslint-disable-next-line no-console
		console.error("JSON validation failed: `config.mfeInfos` is missing or not an array.");
		return false;
	}

	const mrcVersions: MrcInfo = report.mrcVersions;
	if (!mrcVersions || typeof mrcVersions !== "object") {
		// eslint-disable-next-line no-console
		console.error("JSON validation failed: `mrcVersions` is missing or not an object.");
		return false;
	}

	const mfeNames = mfeInfos.map((info) => info.name);
	const mrcVersionKeys = Object.keys(mrcVersions);

	const missingInMrc = mfeNames.filter((name) => !mrcVersionKeys.includes(name));
	const missingInMfe = mrcVersionKeys.filter((key) => !mfeNames.includes(key));

	if (missingInMrc.length > 0) {
		// eslint-disable-next-line no-console
		console.error(
			`JSON validation failed: The following MFEs are in 'mfeInfos' but not in 'mrcVersions': ${missingInMrc.join(
				", "
			)}`
		);
		return false;
	}

	if (missingInMfe.length > 0) {
		// eslint-disable-next-line no-console
		console.error(
			`JSON validation failed: The following keys are in 'mrcVersions' but not in 'mfeInfos': ${missingInMfe.join(
				", "
			)}`
		);
		return false;
	}

	// eslint-disable-next-line no-console
	console.log("JSON validation successful: 'mfeInfos' and 'mrcVersions' are consistent.");
	return true;
};

try {
	if (validateHtmlReport()) {
		process.exit(0);
	}
} catch (error: unknown) {
	// eslint-disable-next-line no-console
	console.error(`HTML validation failed: ${(error as Error).message}`);
}

// eslint-disable-next-line no-console
console.log("Falling back to JSON validation.");

if (validateJsonReport()) {
	process.exit(0);
}

// eslint-disable-next-line no-console
console.error("Both HTML and JSON validation failed.");
process.exit(1);
