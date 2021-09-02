const path = require("path");
const toPath = (filePath) => path.join(process.cwd(), filePath);
module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"storybook-addon-designs",
		"@storybook/addon-actions",
		"@storybook/addon-a11y"
	],
	/**
	 * The following webpack config overrides have been put in place to address a Storybook bug where
	 * it utilizes it's own version of emotion rather than the installed one ... this was causing
	 * Material UI theming not to be applied.
	 * Reference Ticket: https://github.com/mui-org/material-ui/issues/24282
	 * Suggested Solution: https://github.com/mui-org/material-ui/issues/24282#issuecomment-830696771
	 */
	webpackFinal: async (config) => {
		return {
			...config,
			watch: true,
			resolve: {
				...config.resolve,
				alias: {
					...config.resolve.alias,
					// emotion core needs to be removed from maas-react-components once this issue has been resolved.
					"@emotion/core": require.resolve("../../node_modules/@emotion/core"),
					"@emotion/styled": require.resolve("../../node_modules/@emotion/styled"),
					"emotion-theming": require.resolve("../../node_modules/@emotion/react")
				}
			}
		};
	}
};
