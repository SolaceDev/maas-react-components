import axios from "axios";
import { getApplicationStats } from "./getApplicationStats";

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

async function fetchDirectoryContents(url: string): Promise<string[]> {
	try {
		const response = await axios.get(url, {
			headers: {
				Accept: "application/vnd.github+json",
				Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
				"X-GitHub-Api-Version": "2022-11-28"
			}
		});

		if (Array.isArray(response.data)) {
			return response.data
				.filter((item: { type: string }) => item.type === "dir")
				.map((item: { name: string }) => item.name);
		}

		return [];
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			return [];
		}
		throw new Error(`Could not fetch directory contents from GitHub: ${url}. Error: ${error}`);
	}
}

async function fetchJsonFile(url: string): Promise<InstancesFile | null> {
	try {
		const response = await axios.get(url, {
			headers: {
				Accept: "application/vnd.github+json",
				Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
				"X-GitHub-Api-Version": "2022-11-28"
			}
		});
		if (response.data && response.data.content) {
			const content = Buffer.from(response.data.content, "base64").toString("utf-8");
			return JSON.parse(content) as InstancesFile;
		}
		return null;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			return null;
		}
		throw new Error(`Could not fetch file from GitHub: ${url}. Error: ${error}`);
	}
}

export async function getUsageForComponentByApplication(
	applicationName: string,
	componentName: string
): Promise<RawInstance[]> {
	const stats = await getApplicationStats(applicationName);
	if (!stats.componentUsage[componentName]) {
		return [];
	}

	const baseUrl = `https://api.github.com/repos/SolaceDev/maas-react-components/contents/mrc-usage-report-data/per-application/${applicationName}`;
	const ref = "feature/mrc-usage-report-data";

	const mfeDirs = await fetchDirectoryContents(`${baseUrl}?ref=${ref}`);
	let allInstances: RawInstance[] = [];

	for (const mfe of mfeDirs) {
		const instancesUrl = `${baseUrl}/${mfe}/${componentName}/instances.json?ref=${ref}`;
		const instances = await fetchJsonFile(instancesUrl);
		if (instances && instances.data) {
			allInstances = allInstances.concat(instances.data);
		}
	}

	return allInstances;
}
