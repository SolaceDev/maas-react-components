import axios from "axios";
import { getUsageForComponentByApplication } from "./getUsageForComponentByApplication.js";

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

interface DirectoryItem {
	type: string;
	name: string;
}

async function fetchDirectoryContents(url: string): Promise<DirectoryItem[]> {
	try {
		const response = await axios.get(url, {
			headers: {
				Accept: "application/vnd.github+json",
				Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
				"X-GitHub-Api-Version": "2022-11-28"
			}
		});

		if (Array.isArray(response.data)) {
			return response.data.filter((item: { type: string }) => item.type === "dir");
		}

		return [];
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			return [];
		}
		throw new Error(`Could not fetch directory contents from GitHub: ${url}. Error: ${error}`);
	}
}

export async function getUsageForComponentSolace(componentName: string): Promise<RawInstance[]> {
	const baseUrl =
		"https://api.github.com/repos/SolaceDev/maas-react-components/contents/mrc-usage-report-data/per-application";
	const ref = "feature/mrc-usage-report-data";
	const url = `${baseUrl}?ref=${ref}`;

	let allInstances: RawInstance[] = [];

	try {
		const applicationDirs = await fetchDirectoryContents(url);
		for (const appDir of applicationDirs) {
			const applicationName = appDir.name;
			const instances = await getUsageForComponentByApplication(applicationName, componentName);
			allInstances = allInstances.concat(instances);
		}
		return allInstances;
	} catch (error: unknown) {
		throw new Error(`Could not get component usage for ${componentName}: ${error}`);
	}
}
