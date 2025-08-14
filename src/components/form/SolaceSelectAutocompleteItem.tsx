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

import { ListItemIcon } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import clsx from "clsx";
export interface SolaceSelectAutocompleteItemProps {
	/**
	 * Name attribute to show as menu item label.
	 */
	name: string;
	/**
	 * The value of the current autocomplete item, must have reference equality with the option value in order to be selected.
	 */
	value: string;
	/**
	 * Content to display as supportive/explanitory text
	 */
	subText?: string;
	/**
	 * Content to display as supportive/explanitory text
	 */
	supplementalText?: string;
	/**
	 * Adds a divider to the bottom of menuItem
	 */
	divider?: boolean;
	/**
	 * Optional attribute to group Menu items and show categoryHeading
	 */
	categoryHeading?: string;
	/**
	 * Optional attribute allowing the multiline className to be added to the menu item
	 */
	isNew?: boolean;
	/**
	 * Adds an Icon to left handside of the menu item name for Supporting visuals and helping differentiate between menu options
	 */
	icon?: JSX.Element | HTMLElement;
	/**
	 * Adds a secondary action (ex. more info icon button) to the right end of menu item
	 */
	secondaryAction?: JSX.Element | HTMLElement;
}

export const getOptionLabel = (option: SolaceSelectAutocompleteItemProps): string => option?.name ?? "";

export const getShowOptionDivider = (option: SolaceSelectAutocompleteItemProps): boolean => option?.divider ?? false;

export const isOptionEqual = (
	option: SolaceSelectAutocompleteItemProps,
	value: SolaceSelectAutocompleteItemProps
): boolean => {
	return option?.value === value?.value;
};

export const getGroupBy = (option: SolaceSelectAutocompleteItemProps): string => option?.categoryHeading ?? "";

function SolaceSelectAutocompleteItem({
	name,
	subText,
	supplementalText,
	isNew,
	icon,
	secondaryAction
}: SolaceSelectAutocompleteItemProps): JSX.Element {
	const sizeOfColumn = supplementalText ? 8 : 12;
	const middlePadding = supplementalText ? "16px" : "0px";
	return (
		<div style={{ display: "flex", width: "100%", alignItems: "center" }}>
			{icon && (
				<ListItemIcon className="menuItemIcon" style={{ paddingRight: "8px" }}>
					{icon as React.ReactNode}
				</ListItemIcon>
			)}
			<Grid container direction={"column"} className={clsx({ multiline: !!subText || isNew })} py={0.5}>
				<Grid container justifyContent={"space-between"} direction={"row"} alignItems={"flex-start"}>
					<Grid item xs={sizeOfColumn} zeroMinWidth style={{ wordBreak: "break-word", paddingRight: middlePadding }}>
						{name}
					</Grid>
					{supplementalText && (
						<Grid
							container
							className="supplementalText"
							item
							xs={4}
							direction="column"
							alignItems="flex-end"
							justifyContent="flex-start"
							style={{ marginLeft: "0px" }}
						>
							{supplementalText}
						</Grid>
					)}
				</Grid>
				{subText && (
					<Grid className="subtext" item>
						<span className="subtext">{subText}</span>
					</Grid>
				)}
			</Grid>

			{secondaryAction && (
				<Grid
					container
					sx={{ marginLeft: `${subText ? 0 : "24px"}`, width: "auto" }}
					justifyContent={"end"}
					alignItems={"center"}
					className="menuItemIcon"
				>
					{secondaryAction as React.ReactNode}
				</Grid>
			)}
		</div>
	);
}

export default SolaceSelectAutocompleteItem;
