import { alpha } from "@mui/material";
import { ThemeMapping, ThemeMappingPalette } from "../../types/ThemeMapping";
import { baseThemeMapping } from "../base/themeMapping";

const palette: ThemeMappingPalette = {
	brand: {
		wMain: "#00C895",
		wMain30: alpha("#00C895", 0.3),
		w30: "#B3EFDF",
		w10: "#E6FAF4"
	},

	primary: {
		w100: "#01374E",
		w90: "#014968",
		wMain: "#015B82",
		w60: "#679DB4",
		w40: "#99BDCD",
		w20: "#CCDEE6",
		w10: "#E6EFF2",

		text: {
			wMain: "#273749",
			w10: "#FFFFFF"
		}
	},

	secondary: {
		w70: "#536574",
		w80: "#354E62",
		w8040: alpha("#354E62", 0.4),
		wMain: "#8790A0",
		w40: "#CFD3D9",
		w20: "#E7E9EC",
		w10: "#F3F4F6",

		text: {
			wMain: "#647481",
			w50: "#B1B9C0"
		}
	},

	background: {
		w100: "#021B2F",
		wMain: "#03223B",
		w20: "#F7F8F9",
		w10: "#FFFFFF"
	},

	info: {
		w100: "#2B71B1",
		wMain: "#0591D3",
		w70: "#7CD3F6",
		w30: "#B4DEF2",
		w20: "#CDE9F6",
		w10: "#E6F4FB"
	},

	error: {
		w100: "#C33135",
		wMain: "#E94C4E",
		w70: "#ED9B9D",
		w30: "#F8C9CA",
		w20: "#FBDBDC",
		w10: "#FDEDED"
	},

	warning: {
		w100: "#E1681F",
		wMain: "#FF8E2B",
		w70: "#F8C785",
		w30: "#FFDDBF",
		w20: "#FFE8D5",
		w10: "#FFF4EA"
	},

	success: {
		w100: "#006B53",
		wMain: "#009A80",
		w70: "#6FCCBC",
		w30: "#B3E1D9",
		w20: "#CCEBE6",
		w10: "#E6F5F2"
	},

	accent: {
		n0: {
			w100: "#2F51AD",
			wMain: "#3C69E1",
			w30: "#C5D2F6",
			w10: "#ECF0FC"
		},
		n1: {
			wMain: "#3A4880",
			w60: "#8991B3",
			w10: "#EBEDF2"
		},
		n2: {
			w100: "#165E64",
			wMain: "#009193",
			w30: "#B3DEDF",
			w10: "#E6F4F4"
		},
		n3: {
			w100: "#542D75",
			wMain: "#7841A8",
			w30: "#D7C6E5",
			w10: "#F2ECF6"
		},
		n4: {
			wMain: "#E53170"
		},
		n5: {
			wMain: "#F66651"
		},
		n6: {
			wMain: "#FCA829",
			w30: "#FEE5BF"
		},
		n7: {
			wMain: "#5ECCEE"
		},
		n8: {
			wMain: "#86939E",
			w30: "#DBDFE2"
		}
	},

	deprecated: {
		primary: {
			wMain: "#015B82",
			w20: "#CCDEE6",
			text: {
				wMain: "#273749",
				w10: "#FFFFFF"
			}
		},
		secondary: {
			w80: "#354E62",
			w8040: alpha("#354E62", 0.4),
			wMain: "#8790A0",
			w20: "#E7E9EC",
			w10: "#F3F4F6",
			text: {
				wMain: "#647481",
				w50: "#B1B9C0"
			}
		},
		accent: {
			n2: {
				wMain: "#009193"
			}
		},
		// new chip colours are TBD in UX
		chip: {
			royalBlue: "#3A4880",
			darkBlue: "#273749",
			opaqueBlue: "rgba(58, 72, 128, 0.5)",
			infoBlue: "#2B71B1",
			infoBgBlue: "#E6F4FB",
			warnYellow: "#E1681F",
			warnBgYellow: "#FFF4EA",
			lightGrey: "#EBEDF2",
			smokeGrey: "#DBDFE2",
			white: "#FFF",
			fill: "rgba(0, 0, 0, 0.1)",
			hover: "rgba(0, 0, 0, 0.2)",
			infoLightLabelBlue: "#E0F5FD",
			errorBgRed: "#FDEDED",
			successBgGreen: "#DDF2EF",
			infoLightBgBlue: "#2C75B7",
			errorLabel: "#C33135",
			successLabel: "#006B53"
		}
	}
};

/**
 * ThemeMapping for a new Solace palette
 */
export const solaceNewThemeMapping: ThemeMapping = {
	...baseThemeMapping, // for deprecated key support
	palette: palette
};
