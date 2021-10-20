import React, { useCallback, useEffect, useState, useRef } from "react";
import {
	TableColumn,
	TableRow,
	TableActionMenuItem,
	SELECTION_TYPE,
	SORT_DIRECTION,
	addEmptyHeaderCell,
	addActionMenuIcon,
	addColumnHidingControl
} from "../table-utils";
import { styled, useTheme } from "@material-ui/core";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Sort from "@material-ui/icons/Sort";
import SolaceCheckBox from "../../form/SolaceCheckBox";
import { BASE_COLORS } from "../../../resources/colorPallette";

export const StyledTableRow = styled("tr")(({ theme }) => ({
	borderCollapse: "collapse",
	border: `1px solid ${BASE_COLORS.greys.grey0}`,
	padding: `${theme.spacing(0.5)} ${theme.spacing()}`,
	marginLeft: theme.spacing(0.5),
	height: "32px",
	"&.selected": {
		backgroundColor: "#e8f9f4"
	},
	"&:hover": {
		background: "#e5e5e5",
		"&.header": {
			background: "transparent"
		}
	},
	"&:hover + tr td table": {
		background: "#e5e5e5"
	}
}));

export const StyledTableData = styled("td")(({ theme }) => ({
	borderCollapse: "collapse",
	borderBottom: "1px solid #e8e8e8",
	padding: theme.spacing(),
	".cursor-pointer": {
		cursor: "pointer"
	},
	"&.checkbox": {
		textAlign: "center"
	},
	maxWidth: "0",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap"
}));

export const StyledTableHeader = styled("th")(({ theme }) => ({
	borderCollapse: "collapse",
	padding: `${theme.spacing(0.5)} ${theme.spacing()}`,
	minWidth: "30px",
	minHeight: "32px",
	textAlign: "left",
	"&.sortable": {
		position: "relative",
		cursor: "pointer",
		marginTop: theme.spacing(0.5)
	},
	"&.icon-column": {
		width: "40px"
	}
}));

export interface CustomTableRowProps {
	rows: TableRow[];
	renderedColumns: TableColumn[];
	selectionType: SELECTION_TYPE;
	updateSelection: (row: TableRow) => void;
	handleCheckboxClick: (row: TableRow) => void;
	renderCustomRow: () => {
		renderRow: (customRowProps: CustomTableRowProps) => React.ReactNode;
		renderChildren: (row: TableRow) => React.ReactNode;
	};
	rowActionMenuItems?: TableActionMenuItem[];
	headerHoverCallback?: () => void;
	rowHoverCallback?: (row: TableRow) => void;
	hasColumnHiding?: boolean;
}

export interface CustomTableColumnProps {
	columns: TableColumn[];
	sortedColumn: TableColumn | undefined;
	selectAll: boolean;
	handleSort: (column: TableColumn) => void;
	handleSelectAllClick: () => void;
	addColumnHidingControl: (
		columns: TableColumn[],
		openColumnHidingControl: (e: React.MouseEvent<HTMLElement>) => void,
		isColumnHidingControlOpen: boolean,
		setIsColumnHidingControlOpen: Function,
		setRenderedColumns: Function
	) => React.ReactNode;
}

export const useSolaceTable = (
	rows: TableRow[],
	columns: TableColumn[],
	selectionType: SELECTION_TYPE,
	selectionChangedCallback: (row: TableRow[]) => void,
	sortCallback: (column: TableColumn | undefined) => void,
	preSelectedColumn: TableColumn | undefined,
	renderCustomRow?: () => {
		renderRow: (customRowProps: CustomTableRowProps) => React.ReactNode;
		renderChildren: (row: TableRow) => React.ReactNode;
	},
	renderCustomHeader?: (customColumnProps: CustomTableColumnProps) => React.ReactNode,
	rowActionMenuItems?: TableActionMenuItem[],
	headerHoverCallback?: () => void,
	rowHoverCallback?: (row: TableRow) => void,
	hasColumnHiding?: boolean
): React.ReactNode[] => {
	const [selectedRows, setSelectedRows] = useState<TableRow[]>([]);
	const [sortedColumn, setSortedColumn] = useState<TableColumn | undefined>(
		preSelectedColumn ? preSelectedColumn : columns.find((col) => col.sortable)
	);
	const [sortDirection, setSortDirection] = useState<SORT_DIRECTION>(sortedColumn?.sortDirection || SORT_DIRECTION.ASC);
	const [renderedColumns, setRenderedColumns] = useState(columns);
	const [selectAll, setSelectAll] = useState(false);
	const [rowWithOpenActionMenu, setRowWithOpenActionMenu] = useState<string>();
	const [isColumnHidingControlOpen, setIsColumnHidingControlOpen] = useState(false);

	const theme = useTheme();

	const firstRender = useRef(true);

	useEffect(() => {
		selectionChangedCallback(selectedRows);
		if (rows.length !== 0 && selectedRows.length === rows.length) {
			setSelectAll(true);
		} else {
			setSelectAll(false);
		}
	}, [selectedRows, rows.length, selectedRows.length, selectionChangedCallback]);

	useEffect(() => {
		if (!firstRender.current) {
			sortCallback(sortedColumn);
		} else {
			firstRender.current = false;
		}
	}, [sortedColumn, sortedColumn?.sortDirection, sortCallback, sortDirection]);

	function updateSelection(row: TableRow) {
		handleSelectionChanged(row);
	}

	function handleSelectionChanged(row: TableRow) {
		if (selectionType !== SELECTION_TYPE.NONE) {
			handleSingleSelection(row);
		}
	}

	function handleSingleSelection(clickedRow: TableRow) {
		clickedRow.rowSelected = selectedRows.length > 1 ? true : !clickedRow.rowSelected;
		setSelectAll(false);
		rows.map((row) => {
			if (clickedRow.id !== row.id) {
				row.rowSelected = false;
			}
		});
		setSelectedRows(clickedRow.rowSelected ? [clickedRow] : []);
	}

	const handleSort = useCallback(
		(col: TableColumn) => {
			if (sortedColumn?.field === col.field) {
				col.sortDirection = col.sortDirection === SORT_DIRECTION.DCS ? SORT_DIRECTION.ASC : SORT_DIRECTION.DCS;
				setSortDirection(col.sortDirection);
			} else {
				setSortDirection(col.sortDirection ? col.sortDirection : SORT_DIRECTION.ASC);
			}
			setSortedColumn(col);
		},
		[sortedColumn?.field]
	);

	const handleSelectAllClick = useCallback(() => {
		rows.map((row) => (row.rowSelected = !selectAll));
		setSelectedRows(selectAll ? [] : rows);
	}, [rows, selectAll]);

	function handleCheckboxClick(row: TableRow) {
		row.rowSelected = !row.rowSelected;
		setSelectedRows(row.rowSelected ? [...selectedRows, row] : selectedRows.filter((item) => row.id !== item.id));
	}

	const addCheckBoxToHeader = useCallback((): React.ReactNode | void => {
		if (selectionType === SELECTION_TYPE.MULTI) {
			return (
				<StyledTableHeader key={"selectAllCheckbox"} className="icon-column">
					<SolaceCheckBox name={"selectAllCheckbox"} onChange={() => handleSelectAllClick()} isChecked={selectAll} />
				</StyledTableHeader>
			);
		} else {
			return;
		}
	}, [selectAll, handleSelectAllClick, selectionType]);

	function addCheckBoxToRows(row: TableRow): React.ReactNode {
		return (
			<StyledTableData key={`${row.id}rowCheckbox`} className="checkbox" onClick={(e) => e.stopPropagation()}>
				<SolaceCheckBox
					name={`${row.id}rowCheckbox`}
					onChange={() => handleCheckboxClick(row)}
					isChecked={!!row.rowSelected}
				/>
			</StyledTableData>
		);
	}

	function openRowActionMenu(e: React.MouseEvent<HTMLElement>, row: TableRow) {
		e.stopPropagation();
		setRowWithOpenActionMenu(row.id);
	}

	const openColumnHidingControl = useCallback(
		(e: React.MouseEvent<HTMLElement>): void => {
			e.stopPropagation();
			setIsColumnHidingControlOpen(!isColumnHidingControlOpen);
		},
		[isColumnHidingControlOpen]
	);

	function creatRowNodes(): React.ReactNode[] {
		return rows.map((row: TableRow) => (
			<StyledTableRow
				key={row.id}
				onMouseEnter={rowHoverCallback ? () => rowHoverCallback(row) : undefined}
				onClick={() => updateSelection(row)}
				className={row.rowSelected ? "selected" : ""}
			>
				{[
					selectionType === SELECTION_TYPE.MULTI && addCheckBoxToRows(row),
					renderedColumns.map((col) => {
						if (!col.hasNoCell && !col.isHidden) {
							return (
								<StyledTableData key={row[col.field]}>
									<span>{row[col.field]}</span>
								</StyledTableData>
							);
						} else {
							return;
						}
					}),
					!!rowActionMenuItems &&
						addActionMenuIcon(
							row,
							rowWithOpenActionMenu === row.id,
							openRowActionMenu,
							rowActionMenuItems,
							setRowWithOpenActionMenu
						)
				]}
			</StyledTableRow>
		));
	}

	const createHeaderNodes = useCallback(() => {
		return (
			<StyledTableRow className="header" onMouseEnter={headerHoverCallback ? () => headerHoverCallback() : undefined}>
				{[
					addCheckBoxToHeader(),
					...renderedColumns.map(
						(col) =>
							!col.isHidden && (
								<StyledTableHeader
									key={col.headerName}
									className={`${col.sortable ? "sortable" : ""} ${col.hasNoCell ? "icon-column" : ""}`}
								>
									<>
										{col.headerName}
										{sortedColumn?.field === col.field &&
											col.sortable &&
											(col.sortDirection === SORT_DIRECTION.ASC ? (
												<ArrowDropUp sx={{ marginLeft: theme.spacing(0.25) }} onClick={() => handleSort(col)} />
											) : (
												<ArrowDropDown sx={{ marginLeft: theme.spacing(0.25) }} onClick={() => handleSort(col)} />
											))}
										{sortedColumn?.field !== col.field && col.sortable && (
											<Sort sx={{ marginLeft: theme.spacing(0.5) }} onClick={() => handleSort(col)} />
										)}
									</>
								</StyledTableHeader>
							)
					),
					!!rowActionMenuItems && !hasColumnHiding && addEmptyHeaderCell(),
					hasColumnHiding &&
						addColumnHidingControl(
							columns,
							openColumnHidingControl,
							isColumnHidingControlOpen,
							setIsColumnHidingControlOpen,
							setRenderedColumns
						)
				]}
			</StyledTableRow>
		);
	}, [
		sortedColumn,
		addCheckBoxToHeader,
		renderedColumns,
		handleSort,
		theme,
		rowActionMenuItems,
		hasColumnHiding,
		headerHoverCallback,
		isColumnHidingControlOpen,
		setIsColumnHidingControlOpen,
		openColumnHidingControl,
		columns
	]);

	const rowNodes = renderCustomRow
		? renderCustomRow().renderRow({
				rows,
				renderedColumns,
				selectionType,
				updateSelection,
				handleCheckboxClick,
				renderCustomRow,
				rowActionMenuItems,
				rowHoverCallback
		  })
		: creatRowNodes();

	const columnNodes = renderCustomHeader
		? renderCustomHeader({
				columns,
				sortedColumn,
				selectAll,
				handleSort,
				handleSelectAllClick,
				addColumnHidingControl
		  })
		: createHeaderNodes();

	return [columnNodes, rowNodes];
};
