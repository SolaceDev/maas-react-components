import axios from "axios";

interface Stats {
	totalInstances: number;
	componentUsage: { [key: string]: number };
	uniqueComponents: number;
}

// Type for parsed JSON stats that might be in different formats
type ParsedStats = Stats | { [key: string]: number };

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
		const totalInstances = Object.values(componentUsage).reduce((sum, count) => sum + (count as number), 0);
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
 * Process component usage data and update aggregated stats
 * @param stats Stats object to process
 * @param aggregatedStats Stats object to update
 * @param allComponents Set of component names to update
 */
function processComponentUsage(stats: ParsedStats, aggregatedStats: Stats, allComponents: Set<string>): void {
	// Handle both formats: Stats interface or simple component usage object
	if (typeof stats === "object" && "componentUsage" in stats && "totalInstances" in stats) {
		// Stats interface format
		aggregatedStats.totalInstances += stats.totalInstances;
		for (const [component, count] of Object.entries(stats.componentUsage)) {
			aggregatedStats.componentUsage[component] = (aggregatedStats.componentUsage[component] || 0) + (count as number);
			allComponents.add(component);
		}
	} else {
		// Simple component usage object format
		const componentUsage = stats as { [key: string]: number };
		for (const [component, count] of Object.entries(componentUsage)) {
			aggregatedStats.componentUsage[component] = (aggregatedStats.componentUsage[component] || 0) + count;
			allComponents.add(component);
			aggregatedStats.totalInstances += count;
		}
	}
}

import ApplicationMfeCache from "../ApplicationMfeCache.js";

export async function fetchApplicationStats(applicationName: string): Promise<Stats> {
	const cache = ApplicationMfeCache.getInstance();
	const validApplications = cache.getApplications();
	if (!validApplications.includes(applicationName)) {
		throw new Error(
			`Invalid application name: ${applicationName}. Valid applications are: ${validApplications.join(", ")}`
		);
	}

	const baseUrl = `https://api.github.com/repos/SolaceDev/maas-react-components/contents/mrc-usage-report-data/per-application/${applicationName}`;
	const ref = "feature/mrc-usage-report-data";

	try {
		// Check if there's a total_stats.json file directly in the application directory
		const mainStatsUrl = `${baseUrl}/total_stats.json?ref=${ref}`;
		const mainStats = await fetchJsonFile(mainStatsUrl);

		if (mainStats) {
			return parseStats(mainStats);
		}

		// If no main stats file, aggregate from MFE directories
		const mfeDirs = await fetchDirectoryContents(`${baseUrl}?ref=${ref}`);
		if (mfeDirs.length === 0) {
			throw new Error(`Application not found or has no MFEs: ${applicationName}`);
		}

		const aggregatedStats: Stats = {
			totalInstances: 0,
			componentUsage: {},
			uniqueComponents: 0
		};

		const allComponents = new Set<string>();
		const validMfes = cache.getMfes(applicationName);

		for (const mfe of mfeDirs) {
			if (!validMfes.includes(mfe)) continue;

			const statsUrl = `${baseUrl}/${mfe}/total_stats.json?ref=${ref}`;
			const mfeStats = await fetchJsonFile(statsUrl);

			if (mfeStats) {
				const parsedStats = parseStats(mfeStats);
				processComponentUsage(parsedStats, aggregatedStats, allComponents);
			}
		}

		aggregatedStats.uniqueComponents = allComponents.size;
		return aggregatedStats;
	} catch (error) {
		throw new Error(`Could not fetch stats for application ${applicationName}: ${error}`);
	}
}

export async function getApplicationStats(applicationName: string): Promise<Stats> {
	return fetchApplicationStats(applicationName);
}
