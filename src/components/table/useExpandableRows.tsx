import React, { useState } from "react";
import { SELECTION_TYPE } from "./table-utils";
import { StyledTableRow, StyledTableData, CustomTableRowProps } from "./useSolaceTable";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SolaceCheckBox from "../form/SolaceCheckBox";

export const useExpandableRows = ({
	rows,
	columns,
	selectionType,
	updateSelection,
	handleCheckboxClick,
	renderCustomRow
}: CustomTableRowProps): React.ReactNode[] => {
	const [expansionState, setExpansionState] = useState<Array<number>>([]);

	function addCheckBoxToRows(row: Record<string, unknown>): React.ReactNode {
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

	function addChevronToRows(row: Record<string, unknown>, rowIndex: number): React.ReactNode | void {
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

	function createExpandableRowNodes(): React.ReactNode[] {
		return rows.map((row: Record<string, unknown>, rowIndex) => (
			<React.Fragment key={`${row.id}_wrapper`}>
				<StyledTableRow onClick={() => updateSelection(row)} className={row.rowSelected ? "selected" : ""}>
					{[
						selectionType === SELECTION_TYPE.MULTI && addCheckBoxToRows(row, rowIndex),
						addChevronToRows(row, rowIndex),
						columns.map((col) => {
							if (!col.hasNoRows) {
								return (
									<StyledTableData key={row[col.field]}>
										<span>{row[col.field]}</span>
									</StyledTableData>
								);
							}
						})
					]}
				</StyledTableRow>
				{expansionState.includes(rowIndex) ? renderCustomRow().renderChildren(row) : null}
			</React.Fragment>
		));
	}

	const expandableRows = createExpandableRowNodes();

	return expandableRows;
};
