import * as fs from "fs";
import * as path from "path";
import { Command } from "commander";

interface Prop {
	name: string;
	type: string;
	value: unknown;
}

interface Instance {
	filePath: string;
	props: Prop[];
}

interface CommonProp {
	name: string;
	count: number;
}

interface ComponentStat {
	componentName: string;
	totalUsages: number;
	usagesByMfe: { [key: string]: number };
	commonProps: CommonProp[];
	files: string[];
	customization: Record<string, unknown>;
	instances: Instance[];
}

interface MergedReport {
	generatedAt: string;
	config: Record<string, unknown>;
	mrcVersions: Record<string, unknown>;
	componentStats: ComponentStat[];
}

interface AppStats {
	[app: string]: {
		[component: string]: number;
	};
}

interface MfeStats {
	[app: string]: {
		[mfe: string]: {
			[component: string]: number;
		};
	};
}

const program = new Command();

program
	.name("json-splitter")
	.description("A tool to split the merged MRC usage report JSON into a detailed folder structure.")
	.version("1.0.0")
	.option("-i, --input <path>", "Input path for the merged JSON report", "../../merged-mrc-usage-report.json")
	.option("-o, --output <path>", "Output directory for the generated files and folders", "output/");

program.parse(process.argv);
const options = program.opts();

const appMfeMap: { [key: string]: string[] } = {
	"broker-manager": ["broker-manager"],
	"maas-ui": ["ep", "intg", "mc", "saas"],
	"maas-ops-ui": ["infra", "maas-ops-react"]
};

function getAppFromMfe(mfe: string): string | undefined {
	for (const app in appMfeMap) {
		if (appMfeMap[app].includes(mfe)) {
			return app;
		}
	}
	return undefined;
}

function calculateCommonProps(instances: Instance[]): CommonProp[] {
	const propCounts: { [key: string]: number } = {};
	for (const instance of instances) {
		if (instance.props) {
			for (const prop of instance.props) {
				propCounts[prop.name] = (propCounts[prop.name] || 0) + 1;
			}
		}
	}
	return Object.entries(propCounts)
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count);
}

function generatePerComponentStructure(report: MergedReport, outputDirPath: string) {
	const perComponentDir = path.join(outputDirPath, "per-component");
	fs.mkdirSync(perComponentDir, { recursive: true });

	for (const component of report.componentStats) {
		const componentDir = path.join(perComponentDir, component.componentName);
		fs.mkdirSync(componentDir, { recursive: true });

		fs.writeFileSync(path.join(componentDir, "totalUsages.json"), JSON.stringify(component.totalUsages, null, 2));
		fs.writeFileSync(path.join(componentDir, "usagesByMfe.json"), JSON.stringify(component.usagesByMfe, null, 2));
		fs.writeFileSync(path.join(componentDir, "commonProps.json"), JSON.stringify(component.commonProps, null, 2));
		fs.writeFileSync(path.join(componentDir, "files.json"), JSON.stringify(component.files, null, 2));
		fs.writeFileSync(path.join(componentDir, "instances.json"), JSON.stringify(component.instances, null, 2));
		fs.writeFileSync(path.join(componentDir, "customization.json"), JSON.stringify(component.customization, null, 2));
	}
}

function processComponentForApplication(
	component: ComponentStat,
	perApplicationDir: string,
	appStats: AppStats,
	mfeStats: MfeStats
) {
	for (const mfe in component.usagesByMfe) {
		const app = getAppFromMfe(mfe);
		if (app) {
			// init stats
			if (!appStats[app]) appStats[app] = {};
			if (!mfeStats[app]) mfeStats[app] = {};
			if (!mfeStats[app][mfe]) mfeStats[app][mfe] = {};

			// aggregate stats
			appStats[app][component.componentName] =
				(appStats[app][component.componentName] || 0) + component.usagesByMfe[mfe];
			mfeStats[app][mfe][component.componentName] =
				(mfeStats[app][mfe][component.componentName] || 0) + component.usagesByMfe[mfe];

			const mfeInstances = component.instances.filter((inst) => inst.filePath.includes(`/${mfe}/`));
			const mfeFiles = component.files.filter((file) => file.includes(`/${mfe}/`));
			const mfeCommonProps = calculateCommonProps(mfeInstances);

			const componentDir = path.join(perApplicationDir, app, mfe, component.componentName);
			fs.mkdirSync(componentDir, { recursive: true });

			fs.writeFileSync(
				path.join(componentDir, "totalUsages.json"),
				JSON.stringify(component.usagesByMfe[mfe], null, 2)
			);
			fs.writeFileSync(
				path.join(componentDir, "usagesByMfe.json"),
				JSON.stringify({ [mfe]: component.usagesByMfe[mfe] }, null, 2)
			);
			fs.writeFileSync(path.join(componentDir, "commonProps.json"), JSON.stringify(mfeCommonProps, null, 2));
			fs.writeFileSync(path.join(componentDir, "files.json"), JSON.stringify(mfeFiles, null, 2));
			fs.writeFileSync(path.join(componentDir, "instances.json"), JSON.stringify(mfeInstances, null, 2));
			fs.writeFileSync(path.join(componentDir, "customization.json"), JSON.stringify(component.customization, null, 2));
		}
	}
}

function writeStatsFiles(perApplicationDir: string, appStats: AppStats, mfeStats: MfeStats) {
	for (const app in appStats) {
		const appDir = path.join(perApplicationDir, app);
		fs.mkdirSync(appDir, { recursive: true });
		fs.writeFileSync(path.join(appDir, "total_stats.json"), JSON.stringify(appStats[app], null, 2));
	}

	for (const app in mfeStats) {
		for (const mfe in mfeStats[app]) {
			const mfeDir = path.join(perApplicationDir, app, mfe);
			fs.mkdirSync(mfeDir, { recursive: true });
			fs.writeFileSync(path.join(mfeDir, "total_stats.json"), JSON.stringify(mfeStats[app][mfe], null, 2));
		}
	}
}

function generatePerApplicationStructure(report: MergedReport, outputDirPath: string) {
	const perApplicationDir = path.join(outputDirPath, "per-application");
	fs.mkdirSync(perApplicationDir, { recursive: true });
	const appStats: AppStats = {};
	const mfeStats: MfeStats = {};

	for (const component of report.componentStats) {
		processComponentForApplication(component, perApplicationDir, appStats, mfeStats);
	}

	writeStatsFiles(perApplicationDir, appStats, mfeStats);
}

function run() {
	const inputFilePath = path.resolve(options.input);
	const outputDirPath = path.resolve(options.output);

	const rawData = fs.readFileSync(inputFilePath, "utf-8");
	const report: MergedReport = JSON.parse(rawData);

	// Clean output directory
	if (fs.existsSync(outputDirPath)) {
		fs.rmSync(outputDirPath, { recursive: true, force: true });
	}
	fs.mkdirSync(outputDirPath, { recursive: true });

	generatePerComponentStructure(report, outputDirPath);
	generatePerApplicationStructure(report, outputDirPath);
}

run();
