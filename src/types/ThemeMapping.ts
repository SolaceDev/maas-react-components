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

/**
 * The colour palette for Solace theming
 */
export type ThemeMappingPalette = {
	brand: {
		wMain: string;
		wMain30: string;
		w30: string;
		w10: string;
		w60: string;
		w100: string;
	};

	primary: {
		w100: string;
		w90: string;
		wMain: string;
		w60: string;
		w40: string;
		w20: string;
		w10: string;

		text: {
			wMain: string;
			w100: string;
			w10: string;
		};
	};

	secondary: {
		w70: string;
		w80: string;
		w8040: string; // 40% of w80 for overlays and box-shadows
		wMain: string;
		w100: string;
		w40: string;
		w20: string;
		w10: string;

		text: {
			wMain: string;
			w50: string;
		};
	};

	background: {
		w100: string;
		wMain: string;
		w20: string;
		w10: string;
	};

	info: {
		w100: string;
		wMain: string;
		w70: string;
		w30: string;
		w20: string;
		w10: string;
	};

	error: {
		w100: string;
		wMain: string;
		w70: string;
		w30: string;
		w20: string;
		w10: string;
	};

	warning: {
		w100: string;
		wMain: string;
		w70: string;
		w30: string;
		w20: string;
		w10: string;
	};

	success: {
		w100: string;
		wMain: string;
		w70: string;
		w30: string;
		w20: string;
		w10: string;
	};

	stateLayer: {
		w10: string;
		w20: string;
	};

	accent: {
		n0: {
			w100: string;
			wMain: string;
			w30: string;
			w10: string;
		};
		n1: {
			w100: string;
			wMain: string;
			w60: string;
			w30: string;
			w20: string;
			w10: string;
		};
		n2: {
			w100: string;
			wMain: string;
			w30: string;
			w20: string;
			w10: string;
		};
		n3: {
			w100: string;
			wMain: string;
			w30: string;
			w10: string;
		};
		n4: {
			w100: string;
			wMain: string;
			w30: string;
		};
		n5: {
			w100: string;
			wMain: string;
			w60: string;
			w30: string;
		};
		n6: {
			w100: string;
			wMain: string;
			w30: string;
		};
		n7: {
			w100: string;
			wMain: string;
			w30: string;
		};
		n8: {
			w100: string;
			wMain: string;
			w30: string;
		};
		n9: {
			wMain: string;
		};
	};

	learning: {
		wMain: string;
		w100: string;
		w90: string;
		w20: string;
		w10: string;
	};

	deprecated: {
		// The primary, secondary and accent sections are for variations in colour that appear in the current Solace theme, but
		// can be removed once the new theme is adopted. To do so, delete these two sections from all the theme mappings
		// and remove the "deprecated" term from any usages. E.g. ux.deprecated.background.wMain => ux.background.wMain
		primary: {
			wMain: string;
			w20: string;
			text: {
				wMain: string;
				w10: string;
			};
		};
		secondary: {
			w80: string;
			w8040: string;
			wMain: string;
			w20: string;
			w10: string;
			w30: string;
			text: {
				wMain: string;
				w50: string;
			};
		};
		accent: {
			n2: {
				wMain: string;
			};
		};

		// New chip colours are TBD in UX and should be added with new keys above once complete
		chip: {
			royalBlue: string;
			darkBlue: string;
			opaqueBlue: string;
			infoBlue: string;
			infoBgBlue: string;
			warnYellow: string;
			warnBgYellow: string;
			lightGrey: string;
			smokeGrey: string;
			darkGrey: string;
			white: string;
			fill: string;
			hover: string;
			infoLightBgBlue: string;
			errorBgRed: string;
			successBgGreen: string;
			infoLightLabelBlue: string;
			errorLabel: string;
			successLabel: string;
		};
	};
};

export type ThemeMapping = {
	palette: ThemeMappingPalette;

	/**
	 * @deprecated This scheme is deprecated and will be removed when no longer used.
	 */
	pallete: {
		adminPill: string;
		buttonIconBG: string;
		buttonLinkDisabled: string;
		buttonOutlinedHoverBG: string;
		buttonTextHoverBG: string;
		error: string;
		greyBackgroundLight: string;
		info: string;
		nonadminPill: string;
		primary: string;
		secondary: string;
		success: string;
		text: string;
		labelText: string;
		textSecondary: string;
		toastText: string;
		toastBackground: string;
		toastSuccessIcon: string;
		warning: string;
		white: string;
	};
};
