/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { grey, red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createTheme({
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
				disableRipple: true
			},
			styleOverrides: {
				contained: {
					"&:disabled": {
						color: "#fff"
					}
				},

				outlinedPrimary: {
					"&:hover": {
						backgroundColor: grey[50]
					}
				},
				root: {
					textTransform: "none"
				},
				textPrimary: {
					"&:hover": {
						backgroundColor: grey[100]
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
				colorPrimary: {
					"&:hover": {
						backgroundColor: grey[100]
					}
				},
				root: {
					"&:hover": {
						borderRadius: "4px"
					},
					borderRadius: "4px"
				}
			}
		},

		MuiInputLabel: {
			styleOverrides: {
				asterisk: {
					color: "#00AD93"
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
					"&[disabled]": {
						color: grey[500]
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
			contrastText: "#fff",
			dark: "#00CCAD",
			main: "#00AD93"
		},
		secondary: {
			contrastText: "#fff",
			main: "#00CCAD"
		},
		text: {
			primary: "rgba(0, 0, 0, 0.8)"
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
});

export default theme;

declare module "@material-ui/core/styles" {
	interface TypographyVariants {
		one33rem: React.CSSProperties;
	}
	interface BreakpointOverrides {
		solaceMd: true;
	}

	// allow configuration using `createTheme`
	interface TypographyVariantsOptions {
		one33rem?: React.CSSProperties;
	}
}

// Update the Typography's variant prop options
declare module "@material-ui/core/Typography" {
	interface TypographyPropsVariantOverrides {
		one33rem: true;
	}
}
