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
				default: toReplace,
				active: baseColors.greens.green6,
				hover: baseColors.greens.green5
			},
			variation2: {
				default: toReplace,
				active: baseColors.greys.grey19,
				hover: baseColors.greys.grey18
			},
			variation3: {
				default: baseColors.baseGreen,
				active: baseColors.greys.grey19,
				hover: baseColors.greys.grey1
			},
			variation4: {
				default: baseColors.greys.grey14,
				active: baseColors.greys.grey1,
				hover: baseColors.greys.grey2
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
			overlay: toReplace
		},

		neutral: {
			default: toReplace,
			contrast: toReplace // white?
		},

		text: {
			disabled: baseColors.whites.white1,
			primary: {
				default: toReplace,
				contrast: baseColors.whites.white1,
				label: toReplace
			},
			secondary: {
				default: toReplace,
				contrast: toReplace
			}
		},

		semantic: {
			error: {
				variation1: {
					default: toReplace,
					background: toReplace
				},
				variation2: {
					default: toReplace
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
		error: baseColors.baseRed,
		greyBackgroundLight: baseColors.whiteSmoke2,
		info: baseColors.azureRadiance,
		primary: baseColors.baseGreen,
		secondary: baseColors.caribbeanGreen3,
		success: baseColors.baseLightGreen,
		text: alpha(baseColors.baseBlack, 0.8),
		labelText: alpha(baseColors.baseBlack, 0.65),
		textSecondary: alpha(baseColors.baseBlack, 0.55),
		warning: baseColors.butterCupYellow3,
		white: baseColors.white2,

		//toasts
		toastText: baseColors.white2,
		toastBackground: baseColors.charcoal1,
		toastSuccessIcon: baseColors.caribbeanGreen5,

		//chips
		nonadminPill: alpha(baseColors.baseBlack, 0.1),
		adminPill: alpha(baseColors.baseBlack, 0.35),

		//Button
		buttonTextHoverBG: alpha(baseColors.baseBlack, 0.05),
		buttonOutlinedHoverBG: baseColors.wildSandGrey2,
		buttonLinkDisabled: alpha(baseColors.baseBlack, 0.2),
		buttonIconBG: baseColors.white1
	}
};
