import { ListItemIcon, Menu, MenuItem, Grid, ListSubheader, Typography, useTheme } from "@mui/material";
import { Fragment, useState } from "react";
import SolaceButton, { SolaceButtonProps } from "./form/SolaceButton";
import SolaceComponentProps from "./SolaceComponentProps";
import { groupBy, flatten } from "lodash";
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
}

interface SolaceMenuProps extends SolaceComponentProps {
	id?: string;
	/**
	 * Attributes to customize menu button
	 */
	buttonProps: SolaceButtonProps;
	/**
	 * An array of options when using default menu (TODO: nested menus )
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
}

export default function SolaceMenu(props: SolaceMenuProps): JSX.Element {
	const {
		id = "solace-menu",
		buttonProps,
		items,
		header,
		multiline = false,
		propagateMenuClick = false,
		closeOnSelect = true,
		anchorOrigin = { vertical: "bottom", horizontal: "left" },
		transformOrigin = { vertical: "top", horizontal: "left" },
		dataQa,
		dataTags
	} = props;

	const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const itemHeight = multiline ? 58 : 38;
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
	};

	// group items based on categoryHeading if provided
	const groupedItems = groupBy(items, (item: SolaceMenuItemProps) => item.categoryHeading);

	//creating itemsList under each categoryHeading, if no categoryheadig is provided it will be just list of menuItems
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
			<MenuItem
				id={item.id}
				key={index}
				data-qa={item?.dataQa}
				data-tags={item?.dataTags}
				onClick={(e) => {
					// stop click event on the menu item from being bubbled up to parent, causing unexpected extra click event
					e.stopPropagation();
					if (closeOnSelect) {
						handleMenuClose(e);
					}
					if (item.onMenuItemClick) {
						item.onMenuItemClick(e);
					}
				}}
				divider={!!item?.divider}
				disabled={!!item?.disabled}
				className={clsx({
					multiline: !!item?.subText && typeof item.name === "string",
					wideMenu: !!item?.supplementalText && typeof item.name === "string"
				})}
			>
				{typeof item.name === "string" ? (
					<>
						{item?.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
						<Grid container direction={"column"} justifyContent="center">
							<Grid container justifyContent={"space-between"} direction={"row"} alignItems={"center"}>
								<Typography variant="body1" noWrap>
									{item.name}
								</Typography>
								{item?.supplementalText && (
									<Grid className="supplementalText" item>
										{item?.supplementalText}
									</Grid>
								)}
							</Grid>

							{item?.subText && (
								<Grid className="subtext" item>
									<span className="subtext">{item?.subText}</span>
								</Grid>
							)}
						</Grid>

						{item?.secondaryAction && (
							<Grid container sx={{ marginLeft: theme.spacing(3) }} alignItems={"center"}>
								{item.secondaryAction}
							</Grid>
						)}
					</>
				) : (
					item.name
				)}
			</MenuItem>
		));
		list.push(itemsList);
		return list;
	});

	return (
		<Fragment>
			<SolaceButton {...buttonProps} onClick={handleMenuClick} />
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
				PaperProps={{
					style: {
						maxHeight: `${itemHeight * 9.5}px`
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
