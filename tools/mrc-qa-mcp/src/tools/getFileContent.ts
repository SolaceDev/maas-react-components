import axios from "axios";

export const getFileContent = {
	name: "get_file_content",
	description: "Retrieves the content of a component's story or documentation file from Storybook.",
	inputSchema: {
		type: "object",
		properties: {
			category: {
				type: "string",
				description: "The category of the component."
			},
			component: {
				type: "string",
				description: "The name of the component."
			}
		},
		required: ["category", "component"]
	},
	handler: async (params: { category: string; component: string }) => {
		const { category, component } = params;
		const url = `https://api.github.com/repos/SolaceDev/maas-react-components/contents/storybook/src/stories/${category}/${component}`;
		const headers = {
			Accept: "application/vnd.github+json",
			Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
			"X-GitHub-Api-Version": "2022-11-28"
		};
		const response = await axios.get(url, { headers });
		if (Array.isArray(response.data)) {
			let file = response.data.find((file: { name: string }) => file.name.endsWith(".stories.tsx"));
			if (!file) {
				file = response.data.find((file: { name: string }) => file.name.endsWith(".mdx"));
			}
			if (file) {
				const contentResponse = await axios.get(file.download_url);
				return contentResponse.data;
			}
		}
		throw new Error(`Story or documentation file not found for ${category}/${component}`);
	}
};
