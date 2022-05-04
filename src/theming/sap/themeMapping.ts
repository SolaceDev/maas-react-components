import { alpha, lighten } from "@mui/material";

import { ThemeMapping } from "../../types/ThemeMapping";
import { Palette } from "../../types/Palette";
import getThemeMappingPalette from "../getThemeMappingPalette";

const palette: Palette = {
	brandPrimary: "#0A6ED1",
	brand30: "#B6D4F1",
	brand10: "#E7F1FA",

	primary100: "#07529C",
	primary90: "#0961B9",
	primaryPrimary: "#0A6ED1",
	primary60: "#6CA8E3",
	primary40: "#9DC5ED",
	primary20: "#CEE2F6",
	primary10: "#E7F1FA",

	secondaryPrimary: "#89919A",
	secondary40: "#D0D3D7",
	secondary20: "#E7E9EB",
	secondary10: "#F3F4F5",

	darkBackground100: "#2A3B4C",
	darkBackgroundPrimary: "#354A5F",
	darkBackground80: "#5D6E7F",
	darkBackground30: "#C2C9CF",

	lightBackgroundPrimary: "#EDEFF0",

	primaryTextPrimary: "#32363A",

	secondaryTextPrimary: "#6A6D70",
	secondaryText50: "#D2D3D4",

	white: "#FFFFFF",

	info100: "#0964BE",
	infoPrimary: "#0A6ED1",
	info70: "#91C8F6",
	info30: "#C6DEF6",
	info20: "#DDECFA",
	info10: "#F5FAFF",

	error100: "#9E0000",
	errorPrimary: "#BB0000",
	error70: "#FF8888",
	error30: "#F1BCBC",
	error20: "#F8D4D4",
	error10: "#FFEBEB",

	warning100: "#D16100",
	warningPrimary: "#E9730C",
	warning70: "#FABD64",
	warning30: "#FADDC3",
	warning20: "#FCEADA",
	warning10: "#FEF7F1",

	success100: "#006B53",
	successPrimary: "#107E3E",
	success70: "#ABE2AB",
	success30: "#C4E4D1",
	success20: "#DAF0E4",
	success10: "#F1FDF6"
};

/**
 * ThemeMapping for the SAP palette
 */
export const sapThemeMapping: ThemeMapping = {
	palette: getThemeMappingPalette(palette),

	/**
	 * @deprecated This scheme is deprecated and will be removed when no longer used.
	 */
	pallete: {
		error: palette.errorPrimary,
		greyBackgroundLight: palette.lightBackgroundPrimary,
		info: palette.brandPrimary,
		primary: palette.brandPrimary,
		secondary: palette.brandPrimary,
		success: palette.successPrimary,
		text: palette.primaryTextPrimary,
		labelText: palette.secondaryTextPrimary,
		textSecondary: palette.secondaryTextPrimary,
		warning: palette.warningPrimary,
		white: palette.white,

		//toasts
		toastText: palette.primaryTextPrimary,
		toastBackground: lighten(palette.brandPrimary, 0.9),
		toastSuccessIcon: palette.successPrimary,

		//chips
		nonadminPill: alpha(palette.secondaryTextPrimary, 0.1),
		adminPill: palette.secondaryTextPrimary,

		//Button
		buttonTextHoverBG: alpha(palette.brandPrimary, 0.1),
		buttonOutlinedHoverBG: alpha(palette.brandPrimary, 0.1),
		buttonLinkDisabled: alpha(palette.brandPrimary, 0.2),
		buttonIconBG: alpha(palette.brandPrimary, 0.1)
	}
};
