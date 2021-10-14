import React, { useCallback, useEffect, useState } from "react";
import { TableColumn, SELECTION_TYPE, SORT_DIRECTION } from "./SolaceTable";
import { styled } from "@material-ui/core";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Sort from "@material-ui/icons/Sort";
import SolaceCheckBox from "../form/SolaceCheckBox";
import { BASE_COLORS } from "./../../resources/colorPallette";

export const StyledTableRow = styled("tr")(({ theme }) => ({
	borderCollapse: "collapse",
	border: `1px solid ${BASE_COLORS.greys.grey0}`,
	padding: `${theme.spacing(0.5)} ${theme.spacing()}`,
	marginLeft: theme.spacing(0.5),
	height: "32px",
	"&.selected": {
		backgroundColor: "#e8f9f4"
	},
	"&:hover": {
		background: "#e5e5e5"
	},
	"&:hover + tr td table": {
		background: "#e5e5e5"
	}
}));

export const StyledTableData = styled("td")(({ theme }) => ({
	borderCollapse: "collapse",
	borderBottom: "1px solid #e8e8e8",
	padding: theme.spacing(),
	".cursor-pointer": {
		cursor: "pointer"
	},
	"&.checkbox": {
		textAlign: "center"
	}
}));

export const StyledTableHeader = styled("th")(({ theme }) => ({
	borderCollapse: "collapse",
	padding: `${theme.spacing(0.5)} ${theme.spacing()}`,
	minWidth: "30px",
	minHeight: "32px",
	textAlign: "left",
	"&.sortable": {
		position: "relative",
		cursor: "pointer",
		marginTop: theme.spacing(0.5)
	}
}));

export interface CustomTableRowProps {
	rows: Record<string, unknown>[];
	columns: TableColumn[];
	selectionType: SELECTION_TYPE;
	updateSelection: (row: Record<string, unknown>) => void;
	checkboxSelectionChanged: (row: Record<string, unknown>) => void;
	renderCustomRow: () => {
		renderRow: (customRowProps: CustomTableRowProps) => React.ReactNode;
		renderChildren: (row: Record<string, unknown>) => React.ReactNode;
	};
}

export interface CustomTableColumnProps {
	columns: TableColumn[];
	selectedColumn: TableColumn;
	selectAll: boolean;
	handleSort: (column: TableColumn) => void;
	selectAllSelectionChanged: () => void;
}

export const useSolaceTable = (
	rows: Record<string, unknown>[],
	columns: TableColumn[],
	selectionType: SELECTION_TYPE,
	selectionChangedCallback: (row: Record<string, unknown>[]) => void,
	sortCallback: (column: TableColumn) => void,
	preSelectedColumn: TableColumn | undefined,
	renderCustomRow?: () => {
		renderRow: (customRowProps: CustomTableRowProps) => React.ReactNode;
		renderChildren: (row: Record<string, unknown>) => React.ReactNode;
	},
	renderCustomColumn?: (customColumnProps: CustomTableColumnProps) => React.ReactNode
): React.ReactNode[] => {
	const [selectedRows, setSelectedRows] = useState<Record<string, unknown>[]>([]);
	const [selectedColumn, setSelectedColumn] = useState<TableColumn>(preSelectedColumn ? preSelectedColumn : columns[0]);
	const [sortDirection, setSortDirection] = useState<SORT_DIRECTION>(SORT_DIRECTION.DCS);
	const [selectAll, setSelectAll] = useState(false);

	useEffect(() => {
		selectionChangedCallback(selectedRows);
		if (rows.length !== 0 && selectedRows.length === rows.length) {
			setSelectAll(true);
		} else {
			setSelectAll(false);
		}
	}, [selectedRows, rows.length, selectedRows.length, selectionChangedCallback]);

	useEffect(() => {
		sortCallback(selectedColumn);
	}, [selectedColumn, sortDirection, sortCallback]);

	function updateSelection(row: Record<string, unknown>) {
		handleSelectionChanged(row);
	}

	function handleSelectionChanged(row: Record<string, unknown>) {
		if (selectionType !== SELECTION_TYPE.NONE) {
			handleSingleSelection(row);
		}
	}

	function handleSingleSelection(row: Record<string, unknown>) {
		const selectedIndex = rows.findIndex((row) => row.solaceTableSelected);
		rows[selectedIndex] = { ...rows[selectedIndex], solaceTableSelected: false };
		row.solaceTableSelected = !row.solaceTableSelected;
		setSelectedRows(row.solaceTableSelected ? [row] : []);
	}

	const handleSort = useCallback(
		(col: TableColumn) => {
			if (selectedColumn?.field === col.field) {
				col.sortDirection = col.sortDirection === SORT_DIRECTION.DCS ? SORT_DIRECTION.ASC : SORT_DIRECTION.DCS;
				setSelectedColumn(col);
				setSortDirection(col.sortDirection);
			} else {
				setSelectedColumn(col);
			}
		},
		[selectedColumn?.field]
	);

	const selectAllSelectionChanged = useCallback(() => {
		rows.map((row) => (row.solaceTableSelected = !selectAll));
		setSelectedRows(selectAll ? [] : rows);
	}, [rows, selectAll]);

	function checkboxSelectionChanged(row: Record<string, unknown>) {
		row.solaceTableSelected = !row.solaceTableSelected;
		setSelectedRows(
			row.solaceTableSelected ? [...selectedRows, row] : selectedRows.filter((item) => row.id !== item.id)
		);
	}

	const addCheckBoxToHeader = useCallback((): React.ReactNode | void => {
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
	}, [selectAll, selectAllSelectionChanged, selectionType]);

	function addCheckBoxToRows(row: Record<string, unknown>): React.ReactNode | void {
		if (selectionType === SELECTION_TYPE.MULTI) {
			return (
				<StyledTableData key={`${row.id}rowCheckbox`} className="checkbox" onClick={(e) => e.stopPropagation()}>
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
	}, [selectedColumn, addCheckBoxToHeader, columns, handleSort]);

	const rowNodes = renderCustomRow
		? renderCustomRow().renderRow({
				rows,
				columns,
				selectionType,
				updateSelection,
				checkboxSelectionChanged,
				renderCustomRow
		  })
		: creatRowNodes();

	const columnNodes = renderCustomColumn
		? renderCustomColumn({ columns, selectedColumn, selectAll, handleSort, selectAllSelectionChanged })
		: createColumnNodes();

	return [columnNodes, rowNodes];
};
