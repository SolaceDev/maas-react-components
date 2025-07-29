import axios from "axios";
import Fuse from "fuse.js";
import { transformResponse, RawInstance, Instance } from "../utils/keyTransformer.js";

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

export async function getComponentUsageByMfe(
	applicationName: string,
	mfeName: string,
	componentName: string,
	propIdentifier?: string | { name: string; value: string }
): Promise<Instance[]> {
	// eslint-disable-next-line no-console
	console.error(
		`[DEBUG] Starting getComponentUsageByMfe for ${componentName} in MFE ${mfeName} of application ${applicationName}`
	);

	const repoOwner = "SolaceDev";
	const repoName = "maas-react-components";
	const ref = "feature/mrc-usage-report-data";
	const filePath = `mrc-usage-report-data/per-application/${applicationName}/${mfeName}/${componentName}/instances.json`;
	const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=${ref}`;
	// eslint-disable-next-line no-console
	console.error(`[DEBUG] Constructed GitHub API URL: ${url}`);

	try {
		// eslint-disable-next-line no-console
		console.error(`[DEBUG] Fetching data from ${url}...`);
		const response = await axios.get(url, {
			headers: {
				Accept: "application/vnd.github.v3.raw",
				Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
				"X-GitHub-Api-Version": "2022-11-28"
			}
		});
		// eslint-disable-next-line no-console
		console.error("[DEBUG] Successfully fetched data from GitHub.");

		const instancesFile: InstancesFile = response.data;
		if (!instancesFile) {
			// eslint-disable-next-line no-console
			console.error("[WARN] instances.json file is empty or invalid.");
			return [];
		}

		let instances = instancesFile.data || [];
		// eslint-disable-next-line no-console
		console.error(`[DEBUG] Parsed ${instances.length} instances from the file.`);

		if (propIdentifier) {
			if (typeof propIdentifier === "string") {
				instances = instances.filter((instance) => {
					const fuse = new Fuse(instance.c, { keys: ["b"] });
					return fuse.search(propIdentifier).length > 0;
				});
			} else {
				instances = instances.filter((instance) => {
					const fuse = new Fuse(instance.c, { keys: ["b"] });
					const results = fuse.search(propIdentifier.name);
					return results.some((result) => result.item.e === propIdentifier.value);
				});
			}
		}

		return transformResponse(instances);
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			// eslint-disable-next-line no-console
			console.error(
				`[INFO] instances.json not found for ${componentName} in ${mfeName} (This is expected if the component is not used).`
			);
			return [];
		}
		// For other errors, log and re-throw
		// eslint-disable-next-line no-console
		console.error(`[ERROR] Could not fetch or parse instances.json from GitHub: ${url}. Error: ${error}`);
		throw new Error(`Could not fetch or parse instances.json from GitHub: ${url}. Error: ${error}`);
	}
}
