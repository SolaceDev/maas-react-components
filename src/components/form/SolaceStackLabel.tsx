import { FormLabel, useTheme } from "@material-ui/core";
import clsx from "clsx";

export interface SolaceStackLabelProps {
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
	required?: boolean;
	/**
	 * Boolean flag to disable the `input`
	 */
	disabled?: boolean;
	/**
	 * Boolean flag for readOnly labels, changes font color to 55% black
	 */
	readOnly?: boolean;
	/**
	 * Boolean flag to allow font size of 16px (default to 14px)
	 */
	large?: boolean;
	/**
	 * Boolean flag to allow font weight of medium (default to regular)
	 */
	bold?: boolean;
	/**
	 *
	 */
	children?: React.ReactNode;
}

function SolaceStackLabel({
	id,
	htmlForId,
	required = false,
	disabled = false,
	large = false,
	bold = false,
	readOnly = false,
	children
}: SolaceStackLabelProps): JSX.Element {
	const theme = useTheme();
	return (
		<FormLabel
			id={id}
			htmlFor={htmlForId}
			required={required}
			disabled={disabled}
			className={clsx({ "bold-label": bold, "read-only": readOnly })}
			sx={{
				display: "block",
				fontSize: large ? theme.typography.subtitle1 : theme.typography.body1
			}}
		>
			{children}
		</FormLabel>
	);
}

export default SolaceStackLabel;
