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

import { alpha } from "@mui/system";
import { ThemeMapping } from "../../types/ThemeMapping";

/**
 * Base ThemeMapping for the Solace palette
 * TODO: replace with new palette at maas-react-components/src/theming/solace/themeMapping.ts
 */
export const baseThemeMapping: ThemeMapping = {
	palette: {
		brand: {
			wMain: "#00AD93",
			wMain30: alpha("#00AD93", 0.35),
			w30: "#00C895",
			w10: "#e8f9f4",
			w60: "#66DEBF",
			w100: "#009193"
		},

		primary: {
			w100: "#05BDA1",
			w90: "#00CCAD",
			wMain: "#00AD93",
			w60: alpha("#00AD93", 0.35),
			w40: alpha("#00AD93", 0.35),
			w20: "#F9F9F9",
			w10: alpha("#000000", 0.05),

			text: {
				w100: "#000000",
				wMain: alpha("#000000", 0.8),
				w10: "#FFFFFF"
			}
		},

		secondary: {
			w80: alpha("#000000", 0.5),
			w70: alpha("#000000", 0.35),
			w8040: alpha("#000000", 0.35),
			w100: "#000000",
			wMain: alpha("#000000", 0.5),
			w40: alpha("#000000", 0.2),
			w20: alpha("#000000", 0.1),
			w10: alpha("#000000", 0.05),

			text: {
				wMain: alpha("#000000", 0.65),
				w50: alpha("#000000", 0.35)
			}
		},

		background: {
			w100: "",
			wMain: "#3f3f3f",
			w20: "#F9F9F9",
			w10: "#FFFFFF"
		},

		info: {
			w100: "#0079FF",
			wMain: "#0079FF",
			w70: "",
			w30: "",
			w20: "",
			w10: "#E6F2FF"
		},

		error: {
			w100: "#C33135",
			wMain: "#D0021B",
			w70: "",
			w30: alpha("#C33135", 0.15),
			w20: alpha("#C33135", 0.2),
			w10: "#FAE6E8"
		},

		warning: {
			w100: "#F3AA24",
			wMain: "#F3AA24",
			w70: "",
			w30: "",
			w20: "",
			w10: "#FEF7E9"
		},

		success: {
			w100: "#00AD93",
			wMain: "#7ED321",
			w70: "",
			w30: "",
			w20: "",
			w10: alpha("#53AE0F", 0.1)
		},

		stateLayer: {
			w10: alpha("#03223B", 0.1),
			w20: alpha("#03223B", 0.2)
		},

		accent: {
			n0: {
				w100: "#2F51AD",
				wMain: "#3C69E1",
				w30: "#C5D2F6",
				w10: "#ECF0FC"
			},
			n1: {
				w100: "#1F284C",
				wMain: "#3A4880",
				w30: "#C4C8D9",
				w60: "#8991B3",
				w20: "#D8DAE6",
				w10: "#EBEDF2"
			},
			n2: {
				w100: "#165E64",
				wMain: "#00AD93",
				w30: "#B3DEDF",
				w20: "#CCE9E9",
				w10: alpha("#009193", 0.1)
			},
			n3: {
				w100: "#542D75",
				wMain: "#7841A8",
				w30: "#D7C6E5",
				w10: "#F2ECF6"
			},
			n4: {
				w100: "#951379",
				wMain: "#CB1AA5",
				w30: "#F2C4E8"
			},
			n5: {
				w100: "#D03C1B",
				wMain: "#E67E22",
				w30: "#FCCEC7",
				w60: "#FAA397"
			},
			n6: {
				w100: "#DE7E00",
				wMain: "#FCA829",
				w30: "#FEE5BF"
			},
			n7: {
				w100: "#2DADE1",
				wMain: "#7CD3F6",
				w30: "#CBEDFB"
			},
			n8: {
				w100: "#4F5A63",
				wMain: "#6A6A6A",
				w30: "#DBDFE2"
			},
			n9: {
				wMain: "#DA162D"
			}
		},

		learning: {
			wMain: "#033A6F",
			w90: "#022E59",
			w100: "#022343",
			w20: "#CDD8E2",
			w10: "#E6EBF1"
		},

		deprecated: {
			primary: {
				wMain: alpha("#000000", 0.8),
				w20: alpha("#000000", 0.1),
				text: {
					wMain: "#00AD93",
					w10: alpha("#FFFFFF", 0.9)
				}
			},
			secondary: {
				w80: alpha("#000000", 0.8),
				w8040: alpha("#000000", 0.2),
				wMain: alpha("#000000", 0.35),
				w20: alpha("#000000", 0.05),
				w10: alpha("#000000", 0.05),
				w30: alpha("#FFFFFF", 0.7),
				text: {
					wMain: alpha("#000000", 0.55),
					w50: alpha("#000000", 0.55)
				}
			},
			accent: {
				n2: {
					wMain: "#00C895"
				}
			},
			// new chip colours are TBD in UX
			chip: {
				royalBlue: "#3A4880",
				darkBlue: "#273749",
				opaqueBlue: "rgba(58, 72, 128, 0.5)",
				infoBlue: "#0079FF",
				infoBgBlue: alpha("#0079FF", 0.1),
				warnYellow: "#F3AA24",
				warnBgYellow: alpha("#F3AA24", 0.1),
				lightGrey: "#EBEDF2",
				smokeGrey: "#DBDFE2",
				darkGrey: alpha("#000", 0.8),
				white: "#FFF",
				fill: "rgba(0, 0, 0, 0.1)",
				hover: "rgba(0, 0, 0, 0.2)",
				infoLightBgBlue: "#E0F5FD",
				errorBgRed: "#FDEDED",
				successBgGreen: "#DDF2EF",
				infoLightLabelBlue: "#2C75B7",
				errorLabel: "#C33135",
				successLabel: "#006B53"
			}
		}
	},

	/**
	 * @deprecated This scheme is deprecated and will be removed when no longer used.
	 */
	pallete: {
		error: "#C33135",
		greyBackgroundLight: "#f9f9f9",
		info: "#0079ff",
		primary: "#00ad93",
		secondary: "#00ccad",
		success: "#7ed321",
		text: alpha("#000000", 0.8),
		labelText: alpha("#000000", 0.65),
		textSecondary: alpha("#000000", 0.55),
		warning: "#f3aa24",
		white: "#FFFFFF",

		//toasts
		toastText: "#FFFFFF",
		toastBackground: "#474747",
		toastSuccessIcon: "#94EAD4",

		//chips
		nonadminPill: alpha("#000000", 0.1),
		adminPill: alpha("#000000", 0.35),

		//Button - these seem more inconsistent with others, can other variations be used?
		buttonTextHoverBG: alpha("#000000", 0.05),
		buttonOutlinedHoverBG: "#f4f5f5",
		buttonLinkDisabled: alpha("#000000", 0.2),
		buttonIconBG: "EEEEEE"
	}
};
