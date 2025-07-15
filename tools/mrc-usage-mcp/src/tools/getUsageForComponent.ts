import axios from "axios";

async function fetchJsonFile(url: string) {
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
			return JSON.parse(content);
		}
		return null;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			return null;
		}
		throw new Error(`Could not fetch file from GitHub: ${url}. Error: ${error}`);
	}
}

export async function getUsageForComponent(componentName: string) {
	const baseUrl = `https://api.github.com/repos/SolaceDev/maas-react-components/contents/mrc-usage-report-data/per-component/${componentName}`;
	const ref = "feature/mrc-usage-report-data";

	const fileNames = ["commonProps.json", "customizations.json", "files.json", "instances.json", "usagesByMfe.json"];

	try {
		const promises = fileNames.map((fileName) => fetchJsonFile(`${baseUrl}/${fileName}?ref=${ref}`));
		const [commonProps, customizations, files, instances, usagesByMfe] = await Promise.all(promises);

		return {
			componentName,
			usagesByMfe,
			commonProps,
			customizations,
			files,
			instances
		};
	} catch (error: unknown) {
		throw new Error(`Could not fetch component usage for ${componentName} from GitHub: ${error}`);
	}
}
