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
	StyledTableHeader,
	CustomContentDefinition
} from "../table-utils";
import { useExpandableRows } from "./useExpandableRows";
import { AscendingSortIcon, DescendingSortIcon, UnsortedIcon } from "../../../resources/icons/SortIcons";
import SolaceCheckBox, { SolaceCheckboxChangeEvent } from "../../form/SolaceCheckBox";
import SolaceTooltip from "../../SolaceToolTip";
import { ExpandableRowOptions } from "../SolaceTable";

import clsx from "clsx";
import { cloneDeep } from "lodash";

const DEFAULT_TOOLTIP_PLACEMENT = "bottom-end";
const SELECT_ALL_TOOLTIP = "Select all on this page";
const DESELECT_ALL_TOOLTIP = "Deselect all on this page";

export const useSolaceTable = ({
	rows,
	columns,
	selectionType,
	controlledSelectedRowsState,
	selectedRowIds,
	selectionChangedCallback,
	independentRowHighlight,
	highlightedRowId,
	rowHighlightChangedCallback,
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
	expandableRowOptions,
	customContentDefinitions,
	displayedCustomContent,
	customContentDisplayChangeCallback
}: {
	rows: TableRow[];
	columns: TableColumn[];
	selectionType: SELECTION_TYPE;
	controlledSelectedRowsState: boolean;
	selectedRowIds: string[];
	selectionChangedCallback?: (rows: TableRow[]) => void;
	independentRowHighlight: boolean;
	highlightedRowId?: string | null;
	rowHighlightChangedCallback?: (row: TableRow | null) => void;
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
	customContentDefinitions?: CustomContentDefinition[];
	displayedCustomContent?: string[];
	customContentDisplayChangeCallback?: (type: string, isHidden: boolean) => void;
	// TODO: Refactor this function to reduce its Cognitive Complexity from 107 to the 15 allowed
	// eslint-disable-next-line sonarjs/cognitive-complexity
}): React.ReactNode[] => {
	const [selectAll, setSelectAll] = useState(false);
	const [indeterminate, setIndeterminate] = useState(false);

	// Applicable if controlledSelectedRowsState is false
	const [internalSelectedRows, setInternalSelectedRows] = useState<TableRow[]>([]);
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

	// Initailize internal selected rows based on property inside the row.
	useEffect(() => {
		if (!controlledSelectedRowsState) {
			const newSelected = rows.filter((row) => row.rowSelected);
			setInternalSelectedRows(newSelected);
		}
	}, [rows, controlledSelectedRowsState]);

	useEffect(() => {
		if (!controlledSelectedRowsState && selectionChangedCallback) {
			selectionChangedCallback(internalSelectedRows);
			if (rows.length !== 0 && internalSelectedRows.length === rows.length) {
				setSelectAll(true);
			} else {
				setSelectAll(false);
			}
		}
	}, [internalSelectedRows, selectionChangedCallback, rows?.length, controlledSelectedRowsState]);

	useEffect(() => {
		if (controlledSelectedRowsState) {
			if (rows.length !== 0 && selectedRowIds.length === rows.length) {
				setSelectAll(true);
			} else {
				setSelectAll(false);
			}
		}
	}, [selectedRowIds.length, rows?.length, controlledSelectedRowsState]);

	useEffect(() => {
		if (controlledSelectedRowsState) {
			if (selectedRowIds.length > 0 && selectedRowIds.length < rows.length) {
				setIndeterminate(true);
			} else {
				setIndeterminate(false);
			}
		} else {
			if (internalSelectedRows.length > 0 && internalSelectedRows.length < rows.length) {
				setIndeterminate(true);
			} else {
				setIndeterminate(false);
			}
		}
	}, [rows?.length, internalSelectedRows?.length, selectedRowIds?.length, controlledSelectedRowsState]);

	const handleRowClick = useCallback(
		(clickedRow: TableRow) => {
			if (selectionType !== SELECTION_TYPE.NONE) {
				if (selectionType === SELECTION_TYPE.MULTI && independentRowHighlight) {
					if (highlightedRowId === clickedRow.id) {
						rowHighlightChangedCallback?.(null);
					} else {
						rowHighlightChangedCallback?.(clickedRow);
					}
				} else {
					if (controlledSelectedRowsState) {
						if (selectionChangedCallback) {
							if (selectedRowIds.includes(clickedRow.id)) {
								// a row has been unselected
								const selectedRows = rows.filter((row) => selectedRowIds.includes(row.id) && row.id !== clickedRow.id);
								selectionChangedCallback(selectedRows);

								if (selectedRows.length < rows.length && selectAll) {
									// not all items in the list have been selected, uncheck the "Select All" checkbox
									setSelectAll(false);
								}
							} else {
								// selecting a row delect all other rows
								selectionChangedCallback([clickedRow]);
								setSelectAll(rows.length > 1);
							}
						}
					} else {
						clickedRow.rowSelected = internalSelectedRows.length > 1 ? true : !clickedRow.rowSelected;
						setSelectAll(false);

						rows.forEach((row) => {
							if (clickedRow.id !== row.id) {
								row.rowSelected = false;
							}
						});
						// selecting a row delect all other rows
						setInternalSelectedRows(clickedRow.rowSelected ? [clickedRow] : []);
					}
				}
			}
		},
		[
			controlledSelectedRowsState,
			highlightedRowId,
			independentRowHighlight,
			internalSelectedRows.length,
			rowHighlightChangedCallback,
			rows,
			selectAll,
			selectedRowIds,
			selectionChangedCallback,
			selectionType
		]
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
		rows.forEach((row) => (row.rowSelected = selectAll || indeterminate ? false : true));
		setInternalSelectedRows(selectAll || indeterminate ? [] : rows);
	}, [rows, selectAll, indeterminate]);

	const handleCheckboxClick = useCallback(
		(row: TableRow) => {
			row.rowSelected = !row.rowSelected;
			setInternalSelectedRows(
				row.rowSelected ? [...internalSelectedRows, row] : internalSelectedRows.filter((item) => row.id !== item.id)
			);
		},
		[internalSelectedRows]
	);

	const handleSelectAllChange = useCallback(
		(event: SolaceCheckboxChangeEvent) => {
			if (selectionChangedCallback) {
				if (event.value) {
					// select all items
					setSelectAll(true);
					selectionChangedCallback(rows);
				} else {
					// clear all selections
					setSelectAll(false);
					selectionChangedCallback([]);
				}
			}
		},
		[rows, selectionChangedCallback]
	);

	const handleRowSelectionChange = useCallback(
		(event: SolaceCheckboxChangeEvent) => {
			if (!selectionChangedCallback) {
				return;
			}

			const selectedObj = rows.find((row) => row.id === event.name);
			if (selectedObj) {
				// found the selected row object
				if (event.value && !selectedRowIds.includes(event.name)) {
					// a new checkbox is being selected
					const selectedRows = rows.filter((row) => selectedRowIds.includes(row.id));
					selectionChangedCallback([...selectedRows, selectedObj]);

					if (selectedRows.length + 1 === rows.length && !selectAll) {
						// all items in the list have been selected, check the "Select All" checkbox
						setSelectAll(true);
					}
				} else {
					// a checkbox is being unselected
					const selectedRows = rows.filter((row) => selectedRowIds.includes(row.id) && row.id !== event.name);
					selectionChangedCallback(selectedRows);
					if (selectedRows.length < rows.length && selectAll) {
						// not all items in the list have been selected, uncheck the "Select All" checkbox
						setSelectAll(false);
					}
				}
			}
		},
		[selectAll, rows, selectionChangedCallback, selectedRowIds]
	);

	const addCheckBoxToHeader = useCallback((): React.ReactNode | void => {
		if (selectionType === SELECTION_TYPE.MULTI) {
			return (
				<StyledTableHeader key={"selectAllCheckbox"} className="checkbox-column">
					<SolaceTooltip
						title={selectAll || indeterminate ? DESELECT_ALL_TOOLTIP : SELECT_ALL_TOOLTIP}
						placement={"bottom-start"}
					>
						<div>
							{controlledSelectedRowsState && (
								<SolaceCheckBox
									name={"selectAllCheckbox"}
									onChange={handleSelectAllChange}
									checked={selectAll || indeterminate}
									indeterminate={indeterminate}
								/>
							)}
							{!controlledSelectedRowsState && (
								<SolaceCheckBox
									name={"selectAllCheckbox"}
									onChange={() => handleSelectAllClick()}
									checked={selectAll || indeterminate}
									indeterminate={indeterminate}
								/>
							)}
						</div>
					</SolaceTooltip>
				</StyledTableHeader>
			);
		} else {
			return;
		}
	}, [
		selectionType,
		selectAll,
		indeterminate,
		controlledSelectedRowsState,
		handleSelectAllChange,
		handleSelectAllClick
	]);

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
					{controlledSelectedRowsState && (
						<SolaceCheckBox
							name={`${row.id}`}
							onChange={handleRowSelectionChange}
							checked={selectedRowIds.includes(row.id)}
						/>
					)}
					{!controlledSelectedRowsState && (
						<SolaceCheckBox
							name={`${row.id}rowCheckbox`}
							onChange={() => handleCheckboxClick(row)}
							checked={!!row.rowSelected}
						/>
					)}
				</StyledTableData>
			);
		},
		[handleCheckboxClick, controlledSelectedRowsState, selectedRowIds, handleRowSelectionChange]
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
							displayedColumnsChangedCallback: handleDisplayColumnsChanged,
							customContentDefinitions: customContentDefinitions,
							displayedCustomContent: displayedCustomContent,
							customContentDisplayChangeCallback: customContentDisplayChangeCallback
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
		handleDisplayColumnsChanged,
		customContentDefinitions,
		displayedCustomContent,
		customContentDisplayChangeCallback
	]);

	const createRowNodes = useCallback((): React.ReactNode[] => {
		return rows.map((row: TableRow) => (
			<StyledTableRow
				key={row.id}
				onMouseEnter={rowHoverCallback ? () => rowHoverCallback(row) : undefined}
				onClick={() => handleRowClick(row)}
				className={clsx({
					selected:
						selectionType === SELECTION_TYPE.MULTI && independentRowHighlight
							? highlightedRowId === row.id
							: controlledSelectedRowsState
							? selectedRowIds.includes(row.id)
							: row.rowSelected,
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
		rows,
		rowHoverCallback,
		selectionType,
		independentRowHighlight,
		highlightedRowId,
		controlledSelectedRowsState,
		selectedRowIds,
		addCheckBoxToRows,
		renderConfiguredRowCells,
		displayedColumns,
		internalDisplayedColumns,
		renderRowActionItems,
		handleRowClick
	]);

	const expandableRows = useExpandableRows({
		enabled: expandableRowOptions !== undefined && expandableRowOptions !== null,
		rows,
		displayedColumns: displayedColumns,
		internalDisplayedColumns: internalDisplayedColumns,
		selectionType,
		handleRowClick,
		controlledSelectedRowsState,
		selectedRowIds,
		independentRowHighlight,
		highlightedRowId,
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
