import { sapThemeMapping } from "./sap/themeMapping";
import { baseThemeMapping } from "./base/themeMapping";
import { solaceNewThemeMapping } from "./solace/themeMapping";
import { ThemeMapping } from "../types/ThemeMapping";
import { SupportedThemes } from "../types/supportedThemes";

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
	} else {
		return baseThemeMapping;
	}
};

/**
 *
 * @returns new solace theme mapping
 * temporary solution to get the new solace theme
 * TODO: remove this method once the new solace theme is ready
 */
export const getNewSolaceTheme = () => solaceNewThemeMapping;

export default getThemeMappings;
