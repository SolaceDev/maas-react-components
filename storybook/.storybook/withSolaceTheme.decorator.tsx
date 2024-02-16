import React from "react";
import { DecoratorHelpers } from "@storybook/addon-themes";
import { createTheme, ThemeProvider, SolaceTheme, SupportedThemes } from "@SolaceDev/maas-react-components";
const { initializeThemeState, pluckThemeFromContext, useThemeParameters } = DecoratorHelpers;

export const withSolaceLayout = ({ themes, defaultTheme }) => {
	initializeThemeState(Object.keys(themes), defaultTheme);

	return (Story, context) => {
		const selectedTheme = pluckThemeFromContext(context);

		let themeName = SupportedThemes.solace;
		if (selectedTheme === "SAP") {
			themeName = SupportedThemes.sap;
		} else if (selectedTheme === "New Solace") {
			themeName = SupportedThemes.newSolace;
		}

		return (
			<ThemeProvider theme={createTheme(SolaceTheme(themeName))}>
				<Story />
			</ThemeProvider>
		);
	};
};
