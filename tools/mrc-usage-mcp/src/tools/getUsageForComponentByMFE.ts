import { promises as fs } from "fs";
import path from "path";

// From instances.json
// "keyMap":{"filePath":"a","name":"b","props":"c","type":"d","value":"e"}
interface RawProp {
	b: string; // name
	d: string; // type
	e: string; // value
}

interface RawInstance {
	a: string; // filePath
	c: RawProp[]; // props
}

interface KeyMap {
	filePath: string;
	name: string;
	props: string;
	type: string;
	value: string;
}

interface InstancesFile {
	keyMap: KeyMap;
	data: RawInstance[];
}

export async function getUsageForComponentByMFE(
	applicationName: string,
	mfeName: string,
	componentName: string
): Promise<RawInstance[]> {
	const filePath = path.join(
		process.cwd(),
		"mrc-usage-report-data",
		"per-application",
		applicationName,
		mfeName,
		componentName,
		"instances.json"
	);

	try {
		const fileContent = await fs.readFile(filePath, "utf-8");
		const instancesFile: InstancesFile = JSON.parse(fileContent);
		return instancesFile.data || [];
	} catch (error: unknown) {
		const nodeError = error as NodeJS.ErrnoException;
		if (nodeError.code === "ENOENT") {
			// File not found, which is a valid case (component not used in this MFE)
			return [];
		}
		// For other errors, re-throw
		throw new Error(`Could not read or parse instances.json at ${filePath}: ${nodeError.message}`);
	}
}
