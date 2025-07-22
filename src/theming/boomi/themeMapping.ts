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

import { alpha } from "@mui/material";
import { ThemeMapping, ThemeMappingPalette } from "../../types/ThemeMapping";
import { baseThemeMapping } from "../base/themeMapping";

const palette: ThemeMappingPalette = {
	brand: {
		wMain: "#033D58",
		wMain30: alpha("#033D58", 0.3),
		w30: "#BDCBD1",
		w10: "#E6ECEE",
		w60: "#A9DFDA",
		w100: "#02293B"
	},

	primary: {
		w100: "#011B27",
		w90: "#02293B",
		wMain: "#033D58",
		w60: "#4D7689",
		w40: "#7091A0",
		w20: "#BDCBD1",
		w10: "#E6ECEE",

		text: {
			wMain: "#262626",
			w100: "#000000",
			w10: "#FFFFFF"
		}
	},

	secondary: {
		w70: "#404040",
		w80: "#404040",
		w8040: alpha("#404040", 0.4),
		w100: "#000",
		wMain: "#033D58",
		w40: "#CCC",
		w20: "#E5E5E5",
		w10: "#EDEDED",

		text: {
			wMain: "#707070",
			w50: "#cccccc"
		}
	},

	background: {
		w100: "#1A1A1A",
		wMain: "#262626",
		w20: "#F5F5F5",
		w10: "#ffffff"
	},

	info: {
		w100: "#1C4070",
		wMain: "#0357AC",
		w70: "#1B72C3",
		w30: "#3894DC",
		w20: "#67ABE1",
		w10: "#E6EEF7"
	},

	error: {
		w100: "#913345",
		wMain: "#C73D58",
		w70: "#FA4A6C",
		w30: "#FA8A98",
		w20: "#F8BEC3",
		w10: "#F8DFE1"
	},

	warning: {
		w100: "#7B4E23",
		wMain: "#A16123",
		w70: "#CF761B",
		w30: "#EC9932",
		w20: "#F4C57F",
		w10: "#F6EFE9"
	},

	success: {
		w100: "#226347",
		wMain: "#157F57",
		w70: "#0EA076",
		w30: "#71BF9D",
		w20: "#A3D8BE",
		w10: "#D5EADF"
	},

	stateLayer: {
		w10: alpha("#354A5F", 0.1),
		w20: alpha("#354A5F", 0.2)
	},

	accent: {
		n0: {
			w100: "#E5634D",
			wMain: "#FF7C66",
			w30: "#FFD8D1",
			w10: "#FFF2F0"
		},
		n1: {
			w100: "#8F4D8D",
			wMain: "#9E559C",
			w30: "#E9C4E3",
			w60: "#C76CB8",
			w20: "#F4E2F1",
			w10: "#F9F0F8"
		},
		n2: {
			w100: "#22626F",
			wMain: "#127B87",
			w30: "#A9DFDA",
			w20: "#CCEBE8",
			w10: "#EFF7F6"
		},
		n3: {
			w100: "#664E7C",
			wMain: "#8462A5",
			w30: "#CFC0DD",
			w10: "#F3EFF6"
		},
		n4: {
			w100: "#3E40B5",
			wMain: "#4B4FE2",
			w30: "#C7C8F5"
		},
		n5: {
			w100: "#B2301A",
			wMain: "#D94A3A",
			w30: "#FDD3D3",
			w60: "#F47874"
		},
		n6: {
			w100: "#EBA400",
			wMain: "#FCB900",
			w30: "#FEEAB3"
		},
		n7: {
			w100: "#F57594",
			wMain: "#F78DA7",
			w30: "#FABCCB"
		},
		n8: {
			w100: "#808080",
			wMain: "#969696",
			w30: "#E0E0E0"
		},
		n9: {
			wMain: "#C71739"
		}
	},

	learning: {
		wMain: "#033A6F",
		w90: "#022E59",
		w100: "#022343",
		w20: "#C5D8EA",
		w10: "#E9EFF6"
	},

	deprecated: {
		primary: {
			wMain: "#033D58",
			w20: "#BDCBD1",
			text: {
				wMain: "#262626",
				w10: "#FFFFFF"
			}
		},
		secondary: {
			w80: "#404040",
			w8040: alpha("#404040", 0.4),
			wMain: "#033D58",
			w20: "#E5E5E5",
			w10: "#EDEDED",
			w30: "#033D58",
			text: {
				wMain: "#707070",
				w50: "#cccccc"
			}
		},
		accent: {
			n2: {
				wMain: "#127B87"
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
};

/**
 * ThemeMapping for a new Solace palette
 */
export const boomiThemeMapping: ThemeMapping = {
	...baseThemeMapping, // for deprecated key support
	palette: palette
};
