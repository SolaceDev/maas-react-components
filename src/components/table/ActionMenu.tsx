import React, { useRef } from "react";
import { TableRow, TableActionMenuItem } from "./table-utils";
import { styled } from "@material-ui/core";
import { BASE_COLORS } from "./../../resources/colorPallette";
import { useOutsideClicked } from "./useClickedOutside";

export const ActionMenuContainer = styled("div")(({ theme }) => ({
	position: "absolute",
	display: "block",
	top: "30px",
	right: "50px",
	padding: `${theme.spacing()} 0`,
	border: `1px solid ${BASE_COLORS.greys.grey0}`,
	borderRadius: "5px",
	minHeight: "32px",
	minWidth: "60px",
	background: theme.palette.background.default,
	zIndex: 3
}));

export const StyledActionItem = styled("div")(({ theme }) => ({
	minWidth: "60px",
	padding: `${theme.spacing()} ${theme.spacing(2)}`,
	cursor: "pointer",
	"&:hover": {
		background: "#e5e5e5"
	},
	"&.disabled-item": {
		opacity: 0.5,
		"pointer-events": "none"
	}
}));

const ActionMenu = ({
	actionMenuItems,
	row,
	setRowWithOpenActionMenu
}: {
	actionMenuItems: TableActionMenuItem[];
	row: TableRow;
	setRowWithOpenActionMenu: Function;
}): JSX.Element => {
	const actionMenuRef = useRef(null);
	useOutsideClicked(actionMenuRef, setRowWithOpenActionMenu);

	const handleActionMenuClick = (item: TableActionMenuItem) => {
		setRowWithOpenActionMenu();
		item.callback(row);
	};

	return (
		<ActionMenuContainer onClick={(e) => e.stopPropagation()} ref={actionMenuRef}>
			{actionMenuItems.map(
				(item: TableActionMenuItem) =>
					!item.hidden && (
						<StyledActionItem
							key={item.name}
							className={item.disabled ? "disabled-item" : ""}
							onClick={() => handleActionMenuClick(item)}
						>
							{item.name}
						</StyledActionItem>
					)
			)}
		</ActionMenuContainer>
	);
};

export default ActionMenu;
