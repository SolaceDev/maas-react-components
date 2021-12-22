import React, { useRef } from "react";
import { TableRow, TableActionMenuItem } from "../table-utils";
import { styled } from "@material-ui/core";
import { BASE_COLORS } from "../../../resources/colorPallette";
import { useOutsideClicked } from "../hooks/useClickedOutside";
import SolaceComponentProps from "../../SolaceComponentProps";

export const ActionMenuContainer = styled("div")(({ theme }) => ({
	position: "absolute",
	display: "block",
	top: "30px",
	right: "40px",
	padding: `${theme.spacing()} 0`,
	boxShadow: `0 1px 4px ${BASE_COLORS.greys.grey3}`,
	borderRadius: "4px",
	minHeight: "32px",
	minWidth: "60px",
	background: BASE_COLORS.whites.white1,
	zIndex: 3
}));

export const StyledActionItem = styled("div")(({ theme }) => ({
	minWidth: "60px",
	padding: `${theme.spacing()} ${theme.spacing(2)}`,
	cursor: "pointer",
	whiteSpace: "nowrap",
	textAlign: "left",
	"&:hover": {
		background: "#e5e5e5"
	},
	"&.disabled-item": {
		opacity: 0.5,
		pointerEvents: "none"
	}
}));

interface ActionMenuPropType extends SolaceComponentProps {
	id?: string;
	actionMenuItems: TableActionMenuItem[];
	row: TableRow;
	setRowWithOpenActionMenu: (value: React.SetStateAction<string | null | undefined>) => void;
}

const ActionMenu = ({ actionMenuItems, row, setRowWithOpenActionMenu }: ActionMenuPropType): JSX.Element => {
	const actionMenuRef = useRef(null);
	useOutsideClicked(actionMenuRef, setRowWithOpenActionMenu);

	const handleActionMenuClick = (item: TableActionMenuItem) => {
		setRowWithOpenActionMenu(null);
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
