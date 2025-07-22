/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Chip, useTheme } from "@mui/material";
import { BASE_SIZE_TYPES } from "../types/sizing";
import { BASE_FONT_PX_SIZE_TYPES, BASE_FONT_PX_SIZES } from "../resources/typography";
import { MODES } from "../types/modes";
import { CHIP_COLORS, CHIP_PX_BORDER_RADIUS, CHIP_PX_HEIGHTS, CHIP_VARIANT } from "../types/solaceChip";
import SolaceComponentProps from "./SolaceComponentProps";
import CloseIcon from "@mui/icons-material/Close";
import { STATUSES } from "../types/statuses";
import { STATES } from "../types/states";
import { ErrorIcon } from "../resources/icons/ErrorIcon";

export interface SolaceChipProps extends SolaceComponentProps {
	/**
	 * 	The content of the component.
	 */
	label?: string | JSX.Element;
	/**
	 * 	The variant to use ... standard (filled) vs choice (outlined).
	 */
	variant?: CHIP_VARIANT;
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
	borderColor?: CHIP_COLORS;
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
	fillColor?: CHIP_COLORS;
	/**
	 * Flag to set the label font weight to bold
	 */
	boldLabel?: boolean;
	/**
	 * Sets the text color of the label
	 */
	labelColor?: CHIP_COLORS;
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
	 * Sets the mode of the chip (default is LIGHT_MODE)
	 */
	mode?: MODES;
	/**
	 * Sets the status of the chip (default is NO_STATUS)
	 */
	status?: STATUSES;
	/**
	 * Sets the state of the chip (default is NOT_SELECTED)
	 */
	state?: STATES;
	/**
	 * Add a leading icon ... ensure the size of the icon is 14x14 pixels
	 */
	icon?: JSX.Element;
	/**
	 * if the callback function is set, the chip will show the delete button
	 */
	onDelete?: (id: string | number) => void;
	/**
	 * if the callback function is set, the chip will notify when clicked
	 */
	onClick?: () => void;
}

export default function SolaceChip({
	label,
	variant = CHIP_VARIANT.FILLED,
	disabled = false,
	maxWidth = "100%",
	dashedBorder = false,
	borderColor,
	labelColor,
	borderRadius = "md",
	fillColor,
	boldLabel = false,
	height = "md",
	dataQa,
	size = "sm",
	compressed = false,
	clickable = false,
	mode = MODES.LIGHT_MODE,
	status = STATUSES.NO_STATUS,
	state = STATES.NOT_SELECTED,
	icon,
	onDelete,
	onClick
}: SolaceChipProps): JSX.Element {
	const CHIP_COLOR_MAP = useTheme().palette.ux.deprecated.chip;
	const theme = useTheme();

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
				paddingLeft: `${compressed ? "0px" : "2px"}`,
				paddingRight: `${compressed ? "0px" : "2px"}`
			}}
			label={label}
			variant={variant}
			size={compressed ? "small" : "medium"}
			disabled={disabled}
			clickable={clickable}
			onDelete={onDelete}
			deleteIcon={<CloseIcon />}
			data-qa={dataQa}
			className={`solaceChip ${mode} ${status} ${state}`}
			onClick={onClick}
			icon={
				<>
					{icon && <span className="leadingIcon">{icon}</span>}
					{status === STATUSES.ERROR_STATUS && (
						<span className="errorIcon">
							{" "}
							<ErrorIcon size={14} fill={theme.palette.ux.error.w100} />{" "}
						</span>
					)}
				</>
			}
		/>
	);
}
