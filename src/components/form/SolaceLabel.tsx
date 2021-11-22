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
	 * Boolean flag to allow font size of 16px (default to 14px)
	 */
	isLargeLabel?: boolean;
	/**
	 * Boolean falg to allow font weight of medium (default to regular)
	 */
	isBoldLabel?: boolean;
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
	isLargeLabel = false,
	isBoldLabel = false,
	children
}: SolaceLabelProps): JSX.Element {
	const theme = useTheme();
	return (
		<FormLabel
			id={id}
			htmlFor={htmlForId}
			required={isRequired}
			disabled={isDisabled}
			sx={{
				display: "block",
				color: theme.palette.text.primary,
				fontWeight: isBoldLabel ? "medium" : "regular",
				fontSize: isLargeLabel ? theme.typography.subtitle1 : theme.typography.body1
			}}
		>
			{children}
		</FormLabel>
	);
}

export default SolaceLabel;
