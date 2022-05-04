import { alpha } from "@mui/system";
import { ThemeMapping } from "../../types/ThemeMapping";

/**
 * Base ThemeMapping for the Solace palette
 * TODO: finish mapping keys to colours as usage increases
 *
 * When the new colour palette is in place, this palette can be removed and it can take
 * its place as the base theme mapping.
 */
export const baseThemeMapping: ThemeMapping = {
	palette: {
		brand: "#00AD93",
		brandHighlight: "#e8f9f4",
		brandHighlightHeavy: "#00C895",
		brandIcon: alpha("#00AD93", 0.3),

		action: {
			primary: {
				default: "#00AD93",
				active: "#05BDA1",
				hover: "#00CCAD",
				disabled: alpha("#000000", 0.2)
			},
			secondary: {
				default: "#00ad93",
				active: "#F9F9F9",
				hover: alpha("#000000", 0.05),
				disabled: alpha("#000000", 0.2)
			},
			icon: {
				default: alpha("#000000", 0.8),
				active: alpha("#000000", 0.05),
				hover: alpha("#000000", 0.1),
				disabled: alpha("#000000", 0.2)
			}
		},

		background: {
			primary: {
				default: "",
				highlight: ""
			},
			secondary: {
				default: "",
				highlight: ""
			}
		},

		neutral: {
			primary: {
				default: ""
			},
			secondary: {
				default: ""
			},
			tertiary: {
				default: ""
			},
			constrast: "#FFFFFF"
		},

		text: {
			primary: {
				default: alpha("#000000", 0.8),
				disabled: "#eeeeee"
			},
			secondary: {
				default: alpha("#000000", 0.65),
				disabled: "#eeeeee"
			},
			contrast: "#FFFFFF"
		},

		semantic: {
			error: {
				primary: {
					default: "#C33135",
					background: "#FDEDED",
					active: "",
					hover: ""
				},
				secondary: {
					default: ""
				},
				tertiary: {
					default: ""
				}
			},
			warn: {
				primary: {
					default: "#F3AA24",
					background: alpha("#F3AA24", 0.1),
					active: "",
					hover: ""
				},
				secondary: {
					default: ""
				},
				tertiary: {
					default: ""
				}
			},
			info: {
				primary: {
					default: "#0079FF",
					background: "#E6F2FF",
					active: "",
					hover: ""
				},
				secondary: {
					default: ""
				},
				tertiary: {
					default: ""
				}
			},
			success: {
				primary: {
					default: "#7ED321",
					background: alpha("#53AE0F", 0.1)
				},
				secondary: {
					default: ""
				},
				tertiary: {
					default: "#6FCCBC"
				}
			}
		},

		graph: {
			path: {
				default: "",
				active: "",
				hover: "",
				disabled: ""
			},
			accent1: {
				default: "",
				contrast1: "",
				constrast2: ""
			},
			accent2: {
				default: ""
			},
			accent3: {
				default: "",
				contrast1: "",
				constrast2: ""
			},
			accent4: {
				default: "",
				contrast1: "",
				constrast2: ""
			},
			accent5: {
				default: ""
			},
			accent6: {
				default: ""
			},
			accent7: {
				default: ""
			},
			accent8: {
				default: ""
			},
			accent9: {
				default: "",
				contrast1: ""
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
