import axios from "axios";

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
	const repoOwner = "SolaceDev";
	const repoName = "maas-react-components";
	const ref = "feature/mrc-usage-report-data";
	const filePath = `mrc-usage-report-data/per-application/${applicationName}/${mfeName}/${componentName}/instances.json`;
	const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=${ref}`;

	try {
		const response = await axios.get(url, {
			headers: {
				Accept: "application/vnd.github.v3.raw",
				Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
				"X-GitHub-Api-Version": "2022-11-28"
			}
		});

		const instancesFile: InstancesFile = response.data;
		return instancesFile.data || [];
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			// File not found, which is a valid case (component not used in this MFE)
			return [];
		}
		// For other errors, re-throw
		throw new Error(`Could not fetch or parse instances.json from GitHub: ${url}. Error: ${error}`);
	}
}
