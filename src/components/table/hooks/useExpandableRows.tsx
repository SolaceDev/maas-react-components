import React, { useEffect, useState } from "react";
import {
	SELECTION_TYPE,
	TableRow,
	TableColumn,
	StyledTableData,
	StyledTableRow,
	StyledExpandedTableRow,
	StyledExpandedTableData
} from "../table-utils";
import { ChevronIcon } from "../../../resources/icons/ChevronIcon";

export interface ExpandableTableRowProps {
	rows: TableRow[];
	displayedColumns: TableColumn[];
	selectionType: SELECTION_TYPE;
	updateSelection: (row: TableRow) => void;
	addCheckBoxToRows: (row: TableRow) => React.ReactNode;
	renderConfiguredRowCells: (row: TableRow) => React.ReactNode[];
	renderRowActionItems: (row: TableRow) => React.ReactNode[];
	rowHoverCallback?: (row: TableRow) => void;
	hasColumnHiding?: boolean;
	displayedColumnsChangedCallback?: (displayedColumns: TableColumn[]) => void;
	allowToggle?: boolean;
	selectRowWhenClickOnChildren?: boolean;
	renderChildren?: (row: TableRow) => React.ReactNode;
	expandedRowIds?: string[];
	setExpandedRowIds?: (rowIds: string[]) => void;
}

export const useExpandableRows = ({
	rows,
	displayedColumns,
	selectionType,
	updateSelection,
	addCheckBoxToRows,
	renderConfiguredRowCells,
	renderRowActionItems,
	rowHoverCallback,
	hasColumnHiding,
	displayedColumnsChangedCallback,
	allowToggle = true,
	selectRowWhenClickOnChildren = true,
	renderChildren,
	expandedRowIds,
	setExpandedRowIds
}: ExpandableTableRowProps) => {
	const [displayedColumnsCount, setDisplayedColumnsCount] = useState<number>();

	useEffect(
		() => {
			let numberOfDisplayedDataCols = 0;
			displayedColumns.forEach((col) => {
				if (!col.isHidden) {
					numberOfDisplayedDataCols++;
				}
			});
			let numberOfNonDataCols = 0;

			if (hasColumnHiding) numberOfNonDataCols++;
			if (allowToggle) numberOfNonDataCols++;
			if (selectionType === SELECTION_TYPE.MULTI) numberOfNonDataCols++;
			setDisplayedColumnsCount(numberOfDisplayedDataCols + numberOfNonDataCols);
			if (displayedColumnsChangedCallback) {
				displayedColumnsChangedCallback(displayedColumns);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[rows, displayedColumnsChangedCallback, displayedColumns]
	);

	function addChevronToRows(row: TableRow): React.ReactNode | void {
		if (!allowToggle) {
			return;
		}
		const rowExpanded = expandedRowIds && expandedRowIds?.findIndex((id) => id === row.id) >= 0;
		return (
			<StyledTableData
				key={`${row.id}_chevron`}
				className={"expand-icon"}
				onClick={(e) => {
					e.stopPropagation();
					if (expandedRowIds) {
						const foundIndex = expandedRowIds.findIndex((id) => id === row.id);
						if (foundIndex >= 0) {
							const newState = expandedRowIds.slice(0);
							newState.splice(foundIndex, 1);
							setExpandedRowIds?.(newState);
						} else {
							setExpandedRowIds?.([...expandedRowIds, row.id]);
						}
					}
				}}
			>
				<ChevronIcon className={`cursor-pointer chevron ${rowExpanded ? "expanded" : ""}`} />
			</StyledTableData>
		);
	}

	function renderChildrenSection(row: TableRow, expanded: boolean): React.ReactNode {
		return (
			expanded &&
			renderChildren && (
				<StyledExpandedTableRow
					className={row.rowSelected ? "selected expanded" : "expanded"}
					onClick={() => {
						if (selectRowWhenClickOnChildren) updateSelection(row);
					}}
				>
					<StyledExpandedTableData colSpan={displayedColumnsCount}>{renderChildren(row)}</StyledExpandedTableData>
				</StyledExpandedTableRow>
			)
		);
	}

	function createExpandableRowNodes(): React.ReactNode[] {
		return rows.map((row: TableRow) => {
			const expanded = !allowToggle || !!expandedRowIds?.find((id) => id === row.id);
			return (
				<React.Fragment key={`${row.id}_wrapper`}>
					<StyledTableRow
						onMouseEnter={rowHoverCallback ? () => rowHoverCallback(row) : undefined}
						onClick={() => updateSelection(row)}
						className={`${row.rowSelected ? "selected" : ""} ${expanded ? "expanded" : ""}`}
					>
						{[
							selectionType === SELECTION_TYPE.MULTI && addCheckBoxToRows(row),
							addChevronToRows(row),
							...renderConfiguredRowCells(row),
							...renderRowActionItems(row)
						]}
					</StyledTableRow>
					{renderChildrenSection(row, expanded)}
				</React.Fragment>
			);
		});
	}

	return {
		createRowNodes: createExpandableRowNodes
	};
};
