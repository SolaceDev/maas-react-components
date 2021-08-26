import { grey, red } from "@material-ui/core/colors";

import { BASE_COLORS } from "./colorPallette";
import { BASE_FONT_SIZES } from "./typography";

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
				containedPrimary: {
					color: BASE_COLORS.whites.white1,
					"&:hover": {
						backgroundColor: BASE_COLORS.greens.green5
					},
					"&:disabled": {
						color: BASE_COLORS.whites.white1,
						backgroundColor: BASE_COLORS.greys.grey3
					},
					"&:active": {
						backgroundColor: BASE_COLORS.greens.green6
					}
				},
				outlinedPrimary: {
					borderWidth: "1px",
					borderStyle: "solid",
					"&:disabled": {
						color: BASE_COLORS.greys.grey3,
						borderColor: BASE_COLORS.greys.grey3
					},
					"&:hover": {
						backgroundColor: BASE_COLORS.greys.grey18
					},
					"&:active": {
						backgroundColor: BASE_COLORS.greys.grey19
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
					borderRadius: "4px",
					"&:disabled": {
						color: BASE_COLORS.greys.grey3
					},
					"&:hover": {
						backgroundColor: BASE_COLORS.greys.grey0
					},
					"&:active": {
						backgroundColor: BASE_COLORS.greys.grey19
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
					margin: "0px"
				}
			}
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					fontSize: "0.75rem",
					color: BASE_COLORS.greys.grey11,
					lineHeight: "150%",
					".MuiSvgIcon-root": {
						width: "18px",
						height: "18px"
					}
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
						color: BASE_COLORS.greys.grey3
					},
					"&:hover": {
						backgroundColor: BASE_COLORS.greys.grey23
					},
					"&:active": {
						backgroundColor: BASE_COLORS.greys.grey19
					}
				}
			}
		},
		MuiInputLabel: {
			styleOverrides: {
				asterisk: {
					color: BASE_COLORS.greens.green2
				},
				root: {
					color: BASE_COLORS.greys.grey11,
					fontSize: "0.875rem",
					fontWeight: 500,
					lineHeight: "150%",
					"&.Mui-disabled": {
						color: BASE_COLORS.greys.grey8
					}
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
						color: BASE_COLORS.greys.grey3
					}
				}
			}
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					".MuiOutlinedInput-notchedOutline": {
						border: `solid 1px ${BASE_COLORS.greys.grey3}`,
						backgroundColor: BASE_COLORS.greys.grey1
					},
					"&:hover": {
						".MuiOutlinedInput-notchedOutline": {
							border: `solid 1px ${BASE_COLORS.greys.grey5}`,
							backgroundColor: BASE_COLORS.greys.grey1
						}
					},
					"&.Mui-focused": {
						".MuiOutlinedInput-notchedOutline": {
							border: `solid 1px ${BASE_COLORS.greens.green1}`
						}
					},
					"&.Mui-disabled": {
						backgroundColor: BASE_COLORS.greys.grey19,
						".MuiOutlinedInput-notchedOutline": {
							border: `solid 1px ${BASE_COLORS.greys.grey2}`
						},
						input: {
							"-webkit-text-fill-color": BASE_COLORS.greys.grey14
						}
					}
				},
				input: {
					fontSize: BASE_FONT_SIZES.sm,
					color: BASE_COLORS.greys.grey14,
					padding: "0px 8px",
					height: "35px"
				}
			}
		}
	},
	palette: {
		background: {
			default: BASE_COLORS.greys.grey4
		},
		error: {
			main: BASE_COLORS.reds.red1
		},
		primary: {
			contrastText: BASE_COLORS.greys.grey1,
			dark: BASE_COLORS.greens.green5,
			main: BASE_COLORS.greens.green2
		},
		secondary: {
			contrastText: BASE_COLORS.greys.grey1,
			main: BASE_COLORS.greens.green3
		},
		text: {
			primary: BASE_COLORS.greys.grey14
		}
	},
	spacing: 8,
	typography: {
		fontSize: BASE_FONT_SIZES.sm,
		body1: {
			fontSize: "0.875rem"
		},
		fontFamily: "Rubik,sans-serif",
		one33rem: { fontSize: "1.33rem" }
	}
};

export default theme;
