import React, { useCallback, useEffect, useState, useRef } from "react";
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
import SolaceTooltip from "../../SolaceToolTip";
import { ExpandableRowOptions } from "../SolaceTable";

import clsx from "clsx";
import { cloneDeep } from "lodash";

const DEFAULT_TOOLTIP_PLACEMENT = "bottom-end";

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

	// Applicable if sortedColumn is not set
	const [internalSortedColumn, setInternalSortedColumn] = useState<TableColumn>();
	// Applicable if displayedColumns is not set
	const [internalDisplayedColumns, setInternalDisplayedColumns] = useState<TableColumn[]>();

	const columnsRef = useRef<TableColumn[]>([]);

	useEffect(() => {
		if (columns) {
			const internalColumns = cloneDeep(columns);
			columnsRef.current = internalColumns;
			setInternalSortedColumn(internalColumns.find((col) => col.sortable));
			setInternalDisplayedColumns(internalColumns);
		}
	}, [columns]);

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

	const updateSelection = useCallback(
		(clickedRow: TableRow) => {
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
		},
		[rows, selectedRows.length]
	);

	const handleSort = useCallback(
		(newColumn: TableColumn, sortedColumn: TableColumn | undefined, internalSortedColumn: TableColumn | undefined) => {
			const columnInfo = columnsRef.current.find((column) => column.field === newColumn.field);
			if (columnInfo && columnInfo.sortable) {
				if (sortedColumn) {
					if (sortedColumn.field === columnInfo.field) {
						columnInfo.sortDirection =
							columnInfo.sortDirection === SORT_DIRECTION.DCS ? SORT_DIRECTION.ASC : SORT_DIRECTION.DCS;
					} else {
						columnInfo.sortDirection = SORT_DIRECTION.ASC;
					}
					sortCallback(columnInfo);
				} else {
					if (internalSortedColumn?.field === columnInfo.field) {
						columnInfo.sortDirection =
							columnInfo.sortDirection === SORT_DIRECTION.DCS ? SORT_DIRECTION.ASC : SORT_DIRECTION.DCS;
					} else {
						columnInfo.sortDirection = SORT_DIRECTION.ASC;
					}
					setInternalSortedColumn(columnInfo);
					sortCallback(columnInfo);
				}
			}
		},
		[sortCallback]
	);

	const handleDisplayColumnsChanged = useCallback(
		(cols: TableColumn[]) => {
			columnsRef.current?.forEach((column, index) => {
				if (cols && cols[index]) {
					column.isHidden = cols[index].isHidden;
				}
			});
			setInternalDisplayedColumns(cols);
			displayedColumnsChangedCallback?.(cols);
		},
		[displayedColumnsChangedCallback]
	);

	const handleSelectAllClick = useCallback(() => {
		rows.map((row) => (row.rowSelected = !selectAll));
		setSelectedRows(selectAll ? [] : rows);
	}, [rows, selectAll]);

	const handleCheckboxClick = useCallback(
		(row: TableRow) => {
			row.rowSelected = !row.rowSelected;
			setSelectedRows(row.rowSelected ? [...selectedRows, row] : selectedRows.filter((item) => row.id !== item.id));
		},
		[selectedRows]
	);

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

	const addCheckBoxToRows = useCallback(
		(row: TableRow): React.ReactNode => {
			return (
				<StyledTableData key={`${row.id}_rowCheckbox`} className="checkbox" onClick={(e) => e.stopPropagation()}>
					<SolaceCheckBox
						name={`${row.id}rowCheckbox`}
						onChange={() => handleCheckboxClick(row)}
						checked={!!row.rowSelected}
					/>
				</StyledTableData>
			);
		},
		[handleCheckboxClick]
	);

	const renderRowActionItems = useCallback(
		(row: TableRow): React.ReactNode[] => {
			if (renderCustomRowActionItem) {
				return [addActionMenuIcon(row, renderCustomRowActionItem(row))];
			} else if (rowActionMenuItems && rowActionMenuItems.length > 0) {
				return [addActionMenuIcon(row, rowActionMenuItems)];
			} else if (!rowActionMenuItems && hasColumnHiding) {
				return [addEmptyRowCell(row)];
			}
			return [];
		},
		[hasColumnHiding, renderCustomRowActionItem, rowActionMenuItems]
	);

	const renderConfiguredRowCells = useCallback(
		(
			row: TableRow,
			displayedColumns: TableColumn[] | undefined,
			internalDisplayedColumns: TableColumn[] | undefined
		): React.ReactNode[] => {
			if (renderCustomRowCells) {
				return renderCustomRowCells(row);
			} else {
				const columnsToDisplay = (displayedColumns ? displayedColumns : internalDisplayedColumns) ?? [];
				return columnsToDisplay.map((col) => {
					if (!col.hasNoCell && !col.isHidden) {
						const key = row.id + "_" + col.field;
						return (
							<StyledTableData key={key}>
								{col.tooltip && (
									<SolaceTooltip variant="overflow" title={row[col.field]} placement={DEFAULT_TOOLTIP_PLACEMENT}>
										{row[col.field]}
									</SolaceTooltip>
								)}
								{!col.tooltip && <span>{row[col.field]}</span>}
							</StyledTableData>
						);
					} else {
						return;
					}
				});
			}
		},
		[renderCustomRowCells]
	);

	const addConfigureColumnHeader = useCallback(
		(columnsToDisplay: TableColumn[], columnToSort: TableColumn | undefined): React.ReactNode | void => {
			return columnsToDisplay.map(
				(col) =>
					!col.isHidden && (
						<StyledTableHeader
							key={col.headerName}
							className={`${
								(col.hasNoCell && "icon-column") || (col.isNumerical && "number-column") || col.class || ""
							}`}
							width={col.width ? (typeof col.width === "number" ? col.width + "px" : col.width) : "auto"}
						>
							<span
								className={`${col.sortable ? "sortable header" : "header"}`}
								onClick={() => (col.sortable ? handleSort(col, sortedColumn, internalSortedColumn) : undefined)}
							>
								<SolaceTooltip variant="overflow" title={col.headerName} placement={DEFAULT_TOOLTIP_PLACEMENT}>
									{col.headerName}
								</SolaceTooltip>
								{columnToSort?.field === col.field && col.sortable && (
									<SolaceTooltip title="Sort" placement={DEFAULT_TOOLTIP_PLACEMENT}>
										<div>
											{columnToSort.sortDirection === SORT_DIRECTION.ASC ? (
												<AscendingSortIcon />
											) : (
												<DescendingSortIcon />
											)}
										</div>
									</SolaceTooltip>
								)}
								{columnToSort?.field !== col.field && col.sortable && (
									<SolaceTooltip title="Sort" placement={DEFAULT_TOOLTIP_PLACEMENT}>
										<div>
											<UnsortedIcon />
										</div>
									</SolaceTooltip>
								)}
							</span>
						</StyledTableHeader>
					)
			);
		},
		[handleSort, internalSortedColumn, sortedColumn]
	);

	const createHeaderNodes = useCallback(() => {
		const columnToSort = sortedColumn ? sortedColumn : internalSortedColumn;
		const columnsToDisplay = cloneDeep((displayedColumns ? displayedColumns : internalDisplayedColumns) ?? []);
		return (
			<StyledTableRow
				key="headerRow"
				className="header"
				onMouseEnter={headerHoverCallback ? () => headerHoverCallback() : undefined}
			>
				{[
					addCheckBoxToHeader(),
					addChevronToHeader(),
					addConfigureColumnHeader(columnsToDisplay, columnToSort),
					(!!rowActionMenuItems || renderCustomRowActionItem) && !hasColumnHiding && addEmptyHeaderCell(),
					hasColumnHiding &&
						addColumnHidingControl({
							columns: columnsToDisplay,
							displayedColumnsChangedCallback: handleDisplayColumnsChanged
						})
				]}
			</StyledTableRow>
		);
	}, [
		sortedColumn,
		internalSortedColumn,
		displayedColumns,
		internalDisplayedColumns,
		headerHoverCallback,
		addCheckBoxToHeader,
		addChevronToHeader,
		addConfigureColumnHeader,
		rowActionMenuItems,
		renderCustomRowActionItem,
		hasColumnHiding,
		handleDisplayColumnsChanged
	]);

	const createRowNodes = useCallback((): React.ReactNode[] => {
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
					...renderConfiguredRowCells(row, displayedColumns, internalDisplayedColumns),
					...renderRowActionItems(row)
				]}
			</StyledTableRow>
		));
	}, [
		addCheckBoxToRows,
		displayedColumns,
		internalDisplayedColumns,
		renderConfiguredRowCells,
		renderRowActionItems,
		rowHoverCallback,
		rows,
		selectionType,
		updateSelection
	]);

	const expandableRows = useExpandableRows({
		enabled: expandableRowOptions !== undefined && expandableRowOptions !== null,
		rows,
		displayedColumns: displayedColumns,
		internalDisplayedColumns: internalDisplayedColumns,
		selectionType,
		updateSelection,
		addCheckBoxToRows,
		renderConfiguredRowCells,
		renderRowActionItems,
		rowHoverCallback,
		hasColumnHiding,
		displayedColumnsChangedCallback: handleDisplayColumnsChanged,
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
