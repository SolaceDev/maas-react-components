export type ThemeMapping = {
	palette: {
		action: {
			disabled: string;
			variation1: {
				default: string;
				active: string;
				hover: string;
			};
			variation2: {
				default: string;
				active: string;
				hover: string;
			};
			variation3: {
				default: string;
				active: string;
				hover: string;
			};
			variation4: {
				default: string;
				active: string;
				hover: string;
			};
		};

		brand: {
			// TODO: can we do better here? too many variations?
			brand1: string;
			brand2: string;
			brand3: string;
			brand4: string;
			brand5: string;
			active1: string;
			active2: string;
		};

		container: {
			default: string;
			contrast: string;
			overlay: string;
		};

		neutral: {
			default: string;
			contrast: string; // white?
		};

		text: {
			disabled: string;
			primary: {
				default: string;
				contrast: string;
				label: string;
			};
			secondary: {
				default: string;
				contrast: string;
			};
		};

		semantic: {
			// TODO: Once format is confirmed, add warn, info and success
			error: {
				variation1: {
					default: string;
					background: string;
				};
				variation2: {
					default: string;
				};
				variation3: {
					default: string;
				};
			};
		};

		graph: {
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
