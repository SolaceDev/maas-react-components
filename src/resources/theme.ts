import { alpha, hexToRgb, ThemeOptions } from "@mui/material";
import { SupportedThemes, ThemeMappingPalette } from "../types";
import getThemeMappings from "../theming/themeUtils";
import { BASE_COLORS } from "./colorPallette";
import { BASE_FONT_PX_SIZES } from "./typography";

const noneImportant = "none !important";

// https://sol-jira.atlassian.net/wiki/spaces/MAASB/pages/2702704723/How+to+add+theming+in+maas-ui#React:
const getThemeOptions = (_themeName: SupportedThemes) => {
	const themeMapping = getThemeMappings(_themeName);

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
						backgroundColor: BASE_COLORS.greys.grey21
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
						color: themeMapping.palette.text.contrast,
						backgroundColor: themeMapping.palette.action.primary.default,
						"&:hover": {
							backgroundColor: themeMapping.palette.action.primary.hover
						},
						"&:disabled": {
							backgroundColor: themeMapping.palette.action.primary.disabled,
							color: themeMapping.palette.text.contrast
						},
						"&:active": {
							backgroundColor: themeMapping.palette.action.primary.active
						}
					},
					outlinedPrimary: {
						borderWidth: "1px",
						borderStyle: "solid",
						borderColor: themeMapping.palette.action.secondary.default,
						color: themeMapping.palette.action.secondary.default,
						"&:disabled": {
							borderColor: themeMapping.palette.action.secondary.disabled,
							color: themeMapping.palette.action.secondary.disabled
						},
						"&:hover": {
							backgroundColor: themeMapping.palette.action.secondary.hover
						},
						"&:active": {
							backgroundColor: themeMapping.palette.action.secondary.active
						}
					},
					root: {
						textTransform: "none",
						borderRadius: "4px",
						minWidth: "100px",
						height: "32px"
					},
					startIcon: {
						width: "24px",
						height: "24px",
						marginLeft: "-12px",
						">*:nth-of-type(1)": {
							fontSize: "24px"
						}
					},
					endIcon: {
						width: "24px",
						height: "24px",
						marginRight: "-12px",
						">*:nth-of-type(1)": {
							fontSize: "24px"
						}
					},
					textPrimary: {
						borderRadius: "4px",
						color: themeMapping.palette.action.secondary.default,
						"&:disabled": {
							color: themeMapping.palette.action.secondary.disabled
						},
						"&:hover": {
							backgroundColor: themeMapping.palette.action.secondary.hover
						},
						"&:active": {
							backgroundColor: themeMapping.palette.action.secondary.active
						}
					}
				}
			},
			MuiFormControl: {
				styleOverrides: {
					root: {
						margin: "0px",
						// re-position the Solace Dropdown icon inside Select input element
						".MuiOutlinedInput-root.MuiSelect-root": {
							".MuiSvgIcon-root": {
								position: "absolute",
								top: "12px",
								right: "0",
								// eslint-disable-next-line sonarjs/no-duplicate-string
								display: "inline-block",
								pointerEvents: "none",
								color: BASE_COLORS.greys.grey8 // dropdown icon color in resting/focused/error states
							},
							"&.Mui-disabled": {
								".MuiSvgIcon-root": {
									color: BASE_COLORS.greys.grey3 // dropdown icon color in disabled state
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
			MuiFormHelperText: {
				styleOverrides: {
					root: {
						fontSize: "0.75rem",
						color: BASE_COLORS.greys.grey11,
						lineHeight: 1.5,
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
							color: themeMapping.palette.action.icon.disabled
						},
						"&:hover": {
							backgroundColor: themeMapping.palette.action.icon.hover,
							color: themeMapping.palette.action.icon.default
						},
						"&:active": {
							backgroundColor: themeMapping.palette.action.icon.active
						},
						".MuiSvgIcon-root": {
							fill: BASE_COLORS.greys.grey8
						}
					}
				}
			},
			MuiInputLabel: {
				styleOverrides: {
					asterisk: {
						color: themeMapping.palette.brand
					},
					root: {
						color: themeMapping.palette.text.secondary.default,
						fontSize: "0.875rem",
						fontWeight: 400,
						lineHeight: 1.5,
						"&.Mui-error": {
							color: BASE_COLORS.greys.grey11
						},
						"&.Mui-disabled": {
							color: BASE_COLORS.greys.grey8
						}
					}
				}
			},
			MuiFormLabel: {
				styleOverrides: {
					asterisk: {
						color: themeMapping.palette.brand
					},
					root: {
						color: themeMapping.palette.text.secondary.default,
						fontSize: "14px",
						fontWeight: 400,
						lineHeight: 1.5,
						"&.Mui-error": {
							color: BASE_COLORS.greys.grey11
						},
						"&.light-sub-text": {
							color: BASE_COLORS.greys.grey9
						},
						"&.Mui-disabled": {
							color: BASE_COLORS.greys.grey9,
							"&.check-box-label": {
								color: BASE_COLORS.greys.grey5
							},
							"&.radio-btn-label": {
								color: BASE_COLORS.greys.grey5
							}
						},
						"&.bold-label": {
							fontWeight: 500
						},
						"&.read-only": {
							color: BASE_COLORS.greys.grey9
						}
					}
				}
			},
			MuiLink: {
				styleOverrides: {
					root: {
						lineHeight: 1.5,
						fontSize: "14px",
						color: themeMapping.palette.action.secondary.default,
						"&[disabled]": {
							color: themeMapping.palette.action.secondary.disabled
						},
						".SolaceOpenExternalIcon": {
							width: "16px",
							height: "16px",
							fill: themeMapping.palette.action.secondary.default,
							marginBottom: "2px"
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
							border: `solid 1px ${BASE_COLORS.greys.grey3}`,
							borderRadius: "4px",
							padding: "8px",
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
								border: `solid 1px ${themeMapping.palette.brandHighlightHeavy}`
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
								backgroundColor: BASE_COLORS.greys.grey0
							},
							"&:hover": {
								".MuiOutlinedInput-notchedOutline": {
									border: `solid 1px ${BASE_COLORS.greys.grey5}`,
									backgroundColor: BASE_COLORS.greys.grey0
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
							"&.emptySelect, .MuiOutlinedInput-root.readOnlySelect.Mui-focused": {
								".MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
									color: BASE_COLORS.greys.grey5
								}
							},
							"&.Mui-focused": {
								".MuiOutlinedInput-notchedOutline": {
									border: `solid 1px ${themeMapping.palette.brandHighlightHeavy}`
								}
							},
							"&.Mui-error": {
								".MuiOutlinedInput-notchedOutline, .MuiInputBase-inputMultiline": {
									borderColor: `${themeMapping.palette.semantic.error.secondary.default}`
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
									WebkitTextFillColor: BASE_COLORS.greys.grey5,
									color: BASE_COLORS.greys.grey5,
									padding: "8px"
								}
							}
						},
						".MuiOutlinedInput-input": {
							fontSize: BASE_FONT_PX_SIZES.sm,
							color: themeMapping.palette.text.primary.default,
							padding: "0px 8px",
							height: "34px",
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
							fill: themeMapping.palette.brandHighlightHeavy
						},
						"&.Mui-disabled .MuiSvgIcon-root path": {
							fillOpacity: "0.35"
						},
						".MuiSvgIcon-root line": {
							stroke: themeMapping.palette.brandHighlightHeavy
						},
						"&.Mui-disabled .MuiSvgIcon-root": {
							rect: {
								fillOpacity: 0.35,
								fill: "white",
								stroke: BASE_COLORS.greys.grey2,
								strokeOpacity: 1
							},
							path: {
								fillOpacity: 0.35
							}
						},
						"+.MuiFormLabel-root": {
							marginLeft: "16px",
							color: themeMapping.palette.text.secondary.default,
							"&.Mui-disabled": {
								color: BASE_COLORS.greys.grey5
							}
						},
						"&.readOnly .MuiSvgIcon-root": {
							".SolaceCheckboxContainer": {
								fill: BASE_COLORS.greys.grey19,
								stroke: BASE_COLORS.greys.grey3,
								strokeOpacity: 1
							},
							".SolaceCheckboxCheckmark": {
								fill: BASE_COLORS.greys.grey5,
								fillOpacity: 1
							}
						},
						padding: "0px"
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
								fill: themeMapping.palette.brandHighlightHeavy
							}
						},
						"&.Mui-disabled .MuiSvgIcon-root": {
							".SolaceRadioContainer": {
								stroke: BASE_COLORS.greys.grey2,
								strokeOpacity: 1
							},
							".SolaceRadioSelection": {
								opacity: 0.35
							}
						},
						"&.readOnly .MuiSvgIcon-root": {
							".SolaceRadioContainer": {
								fill: BASE_COLORS.greys.grey19,
								stroke: BASE_COLORS.greys.grey3,
								opacity: 1
							},
							".SolaceRadioSelection": {
								fill: BASE_COLORS.greys.grey5,
								opacity: 1
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
							padding: "7px 34px 5px 8px",
							width: "100%"
						}
					},
					iconOpen: {
						// remove dropdown icon flip animation when Select menu opens/closes
						transform: "none"
					}
				}
			},
			MuiMenu: {
				styleOverrides: {
					root: {
						"&.SolaceMenu": {
							".MuiPaper-root": {
								margin: "4px",
								".MuiMenuItem-root": {
									minWidth: "80px",
									maxWidth: "320px",
									"&.wideMenu": {
										minWidth: "320px"
									}
								}
							}
						},
						".MuiPaper-root": {
							overflowY: "auto",
							boxShadow: `0px 1px 4px ${BASE_COLORS.greys.grey3}`,

							".MuiMenuItem-root": {
								display: "flex",
								padding: "0px 16px 0px 16px",
								fontSize: "14px",
								minHeight: "38px",
								alignItems: "center",
								whiteSpace: "normal",

								"&:hover": {
									backgroundColor: BASE_COLORS.greys.grey2
								},
								"&.multiline": {
									paddingTop: "8px",
									paddingBottom: "8px"
								},

								"&.Mui-selected": {
									backgroundColor: themeMapping.palette.brandHighlight
								},
								".MuiListItemIcon-root": {
									width: "48px",
									".MuiSvgIcon-root": {
										width: "24px",
										height: "24px"
									}
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
									color: themeMapping.palette.text.primary.default,
									".subtext": {
										color: BASE_COLORS.greys.grey9,
										marginRight: "24px",
										width: "100%"
									},
									".supplementalText": {
										fontSize: BASE_FONT_PX_SIZES.xs,
										color: BASE_COLORS.greys.grey9,
										marginLeft: "24px"
									},
									"&.Mui-disabled": {
										color: BASE_COLORS.greys.grey5
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
							color: BASE_COLORS.greys.grey9,
							fontSize: BASE_FONT_PX_SIZES.sm,
							fontWeight: 400,
							height: "32px",
							display: "flex",
							alignItems: "center",
							"&.categoryHeader": {
								color: themeMapping.palette.text.primary.default,
								fontSize: BASE_FONT_PX_SIZES.xs,
								fontWeight: 500
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
							color: BASE_COLORS.greys.grey9
						}
					}
				}
			},
			MuiAutocomplete: {
				styleOverrides: {
					root: {
						".MuiOutlinedInput-root .MuiAutocomplete-input": {
							padding: "0px"
						},
						".MuiOutlinedInput-root .MuiAutocomplete-endAdornment": {
							right: "0px"
						},
						".MuiOutlinedInput-root": {
							padding: "0px 0px 0px 8px",
							height: "32px"
						},
						// allow the container to grow when there are more than one line
						".MuiOutlinedInput-root.MuiInputBase-root": {
							height: "auto",
							flexWrap: "wrap"
						},
						".MuiOutlinedInput-root.readOnlySelect": {
							padding: "0px"
						},
						".MuiFormControl-root .MuiOutlinedInput-root.Mui-disabled input": {
							padding: "0px"
						},
						".MuiButtonBase-root.MuiIconButton-root.MuiAutocomplete-popupIndicator:hover": {
							background: "transparent"
						},
						".MuiButtonBase-root.MuiIconButton-root.MuiAutocomplete-clearIndicator .MuiSvgIcon-root:hover": {
							fill: BASE_COLORS.greys.grey14
						},
						// styles specifically applied when autocomplete allows multiple lines with chips
						".MuiButtonBase-root.MuiChip-root": {
							height: "24px",
							margin: "3px 6px 3px 0px",
							borderRadius: "40px",
							fontSize: "14px",
							svg: {
								width: "17px",
								height: "17px",
								fill: BASE_COLORS.greys.grey8
							}
						}
					},
					input: {
						// allow 'input' element to be inline with chips instead of taking its own line
						width: 0
					},
					popper: {
						".MuiAutocomplete-listbox .MuiAutocomplete-option": {
							paddingTop: 0,
							paddingBottom: 0,
							minHeight: "38px",
							".MuiGrid-root.MuiGrid-container": {
								"&.multiline": {
									paddingTop: "8px",
									paddingBottom: "8px"
								}
							}
						},
						".MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused ": {
							backgroundColor: BASE_COLORS.greys.grey2
						},
						".MuiAutocomplete-listbox .MuiAutocomplete-option[aria-selected='true']": {
							backgroundColor: alpha(themeMapping.palette.brandHighlightHeavy, 0.1)
						},
						".MuiAutocomplete-listbox .MuiAutocomplete-option[aria-selected='true'].Mui-focused": {
							backgroundColor: alpha(themeMapping.palette.brandHighlightHeavy, 0.1)
						},
						boxShadow: `0px 1px 4px ${BASE_COLORS.greys.grey3}`,
						color: themeMapping.palette.text.primary.default,
						".subtext": {
							color: BASE_COLORS.greys.grey9
						},
						".suplementalText": {
							fontSize: BASE_FONT_PX_SIZES.xs,
							color: BASE_COLORS.greys.grey8
						}
					},
					popupIndicator: {
						padding: "0px 4px 0px 8px",
						marginRight: "0px",
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
						paddingBottom: "0px",
						".MuiButtonBase-root": {
							"&.MuiSwitch-switchBase": {
								"&.Mui-checked": {
									transform: "translate(22px)"
								},
								"&.Mui-checked + .MuiSwitch-track": {
									backgroundColor: alpha(themeMapping.palette.brand, 0.35),
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
									backgroundColor: alpha(themeMapping.palette.brand, 0.35)
								}
							},
							".MuiSwitch-thumb": {
								width: "16px",
								height: "16px",
								border: `solid 2px ${alpha(themeMapping.palette.brand, 0.35)}`,
								boxShadow: "none"
							}
						},
						".MuiSwitch-track": {
							height: "12px",
							width: "36px",
							transform: "translateY(1px)",
							backgroundColor: alpha(themeMapping.palette.brand, 0.35),
							opacity: 1
						}
					},
					switchBase: {
						"&.MuiChecked .MuiSwitch-track": {
							height: "12px",
							transform: "translateY(1px)",
							backgroundColor: alpha(themeMapping.palette.brand, 0.35),
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
							maxHeight: "80%",
							boxShadow: `0px 2px 8px ${BASE_COLORS.greys.grey4}`,
							padding: "24px",
							".MuiDialogTitle-root": {
								fontSize: BASE_FONT_PX_SIZES.xl,
								color: themeMapping.palette.text.primary.default,
								padding: "0px 0px 24px 0px"
							},
							".MuiDialogContent-root": {
								fontSize: BASE_FONT_PX_SIZES.sm,
								lineHeight: `${BASE_FONT_PX_SIZES.lg}px`,
								color: themeMapping.palette.text.primary.default,
								padding: "0px"
								// ".MuiBox-root": {
								// 	display: "grid"
								// }
							},
							".MuiDialogActions-root": {
								padding: "24px 0px 0px 0px",
								"& > :not(:nth-of-type(1))": {
									marginLeft: "8px"
								}
							}
						},
						/**
						 * apply an indeterminate linear progress indicator at the bottom of the dialog
						 */
						"&.linearProgressIndicator": {
							".MuiPaper-root": {
								position: "absolute",
								overflowX: "hidden"
							},
							// the light background of the progress bar
							".MuiPaper-root::before": {
								content: '""',
								position: "absolute",
								bottom: 0,
								left: 0,
								width: "100%",
								height: "4px",
								backgroundColor: themeMapping.palette.brand
							},
							// the dark sliding part of the progress bar
							".MuiPaper-root::after": {
								content: '""',
								position: "absolute",
								bottom: 0,
								left: 0,
								width: "100%",
								height: "4px",
								background: `linear-gradient(90deg, ${hexToRgb(
									themeMapping.palette.brandHighlight
								)} 0% 40%, transparent 40% 100%)`,
								animation: "animation 2s linear infinite"
							},
							"@keyframes animation": {
								"0%": {
									left: "0%"
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
						borderRadius: "40px"
					},
					filled: {
						backgroundColor: BASE_COLORS.greys.grey2
					},
					clickable: {
						"&:hover": {
							backgroundColor: BASE_COLORS.greys.grey3
						}
					}
				}
			},
			MuiTab: {
				styleOverrides: {
					root: {
						textTransform: "none",
						fontWeight: 400,
						"&.Mui-selected, :hover": {
							color: themeMapping.palette.text.primary.default
						}
					}
				}
			},
			MuiTabs: {
				styleOverrides: {
					root: {
						a: {
							color: BASE_COLORS.greys.grey11
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
							color: themeMapping.palette.brand,
							fontSize: BASE_FONT_PX_SIZES.md
						},
						".MuiButtonBase-root.MuiPaginationItem-root:hover": {
							background: "none"
						},
						".MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
							background: "none",
							color: themeMapping.palette.text.primary.default
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
						backgroundColor: BASE_COLORS.greys.grey25,
						color: BASE_COLORS.whites.white2,
						boxShadow: "0 2px 2px rgba(0,0,0,0.12)",
						"&.htmlContent": {
							padding: "12px 16px",
							fontSize: BASE_FONT_PX_SIZES.sm,
							lineHeight: "21px",
							backgroundColor: BASE_COLORS.whites.white1,
							color: themeMapping.palette.text.primary.default,
							boxShadow: "0 2px 5px rgba(0,0,0,0.15)"
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
							backgroundColor: BASE_COLORS.whites.white1,
							color: themeMapping.palette.text.primary.default,
							fontSize: BASE_FONT_PX_SIZES.sm,
							fontWeight: 400,
							padding: "12px 16px", // considering line height
							borderRadius: "4px",
							boxShadow: `0px 2px 5px ${BASE_COLORS.greys.grey26}`,
							cursor: "pointer"
						}
					}
				}
			},
			MuiAccordion: {
				styleOverrides: {
					root: {
						border: `1px solid ${BASE_COLORS.greys.grey2}`,
						boxShadow: "none",
						"&:not(:last-child)": {
							borderBottom: 0
						},
						"&:before": {
							display: "none"
						},
						"&.indicator-info": {
							background: `linear-gradient(${themeMapping.palette.semantic.info.primary.default} , ${themeMapping.palette.semantic.info.primary.default}) left/3px 90% no-repeat`
						},
						"&.indicator-error": {
							background: `linear-gradient(${themeMapping.palette.semantic.error.primary.default} , ${themeMapping.palette.semantic.error.primary.default}) left/3px 90% no-repeat`
						},
						"&.indicator-warn": {
							background: `linear-gradient(${themeMapping.palette.semantic.warn.primary.default} , ${themeMapping.palette.semantic.warn.primary.default}) left/3px 90% no-repeat`
						},
						"&.indicator-success": {
							background: `linear-gradient(${themeMapping.palette.semantic.success.primary.default} , ${themeMapping.palette.semantic.success.primary.default}) left/3px 90% no-repeat`
						}
					}
				}
			},
			MuiAccordionSummary: {
				styleOverrides: {
					root: {
						flexDirection: "row-reverse",
						"&.hasHoverEffect": {
							":hover": {
								backgroundColor: BASE_COLORS.greys.grey2
							}
						},
						".MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
							transform: "rotate(90deg)"
						}
					},
					content: {
						margin: "6px 0" // default is "12px 0"
					},
					expandIconWrapper: {
						padding: "0px 8px 0px 8px",
						svg: {
							fill: BASE_COLORS.greys.grey8,
							":hover": {
								fill: BASE_COLORS.greys.grey14
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
						 * padding left of the content is calculated based on the elements in the title:
						 * so, 16+8+24+8 = 56px
						 */
						padding: "8px 16px 16px 56px"
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
					color: themeMapping.palette.semantic.error.primary.default,
					fontSize: BASE_FONT_PX_SIZES.xs,
					marginLeft: "8px"
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
					padding: "4px 0px"
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
					rowGap: "0px"
				},
				labelWrapper: {
					padding: "2px 0px",
					display: "grid",
					gridTemplateRows: "auto",
					label: {
						color: BASE_COLORS.greys.grey11,
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
			/** SolaceMessageBox component */
			component_MessageBox: {
				container: {
					height: "100%",
					borderRadius: "2px",
					"&.info": {
						backgroundColor: themeMapping.palette.semantic.info.primary.background,
						borderLeft: `3px solid ${themeMapping.palette.semantic.info.primary.default}`
					},
					"&.error": {
						backgroundColor: themeMapping.palette.semantic.error.primary.background,
						borderLeft: `3px solid ${themeMapping.palette.semantic.error.primary.default}`
					},
					"&.warn": {
						backgroundColor: themeMapping.palette.semantic.warn.primary.background,
						borderLeft: `3px solid ${themeMapping.palette.semantic.warn.primary.default}`
					},
					"&.success": {
						backgroundColor: themeMapping.palette.semantic.success.primary.background,
						borderLeft: `3px solid ${themeMapping.palette.semantic.success.primary.default}`
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
					svg: {
						width: "20px",
						height: "20px"
					}
				},
				message: {
					display: "flex",
					width: "100%",
					alignItems: "center",
					gap: "8px",
					padding: "6px 8px",
					"&.dense": {
						padding: "0 8px"
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
					width: "100%"
				},
				detailsContainer: {
					// 10px on top because the message will have 6px padding bottom
					padding: "10px 16px 16px 16px"
				}
			},
			/** SolaceGridList */
			layoutComponent_ImageList: {
				header: {
					display: "flex",
					justifyContent: "space-between",
					padding: "8px 24px 8px 24px",
					alignItems: "center",
					borderLeft: `1px solid ${BASE_COLORS.greys.grey2}`,
					borderTop: `1px solid ${BASE_COLORS.greys.grey2}`,
					borderRight: `1px solid ${BASE_COLORS.greys.grey2}`,
					boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
					"& .selectAll": {
						display: "flex",
						alignItems: "center"
					},
					"& .selectAllText": {
						marginLeft: "-8px"
					}
				},
				row: {
					display: "grid",
					gridColumnGap: "16px",
					whiteSpace: "nowrap",
					placeItems: "center left",
					padding: "10px 24px",
					lineHeight: "32px",
					"&.headerRow": {
						height: "30px",
						fontWeight: "500",
						color: BASE_COLORS.greys.grey11,
						cursor: "auto",
						padding: "0px 24px",
						position: "sticky",
						top: 0,
						":hover": {
							background: "unset"
						},
						zIndex: 1
					},
					borderBottom: `1px solid ${BASE_COLORS.greys.grey2}`,
					cursor: "pointer",
					":last-child": {
						borderBottom: "none"
					},
					":hover": {
						background: BASE_COLORS.greys.grey1
					},
					":focus-visible": {
						background: BASE_COLORS.greys.grey1,
						outline: "none"
					},
					"&.selected": {
						background: themeMapping.palette.brandHighlight,
						cursor: "default"
					}
				},
				list: {
					border: `1px solid ${BASE_COLORS.greys.grey2}`,
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
					background: BASE_COLORS.blues.blue2,
					color: BASE_COLORS.whites.white1
				},
				value: {
					transition: "opacity 300ms",
					cursor: "default"
				}
			}
		},
		palette: {
			custom: themeMapping.palette,
			background: {
				default: themeMapping.palette.background.primary.default
			},
			error: {
				main: themeMapping.palette.semantic.error.primary.default
			},
			warning: {
				main: themeMapping.palette.semantic.warn.primary.default
			},
			primary: {
				contrastText: themeMapping.palette.text.contrast,
				dark: themeMapping.palette.brand,
				main: themeMapping.palette.brand
			},
			secondary: {
				contrastText: themeMapping.palette.text.contrast,
				main: themeMapping.palette.brand
			},
			text: {
				primary: themeMapping.palette.text.primary.default,
				secondary: themeMapping.palette.text.secondary.default,
				disabled: BASE_COLORS.greys.grey5 // differs from other disabled text with 0.65?
			}
		},
		spacing: 8,
		typography: {
			fontSize: BASE_FONT_PX_SIZES.sm,
			body1: {
				fontSize: BASE_FONT_PX_SIZES.sm,
				lineHeight: 1.5
			},
			button: {
				lineHeight: 1.5,
				fontSize: BASE_FONT_PX_SIZES.sm,
				fontWeight: 500
			},
			caption: {
				fontSize: BASE_FONT_PX_SIZES.xs,
				lineHeight: 1.5
			},
			subtitle1: {
				fontSize: BASE_FONT_PX_SIZES.md,
				lineHeight: 1.5
			},
			fontFamily: "Rubik,sans-serif"
		}
	};
	return themeOptions;
};

declare module "@mui/material/styles" {
	interface BreakpointOverrides {
		dialogMd: true;
	}
	interface Palette {
		custom: ThemeMappingPalette;
	}
	interface PaletteOptions {
		custom: ThemeMappingPalette;
	}
}

declare module "@mui/material/styles/createMixins" {
	interface Mixins {
		layoutComponent_ImageList: {
			header: CSSProperties;
			row: CSSProperties;
			list: CSSProperties;
		};
		formComponent_ErrorText: {
			container: CSSProperties;
			label: CSSProperties;
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
