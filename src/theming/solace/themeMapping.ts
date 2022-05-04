import { Palette } from "../../types/Palette";
import { ThemeMapping } from "../../types/ThemeMapping";
import { baseThemeMapping } from "../base/themeMapping";
import getThemeMappingPalette from "../getThemeMappingPalette";

const palette: Palette = {
	brandPrimary: "#00C895",
	brand30: "#B3EFDF",
	brand10: "#E6FAF4",

	primary100: "#01374E",
	primary90: "#014968",
	primaryPrimary: "#015B82",
	primary60: "#679DB4",
	primary40: "#99BDCD",
	primary20: "#CCDEE6",
	primary10: "#E6EFF2",

	secondaryPrimary: "#8790A0",
	secondary40: "#CFD3D9",
	secondary20: "#E7E9EC",
	secondary10: "#F3F4F6",

	darkBackground100: "#021B2F",
	darkBackgroundPrimary: "#03223B",
	darkBackground80: "#354E62",
	darkBackground30: "#B3BDC4",

	lightBackgroundPrimary: "#F7F8F9",

	primaryTextPrimary: "#273749",

	secondaryTextPrimary: "#687886",
	secondaryText50: "#B3BBC2",

	white: "#FFFFFF",

	info100: "#2C75B7",
	infoPrimary: "#0591D3",
	info70: "#7CD3F6",
	info30: "#B4DEF2",
	info20: "#CDE9F6",
	info10: "#E6F4FB",

	error100: "#C33135",
	errorPrimary: "#E94C4E",
	error70: "#ED9B9D",
	error30: "#F8C9CA",
	error20: "#FBDBDC",
	error10: "#FDEDED",

	warning100: "#E1681F",
	warningPrimary: "#FF8E2B",
	warning70: "#F8C785",
	warning30: "#FFDDBF",
	warning20: "#FFE8D5",
	warning10: "#FFF4EA",

	success100: "#006B53",
	successPrimary: "#009A80",
	success70: "#6FCCBC",
	success30: "#B3E1D9",
	success20: "#CCEBE6",
	success10: "#E6F5F2"
};

/**
 * ThemeMapping for a new Solace palette
 */
export const solaceNewThemeMapping: ThemeMapping = {
	...baseThemeMapping,
	palette: getThemeMappingPalette(palette)
};
