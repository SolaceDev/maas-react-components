import { alpha, lighten } from "@mui/material";

import { sapColors } from "./colors";
import { baseThemeMapping } from "../base/themeMapping";
import { ThemeMapping } from "../../types/ThemeMapping";

export const sapThemeMapping: ThemeMapping = {
	...baseThemeMapping,
	palette: {
		...baseThemeMapping.palette,
		action: {
			disabled: alpha(sapColors.primary2, 0.2),
			variation1: {
				default: sapColors.primary2,
				active: alpha(sapColors.primary2, 0.3),
				hover: alpha(sapColors.primary2, 0.5)
			},
			variation2: {
				default: sapColors.primary2,
				active: alpha(sapColors.primary2, 0.1),
				hover: alpha(sapColors.primary2, 0.05)
			},
			variation3: {
				default: sapColors.primary2,
				active: alpha(sapColors.primary2, 0.1),
				hover: sapColors.greys.grey1
			},
			variation4: {
				default: sapColors.greys.grey4,
				active: sapColors.greys.grey19,
				hover: sapColors.greys.grey1
			}
		},

		brand: {
			brand1: sapColors.primary2,
			brand2: sapColors.primary2,
			brand3: sapColors.primary2,
			brand4: alpha(sapColors.primary2, 0.1),
			brand5: sapColors.primary2,
			active1: alpha(sapColors.primary2, 0.1),
			active2: alpha(sapColors.primary2, 0.4)
		},

		container: {
			...baseThemeMapping.palette.container,
			variation1: {
				default: sapColors.primary7
			},
			variation2: {
				default: alpha(sapColors.primary7, 0.1)
			},
			variation3: {
				default: sapColors.primary4
			},
			variation4: {
				default: lighten(sapColors.primary2, 0.9)
			}
		},

		text: {
			...baseThemeMapping.palette.text,
			primary: {
				default: sapColors.primary6,
				contrast: sapColors.primary3,
				label: sapColors.primary7
			},
			secondary: {
				default: sapColors.primary7,
				contrast: sapColors.primary6
			}
		},

		semantic: {
			...baseThemeMapping.palette.semantic,
			error: {
				...baseThemeMapping.palette.semantic.error,
				variation1: {
					default: sapColors.negative,
					background: alpha(sapColors.negative, 0.1)
				}
			},
			warn: {
				...baseThemeMapping.palette.semantic.warn,
				variation1: {
					default: sapColors.critical,
					background: alpha(sapColors.critical, 0.1)
				}
			},
			info: {
				...baseThemeMapping.palette.semantic.info,
				variation1: {
					default: sapColors.information,
					background: alpha(sapColors.information, 0.1)
				}
			},
			success: {
				...baseThemeMapping.palette.semantic.success,
				variation1: {
					default: sapColors.positive,
					background: alpha(sapColors.positive, 0.1)
				},
				variation2: {
					default: sapColors.positive
				}
			}
		}
	},

	/**
	 * @deprecated This scheme is deprecated and will be removed when no longer used.
	 */
	pallete: {
		error: sapColors.negative, // semantic.error.variation1.default
		greyBackgroundLight: sapColors.primary4, // container.variation3.default
		info: sapColors.information, // semantic.info.variation1.default
		primary: sapColors.primary2, // action.variation1.default
		secondary: sapColors.primary2, // action.variation2.default
		success: sapColors.positive, // semantic.success.variation1.default
		text: sapColors.primary6, // text.primary.default
		labelText: sapColors.primary7, // text.primary.label
		textSecondary: sapColors.primary7, // text.secondary.default
		warning: sapColors.critical, // semantic.warn.variation1.default
		white: sapColors.primary3, // text.primary.contrast

		//toasts
		toastText: sapColors.primary6, // text.secondary.contrast
		toastBackground: lighten(sapColors.primary2, 0.9), // container.variation4.default
		toastSuccessIcon: sapColors.positive, // semantic.success.variation2.default

		//chips
		nonadminPill: alpha(sapColors.primary7, 0.1), // container.variation2.default
		adminPill: sapColors.primary7, // container.variation1.default

		//Button
		buttonTextHoverBG: alpha(sapColors.primary2, 0.1), // action.variation3.hover
		buttonOutlinedHoverBG: alpha(sapColors.primary2, 0.1), // ? can we align with something else
		buttonLinkDisabled: alpha(sapColors.primary2, 0.2), // action.disabled
		buttonIconBG: alpha(sapColors.primary2, 0.1) // ? can we align with something else
	}
};
