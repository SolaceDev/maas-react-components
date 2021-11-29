import { FormLabel } from "@material-ui/core";
import classNames from "classnames";

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
	children
}: SolaceLabelProps): JSX.Element {
	return (
		<FormLabel
			id={id}
			htmlFor={htmlForId}
			required={required}
			disabled={disabled}
			sx={{
				display: "block"
			}}
			className={classNames({ "read-only": readOnly })}
		>
			{children}
		</FormLabel>
	);
}

export default SolaceLabel;
