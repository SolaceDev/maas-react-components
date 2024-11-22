/**
 * Enum representing the possible overflow behaviors for step content.
 *
 * @enum {string}
 * @property {string} Auto - The overflow is automatically determined by the browser.
 * @property {string} Hidden - The overflow is clipped, and the rest of the content will be invisible.
 * @property {string} Scroll - The overflow is clipped, but a scrollbar is added to see the rest of the content.
 * @property {string} Visible - The overflow is not clipped, and it renders outside the element's box.
 */
export enum StepContentOverflow {
	Auto = "auto",
	Hidden = "hidden",
	Scroll = "scroll",
	Visible = "visible"
}

/**
 * Props for the SolaceStepper component.
 *
 * @typedef {Object} SolaceStepperProps
 * @property {React.ReactNode} children - The child components to be rendered inside the stepper.
 * @property {StepContentOverflow} [stepContentOverflow] - The overflow behavior for the step content.
 */
export type SolaceStepperProps = SolaceStepperFooterProps & {
	children: React.ReactNode;
	stepContentOverflow?: StepContentOverflow;
};

/**
 * Props for the SolaceStepperFooter component.
 *
 * @typedef {Object} SolaceStepperFooterProps
 * @property {StepsProps} steps - The array of step properties.
 * @property {number} activeStep - The index of the currently active step.
 * @property {React.Dispatch<React.SetStateAction<number>>} setActiveStep - Function to set the active step.
 * @property {() => void} onClose - Function to call when the stepper is closed.
 * @property {() => void} onSubmit - Function to call when the stepper is submitted.
 * @property {string} submitLabel - The label for the submit button.
 * @property {boolean} [disableSubmit] - Whether the submit button should be disabled.
 */
export type SolaceStepperFooterProps = {
	steps: StepsProps;
	activeStep: number;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
	onClose: () => void;
	onSubmit: () => void;
	submitLabel: string;
	disableSubmit?: boolean;
};

/**
 * Props for an individual step.
 *
 * @typedef {Object} StepProp
 * @property {string} label - The label for the step.
 * @property {JSX.Element} icon - The icon to display for the step.
 * @property {string} [subText] - Optional subtext for the step.
 * @property {boolean} [error] - Whether the step has an error.
 * @property {boolean} [completed] - Whether the step is completed.
 */

export type StepProp = {
	label: string;
	icon: JSX.Element;
	subText?: string;
	error?: boolean;
	completed?: boolean;
};

/**
 * Array of step properties.
 *
 * @typedef {StepProp[]} StepsProps
 */
export type StepsProps = StepProp[];
