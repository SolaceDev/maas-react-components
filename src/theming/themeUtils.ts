import { sapTheme } from "./sapTheme";
import { solaceTheme } from "./solaceTheme";
import { ThemeMapping } from "./ThemeMapping";

export let appTheme: "sap" | "solace" | undefined;

export const getThemeMappings = (theme: "sap" | "solace" | undefined): ThemeMapping => {
	if (theme) appTheme = theme;
	if (appTheme == "sap") {
		return sapTheme;
	} else {
		return solaceTheme;
	}
};
