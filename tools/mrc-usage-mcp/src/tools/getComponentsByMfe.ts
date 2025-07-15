import axios from "axios";

// Hardcoded list of valid applications
const VALID_APPLICATIONS = ["broker-manager", "maas-ops-ui", "maas-ui"];

// Hardcoded list of valid MFEs for each application
const VALID_MFES: Record<string, string[]> = {
	"broker-manager": ["broker-manager"],
	"maas-ops-ui": ["maas-ops-react", "infra"],
	"maas-ui": ["ep", "intg", "mc", "saas"]
};

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
				.filter((item: { type: string; name: string }) => item.type === "dir" && item.name !== "total_stats.json")
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

export async function getComponentsByMfe(applicationName: string, mfeName: string): Promise<string[]> {
	// Check if the application name is valid
	if (!VALID_APPLICATIONS.includes(applicationName)) {
		throw new Error(
			`Invalid application name: ${applicationName}. Valid applications are: ${VALID_APPLICATIONS.join(", ")}`
		);
	}

	// Check if the MFE name is valid for the given application
	if (!VALID_MFES[applicationName]?.includes(mfeName)) {
		throw new Error(
			`Invalid MFE name: ${mfeName} for application: ${applicationName}. Valid MFEs are: ${VALID_MFES[
				applicationName
			]?.join(", ")}`
		);
	}

	// First try to get components from the directory structure
	const baseUrl = `https://api.github.com/repos/SolaceDev/maas-react-components/contents/mrc-usage-report-data/per-application/${applicationName}/${mfeName}`;
	const statsUrl = `${baseUrl}/total_stats.json`;
	const ref = "feature/mrc-usage-report-data";

	try {
		// First try to get the stats file which contains component usage information
		const stats = await fetchJsonFile(`${statsUrl}?ref=${ref}`);

		if (stats) {
			// If we have stats, extract component names from the keys
			return Object.keys(stats);
		}

		// If no stats file, fall back to directory listing
		const components = await fetchDirectoryContents(`${baseUrl}?ref=${ref}`);
		if (components.length === 0) {
			throw new Error(`MFE not found or has no components: ${applicationName}/${mfeName}`);
		}
		return components;
	} catch (error) {
		throw new Error(`Could not fetch components for MFE ${applicationName}/${mfeName}: ${error}`);
	}
}
