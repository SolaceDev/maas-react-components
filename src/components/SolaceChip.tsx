import { Chip } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

export interface SolaceChipProps {
	/**
	 * 	The content of the component.
	 */
	label?: string;
	/**
	 * 	The variant to use.
	 */
	variant?: "filled" | "outlined";
	/**
	 * If true, the component is disabled.
	 */
	disabled?: boolean;
	/**
	 * If the content exceeds the maxWidth (in px), ellipsis will be shown within the chip.
	 */
	maxWidth?: number;
}

export default function SolaceChip({
	label,
	variant = "filled",
	disabled = false,
	maxWidth = 200
}: SolaceChipProps): JSX.Element {
	return (
		<Chip
			sx={{ maxWidth: `${maxWidth}px` }}
			label={label}
			variant={variant}
			size="small"
			disabled={disabled}
			deleteIcon={<CloseIcon />}
		/>
	);
}
