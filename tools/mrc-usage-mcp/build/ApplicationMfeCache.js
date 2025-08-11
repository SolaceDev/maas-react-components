import axios from "axios";
class ApplicationMfeCache {
    constructor() {
        this.data = { applications: [], mfes: {} };
        this.baseUrl = "https://api.github.com/repos/SolaceDev/maas-react-components/contents/mrc-usage-report-data/per-application";
        this.ref = "feature/mrc-usage-report-data";
    }
    static getInstance() {
        if (!ApplicationMfeCache.instance) {
            ApplicationMfeCache.instance = new ApplicationMfeCache();
        }
        return ApplicationMfeCache.instance;
    }
    async fetchDirectoryContents(url) {
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
                    .filter((item) => item.type === "dir")
                    .map((item) => item.name);
            }
            return [];
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return [];
            }
            // eslint-disable-next-line no-console
            console.error("[DEBUG] Error in fetchDirectoryContents:", error);
            throw new Error(`Could not fetch directory contents from GitHub: ${url}. Error: ${error}`);
        }
    }
    async fetchMfesForApplication(applicationName) {
        const url = `${this.baseUrl}/${applicationName}?ref=${this.ref}`;
        try {
            const mfeDirs = await this.fetchDirectoryContents(url);
            return mfeDirs.filter((dir) => dir !== "total_stats.json");
        }
        catch (error) {
            // Instead of console.error, we'll just return an empty array
            return [];
        }
    }
    async initializeCache(force = false) {
        if (this.isInitialized() && !force) {
            // eslint-disable-next-line no-console
            console.log("[DEBUG] Cache is already initialized. Skipping initialization.");
            return;
        }
        // eslint-disable-next-line no-console
        console.log(`[DEBUG] Initializing cache... (force: ${force})`);
        if (force) {
            this.data = { applications: [], mfes: {} };
        }
        try {
            // Fetch all application directories
            const url = `${this.baseUrl}?ref=${this.ref}`;
            const applications = await this.fetchDirectoryContents(url);
            this.data.applications = applications.map((app) => app.toLowerCase());
            // eslint-disable-next-line no-console
            console.log("[DEBUG] Fetched applications:", this.data.applications);
            // For each application, fetch its MFEs
            for (const application of this.data.applications) {
                const mfes = await this.fetchMfesForApplication(application);
                this.data.mfes[application] = mfes.map((mfe) => mfe.toLowerCase());
            }
            // eslint-disable-next-line no-console
            console.log("[DEBUG] All found MFEs:", this.data.mfes);
            // eslint-disable-next-line no-console
            console.log("[DEBUG] Cache initialized successfully.");
        }
        catch (error) {
            // Instead of console.error, we'll throw the error
            // eslint-disable-next-line no-console
            console.error("[DEBUG] Error during cache initialization:", error);
            throw new Error(`Error initializing cache: ${error}`);
        }
    }
    getApplications() {
        return this.data.applications;
    }
    getMfes(application) {
        return this.data.mfes[application] || [];
    }
    getAllMfes() {
        return Object.values(this.data.mfes).flat();
    }
    getApplicationForMfe(mfe) {
        const lowerCaseMfe = mfe.toLowerCase();
        for (const [application, mfes] of Object.entries(this.data.mfes)) {
            if (mfes.includes(lowerCaseMfe)) {
                return application;
            }
        }
        return undefined;
    }
    isInitialized() {
        return this.data.applications.length > 0;
    }
    getApplicationsAndMfes() {
        return {
            applications: this.data.applications,
            mfes: this.data.mfes
        };
    }
}
export default ApplicationMfeCache;
