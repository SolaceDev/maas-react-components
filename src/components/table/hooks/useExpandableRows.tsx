import React, { useEffect } from "react";
import { SELECTION_TYPE, TableRow, TableColumn, StyledTableData, StyledTableRow } from "../table-utils";
import SolaceCheckBox from "../../form/SolaceCheckBox";
import { ChevronIcon } from "../../../resources/icons/ChevronIcon";

export interface ExpandableTableRowProps {
	rows: TableRow[];
	displayedColumns: TableColumn[];
	selectionType: SELECTION_TYPE;
	updateSelection: (row: TableRow) => void;
	handleCheckboxClick: (row: TableRow) => void;
	renderConfiguredRowCells: (row: TableRow) => React.ReactNode[];
	renderExpandedRowContent?: (row: TableRow) => React.ReactNode;
	renderRowActionItems: (row: TableRow) => React.ReactNode[];
	rowHoverCallback?: (row: TableRow) => void;
	displayedColumnsChangedCallback?: (displayedColumns: TableColumn[]) => void;
	expandedRowIds?: string[];
	setExpandedRowIds?: (rowIds: string[]) => void;
}

export const useExpandableRows = ({
	rows,
	displayedColumns,
	selectionType,
	updateSelection,
	handleCheckboxClick,
	renderConfiguredRowCells,
	renderExpandedRowContent,
	renderRowActionItems,
	rowHoverCallback,
	displayedColumnsChangedCallback,
	expandedRowIds,
	setExpandedRowIds
}: ExpandableTableRowProps) => {
	useEffect(() => {
		if (displayedColumnsChangedCallback) {
			displayedColumnsChangedCallback(displayedColumns);
		}
	}, [rows, displayedColumnsChangedCallback, displayedColumns]);

	function addCheckBoxToRows(row: TableRow): React.ReactNode {
		return (
			<StyledTableData key={`${row.id}_rowCheckbox`} className="checkbox" onClick={(e) => e.stopPropagation()}>
				<span style={{ display: "flex", maxWidth: "40px" }}>
					<SolaceCheckBox
						name={`${row.id}rowCheckbox`}
						onChange={() => handleCheckboxClick(row)}
						checked={!!row.rowSelected}
					/>
				</span>
			</StyledTableData>
		);
	}

	function addChevronToRows(row: TableRow): React.ReactNode | void {
		return (
			<StyledTableData
				key={`${row.id}_chevron`}
				className={"expand-data"}
				onClick={(e) => {
					e.stopPropagation();
					if (expandedRowIds) {
						const foundIndex = expandedRowIds.findIndex((id) => id === row.id);
						console.log("foundIndex", foundIndex);
						if (foundIndex >= 0) {
							const newState = expandedRowIds.slice(0);
							newState.splice(foundIndex, 1);
							console.log("remove", row.id, newState);
							setExpandedRowIds?.(newState);
						} else {
							console.log("add", row.id, [...expandedRowIds, row.id], setExpandedRowIds);
							setExpandedRowIds?.([...expandedRowIds, row.id]);
						}
					}
				}}
			>
				<ChevronIcon
					className={`cursor-pointer chevron ${expandedRowIds?.find((id) => id === row.id) ? "expanded" : ""}`}
				/>
			</StyledTableData>
		);
	}

	function createExpandableRowNodes(): React.ReactNode[] {
		return rows.map((row: TableRow) => (
			<React.Fragment key={`${row.id}_wrapper`}>
				<StyledTableRow
					onMouseEnter={rowHoverCallback ? () => rowHoverCallback(row) : undefined}
					onClick={() => updateSelection(row)}
					className={row.rowSelected ? "selected" : ""}
				>
					{[
						selectionType === SELECTION_TYPE.MULTI && addCheckBoxToRows(row),
						addChevronToRows(row),
						...renderConfiguredRowCells(row),
						...renderRowActionItems(row)
					]}
				</StyledTableRow>
				{expandedRowIds?.find((id) => id === row.id) && renderExpandedRowContent ? renderExpandedRowContent(row) : null}
			</React.Fragment>
		));
	}

	return {
		createRowNodes: createExpandableRowNodes
	};
};
