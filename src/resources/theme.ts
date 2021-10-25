import { BASE_COLORS, getRGBA } from "./colorPallette";
import { BASE_FONT_PX_SIZES } from "./typography";

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
					textTransform: "none" as const,
					padding: "6px 16px",
					borderRadius: "4px",
					minWidth: "100px",
					height: "32px",
					fontWeight: 500
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
		MuiFormControl: {
			styleOverrides: {
				root: {
					margin: "0px"
				}
			}
		},
		MuiFormGroup: {
			styleOverrides: {
				root: {
					".MuiBox-root:not(:last-child) .MuiRadio-root": {
						marginBottom: "12px"
					}
				}
			}
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					fontSize: "0.75rem",
					color: BASE_COLORS.greys.grey11,
					lineHeight: "150%",
					marginLeft: "0px",
					marginTop: "2px",
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
					"&.Mui-error": {
						color: BASE_COLORS.greys.grey11
					},
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
					fontWeight: "normal" as const,
					fontSize: "14px",
					"&[disabled]": {
						color: BASE_COLORS.greys.grey3
					}
				}
			}
		},
		MuiInputBase: {
			styleOverrides: {
				multiline: {
					// TextArea Component
					display: "inline-block",
					"&.MuiOutlinedInput-root": {
						padding: "0px",
						marginRight: "20px",
						display: "inline-table", // this ensures helper text is below textarea
						minWidth: "354px",
						".MuiOutlinedInput-notchedOutline": {
							border: "none"
						}
					},
					".MuiOutlinedInput-input": {
						border: `solid 1px ${BASE_COLORS.greys.grey3}`,
						borderRadius: "4px",
						padding: "8px"
					},
					"&:hover .MuiOutlinedInput-input:read-only, &.Mui-focused .MuiOutlinedInput-input:read-only, .MuiOutlinedInput-input:read-only":
						{
							border: "none",
							padding: "0px",
							cursor: "default"
						},
					"&:hover": {
						".MuiOutlinedInput-input": {
							border: `solid 1px ${BASE_COLORS.greys.grey5}`
						},
						"&.MuiOutlinedInput-root": {
							".MuiOutlinedInput-notchedOutline": {
								border: "none"
							}
						}
					},
					"&.Mui-focused": {
						".MuiOutlinedInput-input": {
							border: `solid 1px ${BASE_COLORS.greens.green1}`
						},
						"&.MuiOutlinedInput-root": {
							".MuiOutlinedInput-notchedOutline": {
								border: "none"
							}
						}
					},
					".Mui-disabled.MuiOutlinedInput-input, &:hover .Mui-disabled.MuiOutlinedInput-input": {
						backgroundColor: BASE_COLORS.greys.grey19,
						padding: "8px",
						border: `solid 1px ${BASE_COLORS.greys.grey2}`
					},
					"&.Mui-disabled .MuiOutlinedInput-input:read-only.Mui-disabled + .MuiOutlinedInput-notchedOutline": {
						border: "none"
					},
					".MuiInputBase-inputMultiline": {
						backgroundColor: BASE_COLORS.whites.white1
					}
				}
			}
		},
		MuiTextField: {
			// Textfield component
			styleOverrides: {
				root: {
					".MuiOutlinedInput-root": {
						backgroundColor: BASE_COLORS.whites.white1,
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
						"&:hover .MuiOutlinedInput-input:read-only": {
							".MuiOutlinedInput-notchedOutline": {
								border: "none"
							}
						},
						"&.readOnlySelect, .MuiOutlinedInput-root.readOnlySelect.Mui-focused": {
							".MuiOutlinedInput-notchedOutline": {
								border: "none"
							},
							".MuiSvgIcon-root": {
								display: "none"
							},
							".MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
								cursor: "default",
								padding: "0px"
							}
						},
						"&.Mui-focused": {
							".MuiOutlinedInput-notchedOutline": {
								border: `solid 1px ${BASE_COLORS.greens.green1}`
							}
						},
						"&.Mui-error": {
							".MuiOutlinedInput-notchedOutline, .MuiInputBase-inputMultiline": {
								borderColor: `${BASE_COLORS.reds.red1}`
							}
						},
						"&.Mui-disabled": {
							backgroundColor: BASE_COLORS.greys.grey19,
							".MuiOutlinedInput-notchedOutline": {
								border: `solid 1px ${BASE_COLORS.greys.grey2}`
							},
							".MuiOutlinedInput-input:read-only + .MuiOutlinedInput-notchedOutline": {
								border: `solid 1px ${BASE_COLORS.greys.grey2}`
							},
							input: {
								webkitTextFillColor: BASE_COLORS.greys.grey14,
								padding: "8px"
							}
						}
					},
					".MuiOutlinedInput-input": {
						fontSize: BASE_FONT_PX_SIZES.sm,
						color: BASE_COLORS.greys.grey14,
						padding: "0px 8px",
						height: "35px",
						"&:read-only": {
							padding: "0px"
						},
						"&:read-only + .MuiOutlinedInput-notchedOutline": {
							border: "none"
						}
					}
				}
			}
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					"&:hover": {
						".MuiSvgIcon-root rect": {
							strokeOpacity: "0.35"
						}
					},
					".MuiSvgIcon-root path": {
						fill: BASE_COLORS.greens.green1
					},
					"&.Mui-disabled .MuiSvgIcon-root path": {
						fillOpacity: "0.35"
					},
					"+ .MuiInputLabel-root": {
						marginLeft: "16px"
					},
					padding: "0px"
				}
			}
		},
		MuiRadio: {
			styleOverrides: {
				root: {
					alignItems: "flex-start",
					marginRight: "16px",
					".MuiFormHelperText-root": {
						marginLeft: "0px"
					},
					".MuiSvgIcon-root .SolaceRadioContainer": {
						strokeOpacity: "0.2",
						stroke: "black",
						fill: "white"
					},
					"&:hover": {
						".MuiSvgIcon-root .SolaceRadioContainer": {
							strokeOpacity: "0.35"
						}
					},
					"&.Mui-checked": {
						".SolaceRadioSelection": {
							fill: BASE_COLORS.greens.green1
						}
					},
					"&.Mui-disabled .MuiSvgIcon-root": {
						".SolaceRadioSelection": {
							opacity: 0.35
						}
					},
					padding: "0px"
				}
			}
		},
		MuiSelect: {
			// Select component
			styleOverrides: {
				select: {
					"&.MuiOutlinedInput-input": {
						padding: "6px 34px 6px 8px",
						minWidth: "330px"
					}
				}
			}
		},
		MuiAutocomplete: {
			styleOverrides: {
				root: {
					minWidth: "372px",
					".MuiOutlinedInput-root .MuiAutocomplete-input": {
						padding: "0px"
					},
					".MuiOutlinedInput-root": {
						padding: "0px 0px 0px 8px",
						height: "32px"
					},
					".MuiOutlinedInput-root.readOnlySelect": {
						padding: "0px"
					},
					".MuiFormControl-root .MuiOutlinedInput-root.Mui-disabled input": {
						padding: "0px"
					}
				},
				popper: {
					color: BASE_COLORS.greys.grey14,
					".subtext": {
						color: BASE_COLORS.greys.grey8
					},
					".suplementalText": {
						fontSize: BASE_FONT_PX_SIZES.xs,
						color: BASE_COLORS.greys.grey8
					}
				}
			}
		},
		MuiSwitch: {
			styleOverrides: {
				root: {
					width: "50px",
					height: "30px",
					marginRight: "8px",
					paddingBottom: "0px",
					".MuiButtonBase-root": {
						"&.MuiSwitch-switchBase": {
							"&.Mui-checked": {
								transform: "translate(22px)"
							},
							"&.Mui-checked + .MuiSwitch-track": {
								backgroundColor: getRGBA(BASE_COLORS.greens["green2-rgb"], 0.35),
								opacity: 1
							},
							"&.Mui-disabled + .MuiSwitch-track": {
								backgroundColor: BASE_COLORS.greys.grey2,
								opacity: 1
							},
							"&.Mui-disabled .MuiSwitch-thumb": {
								backgroundColor: BASE_COLORS.greys.grey19,
								borderColor: BASE_COLORS.greys.grey2
							},
							"&:hover": {
								backgroundColor: getRGBA(BASE_COLORS.greens["green2-rgb"], 0.35)
							}
						},
						".MuiSwitch-thumb": {
							width: "16px",
							height: "16px",
							border: `solid 2px ${getRGBA(BASE_COLORS.greens["green2-rgb"], 0.35)}`,
							boxShadow: "none"
						}
					},
					".MuiSwitch-track": {
						height: "12px",
						width: "36px",
						transform: "translateY(1px)",
						backgroundColor: getRGBA(BASE_COLORS.greens["green2-rgb"], 0.35),
						opacity: 1
					}
				},
				switchBase: {
					"&.MuiChecked .MuiSwitch-track": {
						height: "12px",
						transform: "translateY(1px)",
						backgroundColor: getRGBA(BASE_COLORS.greens["green2-rgb"], 0.35),
						opacity: 1
					}
				}
			}
		},
		MuiDialog: {
			styleOverrides: {
				root: {
					".MuiBackdrop-root": {
						backgroundColor: BASE_COLORS.greys.grey5
					},
					".MuiPaper-root": {
						minWidth: "400px",
						maxWidth: "80%",
						maxHeight: "80%",
						boxShadow: `0px 2px 8px ${BASE_COLORS.greys.grey4}`,
						padding: "24px",
						".MuiDialogTitle-root": {
							fontSize: BASE_FONT_PX_SIZES.xl,
							color: BASE_COLORS.greys.grey14,
							padding: "0px 0px 24px 0px"
						},
						".MuiDialogContent-root": {
							fontSize: BASE_FONT_PX_SIZES.sm,
							lineHeight: BASE_FONT_PX_SIZES.lg,
							color: BASE_COLORS.greys.grey14,
							padding: "0px",
							".MuiBox-root": {
								display: "grid"
							}
						},
						".MuiDialogActions-root": {
							padding: "24px 0px 0px 0px",
							"& > :not(:nth-child(1))": {
								marginLeft: "16px"
							}
						}
					}
				}
			}
		}
	},
	palette: {
		background: {
			default: BASE_COLORS.greys.grey19
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
			primary: BASE_COLORS.greys.grey14,
			secondary: BASE_COLORS.greys.grey11,
			disabled: BASE_COLORS.greys.grey5
		}
	},
	spacing: 8,
	typography: {
		fontSize: BASE_FONT_PX_SIZES.sm,
		body1: {
			fontSize: BASE_FONT_PX_SIZES.sm,
			lineHeight: BASE_FONT_PX_SIZES.sm * 1.5 + "px"
		},
		caption: {
			fontSize: BASE_FONT_PX_SIZES.xs,
			lineHeight: BASE_FONT_PX_SIZES.xs * 1.5 + "px"
		},
		subtitle1: {
			fontSize: BASE_FONT_PX_SIZES.md,
			lineHeight: BASE_FONT_PX_SIZES.md * 1.5 + "px"
		},
		fontFamily: "Rubik,sans-serif",
		one33rem: { fontSize: "1.33rem" }
	}
};

export default theme;
