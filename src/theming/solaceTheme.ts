import { alpha } from "@mui/system";

import { solaceColors } from "./solaceColors";
import { ThemeMapping } from "../types/ThemeMapping";

export const solaceTheme: ThemeMapping = {
	pallete: {
		error: solaceColors.baseRed,
		greyBackgroundLight: solaceColors.whiteSmoke2,
		info: solaceColors.azureRadiance,
		primary: solaceColors.baseGreen,
		secondary: solaceColors.caribbeanGreen3,
		success: solaceColors.baseLightGreen,
		text: alpha(solaceColors.baseBlack, 0.8),
		labelText: alpha(solaceColors.baseBlack, 0.65),
		textSecondary: alpha(solaceColors.baseBlack, 0.55),
		warning: solaceColors.butterCupYellow3,
		white: solaceColors.white2,

		//toasts
		toastText: solaceColors.white2,
		toastBackground: solaceColors.charcoal1,
		toastSuccessIcon: solaceColors.caribbeanGreen5,

		//chips
		nonadminPill: alpha(solaceColors.baseBlack, 0.1),
		adminPill: alpha(solaceColors.baseBlack, 0.35),

		//Button

		buttonTextHoverBG: alpha(solaceColors.baseBlack, 0.05),
		buttonOutlinedHoverBG: solaceColors.wildSandGrey2,
		buttonLinkDisabled: alpha(solaceColors.baseBlack, 0.2),
		buttonIconBG: solaceColors.white1
	}
};
