import React, { useCallback, useEffect, useState } from "react";
import { TableColumn, SELECTION_TYPE, SORT_DIRECTION } from "./table-utils";
import { styled, useTheme } from "@material-ui/core";
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
	handleCheckboxClick: (row: Record<string, unknown>) => void;
	renderCustomRow: () => {
		renderRow: (customRowProps: CustomTableRowProps) => React.ReactNode;
		renderChildren: (row: Record<string, unknown>) => React.ReactNode;
	};
}

export interface CustomTableColumnProps {
	columns: TableColumn[];
	sortedColumn: TableColumn | undefined;
	selectAll: boolean;
	handleSort: (column: TableColumn) => void;
	handleSelectAllClick: () => void;
}

export const useSolaceTable = (
	rows: Record<string, unknown>[],
	columns: TableColumn[],
	selectionType: SELECTION_TYPE,
	selectionChangedCallback: (row: Record<string, unknown>[]) => void,
	sortCallback: (column: TableColumn | undefined) => void,
	preSelectedColumn: TableColumn | undefined,
	renderCustomRow?: () => {
		renderRow: (customRowProps: CustomTableRowProps) => React.ReactNode;
		renderChildren: (row: Record<string, unknown>) => React.ReactNode;
	},
	renderCustomHeader?: (customColumnProps: CustomTableColumnProps) => React.ReactNode
): React.ReactNode[] => {
	const [selectedRows, setSelectedRows] = useState<Record<string, unknown>[]>([]);
	const [sortedColumn, setSortedColumn] = useState<TableColumn | undefined>(
		preSelectedColumn ? preSelectedColumn : columns.find((col) => col.sortable)
	);
	const [sortDirection, setSortDirection] = useState<SORT_DIRECTION>(SORT_DIRECTION.DCS);
	const [selectAll, setSelectAll] = useState(false);

	const theme = useTheme();

	useEffect(() => {
		selectionChangedCallback(selectedRows);
		if (rows.length !== 0 && selectedRows.length === rows.length) {
			setSelectAll(true);
		} else {
			setSelectAll(false);
		}
	}, [selectedRows, rows.length, selectedRows.length, selectionChangedCallback]);

	useEffect(() => {
		sortCallback(sortedColumn);
	}, [sortedColumn, sortDirection, sortCallback]);

	function updateSelection(row: Record<string, unknown>) {
		handleSelectionChanged(row);
	}

	function handleSelectionChanged(row: Record<string, unknown>) {
		if (selectionType !== SELECTION_TYPE.NONE) {
			handleSingleSelection(row);
		}
	}

	function handleSingleSelection(clickedRow: Record<string, unknown>) {
		clickedRow.rowSelected = selectedRows.length > 1 ? true : !clickedRow.rowSelected;
		setSelectAll(false);
		rows.map((row) => {
			if (clickedRow.id !== row.id) {
				row.rowSelected = false;
			}
		});
		setSelectedRows(clickedRow.rowSelected ? [clickedRow] : []);
	}

	const handleSort = useCallback(
		(col: TableColumn) => {
			if (sortedColumn?.field === col.field) {
				col.sortDirection = col.sortDirection === SORT_DIRECTION.DCS ? SORT_DIRECTION.ASC : SORT_DIRECTION.DCS;
				setSortedColumn(col);
				setSortDirection(col.sortDirection);
			} else {
				setSortedColumn(col);
			}
		},
		[sortedColumn?.field]
	);

	const handleSelectAllClick = useCallback(() => {
		rows.map((row) => (row.rowSelected = !selectAll));
		setSelectedRows(selectAll ? [] : rows);
	}, [rows, selectAll]);

	function handleCheckboxClick(row: Record<string, unknown>) {
		row.rowSelected = !row.rowSelected;
		setSelectedRows(row.rowSelected ? [...selectedRows, row] : selectedRows.filter((item) => row.id !== item.id));
	}

	const addCheckBoxToHeader = useCallback((): React.ReactNode | void => {
		if (selectionType === SELECTION_TYPE.MULTI) {
			return (
				<StyledTableHeader key={"selectAllCheckbox"}>
					<SolaceCheckBox name={"selectAllCheckbox"} onChange={() => handleSelectAllClick()} isChecked={selectAll} />
				</StyledTableHeader>
			);
		} else {
			return;
		}
	}, [selectAll, handleSelectAllClick, selectionType]);

	function addCheckBoxToRows(row: Record<string, unknown>): React.ReactNode {
		return (
			<StyledTableData key={`${row.id}rowCheckbox`} className="checkbox" onClick={(e) => e.stopPropagation()}>
				<SolaceCheckBox
					name={`${row.id}rowCheckbox`}
					onChange={() => handleCheckboxClick(row)}
					isChecked={!!row.rowSelected}
				/>
			</StyledTableData>
		);
	}

	function creatRowNodes(): React.ReactNode[] {
		return rows.map((row: any) => (
			<StyledTableRow key={row.id} onClick={() => updateSelection(row)} className={row.rowSelected ? "selected" : ""}>
				{[
					selectionType === SELECTION_TYPE.MULTI && addCheckBoxToRows(row),
					columns.map((col) => {
						if (!col.hasNoRows) {
							return (
								<StyledTableData key={row[col.field]}>
									<span>{row[col.field]}</span>
								</StyledTableData>
							);
						} else {
							return;
						}
					})
				]}
			</StyledTableRow>
		));
	}

	const createHeaderNodes = useCallback(() => {
		return (
			<StyledTableRow>
				{[
					addCheckBoxToHeader(),
					...columns.map((col) => (
						<StyledTableHeader key={col.headerName} className={col.sortable ? "sortable" : ""}>
							<>
								{col.headerName}
								{sortedColumn?.field === col.field &&
									col.sortable &&
									(col.sortDirection === SORT_DIRECTION.ASC ? (
										<ArrowDropUp sx={{ marginLeft: theme.spacing(0.25) }} onClick={() => handleSort(col)} />
									) : (
										<ArrowDropDown sx={{ marginLeft: theme.spacing(0.25) }} onClick={() => handleSort(col)} />
									))}
								{sortedColumn?.field !== col.field && col.sortable && (
									<Sort sx={{ marginLeft: theme.spacing(0.5) }} onClick={() => handleSort(col)} />
								)}
							</>
						</StyledTableHeader>
					))
				]}
			</StyledTableRow>
		);
	}, [sortedColumn, addCheckBoxToHeader, columns, handleSort, theme]);

	const rowNodes = renderCustomRow
		? renderCustomRow().renderRow({
				rows,
				columns,
				selectionType,
				updateSelection,
				handleCheckboxClick,
				renderCustomRow
		  })
		: creatRowNodes();

	const columnNodes = renderCustomHeader
		? renderCustomHeader({ columns, sortedColumn, selectAll, handleSort, handleSelectAllClick })
		: createHeaderNodes();

	return [columnNodes, rowNodes];
};
