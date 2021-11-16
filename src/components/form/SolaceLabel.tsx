import { FormLabel, useTheme } from "@material-ui/core";

export interface SolaceLabelProps {
	/**
	 * Unique identifier of the label
	 */
	id: string;
	/**
	 * identifier used for specifying which form element this label is bound to
	 */
	htmlForId?: string;
	/**
	 * Boolean flag used to display an indicator of whether or not this `input` is mandatory
	 */
	isRequired?: boolean;
	/**
	 * Boolean flag to disable the `input`
	 */
	isDisabled?: boolean;
	/**
	 *
	 */
	children?: React.ReactNode;
}

function SolaceLabel({
	id,
	htmlForId,
	isRequired = false,
	isDisabled = false,
	children
}: SolaceLabelProps): JSX.Element {
	const theme = useTheme();
	return (
		<FormLabel
			id={id}
			htmlFor={htmlForId}
			required={isRequired}
			disabled={isDisabled}
			sx={{ display: "block", color: theme.palette.text.primary, fontWeight: "regular" }}
		>
			{children}
		</FormLabel>
	);
}

export default SolaceLabel;
