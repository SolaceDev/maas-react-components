import { FormLabel } from "@mui/material";
import clsx from "clsx";

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
	 * Boolean flag to suppress line breaks (text wrapping) within the label
	 */
	noWrap?: boolean;
	/**
	 *
	 */
	children?: React.ReactNode;
}

function SolaceLabel({
	id,
	htmlForId,
	required = false,
	disabled = false,
	readOnly = false,
	noWrap = false,
	children
}: SolaceLabelProps): JSX.Element {
	return (
		<FormLabel
			id={id}
			htmlFor={htmlForId}
			required={required}
			disabled={disabled}
			sx={{
				display: "block",
				whiteSpace: noWrap ? "nowrap" : "normal"
			}}
			className={clsx({ "read-only": readOnly })}
		>
			{children}
		</FormLabel>
	);
}

export default SolaceLabel;
