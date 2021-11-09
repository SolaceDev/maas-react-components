import { Box } from "@material-ui/core";
import SolaceLabel from "./SolaceLabel";
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
	 * The value of the `input` element, required for controlled component
	 */
	value?: string;
	/**
	 * Content to display as supportive/explanitory text
	 */
	helperText?: string | JSX.Element;
	/**
	 * Boolean flag to mark the `input` in error state
	 */
	errorText?: string | JSX.Element;
	/**
	 * Boolean flag used to display an indicator of whether or not this `input` is mandatory
	 */
	isRequired: boolean;
	/**
	 * Boolean flag to disable the `input`
	 */
	isDisabled: boolean;
	/**
	 * Boolean flag to set the `input` in a read-only state
	 */
	isReadOnly: boolean;
	/**
	 * Display the label horizontally
	 */
	isInlineLabel: boolean;

	children: JSX.Element;
}

function FormChildBase({
	id,
	label,
	isRequired,
	isDisabled,
	isInlineLabel,
	helperText,
	errorText,
	children
}: FormChildBaseProps): JSX.Element {
	return (
		<Box
			display="flex"
			flexDirection={isInlineLabel ? "row" : "column"}
			justifyContent="space-between"
			alignItems="flex-start"
		>
			{label && (
				<SolaceLabel id={`${id}-label`} htmlForId={`${id}`} isRequired={isRequired} isDisabled={isDisabled}>
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
