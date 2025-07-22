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

import { sapThemeMapping } from "./sap/themeMapping";
import { baseThemeMapping } from "./base/themeMapping";
import { solaceNewThemeMapping } from "./solace/themeMapping";
import { ThemeMapping } from "../types/ThemeMapping";
import { SupportedThemes } from "../types/supportedThemes";
import { boomiThemeMapping } from "./boomi/themeMapping";

export let appTheme: SupportedThemes | undefined;

/**
 * To retrieve theme mappings in components simply call getThemeMappings().
 * appTheme would be initialized in the first theme retrieval step, so don't need to pass it down everytime.
 * Also exposing this method, so mfe can also access these themeMappings directly in the code.
 */
const getThemeMappings = (theme?: SupportedThemes): ThemeMapping => {
	if (theme) appTheme = theme;
	if (appTheme === SupportedThemes.sap) {
		return sapThemeMapping;
	} else if (appTheme === SupportedThemes.newSolace) {
		return solaceNewThemeMapping;
	} else if (appTheme === SupportedThemes.boomi) {
		return boomiThemeMapping;
	} else {
		return baseThemeMapping;
	}
};

export default getThemeMappings;
