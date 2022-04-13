import { alpha } from "@mui/system";
import { ThemeMapping } from "../../types/ThemeMapping";
import { baseColors } from "./colors";

/**
 * TODO: Theming todos
 *
 * - confirm Solace palette to use, mapping to current colours which may not fit theme schema well
 * - expand theme usage throughout MRC
 *   - replace all "toReplace" colours with correct theme colours (both base and SAP)
 *   - consider conflating colors.ts and themeMapping.ts to one file of type ThemeMapping
 * - expand theme usage throught maas-ui
 * - clean up (e.g. remove deprecated pallete object )
 */
const toReplace = "#FF5F00";
export const baseThemeMapping: ThemeMapping = {
	palette: {
		action: {
			disabled: baseColors.greys.grey3,
			variation1: {
				default: baseColors.baseGreen,
				active: baseColors.greens.green6,
				hover: baseColors.greens.green5
			},
			variation2: {
				default: baseColors.caribbeanGreen3,
				active: baseColors.greys.grey19,
				hover: baseColors.greys.grey18
			},
			variation3: {
				default: baseColors.baseGreen,
				active: baseColors.greys.grey19,
				hover: alpha(baseColors.baseBlack, 0.05)
			},
			variation4: {
				default: alpha(baseColors.baseBlack, 0.8),
				active: alpha(baseColors.baseBlack, 0.05),
				hover: alpha(baseColors.baseBlack, 0.1)
			}
		},

		brand: {
			brand1: baseColors.greens.green5,
			brand2: baseColors.greens.green3,
			brand3: baseColors.greens.green2,
			brand4: baseColors.greens.green9,
			brand5: baseColors.greens.green11,
			active1: baseColors.greens.green10,
			active2: baseColors.greens.green1
		},

		container: {
			default: baseColors.greys.grey19,
			contrast: toReplace,
			overlay: toReplace,
			variation1: {
				default: alpha(baseColors.baseBlack, 0.35)
			},
			variation2: {
				default: alpha(baseColors.baseBlack, 0.1)
			},
			variation3: {
				default: baseColors.whiteSmoke2
			},
			variation4: {
				default: baseColors.charcoal1
			}
		},

		neutral: {
			default: baseColors.whiteSmoke2,
			contrast: baseColors.whites.white1
		},

		text: {
			disabled: baseColors.whites.white1,
			primary: {
				default: alpha(baseColors.baseBlack, 0.8),
				contrast: baseColors.whites.white1,
				label: alpha(baseColors.baseBlack, 0.65)
			},
			secondary: {
				default: alpha(baseColors.baseBlack, 0.55),
				contrast: baseColors.whites.white1
			}
		},

		semantic: {
			error: {
				variation1: {
					default: baseColors.reds.red1,
					background: alpha(baseColors.reds.red1, 0.1)
				},
				variation2: {
					default: toReplace
				},
				variation3: {
					default: toReplace
				}
			},
			warn: {
				variation1: {
					default: baseColors.yellows.yellow1,
					background: baseColors.yellows.yellow2
				},
				variation2: {
					default: toReplace
				},
				variation3: {
					default: toReplace
				}
			},
			info: {
				variation1: {
					default: baseColors.blues.blue2,
					background: baseColors.blues.blue1
				},
				variation2: {
					default: toReplace
				},
				variation3: {
					default: toReplace
				}
			},
			success: {
				variation1: {
					default: baseColors.greens.green7,
					background: baseColors.greens.green12
				},
				variation2: {
					default: baseColors.caribbeanGreen5
				},
				variation3: {
					default: toReplace
				}
			}
		},

		graph: {
			accent1: {
				default: toReplace,
				contrast1: toReplace,
				constrast2: toReplace
			},
			accent2: {
				default: toReplace
			},
			accent3: {
				default: toReplace,
				contrast1: toReplace,
				constrast2: toReplace
			},
			accent4: {
				default: toReplace,
				contrast1: toReplace,
				constrast2: toReplace
			},
			accent5: {
				default: toReplace
			},
			accent6: {
				default: toReplace
			},
			accent7: {
				default: toReplace
			},
			accent8: {
				default: toReplace
			},
			accent9: {
				default: toReplace,
				contrast1: toReplace
			}
		}
	},

	/**
	 * @deprecated This scheme is deprecated and will be removed when no longer used.
	 */
	pallete: {
		error: baseColors.baseRed, // semantic.error.variation1.default
		greyBackgroundLight: baseColors.whiteSmoke2, // container.variation3.default
		info: baseColors.azureRadiance, // semantic.info.variation1.default
		primary: baseColors.baseGreen, // action.variation1.default
		secondary: baseColors.caribbeanGreen3, // action.variation2.default
		success: baseColors.baseLightGreen, // semantic.success.variation1.default
		text: alpha(baseColors.baseBlack, 0.8), // text.primary.default
		labelText: alpha(baseColors.baseBlack, 0.65), // text.primary.label
		textSecondary: alpha(baseColors.baseBlack, 0.55), // text.secondary.default
		warning: baseColors.butterCupYellow3, // semantic.warn.variation1.default
		white: baseColors.white2, // text.primary.contrast

		//toasts
		toastText: baseColors.white2, // text.secondary.contrast
		toastBackground: baseColors.charcoal1, // container.variation4.default
		toastSuccessIcon: baseColors.caribbeanGreen5, // semantic.success.variation2.default

		//chips
		nonadminPill: alpha(baseColors.baseBlack, 0.1), // container.variation2.default
		adminPill: alpha(baseColors.baseBlack, 0.35), // container.variation1.default

		//Button - these seem more inconsistent with others, can other variations be used?
		buttonTextHoverBG: alpha(baseColors.baseBlack, 0.05), // action.variation3.hover
		buttonOutlinedHoverBG: baseColors.wildSandGrey2, // ? can we align with something else
		buttonLinkDisabled: alpha(baseColors.baseBlack, 0.2), // action.disabled
		buttonIconBG: baseColors.white1 // ? can we align with something else
	}
};
