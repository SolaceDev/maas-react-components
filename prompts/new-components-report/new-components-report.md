# New Components Report - Q2 2025

This report summarizes the new React components added to the maas-react-components repository during the last quarter (April 7, 2025 - July 7, 2025).

## New Components

### SolaceChipTextArea

**File Path:** `src/components/form/SolaceChipTextArea/SolaceChipTextArea.tsx`

**Purpose and Functionality:**
The SolaceChipTextArea component is designed for entering text that gets converted into chips (tags). It was initially designed with email input in mind but can be extended for other use cases. The component supports:

- Typing values separated by comma, semicolon, space, or enter button
- Pasting from clipboard
- Optional validation of chip values
- Adding/removing chips with keyboard or mouse interactions
- Error state display for invalid chips

**Props and Types:**

```typescript
// ChipData interface for individual chips
export interface ChipData {
	id: string;
	label: string;
	isValid: boolean;
	errorMessage?: string;
}

// Event interface for onChange handler
export interface SolaceChipTextAreaChangeEvent {
	name: string;
	value: string;
	chips: ChipData[];
	allValues: string;
}

// Component props
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
```

**PR that introduced it:**

- PR #1041: "SOLACEMINOR DATAGO-96816 Add chip textarea component"
- Merged on May 8, 2025
- Created by: md-cyow
- [PR Link](https://github.com/SolaceDev/maas-react-components/pull/1041)

**Implementation Details:**

- Built using existing SolaceChip and FormChildBase components
- Includes styled components for the chip input container, items, and input elements
- Supports keyboard navigation and accessibility features
- Includes comprehensive Storybook stories showcasing various use cases

## Summary

Total number of new components: **1**

The SolaceChipTextArea component was added in this quarter, providing a specialized input field for handling multiple values as chips/tags. This component enhances the form capabilities of the maas-react-components library, particularly for use cases requiring multiple discrete inputs like email addresses.
