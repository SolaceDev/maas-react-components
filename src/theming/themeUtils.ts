import { sapTheme } from "./sapTheme";
import { solaceTheme } from "./solaceTheme";
import { ThemeMapping } from "./ThemeMapping";

export const getTheme = (classList: DOMTokenList): ThemeMapping => {
	if (classList.contains("sap")) {
		return sapTheme;
	} else {
		return solaceTheme;
	}
};
export const getThemeMappings = (): ThemeMapping => getTheme(document.body.classList);
