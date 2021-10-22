import React, { useState, useEffect } from "react";
import {
	SELECTION_TYPE,
	TableRow,
	addActionMenuIcon,
	TableColumn,
	addEmptyRowCell,
	StyledTableData
} from "../table-utils";
import { CustomTableRowProps, StyledTableRow } from "./useSolaceTable";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SolaceCheckBox from "../../form/SolaceCheckBox";

export const useExpandableRows = ({
	rows,
	displayedColumns,
	selectionType,
	updateSelection,
	handleCheckboxClick,
	renderCustomRow,
	rowActionMenuItems,
	rowHoverCallback,
	hasColumnHiding,
	displayedColumnsChangedCallback
}: CustomTableRowProps): React.ReactNode[] => {
	const [expansionState, setExpansionState] = useState<Array<number>>([]);
	const [rowWithOpenActionMenu, setRowWithOpenActionMenu] = useState<string>();

	useEffect(() => {
		setExpansionState([]);
		if (displayedColumnsChangedCallback) {
			displayedColumnsChangedCallback(displayedColumns);
		}
	}, [rows, displayedColumnsChangedCallback, displayedColumns]);

	function addCheckBoxToRows(row: TableRow): React.ReactNode {
		return (
			<StyledTableData key={`${row.id}rowCheckbox`} className="checkbox" onClick={(e) => e.stopPropagation()}>
				<span style={{ display: "flex", maxWidth: "40px" }}>
					<SolaceCheckBox
						name={`${row.id}rowCheckbox`}
						onChange={() => handleCheckboxClick(row)}
						isChecked={!!row.rowSelected}
					/>
				</span>
			</StyledTableData>
		);
	}

	function addChevronToRows(row: TableRow, rowIndex: number): React.ReactNode | void {
		return expansionState.includes(rowIndex) ? (
			<StyledTableData key={`${row.id}chevronDown`}>
				<KeyboardArrowDown
					fontSize="large"
					className="cursor-pointer"
					onClick={(e) => {
						e.stopPropagation();
						setExpansionState(expansionState.filter((index) => index !== rowIndex));
					}}
				/>
			</StyledTableData>
		) : (
			<StyledTableData key={`${row.id}chevronRight`}>
				<KeyboardArrowRight
					fontSize="large"
					className="cursor-pointer"
					onClick={(e) => {
						e.stopPropagation();
						setExpansionState([...expansionState, rowIndex]);
					}}
				/>
			</StyledTableData>
		);
	}

	function openRowActionMenu(e: React.MouseEvent<HTMLElement>, row: TableRow) {
		e.stopPropagation();
		setRowWithOpenActionMenu(row.id);
	}

	function createExpandableRowNodes(): React.ReactNode[] {
		return rows.map((row: TableRow, rowIndex) => (
			<React.Fragment key={`${row.id}_wrapper`}>
				<StyledTableRow
					onMouseEnter={rowHoverCallback ? () => rowHoverCallback(row) : undefined}
					onClick={() => updateSelection(row)}
					className={row.rowSelected ? "selected" : ""}
				>
					{[
						selectionType === SELECTION_TYPE.MULTI && addCheckBoxToRows(row),
						addChevronToRows(row, rowIndex),
						displayedColumns.map((col: TableColumn) => {
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
				{expansionState.includes(rowIndex) ? renderCustomRow().renderChildren(row) : null}
			</React.Fragment>
		));
	}

	const expandableRows = createExpandableRowNodes();

	return expandableRows;
};
