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

export async function getComponentsByApplication(applicationName: string): Promise<string[]> {
	// Check if the application name is valid
	if (!VALID_APPLICATIONS.includes(applicationName)) {
		throw new Error(
			`Invalid application name: ${applicationName}. Valid applications are: ${VALID_APPLICATIONS.join(", ")}`
		);
	}

	const baseUrl = `https://api.github.com/repos/SolaceDev/maas-react-components/contents/mrc-usage-report-data/per-application/${applicationName}`;
	const ref = "feature/mrc-usage-report-data";

	try {
		// Get the MFEs for this application
		const mfeDirs = await fetchDirectoryContents(`${baseUrl}?ref=${ref}`);
		if (mfeDirs.length === 0) {
			throw new Error(`Application not found or has no MFEs: ${applicationName}`);
		}

		// Get components from each MFE
		const allComponents = new Set<string>();
		const validMfes = VALID_MFES[applicationName] || [];

		for (const mfe of mfeDirs) {
			// Skip if not a valid MFE
			if (!validMfes.includes(mfe)) continue;

			const mfeUrl = `${baseUrl}/${mfe}?ref=${ref}`;
			const componentDirs = await fetchDirectoryContents(mfeUrl);

			componentDirs.forEach((component) => {
				if (component !== "total_stats.json") {
					allComponents.add(component);
				}
			});
		}

		return Array.from(allComponents);
	} catch (error) {
		throw new Error(`Could not fetch components for application ${applicationName}: ${error}`);
	}
}
