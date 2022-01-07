import { sapTheme } from "./sapTheme";
import { solaceTheme } from "./solaceTheme";
import { ThemeMapping } from "./ThemeMapping";

export let appTheme: "sap" | "solace" | undefined;

/**
 * To retrieve theme mappings in components simply call getThemeMappings()
 * appTheme would be initialized in the first theme retrieval step, so don't need to pass it down everytime.
 * Also exposing this method, so mfe can also access these themeMappings directly in the code.
 */
const getThemeMappings = (theme: "sap" | "solace" | undefined): ThemeMapping => {
	if (theme) appTheme = theme;
	if (appTheme == "sap") {
		return sapTheme;
	} else {
		return solaceTheme;
	}
};

export default getThemeMappings;
