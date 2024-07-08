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
import { ArrowRightIcon } from "../../../resources/icons/ArrowRight";
import clsx from "clsx";

export interface ExpandableTableRowProps {
	enabled: boolean;
	rows: TableRow[];
	displayedColumns?: TableColumn[];
	internalDisplayedColumns?: TableColumn[];
	selectionType: SELECTION_TYPE;
	selectedRowIds: string[];
	handleRowClick: (row: TableRow) => void;
	independentRowHighlight: boolean;
	highlightedRowId?: string | null;
	addCheckBoxToRows: (row: TableRow) => React.ReactNode;
	renderConfiguredRowCells: (
		row: TableRow,
		displayedColumns: TableColumn[] | undefined,
		internalDisplayedColumns: TableColumn[] | undefined
	) => React.ReactNode[];
	hasRowActionItems: boolean;
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
	enabled,
	rows,
	displayedColumns,
	internalDisplayedColumns,
	selectionType,
	selectedRowIds,
	handleRowClick,
	independentRowHighlight,
	highlightedRowId,
	addCheckBoxToRows,
	renderConfiguredRowCells,
	hasRowActionItems,
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

	useEffect(() => {
		if (!enabled) {
			return;
		}
		let numberOfDisplayedDataCols = 0;
		const columnsToDisplay = displayedColumns ? displayedColumns : internalDisplayedColumns;
		if (columnsToDisplay && columnsToDisplay.length > 0) {
			columnsToDisplay.forEach((col) => {
				if (!col.isHidden) {
					numberOfDisplayedDataCols++;
				}
			});
			let numberOfNonDataCols = 0;

			if (allowToggle) numberOfNonDataCols++;
			if (selectionType === SELECTION_TYPE.MULTI) numberOfNonDataCols++;
			if (hasRowActionItems) numberOfNonDataCols++;
			setDisplayedColumnsCount(numberOfDisplayedDataCols + numberOfNonDataCols);
		}
	}, [
		rows,
		enabled,
		displayedColumns,
		internalDisplayedColumns,
		displayedColumnsChangedCallback,
		hasColumnHiding,
		allowToggle,
		selectionType,
		hasRowActionItems
	]);

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
				<ArrowRightIcon className={`cursor-pointer chevron ${rowExpanded ? "expanded" : ""}`} />
			</StyledTableData>
		);
	}

	function renderChildrenSection(row: TableRow, expanded: boolean): React.ReactNode {
		return (
			expanded &&
			renderChildren && (
				<StyledExpandedTableRow
					key={`${row.id}_childrenTr`}
					className={clsx({
						selected:
							selectionType === SELECTION_TYPE.MULTI && independentRowHighlight
								? highlightedRowId === row.id
								: selectedRowIds?.includes(row.id),
						clickable: selectionType === SELECTION_TYPE.MULTI || selectionType === SELECTION_TYPE.SINGLE,
						expanded: expanded
					})}
					onClick={() => {
						if (selectRowWhenClickOnChildren) handleRowClick(row);
					}}
				>
					{/* Make displayedColumnsCount part of key to force expanded content to rerender when column show/hide changes. This solves issue where sometimes <td> with colspan not expanding to full table width  */}
					<StyledExpandedTableData
						key={`${row.id}_childrenTd_${displayedColumnsCount}`}
						colSpan={displayedColumnsCount}
					>
						{renderChildren(row)}
					</StyledExpandedTableData>
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
						key={row.id}
						onMouseEnter={rowHoverCallback ? () => rowHoverCallback(row) : undefined}
						onClick={() => handleRowClick(row)}
						className={clsx({
							selected:
								selectionType === SELECTION_TYPE.MULTI && independentRowHighlight
									? highlightedRowId === row.id
									: selectedRowIds?.includes(row.id),
							clickable: selectionType === SELECTION_TYPE.MULTI || selectionType === SELECTION_TYPE.SINGLE,
							expanded: expanded
						})}
						data-qa={row.id}
					>
						{[
							selectionType === SELECTION_TYPE.MULTI && addCheckBoxToRows(row),
							addChevronToRows(row),
							...renderConfiguredRowCells(row, displayedColumns, internalDisplayedColumns),
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
