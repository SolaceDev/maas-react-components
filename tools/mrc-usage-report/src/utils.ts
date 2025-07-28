/**
 * Transforms a local file path to a GitHub URL.
 * @param filePath - The local file path.
 * @returns An object with the original path and the transformed GitHub URL.
 */
export const transformFilePath = (filePath: string): { url: string } => {
	const baseUrl = "https://github.com/SolaceDev/";
	let repo = "";
	let branch = "";
	let relativePath = "";

	// If it's already a GitHub URL, just return it.
	if (filePath.startsWith("https://github.com/")) {
		return { url: filePath };
	}

	const parts = filePath.replace(/\\/g, "/").split("/");

	const maasUiIndex = parts.indexOf("maas-ui");
	const maasOpsUiIndex = parts.indexOf("maas-ops-ui");
	const brokerManagerIndex = parts.indexOf("broker-manager");

	if (maasUiIndex !== -1) {
		repo = "maas-ui";
		branch = "develop";
		// we need to get the path relative to the repo root
		relativePath = parts.slice(maasUiIndex + 1).join("/");
	} else if (maasOpsUiIndex !== -1) {
		repo = "maas-ops-ui";
		branch = "develop";
		relativePath = parts.slice(maasOpsUiIndex + 1).join("/");
	} else if (brokerManagerIndex !== -1) {
		repo = "broker-manager";
		branch = "main";
		relativePath = parts.slice(brokerManagerIndex + 1).join("/");
	} else {
		// Log a warning and return the original path
		// console.warn(`[transformFilePath] Could not determine repository for path: ${filePath}. Returning original path.`);
		return { url: filePath };
	}

	const url = `${baseUrl}${repo}/blob/${branch}/${relativePath}`;
	return {
		url: url
	};
};
