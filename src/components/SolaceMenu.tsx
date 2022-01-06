import { ListItemIcon, Menu, MenuItem, Grid, ListSubheader } from "@material-ui/core";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import { Fragment, useState } from "react";
import SolaceButton from "./form/SolaceButton";
import { groupBy, flatten } from "lodash";
import clsx from "clsx";

export interface SolaceMenuItemProps {
	/**
	 * name attribute to show as menu item label
	 */
	name: string;
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

	onMenuItemClick: (index: number) => void;
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

interface SolaceMenuProps {
	index: number;
	/**
	 * An array of options when using default menu
	 */
	items?: SolaceMenuItemProps[];
	/**
	 * Header of menu when using default menu
	 */
	header?: string;

	disableButton?: boolean;
	/**
	 * optional attribute to change the position of menu popper only for default menu
	 */
	anchorOrigin?: { vertical: "top" | "center" | "bottom"; horizontal: "left" | "center" | "right" };
	/**
	 * optional boolean flag to adjust the maxHeight of menu default is set to false
	 */
	multiline?: boolean;
	/**
	 * To render custom menuItems
	 * (note1: this is to cover special cases where we need checkbox or radio button added to menu items
	 * note2:if CustomMenuItems is provided, the items prop is nolonger valid)
	 */
	renderCustomMenuItems?: (index: number) => React.ReactNode;
}

export default function SolaceMenu(props: SolaceMenuProps): JSX.Element {
	const {
		index,
		items,
		header,
		disableButton,
		multiline = false,
		anchorOrigin = { vertical: "bottom", horizontal: "left" },
		renderCustomMenuItems
	} = props;

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const itemHeight = multiline ? 58 : 38;
	const handleMenuClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};
	const groupedItems = groupBy(items, (item: SolaceMenuItemProps) => item.categoryHeading);

	const menuItemsList = Object.keys(groupedItems).map((categoryHeading) => {
		const list = [];
		const categoryheader =
			categoryHeading === "undefined" ? null : (
				<ListSubheader className="categoryHeader" key={categoryHeading}>
					{categoryHeading}
				</ListSubheader>
			);
		list.push(categoryheader);
		const itemsList = groupedItems[categoryHeading].map((item) => (
			<MenuItem
				id={`${item.name}-${index}`}
				key={`${item.name}-${index}`}
				onClick={() => {
					handleMenuClose();
					item.onMenuItemClick(index);
				}}
				divider={!!item?.divider}
				disabled={!!item?.disabled}
				className={clsx({ multiline: !!item?.subText, wideMenu: !!item?.supplementalText })}
			>
				{item?.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
				<Grid container direction={"column"} justifyContent="center">
					<Grid container justifyContent={"space-between"} direction={"row"} alignItems={"center"}>
						<Grid item>{item.name}</Grid>
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
					<Grid item sx={{ marginLeft: "24px" }}>
						{item.secondaryAction}
					</Grid>
				)}
			</MenuItem>
		));
		list.push(itemsList);
		return list;
	});

	return (
		<Fragment>
			<SolaceButton
				id={`moreButton-${index}`}
				key={`key-moreButton-${index}`}
				onClick={handleMenuClick}
				isDisabled={disableButton}
				variant="icon"
			>
				<MoreHorizOutlinedIcon />
			</SolaceButton>

			<Menu
				id={`menu-${index}`}
				key={`key-menu-${index}`}
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				anchorOrigin={anchorOrigin}
				onClose={handleMenuClose}
				PaperProps={{
					style: {
						maxHeight: `${itemHeight * 9.5}px`
					}
				}}
			>
				{header && <ListSubheader>{header}</ListSubheader>}
				{renderCustomMenuItems ? renderCustomMenuItems(index) : flatten(menuItemsList)}
			</Menu>
		</Fragment>
	);
}
