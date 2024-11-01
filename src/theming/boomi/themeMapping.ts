import { alpha } from "@mui/material";
import { ThemeMapping, ThemeMappingPalette } from "../../types/ThemeMapping";
import { baseThemeMapping } from "../base/themeMapping";

const palette: ThemeMappingPalette = {
	brand: {
		wMain: "#0000FF", // Blue
		wMain30: alpha("#0000FF", 0.3),
		w30: "#B3B3FF",
		w10: "#E6E6FF",
		w60: "#6666FF",
		w100: "#0000CC"
	},

	primary: {
		w100: "#000080", // Navy
		w90: "#000099",
		wMain: "#0000B2",
		w60: "#6666CC",
		w40: "#9999E6",
		w20: "#CCCCFF",
		w10: "#E6E6FF",

		text: {
			wMain: "#273749",
			w100: "#000000",
			w10: "#FFFFFF"
		}
	},

	secondary: {
		w70: "#0000CC", // Dark Blue
		w80: "#000099", // Medium Blue
		w8040: alpha("#000099", 0.4),
		w100: "#000066", // Navy Blue
		wMain: "#0000FF", // Blue
		w40: "#6666FF", // Light Blue
		w20: "#B3B3FF", // Lighter Blue
		w10: "#E6E6FF", // Lightest Blue

		text: {
			wMain: "#273749",
			w50: "#B1B9C0"
		}
	},

	background: {
		w100: "#000033", // Dark Blue
		wMain: "#00004D", // Medium Dark Blue
		w20: "#B3B3FF", // Light Blue
		w10: "#E6E6FF" // Lightest Blue
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

	stateLayer: {
		w10: alpha("#03223B", 0.1),
		w20: alpha("#03223B", 0.2)
	},

	accent: {
		n0: {
			w100: "#000080", // Navy Blue
			wMain: "#0000FF", // Blue
			w30: "#B3B3FF", // Light Blue
			w10: "#E6E6FF" // Lightest Blue
		},
		n1: {
			wMain: "#000066", // Dark Blue
			w60: "#6666CC", // Medium Blue
			w20: "#CCCCFF", // Light Blue
			w10: "#E6E6FF" // Lightest Blue
		},
		n2: {
			w100: "#003366", // Dark Teal Blue
			wMain: "#0066CC", // Medium Teal Blue
			w30: "#99CCFF", // Light Teal Blue
			w20: "#CCE5FF", // Lighter Teal Blue
			w10: "#E6F2FF" // Lightest Teal Blue
		},
		n3: {
			w100: "#330066", // Dark Purple Blue
			wMain: "#6600CC", // Medium Purple Blue
			w30: "#CC99FF", // Light Purple Blue
			w10: "#F2E6FF" // Lightest Purple Blue
		},
		n4: {
			wMain: "#0033CC" // Medium Blue
		},
		n5: {
			wMain: "#3366FF", // Bright Blue
			w60: "#99CCFF" // Light Bright Blue
		},
		n6: {
			wMain: "#3399FF", // Sky Blue
			w30: "#CCE5FF" // Light Sky Blue
		},
		n7: {
			wMain: "#66CCFF" // Light Sky Blue
		},
		n8: {
			wMain: "#99CCFF", // Light Blue
			w30: "#E6F2FF" // Lightest Blue
		},
		n9: {
			wMain: "#0033FF" // Bright Blue
		}
	},

	learning: {
		wMain: "#033A6F",
		w90: "#022E59",
		w100: "#022343",
		w20: "#CDD8E2",
		w10: "#E6EBF1"
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
			w30: "#8790A0",
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
			darkGrey: alpha("#000", 0.8),
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
export const boomiThemeMapping: ThemeMapping = {
	...baseThemeMapping, // for deprecated key support
	palette: palette
};
