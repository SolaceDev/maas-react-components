import { FormLabel } from "@material-ui/core";

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
	 *
	 */
	children?: React.ReactNode;
}

function SolaceLabel({ id, htmlForId, required = false, disabled = false, children }: SolaceLabelProps): JSX.Element {
	return (
		<FormLabel
			id={id}
			htmlFor={htmlForId}
			required={required}
			disabled={disabled}
			sx={{
				display: "block"
			}}
		>
			{children}
		</FormLabel>
	);
}

export default SolaceLabel;
