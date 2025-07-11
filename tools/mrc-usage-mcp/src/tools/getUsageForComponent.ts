import axios from "axios";

export async function getUsageForComponent(componentName: string) {
	try {
		const response = await axios.get(
			`https://api.github.com/repos/SolaceDev/maas-react-components/contents/mrc-usage-report-data/${componentName}/${componentName}.json?ref=feature/mrc-usage-report-data`,
			{
				headers: {
					Accept: "application/vnd.github+json",
					Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
					"X-GitHub-Api-Version": "2022-11-28"
				}
			}
		);

		if (response.data && response.data.content) {
			const content = Buffer.from(response.data.content, "base64").toString("utf-8");
			return JSON.parse(content);
		}

		return null;
	} catch (error: unknown) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			return null;
		}
		throw new Error(`Could not fetch component usage from GitHub: ${error}`);
	}
}
