import { BASE_SIZE_TYPES } from "./sizing";

export enum CHIP_COLORS {
	ROYAL_BLUE = "royalBlue",
	DARK_BLUE = "darkBlue",
	OPAQUE_BLUE = "opaqueBlue",
	infoBlue = "infoBlue",
	infoBgBlue = "infoBgBlue",
	warnYellow = "warnYellow",
	warnBgYellow = "warnBgYellow",
	LIGHT_GREY = "lightGrey",
	SMOKE_GREY = "smokeGrey",
	DARK_GREY = "darkGrey",
	WHITE = "white",
	INFO_LIGHT_BG_BLUE = "infoLightBgBlue",
	ERROR_BG_RED = "errorBgRed",
	SUCCESS_BG_GREEN = "successBgGreen",
	INFO_BLUE_LABEL = "infoLightLabelBlue",
	ERROR_RED_LABEL = "errorLabel",
	SUCCESS_GREEN_LABEL = "successLabel"
}

export enum CHIP_VARIANT {
	FILLED = "filled",
	OUTLINED = "outlined"
}

export const CHIP_PX_HEIGHTS: BASE_SIZE_TYPES = {
	xs: 14,
	sm: 18,
	md: 24,
	lg: 30
};

export const CHIP_PX_BORDER_RADIUS: BASE_SIZE_TYPES = {
	xs: 2,
	sm: 3,
	md: 4,
	lg: 5
};
