import { alpha } from "@mui/material";
import { ThemeMappingPalette } from "../types";
import { Palette } from "../types/Palette";

const getThemeMappingPalette = (palette: Palette): ThemeMappingPalette => {
	return {
		brand: palette.brandPrimary,
		brandHighlight: palette.brand10,
		brandHighlightHeavy: palette.brand30,
		brandIcon: alpha(palette.brandPrimary, 0.3),

		action: {
			primary: {
				default: palette.primaryPrimary,
				active: palette.primary100,
				hover: palette.primary90,
				disabled: palette.secondary40
			},
			secondary: {
				default: palette.primaryPrimary,
				active: palette.primary20,
				hover: palette.primary10,
				disabled: palette.secondary40
			},
			icon: {
				default: palette.secondaryPrimary,
				active: palette.secondary20,
				hover: palette.secondary10,
				disabled: palette.secondary40
			}
		},

		background: {
			primary: {
				default: palette.lightBackgroundPrimary,
				highlight: palette.secondary40
			},
			secondary: {
				default: palette.darkBackgroundPrimary,
				highlight: palette.darkBackground80
			}
		},

		neutral: {
			primary: {
				default: palette.secondaryPrimary
			},
			secondary: {
				default: palette.secondary40
			},
			tertiary: {
				default: palette.secondary20
			},
			constrast: palette.white
		},

		text: {
			primary: {
				default: palette.primaryTextPrimary,
				disabled: palette.secondaryText50
			},
			secondary: {
				default: palette.secondaryTextPrimary,
				disabled: palette.secondaryText50
			},
			contrast: palette.white
		},

		semantic: {
			error: {
				primary: {
					default: palette.error100,
					background: palette.error10,
					active: palette.error30,
					hover: palette.error20
				},
				secondary: {
					default: palette.errorPrimary
				},
				tertiary: {
					default: palette.error70
				}
			},
			warn: {
				primary: {
					default: palette.warning100,
					background: palette.warning10,
					active: palette.warning30,
					hover: palette.warning20
				},
				secondary: {
					default: palette.warningPrimary
				},
				tertiary: {
					default: palette.warning70
				}
			},
			info: {
				primary: {
					default: palette.info100,
					background: palette.info10,
					active: palette.info30,
					hover: palette.info20
				},
				secondary: {
					default: palette.infoPrimary
				},
				tertiary: {
					default: palette.info70
				}
			},
			success: {
				primary: {
					default: palette.success100,
					background: palette.success10
				},
				secondary: {
					default: palette.successPrimary
				},
				tertiary: {
					default: palette.successPrimary
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
	};
};

export default getThemeMappingPalette;
