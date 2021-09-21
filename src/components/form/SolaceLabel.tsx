import { InputLabel } from "@material-ui/core";
import React from "react";

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
	return (
		<InputLabel id={id} htmlFor={htmlForId} required={isRequired} disabled={isDisabled}>
			{children}
		</InputLabel>
	);
}

export default SolaceLabel;
