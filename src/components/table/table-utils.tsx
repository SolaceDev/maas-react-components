import SolaceButton from "./../form/SolaceButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { styled } from "@material-ui/core";
import { BASE_COLORS } from "./../../resources/colorPallette";
import ActionMenu from "./components/ActionMenu";
import ColumnHidingControlMenu from "./components/ColumnHidingControlMenu";
import TuneIcon from "@material-ui/icons/Tune";

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

export const StyledTableRow = styled("tr")(({ theme }) => ({
	borderCollapse: "collapse",
	borderBottom: `1px solid ${BASE_COLORS.greys.grey24}`,
	"&.expanded": {
		borderBottom: "none"
	},
	"&:not(.header)": {
		"&:last-of-type": {
			borderBottom: "none"
		}
	},

	height: "32px",
	"&.header": {
		height: "48px"
	},

	"&.clickable": {
		cursor: "pointer"
	},

	"&.selected": {
		backgroundColor: `${BASE_COLORS.greens.green10}`,
		// selected effect for expanded sibling row
		"+ tr.expanded.selected": {
			backgroundColor: `${BASE_COLORS.greens.green10}`
		}
	},

	"&:hover": {
		background: `${BASE_COLORS.greys.grey24}`,
		"&.header": {
			background: "transparent"
		},
		// hover effect for expanded sibling row
		"+ tr.expanded": {
			background: `${BASE_COLORS.greys.grey24}`
		},
		"&.selected + tr.expanded": {
			background: `${BASE_COLORS.greys.grey24}`
		}
	},

	"td:first-of-type, th:first-of-type": {
		paddingLeft: `${theme.spacing(2)}`
	}
}));

export const StyledTableData = styled("td")(({ theme }) => ({
	borderCollapse: "collapse",
	padding: theme.spacing(),
	height: "24px",
	".cursor-pointer": {
		cursor: "pointer"
	},
	"&.checkbox": {
		textAlign: "center"
	},
	"&.expand-icon": {
		padding: "10px 8px 6px 0",
		".chevron": {
			transform: "rotate(180deg)",
			"&.expanded": {
				transform: "rotate(270deg)"
			}
		}
	},
	maxWidth: "0",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	borderRadius: 0
}));

export const StyledExpandedTableRow = styled("tr")(() => ({
	borderCollapse: "collapse",
	borderBottom: `1px solid ${BASE_COLORS.greys.grey24}`,
	"&:last-of-type": {
		borderBottom: "none"
	}
}));

export const StyledExpandedTableData = styled("td")({
	borderCollapse: "collapse",
	padding: 0,
	maxWidth: "0",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	borderRadius: 0
});

export const StyledTableHeader = styled("th")(({ theme }) => ({
	borderCollapse: "collapse",
	padding: `0 ${theme.spacing()}`,
	fontSize: theme.typography.subtitle1.fontSize,
	fontWeight: 500,
	minWidth: "30px",
	height: "48px",
	textAlign: "left",
	"& .sortable": {
		position: "relative",
		cursor: "pointer",
		marginTop: theme.spacing(0.5)
	},
	"&.checkbox-column": {
		width: "40px",
		textAlign: "center",
		position: "relative"
	},
	"&.icon-column": {
		width: "50px",
		textAlign: "center",
		position: "relative"
	},
	"&.expand-column": {
		width: "36px",
		paddingLeft: 0,
		paddingRight: 0
	}
}));

export const ActionMenuContainer = styled("div")(({ theme }) => ({
	position: "absolute",
	display: "block",
	top: "10px",
	right: "10px",
	padding: `${theme.spacing()} 0`,
	border: `1px solid ${BASE_COLORS.greys.grey1}`,
	borderRadius: "5px",
	minHeight: "32px",
	minWidth: "60px",
	background: theme.palette.background.default,
	zIndex: 999
}));

export const StyledRelativeTableData = styled("td")(({ theme }) => ({
	borderCollapse: "collapse",
	padding: theme.spacing(),
	position: "relative",
	textAlign: "center"
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
	return <StyledTableHeader className="icon-column" key={"emptyHeaderCell"}></StyledTableHeader>;
};

export const addEmptyRowCell = (): React.ReactNode => {
	return <StyledTableData key={"emptyRowCell"}></StyledTableData>;
};

export const addActionMenuIcon = (
	row: TableRow,
	isActionMenuOpen: boolean,
	openRowActionMenu: (e: React.MouseEvent<HTMLElement>, row: TableRow) => void,
	actionMenuItems: TableActionMenuItem[],
	setRowWithOpenActionMenu: (value: React.SetStateAction<string | null | undefined>) => void
): React.ReactNode => {
	return (
		<StyledRelativeTableData key={`${row.id}_ActionMenu`} style={{ paddingTop: "4px", paddingBottom: "4px" }}>
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
	setIsColumnHidingControlOpen: (value: React.SetStateAction<boolean>) => void,
	setDisplayedColumns: (displayedColumns: TableColumn[]) => void,
	displayedColumnsChangedCallback?: (displayedColumns: TableColumn[]) => void
): React.ReactNode => {
	return (
		<StyledTableHeader key={"column-hiding-control"} className="icon-column">
			<SolaceButton variant={"icon"} onClick={(e) => openColumnHidingControl(e)}>
				<TuneIcon />
			</SolaceButton>
			{isColumnHidingControlOpen && (
				<ColumnHidingControlMenu
					columns={columns}
					onCloseCallback={setIsColumnHidingControlOpen}
					setDisplayedColumns={setDisplayedColumns}
					displayedColumnsChangedCallback={displayedColumnsChangedCallback}
				/>
			)}
		</StyledTableHeader>
	);
};
