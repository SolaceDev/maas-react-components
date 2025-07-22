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

import React, { useState } from "react";
import { MenuItem, ListItemIcon, Grid, Typography, useTheme, Menu, Divider } from "@mui/material";
import SolaceComponentProps from "./SolaceComponentProps";
import { ArrowRightIcon } from "../resources/icons/ArrowRight";
import clsx from "clsx";

export interface SolaceMenuItemProps extends SolaceComponentProps {
	id?: string;
	/**
	 * Name attribute to show as menu item label for default menuItems,for custom menu items JSX.Element type is passed.
	 */
	name: string | JSX.Element;
	/**
	 * Content to display as supportive/explanitory text
	 */
	subText?: string;
	/**
	 * Content to display as supportive/explanitory text
	 */
	supplementalText?: string;
	/**
	 * Adds an Icon to left handside of the menu item label for Supporting visuals and helping differentiate between menu options
	 */
	icon?: JSX.Element | HTMLElement;
	/**
	 * Adds a secondary action (ex. more info icon button) to the right end of menu item
	 */
	secondaryAction?: JSX.Element | HTMLElement;
	/**
	 * The callback function runs when the user clicks on a menu item
	 */
	onMenuItemClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	/**
	 * callback function on menu close action
	 */
	onMenuClose?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	/**
	 * Adds a divider to the bottom of menuItem
	 */
	divider?: boolean;
	/**
	 * Boolean flag to disable the menuItem
	 */
	disabled?: boolean;
	/**
	 * Optional attribute to group Menu items and show categoryHeading
	 */
	categoryHeading?: string;
	/**
	 * Optional flag to close the menu on menuItemClick, the default is set to true.
	 */
	closeOnSelect?: boolean;
	/**
	 * Optional flag for subMenu items
	 */
	subMenuItems?: SolaceMenuItemProps[];
	/**
	 * Optional flag for the height of menu items
	 */
	itemHeight?: number;
	/**
	 * Optional flag for identify the selected menu item
	 */
	selected?: boolean;
	/**
	 * Content to display in a tooltip when the menuItem is disabled
	 */
	disabledMenuItemTooltipContent?: string;
}

const SolaceMenuItem = ({
	id,
	name,
	subText,
	supplementalText,
	icon,
	secondaryAction,
	onMenuItemClick,
	onMenuClose,
	divider,
	disabled,
	subMenuItems,
	closeOnSelect,
	itemHeight,
	selected,
	dataQa,
	dataTags
}: SolaceMenuItemProps) => {
	const theme = useTheme();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isSubMenuOpen = Boolean(anchorEl);

	const handleMenuClose = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		// don't bubble click event on menu closed by user clicking on any area in the window
		event.stopPropagation();
		setAnchorEl(null);

		// close the menu
		if (onMenuClose) {
			onMenuClose(event);
		}
	};

	const handleMouseEnterOnMenuItem = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<MenuItem
				id={id}
				key={id}
				data-qa={dataQa}
				data-tags={dataTags}
				onClick={(e) => {
					// stop click event on the menu item from being bubbled up to parent, causing unexpected extra click event
					e.stopPropagation();
					if (closeOnSelect) {
						handleMenuClose(e);
					}
					if (onMenuItemClick) {
						onMenuItemClick(e);
					}
				}}
				onMouseEnter={handleMouseEnterOnMenuItem}
				onMouseLeave={handleClose}
				disabled={!!disabled}
				className={clsx({
					multiline: !!subText && typeof name === "string",
					wideMenu: !!supplementalText && typeof name === "string",
					selectedItem: selected
				})}
			>
				{typeof name === "string" ? (
					<>
						{icon && (
							<ListItemIcon className="menuItemIcon" style={{ paddingRight: theme.spacing(1) }}>
								{icon}
							</ListItemIcon>
						)}
						<Grid container direction={"column"} justifyContent="center">
							<Grid container justifyContent={"space-between"} direction={"row"} alignItems={"center"}>
								<Typography variant="body1" noWrap>
									{name}
								</Typography>
								{supplementalText && (
									<Grid className="supplementalText" item>
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
								sx={{ marginLeft: `${subText ? 0 : theme.spacing(3)}`, width: "auto" }}
								justifyContent={"end"}
								alignItems={"center"}
								className="menuItemIcon"
							>
								{secondaryAction}
							</Grid>
						)}

						{subMenuItems && subMenuItems.length > 0 && (
							<Grid container sx={{ marginLeft: theme.spacing(3), width: "auto" }} alignItems={"center"}>
								<ArrowRightIcon />
							</Grid>
						)}
					</>
				) : (
					name
				)}
				{subMenuItems && subMenuItems.length > 0 && (
					<Menu
						id={id}
						key={`key-${id}`}
						data-qa={`${dataQa}-subMenu-${id}`}
						data-tags={`${dataTags}-subMenu-${id}`}
						anchorEl={anchorEl}
						open={isSubMenuOpen}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right"
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "left"
						}}
						onClose={handleMenuClose}
						PaperProps={{
							style: {
								maxHeight: itemHeight ? `${itemHeight * 9.5}px` : `${38 * 9.5}px` // default height is 38
							}
						}}
						className="SolaceMenu"
						style={{ pointerEvents: "none" }} /// "pointerEvents: none" to prevent invisible Popover wrapper div to capture mouse events
					>
						{/* reset pointer event here so that the menu items could receive mouse events */}
						<div style={{ pointerEvents: "auto" }}>
							{subMenuItems.map((item, index) => {
								return (
									<SolaceMenuItem
										id={`${item.name}-${index}`}
										key={`${item.name}-${index}`}
										name={item.name}
										itemHeight={itemHeight ? itemHeight : 38} // default height is 38
										closeOnSelect={closeOnSelect}
										subText={item?.subText}
										supplementalText={item?.supplementalText}
										divider={!!item?.divider}
										disabled={!!item?.disabled}
										icon={item?.icon}
										secondaryAction={item?.secondaryAction}
										onMenuItemClick={onMenuItemClick}
										onMenuClose={handleMenuClose}
										subMenuItems={item?.subMenuItems}
									/>
								);
							})}
						</div>
					</Menu>
				)}
			</MenuItem>
			{!!divider && <Divider />}
		</>
	);
};

export default SolaceMenuItem;
