import type { Preview } from "@storybook/react";
import React from "react";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/blocks";
import { withSolaceLayout } from "./withSolaceTheme.decorator";
import { withThemeByClassName } from "@storybook/addon-themes";
import isChromatic from "chromatic/isChromatic";

const themes = {
	themes: {
		boomi: "boomi",
		sap: "sap",
		solace: "solace",
		newSolace: "newSolace"
	},
	defaultTheme: "solace"
};

const decorators = [
	// decorator for building the maas-ui page
	withSolaceLayout(themes),
	// decorator for displaying the theme switcher
	withThemeByClassName(themes)
];

const categoryOrder = [
	"Accessibility",
	"Container",
	"Data Display",
	"Data Visualizations",
	"Input",
	"Layout",
	"Messaging",
	"Navigation",
	"Style"
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
		tags: ["autodocs"],
		options: {
			storySort: (a, b) => {
				const aTitle = a.title.split("/");
				const bTitle = b.title.split("/");

				const gettingStartedOrder = [
					"Welcome To MRC",
					"Installing & Referencing",
					"Testing & Linking",
					"Theming Your Application"
				];

				// Ensure "Getting Started" is always first
				if (aTitle[0] === "Getting Started" && bTitle[0] !== "Getting Started") {
					return -1;
				}
				if (bTitle[0] === "Getting Started" && aTitle[0] !== "Getting Started") {
					return 1;
				}

				// If both are in "Getting Started", use the custom order
				if (aTitle[0] === "Getting Started" && bTitle[0] === "Getting Started") {
					const aSubCategoryIndex = gettingStartedOrder.indexOf(aTitle[1]);
					const bSubCategoryIndex = gettingStartedOrder.indexOf(bTitle[1]);

					if (aSubCategoryIndex !== -1 && bSubCategoryIndex !== -1) {
						return aSubCategoryIndex - bSubCategoryIndex;
					}

					if (aSubCategoryIndex !== -1) return -1;
					if (bSubCategoryIndex !== -1) return 1;
				}

				// Sort top-level categories alphabetically
				const topLevelComparison = aTitle[0].localeCompare(bTitle[0]);
				if (topLevelComparison !== 0) {
					return topLevelComparison;
				}

				// For other categories, sort alphabetically, but prioritize "Docs" and "Standard"
				const compareAlphabetically = (aParts, bParts) => {
					for (let i = 1; i < Math.min(aParts.length, bParts.length); i++) {
						if (aParts[i] === "Docs" && bParts[i] !== "Docs") return -1;
						if (bParts[i] === "Docs" && aParts[i] !== "Docs") return 1;
						if (aParts[i] === "Standard" && bParts[i] !== "Standard") return -1;
						if (bParts[i] === "Standard" && aParts[i] !== "Standard") return 1;
						const comparison = aParts[i].localeCompare(bParts[i]);
						if (comparison !== 0) return comparison;
					}
					return aParts.length - bParts.length;
				};

				return compareAlphabetically(aTitle, bTitle);
			}
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
