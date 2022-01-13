import { ThemeOptions } from "@material-ui/core";
import { SupportedThemes } from "../types";
// import getThemeMappings from "../theming/themeUtils";
import { BASE_COLORS, getRGBA } from "./colorPallette";
import { BASE_FONT_PX_SIZES } from "./typography";

const noneImportant = "none !important";
const tooltipPlacementMargin = "14px !important";

// These colorMappings would replace hardcoded colors in the theme specified below.
// https://sol-jira.atlassian.net/wiki/spaces/MAASB/pages/2702704723/How+to+add+theming+in+maas-ui#React:
// this eslint tag can be removed once we start using themeMappings.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getTheme = (_themeName: SupportedThemes) => {
	// const themeMappings = getThemeMappings(themeName);
	// console.log(themeMappings);
	return themeConfig;
};

// A custom theme for this app
const themeConfig: ThemeOptions = {
	breakpoints: {
		values: {
			// desktop
			lg: 1200,

			// small laptop
			md: 900,

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
						// example: Theme usage will change this to backgroundColor: themeMappings.hoverBG
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
					"&:disabled": {
						color: BASE_COLORS.greys.grey3
					},
					"&:hover": {
						backgroundColor: BASE_COLORS.greys.grey1
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
					margin: "0px",
					// re-position the Solace Dropdown icon inside Select input element
					".MuiOutlinedInput-root.MuiSelect-root": {
						".MuiSvgIcon-root": {
							position: "absolute",
							top: "12px",
							right: "0",
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
							backgroundColor: "transparent" // apply transparent bg color in readonly state
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
						color: BASE_COLORS.greys.grey3
					},
					"&:hover": {
						backgroundColor: BASE_COLORS.greys.grey2,
						color: BASE_COLORS.greys.grey14
					},
					"&:active": {
						backgroundColor: BASE_COLORS.greys.grey1
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
					color: BASE_COLORS.greens.green2
				},
				root: {
					color: BASE_COLORS.greys.grey14,
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
					color: BASE_COLORS.greens.green2
				},
				root: {
					color: BASE_COLORS.greys.grey14,
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
					"&[disabled]": {
						color: BASE_COLORS.greys.grey3
					},
					".SolaceOpenExternalIcon": {
						width: "16px",
						height: "16px",
						fill: "#00ad93",
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
						marginRight: "20px",
						display: "inline-table", // this ensures helper text is below textarea
						minWidth: "354px",
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
						padding: "8px"
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
								WebkitTextFillColor: BASE_COLORS.greys.grey5,
								color: BASE_COLORS.greys.grey5,
								padding: "8px"
							}
						}
					},
					".MuiOutlinedInput-input": {
						fontSize: BASE_FONT_PX_SIZES.sm,
						color: BASE_COLORS.greys.grey14,
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
						fill: BASE_COLORS.greens.green1
					},
					"&.Mui-disabled .MuiSvgIcon-root path": {
						fillOpacity: "0.35",
						fill: "white"
					},
					".MuiSvgIcon-root line": {
						stroke: BASE_COLORS.greens.green1
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
						color: BASE_COLORS.greys.grey14,
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
						minWidth: "330px"
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
					".MuiPaper-root": {
						overflowY: "auto",
						boxShadow: `0px 1px 4px ${BASE_COLORS.greys.grey3}`,
						margin: "4px",

						".MuiMenuItem-root": {
							display: "flex",
							padding: "0px 16px 0px 16px",
							fontSize: "14px",
							minHeight: "38px",
							alignItems: "center",
							whiteSpace: "normal",
							maxWidth: "320px",
							"&:hover": {
								backgroundColor: BASE_COLORS.greys.grey2
							},
							"&.multiline": {
								height: "58px"
							},
							"&.wideMenu": {
								minWidth: "320px"
							},

							"&.Mui-selected": {
								backgroundColor: BASE_COLORS.greens.green9
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
								color: BASE_COLORS.greys.grey14,
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
							color: BASE_COLORS.greys.grey14,
							fontSize: BASE_FONT_PX_SIZES.xs,
							fontWeight: 500
						}
					},
					".MuiListItemText-multiline": {
						height: "58px",
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
					},
					".MuiButtonBase-root.MuiIconButton-root.MuiAutocomplete-popupIndicator:hover": {
						background: "transparent"
					},
					".MuiButtonBase-root.MuiIconButton-root.MuiAutocomplete-clearIndicator .MuiSvgIcon-root:hover": {
						fill: BASE_COLORS.greys.grey14
					}
				},
				popper: {
					".MuiAutocomplete-listbox .MuiAutocomplete-option[aria-selected='false'].Mui-focused ": {
						backgroundColor: BASE_COLORS.greys.grey2
					},
					".MuiAutocomplete-listbox .MuiAutocomplete-option[aria-selected='true'].Mui-focused ": {
						backgroundColor: getRGBA(BASE_COLORS.greens.green1_rgb, 0.1)
					},
					boxShadow: `0px 1px 4px ${BASE_COLORS.greys.grey3}`,
					color: BASE_COLORS.greys.grey14,
					".subtext": {
						color: BASE_COLORS.greys.grey9
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
								backgroundColor: getRGBA(BASE_COLORS.greens.green2_rgb, 0.35),
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
								backgroundColor: getRGBA(BASE_COLORS.greens.green2_rgb, 0.35)
							}
						},
						".MuiSwitch-thumb": {
							width: "16px",
							height: "16px",
							border: `solid 2px ${getRGBA(BASE_COLORS.greens.green2_rgb, 0.35)}`,
							boxShadow: "none"
						}
					},
					".MuiSwitch-track": {
						height: "12px",
						width: "36px",
						transform: "translateY(1px)",
						backgroundColor: getRGBA(BASE_COLORS.greens.green2_rgb, 0.35),
						opacity: 1
					}
				},
				switchBase: {
					"&.MuiChecked .MuiSwitch-track": {
						height: "12px",
						transform: "translateY(1px)",
						backgroundColor: getRGBA(BASE_COLORS.greens.green2_rgb, 0.35),
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
							lineHeight: `${BASE_FONT_PX_SIZES.lg}px`,
							color: BASE_COLORS.greys.grey14,
							padding: "0px",
							".MuiBox-root": {
								display: "grid"
							}
						},
						".MuiDialogActions-root": {
							padding: "24px 0px 0px 0px",
							"& > :not(:nth-of-type(1))": {
								marginLeft: "16px"
							}
						}
					}
				}
			}
		},
		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: "40px",
					"& .MuiChip-label": {
						fontSize: BASE_FONT_PX_SIZES.sm
					}
				},
				filled: {
					backgroundColor: BASE_COLORS.greys.grey2
				}
			}
		},
		MuiTab: {
			styleOverrides: {
				root: {
					textTransform: "none",
					fontWeight: 400,
					"&.Mui-selected, :hover": {
						color: BASE_COLORS.greys.grey14
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
						color: BASE_COLORS.greens.green2,
						fontSize: BASE_FONT_PX_SIZES.md
					},
					".MuiButtonBase-root.MuiPaginationItem-root:hover": {
						background: "none"
					},
					".MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
						background: "none",
						color: BASE_COLORS.greys.grey14
					}
				}
			}
		},
		MuiTooltip: {
			styleOverrides: {
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
						color: BASE_COLORS.greys.grey14,
						boxShadow: "0 2px 5px rgba(0,0,0,0.15)"
					},
					"&.mediumWidth": {
						maxWidth: "500px"
					},
					"&.fullWidth": {
						maxWidth: "100%"
					},
					"&.MuiTooltip-tooltipPlacementRight": {
						marginLeft: tooltipPlacementMargin
					},
					"&.MuiTooltip-tooltipPlacementLeft": {
						marginRight: tooltipPlacementMargin
					},
					"&.MuiTooltip-tooltipPlacementTop": {
						marginBottom: tooltipPlacementMargin
					},
					"&.MuiTooltip-tooltipPlacementBottom": {
						marginTop: tooltipPlacementMargin
					}
				}
			}
		}
	},
	mixins: {
		/** SolaceSidePanelLayout Component */
		sidePanelLayout: {
			wrapper: {
				height: "100%",
				width: "100%",
				padding: "0px",
				display: "grid",
				backgroundColor: BASE_COLORS.whites.white1,
				overflowY: "auto"
			},
			content: {
				display: "flex",
				height: "100%",
				overflowY: "auto",
				flexDirection: "column",
				alignItems: "left",
				padding: "0px"
			},
			left: {
				height: "100%",
				overflowY: "auto",
				borderRight: `1px solid ${BASE_COLORS.greys.grey2}`
			},
			right: {
				height: "100%",
				overflowY: "auto",
				borderLeft: `1px solid ${BASE_COLORS.greys.grey2}`
			}
		},
		/** ErrorText for form components */
		formComponent_ErrorText: {
			container: {
				display: "flex",
				flexDirection: "row",
				justifyContent: "flex-start",
				marginTop: "2px"
			},
			label: {
				color: BASE_COLORS.reds.red1,
				fontSize: BASE_FONT_PX_SIZES.xs,
				marginLeft: "8px"
			}
		},
		/** Attribute Value Pair (AVP) for form components */
		formComponent_AVPItem: {
			container: {
				display: "grid",
				gridTemplateColumns: "32px 1fr 8px 1fr 32px",
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
				gridTemplateColumns: "32px 1fr 8px 1fr 32px",
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
			contrastText: BASE_COLORS.greys.grey0,
			dark: BASE_COLORS.greens.green5,
			main: BASE_COLORS.greens.green2
		},
		secondary: {
			contrastText: BASE_COLORS.greys.grey0,
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

declare module "@material-ui/core/styles/createMixins" {
	interface Mixins {
		sidePanelLayout: {
			wrapper: CSSProperties;
			content: CSSProperties;
			left: CSSProperties;
			right: CSSProperties;
		};
		formComponent_ErrorText: {
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
	}
}
export default getTheme;
