import { ListItemIcon, Menu, MenuItem } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import { SxProps } from "@material-ui/system";
import React from "react";

import SolaceButton from "./form/SolaceButton";

interface SolaceMenuPopperProps {
	index: number;
	items: { title: string; onMenuItemClick: (index: number) => void }[];
	disableButton?: boolean;
	showIcons?: boolean;
	buttonStyle?: SxProps;
}

export default function SolaceMenuPopper(props: SolaceMenuPopperProps): JSX.Element {
	const { index, items, disableButton, showIcons } = props;
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleMenuClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const iconMapping: { [key: string]: JSX.Element } = {
		Edit: <EditOutlinedIcon fontSize="small" />,
		Delete: <DeleteOutlineOutlinedIcon fontSize="small" />
	};

	return (
		<React.Fragment>
			<SolaceButton
				id={`moreButton-${index}`}
				key={`key-moreButton-${index}`}
				// sx={props.buttonStyle}
				onClick={handleMenuClick}
				isDisabled={disableButton}
				variant="icon"
				// color="default"
				// size="medium"
			>
				<MoreHorizOutlinedIcon />
			</SolaceButton>
			<Menu
				id={`menu-${index}`}
				key={`key-menu-${index}`}
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
			>
				{items.map((item) => (
					<MenuItem
						id={`${item.title}-${index}`}
						key={`${item.title}-${index}`}
						onClick={() => {
							handleMenuClose();
							item.onMenuItemClick(index);
						}}
					>
						{showIcons && <ListItemIcon>{iconMapping[item.title]}</ListItemIcon>}
						{item.title}
					</MenuItem>
				))}
			</Menu>
		</React.Fragment>
	);
}

SolaceMenuPopper.defaultProps = {
	showIcons: false
};
