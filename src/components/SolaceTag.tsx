import { useTheme, Chip } from "@mui/material";
import { BASE_FONT_PX_SIZES } from "../resources/typography";
import { CHIP_COLORS, CHIP_PX_BORDER_RADIUS, CHIP_PX_HEIGHTS, CHIP_VARIANT } from "../types/solaceChip";
import SolaceComponentProps from "./SolaceComponentProps";

export interface SolaceTagProps extends SolaceComponentProps {
	/**
	 * 	The content of the component.
	 */
	label?: string | JSX.Element;
	/**
	 * 	The variant to use ... filled vs outlined
	 */
	variant?: CHIP_VARIANT;
	/**
	 * If the label is of type string and exceeds the maxWidth (in px), ellipsis will be
	 * shown within the component
	 */
	maxWidth?: string | number;
	/**
	 * Sets the fill color of the component
	 */
	fillColor?: CHIP_COLORS;
	/**
	 * Sets the border color of the component
	 */
	borderColor?: CHIP_COLORS;
	/**
	 * Sets the text color of the label
	 */
	labelColor?: CHIP_COLORS;
	/**
	 * If true, hover and click effects will be applied to the component
	 */
	clickable?: boolean;
	/**
	 * Add a leading icon ... ensure the size of the icon is 14x14 pixels
	 */
	icon?: JSX.Element;
}

export default function SolaceTag({
	label,
	variant = CHIP_VARIANT.FILLED,
	maxWidth = "100%",
	fillColor,
	borderColor,
	labelColor,
	clickable = false,
	icon,
	dataQa
}: SolaceTagProps): JSX.Element {
	const CHIP_COLOR_MAP = useTheme().palette.ux.deprecated.chip;

	return (
		<Chip
			sx={{
				maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
				fontSize: `${BASE_FONT_PX_SIZES["xs"]}px`,
				borderColor: `${borderColor && CHIP_COLOR_MAP[borderColor]} !important`, // need important to override theme values
				borderRadius: `${CHIP_PX_BORDER_RADIUS["xs"]}px`,
				fontWeight: 400,
				height: `${CHIP_PX_HEIGHTS["sm"]}px`,
				backgroundColor: `${fillColor && CHIP_COLOR_MAP[fillColor]} !important`, // need important to override theme values
				color: `${labelColor && CHIP_COLOR_MAP[labelColor]} !important`, // need important to override theme values
				paddingLeft: "2px",
				paddingRight: "2px"
			}}
			label={label}
			variant={variant}
			size="medium"
			clickable={clickable}
			data-qa={dataQa}
			className="solaceTag"
			icon={<>{icon && <span className="leadingIcon">{icon}</span>}</>}
		/>
	);
}
