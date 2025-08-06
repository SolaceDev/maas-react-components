import axios from "axios";

interface ApplicationMfeData {
	applications: string[];
	mfes: { [application: string]: string[] };
}

class ApplicationMfeCache {
	private static instance: ApplicationMfeCache;
	private data: ApplicationMfeData = { applications: [], mfes: {} };
	private baseUrl =
		"https://api.github.com/repos/SolaceDev/maas-react-components/contents/mrc-usage-report-data/per-application";
	private ref = "feature/mrc-usage-report-data";

	private constructor() {}

	public static getInstance(): ApplicationMfeCache {
		if (!ApplicationMfeCache.instance) {
			ApplicationMfeCache.instance = new ApplicationMfeCache();
		}
		return ApplicationMfeCache.instance;
	}

	private async fetchDirectoryContents(url: string): Promise<string[]> {
		console.log(`[DEBUG] Fetching contents from URL: ${url}`);
		console.log('DEBUG: GITHUB_PERSONAL_ACCESS_TOKEN:', process.env.GITHUB_PERSONAL_ACCESS_TOKEN);
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
			console.error('[DEBUG] Error in fetchDirectoryContents:', error);
			throw new Error(`Could not fetch directory contents from GitHub: ${url}. Error: ${error}`);
		}
	}

	private async fetchMfesForApplication(applicationName: string): Promise<string[]> {
		const url = `${this.baseUrl}/${applicationName}?ref=${this.ref}`;
		try {
			const mfeDirs = await this.fetchDirectoryContents(url);
			return mfeDirs.filter((dir) => dir !== "total_stats.json");
		} catch (error) {
			// Instead of console.error, we'll just return an empty array
			return [];
		}
	}

	public async initializeCache(): Promise<void> {
		console.log('[DEBUG] Initializing cache...');
		try {
			// Fetch all application directories
			const url = `${this.baseUrl}?ref=${this.ref}`;
			this.data.applications = await this.fetchDirectoryContents(url);
			console.log('[DEBUG] Fetched applications:', this.data.applications);

			// For each application, fetch its MFEs
			for (const application of this.data.applications) {
				this.data.mfes[application] = await this.fetchMfesForApplication(application);
			}

			console.log('[DEBUG] Cache initialized successfully.');
		} catch (error) {
			// Instead of console.error, we'll throw the error
			console.error('[DEBUG] Error during cache initialization:', error);
			throw new Error(`Error initializing cache: ${error}`);
		}
	}

	public getApplications(): string[] {
		return this.data.applications;
	}

	public getMfes(application: string): string[] {
		return this.data.mfes[application] || [];
	}

	public getAllMfes(): string[] {
		return Object.values(this.data.mfes).flat();
	}

	public getApplicationForMfe(mfe: string): string | undefined {
		for (const [application, mfes] of Object.entries(this.data.mfes)) {
			if (mfes.includes(mfe)) {
				return application;
			}
		}
		return undefined;
	}

	public isInitialized(): boolean {
		return this.data.applications.length > 0;
	}

	public getApplicationsAndMfes(): { applications: string[]; mfes: { [application: string]: string[] } } {
		return {
			applications: this.data.applications,
			mfes: this.data.mfes
		};
	}
}

export default ApplicationMfeCache;
