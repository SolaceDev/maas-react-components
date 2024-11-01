import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { DecoratorHelpers } from "@storybook/addon-themes";
import { createTheme, ThemeProvider, SolaceTheme, SupportedThemes } from "@SolaceDev/maas-react-components";
const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;

export const withSolaceLayout = ({ themes, defaultTheme }) => {
	initializeThemeState(Object.keys(themes), defaultTheme);

	return (Story, context) => {
		const selectedTheme = pluckThemeFromContext(context);

		let themeName = SupportedThemes.solace;
		if (selectedTheme === "sap") {
			themeName = SupportedThemes.sap;
		} else if (selectedTheme === "boomi") {
			themeName = SupportedThemes.boomi;
		} else if (selectedTheme === "newSolace") {
			themeName = SupportedThemes.newSolace;
		}

		return (
			<ThemeProvider theme={createTheme(SolaceTheme(themeName))}>
				<Router>
					<Story />
				</Router>
			</ThemeProvider>
		);
	};
};
