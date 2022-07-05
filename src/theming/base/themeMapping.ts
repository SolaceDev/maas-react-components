import { alpha } from "@mui/system";
import { ThemeMapping } from "../../types/ThemeMapping";

/**
 * Base ThemeMapping for the Solace palette
 * TODO: replace with new palette at maas-react-components/src/theming/solace/themeMapping.ts
 */
export const baseThemeMapping: ThemeMapping = {
	palette: {
		brand: {
			wMain: "#00AD93",
			wMain30: alpha("#00AD93", 0.35),
			w30: "#00C895",
			w10: "#e8f9f4"
		},

		primary: {
			w100: "#05BDA1",
			w90: "#00CCAD",
			wMain: "#00AD93",
			wMain40: alpha("#000000", 0.35),
			w60: alpha("#00AD93", 0.35),
			w40: alpha("#00AD93", 0.35),
			w20: "#F9F9F9",
			w10: alpha("#000000", 0.05),

			text: {
				wMain: alpha("#000000", 0.8),
				w10: "#FFFFFF"
			}
		},

		secondary: {
			w80: alpha("#FFFFFF", 0.2),
			wMain: alpha("#000000", 0.5),
			w40: alpha("#000000", 0.2),
			w20: alpha("#000000", 0.1),
			w10: alpha("#000000", 0.1),

			text: {
				wMain: alpha("#000000", 0.65),
				w50: alpha("#000000", 0.35)
			}
		},

		background: {
			w100: "",
			wMain: "#3f3f3f",
			w20: "#F9F9F9",
			w10: "#FFFFFF"
		},

		info: {
			w100: "#0079FF",
			wMain: "",
			w70: "",
			w30: "",
			w20: "",
			w10: "#E6F2FF"
		},

		error: {
			w100: "#C33135",
			wMain: "",
			w70: "",
			w30: "",
			w20: "",
			w10: "#FAE6E8"
		},

		warning: {
			w100: "#F3AA24",
			wMain: "",
			w70: "",
			w30: "",
			w20: "",
			w10: alpha("#F3AA24", 0.1)
		},

		success: {
			w100: "#7ED321",
			wMain: "#6FCCBC",
			w70: "",
			w30: "",
			w20: "",
			w10: alpha("#53AE0F", 0.1)
		},

		accent: {
			n0: {
				w100: "",
				wMain: "",
				w30: "",
				w10: ""
			},
			n1: {
				wMain: "",
				w60: "",
				w10: ""
			},
			n2: {
				w100: "",
				wMain: "#00AD93",
				w30: alpha("#00AD93", 0.35),
				w10: alpha("#009193", 0.1)
			},
			n3: {
				w100: "",
				wMain: "",
				w30: "",
				w10: ""
			},
			n4: {
				wMain: ""
			},
			n5: {
				wMain: ""
			},
			n6: {
				wMain: "",
				w30: ""
			},
			n7: {
				wMain: ""
			},
			n8: {
				wMain: "#6A6A6A",
				w30: ""
			}
		},

		deprecated: {
			primary: {
				wMain: alpha("#000000", 0.8),
				w20: alpha("#000000", 0.1),
				text: {
					w10: alpha("#FFFFFF", 0.9)
				}
			},
			secondary: {
				w80: alpha("#000000", 0.8),
				wMain: alpha("#000000", 0.35),
				w20: alpha("#000000", 0.05),
				w10: alpha("#000000", 0.05),
				text: {
					wMain: alpha("#000000", 0.55),
					w50: alpha("#000000", 0.55)
				}
			},
			accent: {
				n2: {
					wMain: "#00C895"
				}
			},
			// new chip colours are TBD in UX
			chip: {
				royalBlue: "#3A4880",
				darkBlue: "#273749",
				opaqueBlue: "rgba(58, 72, 128, 0.5)",
				infoBlue: "#0079FF",
				infoBgBlue: alpha("#0079FF", 0.1),
				warnYellow: "#F3AA24",
				warnBgYellow: alpha("#F3AA24", 0.1),
				lightGrey: "#EBEDF2",
				smokeGrey: "#DBDFE2",
				white: "#FFF",
				fill: "rgba(0, 0, 0, 0.1)",
				hover: "rgba(0, 0, 0, 0.2)"
			}
		}
	},

	/**
	 * @deprecated This scheme is deprecated and will be removed when no longer used.
	 */
	pallete: {
		error: "#d0021b",
		greyBackgroundLight: "#f9f9f9",
		info: "#0079ff",
		primary: "#00ad93",
		secondary: "#00ccad",
		success: "#7ed321",
		text: alpha("#000000", 0.8),
		labelText: alpha("#000000", 0.65),
		textSecondary: alpha("#000000", 0.55),
		warning: "#f3aa24",
		white: "#FFFFFF",

		//toasts
		toastText: "#FFFFFF",
		toastBackground: "#474747",
		toastSuccessIcon: "#94EAD4",

		//chips
		nonadminPill: alpha("#000000", 0.1),
		adminPill: alpha("#000000", 0.35),

		//Button - these seem more inconsistent with others, can other variations be used?
		buttonTextHoverBG: alpha("#000000", 0.05),
		buttonOutlinedHoverBG: "#f4f5f5",
		buttonLinkDisabled: alpha("#000000", 0.2),
		buttonIconBG: "EEEEEE"
	}
};
