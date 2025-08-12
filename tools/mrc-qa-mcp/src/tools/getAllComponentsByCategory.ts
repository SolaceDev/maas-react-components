import axios from "axios";

export const getAllComponentsByCategory = {
	name: "get_all_components_by_category",
	description: "Retrieves all component categories and their components from Storybook.",
	inputSchema: {
		type: "object",
		properties: {},
		required: []
	},
	handler: async (params: { ref: string }) => {
		const { ref } = params;
		const headers = {
			Accept: "application/vnd.github+json",
			Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
			"X-GitHub-Api-Version": "2022-11-28"
		};

		try {
			const categoriesUrl = `https://api.github.com/repos/SolaceDev/maas-react-components/contents/storybook/src/stories`;
			const categoriesResponse = await axios.get(categoriesUrl, { headers, params: { ref } });
			let categories: string[] = [];
			if (Array.isArray(categoriesResponse.data)) {
				categories = categoriesResponse.data
					.filter((item: { type: string }) => item.type === "dir")
					.map((item: { name: string }) => item.name);
			}

			const allComponents: { [key: string]: string[] } = {};
			const componentPromises = categories.map(async (category: string) => {
				try {
					const componentsUrl = `https://api.github.com/repos/SolaceDev/maas-react-components/contents/storybook/src/stories/${category}`;
					const componentsResponse = await axios.get(componentsUrl, { headers, params: { ref } });
					if (Array.isArray(componentsResponse.data)) {
						allComponents[category] = componentsResponse.data
							.filter((item: { type: string }) => item.type === "dir")
							.map((item: { name: string }) => item.name);
					} else {
						allComponents[category] = [];
					}
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(`Error fetching components for category ${category}:`, error);
					allComponents[category] = [];
				}
			});
			await Promise.all(componentPromises);
			return allComponents;
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error("Error fetching categories:", error);
			return {};
		}
	}
};
