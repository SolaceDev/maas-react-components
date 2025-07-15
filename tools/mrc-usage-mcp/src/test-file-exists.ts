import * as fs from "fs";
import * as path from "path";

// Test if the file exists
const filePath = path.join(
	process.cwd(),
	"../../", // Go up two levels to reach the project root
	"mrc-usage-report-data",
	"per-application",
	"maas-ui",
	"saas",
	"total_stats.json"
);
console.log("File path:", filePath);
console.log("File exists:", fs.existsSync(filePath));

// If it exists, read and log its content
if (fs.existsSync(filePath)) {
	const content = fs.readFileSync(filePath, "utf-8");
	console.log("File content:", content);

	// Parse the content and transform it to match the expected Stats interface
	const rawData = JSON.parse(content);
	const totalInstances = Object.values(rawData).reduce(
		(sum: number, count: unknown) => sum + (typeof count === "number" ? count : 0),
		0
	);
	const uniqueComponents = Object.keys(rawData).length;

	const transformedData = {
		totalInstances,
		componentUsage: rawData,
		uniqueComponents
	};

	console.log("Transformed data:", JSON.stringify(transformedData, null, 2));
}
