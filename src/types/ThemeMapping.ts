export type ThemeMappingPalette = {
	// main brand colour
	brand: string;
	// selection
	brandHighlight: string;
	// strong/heavy selection
	brandHighlightHeavy: string;
	// brand icon
	brandIcon: string;

	action: {
		// eg. cta, link
		primary: {
			default: string;
			active: string;
			hover: string;
			disabled: string;
		};
		// eg. outline, text
		secondary: {
			default: string;
			active: string;
			hover: string;
			disabled: string;
		};
		// eg. icon background
		icon: {
			default: string;
			active: string;
			hover: string;
			disabled: string;
		};
	};

	background: {
		// eg. main, text fields, menus
		primary: {
			default: string;
			// eg. divider / border
			highlight: string;
		};
		// eg. nav bar, toast
		secondary: {
			default: string;
			// eg. divider
			highlight: string;
		};
	};

	neutral: {
		// eg. mixed (Secondary Primary)
		primary: {
			default: string;
		};
		// eg. mixed (Secondary 40)
		secondary: {
			default: string;
		};
		// eg. mixed (Secondary 20)
		tertiary: {
			default: string;
		};
		// eg. mixed, white
		constrast: string;
	};

	text: {
		// eg. mixed text
		primary: {
			default: string;
			disabled: string;
		};
		// eg. labels
		secondary: {
			default: string;
			disabled: string;
		};
		// eg. mixed, white
		contrast: string;
	};

	semantic: {
		error: {
			// eg. chip, banner
			primary: {
				default: string;
				background: string;
				active: string;
				hover: string;
			};
			// eg. textfield, dropdown
			secondary: {
				default: string;
			};
			// eg. toast icon
			tertiary: {
				default: string;
			};
		};
		warn: {
			// eg. banner
			primary: {
				default: string;
				background: string;
				active: string;
				hover: string;
			};
			// eg. textfield, dropdown icons and borders
			secondary: {
				default: string;
			};
			// eg. toast icon
			tertiary: {
				default: string;
			};
		};
		info: {
			// eg. badge, banner
			primary: {
				default: string;
				background: string;
				active: string;
				hover: string;
			};
			// eg. unused?
			secondary: {
				default: string;
			};
			// eg. toast
			tertiary: {
				default: string;
			};
		};
		success: {
			// eg. badge
			primary: {
				default: string;
				background: string;
			};
			// eg. unused?
			secondary: {
				default: string;
			};
			// eg. toast
			tertiary: {
				default: string;
			};
		};
	};

	graph: {
		path: {
			default: string;
			active: string;
			hover: string;
			disabled: string;
		};
		accent1: {
			default: string;
			contrast1: string;
			constrast2: string;
		};
		accent2: {
			default: string;
		};
		accent3: {
			default: string;
			contrast1: string;
			constrast2: string;
		};
		accent4: {
			default: string;
			contrast1: string;
			constrast2: string;
		};
		accent5: {
			default: string;
		};
		accent6: {
			default: string;
		};
		accent7: {
			default: string;
		};
		accent8: {
			default: string;
		};
		accent9: {
			default: string;
			contrast1: string;
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
