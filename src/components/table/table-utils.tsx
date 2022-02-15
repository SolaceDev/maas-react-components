import SolaceButton from "./../form/SolaceButton";
import SolaceMenu, { SolaceMenuItemProps } from "../SolaceMenu";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { styled } from "@material-ui/core";
import { BASE_COLORS } from "./../../resources/colorPallette";
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

export interface TableActionMenuItem extends SolaceMenuItemProps {
	callback: (row: TableRow) => void;
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
		padding: "10px 6px 6px 0",
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
	borderBottom: `1px solid ${BASE_COLORS.greys.grey24}`
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

export const StyledTableHeader = styled("th", { shouldForwardProp: (prop) => prop !== "width" })<{ width?: string }>(
	({ theme, width }) => ({
		borderCollapse: "collapse",
		padding: `0 ${theme.spacing()}`,
		fontSize: theme.typography.fontSize,
		fontWeight: 500,
		minWidth: "30px",
		height: "48px",
		textAlign: "left",
		width: width,
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
			width: "32px",
			paddingLeft: 0,
			paddingRight: 0
		}
	})
);

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

export const addEmptyRowCell = (row: TableRow): React.ReactNode => {
	return <StyledTableData key={row.id + "_emptyRowCell"}></StyledTableData>;
};

export const addActionMenuIcon = (row: TableRow, actionMenuItems: TableActionMenuItem[]): React.ReactNode => {
	const menuItems =
		actionMenuItems && actionMenuItems.length > 0
			? actionMenuItems.map((item) => ({
					...item,
					onMenuItemClick: () => {
						item.callback(row);
					}
			  }))
			: null;
	return (
		<StyledTableData
			key={row.id + "_actionMenu"}
			style={{ textAlign: "center", paddingTop: "4px", paddingBottom: "4px" }}
		>
			{menuItems && (
				<SolaceMenu
					buttonProps={{ variant: "icon", children: <MoreHorizIcon /> }}
					items={menuItems}
					anchorOrigin={{
						vertical: "center",
						horizontal: "left"
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "right"
					}}
				/>
			)}
		</StyledTableData>
	);
};

export interface ColumnHidingControlProps {
	columns: TableColumn[];
	openColumnHidingControl: (e: React.MouseEvent<HTMLElement>) => void;
	isColumnHidingControlOpen: boolean;
	setIsColumnHidingControlOpen: (value: React.SetStateAction<boolean>) => void;
	displayedColumnsChangedCallback?: (displayedColumns: TableColumn[]) => void;
}

export const addColumnHidingControl = ({
	columns,
	openColumnHidingControl,
	isColumnHidingControlOpen,
	setIsColumnHidingControlOpen,
	displayedColumnsChangedCallback
}: ColumnHidingControlProps): React.ReactNode => {
	return (
		<StyledTableHeader key={"column-hiding-control"} className="icon-column">
			<SolaceButton variant={"icon"} onClick={(e) => openColumnHidingControl(e)}>
				<TuneIcon />
			</SolaceButton>
			{isColumnHidingControlOpen && (
				<ColumnHidingControlMenu
					columns={columns}
					onCloseCallback={setIsColumnHidingControlOpen}
					displayedColumnsChangedCallback={displayedColumnsChangedCallback}
				/>
			)}
		</StyledTableHeader>
	);
};
