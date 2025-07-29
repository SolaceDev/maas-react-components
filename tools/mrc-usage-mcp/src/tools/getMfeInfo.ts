import axios from "axios";

interface MfeInfo {
	mfeName: string;
	applicationName: string;
	isValid: boolean;
}

// Cache for MFE to application mapping to avoid repeated API calls
let mfeToApplicationCache: Record<string, string> = {};
let lastCacheUpdate: Date | null = null;
const CACHE_TTL = 3600000; // 1 hour in milliseconds

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

/**
 * Discover all MFEs and their parent applications by querying the GitHub repository
 */
async function discoverMfes(forceRefresh = false): Promise<Record<string, string>> {
	// Return cached mapping if it's still valid and not forcing refresh
	if (
		!forceRefresh &&
		lastCacheUpdate &&
		Date.now() - lastCacheUpdate.getTime() < CACHE_TTL &&
		Object.keys(mfeToApplicationCache).length > 0
	) {
		return mfeToApplicationCache;
	}

	const mapping: Record<string, string> = {};
	const baseUrl =
		"https://api.github.com/repos/SolaceDev/maas-react-components/contents/mrc-usage-report-data/per-application";
	const ref = "feature/mrc-usage-report-data";

	try {
		// Get all applications
		const applications = await fetchDirectoryContents(`${baseUrl}?ref=${ref}`);

		// For each application, get its MFEs
		for (const application of applications) {
			const applicationName = application.name;
			const mfes = await fetchDirectoryContents(`${baseUrl}/${applicationName}?ref=${ref}`);

			// Add each MFE to the mapping
			for (const mfe of mfes) {
				if (mfe.name !== "total_stats.json") {
					mapping[mfe.name] = applicationName;
				}
			}
		}

		// Update the cache
		mfeToApplicationCache = mapping;
		lastCacheUpdate = new Date();

		return mapping;
	} catch (error) {
		throw new Error(`Could not discover MFEs: ${error}`);
	}
}

/**
 * Get information about an MFE, including which application it belongs to
 */
/** @deprecated */
export async function getMfeInfo(mfeName: string, forceRefresh = false): Promise<MfeInfo> {
	const mfeMapping = await discoverMfes(forceRefresh);

	if (!(mfeName in mfeMapping)) {
		throw new Error(`MFE not found: ${mfeName}`);
	}

	return {
		mfeName,
		applicationName: mfeMapping[mfeName],
		isValid: true
	};
}

/**
 * List all available MFEs and their parent applications
 */
export async function listAllMfes(forceRefresh = false): Promise<MfeInfo[]> {
	const mfeMapping = await discoverMfes(forceRefresh);

	return Object.entries(mfeMapping).map(([mfeName, applicationName]) => ({
		mfeName,
		applicationName,
		isValid: true
	}));
}

/**
 * Check if an MFE exists and get its application name
 * Returns null if MFE doesn't exist
 */
export async function getApplicationForMfe(mfeName: string): Promise<string | null> {
	try {
		const mfeMapping = await discoverMfes();
		return mfeMapping[mfeName] || null;
	} catch (error) {
		// Log error silently
		return null;
	}
}
