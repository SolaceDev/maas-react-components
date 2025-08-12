import axios from "axios";

export const getCategories = {
	name: "get_categories",
	description: "Retrieves the list of component categories from Storybook.",
	inputSchema: {
		type: "object",
		properties: {},
		required: []
	},
	handler: async () => {
		const url = "https://api.github.com/repos/SolaceDev/maas-react-components/contents/storybook/src/stories";
		const headers = {
			Accept: "application/vnd.github+json",
			Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
			"X-GitHub-Api-Version": "2022-11-28"
		};
		const response = await axios.get(url, { headers });
		if (Array.isArray(response.data)) {
			const categories = response.data
				.filter((item: { type: string }) => item.type === "dir")
				.map((item: { name: string }) => item.name);
			return JSON.stringify(categories, null, 2);
		}
		return JSON.stringify([], null, 2);
	}
};
