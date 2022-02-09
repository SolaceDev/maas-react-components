import { Chip } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { BASE_FONT_PX_SIZE_TYPES, BASE_FONT_PX_SIZES } from "../resources/typography";

export interface SolaceChipProps {
	/**
	 * 	The content of the component.
	 */
	label?: string | Node;
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
	/**
	 * Font size
	 */
	size?: keyof BASE_FONT_PX_SIZE_TYPES;
	/**
	 * Flag for controlling the size of the chip component
	 */
	compressed?: boolean;
}

export default function SolaceChip({
	label,
	variant = "filled",
	disabled = false,
	maxWidth = 200,
	size = "sm",
	compressed = true
}: SolaceChipProps): JSX.Element {
	return (
		<Chip
			sx={{ maxWidth: `${maxWidth}px`, fontSize: BASE_FONT_PX_SIZES[size] }}
			label={label}
			variant={variant}
			size={compressed ? "small" : "medium"}
			disabled={disabled}
			deleteIcon={<CloseIcon />}
		/>
	);
}
