import * as fs from "fs";
import * as path from "path";
import { Command } from "commander";
import chalk from "chalk";

interface ComponentStat {
	componentName: string;
	totalUsages: number;
	usagesByMfe: { [key: string]: number };
	commonProps: any[];
	files: string[];
	customization: any;
}

interface MergedReport {
	generatedAt: string;
	config: any;
	mrcVersions: any;
	componentStats: ComponentStat[];
}

const program = new Command();

program
	.name("json-splitter")
	.description("A tool to split the merged MRC usage report JSON into individual component files.")
	.version("1.0.0")
	.option(
		"-i, --input <path>",
		"Input path for the merged JSON report",
		"../../merged-mrc-usage-report.json"
	)
	.option(
		"-o, --output <path>",
		"Output directory for the component JSON files",
		"output/SolaceComponent"
	);

program.parse(process.argv);
const options = program.opts();

async function splitJsonFile() {
	try {
		const inputFilePath = path.resolve(options.input);
		const outputDirPath = path.resolve(options.output);

		console.log(chalk.blue("JSON Splitter Tool"));
		console.log(chalk.gray("------------------"));
		console.log(chalk.yellow("Configuration:"));
		console.log(`  Input File: ${inputFilePath}`);
		console.log(`  Output Directory: ${outputDirPath}`);
		console.log("");

		const rawData = fs.readFileSync(inputFilePath, "utf-8");
		const report: MergedReport = JSON.parse(rawData);

		// Ensure output directory exists
		if (!fs.existsSync(outputDirPath)) {
			fs.mkdirSync(outputDirPath, { recursive: true });
		}

		for (const component of report.componentStats) {
			const componentName = component.componentName;
			const componentOutputDir = path.join(outputDirPath, componentName);

			if (!fs.existsSync(componentOutputDir)) {
				fs.mkdirSync(componentOutputDir, { recursive: true });
			}

			const outputFileName = `${componentName}.json`;
			const outputFilePath = path.join(componentOutputDir, outputFileName);

			fs.writeFileSync(outputFilePath, JSON.stringify(component, null, 2), "utf-8");
			console.log(chalk.green(`Successfully wrote ${outputFilePath}`));
		}

		console.log(chalk.green("JSON splitting complete."));
	} catch (error) {
		console.error(chalk.red("Error splitting JSON file:"), error);
	}
}

splitJsonFile();
