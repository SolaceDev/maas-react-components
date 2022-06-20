import React, { Fragment, useState } from "react";
import { Menu, ListSubheader, Popover } from "@mui/material";
import { groupBy, flatten } from "lodash";
import SolaceComponentProps from "./SolaceComponentProps";
import SolaceButton, { SolaceButtonProps } from "./form/SolaceButton";
import SolaceMenuItem, { SolaceMenuItemProps } from "./SolaceMenuItem";
import { useScrollIndicator } from "../hooks/useScrollIndicator";

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
}

const DEFAULT_NUM_OF_MENUITEM_DISPLAYED = 9;

export default function SolaceMenu(props: SolaceMenuProps): JSX.Element {
	const {
		id = "solace-menu",
		buttonProps,
		items,
		header,
		numOfMenuItemDisplayed = DEFAULT_NUM_OF_MENUITEM_DISPLAYED,
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

	// handlers
	const handleMenuClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (!propagateMenuClick) {
			// stop click event on the menu item from being bubble up to parent
			event.stopPropagation();
		}
		//when items is passed down as empty [] this condition makes sure that menu doesn't open with empty paper.
		if (items?.length) {
			setAnchorEl(event.currentTarget);
		}
	};

	const handleMenuClose = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		// don't bubble click event on menu closed by user clicking on any area in the window
		event.stopPropagation();
		setAnchorEl(null);
		// reset scroll position onClose
		resetScrollPosition();
	};

	// group items based on categoryHeading if provided
	const groupedItems = groupBy(items, (item: SolaceMenuItemProps) => item.categoryHeading);

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

		const itemsList = groupedItems[categoryHeading].map((item, index) => (
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
				itemHeight={itemHeight}
			/>
		));
		list.push(itemsList);
		return list;
	});

	return (
		<Fragment>
			<SolaceButton {...buttonProps} onClick={handleMenuClick} />

			{/* 
				Popover is used to sit right underneath of <Menu /> to give the desired box-shadow style after maskImage effect is applied.
				The component has the same width/height, anchor position, transformOrigin & onClose trigger as <Menu />, so to keep the two component synced in style and behaviour.
			*/}
			{items && items.length > numOfMenuItemDisplayed && (
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
				onScroll={onScrollHandler}
				PaperProps={{
					style: {
						/**
						 * the maxHeight is calculated based on how many items to be displayed,
						 * for example, 9 is the default value numOfMenuItemDisplayed, in this case
						 * maxHeight = itemHeight * 9 + 4.5 (half itemHeight) + 8 (top/bottom padding)
						 * so the bottom stops at exactly 9.5 item position
						 */
						maxHeight: `${itemHeight * numOfMenuItemDisplayed + itemHeight / 2 + 8}px`,
						maskImage: items && items.length > numOfMenuItemDisplayed ? maskImage : "none",
						WebkitMaskImage: items && items.length > numOfMenuItemDisplayed ? maskImage : "none"
					},
					ref: (ref) => {
						setMenuPopoverRef(ref); // ref setter on the Paper component
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
