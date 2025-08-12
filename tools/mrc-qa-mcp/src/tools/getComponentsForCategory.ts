import axios from "axios";

export const getComponentsForCategory = {
	name: "get_components_for_category",
	description: "Retrieves the list of components for a given category from Storybook.",
	inputSchema: {
		type: "object",
		properties: {
			category: {
				type: "string",
				description: "The category to retrieve components for."
			}
		},
		required: ["category"]
	},
	handler: async (params: { category: string }) => {
		const { category } = params;
		const url = `https://api.github.com/repos/SolaceDev/maas-react-components/contents/storybook/src/stories/${category}`;
		const headers = {
			Accept: "application/vnd.github+json",
			Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
			"X-GitHub-Api-Version": "2022-11-28"
		};
		const response = await axios.get(url, { headers });
		if (Array.isArray(response.data)) {
			const components = response.data
				.filter((item: { type: string }) => item.type === "dir")
				.map((item: { name: string }) => item.name);
			return JSON.stringify(components, null, 2);
		}
		return JSON.stringify([], null, 2);
	}
};
