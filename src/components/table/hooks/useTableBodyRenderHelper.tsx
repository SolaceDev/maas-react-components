/* eslint-disable sonarjs/cognitive-complexity */
import React, { useCallback, useMemo } from "react";
import {
	SELECTION_TYPE,
	StyledTableData,
	StyledTableRow,
	TableActionMenuItem,
	TableColumn,
	TableRow,
	addActionMenuIcon,
	addEmptyRowCell
} from "../table-utils";
import SolaceTooltip from "../../SolaceToolTip";
import SolaceCheckBox, { SolaceCheckboxChangeEvent } from "../../form/SolaceCheckBox";

import clsx from "clsx";
import { ExpandableRowOptions } from "../SolaceTable";
import { useExpandableRows } from "./useExpandableRows";

const DEFAULT_TOOLTIP_PLACEMENT = "bottom-end";

const useTableBodyRenderHelper = ({
	// pass down from SolaceTable props
	rows,
	selectionType,
	selectedRowIds,
	disabledRowIds,
	independentRowHighlight,
	highlightedRowId,
	renderCustomRowCells,
	rowActionMenuItems,
	renderCustomRowActionItem,
	rowHoverCallback,
	hasColumnHiding = false,
	displayedColumns,
	expandableRowOptions,
	// state and callbacks defined in useSolaceTable
	internalDisplayedColumns,
	handleDisplayColumnsChanged,
	handleRowSelectionChange,
	handleRowClick
}: {
	// pass down from SolaceTable props
	rows: TableRow[];
	selectionType: SELECTION_TYPE;
	selectedRowIds: string[];
	disabledRowIds?: string[];
	independentRowHighlight: boolean;
	highlightedRowId?: string | null;
	renderCustomRowCells?: (row: TableRow) => JSX.Element[];
	rowActionMenuItems?: TableActionMenuItem[];
	renderCustomRowActionItem?: (row: TableRow) => TableActionMenuItem[];
	rowHoverCallback?: (row: TableRow) => void;
	hasColumnHiding?: boolean;
	displayedColumns?: TableColumn[];
	expandableRowOptions?: ExpandableRowOptions;
	// state and callbacks defined in useSolaceTable
	internalDisplayedColumns: TableColumn[] | undefined;
	handleDisplayColumnsChanged: (cols: TableColumn[]) => void;
	handleRowSelectionChange: (event: SolaceCheckboxChangeEvent) => void;
	handleRowClick: (clickedRow: TableRow) => void;
}) => {
	const addCheckBoxToRows = useCallback(
		(row: TableRow): React.ReactNode => {
			return (
				<StyledTableData key={`${row.id}_rowCheckbox`} className="checkbox" onClick={(e) => e.stopPropagation()}>
					<SolaceCheckBox
						name={`${row.id}`}
						onChange={handleRowSelectionChange}
						checked={selectedRowIds.includes(row.id)}
						disabled={disabledRowIds?.includes(row.id)}
					/>
				</StyledTableData>
			);
		},
		[selectedRowIds, disabledRowIds, handleRowSelectionChange]
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

	const hasRowActionItems = useMemo(() => {
		return (
			!!renderCustomRowActionItem ||
			(rowActionMenuItems && rowActionMenuItems.length > 0) ||
			(!rowActionMenuItems && hasColumnHiding)
		);
	}, [hasColumnHiding, renderCustomRowActionItem, rowActionMenuItems]);

	const renderConfiguredRowCells = useCallback(
		(
			row: TableRow,
			displayedColumnsParam: TableColumn[] | undefined,
			internalDisplayedColumnsParam: TableColumn[] | undefined
		): React.ReactNode[] => {
			if (renderCustomRowCells) {
				return renderCustomRowCells(row);
			} else {
				const columnsToDisplay = (displayedColumnsParam ? displayedColumnsParam : internalDisplayedColumnsParam) ?? [];
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
							: selectedRowIds.includes(row.id),
					clickable:
						(selectionType === SELECTION_TYPE.MULTI || selectionType === SELECTION_TYPE.SINGLE) &&
						!disabledRowIds?.includes(row.id),
					disabled: disabledRowIds?.includes(row.id)
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
		selectedRowIds,
		disabledRowIds,
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
		selectedRowIds,
		independentRowHighlight,
		highlightedRowId,
		addCheckBoxToRows,
		renderConfiguredRowCells,
		hasRowActionItems,
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
	return expandableRowOptions ? expandableRows.createRowNodes() : createRowNodes();
};

export default useTableBodyRenderHelper;
