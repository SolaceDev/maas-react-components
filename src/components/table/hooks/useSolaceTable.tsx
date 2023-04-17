/* eslint-disable sonarjs/cognitive-complexity */
import React, { useCallback, useEffect, useState, useRef, useMemo } from "react";
import {
	TableColumn,
	TableRow,
	TableActionMenuItem,
	SELECTION_TYPE,
	SORT_DIRECTION,
	CustomContentDefinition
} from "../table-utils";
import { SolaceCheckboxChangeEvent } from "../../form/SolaceCheckBox";

import { cloneDeep, isEqual } from "lodash";
import { SolaceMenuItemProps } from "../../SolaceMenuItem";
import { ExpandableRowOptions } from "../SolaceTable";
import { SolaceTableRow } from "../../..";
import useTableBodyRenderHelper from "./useTableBodyRenderHelper";
import useTableHeaderRenderHelper from "./useTableHeaderRenderHelper";

export const useSolaceTable = ({
	rows,
	columns,
	selectionType,
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
	customContentDisplayChangeCallback,
	customMenuActions,
	crossPageRowSelectionSupported = false,
	totalObjectCount = 0,
	allPagesSelectedByDefault = false,
	deselectedRowIds,
	crossPageSelectionChangedCallback
}: {
	rows: TableRow[];
	columns: TableColumn[];
	selectionType: SELECTION_TYPE;
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
	customMenuActions?: SolaceMenuItemProps[];
	crossPageRowSelectionSupported?: boolean;
	totalObjectCount?: number;
	allPagesSelectedByDefault?: boolean;
	deselectedRowIds: string[];
	crossPageSelectionChangedCallback?: (
		// To be consistent with existing selection changed callback, return a list of selected rows for the current page
		selectedRowsInCurrentPage: TableRow[],
		allPagesSelectedByDefault: boolean,
		selectedRowIdsInVisitedPages: string[],
		deselectedRowIdsInVisitedPages: string[]
	) => void;
}): React.ReactNode[] => {
	const [selectAll, setSelectAll] = useState(false);
	const [indeterminate, setIndeterminate] = useState(false);

	// Applicable if sortedColumn is not set
	const [internalSortedColumn, setInternalSortedColumn] = useState<TableColumn>();
	// Applicable if displayedColumns is not set
	const [internalDisplayedColumns, setInternalDisplayedColumns] = useState<TableColumn[]>();

	const columnsRef = useRef<TableColumn[]>([]);

	const crossPageSelectionEnabled = useMemo(() => {
		return selectionType === SELECTION_TYPE.MULTI && crossPageRowSelectionSupported;
	}, [selectionType, crossPageRowSelectionSupported]);

	useEffect(() => {
		if (columns) {
			const internalColumns = cloneDeep(columns);
			columnsRef.current = internalColumns;
			setInternalSortedColumn(internalColumns.find((col) => col.sortable));
			setInternalDisplayedColumns(internalColumns);
		}
	}, [columns]);

	useEffect(() => {
		if (!crossPageSelectionEnabled) {
			if (rows.length !== 0 && selectedRowIds.length === rows.length) {
				setSelectAll(true);
			} else {
				setSelectAll(false);
			}
		}
	}, [selectedRowIds.length, rows?.length, crossPageSelectionEnabled]);

	useEffect(() => {
		if (!crossPageSelectionEnabled) {
			if (selectedRowIds.length > 0 && selectedRowIds.length < rows.length) {
				setIndeterminate(true);
			} else {
				setIndeterminate(false);
			}
		}
	}, [rows?.length, selectedRowIds?.length, crossPageSelectionEnabled]);

	useEffect(() => {
		if (crossPageSelectionEnabled) {
			if (totalObjectCount > 0) {
				const allSelected =
					(allPagesSelectedByDefault && deselectedRowIds.length === 0) ||
					(!allPagesSelectedByDefault && selectedRowIds.length === totalObjectCount);
				setSelectAll(allSelected);
			} else {
				setSelectAll(allPagesSelectedByDefault);
			}
		}
	}, [
		allPagesSelectedByDefault,
		crossPageSelectionEnabled,
		deselectedRowIds.length,
		selectedRowIds.length,
		totalObjectCount
	]);

	useEffect(() => {
		if (crossPageSelectionEnabled) {
			if (totalObjectCount > 0) {
				setIndeterminate(
					(allPagesSelectedByDefault && deselectedRowIds.length > 0 && deselectedRowIds.length < totalObjectCount) ||
						(!allPagesSelectedByDefault && selectedRowIds.length > 0 && selectedRowIds.length !== totalObjectCount)
				);
			} else {
				setIndeterminate(false);
			}
		}
	}, [
		allPagesSelectedByDefault,
		crossPageSelectionEnabled,
		deselectedRowIds.length,
		selectedRowIds.length,
		totalObjectCount
	]);

	useEffect(
		() => {
			// if allPagesSelectedByDefault is true, when loading a page, initialize checkbox state baesd on deselectedRowIds
			if (crossPageSelectionEnabled && allPagesSelectedByDefault && crossPageSelectionChangedCallback) {
				// check checkbox in the page if it is not unchecked by user
				const newSelectedRowIds = [...selectedRowIds];
				const selectedRowsInCurrentPage: SolaceTableRow[] = [];

				rows.forEach((row) => {
					if (!deselectedRowIds.includes(row.id)) {
						if (!newSelectedRowIds.includes(row.id)) {
							newSelectedRowIds.push(row.id);
						}
						selectedRowsInCurrentPage.push(row);
					} else if (selectedRowIds.includes(row.id)) {
						// if both deselectedRowIds and selectedRowIds has this row, must be programming error, remove it from selectedRowIds
						const index = newSelectedRowIds.indexOf(row.id);
						if (index >= 0) {
							newSelectedRowIds.splice(index, 1);
						}
					}
				});
				if (!isEqual(selectedRowIds, newSelectedRowIds)) {
					crossPageSelectionChangedCallback(selectedRowsInCurrentPage, true, newSelectedRowIds, deselectedRowIds);
				}
			}
		},
		// only trigger this effect when table rows are changed
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[crossPageSelectionChangedCallback, crossPageSelectionEnabled, rows]
	);

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
					if (selectionType === SELECTION_TYPE.MULTI && crossPageRowSelectionSupported) {
						if (crossPageSelectionChangedCallback) {
							if (selectedRowIds.includes(clickedRow.id)) {
								// a row in current page has been unselected
								const newSelectedRows = rows.filter(
									(row) => selectedRowIds.includes(row.id) && row.id !== clickedRow.id
								);
								const newSelectedRowIds = selectedRowIds.filter((id) => id !== clickedRow.id);
								const newDeselectedRowIds = allPagesSelectedByDefault
									? [...deselectedRowIds, clickedRow.id]
									: deselectedRowIds;

								crossPageSelectionChangedCallback(
									newSelectedRows,
									allPagesSelectedByDefault,
									newSelectedRowIds,
									newDeselectedRowIds
								);
							} else {
								// selecting a row deselect all other rows and also exit allPagesSelectedByDefault
								crossPageSelectionChangedCallback([clickedRow], false, [clickedRow.id], []);
							}
						}
					} else {
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
								setSelectAll(rows.length === 1);
							}
						}
					}
				}
			}
		},
		[
			allPagesSelectedByDefault,
			crossPageRowSelectionSupported,
			crossPageSelectionChangedCallback,
			deselectedRowIds,
			highlightedRowId,
			independentRowHighlight,
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

	const handleSelectAllChange = useCallback(
		(event: SolaceCheckboxChangeEvent) => {
			if (crossPageSelectionEnabled) {
				if (crossPageSelectionChangedCallback) {
					if (event.value) {
						// select all items
						setSelectAll(true);
						crossPageSelectionChangedCallback(
							rows,
							true,
							rows.map((row) => row.id),
							[]
						);
					} else {
						// clear all selections
						setSelectAll(false);
						crossPageSelectionChangedCallback([], false, [], []);
					}
				}
			} else {
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
			}
		},
		[crossPageSelectionChangedCallback, crossPageSelectionEnabled, rows, selectionChangedCallback]
	);

	const handleRowSelectionChange = useCallback(
		(event: SolaceCheckboxChangeEvent) => {
			if (
				(crossPageSelectionEnabled && !crossPageSelectionChangedCallback) ||
				(!crossPageSelectionEnabled && !selectionChangedCallback)
			) {
				return;
			}

			const selectedObj = rows.find((row) => row.id === event.name);
			if (selectedObj) {
				// found the selected row object
				if (event.value) {
					if (!selectedRowIds.includes(event.name)) {
						// a new checkbox is being selected
						const newSelectedRows = [
							...rows.filter((row) => selectedRowIds.includes(row.id) && row.id !== event.name),
							selectedObj
						];

						if (!crossPageSelectionEnabled) {
							selectionChangedCallback?.(newSelectedRows);

							if (newSelectedRows.length === rows.length && !selectAll) {
								// all items in the list have been selected, check the "Select All" checkbox
								setSelectAll(true);
							}
						} else if (crossPageSelectionEnabled && crossPageSelectionChangedCallback) {
							const newSelectedRowIds = [...selectedRowIds, event.name];

							if (allPagesSelectedByDefault) {
								crossPageSelectionChangedCallback(
									newSelectedRows,
									true,
									newSelectedRowIds,
									deselectedRowIds.filter((id) => id !== event.name)
								);
							} else {
								crossPageSelectionChangedCallback(newSelectedRows, false, newSelectedRowIds, deselectedRowIds);
							}
						}
					}
				} else {
					// a checkbox is being unselected
					const newSelectedRows = rows.filter((row) => selectedRowIds.includes(row.id) && row.id !== event.name);
					if (!crossPageSelectionEnabled) {
						selectionChangedCallback?.(newSelectedRows);
						if (newSelectedRows.length < rows.length && selectAll) {
							// not all items in the list have been selected, uncheck the "Select All" checkbox
							setSelectAll(false);
						}
					} else if (crossPageSelectionEnabled && crossPageSelectionChangedCallback) {
						const newSelectedRowIds = selectedRowIds.filter((id) => id !== event.name);
						if (allPagesSelectedByDefault) {
							const newDeselectedRowIds = [...deselectedRowIds, event.name];
							if (newDeselectedRowIds.length === totalObjectCount) {
								// every item is deselected, exit allPageSelectedByDefault
								crossPageSelectionChangedCallback([], false, [], []);
							} else {
								crossPageSelectionChangedCallback(newSelectedRows, true, newSelectedRowIds, newDeselectedRowIds);
							}
						} else {
							crossPageSelectionChangedCallback(newSelectedRows, false, newSelectedRowIds, deselectedRowIds);
						}
					}
				}
			}
		},
		[
			crossPageSelectionEnabled,
			crossPageSelectionChangedCallback,
			selectionChangedCallback,
			rows,
			selectedRowIds,
			selectAll,
			allPagesSelectedByDefault,
			deselectedRowIds,
			totalObjectCount
		]
	);

	const columnNodes = useTableHeaderRenderHelper({
		// pass down from SolaceTable props
		selectionType,
		sortedColumn,
		rowActionMenuItems,
		renderCustomRowActionItem,
		headerHoverCallback,
		hasColumnHiding,
		displayedColumns,
		expandableRowOptions,
		customContentDefinitions,
		displayedCustomContent,
		customContentDisplayChangeCallback,
		customMenuActions,
		// state and callbacks defined in useSolaceTable
		crossPageSelectionEnabled,
		selectAll,
		indeterminate,
		handleSelectAllChange,
		internalSortedColumn,
		handleSort,
		internalDisplayedColumns,
		handleDisplayColumnsChanged
	});

	const rowNodes = useTableBodyRenderHelper({
		// pass down from SolaceTable props
		rows,
		selectionType,
		selectedRowIds,
		independentRowHighlight,
		highlightedRowId,
		renderCustomRowCells,
		rowActionMenuItems,
		renderCustomRowActionItem,
		rowHoverCallback,
		hasColumnHiding,
		displayedColumns,
		expandableRowOptions,
		// state and callbacks defined in useSolaceTable
		internalDisplayedColumns,
		handleDisplayColumnsChanged,
		handleRowSelectionChange,
		handleRowClick
	});

	return [columnNodes, rowNodes];
};
