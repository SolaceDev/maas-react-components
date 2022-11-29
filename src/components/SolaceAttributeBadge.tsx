import { Chip, useTheme } from "@mui/material";
import { BASE_SIZE_TYPES } from "../resources/sizing";
import { BASE_FONT_PX_SIZE_TYPES, BASE_FONT_PX_SIZES } from "../resources/typography";
import { BADGE_COLORS } from "../types/solaceChip";
import SolaceComponentProps from "./SolaceComponentProps";
import CloseIcon from "@mui/icons-material/Close";

const CHIP_PX_HEIGHTS: BASE_SIZE_TYPES = {
	sm: 18,
	md: 24,
	lg: 30
};

const CHIP_PX_BORDER_RADIUS: BASE_SIZE_TYPES = {
	sm: 30,
	md: 40,
	lg: 50
};

export interface SolaceAttributeProps extends SolaceComponentProps {
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
	maxWidth?: string | number;
	/**
	 * Sets the border color of the component
	 */
	borderColor?: BADGE_COLORS;
	/**
	 * Sets the border radius of the component
	 */
	borderRadius?: keyof BASE_SIZE_TYPES;
	/**
	 * Flag to change the border to dashed for the outlined chip variant
	 */
	dashedBorder?: boolean;
	/**
	 * Sets the fill color of the chip
	 */
	fillColor?: BADGE_COLORS;
	/**
	 * Flag to set the label font weight to bold
	 */
	boldLabel?: boolean;
	/**
	 * Sets the text color of the label
	 */
	labelColor?: BADGE_COLORS;
	/**
	 * Sets the vertical size of the chip
	 */
	height?: keyof BASE_SIZE_TYPES;
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
	onDelete?: (id: string | number) => void;
}

export default function SolaceAttribute({
	label,
	variant = "filled",
	disabled = false,
	maxWidth = "100%",
	dashedBorder = false,
	borderColor,
	labelColor,
	borderRadius = "md",
	fillColor,
	boldLabel = true,
	height = "sm",
	dataQa,
	size = "xs",
	compressed = true,
	clickable = false,
	onDelete
}: SolaceAttributeProps): JSX.Element {
	const CHIP_COLOR_MAP = useTheme().palette.ux.deprecated.chip;
	return (
		<Chip
			sx={{
				maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
				fontSize: BASE_FONT_PX_SIZES[size],
				borderColor: `${borderColor && CHIP_COLOR_MAP[borderColor]}`,
				borderStyle: `${dashedBorder && "dashed"}`,
				borderRadius: `${CHIP_PX_BORDER_RADIUS[borderRadius]}px`,
				fontWeight: `${boldLabel ? 500 : 400}`,
				height: `${CHIP_PX_HEIGHTS[height]}px`,
				backgroundColor: `${fillColor && CHIP_COLOR_MAP[fillColor]}`,
				color: `${labelColor && CHIP_COLOR_MAP[labelColor]}`,
				paddingLeft: `${compressed && "2px"}`,
				paddingRight: `${compressed && "2px"}`
			}}
			label={label}
			variant={variant}
			size={compressed ? "small" : "medium"}
			disabled={disabled}
			clickable={clickable}
			onDelete={onDelete}
			deleteIcon={<CloseIcon />}
			data-qa={dataQa}
			className="attributeBadge"
		/>
	);
}
