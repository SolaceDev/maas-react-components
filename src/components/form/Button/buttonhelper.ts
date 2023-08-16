import { useTheme } from "@mui/material";
import { getNewSolaceTheme } from "../../../theming/themeUtils";

export function LearningStyles() {
	const theme = useTheme();
	const newSolaceTheme = getNewSolaceTheme();
	// Temporary way to retrieve the new theme colors until the old theme is deprecated
	// Future migration can be done by using the new theme colors directly and removing the v2 prop
	return {
		borderRadius: `${theme.spacing()} ${theme.spacing(0.5)}`,
		color: theme.palette.ux.learning.wMain,
		backgroundColor: newSolaceTheme.palette.brand.w60,
		"&:hover": {
			backgroundColor: newSolaceTheme.palette.brand.wMain
		},
		"&.pressed": {
			backgroundColor: newSolaceTheme.palette.brand.w100
		},
		"&:disabled": {
			backgroundColor: newSolaceTheme.palette.brand.w10,
			color: theme.palette.ux.learning.wMain
		}
	};
}

export function LearningLightStyles() {
	const theme = useTheme();
	const newSolaceTheme = getNewSolaceTheme();
	// Temporary way to retrieve the new theme colors until the old theme is deprecated
	// Future migration can be done by using the new theme colors directly and removing the v2 prop
	return {
		borderRadius: `${theme.spacing()} ${theme.spacing(0.5)}`,
		color: newSolaceTheme.palette.brand.w60,
		backgroundColor: theme.palette.ux.learning.wMain,
		"&:hover": {
			backgroundColor: theme.palette.ux.learning.w90
		},
		"&.pressed": {
			backgroundColor: theme.palette.ux.learning.w100
		},
		"&:disabled": {
			backgroundColor: theme.palette.ux.learning.w20,
			color: theme.palette.ux.primary.text.w10
		}
	};
}

export function LearningIconStyles() {
	const theme = useTheme();
	const newSolaceTheme = getNewSolaceTheme();
	// Temporary way to retrieve the new theme colors until the old theme is deprecated
	// Future migration can be done by using the new theme colors directly and removing the v2 prop
	return {
		".MuiSvgIcon-root": {
			fill: newSolaceTheme.palette.brand.w30
		},
		"&:hover": {
			backgroundColor: theme.palette.ux.learning.w90,
			".MuiSvgIcon-root": {
				color: newSolaceTheme.palette.brand.w60,
				fill: newSolaceTheme.palette.brand.w60
			}
		},
		"&.pressed": {
			backgroundColor: theme.palette.ux.learning.w100,
			".MuiSvgIcon-root": {
				color: newSolaceTheme.palette.brand.w60,
				fill: newSolaceTheme.palette.brand.w60
			}
		},
		"&:disabled": {
			".MuiSvgIcon-root": {
				fill: newSolaceTheme.palette.brand.w10
			}
		}
	};
}
