import { Chip } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { BASE_FONT_PX_SIZE_TYPES, BASE_FONT_PX_SIZES } from "../resources/typography";
import SolaceComponentProps from "./SolaceComponentProps";

export interface SolaceChipProps extends SolaceComponentProps {
	/**
	 * 	The content of the component.
	 */
	label?: string | JSX.Element;
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
	 * 	Overrides all other props and styles the chip according to the lifecycle state
	 */
	lifecycleState?: "Draft" | "Released" | "Deprecated" | "Retired";
	/**
	 * Font size
	 */
	size?: keyof BASE_FONT_PX_SIZE_TYPES;
	/**
	 * Flag for controlling the size of the chip component
	 */
	compressed?: boolean;
	/**
	 * If true, the chip will appear clickable, and will raise when pressed
	 */
	clickable?: boolean;
	/**
	 * if the callback function is set, the chip will show the delete button
	 */
	onDelete?: () => void;
}

export default function SolaceChip({
	label,
	variant = "filled",
	disabled = false,
	maxWidth = 200,
	lifecycleState,
	dataQa,
	size = "sm",
	compressed = true,
	clickable = false,
	onDelete
}: SolaceChipProps): JSX.Element {
	return (
		<Chip
			className={lifecycleState ? `defaultStateStyle ${lifecycleState}` : ""}
			sx={{ maxWidth: `${maxWidth}px`, fontSize: BASE_FONT_PX_SIZES[size] }}
			label={lifecycleState ? lifecycleState : label}
			variant={variant}
			size={compressed || lifecycleState ? "small" : "medium"}
			disabled={disabled}
			clickable={clickable}
			onDelete={onDelete}
			data-qa={dataQa}
			deleteIcon={<CloseIcon />}
		/>
	);
}
