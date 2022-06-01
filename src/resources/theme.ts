import { alpha, hexToRgb, ThemeOptions } from "@mui/material";
import { SupportedThemes, ThemeMappingPalette } from "../types";
import getThemeMappings from "../theming/themeUtils";
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
						backgroundColor: themeMapping.palette.deprecated.background.wMain
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
						color: themeMapping.palette.primary.text.w10,
						backgroundColor: themeMapping.palette.primary.wMain,
						"&:hover": {
							backgroundColor: themeMapping.palette.primary.w90
						},
						"&:disabled": {
							backgroundColor: themeMapping.palette.secondary.w40,
							color: themeMapping.palette.primary.text.w10
						},
						"&:active": {
							backgroundColor: themeMapping.palette.primary.w100
						}
					},
					outlinedPrimary: {
						borderWidth: "1px",
						borderStyle: "solid",
						borderColor: themeMapping.palette.primary.wMain,
						color: themeMapping.palette.primary.wMain,
						"&:disabled": {
							borderColor: themeMapping.palette.secondary.w40,
							color: themeMapping.palette.secondary.w40
						},
						"&:hover": {
							backgroundColor: themeMapping.palette.primary.w10
						},
						"&:active": {
							backgroundColor: themeMapping.palette.primary.w20
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
						color: themeMapping.palette.primary.wMain,
						"&:disabled": {
							color: themeMapping.palette.secondary.w40
						},
						"&:hover": {
							backgroundColor: themeMapping.palette.primary.w10
						},
						"&:active": {
							backgroundColor: themeMapping.palette.primary.w20
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
								color: themeMapping.palette.deprecated.secondary.wMain // dropdown icon color in resting/focused/error states
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
			MuiFormHelperText: {
				styleOverrides: {
					root: {
						fontSize: "0.75rem",
						color: themeMapping.palette.deprecated.secondary.text.wMain,
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
							color: themeMapping.palette.secondary.w40
						},
						"&:hover": {
							backgroundColor: themeMapping.palette.secondary.w10,
							color: themeMapping.palette.secondary.wMain
						},
						"&:active": {
							backgroundColor: themeMapping.palette.secondary.w20
						},
						".MuiSvgIcon-root": {
							fill: themeMapping.palette.deprecated.secondary.wMain
						}
					}
				}
			},
			MuiInputLabel: {
				styleOverrides: {
					asterisk: {
						color: themeMapping.palette.brand.wMain
					},
					root: {
						color: themeMapping.palette.secondary.text.wMain,
						fontSize: "0.875rem",
						fontWeight: 400,
						lineHeight: 1.5,
						"&.Mui-error": {
							color: themeMapping.palette.deprecated.secondary.text.wMain
						},
						"&.Mui-disabled": {
							color: themeMapping.palette.deprecated.secondary.text.w50
						}
					}
				}
			},
			MuiFormLabel: {
				styleOverrides: {
					asterisk: {
						color: themeMapping.palette.brand.wMain
					},
					root: {
						color: themeMapping.palette.secondary.text.wMain,
						fontSize: "14px",
						fontWeight: 400,
						lineHeight: 1.5,
						"&.Mui-error": {
							color: themeMapping.palette.deprecated.secondary.text.wMain
						},
						"&.light-sub-text": {
							color: themeMapping.palette.deprecated.secondary.text.w50
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
							color: themeMapping.palette.deprecated.secondary.text.w50
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
							border: `solid 1px ${themeMapping.palette.secondary.w40}`,
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
								border: `solid 1px ${themeMapping.palette.secondary.text.w50}`
							},
							"&.MuiOutlinedInput-root": {
								".MuiOutlinedInput-notchedOutline": {
									border: "none"
								}
							}
						},
						"&.Mui-focused": {
							".MuiOutlinedInput-input": {
								border: `solid 1px ${themeMapping.palette.brand.w30}`
							},
							"&.MuiOutlinedInput-root": {
								".MuiOutlinedInput-notchedOutline": {
									border: "none"
								}
							}
						},
						".Mui-disabled.MuiOutlinedInput-input, &:hover .Mui-disabled.MuiOutlinedInput-input": {
							backgroundColor: themeMapping.palette.background.w20,
							padding: "8px",
							border: `solid 1px ${themeMapping.palette.secondary.w10}`
						},
						"&.Mui-disabled .MuiOutlinedInput-input:read-only.Mui-disabled + .MuiOutlinedInput-notchedOutline": {
							border: "none"
						},
						".MuiInputBase-inputMultiline": {
							backgroundColor: themeMapping.palette.background.w10
						}
					}
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
									border: `solid 1px ${themeMapping.palette.secondary.text.w50}`,
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
									padding: "0px"
								}
							},
							"&.emptySelect, .MuiOutlinedInput-root.readOnlySelect.Mui-focused": {
								".MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
									color: themeMapping.palette.secondary.text.w50
								}
							},
							"&.Mui-focused": {
								".MuiOutlinedInput-notchedOutline": {
									border: `solid 1px ${themeMapping.palette.brand.w30}`
								}
							},
							"&.Mui-error": {
								".MuiOutlinedInput-notchedOutline, .MuiInputBase-inputMultiline": {
									borderColor: `${themeMapping.palette.error.wMain}`
								}
							},
							"&.Mui-disabled": {
								backgroundColor: themeMapping.palette.background.w20,
								".MuiOutlinedInput-notchedOutline": {
									border: `solid 1px ${themeMapping.palette.secondary.w10}`
								},
								".MuiOutlinedInput-input:read-only + .MuiOutlinedInput-notchedOutline": {
									border: `solid 1px ${themeMapping.palette.secondary.w10}`
								},
								input: {
									WebkitTextFillColor: themeMapping.palette.secondary.text.w50,
									color: themeMapping.palette.secondary.text.w50,
									padding: "8px"
								}
							}
						},
						".MuiOutlinedInput-input": {
							fontSize: BASE_FONT_PX_SIZES.sm,
							color: themeMapping.palette.primary.text.wMain,
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
							fill: themeMapping.palette.brand.w30
						},
						"&.Mui-disabled .MuiSvgIcon-root path": {
							fillOpacity: "0.35"
						},
						".MuiSvgIcon-root line": {
							stroke: themeMapping.palette.brand.w30
						},
						"&.Mui-disabled .MuiSvgIcon-root": {
							rect: {
								fillOpacity: 0.35,
								fill: "white",
								stroke: themeMapping.palette.secondary.w10,
								strokeOpacity: 1
							},
							path: {
								fillOpacity: 0.35
							}
						},
						"+.MuiFormLabel-root": {
							marginLeft: "16px",
							color: themeMapping.palette.secondary.text.wMain,
							"&.Mui-disabled": {
								color: themeMapping.palette.secondary.text.w50
							}
						},
						"&.readOnly .MuiSvgIcon-root": {
							".SolaceCheckboxContainer": {
								fill: themeMapping.palette.background.w20,
								stroke: themeMapping.palette.secondary.w40,
								strokeOpacity: 1
							},
							".SolaceCheckboxCheckmark": {
								fill: themeMapping.palette.secondary.text.w50,
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
								fill: themeMapping.palette.brand.w30
							}
						},
						"&.Mui-disabled .MuiSvgIcon-root": {
							".SolaceRadioContainer": {
								stroke: themeMapping.palette.secondary.w10,
								strokeOpacity: 1
							},
							".SolaceRadioSelection": {
								opacity: 0.35
							}
						},
						"&.readOnly .MuiSvgIcon-root": {
							".SolaceRadioContainer": {
								fill: themeMapping.palette.background.w20,
								stroke: themeMapping.palette.secondary.w40,
								opacity: 1
							},
							".SolaceRadioSelection": {
								fill: themeMapping.palette.secondary.text.w50,
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
							boxShadow: `0px 1px 4px ${themeMapping.palette.secondary.w40}`,

							".MuiMenuItem-root": {
								display: "flex",
								padding: "0px 16px 0px 16px",
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

								"&.Mui-selected": {
									backgroundColor: themeMapping.palette.brand.w10
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
									color: themeMapping.palette.primary.text.wMain,
									".subtext": {
										color: themeMapping.palette.deprecated.secondary.text.w50,
										marginRight: "24px",
										width: "100%"
									},
									".supplementalText": {
										fontSize: BASE_FONT_PX_SIZES.xs,
										color: themeMapping.palette.deprecated.secondary.text.w50,
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
							color: themeMapping.palette.deprecated.secondary.text.w50,
							fontSize: BASE_FONT_PX_SIZES.sm,
							fontWeight: 400,
							height: "32px",
							display: "flex",
							alignItems: "center",
							"&.categoryHeader": {
								color: themeMapping.palette.primary.text.wMain,
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
							color: themeMapping.palette.deprecated.secondary.text.w50
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
							fill: themeMapping.palette.secondary.wMain
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
								fill: themeMapping.palette.deprecated.secondary.wMain
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
							backgroundColor: themeMapping.palette.secondary.w10
						},
						".MuiAutocomplete-listbox .MuiAutocomplete-option[aria-selected='true']": {
							backgroundColor: themeMapping.palette.brand.w10
						},
						".MuiAutocomplete-listbox .MuiAutocomplete-option[aria-selected='true'].Mui-focused": {
							backgroundColor: themeMapping.palette.brand.w10
						},
						boxShadow: `0px 1px 4px ${themeMapping.palette.secondary.w40}`,
						color: themeMapping.palette.primary.text.wMain,
						".subtext": {
							color: themeMapping.palette.deprecated.secondary.text.w50
						},
						".supplementalText": {
							fontSize: BASE_FONT_PX_SIZES.xs,
							color: themeMapping.palette.deprecated.secondary.wMain
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
									backgroundColor: themeMapping.palette.primary.w40,
									opacity: 1
								},
								"&.Mui-disabled + .MuiSwitch-track": {
									backgroundColor: themeMapping.palette.secondary.w10,
									opacity: 1
								},
								"&.Mui-disabled .MuiSwitch-thumb": {
									backgroundColor: themeMapping.palette.background.w20,
									borderColor: themeMapping.palette.secondary.w10
								},
								"&:hover": {
									// TODO: change to brand.wMain 30% for new theme
									backgroundColor: themeMapping.palette.primary.w40
								}
							},
							".MuiSwitch-thumb": {
								width: "16px",
								height: "16px",
								border: `solid 2px ${themeMapping.palette.primary.w40}`,
								boxShadow: "none"
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
							backgroundColor: themeMapping.palette.secondary.text.w50
						},
						".MuiPaper-root": {
							minWidth: "400px",
							maxHeight: "80%",
							boxShadow: `0px 2px 8px ${alpha("#000000", 0.3)}`, // TODO: theme
							padding: "24px",
							".MuiDialogTitle-root": {
								fontSize: BASE_FONT_PX_SIZES.xl,
								color: themeMapping.palette.primary.text.wMain,
								padding: "0px 0px 24px 0px"
							},
							".MuiDialogContent-root": {
								fontSize: BASE_FONT_PX_SIZES.sm,
								lineHeight: `${BASE_FONT_PX_SIZES.lg}px`,
								color: themeMapping.palette.primary.text.wMain,
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
								backgroundColor: themeMapping.palette.brand.wMain
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
									themeMapping.palette.brand.w10
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
						backgroundColor: themeMapping.palette.secondary.w10
					},
					clickable: {
						"&:hover": {
							backgroundColor: themeMapping.palette.secondary.w40
						}
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
						"&.Mui-selected, :hover": {
							color: themeMapping.palette.primary.text.wMain
						}
					}
				}
			},
			MuiTabs: {
				styleOverrides: {
					root: {
						a: {
							color: themeMapping.palette.deprecated.secondary.text.wMain
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
							color: themeMapping.palette.brand.wMain,
							fontSize: BASE_FONT_PX_SIZES.md
						},
						".MuiButtonBase-root.MuiPaginationItem-root:hover": {
							background: "none"
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
						color: alpha("#FFFFFF", 0.9), // TODO: theme
						boxShadow: "0 2px 2px rgba(0,0,0,0.12)", // TODO: theme
						"&.htmlContent": {
							padding: "12px 16px",
							fontSize: BASE_FONT_PX_SIZES.sm,
							lineHeight: "21px",
							backgroundColor: themeMapping.palette.background.w10,
							color: themeMapping.palette.primary.text.wMain,
							boxShadow: "0 2px 5px rgba(0,0,0,0.15)" // TODO: theme
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
							boxShadow: `0px 2px 5px ${alpha("#000000", 0.15)}`, // TODO: theme
							cursor: "pointer"
						}
					}
				}
			},
			MuiAccordion: {
				styleOverrides: {
					root: {
						border: `1px solid ${themeMapping.palette.secondary.w10}`,
						boxShadow: "none",
						"&:not(:last-child)": {
							borderBottom: 0
						},
						"&:before": {
							display: "none"
						},
						"&.indicator-info": {
							background: `linear-gradient(${themeMapping.palette.info.w100} , ${themeMapping.palette.info.w100}) left/3px 90% no-repeat`
						},
						"&.indicator-error": {
							background: `linear-gradient(${themeMapping.palette.error.w100} , ${themeMapping.palette.error.w100}) left/3px 90% no-repeat`
						},
						"&.indicator-warn": {
							background: `linear-gradient(${themeMapping.palette.warning.w100} , ${themeMapping.palette.warning.w100}) left/3px 90% no-repeat`
						},
						"&.indicator-success": {
							background: `linear-gradient(${themeMapping.palette.success.w100} , ${themeMapping.palette.success.w100}) left/3px 90% no-repeat`
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
								backgroundColor: themeMapping.palette.secondary.w10
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
							fill: themeMapping.palette.deprecated.secondary.wMain,
							":hover": {
								fill: themeMapping.palette.secondary.wMain
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
					color: themeMapping.palette.error.w100,
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
						color: themeMapping.palette.deprecated.secondary.text.wMain,
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
						// TODO: the color will be #015B82 40% in the theme
						backgroundColor: "rgba(0, 0, 0, 0.35)",
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
						width: "95%",
						height: "auto",
						minWidth: "1000px",
						minHeight: "800px",
						top: "50%",
						left: "50%",
						transform: "translate(-50%,-50%)",
						".CodeMirror": {
							minHeight: "800px"
						}
					}
				},
				EditorWrapper: {
					"&.codeEditor-border": {
						border: `solid 1px ${themeMapping.palette.secondary.w40}`
					}
				},
				IconWrapper: {
					boxShadow: `0px 1px 4px ${themeMapping.palette.secondary.w40}`,
					borderRadius: "5px",
					backgroundColor: themeMapping.palette.background.w10,
					// position is relative to its parent with position: relative
					position: "absolute",
					top: 16,
					right: 24,
					// the z-index of the buttons should be higher than the z-index of the CodeMirror, which is 9
					zIndex: 20
				}
			},
			/** SolaceMessageBox component */
			component_MessageBox: {
				container: {
					height: "100%",
					borderRadius: "2px",
					"&.info": {
						backgroundColor: themeMapping.palette.info.w10,
						borderLeft: `3px solid ${themeMapping.palette.info.w100}`
					},
					"&.error": {
						backgroundColor: themeMapping.palette.error.w10,
						borderLeft: `3px solid ${themeMapping.palette.error.w100}`
					},
					"&.warn": {
						backgroundColor: themeMapping.palette.warning.w10,
						borderLeft: `3px solid ${themeMapping.palette.warning.w100}`
					},
					"&.success": {
						backgroundColor: themeMapping.palette.success.w10,
						borderLeft: `3px solid ${themeMapping.palette.success.w100}`
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
					color: themeMapping.palette.primary.text.wMain
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
					borderLeft: `1px solid ${themeMapping.palette.secondary.w10}`,
					borderTop: `1px solid ${themeMapping.palette.secondary.w10}`,
					borderRight: `1px solid ${themeMapping.palette.secondary.w10}`,
					boxShadow: `0px 2px 4px -1px ${themeMapping.palette.secondary.w40}`,
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
					minHeight: "32px",
					"&.headerRow": {
						height: "30px",
						fontWeight: "500",
						color: themeMapping.palette.deprecated.secondary.text.wMain,
						cursor: "auto",
						padding: "0px 24px",
						position: "sticky",
						top: 0,
						":hover": {
							background: "unset"
						},
						zIndex: 1
					},
					borderBottom: `1px solid ${themeMapping.palette.secondary.w10}`,
					cursor: "pointer",
					":last-child": {
						borderBottom: "none"
					},
					":hover": {
						background: themeMapping.palette.secondary.w20
					},
					":focus-visible": {
						background: themeMapping.palette.secondary.w20,
						outline: "none"
					},
					"&.selected": {
						background: themeMapping.palette.brand.w10,
						cursor: "default"
					}
				},
				list: {
					border: `1px solid ${themeMapping.palette.secondary.w10}`,
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
			text: {
				/** @deprecated */
				primary: themeMapping.palette.primary.text.wMain,
				/** @deprecated */
				secondary: themeMapping.palette.secondary.text.wMain,
				/** @deprecated */
				disabled: themeMapping.palette.secondary.text.w50
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
