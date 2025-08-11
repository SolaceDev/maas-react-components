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
