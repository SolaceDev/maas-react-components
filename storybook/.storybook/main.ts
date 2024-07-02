import type { StorybookConfig } from "@storybook/react-webpack5";

const path = require("path");

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@storybook/addon-a11y",
		"storybook-addon-mock",
		"@storybook/addon-themes",
		{
			name: "@storybook/addon-coverage",
			options: {
				istanbul: {
					cwd: path.join(__dirname, "..", "..")
				}
			}
		}
	],
	webpackFinal: async (config: any) => {
		config.resolve.alias = {
			...config.resolve.alias,
			react: path.resolve(__dirname, "../node_modules/react"),
			"react-dom": path.resolve(__dirname, "../node_modules/react-dom")
		};

		/*
		 *	After upgrading to Storybook 8, webpack was not able to process typescript files, so had to explicitly specify the loader
		 **/
		config.module.rules.push({
			test: /\.tsx?$/,
			use: [
				{
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-typescript"]
					}
				}
			],
			exclude: /node_modules/
		});

		config.resolve.extensions.push(".ts", ".tsx");

		return config;
	},
	framework: {
		name: "@storybook/react-webpack5",
		options: {}
	},
	docs: {
		autodocs: true
	}
};
export default config;
