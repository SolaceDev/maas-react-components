import React, { useState } from "react";
import { SELECTION_TYPE } from "./SolaceTable";
import { StyledTableRow, StyledTableData, CustomTableRowProps } from "./useSolaceTable";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SolaceCheckBox from "../form/SolaceCheckBox";

export const useExpandableRows = ({
	rows,
	columns,
	selectionType,
	updateSelection,
	checkboxSelectionChanged,
	renderCustomRow
}: CustomTableRowProps): React.ReactNode[] => {
	const [expansionState, setExpansionState] = useState<Array<number>>([]);

	function addCheckBoxToRows(row: Record<string, unknown>, rowIndex: number): React.ReactNode | void {
		if (selectionType === SELECTION_TYPE.MULTI) {
			return (
				<StyledTableData key={`${row.id}rowCheckbox`} className="checkbox" onClick={(e) => e.stopPropagation()}>
					<span style={{ display: "flex", maxWidth: "40px" }}>
						<SolaceCheckBox
							name={`${row.id}rowCheckbox`}
							onChange={() => checkboxSelectionChanged(row)}
							isChecked={!!row.solaceTableSelected}
						/>
						{addChevronToRows(row, rowIndex)}
					</span>
				</StyledTableData>
			);
		} else {
			return;
		}
	}

	function addChevronToRows(row: Record<string, unknown>, rowIndex: number): React.ReactNode | void {
		return expansionState.includes(rowIndex) ? (
			<KeyboardArrowDown
				fontSize="large"
				key={`${row.id}chevronDown`}
				className="cursor-pointer"
				onClick={() => setExpansionState(expansionState.filter((index) => index !== rowIndex))}
			/>
		) : (
			<KeyboardArrowRight
				fontSize="large"
				key={`${row.id}chevronRight`}
				className="cursor-pointer"
				onClick={() => setExpansionState([...expansionState, rowIndex])}
			/>
		);
	}

	function creatExpandableRowNodes(): React.ReactNode[] {
		return rows.map((row: Record<string, unknown>, rowIndex) => (
			<React.Fragment key={`${row.id}_wrapper`}>
				<StyledTableRow onClick={() => updateSelection(row)} className={row.solaceTableSelected ? "selected" : ""}>
					{[
						addCheckBoxToRows(row, rowIndex),
						columns.map((item) => (
							<StyledTableData key={row.id + row[item.field]}>
								<span>{row[item.field]}</span>
							</StyledTableData>
						))
					]}
				</StyledTableRow>
				{expansionState.includes(rowIndex) ? renderCustomRow().renderChildren(row) : null}
			</React.Fragment>
		));
	}

	const expandableRows = creatExpandableRowNodes();

	return expandableRows;
};
