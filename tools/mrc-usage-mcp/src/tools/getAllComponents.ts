import axios from "axios";

export async function getAllComponents() {
	try {
		const response = await axios.get(
			"https://api.github.com/repos/SolaceDev/maas-react-components/contents/mrc-usage-report-data?ref=feature/mrc-usage-report-data",
			{
				headers: {
					Accept: "application/vnd.github+json",
					Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
					"X-GitHub-Api-Version": "2022-11-28"
				}
			}
		);

		if (Array.isArray(response.data)) {
			return response.data
				.filter((item: { type: string }) => item.type === "dir")
				.map((item: { name: string }) => item.name);
		}

		return [];
	} catch (error) {
		throw new Error(`Could not fetch component list from GitHub: ${error}`);
	}
}
