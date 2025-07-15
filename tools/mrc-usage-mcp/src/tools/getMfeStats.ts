import axios from "axios";

interface Stats {
	totalInstances: number;
	componentUsage: { [key: string]: number };
	uniqueComponents: number;
}

// Hardcoded list of valid applications
const VALID_APPLICATIONS = ["broker-manager", "maas-ops-ui", "maas-ui"];

// Hardcoded list of valid MFEs for each application
const VALID_MFES: Record<string, string[]> = {
	"broker-manager": ["broker-manager"],
	"maas-ops-ui": ["maas-ops-react", "infra"],
	"maas-ui": ["ep", "intg", "mc", "saas"]
};

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

/**
 * Parse stats from a JSON file
 * @param stats The stats object
 * @returns Parsed stats object
 */
function parseStats(stats: unknown): Stats {
	// Handle null or undefined
	if (!stats) {
		return {
			totalInstances: 0,
			componentUsage: {},
			uniqueComponents: 0
		};
	}

	// If the file contains a simple component usage object (not the Stats interface)
	if (typeof stats === "object" && stats !== null && !("totalInstances" in stats) && !("uniqueComponents" in stats)) {
		const componentUsage = stats as { [key: string]: number };
		const totalInstances = Object.values(componentUsage).reduce((sum, count) => sum + count, 0);
		return {
			totalInstances,
			componentUsage,
			uniqueComponents: Object.keys(componentUsage).length
		};
	}
	// If it's already in the Stats format
	return stats as Stats;
}

/**
 * Get usage statistics for a specific MFE within an application
 */
export async function getMfeStats(applicationName: string, mfeName: string): Promise<Stats> {
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

	const baseUrl = `https://api.github.com/repos/SolaceDev/maas-react-components/contents/mrc-usage-report-data/per-application/${applicationName}/${mfeName}/total_stats.json`;
	const ref = "feature/mrc-usage-report-data";

	try {
		const rawStats = await fetchJsonFile(`${baseUrl}?ref=${ref}`);
		if (!rawStats) {
			throw new Error(`Stats not found for MFE: ${applicationName}/${mfeName}`);
		}

		// Parse the stats to ensure they're in the correct format
		return parseStats(rawStats);
	} catch (error) {
		throw new Error(`Could not fetch stats for MFE ${applicationName}/${mfeName}: ${error}`);
	}
}
