import React, { useCallback, useEffect, useState } from "react";
import {
	TableColumn,
	TableRow,
	TableActionMenuItem,
	SELECTION_TYPE,
	SORT_DIRECTION,
	addEmptyHeaderCell,
	addEmptyRowCell,
	addActionMenuIcon,
	addColumnHidingControl,
	StyledTableRow,
	StyledTableData,
	StyledTableHeader
} from "../table-utils";
import { useExpandableRows } from "./useExpandableRows";
import { AscendingSortIcon, DescendingSortIcon, UnsortedIcon } from "../../../resources/icons/SortIcons";
import SolaceCheckBox from "../../form/SolaceCheckBox";

import clsx from "clsx";
import { ExpandableRowOptions } from "../SolaceTable";

export interface CustomTableColumnProps {
	columns: TableColumn[];
	sortedColumn: TableColumn | undefined;
	selectAll: boolean;
	handleSort: (column: TableColumn) => void;
	handleSelectAllClick: () => void;
	addColumnHidingControl: (
		columns: TableColumn[],
		openColumnHidingControl: (e: React.MouseEvent<HTMLElement>) => void,
		isColumnHidingControlOpen: boolean,
		setIsColumnHidingControlOpen: () => void,
		setDisplayedColumns: (displayedColumns: TableColumn[]) => void
	) => React.ReactNode;
}

export const useSolaceTable = ({
	rows,
	columns,
	selectionType,
	selectionChangedCallback,
	sortCallback,
	initSortedColumn,
	renderCustomRowCells,
	renderCustomHeader,
	rowActionMenuItems,
	headerHoverCallback,
	rowHoverCallback,
	hasColumnHiding,
	displayedColumnsChangedCallback,
	expandableRowOptions
}: {
	rows: TableRow[];
	columns: TableColumn[];
	selectionType: SELECTION_TYPE;
	selectionChangedCallback: (row: TableRow[]) => void;
	sortCallback: (column: TableColumn | undefined) => void;
	initSortedColumn: TableColumn | undefined;
	renderCustomRowCells?: (row: TableRow) => JSX.Element[];
	renderCustomHeader?: (customColumnProps: CustomTableColumnProps) => React.ReactNode;
	rowActionMenuItems?: TableActionMenuItem[];
	headerHoverCallback?: () => void;
	rowHoverCallback?: (row: TableRow) => void;
	hasColumnHiding?: boolean;
	displayedColumnsChangedCallback?: (displayedColumns: TableColumn[]) => void;
	expandableRowOptions?: ExpandableRowOptions;
	// TODO: Refactor this function to reduce its Cognitive Complexity from 107 to the 15 allowed
	// eslint-disable-next-line sonarjs/cognitive-complexity
}): React.ReactNode[] => {
	const [selectedRows, setSelectedRows] = useState<TableRow[]>([]);
	const [sortedColumn, setSortedColumn] = useState<TableColumn | undefined>(
		initSortedColumn ? initSortedColumn : columns.find((col) => col.sortable)
	);
	const [displayedColumns, setDisplayedColumns] = useState(columns);
	const [selectAll, setSelectAll] = useState(false);
	const [rowWithOpenActionMenu, setRowWithOpenActionMenu] = useState<string | null>();
	const [isColumnHidingControlOpen, setIsColumnHidingControlOpen] = useState(false);

	useEffect(() => {
		selectionChangedCallback(selectedRows);
		if (rows.length !== 0 && selectedRows.length === rows.length) {
			setSelectAll(true);
		} else {
			setSelectAll(false);
		}
	}, [selectedRows, rows.length, selectedRows.length, selectionChangedCallback]);

	function updateSelection(row: TableRow) {
		if (selectionType !== SELECTION_TYPE.NONE) {
			handleSingleSelection(row);
		}
	}

	function handleSingleSelection(clickedRow: TableRow) {
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
			} else {
				col.sortDirection = SORT_DIRECTION.ASC;
			}
			setSortedColumn(col);
			sortCallback(col);
		},
		[sortedColumn, sortCallback]
	);

	const handleSelectAllClick = useCallback(() => {
		rows.map((row) => (row.rowSelected = !selectAll));
		setSelectedRows(selectAll ? [] : rows);
	}, [rows, selectAll]);

	function handleCheckboxClick(row: TableRow) {
		row.rowSelected = !row.rowSelected;
		setSelectedRows(row.rowSelected ? [...selectedRows, row] : selectedRows.filter((item) => row.id !== item.id));
	}

	const addCheckBoxToHeader = useCallback((): React.ReactNode | void => {
		if (selectionType === SELECTION_TYPE.MULTI) {
			return (
				<StyledTableHeader key={"selectAllCheckbox"} className="checkbox-column">
					<SolaceCheckBox name={"selectAllCheckbox"} onChange={() => handleSelectAllClick()} checked={selectAll} />
				</StyledTableHeader>
			);
		} else {
			return;
		}
	}, [selectAll, handleSelectAllClick, selectionType]);

	const addChevronToHeader = useCallback((): React.ReactNode | void => {
		if (expandableRowOptions?.allowToggle) {
			return <StyledTableHeader key={"expandHeader"} className="expand-column"></StyledTableHeader>;
		} else {
			return;
		}
	}, [expandableRowOptions?.allowToggle]);

	function addCheckBoxToRows(row: TableRow): React.ReactNode {
		return (
			<StyledTableData key={`${row.id}_rowCheckbox`} className="checkbox" onClick={(e) => e.stopPropagation()}>
				<SolaceCheckBox
					name={`${row.id}rowCheckbox`}
					onChange={() => handleCheckboxClick(row)}
					checked={!!row.rowSelected}
				/>
			</StyledTableData>
		);
	}

	function openRowActionMenu(e: React.MouseEvent<HTMLElement>, row: TableRow) {
		e.stopPropagation();
		setRowWithOpenActionMenu(row.id);
	}

	const openColumnHidingControl = useCallback(
		(e: React.MouseEvent<HTMLElement>): void => {
			e.stopPropagation();
			setIsColumnHidingControlOpen(!isColumnHidingControlOpen);
		},
		[isColumnHidingControlOpen]
	);

	const renderRowActionItems = (row: TableRow): React.ReactNode[] => {
		return [
			!!rowActionMenuItems &&
				addActionMenuIcon(
					row,
					rowWithOpenActionMenu === row.id,
					openRowActionMenu,
					rowActionMenuItems,
					setRowWithOpenActionMenu
				),
			!rowActionMenuItems && hasColumnHiding && addEmptyRowCell()
		];
	};

	const renderConfiguredRowCells = (row: TableRow): React.ReactNode[] => {
		if (renderCustomRowCells) {
			return renderCustomRowCells(row);
		} else {
			return displayedColumns.map((col) => {
				if (!col.hasNoCell && !col.isHidden) {
					const key = row.id + "_" + col.field;
					return (
						<StyledTableData key={key}>
							<span>{row[col.field]}</span>
						</StyledTableData>
					);
				} else {
					return;
				}
			});
		}
	};

	const createHeaderNodes = useCallback(() => {
		return (
			<StyledTableRow className="header" onMouseEnter={headerHoverCallback ? () => headerHoverCallback() : undefined}>
				{[
					addCheckBoxToHeader(),
					addChevronToHeader(),
					...displayedColumns.map(
						(col) =>
							!col.isHidden && (
								<StyledTableHeader
									key={col.headerName}
									className={`${col.hasNoCell ? "icon-column" : ""} ${col.class ? col.class : ""}`}
								>
									<span
										className={`${col.sortable ? "sortable" : ""}`}
										onClick={() => (col.sortable ? handleSort(col) : undefined)}
									>
										{col.headerName}
										{sortedColumn?.field === col.field &&
											col.sortable &&
											(col.sortDirection === SORT_DIRECTION.ASC ? (
												<AscendingSortIcon opacity={0.8} />
											) : (
												<DescendingSortIcon opacity={0.8} />
											))}
										{sortedColumn?.field !== col.field && col.sortable && <UnsortedIcon />}
									</span>
								</StyledTableHeader>
							)
					),
					!!rowActionMenuItems && !hasColumnHiding && addEmptyHeaderCell(),
					hasColumnHiding &&
						addColumnHidingControl(
							displayedColumns,
							openColumnHidingControl,
							isColumnHidingControlOpen,
							setIsColumnHidingControlOpen,
							setDisplayedColumns,
							displayedColumnsChangedCallback
						)
				]}
			</StyledTableRow>
		);
	}, [
		sortedColumn,
		addCheckBoxToHeader,
		addChevronToHeader,
		displayedColumns,
		handleSort,
		rowActionMenuItems,
		hasColumnHiding,
		headerHoverCallback,
		isColumnHidingControlOpen,
		setIsColumnHidingControlOpen,
		openColumnHidingControl,
		displayedColumnsChangedCallback
	]);

	function createRowNodes(): React.ReactNode[] {
		return rows.map((row: TableRow) => (
			<StyledTableRow
				key={row.id}
				onMouseEnter={rowHoverCallback ? () => rowHoverCallback(row) : undefined}
				onClick={() => updateSelection(row)}
				className={clsx({
					selected: row.rowSelected,
					clickable: selectionType === SELECTION_TYPE.MULTI || selectionType === SELECTION_TYPE.SINGLE
				})}
				data-qa={row.id}
			>
				{[
					selectionType === SELECTION_TYPE.MULTI && addCheckBoxToRows(row),
					...renderConfiguredRowCells(row),
					...renderRowActionItems(row)
				]}
			</StyledTableRow>
		));
	}

	const expandableRows = useExpandableRows({
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
		allowToggle: expandableRowOptions?.allowToggle,
		selectRowWhenClickOnChildren: expandableRowOptions?.selectRowWhenClickOnChildren,
		renderChildren: expandableRowOptions?.renderChildren,
		expandedRowIds: expandableRowOptions?.expandedRowIds,
		setExpandedRowIds: expandableRowOptions?.setExpandedRowIds
	});

	// if expandableRowOptions is set, then create expanded row nodes, otherwise createRowNodes
	const rowNodes = expandableRowOptions ? expandableRows.createRowNodes() : createRowNodes();

	const columnNodes = renderCustomHeader
		? renderCustomHeader({
				columns,
				sortedColumn,
				selectAll,
				handleSort,
				handleSelectAllClick,
				addColumnHidingControl
		  })
		: createHeaderNodes();

	return [columnNodes, rowNodes];
};
