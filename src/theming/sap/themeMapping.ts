import { alpha, lighten } from "@mui/material";

import { ThemeMapping, ThemeMappingPalette } from "../../types/ThemeMapping";

const palette: ThemeMappingPalette = {
	brand: {
		wMain: "#0A6ED1",
		wMain30: alpha("#0A6ED1", 0.3),
		w30: "#B6D4F1",
		w10: "#E7F1FA"
	},

	primary: {
		w100: "#07529C",
		w90: "#0961B9",
		wMain: "#0A6ED1",
		w60: "#6CA8E3",
		w40: "#9DC5ED",
		w20: "#CEE2F6",
		w10: "#E7F1FA",

		text: {
			wMain: "#32363A",
			w10: "#FFFFFF"
		}
	},

	secondary: {
		w80: "#5D6E7F",
		w8040: alpha("#5D6E7F", 0.4),
		wMain: "#89919A",
		w40: "#D0D3D7",
		w20: "#E7E9EB",
		w10: "#F3F4F5",

		text: {
			wMain: "#6A6D70",
			w50: "#D2D3D4"
		}
	},

	background: {
		w100: "#021B2F",
		wMain: "#354A5F",
		w20: "#EDEFF0",
		w10: "#FFFFFF"
	},

	info: {
		w100: "#0964BE",
		wMain: "#0A6ED1",
		w70: "#91C8F6",
		w30: "#C6DEF6",
		w20: "#DDECFA",
		w10: "#F5FAFF"
	},

	error: {
		w100: "#9E0000",
		wMain: "#BB0000",
		w70: "#FF8888",
		w30: "#F1BCBC",
		w20: "#F8D4D4",
		w10: "#FFEBEB"
	},

	warning: {
		w100: "#D16100",
		wMain: "#E9730C",
		w70: "#FABD64",
		w30: "#FADDC3",
		w20: "#FCEADA",
		w10: "#FEF7F1"
	},

	success: {
		w100: "#0D6431",
		wMain: "#107E3E",
		w70: "#ABE2AB",
		w30: "#C4E4D1",
		w20: "#DAF0E4",
		w10: "#F1FDF6"
	},

	accent: {
		n0: {
			w100: "#0C656F",
			wMain: "#0F828F",
			w30: "#B7DADD",
			w10: "#E7F3F4"
		},
		n1: {
			wMain: "#6367DE",
			w60: "#D0D1F5",
			w10: "#EFF0FC"
		},
		n2: {
			w100: "#205992",
			wMain: "#286EB4",
			w30: "#7EA8D2",
			w10: "#EAF1F7"
		},
		n3: {
			w100: "#6E33AD",
			wMain: "#925ACE",
			w30: "#DECEF0",
			w10: "#F4EFFA"
		},
		n4: {
			wMain: "#DB1F77"
		},
		n5: {
			wMain: "#D04343"
		},
		n6: {
			wMain: "#D08014",
			w30: alpha("#D08014", 0.3)
		},
		n7: {
			wMain: "#7CA10C"
		},
		n8: {
			wMain: "#647987",
			w30: "#D1D7DB"
		}
	},

	deprecated: {
		primary: {
			wMain: "#0A6ED1",
			w20: "#CEE2F6",
			text: {
				wMain: "#32363A",
				w10: "#FFFFFF"
			}
		},
		secondary: {
			w80: "#5D6E7F",
			w8040: alpha("#5D6E7F", 0.4),
			wMain: "#89919A",
			w20: "#E7E9EB",
			w10: "#F3F4F5",
			text: {
				wMain: "#6A6D70",
				w50: "#D2D3D4"
			}
		},
		accent: {
			n2: {
				wMain: "#286EB4"
			}
		},
		// new chip colours are TBD in UX
		chip: {
			royalBlue: "#3A4880",
			darkBlue: "#273749",
			opaqueBlue: "rgba(58, 72, 128, 0.5)",
			infoBlue: "#0964BE",
			infoBgBlue: "#F5FAFF",
			warnYellow: "#D16100",
			warnBgYellow: "#FEF7F1",
			lightGrey: "#EBEDF2",
			smokeGrey: "#DBDFE2",
			white: "#FFF",
			fill: "rgba(0, 0, 0, 0.1)",
			hover: "rgba(0, 0, 0, 0.2)",
			infoLightBgBlue: "#E0F5FD",
			errorBgRed: "#FDEDED",
			successBgGreen: "#DDF2EF",
			infoLightLabelBlue: "#2C75B7",
			errorLabel: "#C33135",
			successLabel: "#006B53"
		}
	}
};

/**
 * ThemeMapping for the SAP palette
 */
export const sapThemeMapping: ThemeMapping = {
	palette: palette,

	/**
	 * @deprecated This scheme is deprecated and will be removed when no longer used.
	 */
	pallete: {
		error: palette.error.wMain,
		greyBackgroundLight: palette.background.w10,
		info: palette.brand.wMain,
		primary: palette.brand.wMain,
		secondary: palette.brand.wMain,
		success: palette.success.wMain,
		text: palette.primary.text.wMain,
		labelText: palette.secondary.text.wMain,
		textSecondary: palette.secondary.text.wMain,
		warning: palette.warning.wMain,
		white: palette.background.w10,

		//toasts
		toastText: palette.primary.text.wMain,
		toastBackground: lighten(palette.brand.wMain, 0.9),
		toastSuccessIcon: palette.success.wMain,

		//chips
		nonadminPill: alpha(palette.secondary.text.wMain, 0.1),
		adminPill: palette.secondary.text.wMain,

		//Button
		buttonTextHoverBG: alpha(palette.brand.wMain, 0.1),
		buttonOutlinedHoverBG: alpha(palette.brand.wMain, 0.1),
		buttonLinkDisabled: alpha(palette.brand.wMain, 0.2),
		buttonIconBG: alpha(palette.brand.wMain, 0.1)
	}
};
