/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
			"react-dom": path.resolve(__dirname, "../node_modules/react-dom"),
			"react-router-dom": path.resolve(__dirname, "../node_modules/react-router-dom")
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
						presets: ["@babel/preset-typescript", "@babel/preset-react"],
						plugins: ["@babel/plugin-transform-react-display-name"]
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
