import type { Preview } from "@storybook/react";
import React from "react";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/blocks";
import { withSolaceLayout } from "./withSolaceTheme.decorator";
import { withThemeByClassName } from "@storybook/addon-themes";
import isChromatic from "chromatic/isChromatic";

const themes = {
	themes: {
		sap: "sap",
		solace: "solace",
		newSolace: "new-solace"
	},
	defaultTheme: "solace"
};

const decorators = [
	// decorator for building the maas-ui page
	withSolaceLayout(themes),
	// decorator for displaying the theme switcher
	withThemeByClassName(themes)
];

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		},
		docs: {
			// template definition for  docs page
			page: () => (
				<>
					<Title />
					<Description />
					<Primary />
					<Stories />
				</>
			)
		}
	},
	// Provide the MSW addon loader globally
	decorators
};

export default preview;

// Use the document.fonts API to check if fonts have loaded
// https://developer.mozilla.org/en-US/docs/Web/API/Document/fonts API to
const fontLoader = async () => ({
	fonts: await document.fonts.ready
});

export const loaders = isChromatic() && document.fonts ? [fontLoader] : [];
