import SolaceMenu from "../SolaceMenu";
import { SolaceMenuItemProps } from "../SolaceMenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { styled } from "@mui/material";
import ColumnControlMenu, { ColumnControProps } from "./components/ColumnControlMenu";
import { appTheme } from "../../theming/themeUtils";
import { SupportedThemes } from "../../types/supportedThemes";

export interface TableColumn {
	field: string;
	headerName: string;
	class?: string;
	width?: number | string;
	sortable: boolean;
	sortDirection?: SORT_DIRECTION;
	disableHiding: boolean;
	resizable?: boolean;
	hasNoCell?: boolean;
	isHidden?: boolean;
	tooltip?: boolean;
	isNumerical?: boolean;
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
	":not(:last-child)": {
		borderBottom: `1px solid ${theme.palette.ux.secondary.w20}`
	},
	"&.expanded": {
		borderBottom: "none",
		"&:hover": {
			"+ tr.expanded": {
				":not(.selected)": {
					backgroundColor: theme.palette.ux.secondary.w10
				}
			},
			"+ tr.expanded.selected": {
				":not(.selected)": {
					backgroundColor: theme.palette.ux.secondary.w10
				}
			}
		}
	},

	height: "40px",
	"&.header": {
		height: "56px",
		borderBottom: `1px solid ${theme.palette.ux.secondary.w20}`
	},

	"&.clickable": {
		cursor: "pointer"
	},

	"&.selected": {
		// remove "solace" option when new palette is adopted
		backgroundColor: appTheme === SupportedThemes.solace ? theme.palette.ux.brand.w10 : theme.palette.ux.secondary.w20,
		// selected effect for expanded sibling row
		"+ tr.expanded.selected": {
			backgroundColor:
				// remove "solace" option when new palette is adopted
				appTheme === SupportedThemes.solace ? theme.palette.ux.brand.w10 : theme.palette.ux.secondary.w20
		}
	},

	"&:hover": {
		":not(.selected)": {
			background: theme.palette.ux.secondary.w10
		},

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
	padding: `${theme.spacing()} ${theme.spacing(2)}`,
	height: "24px",
	".cursor-pointer": {
		cursor: "pointer"
	},
	"&.checkbox, &.expand-icon": {
		paddingRight: 0
	},
	"&.expand-icon .chevron": {
		fill: theme.palette.ux.secondary.wMain,
		"&.expanded": {
			transform: "rotate(90deg)"
		}
	},
	"button:hover": {
		backgroundColor: theme.palette.ux.deprecated.primary.w20
	},
	maxWidth: "0",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	borderRadius: 0
}));

export const StyledTableNumberData = styled(StyledTableData)(() => ({
	textAlign: "right"
}));

export const StyledExpandedTableRow = styled("tr")(({ theme }) => ({
	borderCollapse: "collapse",
	borderBottom: `1px solid ${theme.palette.ux.secondary.w20}`,
	"&.clickable": {
		cursor: "pointer"
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

export const StyledTableHeader = styled("th", { shouldForwardProp: (prop) => prop !== "width" })<{ width?: string }>(
	({ theme, width }) => ({
		borderCollapse: "collapse",
		padding: `0 ${theme.spacing(2)}`,
		fontSize: theme.typography.fontSize,
		fontWeight: 500,
		minWidth: "30px",
		height: "48px",
		textAlign: "left",
		width: width,
		"& .header": {
			minWidth: "50px",
			display: "flex",
			alignItems: "center",
			color: theme.palette.ux.primary.text.wMain,
			"&.sortable": {
				position: "relative",
				cursor: "pointer",
				// resting/active
				"svg.asc, svg.desc": {
					path: {
						fill: theme.palette.ux.secondary.wMain
					}
				},
				// resting/inactive
				"svg.unsorted": {
					path: {
						fill: theme.palette.ux.secondary.w40
					}
				},
				// hover
				"&:hover": {
					"svg.asc, svg.desc, svg.unsorted": {
						path: {
							fill: theme.palette.ux.primary.text.wMain
						}
					}
				},
				// pressed
				"&:active": {
					"svg.asc, svg.desc, svg.unsorted": {
						path: {
							fill: theme.palette.ux.primary.text.wMain
						}
					}
				}
			}
		},
		"&.checkbox-column, &.expand-column": {
			minWidth: 0, // For Firefox support, see: https://developer.mozilla.org/en-US/docs/Web/CSS/min-width
			paddingRight: 0,
			width: "24px"
		},
		"&.icon-column": {
			width: "50px",
			textAlign: "center",
			position: "relative"
		},
		"&.number-column .header": {
			justifyContent: "flex-end"
		}
	})
);

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
					buttonProps={{ variant: "icon", children: <MoreHorizIcon />, title: "More Actions" }}
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

export const addColumnHidingControl = ({
	columns,
	displayedColumnsChangedCallback
}: ColumnControProps): React.ReactNode => {
	return (
		<StyledTableHeader key={"column-hiding-control"} className="icon-column">
			<ColumnControlMenu
				id={"column-hiding-control"}
				columns={columns}
				displayedColumnsChangedCallback={displayedColumnsChangedCallback}
			/>
		</StyledTableHeader>
	);
};
