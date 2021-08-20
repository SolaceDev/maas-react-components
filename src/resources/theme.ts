import { grey, red } from "@material-ui/core/colors";

import { GREEN1, GREEN2, GREEN3, GREY1, GREY2, GREY3, GREY4, GREY6, WHITE1 } from "./colorPallet";

// A custom theme for this app
const theme = {
	breakpoints: {
		values: {
			// desktop
			lg: 1200,

			// small laptop
			md: 900,

			// tablets
			sm: 600,

			//custom solace dialog
			solaceMd: 800,

			// large screens
			xl: 1536,

			//mobile
			xs: 0
		}
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				colorPrimary: {
					backgroundColor: "#474747"
				}
			}
		},
		MuiButton: {
			defaultProps: {
				disableRipple: true,
				disableElevation: true
			},
			styleOverrides: {
				contained: {
					"&:disabled": {
						color: WHITE1,
						backgroundColor: GREY1
					},
					"&:active": {
						backgroundColor: GREEN2
					}
				},
				outlinedPrimary: {
					borderWidth: "1px",
					borderStyle: "solid",
					"&:disabled": {
						color: GREY1,
						borderColor: GREY1
					},
					"&:hover": {
						backgroundColor: GREY2
					},
					"&:active": {
						backgroundColor: GREY3
					}
				},
				root: {
					textTransform: "none",
					padding: "6px 16px",
					borderRadius: "4px",
					minWidth: "100px",
					height: "32px",
					fontWeight: "medium"
				},
				startIcon: {
					"&>*:nth-of-type(1)": {
						fontSize: "unset",
						width: "24px",
						height: "24px",
						marginLeft: "-12px"
					}
				},
				endIcon: {
					"&>*:nth-of-type(1)": {
						fontSize: "unset",
						width: "24px",
						height: "24px",
						marginRight: "-12px"
					}
				},
				textPrimary: {
					"&:disabled": {
						color: GREY1
					},
					"&:hover": {
						backgroundColor: GREY2
					},
					"&:active": {
						backgroundColor: GREY3
					}
				}
			}
		},
		MuiDialogActions: {
			styleOverrides: {
				spacing: {
					"& :not(:first-of-type)": {
						marginLeft: "8px"
					}
				}
			}
		},
		MuiDialogTitle: {
			styleOverrides: {
				root: {
					padding: "24px 24px 16px 24px"
				}
			}
		},
		MuiFormControl: {
			styleOverrides: {
				root: {
					backgroundColor: "white"
				}
			}
		},
		MuiFormControlLabel: {
			styleOverrides: {
				label: {
					fontSize: "0.875rem"
				},
				root: {
					color: "inherit"
				}
			}
		},
		MuiIconButton: {
			defaultProps: { disableRipple: true },
			styleOverrides: {
				root: {
					padding: "4px",
					borderRadius: "5px",
					"&:disabled": {
						color: GREY1
					},
					"&:hover": {
						backgroundColor: GREY2
					},
					"&:active": {
						backgroundColor: GREY4
					}
				}
			}
		},
		MuiInputLabel: {
			styleOverrides: {
				asterisk: {
					color: GREEN1
				},
				root: {
					color: grey[800],
					fontSize: "0.875rem",
					fontWeight: 500
				}
			}
		},
		MuiLink: {
			styleOverrides: {
				root: {
					padding: "6px 16px",
					borderRadius: "4px",
					minWidth: "100px",
					height: "32px",
					fontWeight: "normal",
					fontSize: "14px",
					"&[disabled]": {
						color: GREY1
					}
				}
			}
		}
	},
	palette: {
		background: {
			default: "#f9f9f9"
		},
		error: {
			main: red.A400
		},
		primary: {
			contrastText: WHITE1,
			dark: GREEN3,
			main: GREEN1
		},
		secondary: {
			contrastText: WHITE1,
			main: GREEN3
		},
		text: {
			primary: GREY6
		}
	},
	spacing: 8,
	typography: {
		body1: {
			fontSize: "0.875rem"
		},
		fontFamily: "Rubik,sans-serif",
		one33rem: { fontSize: "1.33rem" }
	}
};

export default theme;
