import * as fs from "fs";
import * as path from "path";

interface ComponentInstance {
	file: string;
	line: number;
	character: number;
	[key: string]: unknown;
}

function getInstancesForMfe(mfePath: string, componentName: string): ComponentInstance[] {
	const componentPath = path.join(mfePath, componentName);
	if (fs.existsSync(componentPath)) {
		const instancesJsonPath = path.join(componentPath, "instances.json");
		if (fs.existsSync(instancesJsonPath)) {
			const instancesJsonContent = fs.readFileSync(instancesJsonPath, "utf-8");
			return JSON.parse(instancesJsonContent);
		}
	}
	return [];
}

function getInstancesForApplication(appPath: string, componentName: string): ComponentInstance[] {
	let instances: ComponentInstance[] = [];
	const mfeDirs = fs.readdirSync(appPath, { withFileTypes: true });
	for (const mfeDir of mfeDirs) {
		if (mfeDir.isDirectory()) {
			const mfePath = path.join(appPath, mfeDir.name);
			instances = instances.concat(getInstancesForMfe(mfePath, componentName));
		}
	}
	return instances;
}

export async function getUsageForComponentSolace(componentName: string): Promise<ComponentInstance[]> {
	const perApplicationDir = path.join(process.cwd(), "mrc-usage-report-data", "per-application");
	let allInstances: ComponentInstance[] = [];

	try {
		const applicationDirs = fs.readdirSync(perApplicationDir, { withFileTypes: true });
		for (const appDir of applicationDirs) {
			if (appDir.isDirectory()) {
				const appPath = path.join(perApplicationDir, appDir.name);
				allInstances = allInstances.concat(getInstancesForApplication(appPath, componentName));
			}
		}
		return allInstances;
	} catch (error: unknown) {
		throw new Error(`Could not get component usage for ${componentName}: ${error}`);
	}
}
