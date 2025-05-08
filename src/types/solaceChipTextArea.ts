import SolaceComponentProps from "../components/SolaceComponentProps";

export interface ChipData {
	id: string;
	label: string;
	isValid: boolean;
	errorMessage?: string;
}

export interface SolaceChipTextAreaChangeEvent {
	name: string;
	value: string;
	chips: ChipData[];
	allValues: string;
}

export interface SolaceChipTextAreaProps extends SolaceComponentProps {
	/**
	 * Unique identifier ... if `id` is not specified, `name` value will be used in order to make `label` and `helperText` accessible for screen readers
	 */
	id?: string;
	/**
	 * Name attribute to assign to the `input` element
	 */
	name: string;
	/**
	 * the label content to display on the screen
	 */
	label?: string | JSX.Element;
	/**
	 * The value of the `input` element, required for controlled component
	 */
	value?: string;
	/**
	 * Content to display as supportive/explanitory text
	 */
	helperText?: string | JSX.Element;
	/**
	 * The maximum number of characters which can be typed as the `input` value
	 */
	maxLength?: number;
	/**
	 * The text to display as the tooltip hint
	 */
	title?: string;
	/**
	 * Boolean flag to control whether the `input` element is focused during first mount
	 */
	autoFocus?: boolean;
	/**
	 * Boolean flag to mark the `input` in error state
	 */
	hasErrors?: boolean;
	/**
	 * Boolean flag used to display an indicator of whether or not this `input` is mandatory
	 */
	required?: boolean;
	/**
	 * Boolean flag to control whether to stack the label on top of the `input` element (false) or place them inline to one another (true)
	 */
	inlineLabel?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `input` is changed
	 */
	onChange?: (event: SolaceChipTextAreaChangeEvent) => void;
	/**
	 * Callback function to trigger whenever the element of the `input` loses focus
	 */
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	/**
	 * Callback function to trigger whenever the element of the `input` receives key down event
	 */
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	/**
	 * Callback function to trigger whenever the element of the `input` receives key up event
	 */
	onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	/**
	 * Callback function to trigger whenever the element of the `input` is focused
	 */
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	/**
	 * Custom Width of the component.
	 */
	width?: string;
	/**
	 * Callback function to validate the text before converting to a chip
	 * Returns undefined if valid, or an error message if invalid
	 */
	validateChip?: (text: string) => string | undefined;
}
