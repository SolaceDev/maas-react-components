import axios from "axios";
import { getComponentUsageByApplication } from "./getComponentUsageByApplication.js";
async function fetchDirectoryContents(url) {
    // eslint-disable-next-line no-console
    if (!process.env.GITHUB_PERSONAL_ACCESS_TOKEN) {
        throw new Error("GitHub Personal Access Token is not configured. Please set GITHUB_PERSONAL_ACCESS_TOKEN environment variable.");
    }
    try {
        const response = await axios.get(url, {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
                "X-GitHub-Api-Version": "2022-11-28"
            }
        });
        // eslint-disable-next-line no-console
        console.error(`[DEBUG] Successfully fetched directory contents from ${url}.`);
        if (Array.isArray(response.data)) {
            const dirs = response.data.filter((item) => item.type === "dir");
            // eslint-disable-next-line no-console
            console.error(`[DEBUG] Found ${dirs.length} directories.`);
            return dirs;
        }
        // eslint-disable-next-line no-console
        console.error("[WARN] No directories found or response is not an array.");
        return [];
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            // eslint-disable-next-line no-console
            console.error(`[INFO] Directory not found at ${url} (404). This might be expected.`);
            return [];
        }
        // eslint-disable-next-line no-console
        console.error(`[ERROR] Could not fetch directory contents from GitHub: ${url}. Error: ${error}`);
        throw new Error(`Could not fetch directory contents from GitHub: ${url}. Error: ${error}`);
    }
}
export async function getComponentUsageAll(componentName) {
    // eslint-disable-next-line no-console
    console.error(`[DEBUG] Starting getComponentUsageAll for component: ${componentName}`);
    const baseUrl = "https://api.github.com/repos/SolaceDev/maas-react-components/contents/mrc-usage-report-data/per-application";
    const ref = "feature/mrc-usage-report-data";
    const url = `${baseUrl}?ref=${ref}`;
    // eslint-disable-next-line no-console
    console.error(`[DEBUG] Constructed GitHub API URL for applications: ${url}`);
    let allInstances = [];
    try {
        const applicationDirs = await fetchDirectoryContents(url);
        // eslint-disable-next-line no-console
        console.error(`[DEBUG] Found ${applicationDirs.length} application directories.`);
        for (const appDir of applicationDirs) {
            const applicationName = appDir.name;
            // eslint-disable-next-line no-console
            console.error(`[DEBUG] Getting usage for application: ${applicationName}`);
            try {
                const instances = await getComponentUsageByApplication(applicationName, componentName);
                allInstances = allInstances.concat(instances);
                // eslint-disable-next-line no-console
                console.error(`[DEBUG] Fetched ${instances.length} instances for application ${applicationName}. Total instances so far: ${allInstances.length}`);
            }
            catch (error) {
                // eslint-disable-next-line no-console
                console.error(`[ERROR] Failed to get usage for component ${componentName} in application ${applicationName}:`, error);
            }
        }
        // eslint-disable-next-line no-console
        console.error(`[DEBUG] Finished fetching usage for all applications. Total instances: ${allInstances.length}`);
        return allInstances;
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error(`[ERROR] Could not get component usage for ${componentName}: ${error}`);
        throw new Error(`Could not get component usage for ${componentName}: ${error}`);
    }
}
