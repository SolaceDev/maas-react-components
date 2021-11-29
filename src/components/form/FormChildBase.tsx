import { Box } from "@material-ui/core";
import SolaceLabel from "./SolaceLabel";
import SolaceStackLabel from "./SolaceStackLabel";
import HelperText from "./HelperText";
import ErrorText from "./ErrorText";
import SolaceComponentProps from "../SolaceComponentProps";

export interface FormChildBaseProps extends SolaceComponentProps {
	/**
	 * Unique identifier ... if `id` is not specified, `name` value will be used in order to make `label` and `helperText` accessible for screen readers
	 */
	id: string;
	/**
	 * the label content to display on the screen
	 */
	label?: string | JSX.Element;
	/**
	 * Boolean flag to allow labels to be rendered as SolaceStackLabel component, which provides more props, such as large, bold
	 */
	stackLabel?: boolean;
	/**
	 * Boolean flag to allow StackSolaceLabel component to be rendered with larger font size of 16px (default to 14px)
	 */
	large?: boolean;
	/**
	 * Boolean flag to allow StackSolaceLabel component to be rendered with font weight of medium (default to regular)
	 */
	bold?: boolean;
	/**
	 * The value of the `input` element, required for controlled component
	 */
	value?: string;
	/**
	 * Content to display as supportive/explanatory text
	 */
	helperText?: string | JSX.Element;
	/**
	 * Boolean flag to mark the `input` in error state
	 */
	errorText?: string | JSX.Element;
	/**
	 * Boolean flag used to display an indicator of whether or not this `input` is mandatory
	 */
	required: boolean;
	/**
	 * Boolean flag to disable the `input`
	 */
	disabled: boolean;
	/**
	 * Boolean flag to set the `input` in a read-only state
	 */
	readOnly: boolean;
	/**
	 * Display the label horizontally
	 */
	inlineLabel: boolean;
	/**
	 * Center align the inline label, this will e used only for single line field label
	 */
	centerInlineLabel?: boolean;

	children: JSX.Element;
}

function FormChildBase({
	id,
	label,
	stackLabel,
	large,
	bold,
	required,
	disabled,
	inlineLabel,
	centerInlineLabel,
	helperText,
	errorText,
	children
}: FormChildBaseProps): JSX.Element {
	return (
		<Box
			display="flex"
			flexDirection={inlineLabel ? "row" : "column"}
			justifyContent="space-between"
			alignItems={centerInlineLabel ? "center" : "flex-start"}
		>
			{stackLabel && label && (
				<SolaceStackLabel
					id={`${id}-label`}
					htmlForId={`${id}`}
					required={required}
					disabled={disabled}
					large={large}
					bold={bold}
				>
					{label}
				</SolaceStackLabel>
			)}
			{!stackLabel && label && (
				<SolaceLabel id={`${id}-label`} htmlForId={`${id}`} required={required} disabled={disabled}>
					{label}
				</SolaceLabel>
			)}
			<Box display="flex" flexDirection="column">
				{children}
				{helperText && !errorText && <HelperText>{helperText}</HelperText>}
				{errorText && <ErrorText>{errorText}</ErrorText>}
			</Box>
		</Box>
	);
}

export default FormChildBase;
