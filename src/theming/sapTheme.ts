import { alpha, lighten } from "@material-ui/core";

import { sapColors } from "./sapColors";
import { ThemeMapping } from "./ThemeMapping";

export const sapTheme: ThemeMapping = {
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
