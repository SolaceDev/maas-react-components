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
	StyledTableRow,
	StyledTableData,
	StyledTableHeader
} from "../table-utils";
import { useExpandableRows } from "./useExpandableRows";
import { AscendingSortIcon, DescendingSortIcon, UnsortedIcon } from "../../../resources/icons/SortIcons";
import SolaceCheckBox from "../../form/SolaceCheckBox";

import clsx from "clsx";
import { ExpandableRowOptions } from "../SolaceTable";

export const useSolaceTable = ({
	rows,
	columns,
	selectionType,
	selectionChangedCallback,
	sortedColumn,
	sortCallback,
	renderCustomRowCells,
	rowActionMenuItems,
	renderCustomRowActionItem,
	headerHoverCallback,
	rowHoverCallback,
	hasColumnHiding,
	displayedColumns,
	displayedColumnsChangedCallback,
	expandableRowOptions
}: {
	rows: TableRow[];
	columns: TableColumn[];
	selectionType: SELECTION_TYPE;
	selectionChangedCallback: (row: TableRow[]) => void;
	sortedColumn: TableColumn | undefined;
	sortCallback: (column: TableColumn | undefined) => void;
	renderCustomRowCells?: (row: TableRow) => JSX.Element[];
	rowActionMenuItems?: TableActionMenuItem[];
	renderCustomRowActionItem?: (row: TableRow) => TableActionMenuItem[];
	headerHoverCallback?: () => void;
	rowHoverCallback?: (row: TableRow) => void;
	hasColumnHiding?: boolean;
	displayedColumns?: TableColumn[];
	displayedColumnsChangedCallback?: (displayedColumns: TableColumn[]) => void;
	expandableRowOptions?: ExpandableRowOptions;
	// TODO: Refactor this function to reduce its Cognitive Complexity from 107 to the 15 allowed
	// eslint-disable-next-line sonarjs/cognitive-complexity
}): React.ReactNode[] => {
	const [selectedRows, setSelectedRows] = useState<TableRow[]>([]);
	const [selectAll, setSelectAll] = useState(false);
	const [isColumnHidingControlOpen, setIsColumnHidingControlOpen] = useState(false);

	// Applicable if sortedColumn is not set
	const [internalSortedColumn, setInternalSortedColumn] = useState<TableColumn | undefined>(
		columns.find((col) => col.sortable)
	);
	// Applicable if displayedColumns is not set
	const [internalDisplayedColumns, setInternalDisplayedColumns] = useState(columns);

	useEffect(() => {
		const newSelected = rows.filter((row) => row.rowSelected);
		setSelectedRows(newSelected);
	}, [rows]);

	useEffect(() => {
		selectionChangedCallback(selectedRows);
		if (rows.length !== 0 && selectedRows.length === rows.length) {
			setSelectAll(true);
		} else {
			setSelectAll(false);
		}
	}, [selectedRows, selectionChangedCallback]);

	function updateSelection(clickedRow: TableRow) {
		if (selectionType !== SELECTION_TYPE.NONE) {
			clickedRow.rowSelected = selectedRows.length > 1 ? true : !clickedRow.rowSelected;
			setSelectAll(false);
			rows.map((row) => {
				if (clickedRow.id !== row.id) {
					row.rowSelected = false;
				}
			});
			setSelectedRows(clickedRow.rowSelected ? [clickedRow] : []);
		}
	}

	const handleSort = useCallback(
		(col: TableColumn) => {
			if (sortedColumn) {
				if (sortedColumn.field === col.field) {
					col.sortDirection = col.sortDirection === SORT_DIRECTION.DCS ? SORT_DIRECTION.ASC : SORT_DIRECTION.DCS;
				} else {
					col.sortDirection = SORT_DIRECTION.ASC;
				}
			} else {
				if (internalSortedColumn?.field === col.field) {
					col.sortDirection = col.sortDirection === SORT_DIRECTION.DCS ? SORT_DIRECTION.ASC : SORT_DIRECTION.DCS;
				} else {
					col.sortDirection = SORT_DIRECTION.ASC;
				}
				setInternalSortedColumn(col);
			}
			sortCallback(col);
		},
		[internalSortedColumn, sortCallback, sortedColumn]
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
				<StyledTableHeader key={"selectAllCheckbox"} className="checkbox-column">
					<SolaceCheckBox name={"selectAllCheckbox"} onChange={() => handleSelectAllClick()} checked={selectAll} />
				</StyledTableHeader>
			);
		} else {
			return;
		}
	}, [selectAll, handleSelectAllClick, selectionType]);

	const addChevronToHeader = useCallback((): React.ReactNode | void => {
		if (expandableRowOptions?.allowToggle) {
			return <StyledTableHeader key={"expandHeader"} className="expand-column"></StyledTableHeader>;
		} else {
			return;
		}
	}, [expandableRowOptions?.allowToggle]);

	function addCheckBoxToRows(row: TableRow): React.ReactNode {
		return (
			<StyledTableData key={`${row.id}_rowCheckbox`} className="checkbox" onClick={(e) => e.stopPropagation()}>
				<SolaceCheckBox
					name={`${row.id}rowCheckbox`}
					onChange={() => handleCheckboxClick(row)}
					checked={!!row.rowSelected}
				/>
			</StyledTableData>
		);
	}

	const openColumnHidingControl = useCallback(
		(e: React.MouseEvent<HTMLElement>): void => {
			e.stopPropagation();
			setIsColumnHidingControlOpen(!isColumnHidingControlOpen);
		},
		[isColumnHidingControlOpen]
	);

	const renderRowActionItems = (row: TableRow): React.ReactNode[] => {
		if (renderCustomRowActionItem) {
			return [addActionMenuIcon(row, renderCustomRowActionItem(row))];
		} else if (rowActionMenuItems && rowActionMenuItems.length > 0) {
			return [addActionMenuIcon(row, rowActionMenuItems)];
		} else if (!rowActionMenuItems && hasColumnHiding) {
			return [addEmptyRowCell()];
		}
		return [];
	};

	const renderConfiguredRowCells = (row: TableRow): React.ReactNode[] => {
		if (renderCustomRowCells) {
			return renderCustomRowCells(row);
		} else {
			const columnsToDisplay = displayedColumns ? displayedColumns : internalDisplayedColumns;
			return columnsToDisplay.map((col) => {
				if (!col.hasNoCell && !col.isHidden) {
					const key = row.id + "_" + col.field;
					return (
						<StyledTableData key={key}>
							<span>{row[col.field]}</span>
						</StyledTableData>
					);
				} else {
					return;
				}
			});
		}
	};

	const createHeaderNodes = useCallback(() => {
		const columnToSort = sortedColumn ? sortedColumn : internalSortedColumn;
		const columnsToDisplay = displayedColumns ? displayedColumns : internalDisplayedColumns;
		return (
			<StyledTableRow className="header" onMouseEnter={headerHoverCallback ? () => headerHoverCallback() : undefined}>
				{[
					addCheckBoxToHeader(),
					addChevronToHeader(),
					...columnsToDisplay.map(
						(col) =>
							!col.isHidden && (
								<StyledTableHeader
									key={col.headerName}
									className={`${col.hasNoCell ? "icon-column" : ""} ${col.class ? col.class : ""}`}
									width={col.width ? col.width + "px" : "auto"}
								>
									<span
										className={`${col.sortable ? "sortable" : ""}`}
										onClick={() => (col.sortable ? handleSort(col) : undefined)}
									>
										{col.headerName}
										{columnToSort?.field === col.field &&
											col.sortable &&
											(col.sortDirection === SORT_DIRECTION.ASC ? (
												<AscendingSortIcon opacity={0.8} />
											) : (
												<DescendingSortIcon opacity={0.8} />
											))}
										{columnToSort?.field !== col.field && col.sortable && <UnsortedIcon />}
									</span>
								</StyledTableHeader>
							)
					),
					!!rowActionMenuItems && !hasColumnHiding && addEmptyHeaderCell(),
					hasColumnHiding &&
						addColumnHidingControl({
							columns: columnsToDisplay,
							openColumnHidingControl,
							isColumnHidingControlOpen,
							setIsColumnHidingControlOpen,
							setDisplayedColumns: displayedColumns ? undefined : setInternalDisplayedColumns,
							displayedColumnsChangedCallback
						})
				]}
			</StyledTableRow>
		);
	}, [
		addCheckBoxToHeader,
		addChevronToHeader,
		sortedColumn,
		internalSortedColumn,
		handleSort,
		rowActionMenuItems,
		hasColumnHiding,
		displayedColumns,
		internalDisplayedColumns,
		displayedColumnsChangedCallback,
		isColumnHidingControlOpen,
		setIsColumnHidingControlOpen,
		openColumnHidingControl,
		headerHoverCallback
	]);

	function createRowNodes(): React.ReactNode[] {
		return rows.map((row: TableRow) => (
			<StyledTableRow
				key={row.id}
				onMouseEnter={rowHoverCallback ? () => rowHoverCallback(row) : undefined}
				onClick={() => updateSelection(row)}
				className={clsx({
					selected: row.rowSelected,
					clickable: selectionType === SELECTION_TYPE.MULTI || selectionType === SELECTION_TYPE.SINGLE
				})}
				data-qa={row.id}
			>
				{[
					selectionType === SELECTION_TYPE.MULTI && addCheckBoxToRows(row),
					...renderConfiguredRowCells(row),
					...renderRowActionItems(row)
				]}
			</StyledTableRow>
		));
	}

	const expandableRows = useExpandableRows({
		rows,
		displayedColumns: displayedColumns ? displayedColumns : internalDisplayedColumns,
		selectionType,
		updateSelection,
		addCheckBoxToRows,
		renderConfiguredRowCells,
		renderRowActionItems,
		rowHoverCallback,
		hasColumnHiding,
		displayedColumnsChangedCallback,
		allowToggle: expandableRowOptions?.allowToggle,
		selectRowWhenClickOnChildren: expandableRowOptions?.selectRowWhenClickOnChildren,
		renderChildren: expandableRowOptions?.renderChildren,
		expandedRowIds: expandableRowOptions?.expandedRowIds,
		setExpandedRowIds: expandableRowOptions?.setExpandedRowIds
	});

	// if expandableRowOptions is set, then create expanded row nodes, otherwise createRowNodes
	const rowNodes = expandableRowOptions ? expandableRows.createRowNodes() : createRowNodes();
	const columnNodes = createHeaderNodes();

	return [columnNodes, rowNodes];
};
