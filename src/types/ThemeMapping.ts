/**
 * The colour palette for Solace theming
 */
export type ThemeMappingPalette = {
	brand: {
		wMain: string;
		wMain30: string;
		w30: string;
		w10: string;
	};

	primary: {
		w100: string;
		w90: string;
		wMain: string;
		wMain40: string; // for overlays, needs opacity
		w60: string;
		w40: string;
		w20: string;
		w10: string;

		text: {
			wMain: string;
			w10: string;
		};
	};

	secondary: {
		w80: string;
		wMain: string;
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

	accent: {
		n0: {
			w100: string;
			wMain: string;
			w30: string;
			w10: string;
		};
		n1: {
			wMain: string;
			w60: string;
			w10: string;
		};
		n2: {
			w100: string;
			wMain: string;
			w30: string;
			w10: string;
		};
		n3: {
			w100: string;
			wMain: string;
			w30: string;
			w10: string;
		};
		n4: {
			wMain: string;
		};
		n5: {
			wMain: string;
		};
		n6: {
			wMain: string;
			w30: string;
		};
		n7: {
			wMain: string;
		};
		n8: {
			wMain: string;
			w30: string;
		};
	};

	deprecated: {
		// The primary, secondary and accent sections are for variations in colour that appear in the current Solace theme, but
		// can be removed once the new theme is adopted. To do so, delete these two sections from all the theme mappings
		// and remove the "deprecated" term from any usages. E.g. ux.deprecated.background.wMain => ux.background.wMain
		primary: {
			wMain: string;
			w20: string;
			text: {
				w10: string;
			};
		};
		secondary: {
			w80: string;
			wMain: string;
			w20: string;
			w10: string;
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
			white: string;
			fill: string;
			hover: string;
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
