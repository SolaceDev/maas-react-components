import ApplicationMfeCache from "../ApplicationMfeCache.js";
import { getComponentUsageByMfe } from "./getComponentUsageByMfe.js";
export async function getComponentUsageByApplication(applicationName, componentName) {
    // eslint-disable-next-line no-console
    console.error(`[DEBUG] Starting getComponentUsageByApplication for ${componentName} in ${applicationName}`);
    const cache = ApplicationMfeCache.getInstance();
    // eslint-disable-next-line no-console
    console.error("[DEBUG] ApplicationMfeCache instance obtained.");
    if (!cache.isInitialized()) {
        // eslint-disable-next-line no-console
        console.error("[DEBUG] Cache not initialized. Initializing...");
        try {
            await cache.initializeCache();
            // eslint-disable-next-line no-console
            console.error("[DEBUG] Cache initialized successfully.");
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.error("Failed to initialize ApplicationMfeCache:", error);
            return [];
        }
    }
    const mfes = cache.getMfes(applicationName);
    if (!mfes || mfes.length === 0) {
        // eslint-disable-next-line no-console
        console.error(`No MFEs found for application: ${applicationName}`);
        return [];
    }
    // eslint-disable-next-line no-console
    console.error(`[DEBUG] Found ${mfes.length} MFEs for application ${applicationName}: ${mfes.join(", ")}`);
    let allInstances = [];
    // eslint-disable-next-line no-console
    console.error("[DEBUG] Starting to fetch usage for each MFE...");
    for (const mfeName of mfes) {
        try {
            // eslint-disable-next-line no-console
            console.error(`[DEBUG] Getting usage for ${componentName} in MFE ${mfeName}`);
            const instances = await getComponentUsageByMfe(applicationName, mfeName, componentName);
            allInstances = allInstances.concat(instances);
            // eslint-disable-next-line no-console
            console.error(`[DEBUG] Successfully fetched ${instances.length} instances for MFE ${mfeName}`);
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.error(`[ERROR] Failed to get usage for component ${componentName} in MFE ${mfeName}:`, error);
        }
    }
    // eslint-disable-next-line no-console
    console.error("[DEBUG] Finished fetching usage for all MFEs.");
    // eslint-disable-next-line no-console
    console.error(`[DEBUG] Returning a total of ${allInstances.length} instances.`);
    return allInstances;
}
