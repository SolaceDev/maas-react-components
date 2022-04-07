import { alpha, lighten } from "@mui/material";

import { sapColors } from "./colors";
import { baseThemeMapping } from "../base/themeMapping";
import { ThemeMapping } from "../../types/ThemeMapping";

const toReplace = "#FF5F00";
export const sapThemeMapping: ThemeMapping = {
	...baseThemeMapping,
	palette: {
		...baseThemeMapping.palette,
		action: {
			disabled: sapColors.greys.grey3,
			variation1: {
				default: sapColors.primary2,
				active: alpha(sapColors.primary2, 0.3),
				hover: alpha(sapColors.primary2, 0.5)
			},
			variation2: {
				default: toReplace,
				active: alpha(sapColors.primary2, 0.1),
				hover: alpha(sapColors.primary2, 0.05)
			},
			variation3: {
				default: sapColors.primary2,
				active: sapColors.greys.grey19,
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
		}
	},

	/**
	 * @deprecated This scheme is deprecated and will be removed when no longer used.
	 */
	pallete: {
		error: sapColors.negative,
		greyBackgroundLight: sapColors.primary4,
		info: sapColors.information,
		primary: sapColors.primary2,
		secondary: sapColors.primary2,
		success: sapColors.positive,
		text: sapColors.primary6,
		labelText: sapColors.primary7,
		textSecondary: sapColors.primary7,
		warning: sapColors.critical,
		white: sapColors.primary3,

		//toasts
		toastText: sapColors.primary6,
		toastBackground: lighten(sapColors.primary2, 0.9),
		toastSuccessIcon: sapColors.positive,

		//chips
		nonadminPill: alpha(sapColors.primary7, 0.1),
		adminPill: sapColors.primary7,

		//Button
		buttonIconBG: alpha(sapColors.primary2, 0.1),
		buttonLinkDisabled: alpha(sapColors.primary2, 0.2),
		buttonOutlinedHoverBG: alpha(sapColors.primary2, 0.1),
		buttonTextHoverBG: alpha(sapColors.primary2, 0.1)
	}
};
