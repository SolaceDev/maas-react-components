const path = require("path");
const toPath = (filePath) => path.join(process.cwd(), filePath);

module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"storybook-addon-designs",
		"@storybook/addon-actions",
		"@storybook/addon-interactions",
		"@storybook/addon-a11y",
		"storybook-addon-mock/register",
		"storybook-addon-themes",
		"@storybook/addon-coverage"
	],
	features: {
		interactionsDebugger: true
	},

	/**
	 * The following webpack config overrides have been put in place to address a Storybook bug where
	 * it utilizes it's own version of emotion rather than the installed one ... this was causing
	 * Material UI theming not to be applied.
	 * Reference Ticket: https://github.com/mui-org/material-ui/issues/24282
	 * Suggested Solution: https://github.com/mui-org/material-ui/issues/24282#issuecomment-830696771
	 */
	webpackFinal: async (config) => {
		delete config.resolve.alias["emotion-theming"];
		delete config.resolve.alias["@emotion/styled"];
		delete config.resolve.alias["@emotion/core"];

		const assetRule = config.module.rules.find(({ test }) => test.test(".svg"));

		const assetLoader = {
			loader: assetRule.loader,
			options: assetRule.options || assetRule.query
		};

		// Merge our rule with existing assetLoader rules
		config.module.rules.unshift({
			test: /\.svg$/,
			use: [
				{
					loader: "@svgr/webpack",
					options: {
						prettier: false,
						svgo: false,
						svgoConfig: {
							plugins: [{ removeViewBox: false }]
						},
						titleProp: true,
						ref: true
					}
				},
				assetLoader
			]
		});

		return config;
	}
};
