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

import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Menu, ListSubheader, Popover } from "@mui/material";
import { groupBy, flatten } from "lodash";
import SolaceComponentProps from "./SolaceComponentProps";
import SolaceButton, { SolaceButtonProps } from "./form/SolaceButton";
import SolaceMenuItem, { SolaceMenuItemProps } from "./SolaceMenuItem";
import { useScrollIndicator } from "../hooks/useScrollIndicator";
import { getActionMenuAriaLabel } from "../utils";
import SolaceTooltip from "./SolaceToolTip";

interface SolaceMenuProps extends SolaceComponentProps {
	id?: string;
	/**
	 * Attributes to customize menu button
	 */
	buttonProps: SolaceButtonProps;
	/**
	 * An array of options when using default menu
	 */
	items?: SolaceMenuItemProps[];
	/**
	 * Header of menu when using default menu
	 */
	header?: string;
	/**
	 * optional attribute to change the position of menu popper only for default menu
	 */
	anchorOrigin?: { vertical: "top" | "center" | "bottom"; horizontal: "left" | "center" | "right" };
	/**
	 * optional attribute to change the position of menu popper only for default menu
	 */
	transformOrigin?: { vertical: "top" | "center" | "bottom"; horizontal: "left" | "center" | "right" };
	/**
	 * optional boolean flag to adjust the maxHeight of menu default is set to false
	 */
	multiline?: boolean;
	/**
	 * optional attribute to propagate menu button click event to parent
	 */
	propagateMenuClick?: boolean;
	/**
	 * Optional flag to close the menu on menuItemClick, the default is set to true.
	 */
	closeOnSelect?: boolean;
	/**
	 * The callback function runs when the user clicks on a menu item
	 */
	onMenuItemClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	/**
	 * optional flag to specify the number of menu items to be displayed, the number is currently default to 9.
	 * Note: the total number of items exceeding this number will make the list scrollable with fade style applied based on the scroll positions.
	 */
	numOfMenuItemDisplayed?: number;
	/**
	 * Optional attribute to define the maximum width of menu popper
	 */
	maxWidth?: number;
}

const DEFAULT_NUM_OF_MENUITEM_DISPLAYED = 9;
const DEFAULT_MENU_POPOVER_MAX_WIDTH = 335;
// defined in theme file under .MuiListSubheader-root
const HEADING_HEIGHT = 32;

export default function SolaceMenu(props: SolaceMenuProps): JSX.Element {
	const {
		id = "solace-menu",
		buttonProps,
		items,
		header,
		numOfMenuItemDisplayed = DEFAULT_NUM_OF_MENUITEM_DISPLAYED,
		maxWidth = DEFAULT_MENU_POPOVER_MAX_WIDTH,
		multiline = false,
		propagateMenuClick = false,
		closeOnSelect = true,
		anchorOrigin = { vertical: "bottom", horizontal: "left" },
		transformOrigin = { vertical: "top", horizontal: "left" },
		dataQa,
		dataTags
	} = props;

	const { maskImage, onScrollHandler, resetScrollPosition } = useScrollIndicator();
	const itemHeight = multiline ? 58 : 38;

	// states
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [menuPopoverRef, setMenuPopoverRef] = useState<null | HTMLElement>(null);
	const [pressedButton, setPressedButton] = useState<DOMTokenList>();

	// handlers
	const handleMenuClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		setPressedButton(event.currentTarget.classList);
		if (!propagateMenuClick) {
			// stop click event on the menu item from being bubble up to parent
			event.stopPropagation();
		}
		// when items is passed down as empty [] this condition makes sure that menu doesn't open with empty paper.
		if (items?.length) {
			setAnchorEl(event.currentTarget);
		}
		// maintain the pressed state when the menu is open
		event.currentTarget.classList.toggle("pressed");
		// when defined, execute the callback -- caller can check for "pressed"
		if (buttonProps.onClick) {
			buttonProps.onClick(event);
		}
	};

	const handleMenuClose = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		// remove the pressed state when menu is closed
		pressedButton?.remove("pressed");
		setPressedButton(pressedButton);
		// don't bubble click event on menu closed by user clicking on any area in the window
		event.stopPropagation();
		setAnchorEl(null);
		// reset scroll position onClose
		resetScrollPosition();
	};

	// group items based on categoryHeading if provided
	const groupedItems = groupBy(items, (item: SolaceMenuItemProps) => item.categoryHeading);

	const groupCount = useMemo(() => {
		return Object.keys(groupedItems).filter((key) => key !== "undefined").length;
	}, [groupedItems]);

	/**
	 * The maxHeight is calculated based on how many items to be displayed, how many group headings to be displayed, whether there is main header,
	 * for example, 9 is the default value numOfMenuItemDisplayed, in this case
	 * maxHeight = itemHeight * 9 + 4.5 (half itemHeight) + 8 (top/bottom padding) + groupHeadingCount * HEADING_HEIGHT + header * HEADING_HEIGHT
	 * so the bottom stops at exactly 9.5 item position
	 */
	const maxHeight = useMemo(() => {
		return (
			itemHeight * numOfMenuItemDisplayed +
			itemHeight / 2 +
			groupCount * HEADING_HEIGHT +
			(header ? 1 : 0) * HEADING_HEIGHT +
			8
		);
	}, [groupCount, header, itemHeight, numOfMenuItemDisplayed]);

	const hasMoreItems = useMemo(() => {
		if (items) {
			return items.length > numOfMenuItemDisplayed;
		}

		return false;
	}, [items, numOfMenuItemDisplayed]);

	// render Menu Items
	// creating itemsList under each categoryHeading, if no categoryheadig is provided it will be just list of menuItems
	const menuItemsList = Object.keys(groupedItems).map((categoryHeading) => {
		const list = [];
		const categoryheader =
			categoryHeading === "undefined" ? null : (
				<ListSubheader className="categoryHeader" key={categoryHeading}>
					{categoryHeading}
				</ListSubheader>
			);
		list.push(categoryheader);

		const itemsList = groupedItems[categoryHeading].map((item, index) => {
			const menuItemContent = (
				<SolaceMenuItem
					id={item.id}
					key={index}
					name={item?.name}
					subText={item?.subText}
					supplementalText={item?.supplementalText}
					dataQa={item?.dataQa}
					dataTags={item?.dataTags}
					closeOnSelect={closeOnSelect}
					divider={!!item?.divider}
					disabled={!!item?.disabled}
					icon={item?.icon}
					secondaryAction={item?.secondaryAction}
					onMenuItemClick={item?.onMenuItemClick}
					onMenuClose={handleMenuClose}
					subMenuItems={item?.subMenuItems}
					selected={item?.selected}
					itemHeight={itemHeight}
				/>
			);

			const disabledMenuItemWithTooltip = (
				<SolaceTooltip title={item.disabledMenuItemTooltipContent || "This menuItem is disabled."}>
					<span>{menuItemContent}</span>
				</SolaceTooltip>
			);

			return item.disabled && item.disabledMenuItemTooltipContent ? disabledMenuItemWithTooltip : menuItemContent;
		});
		list.push(itemsList);
		return list;
	});

	useEffect(() => {
		const menuElement = menuPopoverRef;
		menuElement?.addEventListener("scroll", onScrollHandler);
		return () => {
			menuElement?.removeEventListener("scroll", onScrollHandler);
		};
	}, [menuPopoverRef, onScrollHandler]);

	return (
		<Fragment>
			<SolaceButton aria-label={getActionMenuAriaLabel()} {...buttonProps} onClick={handleMenuClick} />

			{/* 
				Popover is used to sit right underneath of <Menu /> to give the desired box-shadow style after maskImage effect is applied.
				The component has the same width/height, anchor position, transformOrigin & onClose trigger as <Menu />, so to keep the two component synced in style and behaviour.
			*/}
			{hasMoreItems && (
				<Popover
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					anchorOrigin={anchorOrigin}
					transformOrigin={transformOrigin}
					onClose={handleMenuClose}
					className="SolaceMenuPopover"
					PaperProps={{
						style: {
							width: menuPopoverRef?.offsetWidth,
							height: menuPopoverRef?.offsetHeight
						}
					}}
					transitionDuration={303} // to match the transitionDuration value of <Menu />
				/>
			)}
			<Menu
				id={id}
				key={`key-${id}`}
				data-qa={dataQa}
				data-tags={dataTags}
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				anchorOrigin={anchorOrigin}
				transformOrigin={transformOrigin}
				onClose={handleMenuClose}
				slotProps={{
					paper: {
						style: {
							maxHeight: `${maxHeight}px`,
							maskImage: hasMoreItems ? maskImage : "none",
							WebkitMaskImage: hasMoreItems ? maskImage : "none",
							maxWidth: `${maxWidth}px`
						},

						ref: (ref) => {
							setMenuPopoverRef(ref); // ref setter on the Paper component
						},
						onClick: (event) => {
							// stop click event on the paper from being bubble up to parent
							// clicking on menu item inside the paper should trigger the menu item click event,
							// and that onClick handler will also stop the event from being bubble up to parent
							event.stopPropagation();
						}
					}
				}}
				className="SolaceMenu"
			>
				{header && <ListSubheader>{header}</ListSubheader>}
				{flatten(menuItemsList)}
			</Menu>
		</Fragment>
	);
}
