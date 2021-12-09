import React, { useCallback, useEffect, useState } from "react";
import {
	TableColumn,
	TableRow,
	TableActionMenuItem,
	SELECTION_TYPE,
	SORT_DIRECTION,
	addEmptyHeaderCell,
	addEmptyRowCell,
	addActionMenuIcon,
	addColumnHidingControl,
	StyledTableData,
	StyledTableHeader
} from "../table-utils";
import { styled } from "@material-ui/core";
import { AscendingSortIcon, DescendingSortIcon, UnsortedIcon } from "../../../resources/icons/SortIcons";
import SolaceCheckBox from "../../form/SolaceCheckBox";
import { BASE_COLORS } from "../../../resources/colorPallette";
import clsx from "clsx";

export const StyledTableRow = styled("tr")(({ theme }) => ({
	borderCollapse: "collapse",
	borderBottom: `1px solid ${BASE_COLORS.greys.grey24}`,
	padding: `${theme.spacing(0.5)} ${theme.spacing()}`,
	marginLeft: theme.spacing(0.5),
	height: "32px",
	"&.selected": {
		backgroundColor: "#e8f9f4"
	},
	"&.clickable": {
		cursor: "pointer"
	},
	"&:hover": {
		background: `${BASE_COLORS.greys.grey24}`,
		"&.header": {
			background: "transparent"
		}
	},
	"&:hover + tr td table": {
		background: `${BASE_COLORS.greys.grey24}`
	}
}));

export interface CustomTableRowProps {
	rows: TableRow[];
	displayedColumns: TableColumn[];
	selectionType: SELECTION_TYPE;
	updateSelection: (row: TableRow) => void;
	handleCheckboxClick: (row: TableRow) => void;
	renderCustomRow: () => {
		renderRow: (customRowProps: CustomTableRowProps) => React.ReactNode;
		renderChildren: (row: TableRow) => React.ReactNode;
	};
	renderCustomRowCells?: (row: TableRow) => JSX.Element[];
	rowActionMenuItems?: TableActionMenuItem[];
	headerHoverCallback?: () => void;
	rowHoverCallback?: (row: TableRow) => void;
	hasColumnHiding?: boolean;
	displayedColumnsChangedCallback?: (displayedColumns: TableColumn[]) => void;
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
		setIsColumnHidingControlOpen: () => void,
		setDisplayedColumns: (displayedColumns: TableColumn[]) => void
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
	renderCustomRowCells?: (row: TableRow) => JSX.Element[],
	renderCustomHeader?: (customColumnProps: CustomTableColumnProps) => React.ReactNode,
	rowActionMenuItems?: TableActionMenuItem[],
	headerHoverCallback?: () => void,
	rowHoverCallback?: (row: TableRow) => void,
	hasColumnHiding?: boolean,
	displayedColumnsChangedCallback?: (displayedColumns: TableColumn[]) => void
	// TODO: Refactor this function to reduce its Cognitive Complexity from 107 to the 15 allowed
	// eslint-disable-next-line sonarjs/cognitive-complexity
): React.ReactNode[] => {
	const [selectedRows, setSelectedRows] = useState<TableRow[]>([]);
	const [sortedColumn, setSortedColumn] = useState<TableColumn | undefined>(
		preSelectedColumn ? preSelectedColumn : columns.find((col) => col.sortable)
	);
	const [displayedColumns, setDisplayedColumns] = useState(columns);
	const [selectAll, setSelectAll] = useState(false);
	const [rowWithOpenActionMenu, setRowWithOpenActionMenu] = useState<string | null>();
	const [isColumnHidingControlOpen, setIsColumnHidingControlOpen] = useState(false);

	useEffect(() => {
		selectionChangedCallback(selectedRows);
		if (rows.length !== 0 && selectedRows.length === rows.length) {
			setSelectAll(true);
		} else {
			setSelectAll(false);
		}
	}, [selectedRows, rows.length, selectedRows.length, selectionChangedCallback]);

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
			} else {
				col.sortDirection = SORT_DIRECTION.ASC;
			}
			setSortedColumn(col);
			sortCallback(col);
		},
		[sortedColumn, sortCallback]
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
					<SolaceCheckBox name={"selectAllCheckbox"} onChange={() => handleSelectAllClick()} checked={selectAll} />
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
					checked={!!row.rowSelected}
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
				className={clsx({
					selected: row.rowSelected,
					clickable: selectionType === SELECTION_TYPE.MULTI || selectionType === SELECTION_TYPE.SINGLE
				})}
			>
				{[
					selectionType === SELECTION_TYPE.MULTI && addCheckBoxToRows(row),
					displayedColumns.map((col) => {
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
						),
					!rowActionMenuItems && hasColumnHiding && addEmptyRowCell()
				]}
			</StyledTableRow>
		));
	}

	const getCustomCells = (row: TableRow) => {
		if (renderCustomRowCells) {
			return renderCustomRowCells(row);
		} else {
			return [];
		}
	};

	function createCustomRowNodes(): React.ReactNode[] {
		return rows.map((row: TableRow) => (
			<StyledTableRow
				key={row.id}
				onMouseEnter={rowHoverCallback ? () => rowHoverCallback(row) : undefined}
				onClick={() => updateSelection(row)}
				className={clsx({
					selected: row.rowSelected,
					clickable: selectionType === SELECTION_TYPE.MULTI || selectionType === SELECTION_TYPE.SINGLE
				})}
			>
				{[
					selectionType === SELECTION_TYPE.MULTI && addCheckBoxToRows(row),

					/** TODO - add all custom cells for this row here */
					...getCustomCells(row),
					/** End of custom cells */

					!!rowActionMenuItems &&
						addActionMenuIcon(
							row,
							rowWithOpenActionMenu === row.id,
							openRowActionMenu,
							rowActionMenuItems,
							setRowWithOpenActionMenu
						),
					!rowActionMenuItems && hasColumnHiding && addEmptyRowCell()
				]}
			</StyledTableRow>
		));
	}

	const createHeaderNodes = useCallback(() => {
		return (
			<StyledTableRow className="header" onMouseEnter={headerHoverCallback ? () => headerHoverCallback() : undefined}>
				{[
					addCheckBoxToHeader(),
					...displayedColumns.map(
						(col) =>
							!col.isHidden && (
								<StyledTableHeader key={col.headerName} className={`${col.hasNoCell ? "icon-column" : ""}`}>
									<span
										className={`${col.sortable ? "sortable" : ""}`}
										onClick={() => (col.sortable ? handleSort(col) : undefined)}
									>
										{col.headerName}
										{sortedColumn?.field === col.field &&
											col.sortable &&
											(col.sortDirection === SORT_DIRECTION.ASC ? (
												<AscendingSortIcon opacity={0.8} />
											) : (
												<DescendingSortIcon opacity={0.8} />
											))}
										{sortedColumn?.field !== col.field && col.sortable && <UnsortedIcon />}
									</span>
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
							setDisplayedColumns,
							displayedColumnsChangedCallback
						)
				]}
			</StyledTableRow>
		);
	}, [
		sortedColumn,
		addCheckBoxToHeader,
		displayedColumns,
		handleSort,
		rowActionMenuItems,
		hasColumnHiding,
		headerHoverCallback,
		isColumnHidingControlOpen,
		setIsColumnHidingControlOpen,
		openColumnHidingControl,
		columns,
		displayedColumnsChangedCallback
	]);

	// if RenderCustomRow defined, render the row, otherwise
	// if createCustomRowNodes defined, render all the custom
	// row cells, otherwise createRowNodes
	const rowNodes = renderCustomRow
		? renderCustomRow().renderRow({
				rows,
				displayedColumns,
				selectionType,
				updateSelection,
				handleCheckboxClick,
				renderCustomRow,
				rowActionMenuItems,
				headerHoverCallback,
				rowHoverCallback,
				hasColumnHiding,
				displayedColumnsChangedCallback
		  })
		: renderCustomRowCells
		? createCustomRowNodes()
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
