import React, { useCallback, useEffect, useState } from "react";
import { TableColumn, SELECTION_TYPE, SORT_DIRECTION } from "./SolaceTable";
import { styled } from "@material-ui/core";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Sort from "@material-ui/icons/Sort";
import SolaceCheckBox from "../form/SolaceCheckBox";

const StyledTableRow = styled("tr")(() => ({
	borderCollapse: "collapse",
	border: "1px solid rgba(0, 0, 0, 0.05)",
	padding: "4px",
	height: "32px",
	"&.selected": {
		backgroundColor: "#e8f9f4"
	}
}));

const StyledTableData = styled("td")(() => ({
	borderCollapse: "collapse",
	borderBottom: "1px solid #e8e8e8",
	padding: "4px",
	"& span": {
		cursor: "pointer"
	},
	"&.checkbox-cell": {
		width: "30px",
		textAlign: "center"
	}
}));

const StyledTableHeader = styled("th")(() => ({
	borderCollapse: "collapse",
	padding: "4px",
	minWidth: "30px",
	height: "32px",
	textAlign: "left",
	"&.sortable": {
		position: "relative",
		cursor: "pointer",
		paddingLeft: "8px",
		marginTop: "3px",
		"&.inactive": {
			color: "grey"
		}
	}
}));

export const useSolaceTable = (
	rows: Record<string, unknown>[],
	columns: TableColumn[],
	selectionType: SELECTION_TYPE,
	selectionChangedCallback: (row: Record<string, unknown>[]) => void,
	sortCallback: (column: TableColumn) => void,
	preSelectedColumn: TableColumn | undefined
): React.ReactNode[] => {
	const [selectedRows, setSelectedRows] = useState<Record<string, unknown>[]>([]);
	const [selectedColumn, setSelectedColumn] = useState<TableColumn>(preSelectedColumn ? preSelectedColumn : columns[0]);
	const [sortDirection, setSortDirection] = useState<SORT_DIRECTION>(SORT_DIRECTION.DCS);
	const [selectAll, setSelectAll] = useState(false);

	useEffect(() => {
		selectionChangedCallback(selectedRows);
		if (selectedRows.length === rows.length) {
			setSelectAll(true);
		} else {
			setSelectAll(false);
		}
	}, [selectedRows, rows.length, selectedRows.length, selectionChangedCallback]);

	useEffect(() => {
		sortCallback(selectedColumn);
	}, [selectedColumn, sortDirection]);

	function updateSelection(row: any) {
		handleSelectionChanged(row);
	}

	function handleSelectionChanged(row: any) {
		if (selectionType !== SELECTION_TYPE.NONE) {
			handleSingleSelection(row);
		}
	}

	function handleSingleSelection(row: any) {
		const selectedIndex = rows.findIndex((row) => row.solaceTableSelected);
		rows[selectedIndex] = { ...rows[selectedIndex], solaceTableSelected: false };
		row.solaceTableSelected = !row.solaceTableSelected;
		setSelectedRows(row.solaceTableSelected ? [row] : []);
	}

	function handleSort(col: any) {
		if (selectedColumn?.field === col.field) {
			col.sortDirection = col.sortDirection === SORT_DIRECTION.DCS ? SORT_DIRECTION.ASC : SORT_DIRECTION.DCS;
			setSelectedColumn(col);
			setSortDirection(col.sortDirection);
		} else {
			setSelectedColumn(col);
		}
	}

	function selectAllSelectionChanged() {
		rows.map((row) => (row.solaceTableSelected = !row.solaceTableSelected));
		setSelectedRows(selectAll ? [] : rows);
	}

	function checkboxSelectionChanged(row: Record<string, unknown>) {
		row.solaceTableSelected = !row.solaceTableSelected;
		setSelectedRows(
			row.solaceTableSelected ? [...selectedRows, row] : selectedRows.filter((item) => row.id !== item.id)
		);
	}

	function addCheckBoxToHeader(): React.ReactNode | void {
		if (selectionType === SELECTION_TYPE.MULTI) {
			return (
				<StyledTableHeader key={"selectAllCheckbox"}>
					<SolaceCheckBox
						name={"selectAllCheckbox"}
						onChange={() => selectAllSelectionChanged()}
						isChecked={selectAll}
					/>
				</StyledTableHeader>
			);
		} else {
			return;
		}
	}

	function addCheckBoxToRows(row: Record<string, unknown>): React.ReactNode | void {
		if (selectionType === SELECTION_TYPE.MULTI) {
			return (
				<StyledTableData key={`${row.id}rowCheckbox`} className="checkbox-cell" onClick={(e) => e.stopPropagation()}>
					<SolaceCheckBox
						name={`${row.id}rowCheckbox`}
						onChange={() => checkboxSelectionChanged(row)}
						isChecked={!!row.solaceTableSelected}
					/>
				</StyledTableData>
			);
		} else {
			return;
		}
	}

	function creatRowNodes(): React.ReactNode[] {
		return rows.map((row: any) => (
			<StyledTableRow
				key={row.id}
				onClick={() => updateSelection(row)}
				className={row.solaceTableSelected ? "selected" : ""}
			>
				{[
					addCheckBoxToRows(row),
					columns.map((item) => (
						<StyledTableData key={row[item.field]}>
							<span>{row[item.field]}</span>
						</StyledTableData>
					))
				]}
			</StyledTableRow>
		));
	}

	const createColumnNodes = useCallback(() => {
		return (
			<StyledTableRow>
				{[
					addCheckBoxToHeader(),
					...columns.map((col) => (
						<StyledTableHeader key={col.headerName} className={col.sortable ? "sortable" : ""}>
							<>
								{col.headerName}
								{selectedColumn?.field === col.field &&
									col.sortable &&
									(col.sortDirection === SORT_DIRECTION.DCS ? (
										<ArrowDropUp style={{ marginLeft: "2px" }} onClick={() => handleSort(col)} />
									) : (
										<ArrowDropDown style={{ marginLeft: "2px" }} onClick={() => handleSort(col)} />
									))}
								{selectedColumn?.field !== col.field && col.sortable && (
									<Sort style={{ marginLeft: "4px" }} onClick={() => handleSort(col)} />
								)}
							</>
						</StyledTableHeader>
					))
				]}
			</StyledTableRow>
		);
	}, [selectedColumn, selectedColumn?.field, selectedColumn?.sortDirection, selectAll]);

	const rowNodes = creatRowNodes();
	const columnNodes = createColumnNodes();

	return [columnNodes, rowNodes];
};

/*
 - checkbox OK
 - resizing
 - column hiding
 - sorting (icon) OK
 - selection (none, single, multi) single by row, multi checkbox OK
 - custom rows

*/
