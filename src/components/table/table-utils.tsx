import React from "react";
import { StyledTableHeader } from "./hooks/useSolaceTable";
import SolaceButton from "./../form/SolaceButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { styled } from "@material-ui/core";
import { BASE_COLORS } from "./../../resources/colorPallette";
import ActionMenu from "./components/ActionMenu";
import ColumnHidingControlMenu from "./components/ColumnHidingControlMenu";
import SettingsIcon from "@material-ui/icons/Settings";

export interface TableColumn {
	field: string;
	headerName: string;
	class?: string;
	width?: number;
	sortable: boolean;
	sortDirection?: SORT_DIRECTION;
	disableHiding: boolean;
	resizable?: boolean;
	hasNoCell?: boolean;
	isHidden?: boolean;
}

export interface TableRow {
	id: string;
	[key: string]: any;
}

export interface TableActionMenuItem {
	name: string;
	callback: (row: TableRow) => void;
	disabled?: boolean;
	hidden?: boolean;
	dataQa?: string;
	id?: string;
}

export enum SELECTION_TYPE {
	SINGLE = "single",
	MULTI = "multi",
	NONE = "none"
}

export enum SORT_DIRECTION {
	ASC = "asc",
	DCS = "desc"
}

export const ActionMenuContainer = styled("div")(({ theme }) => ({
	position: "absolute",
	display: "block",
	top: "10px",
	right: "10px",
	padding: `${theme.spacing()} 0`,
	border: `1px solid ${BASE_COLORS.greys.grey0}`,
	borderRadius: "5px",
	minHeight: "32px",
	minWidth: "60px",
	background: theme.palette.background.default,
	zIndex: 999
}));

export const StyledRelativeTableData = styled("td")(({ theme }) => ({
	borderCollapse: "collapse",
	borderBottom: "1px solid #e8e8e8",
	padding: theme.spacing(),
	position: "relative"
}));

export const StyledActionItem = styled("div")(({ theme }) => ({
	minWidth: "60px",
	padding: `${theme.spacing()} ${theme.spacing(2)}`,
	cursor: "pointer",
	"&:hover": {
		background: "#e5e5e5"
	}
}));

export const addEmptyHeaderCell = (): React.ReactNode => {
	return <StyledTableHeader key={"emptyHeaderCell"}></StyledTableHeader>;
};

export const addActionMenuIcon = (
	row: TableRow,
	isActionMenuOpen: boolean,
	openRowActionMenu: (e: React.MouseEvent<HTMLElement>, row: TableRow) => void,
	actionMenuItems: TableActionMenuItem[],
	setRowWithOpenActionMenu: Function
): React.ReactNode => {
	return (
		<StyledRelativeTableData key={`${row.id}_ActionMenu`}>
			<SolaceButton variant={"icon"} onClick={(e) => openRowActionMenu(e, row)}>
				<MoreHorizIcon />
			</SolaceButton>
			{isActionMenuOpen && (
				<ActionMenu actionMenuItems={actionMenuItems} row={row} setRowWithOpenActionMenu={setRowWithOpenActionMenu} />
			)}
		</StyledRelativeTableData>
	);
};

export const addColumnHidingControl = (
	columns: TableColumn[],
	openColumnHidingControl: (e: React.MouseEvent<HTMLElement>) => void,
	isColumnHidingControlOpen: boolean,
	setIsColumnHidingControlOpen: Function,
	setRenderedColumns: Function
): React.ReactNode => {
	return (
		<StyledTableHeader key={"column-hiding-control"}>
			<SolaceButton variant={"icon"} onClick={(e) => openColumnHidingControl(e)}>
				<SettingsIcon />
			</SolaceButton>
			{isColumnHidingControlOpen && (
				<ColumnHidingControlMenu
					columns={columns}
					onCloseCallback={setIsColumnHidingControlOpen}
					setRenderedColumns={setRenderedColumns}
				/>
			)}
		</StyledTableHeader>
	);
};
