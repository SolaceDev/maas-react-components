/**
 * Transforms a local file path to a GitHub URL.
 * @param filePath - The local file path.
 * @returns An object with the original path and the transformed GitHub URL.
 */
export const transformFilePath = (filePath: string): { original: string; url: string } => {
	const baseUrl = "https://github.com/SolaceDev/";
	let repo = "";
	let branch = "";
	let path = "";

	if (filePath.startsWith("../../../maas-ui-repo")) {
		repo = "maas-ui";
		branch = "develop";
		path = filePath.replace("../../../maas-ui-repo/", "");
	} else if (filePath.startsWith("../../../maas-ops-ui")) {
		repo = "maas-ops-ui";
		branch = "develop";
		path = filePath.replace("../../../maas-ops-ui/", "");
	} else if (filePath.startsWith("../../../broker-manager")) {
		repo = "broker-manager";
		branch = "main";
		path = filePath.replace("../../../broker-manager/", "");
	} else {
		// Return the original path if no mapping is found
		return { original: filePath, url: filePath };
	}

	return {
		original: filePath,
		url: `${baseUrl}${repo}/blob/${branch}/${path}`
	};
};
