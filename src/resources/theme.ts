import { alpha, hexToRgb, ThemeOptions } from "@mui/material";
import { SupportedThemes, ThemeMapping, ThemeMappingPalette } from "../types";
import getThemeMappings from "../theming/themeUtils";
import { BASE_FONT_PX_SIZES } from "./typography";

const noneImportant = "none !important";

const deprecatedBoxShadows = {
	w12: alpha("#000000", 0.12),
	w15: alpha("#000000", 0.15),
	w20: alpha("#000000", 0.2),
	w30: alpha("#000000", 0.3)
};

const verticalIndicatorHeight = "calc(100% - 4px)";

const verticalIndicatorStyle = (themeMapping: ThemeMapping): Record<string, unknown> => {
	return {
		"&.indicator-info": {
			":after": {
				position: "absolute",
				left: 2,
				top: 2,
				height: verticalIndicatorHeight,
				width: "3px",
				content: "''",
				background: themeMapping.palette.info.w100,
				borderRadius: "4px"
			}
		},
		"&.indicator-error": {
			":after": {
				position: "absolute",
				left: 2,
				top: 2,
				height: verticalIndicatorHeight,
				width: "3px",
				content: "''",
				background: themeMapping.palette.error.w100,
				borderRadius: "4px"
			}
		},
		"&.indicator-warn": {
			":after": {
				position: "absolute",
				left: 2,
				top: 2,
				height: verticalIndicatorHeight,
				width: "3px",
				content: "''",
				background: themeMapping.palette.warning.w100,
				borderRadius: "4px"
			}
		},
		"&.indicator-success": {
			":after": {
				position: "absolute",
				left: 2,
				top: 2,
				height: verticalIndicatorHeight,
				width: "3px",
				content: "''",
				background: themeMapping.palette.success.w100,
				borderRadius: "4px"
			}
		},
		"&.indicator-secondary": {
			":after": {
				position: "absolute",
				left: 2,
				top: 2,
				height: verticalIndicatorHeight,
				width: "3px",
				content: "''",
				background: themeMapping.palette.secondary.text.w50,
				borderRadius: "4px"
			}
		}
	};
};

const gridListRowCommonStyle = (themeMapping: ThemeMapping): Record<string, unknown> => {
	return {
		position: "relative",
		display: "grid",
		gridColumnGap: "32px",
		whiteSpace: "nowrap",
		placeItems: "center left",
		padding: "10px 16px",
		minHeight: "32px",
		cursor: "pointer",
		":hover": {
			background: themeMapping.palette.deprecated.secondary.w10
		},
		":focus-visible": {
			background: themeMapping.palette.secondary.w10,
			outline: "none"
		},
		"&.selected": {
			background: themeMapping.palette.brand.w10,
			cursor: "default"
		},
		"&.emphasized": {
			"&:not(.selected)": {
				background: themeMapping.palette.background.w20,
				"&:hover": {
					background: themeMapping.palette.secondary.w20
				},
				"&:focus-visible": {
					background: themeMapping.palette.secondary.w20
				}
			}
		},
		...verticalIndicatorStyle(themeMapping)
	};
};

// https://sol-jira.atlassian.net/wiki/spaces/MAASB/pages/2702704723/How+to+add+theming+in+maas-ui#React:
// eslint-disable-next-line sonarjs/cognitive-complexity
const getThemeOptions = (themeName: SupportedThemes) => {
	const themeMapping = getThemeMappings(themeName);
	const isCurrentSolace = themeName === SupportedThemes.solace;

	const getBoxShadow = (currentKey: string) => {
		if (isCurrentSolace) {
			return deprecatedBoxShadows[currentKey];
		}
		return themeMapping.palette.secondary.w8040;
	};

	// A custom theme option for this app
	const themeOptions: ThemeOptions = {
		breakpoints: {
			values: {
				// desktop
				lg: 1200,

				// small laptop
				md: 900,

				// default dialog
				dialogMd: 800,

				// tablets
				sm: 600,

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
						backgroundColor: themeMapping.palette.background.wMain // unused?
					}
				}
			},
			MuiButtonBase: {
				defaultProps: {
					disableRipple: true
				}
			},
			MuiButton: {
				defaultProps: {
					disableRipple: true,
					disableElevation: true
				},
				styleOverrides: {
					containedPrimary: {
						color: themeMapping.palette.primary.text.w10,
						backgroundColor: themeMapping.palette.primary.wMain,
						"&:hover": {
							backgroundColor: themeMapping.palette.primary.w90
						},
						"&:active": {
							backgroundColor: themeMapping.palette.primary.w100
						},
						"&.pressed": {
							backgroundColor: themeMapping.palette.primary.w100
						},
						"&:disabled": {
							backgroundColor: themeMapping.palette.secondary.w40,
							color: themeMapping.palette.primary.text.w10
						}
					},
					outlinedPrimary: {
						borderWidth: "1px",
						borderStyle: "solid",
						borderColor: themeMapping.palette.primary.wMain,
						color: themeMapping.palette.primary.wMain,
						"&:hover": {
							backgroundColor: themeMapping.palette.primary.w10,
							borderColor: themeMapping.palette.primary.wMain
						},
						"&:active": {
							backgroundColor: themeMapping.palette.primary.w20,
							borderColor: themeMapping.palette.primary.wMain
						},
						"&.pressed": {
							backgroundColor: themeMapping.palette.primary.w20,
							borderColor: themeMapping.palette.primary.wMain
						},
						"&:disabled": {
							borderColor: themeMapping.palette.secondary.w40,
							color: themeMapping.palette.secondary.w40
						}
					},
					root: {
						textTransform: "none",
						borderRadius: "4px",
						minWidth: "100px",
						height: "32px",
						fontWeight: "500",

						"&.learning-button": {
							borderRadius: `8px 4px`,
							color: themeMapping.palette.learning.wMain,
							backgroundColor: themeMapping.palette.brand.w60,
							"&:hover": {
								backgroundColor: themeMapping.palette.brand.wMain
							},
							"&.pressed": {
								backgroundColor: themeMapping.palette.brand.w100
							},
							"&:disabled": {
								backgroundColor: themeMapping.palette.brand.w10,
								color: themeMapping.palette.learning.wMain
							}
						},

						"&.learning-light-button": {
							borderRadius: `8px 4px`,
							color: themeMapping.palette.brand.w60,
							backgroundColor: themeMapping.palette.learning.wMain,
							"&:hover": {
								backgroundColor: themeMapping.palette.learning.w90
							},
							"&.pressed": {
								backgroundColor: themeMapping.palette.learning.w100
							},
							"&:disabled": {
								backgroundColor: themeMapping.palette.learning.w20,
								color: themeMapping.palette.primary.text.w10
							}
						},

						"&.learning-light-outlined-button": {
							borderRadius: `8px 4px`,
							borderColor: themeMapping.palette.learning.wMain,
							color: themeMapping.palette.learning.wMain,
							"&:hover": {
								borderColor: themeMapping.palette.learning.w90,
								backgroundColor: themeMapping.palette.learning.w10
							},
							"&.pressed": {
								borderColor: themeMapping.palette.learning.w100,
								backgroundColor: themeMapping.palette.learning.w20
							},
							"&:disabled": {
								borderColor: themeMapping.palette.learning.w20,
								color: themeMapping.palette.learning.w20
							}
						}
					},
					startIcon: {
						width: "24px",
						height: "24px",
						marginRight: "8px",
						// eslint-disable-next-line sonarjs/no-duplicate-string
						boxSizing: "border-box",
						">*:nth-of-type(1)": {
							fontSize: "24px"
						}
					},
					endIcon: {
						width: "24px",
						height: "24px",
						marginLeft: "8px",
						// eslint-disable-next-line sonarjs/no-duplicate-string
						boxSizing: "border-box",
						">*:nth-of-type(1)": {
							fontSize: "24px"
						}
					},
					textPrimary: {
						borderRadius: "4px",
						color: themeMapping.palette.primary.wMain,
						"&:hover": {
							backgroundColor: themeMapping.palette.primary.w10
						},
						"&:active": {
							backgroundColor: themeMapping.palette.primary.w20
						},
						"&.pressed": {
							backgroundColor: themeMapping.palette.primary.w20
						},
						"&:disabled": {
							color: themeMapping.palette.secondary.w40
						}
					}
				}
			},
			MuiFormControl: {
				styleOverrides: {
					root: {
						margin: "0",
						// re-position the Solace Dropdown icon inside Select input element
						".MuiOutlinedInput-root.MuiSelect-root": {
							".MuiSvgIcon-root": {
								position: "absolute",
								top: "12px",
								right: "0",
								// eslint-disable-next-line sonarjs/no-duplicate-string
								display: "inline-block",
								pointerEvents: "none",
								color: themeMapping.palette.secondary.wMain // dropdown icon color in resting/focused/error states
							},
							"&.Mui-disabled": {
								".MuiSvgIcon-root": {
									color: themeMapping.palette.secondary.w40 // dropdown icon color in disabled state
								}
							},
							"&.readOnlySelect": {
								".MuiSelect-select": {
									// reset svg inside selected area which is sibling to the svg icon for dropdown caret
									".MuiSvgIcon-root": {
										display: "inline-block"
									}
								}
							},
							".MuiSelect-select": {
								// reset svg inside selected area which is sibling to the svg icon for dropdown caret
								".MuiSvgIcon-root": {
									position: "relative",
									top: "0"
								}
							}
						},
						".MuiOutlinedInput-root": {
							"&.readOnlySelect": {
								backgroundColor: "transparent" // set background transparent in readonly state
							}
						}
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
			MuiLinearProgress: {
				styleOverrides: {
					root: {
						backgroundColor: "transparent",
						"&.learning": {
							".MuiLinearProgress-bar": {
								backgroundColor: themeMapping.palette.brand.w60
							}
						}
					}
				}
			},
			MuiFormHelperText: {
				styleOverrides: {
					root: {
						fontSize: "0.75rem",
						color: themeMapping.palette.secondary.text.wMain,
						lineHeight: 1.5,
						marginLeft: "0",
						marginTop: "2px",
						".MuiSvgIcon-root": {
							width: "18px",
							height: "18px"
						},
						"&.Mui-error": {
							// TODO: remove "solace" option when new theme is adopted
							color: isCurrentSolace ? themeMapping.palette.error.w100 : themeMapping.palette.secondary.text.wMain,
							svg: {
								color: themeMapping.palette.error.w100
							}
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
						".MuiSvgIcon-root": {
							fill: themeMapping.palette.secondary.wMain
						},
						"&:hover": {
							backgroundColor: themeMapping.palette.secondary.w10,
							".MuiSvgIcon-root": {
								color: themeMapping.palette.deprecated.primary.wMain,
								fill: themeMapping.palette.deprecated.primary.wMain
							}
						},
						"&:active": {
							backgroundColor: themeMapping.palette.deprecated.secondary.w20,
							".MuiSvgIcon-root": {
								color: themeMapping.palette.deprecated.primary.wMain,
								fill: themeMapping.palette.deprecated.primary.wMain
							}
						},
						"&.pressed": {
							backgroundColor: themeMapping.palette.deprecated.secondary.w20,
							".MuiSvgIcon-root": {
								color: themeMapping.palette.deprecated.primary.wMain,
								fill: themeMapping.palette.deprecated.primary.wMain
							}
						},
						"&:disabled": {
							".MuiSvgIcon-root": {
								fill: themeMapping.palette.secondary.w40
							}
						},
						"&.learning-icon-button": {
							".MuiSvgIcon-root": {
								fill: themeMapping.palette.deprecated.secondary.w30
							},
							"&:hover": {
								backgroundColor: themeMapping.palette.learning.w90,
								".MuiSvgIcon-root": {
									color: themeMapping.palette.brand.w60,
									fill: themeMapping.palette.brand.w60
								}
							},
							"&.pressed": {
								backgroundColor: themeMapping.palette.learning.w100,
								".MuiSvgIcon-root": {
									color: themeMapping.palette.brand.w60,
									fill: themeMapping.palette.brand.w60
								}
							},
							"&:disabled": {
								".MuiSvgIcon-root": {
									fill: themeMapping.palette.brand.w10
								}
							}
						}
					}
				}
			},
			MuiInputLabel: {
				styleOverrides: {
					asterisk: {
						color: themeMapping.palette.accent.n2.wMain
					},
					root: {
						color: themeMapping.palette.secondary.text.wMain,
						fontSize: "0.875rem",
						fontWeight: 400,
						lineHeight: 1.5,
						"&.Mui-error": {
							color: themeMapping.palette.secondary.text.wMain
						},
						"&.Mui-disabled": {
							color: isCurrentSolace
								? themeMapping.palette.secondary.text.w50
								: themeMapping.palette.secondary.text.wMain
						}
					}
				}
			},
			MuiFormLabel: {
				styleOverrides: {
					asterisk: {
						color: themeMapping.palette.accent.n2.wMain
					},
					root: {
						color: themeMapping.palette.secondary.text.wMain,
						fontSize: "14px",
						fontWeight: 400,
						lineHeight: 1.5,
						"&.Mui-error": {
							color: themeMapping.palette.secondary.text.wMain
						},
						"&.light-sub-text": {
							color: themeMapping.palette.deprecated.secondary.text.wMain
						},
						"&.Mui-disabled": {
							color: themeMapping.palette.deprecated.secondary.text.w50,
							"&.check-box-label": {
								color: themeMapping.palette.secondary.text.w50
							},
							"&.radio-btn-label": {
								color: themeMapping.palette.secondary.text.w50
							}
						},
						"&.bold-label": {
							fontWeight: 500
						},
						"&.read-only": {
							color: themeMapping.palette.deprecated.secondary.text.wMain
						}
					}
				}
			},
			MuiLink: {
				styleOverrides: {
					root: {
						lineHeight: 1.5,
						fontSize: "14px",
						color: themeMapping.palette.primary.wMain,
						"&:hover": {
							// TODO: remove "solace" options when new theme is adopted
							color: isCurrentSolace ? themeMapping.palette.primary.wMain : themeMapping.palette.primary.w90
						},
						"&:active": {
							color: isCurrentSolace ? themeMapping.palette.primary.wMain : themeMapping.palette.primary.w100
						},
						"&[disabled]": {
							color: themeMapping.palette.secondary.w40
						},
						".SolaceOpenExternalIcon": {
							width: "16px",
							height: "16px",
							fill: themeMapping.palette.primary.wMain,
							marginBottom: "2px"
						}
					}
				}
			},
			MuiInputBase: {
				styleOverrides: {
					// TextArea Component
					multiline: ({ ownerState }) => ({
						// Additional checks to make sure resize is enabled correctly
						...(ownerState.id &&
							ownerState.id.split("-").length > 1 &&
							ownerState.id.split("-")[ownerState.id.split("-").length - 2] === "resizable" &&
							["both", "horizontal", "vertical"].indexOf(
								ownerState.id.split("-")[ownerState.id.split("-").length - 1]
							) > -1 && {
								textarea: {
									resize: ownerState.id.split("-")[ownerState.id.split("-").length - 1]
								}
							}),
						display: "inline-block",
						"&.MuiOutlinedInput-root": {
							padding: "0",
							display: "inline-table", // this ensures helper text is below textarea
							backgroundColor: "transparent", // set background transparent on TextArea input container
							".MuiOutlinedInput-notchedOutline": {
								border: "none"
							},
							"&.inline-label": {
								".MuiOutlinedInput-input:read-only": {
									padding: "1px" // top align with label in ready-only & inline state
								}
							}
						},

						".MuiOutlinedInput-input": {
							border: `solid 1px ${themeMapping.palette.secondary.w40}`,
							borderRadius: "4px",
							padding: "8px",
							// eslint-disable-next-line sonarjs/no-duplicate-string
							boxSizing: "border-box"
						},
						"&:hover .MuiOutlinedInput-input:read-only, &.Mui-focused .MuiOutlinedInput-input:read-only, .MuiOutlinedInput-input:read-only":
							{
								border: "none",
								padding: "7px 0 0 0",
								cursor: "default",
								backgroundColor: "transparent" // set background transparent on TextArea input container in readonly state
							},
						"&:hover": {
							".MuiOutlinedInput-input": {
								border: `solid 1px ${
									isCurrentSolace ? themeMapping.palette.secondary.text.w50 : themeMapping.palette.secondary.wMain
								}`
							},
							"&.MuiOutlinedInput-root": {
								".MuiOutlinedInput-notchedOutline": {
									border: "none"
								}
							}
						},
						"&.Mui-focused": {
							".MuiOutlinedInput-input": {
								border: `solid 1px ${
									isCurrentSolace ? themeMapping.palette.brand.w30 : themeMapping.palette.accent.n2.wMain
								}`
							},
							"&.MuiOutlinedInput-root": {
								".MuiOutlinedInput-notchedOutline": {
									border: "none"
								}
							}
						},
						"&.Mui-error": {
							".MuiOutlinedInput-input": {
								border: `solid 1px ${
									isCurrentSolace ? themeMapping.palette.error.w100 : themeMapping.palette.error.wMain
								}`
							},
							"&.Mui-focused": {
								".MuiOutlinedInput-input": {
									border: `solid 1px ${
										isCurrentSolace ? themeMapping.palette.brand.w30 : themeMapping.palette.accent.n2.wMain
									}`
								}
							}
						},
						".Mui-disabled.MuiOutlinedInput-input, &:hover .Mui-disabled.MuiOutlinedInput-input": {
							backgroundColor: themeMapping.palette.background.w20,
							padding: "8px",
							border: `solid 1px ${themeMapping.palette.secondary.w20}`
						},
						"&.Mui-disabled .MuiOutlinedInput-input:read-only.Mui-disabled + .MuiOutlinedInput-notchedOutline": {
							border: "none"
						},
						".MuiInputBase-inputMultiline": {
							backgroundColor: themeMapping.palette.background.w10
						}
					})
				}
			},
			MuiTextField: {
				// Textfield component
				styleOverrides: {
					root: {
						".MuiOutlinedInput-root": {
							backgroundColor: themeMapping.palette.background.w10,
							".MuiOutlinedInput-notchedOutline": {
								border: `solid 1px ${themeMapping.palette.secondary.w40}`,
								backgroundColor: "transparent"
							},
							"&:hover": {
								".MuiOutlinedInput-notchedOutline": {
									border: `solid 1px ${
										isCurrentSolace ? themeMapping.palette.secondary.text.w50 : themeMapping.palette.secondary.wMain
									}`,
									backgroundColor: "transparent"
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
									padding: "0"
								}
							},
							"&.emptySelect, .MuiOutlinedInput-root.readOnlySelect.Mui-focused": {
								".MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
									color: themeMapping.palette.secondary.text.w50
								}
							},
							"&.Mui-focused": {
								".MuiOutlinedInput-notchedOutline": {
									border: `solid 1px ${
										isCurrentSolace ? themeMapping.palette.brand.w30 : themeMapping.palette.accent.n2.wMain
									}`
								}
							},
							"&.Mui-error": {
								".MuiOutlinedInput-notchedOutline, .MuiInputBase-inputMultiline": {
									border: `solid 1px ${themeMapping.palette.error.w100}`
								},
								"&.Mui-focused": {
									".MuiOutlinedInput-notchedOutline": {
										border: `solid 1px ${
											isCurrentSolace ? themeMapping.palette.brand.w30 : themeMapping.palette.accent.n2.wMain
										}`
									}
								}
							},
							"&.Mui-disabled": {
								backgroundColor: themeMapping.palette.background.w20,
								".MuiOutlinedInput-notchedOutline": {
									border: `solid 1px ${
										isCurrentSolace ? themeMapping.palette.secondary.w10 : themeMapping.palette.secondary.w20
									}`
								},
								".MuiOutlinedInput-input:read-only + .MuiOutlinedInput-notchedOutline": {
									border: `solid 1px ${
										isCurrentSolace ? themeMapping.palette.secondary.w10 : themeMapping.palette.secondary.w20
									}`
								},
								input: {
									WebkitTextFillColor: themeMapping.palette.secondary.text.w50,
									color: themeMapping.palette.secondary.text.w50,
									padding: "8px"
								}
							},
							"&.MuiInputBase-adornedEnd": {
								paddingRight: "0px"
							},
							".MuiInputAdornment-root": {
								".MuiIconButton-root": {
									padding: "0px",
									marginRight: "8px"
								},
								".MuiIconButton-root:hover, .MuiIconButton-root:active": {
									".MuiSvgIcon-root": {
										path: {
											fill: themeMapping.palette.primary.text.wMain
										}
									}
								}
							}
						},
						".MuiOutlinedInput-input": {
							fontSize: BASE_FONT_PX_SIZES.sm,
							color: themeMapping.palette.primary.text.wMain,
							padding: "0 8px",
							height: "32px",
							"&:read-only": {
								padding: "0"
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
						"&.Mui-checked .MuiSvgIcon-root": {
							".SolaceCheckboxCheckmark": {
								fill: themeMapping.palette.deprecated.accent.n2.wMain
							},
							".SolaceCheckboxIndeterminant": {
								stroke: themeMapping.palette.deprecated.accent.n2.wMain
							}
						},
						"&:hover .MuiSvgIcon-root rect.SolaceCheckboxContainer": {
							stroke: themeMapping.palette.deprecated.secondary.wMain
						},
						"&.Mui-disabled .MuiSvgIcon-root": {
							".SolaceCheckboxContainer": {
								stroke: themeMapping.palette.secondary.w20
							},
							".SolaceCheckboxCheckmark": {
								fill: themeMapping.palette.accent.n2.w30
							},
							".SolaceCheckboxIndeterminant": {
								stroke: themeMapping.palette.accent.n2.w30
							}
						},
						"&.readOnly .MuiSvgIcon-root": {
							rect: {
								fill: themeMapping.palette.background.w20
							},
							".SolaceCheckboxCheckmark": {
								fill: themeMapping.palette.deprecated.secondary.wMain
							},
							".SolaceCheckboxIndeterminant": {
								stroke: themeMapping.palette.deprecated.secondary.wMain
							}
						},
						// other
						"+.MuiFormLabel-root": {
							marginLeft: "16px",
							color: themeMapping.palette.secondary.wMain,
							"&.Mui-disabled": {
								color: themeMapping.palette.secondary.w40
							}
						},
						padding: "0"
					}
				}
			},
			MuiRadio: {
				styleOverrides: {
					root: {
						/* eslint-disable sonarjs/no-duplicate-string */
						alignItems: "flex-start",
						marginRight: "16px",
						".MuiFormHelperText-root": {
							marginLeft: "0"
						},
						".MuiSvgIcon-root .SolaceRadioContainer": {
							fill: themeMapping.palette.background.w10,
							stroke: themeMapping.palette.secondary.w40
						},
						"&:hover": {
							".MuiSvgIcon-root .SolaceRadioContainer": {
								stroke: themeMapping.palette.deprecated.secondary.wMain
							}
						},
						"&.Mui-checked": {
							".SolaceRadioSelection": {
								fill: themeMapping.palette.deprecated.accent.n2.wMain
							}
						},
						"&.Mui-disabled .MuiSvgIcon-root": {
							".SolaceRadioContainer": {
								stroke: themeMapping.palette.secondary.w20
							},
							".SolaceRadioSelection": {
								fill: themeMapping.palette.accent.n2.w30
							}
						},
						"&.readOnly .MuiSvgIcon-root": {
							".SolaceRadioContainer": {
								fill: themeMapping.palette.background.w20,
								stroke: themeMapping.palette.secondary.w40
							},
							".SolaceRadioSelection": {
								fill: themeMapping.palette.deprecated.secondary.wMain
							}
						},
						padding: "0"
					}
				}
			},
			MuiSelect: {
				// Select component
				styleOverrides: {
					select: {
						"&.MuiOutlinedInput-input": {
							padding: "7px 34px 5px 8px",
							width: "100%"
						},
						// input field for select is always read-only, make sure the style override has higher precedence than the style defined for
						// default input field in MuiOutlinedInput
						"&.MuiOutlinedInput-input:read-only": {
							padding: "7px 34px 5px 8px",
							width: "100%",
							height: "auto"
						}
					},
					iconOpen: {
						// remove dropdown icon flip animation when Select menu opens/closes
						transform: "none"
					}
				}
			},
			MuiPopover: {
				styleOverrides: {
					root: {
						/**
						 * styles applied to .SolaceMenuPopover should match exactly these applied to .SolaceMenu
						 */
						"&.SolaceMenuPopover": {
							".MuiPaper-root": {
								margin: "4px",
								overflowY: "auto",
								boxShadow: `0 1px 4px ${getBoxShadow("w20")}`,
								".MuiMenuItem-root": {
									minWidth: "80px",
									"&.wideMenu": {
										minWidth: "320px"
									}
								}
							}
						}
					}
				}
			},
			MuiMenu: {
				styleOverrides: {
					root: {
						/**
						 * any style update inside .SolaceMenu should also be applied to .SolaceMenuPopover
						 */
						"&.SolaceMenu": {
							".MuiPaper-root": {
								margin: "4px",
								".MuiMenuItem-root": {
									minWidth: "80px",
									"&.wideMenu": {
										minWidth: "320px"
									},
									"&.selectedItem": {
										backgroundColor: themeMapping.palette.brand.w10
									}
								}
							}
						},
						".MuiPaper-root": {
							overflowY: "auto",
							boxShadow: `0 1px 4px ${getBoxShadow("w20")}`,

							".MuiMenuItem-root": {
								display: "flex",
								padding: "0 16px 0 16px",
								fontSize: "14px",
								minHeight: "38px",
								alignItems: "center",
								whiteSpace: "normal",
								"&:hover": {
									backgroundColor: themeMapping.palette.secondary.w10
								},
								"&.multiline": {
									paddingTop: "8px",
									paddingBottom: "8px"
								},
								".MuiListItemIcon-root": {
									width: "48px",
									".MuiSvgIcon-root": {
										width: "24px",
										height: "24px"
									}
								},
								// select styles
								".MuiTouchRipple-child": {
									backgroundColor: themeMapping.palette.secondary.w20
								}
							},

							".MuiList-root.MuiMenu-list": {
								".MuiMenuItem-root.MuiButtonBase-root": {
									// remove all ripple effect from MenuList Items
									// currently applied to SolaceSelect component
									"*,*::before,*::after": {
										transition: noneImportant,
										animation: noneImportant
									}
								},
								".MuiGrid-root.MuiGrid-container": {
									"&.multiline": {
										paddingTop: "8px",
										paddingBottom: "8px"
									},
									color: themeMapping.palette.primary.text.wMain,
									".subtext": {
										color: themeMapping.palette.deprecated.secondary.text.wMain,
										marginRight: "24px",
										width: "100%"
									},
									".supplementalText": {
										fontSize: BASE_FONT_PX_SIZES.xs,
										color: themeMapping.palette.deprecated.secondary.text.wMain,
										marginLeft: "24px"
									},
									"&.Mui-disabled": {
										color: themeMapping.palette.secondary.text.w50
									}
								}
							}
						}
					}
				}
			},
			MuiList: {
				styleOverrides: {
					root: {
						".MuiListSubheader-root": {
							lineHeight: 1.5,
							color: themeMapping.palette.deprecated.secondary.text.wMain,
							fontSize: BASE_FONT_PX_SIZES.sm,
							fontWeight: 400,
							height: "32px",
							display: "flex",
							alignItems: "center",
							"&.categoryHeader": {
								color: themeMapping.palette.primary.text.wMain,
								fontSize: BASE_FONT_PX_SIZES.xs,
								fontWeight: 500,
								position: "unset"
							}
						},
						".MuiListItemText-multiline": {
							paddingTop: "8px",
							paddingBottom: "8px",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center"
						},
						".MuiListItemText-secondary": {
							color: themeMapping.palette.secondary.text.w50
						}
					}
				}
			},
			MuiAutocomplete: {
				styleOverrides: {
					root: {
						".MuiOutlinedInput-root .MuiAutocomplete-input": {
							padding: "0"
						},
						".MuiOutlinedInput-root .MuiAutocomplete-endAdornment": {
							right: "0"
						},
						".MuiOutlinedInput-root": {
							padding: "0 0 0 8px",
							height: "32px"
						},
						// allow the container to grow when there are more than one line
						".MuiOutlinedInput-root.MuiInputBase-root": {
							height: "auto",
							flexWrap: "wrap"
						},
						".MuiOutlinedInput-root.readOnlySelect": {
							padding: "0"
						},
						".MuiFormControl-root .MuiOutlinedInput-root.Mui-disabled input": {
							padding: "0"
						},
						".MuiButtonBase-root.MuiIconButton-root.MuiAutocomplete-popupIndicator:hover": {
							background: "transparent"
						},
						".MuiButtonBase-root.MuiIconButton-root.MuiAutocomplete-clearIndicator .MuiSvgIcon-root:hover": {
							fill: themeMapping.palette.secondary.wMain
						},
						// styles specifically applied when autocomplete allows multiple lines with chips
						".MuiButtonBase-root.MuiChip-root": {
							height: "24px",
							margin: "3px 6px 3px 0",
							borderRadius: "40px",
							fontSize: "14px",
							svg: {
								width: "17px",
								height: "17px",
								fill: themeMapping.palette.secondary.wMain
							}
						}
					},
					input: {
						// allow 'input' element to be inline with chips instead of taking its own line
						width: 0
					},
					popper: {
						".MuiAutocomplete-listbox .MuiAutocomplete-option": {
							padding: "0 16px",
							minHeight: "38px",
							".MuiGrid-root.MuiGrid-container": {
								"&.multiline": {
									paddingTop: "8px",
									paddingBottom: "8px"
								}
							}
						},
						".MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused ": {
							backgroundColor: themeMapping.palette.secondary.w10
						},
						".MuiAutocomplete-listbox .MuiAutocomplete-option[aria-selected='true']": {
							backgroundColor: themeMapping.palette.brand.w10
						},
						".MuiAutocomplete-listbox .MuiAutocomplete-option[aria-selected='true'].Mui-focused": {
							backgroundColor: themeMapping.palette.brand.w10
						},
						".MuiAutocomplete-listbox .MuiAutocomplete-option[aria-disabled='true']": {
							color: themeMapping.palette.secondary.text.w50,
							opacity: 1,
							".subtext, .supplementalText": {
								color: themeMapping.palette.secondary.text.w50
							}
						},
						".MuiAutocomplete-listbox .MuiAutocomplete-groupLabel": {
							lineHeight: 1.5,
							color: themeMapping.palette.primary.text.wMain,
							fontSize: BASE_FONT_PX_SIZES.xs,
							fontWeight: 500,
							position: "unset",
							height: "32px",
							display: "flex",
							alignItems: "center",
							padding: "0 16px"
						},
						".MuiAutocomplete-listbox .MuiDivider-root": {
							margin: "8px 0",
							background: themeMapping.palette.primary.w10
						},
						boxShadow: `0 1px 4px ${getBoxShadow("w20")}`,
						color: themeMapping.palette.primary.text.wMain,
						".subtext": {
							color: themeMapping.palette.deprecated.secondary.text.wMain
						},
						".supplementalText": {
							fontSize: BASE_FONT_PX_SIZES.xs,
							color: themeMapping.palette.deprecated.secondary.text.wMain
						}
					},
					popupIndicator: {
						padding: "0 4px 0 8px",
						marginRight: "0",
						height: "28px"
					},
					popupIndicatorOpen: {
						transform: "none"
					}
				}
			},
			MuiSwitch: {
				styleOverrides: {
					root: {
						marginTop: "3px",
						width: "50px",
						height: "30px",
						marginRight: "8px",
						paddingBottom: "0",
						".MuiButtonBase-root": {
							"&.MuiSwitch-switchBase": {
								"&.Mui-checked": {
									transform: "translate(22px)"
								},
								"&.Mui-checked + .MuiSwitch-track": {
									backgroundColor: themeMapping.palette.primary.w40,
									opacity: 1
								},
								"&.Mui-disabled + .MuiSwitch-track": {
									backgroundColor: themeMapping.palette.secondary.w10,
									opacity: 1
								},
								"&.Mui-disabled .MuiSwitch-thumb": {
									// TODO: remove "solace" options when new theme is adopted
									backgroundColor: isCurrentSolace
										? themeMapping.palette.background.w20
										: themeMapping.palette.secondary.w40,
									borderColor: isCurrentSolace ? themeMapping.palette.secondary.w10 : themeMapping.palette.secondary.w40
								},
								"&:hover": {
									backgroundColor: themeMapping.palette.brand.wMain30
								}
							},
							".MuiSwitch-thumb": {
								width: "20px",
								height: "20px",
								border: `solid 2px ${themeMapping.palette.primary.w60}`,
								boxShadow: "none",
								boxSizing: "border-box"
							},
							"&.Mui-checked .MuiSwitch-thumb": {
								backgroundColor: themeMapping.palette.primary.wMain,
								borderColor: themeMapping.palette.primary.wMain
							}
						},
						".MuiSwitch-track": {
							height: "12px",
							width: "36px",
							transform: "translateY(1px)",
							backgroundColor: themeMapping.palette.primary.w40,
							opacity: 1
						}
					},
					switchBase: {
						"&.MuiChecked .MuiSwitch-track": {
							height: "12px",
							transform: "translateY(1px)",
							backgroundColor: themeMapping.palette.primary.w40,
							opacity: 1
						}
					}
				}
			},
			MuiDialog: {
				styleOverrides: {
					root: {
						".MuiBackdrop-root": {
							backgroundColor: themeMapping.palette.secondary.w8040
						},
						".MuiPaper-root": {
							minWidth: "400px",
							maxHeight: "80%",
							boxShadow: `0 2px 8px ${getBoxShadow("w30")}`,
							padding: "24px",
							".MuiDialogTitle-root": {
								fontSize: BASE_FONT_PX_SIZES.xl,
								color: themeMapping.palette.primary.text.wMain,
								padding: "0 0 24px 0"
							},
							".MuiDialogContent-root": {
								fontSize: BASE_FONT_PX_SIZES.sm,
								lineHeight: `${BASE_FONT_PX_SIZES.lg}px`,
								color: themeMapping.palette.primary.text.wMain,
								padding: "0"
							},
							".MuiDialogContentText-root": {
								color: themeMapping.palette.primary.text.wMain
							},
							".MuiDialogActions-root": {
								padding: "24px 0 0 0",
								"& > :not(:nth-of-type(1))": {
									marginLeft: "8px"
								}
							}
						},
						".success": {
							".MuiSvgIcon-root path": {
								fill: isCurrentSolace
									? themeMapping.palette.deprecated.accent.n2.wMain
									: themeMapping.palette.success.w100
							}
						},
						".error": {
							".MuiSvgIcon-root path": {
								fill: themeMapping.palette.error.w100
							}
						},
						".progress": {
							".MuiSvgIcon-root path": {
								fill: isCurrentSolace
									? themeMapping.palette.deprecated.accent.n2.wMain
									: themeMapping.palette.accent.n2.wMain
							}
						},
						"&.linearProgressIndicator": {
							".MuiDialog-paper": {
								position: "absolute",
								overflowX: "hidden"
							},
							// the light background of the progress bar
							".MuiDialog-paper::before": {
								content: '""',
								position: "absolute",
								bottom: 0,
								left: 0,
								width: "100%",
								height: "4px",
								backgroundColor: isCurrentSolace ? themeMapping.palette.brand.w10 : themeMapping.palette.accent.n2.w10
							},
							// the dark sliding part of the progress bar
							".MuiDialog-paper::after": {
								content: '""',
								position: "absolute",
								bottom: 0,
								left: 0,
								width: "100%",
								height: "4px",
								background: `linear-gradient(90deg, ${hexToRgb(
									// TODO: remove "solace" option when new theme is adopted
									isCurrentSolace ? themeMapping.palette.primary.wMain : themeMapping.palette.accent.n2.wMain
								)} 0% 40%, transparent 40% 100%)`,
								animation: "animation 2s linear infinite"
							},
							"@keyframes animation": {
								"0%": {
									left: "-40%"
								},
								"100%": {
									left: "100%"
								}
							}
						}
					}
				}
			},
			MuiChip: {
				styleOverrides: {
					root: {
						"&.solaceChip": {
							".errorIcon, .leadingIcon": {
								margin: "3px 3px 0px 3px"
							},
							// all solace chips (standard, input & choice)
							"&.MuiChip-filledDefault": {
								// only standard and input chips
								backgroundColor: themeMapping.palette.secondary.w20,
								color: themeMapping.palette.primary.text.wMain,
								".MuiChip-deleteIcon": {
									fill: themeMapping.palette.primary.text.wMain
								},
								"&:hover": {
									backgroundColor: themeMapping.palette.secondary.w40,
									color: themeMapping.palette.primary.text.wMain
								},
								"&.Mui-disabled": {
									backgroundColor: themeMapping.palette.background.w20,
									color: themeMapping.palette.secondary.text.w50,
									opacity: 1 // MuiChip by default applies opacity of 0.38 for disabled
								},
								"&.darkMode": {
									backgroundColor: themeMapping.palette.secondary.w70,
									color: themeMapping.palette.primary.text.w10,
									".MuiChip-deleteIcon": {
										fill: themeMapping.palette.primary.text.w10
									},
									"&:hover": {
										backgroundColor: themeMapping.palette.secondary.w80,
										color: themeMapping.palette.primary.text.w10
									},
									"&.Mui-disabled": {
										backgroundColor: themeMapping.palette.secondary.w40,
										color: themeMapping.palette.primary.text.w10,
										opacity: 1 // MuiChip by default applies opacity of 0.38 for disabled
									}
								},
								"&.MuiChip-clickable": {
									// only input chips
									backgroundColor: themeMapping.palette.secondary.w20,
									color: themeMapping.palette.primary.text.wMain,
									".MuiChip-deleteIcon": {
										fill: themeMapping.palette.primary.text.wMain
									},
									"&:hover": {
										backgroundColor: themeMapping.palette.secondary.w40,
										color: themeMapping.palette.primary.text.wMain,
										":has(.MuiChip-deleteIcon:hover)": {
											backgroundColor: themeMapping.palette.secondary.w20
										},
										".MuiChip-deleteIcon:hover": {
											backgroundColor: themeMapping.palette.secondary.w40
										}
									},
									"&:active": {
										backgroundColor: themeMapping.palette.secondary.w40,
										color: themeMapping.palette.primary.text.wMain,
										boxShadow: "none"
									},
									"&.darkMode": {
										backgroundColor: themeMapping.palette.secondary.w70,
										color: themeMapping.palette.primary.text.w10,
										".MuiChip-deleteIcon": {
											fill: themeMapping.palette.primary.text.w10
										},
										"&:hover": {
											backgroundColor: themeMapping.palette.secondary.w80,
											color: themeMapping.palette.primary.text.w10,
											":has(.MuiChip-deleteIcon:hover)": {
												backgroundColor: themeMapping.palette.secondary.w70
											},
											".MuiChip-deleteIcon:hover": {
												backgroundColor: themeMapping.palette.secondary.w80
											}
										},
										"&:active": {
											backgroundColor: themeMapping.palette.background.wMain,
											color: themeMapping.palette.primary.text.w10,
											boxShadow: "none"
										}
									},
									"&.errorStatus": {
										backgroundColor: themeMapping.palette.error.w10,
										color: themeMapping.palette.error.w100,
										".MuiChip-deleteIcon": {
											fill: themeMapping.palette.error.w100
										},
										"&:hover": {
											backgroundColor: themeMapping.palette.error.w20,
											color: themeMapping.palette.error.w100,
											":has(.MuiChip-deleteIcon:hover)": {
												backgroundColor: themeMapping.palette.error.w10
											},
											".MuiChip-deleteIcon:hover": {
												backgroundColor: themeMapping.palette.error.w20
											}
										},
										"&:active": {
											backgroundColor: themeMapping.palette.error.w30,
											color: themeMapping.palette.error.w100,
											boxShadow: "none"
										},
										".MuiSvgIcon-root": {
											fill: themeMapping.palette.error.w100
										}
									}
								}
							},
							"&.MuiChip-outlinedDefault": {
								// only choice chips (active & not selected)
								backgroundColor: themeMapping.palette.background.w10,
								color: themeMapping.palette.primary.text.wMain,
								borderColor: themeMapping.palette.secondary.w40,
								boxShadow: "none",
								"&:hover": {
									backgroundColor: themeMapping.palette.background.w20,
									color: themeMapping.palette.primary.text.wMain
								},
								"&:active": {
									backgroundColor: themeMapping.palette.secondary.w10,
									color: themeMapping.palette.primary.text.wMain
								},
								"&.darkMode": {
									backgroundColor: themeMapping.palette.background.w10,
									color: themeMapping.palette.primary.text.wMain,
									borderColor: themeMapping.palette.background.wMain,
									"&:hover": {
										backgroundColor: themeMapping.palette.secondary.w20,
										color: themeMapping.palette.primary.text.wMain
									},
									"&:active": {
										backgroundColor: themeMapping.palette.secondary.w70,
										color: themeMapping.palette.primary.text.w10
									}
								},
								"&.activeState": {
									// only active chioce chip
									backgroundColor: themeMapping.palette.secondary.w20,
									color: themeMapping.palette.primary.text.wMain,
									borderColor: themeMapping.palette.secondary.w40,
									"&:hover": {
										backgroundColor: themeMapping.palette.secondary.w40,
										color: themeMapping.palette.primary.text.wMain
									},
									"&:active": {
										backgroundColor: themeMapping.palette.secondary.wMain,
										color: themeMapping.palette.primary.text.wMain
									},
									"&.darkMode": {
										backgroundColor: themeMapping.palette.secondary.w70,
										color: themeMapping.palette.primary.text.w10,
										borderColor: themeMapping.palette.background.wMain,
										"&:hover": {
											backgroundColor: themeMapping.palette.secondary.w80,
											color: themeMapping.palette.primary.text.w10
										},
										"&:active": {
											backgroundColor: themeMapping.palette.background.wMain,
											color: themeMapping.palette.primary.text.w10
										}
									}
								}
							}
						},
						"&.solaceTag": {
							".leadingIcon": {
								margin: "3px 0px 0px 0px"
							},
							"&.MuiChip-filledDefault": {
								backgroundColor: themeMapping.palette.secondary.w20,
								color: themeMapping.palette.secondary.wMain,
								"&.MuiChip-clickable": {
									"&:hover": {
										backgroundColor: themeMapping.palette.secondary.w40,
										color: themeMapping.palette.primary.text.wMain
									},
									"&:active": {
										boxShadow: "none"
									}
								}
							},
							"&.MuiChip-outlinedDefault": {
								backgroundColor: themeMapping.palette.background.w10,
								color: themeMapping.palette.secondary.wMain,
								borderColor: themeMapping.palette.secondary.w70,
								boxShadow: "none"
							}
						}
					},
					label: {
						paddingLeft: "6px",
						paddingRight: "6px"
					},
					deleteIcon: {
						margin: "0px 0px 0px 0px",
						padding: "2px",
						borderRadius: "3px",
						fontSize: BASE_FONT_PX_SIZES.md
					}
				}
			},
			MuiBreadcrumbs: {
				styleOverrides: {
					root: {
						".MuiBreadcrumbs-separator": {
							marginLeft: "0px",
							marginRight: "0px"
						},
						".MuiBreadcrumbs-li": {
							".MuiLink-underlineNone": {
								color: themeMapping.palette.secondary.text.wMain
							}
						}
					}
				}
			},
			MuiTab: {
				styleOverrides: {
					root: {
						textTransform: "none",
						fontWeight: 400,
						"&.Mui-selected": {
							color: themeMapping.palette.primary.text.wMain,
							fontWeight: 500,
							".notificationCounter": {
								fontWeight: 400
							}
						},
						":hover": {
							color: themeMapping.palette.primary.text.wMain
						}
					}
				}
			},
			MuiTabs: {
				styleOverrides: {
					root: {
						a: {
							color: themeMapping.palette.secondary.text.wMain,
							boxSizing: "border-box",
							borderBottom: "2px solid transparent",
							// TODO: remove "solace" options when new theme is adopted
							":active": {
								borderBottomColor: isCurrentSolace ? "transparent" : themeMapping.palette.primary.w20
							},
							":hover": {
								borderBottomColor: isCurrentSolace ? "transparent" : themeMapping.palette.primary.w10
							}
						},
						".MuiTabs-indicator": {
							backgroundColor: themeMapping.palette.accent.n2.wMain
						},
						"&.singleTab": {
							a: {
								cursor: "inherit"
							},
							".MuiTabs-indicator": {
								backgroundColor: "transparent"
							}
						}
					}
				}
			},
			MuiPagination: {
				styleOverrides: {
					root: {
						".MuiTouchRipple-root": {
							display: "none"
						},
						".MuiButtonBase-root.MuiPaginationItem-root": {
							margin: "0 2px",
							padding: "0",
							height: "24px",
							minWidth: "20px",
							color: themeMapping.palette.primary.wMain,
							fontSize: BASE_FONT_PX_SIZES.sm
						},
						".MuiButtonBase-root.MuiPaginationItem-root:hover": {
							background: "none",
							textDecoration: "underline",
							// TODO: remove "solace" options when new theme is adopted
							color: isCurrentSolace ? themeMapping.palette.primary.wMain : themeMapping.palette.primary.w90
						},
						".MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
							background: "none",
							color: themeMapping.palette.primary.text.wMain
						}
					}
				}
			},
			MuiTooltip: {
				styleOverrides: {
					popper: {
						// the gap between the hovered over element and the Popover/Tooltip
						"&.MuiTooltip-popper": {
							".MuiTooltip-tooltip.MuiTooltip-tooltipPlacementRight": {
								marginLeft: "14px"
							},
							".MuiTooltip-tooltip.MuiTooltip-tooltipPlacementLeft": {
								marginRight: "14px"
							},
							".MuiTooltip-tooltip.MuiTooltip-tooltipPlacementTop": {
								marginBottom: "14px"
							},
							".MuiTooltip-tooltip.MuiTooltip-tooltipPlacementBottom": {
								marginTop: "14px"
							}
						}
					},
					tooltip: {
						borderRadius: "4px",
						maxWidth: "300px",
						margin: 0,
						wordWrap: "break-word",
						fontWeight: 400,
						padding: "6px 8px",
						fontSize: BASE_FONT_PX_SIZES.xs,
						lineHeight: "18px",
						backgroundColor: themeMapping.palette.background.wMain,
						color: themeMapping.palette.deprecated.primary.text.w10,
						boxShadow: `0 2px 2px ${getBoxShadow("w12")}`,
						"&.htmlContent": {
							padding: "12px 16px",
							fontSize: BASE_FONT_PX_SIZES.sm,
							lineHeight: "21px",
							backgroundColor: themeMapping.palette.background.w10,
							color: themeMapping.palette.primary.text.wMain,
							boxShadow: `0 2px 5px ${getBoxShadow("w15")}`
						},
						"&.mediumWidth": {
							maxWidth: "500px"
						},
						"&.fullWidth": {
							maxWidth: "100%"
						},
						/**
						 * style for SolacePopover
						 */
						"&.SolacePopover": {
							backgroundColor: themeMapping.palette.background.w10,
							color: themeMapping.palette.primary.text.wMain,
							fontSize: BASE_FONT_PX_SIZES.sm,
							fontWeight: 400,
							padding: "12px 16px", // considering line height
							borderRadius: "4px",
							boxShadow: `0 2px 5px ${getBoxShadow("w15")}`,
							cursor: "pointer"
						}
					}
				}
			},
			MuiAccordion: {
				styleOverrides: {
					root: {
						boxShadow: "none",
						"&:not(:last-child)": {
							borderBottom: 0
						},
						"&:before": {
							display: "none"
						},
						"&.Mui-disabled": {
							backgroundColor: themeMapping.palette.background.w20,
							color: themeMapping.palette.secondary.text.w50,
							".MuiAccordionSummary-expandIconWrapper": {
								svg: {
									fill: themeMapping.palette.secondary.w40
								}
							}
						},
						"&.MuiPaper-root": {
							minWidth: "100px",
							maxHeight: "100%",
							boxShadow: "none",
							padding: "0px"
						}
					}
				}
			},
			MuiAccordionSummary: {
				styleOverrides: {
					root: {
						flexDirection: "row-reverse",
						position: "relative",
						"&.hasHoverEffect": {
							":hover": {
								backgroundColor: themeMapping.palette.secondary.w10
							}
						},
						".MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
							transform: "rotate(90deg)"
						},
						"&.Mui-disabled": {
							opacity: 1
						},
						...verticalIndicatorStyle(themeMapping)
					},
					content: {
						margin: "6px 0px 6px 8px"
					},
					expandIconWrapper: {
						padding: "0px",
						svg: {
							fill: themeMapping.palette.secondary.wMain,
							":hover": {
								fill: themeMapping.palette.deprecated.secondary.w80
							}
						}
					}
				}
			},
			MuiAccordionDetails: {
				styleOverrides: {
					root: {
						/**
						 * To left align the title with the content:
						 * padding left of the content is calculated based on the elements in the accordion summary title:
						 * so, 16px (padding left) + 24px (width of the chevron icon) + 8px (padding right)= 48px
						 */
						padding: "8px 16px 16px 48px"
					}
				}
			},
			MuiListItemButton: {
				styleOverrides: {
					root: { "&.Mui-selected": { backgroundColor: themeMapping.palette.brand.w10 } }
				}
			},
			MuiStep: {
				styleOverrides: {
					root: { paddingLeft: "24px", paddingRight: "24px" }
				}
			},
			MuiStepper: {
				styleOverrides: {
					root: {
						paddingTop: "24px",
						paddingBottom: "24px"
					}
				}
			},
			MuiStepConnector: {
				styleOverrides: {
					root: {
						".MuiStepConnector-line": {
							borderColor: themeMapping.palette.secondary.w40
						}
					}
				}
			}
		},
		mixins: {
			/** ErrorText for form components */
			formComponent_ErrorText: {
				container: {
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-start",
					marginTop: "2px"
				},
				label: {
					// TODO: remove "solace" option when new theme is adopted
					color: isCurrentSolace ? themeMapping.palette.error.w100 : themeMapping.palette.secondary.text.wMain,
					fontSize: BASE_FONT_PX_SIZES.xs,
					marginLeft: "8px"
				}
			},
			formComponent_ReadOnlyToolTipContainer: {
				container: {
					height: "32px",
					display: "inline-flex",
					alignItems: "center",
					color: themeMapping.palette.primary.text.wMain
				}
			},
			/** ErrorText for form components */
			formComponent_WarningText: {
				container: {
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-start",
					marginTop: "2px"
				},
				label: {
					fontSize: BASE_FONT_PX_SIZES.xs,
					marginLeft: "8px"
				}
			},
			/** Attribute Value Pair (AVP) for form components */
			formComponent_AVPItem: {
				container: {
					display: "grid",
					gridTemplateRows: "auto",
					padding: "4px 0"
				},
				moveButton: {
					paddingTop: "4px",
					paddingLeft: "4px",
					justifyItems: "end"
				},
				deleteButton: {
					paddingTop: "4px",
					paddingLeft: "4px",
					borderRadius: "4px",
					justifyItems: "start"
				},
				inputWrapperForKey: {
					gridColumnStart: 2,
					gridColumnEnd: 3
				},
				inputWrapperForValue: {
					gridColumnStart: 4,
					gridColumnEnd: 5
				}
			},
			formComponent_AVPForm: {
				container: {
					backgroundColor: "transparent",
					minWidth: "500px",
					maxWidth: "900px"
				},
				listWrapper: {
					display: "grid",
					gridTemplateColumns: "auto",
					gridTemplateRows: "auto",
					rowGap: "0"
				},
				labelWrapper: {
					padding: "2px 0",
					display: "grid",
					gridTemplateRows: "auto",
					label: {
						color: themeMapping.palette.secondary.text.wMain,
						fontWeight: "medium",
						":first-of-type": {
							gridColumnStart: 2,
							gridColumnEnd: 3
						},
						":last-of-type": {
							gridColumnStart: 4,
							gridColumnEnd: 5
						}
					}
				}
			},
			/** Solace CodeEditor */
			formComponent_CodeEditor: {
				OuterWrapper: {
					"&.codeEditor-expanded--backdrop": {
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: themeMapping.palette.secondary.w8040,
						display: "block",
						zIndex: 1200
					}
				},
				InnerWrapper: {
					position: "relative",
					"&.codeEditor-expanded--main": {
						position: "fixed",
						backgroundColor: themeMapping.palette.background.w10,
						borderRadius: "4px",
						padding: "4px",
						width: "80%",
						height: "80%",
						top: "50%",
						left: "50%",
						transform: "translate(-50%,-50%)",
						".react-codemirror2": {
							height: "100%"
						},
						".CodeMirror": {
							height: "100%",
							clipPath: "unset !important" // undo the fix for Chrome 105 https://github.com/codemirror/codemirror5/commit/0f41e5153f8948604a0e9a2d71a1adbb9aeaed23
						}
					}
				},
				EditorWrapper: {
					height: "100%",
					"&.codeEditor-border": {
						border: `solid 1px ${themeMapping.palette.secondary.w40}`,
						"&.codeEditor-readonly": {
							".CodeMirror-cursor": { display: "none" } // hide the cursor when in readOnly mode
						}
					}
				},
				IconWrapper: {
					boxShadow: `0px 1px 4px ${getBoxShadow("w20")}`,
					borderRadius: "5px",
					backgroundColor: themeMapping.palette.background.w10,
					// position is relative to its parent with position: relative
					position: "absolute",
					// the z-index of the buttons should be higher than the z-index of the CodeMirror, which is 9
					zIndex: 20,
					"&.codeEditor-expanded--icon": {
						top: -12,
						right: -12
					},
					"&.codeEditor-collapsed--icon": {
						top: 16,
						right: 24
					}
				}
			},
			/** SolaceMessageBox component */
			component_MessageBox: {
				container: {
					position: "relative",
					height: "100%",
					borderRadius: "2px",
					"&::before": {
						content: '""', // Required for the ::before to work
						left: "0",
						top: "0",
						bottom: "0",
						position: "absolute",
						width: "3px", // Width of the vertical bar
						borderRadius: "10px"
					},
					"&.info": {
						"&::before": {
							backgroundColor: `${themeMapping.palette.info.w100}`
						},
						backgroundColor: themeMapping.palette.info.w10,
						".MuiButtonBase-root.MuiIconButton-root": {
							".MuiSvgIcon-root path": {
								// TODO: remove "solace" option when new theme is adopted
								fill: isCurrentSolace ? themeMapping.palette.secondary.wMain : themeMapping.palette.info.w100
							},
							":hover": {
								backgroundColor: themeMapping.palette.info.w20
							},
							":active": {
								backgroundColor: themeMapping.palette.info.w30
							}
						},
						".MuiButton-root": {
							"&.MuiButton-textPrimary": {
								color: themeMapping.palette.info.w100,
								"&:hover": {
									backgroundColor: themeMapping.palette.info.w20
								},
								"&:active": {
									backgroundColor: themeMapping.palette.info.w30
								}
							}
						}
					},
					"&.error": {
						"&::before": {
							backgroundColor: `${themeMapping.palette.error.w100}`
						},
						backgroundColor: themeMapping.palette.error.w10,
						".MuiButtonBase-root.MuiIconButton-root": {
							".MuiSvgIcon-root path": {
								// TODO: remove "solace" options when new theme is adopted
								fill: isCurrentSolace ? themeMapping.palette.secondary.wMain : themeMapping.palette.error.w100
							},
							":hover": {
								backgroundColor: themeMapping.palette.error.w20
							},
							":active": {
								backgroundColor: themeMapping.palette.error.w30
							}
						},
						".MuiButton-root": {
							"&.MuiButton-textPrimary": {
								color: themeMapping.palette.error.w100,
								"&:hover": {
									backgroundColor: themeMapping.palette.error.w20
								},
								"&:active": {
									backgroundColor: themeMapping.palette.error.w30
								}
							}
						}
					},
					"&.warn": {
						"&::before": {
							backgroundColor: `${themeMapping.palette.warning.w100}`
						},
						backgroundColor: themeMapping.palette.warning.w10,
						".MuiButtonBase-root.MuiIconButton-root": {
							".MuiSvgIcon-root path": {
								// TODO: remove "solace" options when new theme is adopted
								fill: isCurrentSolace ? themeMapping.palette.secondary.wMain : themeMapping.palette.warning.w100
							},
							":hover": {
								backgroundColor: themeMapping.palette.warning.w20
							},
							":active": {
								backgroundColor: themeMapping.palette.warning.w30
							}
						},
						".MuiButton-root": {
							"&.MuiButton-textPrimary": {
								color: themeMapping.palette.warning.w100,
								"&:hover": {
									backgroundColor: themeMapping.palette.warning.w20
								},
								"&:active": {
									backgroundColor: themeMapping.palette.warning.w30
								}
							}
						}
					},
					"&.success": {
						"&::before": {
							backgroundColor: `${themeMapping.palette.success.w100}`
						},
						backgroundColor: themeMapping.palette.success.w10,
						".MuiButtonBase-root.MuiIconButton-root": {
							".MuiSvgIcon-root path": {
								// TODO: remove "solace" options when new theme is adopted
								fill: isCurrentSolace ? themeMapping.palette.secondary.wMain : themeMapping.palette.success.w100
							},
							":hover": {
								backgroundColor: themeMapping.palette.success.w20
							},
							":active": {
								backgroundColor: themeMapping.palette.success.w30
							}
						}
					}
				},
				messageContainer: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					paddingRight: "4px",
					button: {
						width: "auto"
					},
					a: {
						fontWeight: 500
					}
				},
				message: {
					display: "flex",
					width: "100%",
					alignItems: "center",
					gap: "8px",
					padding: "6px 8px 5px 8px",
					lineHeight: "1.5",
					"&.dense": {
						padding: "0 8px",
						lineHeight: "normal"
					}
				},
				iconContainer: {
					alignSelf: "flex-start",
					width: "20px",
					height: "20px",
					"&.dense": {
						paddingTop: "6px"
					}
				},
				messageTextContainer: {
					width: "100%",
					// TODO: remove "solace" option when new theme is adopted
					color: isCurrentSolace ? themeMapping.palette.primary.text.wMain : ""
				},
				detailsContainer: {
					// 10px on top because the message will have 6px padding bottom
					padding: "10px 16px 16px 16px",
					color: themeMapping.palette.primary.text.wMain
				}
			},
			/** SolaceGridList */
			layoutComponent_ImageList: {
				border: {
					border: `1px solid ${themeMapping.palette.secondary.w20}`
				},
				header: {
					display: "flex",
					justifyContent: "space-between",
					padding: "8px 16px 8px 16px",
					alignItems: "center",
					borderLeft: `1px solid ${themeMapping.palette.secondary.w20}`,
					borderTop: `1px solid ${themeMapping.palette.secondary.w20}`,
					borderRight: `1px solid ${themeMapping.palette.secondary.w20}`,
					boxShadow: `0 2px 4px -1px ${getBoxShadow("w20")}`,
					"& .selectAll": {
						display: "flex",
						alignItems: "center"
					},
					"& .selectAllText": {
						marginLeft: "8px",
						color: themeMapping.palette.primary.text.wMain
					},
					"& .countItemsText": {
						marginRight: "16px",
						color: themeMapping.palette.secondary.text.wMain
					}
				},
				row: {
					...gridListRowCommonStyle(themeMapping),
					"&.headerRow": {
						border: "none",
						height: "30px",
						fontWeight: "500",
						color: themeMapping.palette.secondary.text.wMain,
						cursor: "auto",
						padding: "0 16px",
						position: "sticky",
						top: 0,
						":hover": {
							background: "unset"
						},
						zIndex: 1,
						":first-of-type": {
							borderTop: "none"
						}
					},
					borderBottom: `1px solid ${themeMapping.palette.secondary.w20}`,
					":last-child": {
						borderBottom: "none"
					}
				},
				virtualRow: {
					...gridListRowCommonStyle(themeMapping)
				},
				virtualRowContainer: {
					boxSizing: "border-box",
					borderBottom: `1px solid ${themeMapping.palette.secondary.w20}`
				},
				list: {
					overflow: "overlay",
					height: "100%",
					"@-moz-document url-prefix()": {
						overflow: "auto"
					}
				}
			},
			/** SolaceNotification Count */
			component_NotificationCounter: {
				container: {
					borderRadius: "50%",
					textAlign: "center",
					verticalAlign: "middle",
					background: themeMapping.palette.info.w100,
					color: themeMapping.palette.primary.text.w10
				},
				value: {
					transition: "opacity 300ms",
					cursor: "default"
				}
			}
		},
		palette: {
			ux: themeMapping.palette,
			background: {
				/** @deprecated */
				default: themeMapping.palette.background.w20
			},
			error: {
				/** @deprecated */
				main: themeMapping.palette.error.w100
			},
			warning: {
				/** @deprecated */
				main: themeMapping.palette.warning.w100
			},
			primary: {
				/** @deprecated */
				contrastText: themeMapping.palette.primary.text.w10,
				/** @deprecated */
				dark: themeMapping.palette.brand.wMain,
				/** @deprecated */
				main: themeMapping.palette.brand.wMain
			},
			secondary: {
				/** @deprecated */
				contrastText: themeMapping.palette.primary.text.w10,
				/** @deprecated */
				main: themeMapping.palette.brand.wMain
			},
			// TBD: Do we want to keep these defaults via <Typography...?
			text: {
				primary: themeMapping.palette.primary.text.wMain,
				secondary: themeMapping.palette.secondary.text.wMain,
				disabled: themeMapping.palette.secondary.text.w50
			}
		},
		spacing: 8,
		typography: {
			/**
			 * typography properties coming from the standard defined in
			 * https://www.figma.com/file/2LR7eIvywQ8jgTrA0wlHTK/Text-styles-in-PS%2B?node-id=213%3A20861
			 */
			fontFamily: "Rubik,sans-serif",
			h1: {
				fontSize: "1.25rem",
				lineHeight: 1.5,
				fontWeight: 500
			},
			h2: { fontSize: "1.25rem", lineHeight: 1.5, fontWeight: 400 },
			h3: { fontSize: "1rem", lineHeight: 1.5, fontWeight: 500 },
			h4: { fontSize: "1rem", lineHeight: 1.5, fontWeight: 400 },
			h5: { fontSize: "0.875rem", lineHeight: 1.5, fontWeight: 500 },
			body1: { fontSize: "0.875rem", lineHeight: 1.5, fontWeight: 400 },
			caption: { fontSize: "0.75rem", lineHeight: 1.5, fontWeight: 400 },
			//***************************************************************
			fontSize: BASE_FONT_PX_SIZES.sm,

			button: {
				lineHeight: 1.5,
				fontSize: BASE_FONT_PX_SIZES.sm,
				fontWeight: 500
			},
			subtitle1: {
				fontSize: BASE_FONT_PX_SIZES.md,
				lineHeight: 1.5
			}
		}
	};
	return themeOptions;
};

declare module "@mui/material/styles" {
	interface BreakpointOverrides {
		dialogMd: true;
	}

	interface Palette {
		ux: ThemeMappingPalette;
	}
	interface PaletteOptions {
		ux: ThemeMappingPalette;
	}
}

declare module "@mui/material/styles/createMixins" {
	interface Mixins {
		layoutComponent_ImageList: {
			header: CSSProperties;
			row: CSSProperties;
			virtualRow: CSSProperties;
			virtualRowContainer: CSSProperties;
			list: CSSProperties;
			border: CSSProperties;
		};
		formComponent_ErrorText: {
			container: CSSProperties;
			label: CSSProperties;
		};
		formComponent_ReadOnlyToolTipContainer: {
			container: CSSProperties;
		};
		formComponent_WarningText: {
			container: CSSProperties;
			label: CSSProperties;
		};
		formComponent_AVPItem: {
			container: CSSProperties;
			moveButton: CSSProperties;
			deleteButton: CSSProperties;
			inputWrapperForKey: CSSProperties;
			inputWrapperForValue: CSSProperties;
		};
		formComponent_AVPForm: {
			container: CSSProperties;
			listWrapper: CSSProperties;
			labelWrapper: CSSProperties;
		};
		formComponent_CodeEditor: {
			OuterWrapper: CSSProperties;
			InnerWrapper: CSSProperties;
			EditorWrapper: CSSProperties;
			IconWrapper: CSSProperties;
		};
		component_MessageBox: {
			container: CSSProperties;
			messageContainer: CSSProperties;
			message: CSSProperties;
			iconContainer: CSSProperties;
			messageTextContainer: CSSProperties;
			detailsContainer: CSSProperties;
		};
		component_NotificationCounter: {
			container: CSSProperties;
			value: CSSProperties;
		};
	}
}

export default getThemeOptions;
