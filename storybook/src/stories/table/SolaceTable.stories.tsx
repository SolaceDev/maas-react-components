import React, { useState, useCallback } from "react";
import { action } from "@storybook/addon-actions";
import { ComponentMeta } from "@storybook/react";
import {
	SolaceTable,
	SolaceTableSelectionType,
	SolaceTableSortDirection,
	SolaceTableActionMenuItem,
	SolaceTableColumn,
	SolaceTableRow,
	SolacePagination,
	styled
} from "@SolaceDev/maas-react-components";
import { StyledTableData, StyledTableNumberData } from "../../../../src/components/table/table-utils";
import { cloneDeep } from "lodash";
import { useMemo } from "react";
import { useEffect } from "@storybook/addons";

const rows = [
	{
		id: "1",
		first_name: "Fern",
		last_name: "Fern",
		email: "fvanstone0@ft.com",
		gender: "Agender"
	},
	{
		id: "2",
		first_name: "Avery",
		last_name: "Delcastel",
		email: "adelcastel1@chicagotribune.com",
		gender: "Polygender"
	},
	{
		id: "3",
		first_name: "Shepard",
		last_name: "Bowering",
		email: "sbowering2@globo.com",
		gender: "Agender"
	},
	{
		id: "4",
		first_name: "Hana",
		last_name: "Wingeatt",
		email: "hwingeatt3@pcworld.com",
		gender: "Female"
	},
	{
		id: "5",
		first_name: "Cash",
		last_name: "Hull",
		email: "chull4@tiny.cc",
		gender: "Female"
	},
	{
		id: "6",
		first_name: "Deni",
		last_name: "Karsh",
		email: "dkarsh5@forbes.com",
		gender: "Agender"
	},
	{
		id: "7",
		first_name: "Katlin",
		last_name: "O'Grogane",
		email: "kogrogane6@narod.ru",
		gender: "Non-binary"
	},
	{
		id: "8",
		first_name: "Warner",
		last_name: "Spillard",
		email: "wspillard7@e-recht24.de",
		gender: "Polygender"
	},
	{
		id: "9",
		first_name: "Lazarus",
		last_name: "Trahear",
		email: "ltrahear8@telegraph.co.uk",
		gender: "Male"
	},
	{
		id: "10",
		first_name: "Veronike",
		last_name: "Malsher",
		email: "vmalsher9@twitpic.com",
		gender: "Polygender"
	}
];

const columns: SolaceTableColumn[] = [
	{
		field: "first_name",
		headerName: "First Name",
		sortable: true,
		disableHiding: false,
		sortDirection: SolaceTableSortDirection.ASC,
		isHidden: false
	},
	{
		headerName: "Last Name",
		field: "last_name",
		sortable: false,
		disableHiding: false,
		sortDirection: SolaceTableSortDirection.DCS,
		isHidden: false
	},
	{
		headerName: "Email",
		field: "email",
		sortable: true,
		disableHiding: false,
		sortDirection: SolaceTableSortDirection.DCS,
		isHidden: false
	},
	{
		headerName: "Gender",
		field: "gender",
		sortable: true,
		disableHiding: false,
		sortDirection: SolaceTableSortDirection.DCS,
		isHidden: false
	}
];

export default {
	title: "Under Construction/SolaceTable",
	component: SolaceTable,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=2558%3A9993"
		},
		docs: {
			description: {
				component: "Table component for reuse in all Solace based applications"
			}
		},
		argTypes: {
			id: {
				control: { type: "text" },
				description: "Unique identifier for the Table component"
			},
			rows: {
				control: { type: "array" },
				description: "Array of items to be displayed"
			},
			columns: {
				control: { type: "array" },
				description: "Array of columns to be rendered"
			},
			selectionType: {
				options: [SolaceTableSelectionType.NONE, SolaceTableSelectionType.SINGLE, SolaceTableSelectionType.MULTI],
				control: { type: "select" },
				description: "Table selection types"
			},
			loading: {
				control: { type: "boolean" },
				description: "Whether the table is in loading state, if true, a loading spinner will be displayed"
			},
			loadingMessage: {
				control: { type: "text" },
				description: "Specify a loading message if the table is in loading state"
			},
			selectionChangedCallback: {
				control: false,
				description: "Selection changed callback"
			},
			sortCallback: {
				control: false,
				description: "Sort callback when sorted column change is requested"
			}
		}
	}
} as ComponentMeta<typeof SolaceTable>;

const renderCustomEmptyState = () => {
	return (
		<div
			style={{
				background: "grey",
				color: "white",
				height: "80px",
				width: "200px",
				padding: "24px",
				textAlign: "center",
				borderRadius: "5px"
			}}
		>
			<div>This Table is Empty</div>
		</div>
	);
};

const sortData = (selectedColumn: SolaceTableColumn, rows) => {
	return rows.sort((a, b) => {
		if (a[selectedColumn.field] === b[selectedColumn.field]) {
			return 0;
		}
		if (selectedColumn.sortDirection === SolaceTableSortDirection.ASC) {
			return a[selectedColumn.field] > b[selectedColumn.field] ? 1 : -1;
		} else {
			return a[selectedColumn.field] > b[selectedColumn.field] ? -1 : 1;
		}
	});
};

const rowActionMenuItems = [
	{
		name: "Edit",
		callback: action("edit callback"),
		disabled: false
	},
	{
		name: "Delete",
		callback: action("delete callback"),
		disabled: true
	}
];

const selectionCallback = "selection callback";
const rowHighlightCallback = "row highlight callback";
const sortCallback = "sort callback";

const TableTemplate = ({ rows, columns, selectionType, ...args }): JSX.Element => {
	const data = cloneDeep(rows);
	const columnsDef = useMemo(() => {
		return cloneDeep(columns);
	}, [columns]);
	const [tableRows, setRows] = useState([...sortData(columnsDef[0], data)]);

	const handleSort = useCallback(
		(selectedColumn) => {
			action(sortCallback);
			setRows([...sortData(selectedColumn, data)]);
		},
		[data]
	);

	return (
		<SolaceTable
			{...args}
			selectionChangedCallback={action(selectionCallback)}
			sortCallback={handleSort}
			rows={tableRows}
			columns={columnsDef}
			selectionType={selectionType}
		></SolaceTable>
	);
};

export const DefaultTable = TableTemplate.bind({});
DefaultTable.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.NONE
};

export const SingleSelectionTable = TableTemplate.bind({});
SingleSelectionTable.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.SINGLE
};

export const MultiSelectionTable = TableTemplate.bind({});
MultiSelectionTable.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.MULTI
};

const CustomContentWrapper = styled("div")(() => ({
	// remove the border on table
	".tableWrapper": {
		border: "none"
	}
}));

const TableWrapper = (props) => {
	return <CustomContentWrapper>{props.children}</CustomContentWrapper>;
};

export const TableWithNoBorder = TableTemplate.bind({});
TableWithNoBorder.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.MULTI
};
TableWithNoBorder.decorators = [
	(Story) => (
		<TableWrapper>
			<Story />
		</TableWrapper>
	)
];

export const ScrollableTable = TableTemplate.bind({});
ScrollableTable.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.MULTI
};
ScrollableTable.decorators = [
	(Story) => (
		<div style={{ height: "300px" }}>
			<h3>Table header becomes sticky when table content is scrollable</h3>
			<Story />
		</div>
	)
];

export const TableWithOnlyOneRow = TableTemplate.bind({});
TableWithOnlyOneRow.args = {
	rows: rows.slice(-1),
	columns: columns,
	selectionType: SolaceTableSelectionType.MULTI
};

export const LoadingTableWithOnlyOneRow = TableTemplate.bind({});
LoadingTableWithOnlyOneRow.args = {
	rows: rows.slice(-1),
	columns: columns,
	selectionType: SolaceTableSelectionType.MULTI,
	loading: true,
	loadingMessage: "loading..."
};

export const LoadingTableWithPagination = TableTemplate.bind({});
LoadingTableWithPagination.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.MULTI,
	loading: true,
	loadingMessage: "loading..."
};
LoadingTableWithPagination.decorators = [
	(Story) => (
		<div style={{ padding: 16 }}>
			<h3>A loading table with (loading) pagination</h3>
			<div style={{ border: "1px solid lightgray" }}>
				<TableWrapper>
					<Story />
				</TableWrapper>
				<div style={{ padding: "8px 0px" }}>
					<SolacePagination totalResults={rows.length} loading={true} />
				</div>
			</div>
		</div>
	)
];

export const RowActionMenuTable = (): JSX.Element => {
	const data = cloneDeep(rows);
	const columnsDef = useMemo(() => {
		return cloneDeep(columns);
	}, []);
	const [tableRows, setRows] = useState([...sortData(columnsDef[0], data)]);

	const handleSort = useCallback((selectedColumn) => {
		action(sortCallback);
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={SolaceTableSelectionType.MULTI}
				rowActionMenuItems={rowActionMenuItems}
				headerHoverCallback={action("header hover callback")}
				rowHoverCallback={action("row hover callback")}
			></SolaceTable>
		</div>
	);
};

export const CustomRowActionMenuTable = (): JSX.Element => {
	const data = cloneDeep(rows);
	const columnsDef = useMemo(() => {
		return cloneDeep(columns);
	}, []);
	const [tableRows, setRows] = useState([...sortData(columnsDef[0], data)]);

	const handleSort = useCallback((selectedColumn) => {
		action(sortCallback);
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const renderSchemaRowActions = useCallback((row: SolaceTableRow): SolaceTableActionMenuItem[] => {
		if (row.id === "4") {
			return null;
		} else if (row.id === "3") {
			return rowActionMenuItems.slice(0, 1);
		} else if (row.id === "1") {
			return rowActionMenuItems.map((item) => {
				return {
					...item,
					disabled: false
				};
			});
		} else {
			return rowActionMenuItems;
		}
	}, []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={SolaceTableSelectionType.MULTI}
				renderCustomRowActionItem={renderSchemaRowActions}
			></SolaceTable>
		</div>
	);
};

export const ColumnHidingTable = (): JSX.Element => {
	const data = cloneDeep(rows);
	const columnsDef = useMemo(() => {
		return cloneDeep(columns);
	}, []);
	const [tableRows, setRows] = useState([...sortData(columnsDef[0], data)]);

	const handleSort = useCallback((selectedColumn) => {
		action(sortCallback);
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={SolaceTableSelectionType.MULTI}
				rowActionMenuItems={rowActionMenuItems}
				hasColumnHiding={true}
			></SolaceTable>
		</div>
	);
};

export const ControlledSortedColumnTable = (): JSX.Element => {
	const data = cloneDeep(rows);
	const columnsDef = useMemo(() => {
		return cloneDeep(columns);
	}, []);
	const columnToSort = cloneDeep(columnsDef[3]);
	const [sortedColumn, setSortedColumn] = useState(columnToSort);
	const [tableRows, setRows] = useState([...sortData(columnToSort, data)]);

	const handleSort = useCallback((selectedColumn) => {
		action(sortCallback);
		setRows([...sortData(selectedColumn, data)]);
		setSortedColumn(selectedColumn);
	}, []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortedColumn={sortedColumn}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={SolaceTableSelectionType.MULTI}
			></SolaceTable>
		</div>
	);
};

export const ControlledColumnHidingTable = (): JSX.Element => {
	const data = cloneDeep(rows);
	const columnsDef = useMemo(() => {
		return cloneDeep(columns);
	}, []);
	columnsDef[1].isHidden = true;
	const [displayedColumns, setDisplayedColumns] = useState(columnsDef);
	const [tableRows, setRows] = useState([...sortData(columns[0], data)]);

	const handleSort = useCallback((selectedColumn) => {
		action(sortCallback);
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const displayedColumnsChanged = useCallback((columns) => {
		setDisplayedColumns(columns);
	}, []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={SolaceTableSelectionType.MULTI}
				rowActionMenuItems={rowActionMenuItems}
				hasColumnHiding={true}
				displayedColumns={displayedColumns}
				displayedColumnsChangedCallback={displayedColumnsChanged}
			></SolaceTable>
		</div>
	);
};

export const ColumnWithTooltipTable = (): JSX.Element => {
	const data = cloneDeep(rows);
	const columnsDef = useMemo(() => {
		return columns.map((column) => {
			const col = cloneDeep(column);
			col.tooltip = true;
			return col;
		});
	}, []);
	const [tableRows, setRows] = useState([...sortData(columnsDef[0], data)]);

	const handleSort = useCallback(
		(selectedColumn) => {
			setRows([...sortData(selectedColumn, data)]);
		},
		[data]
	);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={SolaceTableSelectionType.MULTI}
			></SolaceTable>
		</div>
	);
};

export const CustomColumnWidthAndTooltipTable = (): JSX.Element => {
	const data = cloneDeep(rows);
	const columnsDef = useMemo(() => {
		return cloneDeep(columns);
	}, []);
	columnsDef[0].width = "15%";
	columnsDef[1].width = "15%";
	columnsDef[2].tooltip = true;
	columnsDef[3].width = "15%";
	const [tableRows, setRows] = useState([...sortData(columnsDef[0], data)]);

	const handleSort = useCallback((selectedColumn) => {
		action(sortCallback);
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={SolaceTableSelectionType.SINGLE}
			></SolaceTable>
		</div>
	);
};

const renderSelectedRowsInfo = (selectedRowIds, tableRows) => {
	return selectedRowIds.map((rowId) => {
		return (
			<div key={rowId}>
				Selected Row Id: {rowId}, Email: {tableRows.find((row) => row.id === rowId)?.email};
			</div>
		);
	});
};

const TableControlledSelectionTemplate = ({
	rows,
	columns,
	selectionType,
	initialSelectedRowIds,
	...args
}): JSX.Element => {
	const data = cloneDeep(rows);
	const columnsDef = useMemo(() => {
		return cloneDeep(columns);
	}, [columns]);
	const [tableRows, setRows] = useState([...sortData(columnsDef[0], data)]);

	const handleSort = useCallback(
		(selectedColumn) => {
			action(sortCallback);
			setRows([...sortData(selectedColumn, data)]);
		},
		[data]
	);

	const [selectedRowIds, setSelectedRowIds] = useState<string[]>(initialSelectedRowIds ?? []);
	const handleRowSelectionsChange = useCallback((rows: SolaceTableRow[]) => {
		action(selectionCallback);
		setSelectedRowIds(rows.map((row) => row.id));
	}, []);

	return (
		<div>
			<SolaceTable
				{...args}
				controlledSelectedRowsState={true}
				selectedRowIds={selectedRowIds}
				selectionChangedCallback={handleRowSelectionsChange}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={selectionType}
			></SolaceTable>
			<div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", columnGap: "8px" }}>
				{renderSelectedRowsInfo(selectedRowIds, tableRows)}
			</div>
		</div>
	);
};

export const NoneSelectTableControlledSelection = TableControlledSelectionTemplate.bind({});
NoneSelectTableControlledSelection.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.NONE
};

export const SingleSelectionTableControlledSelection = TableControlledSelectionTemplate.bind({});
SingleSelectionTableControlledSelection.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.SINGLE
};

export const SingleSelectionTableControlledSelectionInitialSelections = TableControlledSelectionTemplate.bind({});
SingleSelectionTableControlledSelectionInitialSelections.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.SINGLE,
	initialSelectedRowIds: ["2"]
};

export const MultiSelectionTableControlledSelection = TableControlledSelectionTemplate.bind({});
MultiSelectionTableControlledSelection.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.MULTI
};

export const MultiSelectionTableControlledSelectionInitialSelections = TableControlledSelectionTemplate.bind({});
MultiSelectionTableControlledSelectionInitialSelections.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.MULTI,
	initialSelectedRowIds: ["2", "4"]
};

export const TableWithOnlyOneRowControlledSelection = TableControlledSelectionTemplate.bind({});
TableWithOnlyOneRowControlledSelection.args = {
	rows: rows.slice(-1),
	columns: columns,
	selectionType: SolaceTableSelectionType.MULTI
};

const TableSelectMultiIndependentRowHighlightTemplate = ({
	rows,
	columns,
	initialHighlightedRowId,
	controlledSelectedRowsState,
	initialSelectedRowIds,
	...args
}): JSX.Element => {
	const data = cloneDeep(rows);
	const columnsDef = useMemo(() => {
		return cloneDeep(columns);
	}, [columns]);
	const [tableRows, setRows] = useState([...sortData(columnsDef[0], data)]);

	const handleSort = useCallback(
		(selectedColumn) => {
			action(sortCallback);
			setRows([...sortData(selectedColumn, data)]);
		},
		[data]
	);

	const [highlightedRowId, setHighlightedRowId] = useState<string | null>(initialHighlightedRowId);
	const handleRowHighlightChanged = useCallback((row) => {
		action(rowHighlightCallback);
		setHighlightedRowId(row ? row.id : null);
	}, []);

	const [selectedRowIds, setSelectedRowIds] = useState<string[]>(initialSelectedRowIds ?? []);
	const handleRowSelectionsChange = useCallback(
		(rows: SolaceTableRow[]) => {
			action(selectionCallback);
			if (controlledSelectedRowsState) {
				setSelectedRowIds(rows.map((row) => row.id));
			}
		},
		[controlledSelectedRowsState]
	);

	return (
		<div>
			<SolaceTable
				{...args}
				controlledSelectedRowsState={controlledSelectedRowsState}
				selectedRowIds={controlledSelectedRowsState ? selectedRowIds : null}
				selectionChangedCallback={handleRowSelectionsChange}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={SolaceTableSelectionType.MULTI}
				independentRowHighlight={true}
				highlightedRowId={highlightedRowId}
				rowHighlightChangedCallback={handleRowHighlightChanged}
			></SolaceTable>
			<div style={{ marginTop: "24px" }}>
				Highlighted Row Id: {highlightedRowId}, Email: {tableRows.find((row) => row.id === highlightedRowId)?.email}
			</div>
			<div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", columnGap: "8px" }}>
				{renderSelectedRowsInfo(selectedRowIds, tableRows)}
			</div>
		</div>
	);
};

export const TableSelectMultiIndependentRowHighlight = TableSelectMultiIndependentRowHighlightTemplate.bind({});
TableSelectMultiIndependentRowHighlight.args = {
	rows: rows,
	columns: columns
};

export const TableSelectMultiIndependentRowHighlightWithInitialValue =
	TableSelectMultiIndependentRowHighlightTemplate.bind({});
TableSelectMultiIndependentRowHighlightWithInitialValue.args = {
	rows: rows,
	columns: columns,
	initialHighlightedRowId: rows[0].id
};

export const TableSelectMultiIndependentRowHighlightControlledSelection =
	TableSelectMultiIndependentRowHighlightTemplate.bind({});
TableSelectMultiIndependentRowHighlightControlledSelection.args = {
	rows: rows,
	columns: columns,
	controlledSelectedRowsState: true
};

export const TableSelectMultiIndependentRowHighlightControlledSelectionInitialValue =
	TableSelectMultiIndependentRowHighlightTemplate.bind({});
TableSelectMultiIndependentRowHighlightControlledSelectionInitialValue.args = {
	rows: rows,
	columns: columns,
	controlledSelectedRowsState: true,
	initialHighlightedRowId: rows[0].id,
	initialSelectedRowIds: [rows[0].id, rows[2].id]
};

export const EmptyStateTable = (): JSX.Element => {
	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={action(sortCallback)}
				rows={[]}
				columns={columns}
				selectionType={SolaceTableSelectionType.MULTI}
			></SolaceTable>
		</div>
	);
};

export const EmptyStateTableWithLoadingState = (): JSX.Element => {
	const [dataFetched, setDataFetched] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const dateQueryTimeout = setTimeout(() => {
			setDataFetched(true);
			setIsLoading(false);
		}, 3000);
		return () => clearTimeout(dateQueryTimeout);
	}, []);

	return (
		<div style={{ height: "400px" }}>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={action(sortCallback)}
				rows={[]}
				columns={columns}
				selectionType={SolaceTableSelectionType.MULTI}
				loading={isLoading}
				showEmptyState={dataFetched} // only show empty state (if empty) after data is fetched
			></SolaceTable>
		</div>
	);
};

export const CustomEmptyStateTable = (): JSX.Element => {
	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={action(sortCallback)}
				rows={[]}
				columns={columns}
				selectionType={SolaceTableSelectionType.MULTI}
				renderCustomEmptyState={renderCustomEmptyState}
			></SolaceTable>
		</div>
	);
};

const renderExpandedRowContentHelper = (row, allowToggle, selectionType) => {
	let paddingLeft = "51px";
	if (!allowToggle && selectionType !== SolaceTableSelectionType.MULTI) {
		paddingLeft = "12px";
	} else if (allowToggle && selectionType === SolaceTableSelectionType.MULTI) {
		paddingLeft = "92px";
	}
	return (
		<table style={{ width: "100%", padding: `4px 0 16px ${paddingLeft}` }}>
			<tbody key={`${row.id}_expansion`} style={{ width: "100%", display: "block" }}>
				<tr>
					<td>{row.first_name}</td>
					<td style={{ paddingLeft: "16px" }}>{row.last_name}</td>
				</tr>
				<tr>
					<td>{row.email}</td>
					<td style={{ paddingLeft: "16px" }}>{row.gender}</td>
				</tr>
			</tbody>
		</table>
	);
};

const ExpandableRowTableTemplate = ({
	rows,
	columns,
	selectionType,
	rowActionMenuItems,
	initialExpandedRowIds,
	allowToggle,
	controlledSelectedRowsState,
	initialSelectedRowIds,
	...args
}): JSX.Element => {
	const data = cloneDeep(rows);
	const columnsDef = useMemo(() => {
		return cloneDeep(columns);
	}, [columns]);
	const [tableRows, setRows] = useState([...sortData(columnsDef[0], data)]);

	const handleSort = useCallback(
		(selectedColumn) => {
			action(sortCallback);
			setRows([...sortData(selectedColumn, data)]);
		},
		[data]
	);

	const [expandedRowIds, setExpandedRowIds] = useState<string[]>(
		Array.isArray(initialExpandedRowIds) ? initialExpandedRowIds : []
	);
	const renderExpandedRowContent = useCallback(
		(row) => renderExpandedRowContentHelper(row, allowToggle, selectionType),
		[selectionType, allowToggle]
	);

	const [selectedRowIds, setSelectedRowIds] = useState<string[]>(initialSelectedRowIds ?? []);
	const handleRowSelectionsChange = useCallback(
		// eslint-disable-next-line sonarjs/no-identical-functions
		(rows: SolaceTableRow[]) => {
			action(selectionCallback);
			if (controlledSelectedRowsState) {
				setSelectedRowIds(rows.map((row) => row.id));
			}
		},
		[controlledSelectedRowsState]
	);

	return (
		<div>
			<SolaceTable
				{...args}
				controlledSelectedRowsState={controlledSelectedRowsState}
				selectedRowIds={controlledSelectedRowsState ? selectedRowIds : null}
				selectionChangedCallback={handleRowSelectionsChange}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={selectionType}
				hasColumnHiding={true}
				expandableRowOptions={{
					allowToggle: allowToggle,
					renderChildren: renderExpandedRowContent,
					expandedRowIds: expandedRowIds,
					setExpandedRowIds: setExpandedRowIds
				}}
				rowActionMenuItems={rowActionMenuItems ? rowActionMenuItems : undefined}
			></SolaceTable>
			<div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", columnGap: "8px" }}>
				{renderSelectedRowsInfo(selectedRowIds, tableRows)}
			</div>
		</div>
	);
};

export const ExpandableRowTableSelectNone = ExpandableRowTableTemplate.bind({});
ExpandableRowTableSelectNone.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.NONE,
	allowToggle: true
};

export const ExpandableRowNoToggleTableSelectSingle = ExpandableRowTableTemplate.bind({});
ExpandableRowNoToggleTableSelectSingle.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.SINGLE,
	allowToggle: false,
	rowActionMenuItems: rowActionMenuItems
};

export const ExpandableRowTableSelectMulti = ExpandableRowTableTemplate.bind({});
ExpandableRowTableSelectMulti.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.MULTI,
	allowToggle: true
};

export const ExpandableRowNoToggleTableSelectMulti = ExpandableRowTableTemplate.bind({});
ExpandableRowNoToggleTableSelectMulti.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.MULTI,
	allowToggle: false
};

export const ExpandableRowTableSelectNoneInitialExpandedRows = ExpandableRowTableTemplate.bind({});
ExpandableRowTableSelectNoneInitialExpandedRows.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.NONE,
	allowToggle: true,
	initialExpandedRowIds: ["2", "3"]
};

export const ExpandableRowTableSelectNoneControlledSelection = ExpandableRowTableTemplate.bind({});
ExpandableRowTableSelectNoneControlledSelection.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.NONE,
	allowToggle: true,
	controlledSelectedRowsState: true
};

export const ExpandableRowNoToggleTableSelectSingleControlledSelection = ExpandableRowTableTemplate.bind({});
ExpandableRowNoToggleTableSelectSingleControlledSelection.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.SINGLE,
	allowToggle: false,
	rowActionMenuItems: rowActionMenuItems,
	controlledSelectedRowsState: true
};

export const ExpandableRowTableSelectMultiControlledSelection = ExpandableRowTableTemplate.bind({});
ExpandableRowTableSelectMultiControlledSelection.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.MULTI,
	allowToggle: true,
	controlledSelectedRowsState: true
};

export const ExpandableRowTableSelectSingleControlledSelectionInitialValues = ExpandableRowTableTemplate.bind({});
ExpandableRowTableSelectSingleControlledSelectionInitialValues.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.SINGLE,
	allowToggle: true,
	initialExpandedRowIds: ["2", "3"],
	controlledSelectedRowsState: true,
	initialSelectedRowIds: ["2", "4"]
};

export const ExpandableRowTableSelectMultiControlledSelectionInitialValues = ExpandableRowTableTemplate.bind({});
ExpandableRowTableSelectMultiControlledSelectionInitialValues.args = {
	rows: rows,
	columns: columns,
	selectionType: SolaceTableSelectionType.MULTI,
	allowToggle: true,
	initialExpandedRowIds: ["2", "3"],
	controlledSelectedRowsState: true,
	initialSelectedRowIds: ["2", "4"]
};

const ExpandableRowTableSelectMultiIndependentRowHighlightTemplate = ({
	rows,
	columns,
	rowActionMenuItems,
	initialExpandedRowIds,
	initialHighlightedRowId,
	allowToggle,
	controlledSelectedRowsState,
	initialSelectedRowIds,
	...args
}): JSX.Element => {
	const data = cloneDeep(rows);
	const columnsDef = useMemo(() => {
		return cloneDeep(columns);
	}, [columns]);
	const [tableRows, setRows] = useState([...sortData(columnsDef[0], data)]);

	const handleSort = useCallback(
		(selectedColumn) => {
			action(sortCallback);
			setRows([...sortData(selectedColumn, data)]);
		},
		[data]
	);

	const [expandedRowIds, setExpandedRowIds] = useState<string[]>(
		Array.isArray(initialExpandedRowIds) ? initialExpandedRowIds : []
	);
	const renderExpandedRowContent = useCallback(
		(row) => renderExpandedRowContentHelper(row, allowToggle, SolaceTableSelectionType.MULTI),
		[allowToggle]
	);

	const [highlightedRowId, setHighlightedRowId] = useState<string | null>(initialHighlightedRowId);
	const handleRowHighlightChanged = useCallback((row) => {
		action(rowHighlightCallback);
		setHighlightedRowId(row ? row.id : null);
	}, []);

	const [selectedRowIds, setSelectedRowIds] = useState<string[]>(initialSelectedRowIds ?? []);
	const handleRowSelectionsChange = useCallback(
		// eslint-disable-next-line sonarjs/no-identical-functions
		(rows: SolaceTableRow[]) => {
			action(selectionCallback);
			if (controlledSelectedRowsState) {
				setSelectedRowIds(rows.map((row) => row.id));
			}
		},
		[controlledSelectedRowsState]
	);

	return (
		<div>
			<SolaceTable
				{...args}
				controlledSelectedRowsState={controlledSelectedRowsState}
				selectedRowIds={controlledSelectedRowsState ? selectedRowIds : null}
				selectionChangedCallback={handleRowSelectionsChange}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={SolaceTableSelectionType.MULTI}
				hasColumnHiding={true}
				expandableRowOptions={{
					allowToggle: allowToggle,
					renderChildren: renderExpandedRowContent,
					expandedRowIds: expandedRowIds,
					setExpandedRowIds: setExpandedRowIds
				}}
				rowActionMenuItems={rowActionMenuItems ? rowActionMenuItems : undefined}
				independentRowHighlight={true}
				highlightedRowId={highlightedRowId}
				rowHighlightChangedCallback={handleRowHighlightChanged}
			></SolaceTable>
			<div style={{ marginTop: "24px" }}>
				Highlighted Row Id: {highlightedRowId}, Email: {tableRows.find((row) => row.id === highlightedRowId)?.email}
			</div>
			<div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", columnGap: "8px" }}>
				{renderSelectedRowsInfo(selectedRowIds, tableRows)}
			</div>
		</div>
	);
};

export const ExpandableRowTableSelectMultiIndependentRowHighlight =
	ExpandableRowTableSelectMultiIndependentRowHighlightTemplate.bind({});
ExpandableRowTableSelectMultiIndependentRowHighlight.args = {
	rows: rows,
	columns: columns,
	rowActionMenuItems: rowActionMenuItems,
	allowToggle: true
};

export const ExpandableRowNoToggleTableSelectMultiIndependentRowHighlight =
	ExpandableRowTableSelectMultiIndependentRowHighlightTemplate.bind({});
ExpandableRowNoToggleTableSelectMultiIndependentRowHighlight.args = {
	rows: rows,
	columns: columns,
	allowToggle: false
};

export const ExpandableRowTableSelectMultiInitialHighlightedRow =
	ExpandableRowTableSelectMultiIndependentRowHighlightTemplate.bind({});
ExpandableRowTableSelectMultiInitialHighlightedRow.args = {
	rows: rows,
	columns: columns,
	allowToggle: true,
	initialHighlightedRowId: "3"
};

export const ExpandableRowTableSelectMultiInitialExpandedRowsAndHighlightedRow =
	ExpandableRowTableSelectMultiIndependentRowHighlightTemplate.bind({});
ExpandableRowTableSelectMultiInitialExpandedRowsAndHighlightedRow.args = {
	rows: rows,
	columns: columns,
	allowToggle: true,
	initialExpandedRowIds: ["2", "3"],
	initialHighlightedRowId: "3"
};

export const ExpandableRowTableSelectMultiIndependentRowHighlightControlledSelection =
	ExpandableRowTableSelectMultiIndependentRowHighlightTemplate.bind({});
ExpandableRowTableSelectMultiIndependentRowHighlightControlledSelection.args = {
	rows: rows,
	columns: columns,
	rowActionMenuItems: rowActionMenuItems,
	allowToggle: true,
	controlledSelectedRowsState: true
};

export const ExpandableRowNoToggleTableSelectMultiIndependentRowHighlightControlledSelection =
	ExpandableRowTableSelectMultiIndependentRowHighlightTemplate.bind({});
ExpandableRowNoToggleTableSelectMultiIndependentRowHighlightControlledSelection.args = {
	rows: rows,
	columns: columns,
	allowToggle: false,
	controlledSelectedRowsState: true
};

export const ExpandableRowTableSelectMultiInitialHighlightedRowControlledSelection =
	ExpandableRowTableSelectMultiIndependentRowHighlightTemplate.bind({});
ExpandableRowTableSelectMultiInitialHighlightedRowControlledSelection.args = {
	rows: rows,
	columns: columns,
	allowToggle: true,
	initialHighlightedRowId: "3",
	controlledSelectedRowsState: true,
	initialSelectedRowIds: ["4"]
};

export const ExpandableRowTableSelectMultiInitialExpandedRowsAndHighlightedRowControlledSelection =
	ExpandableRowTableSelectMultiIndependentRowHighlightTemplate.bind({});
ExpandableRowTableSelectMultiInitialExpandedRowsAndHighlightedRowControlledSelection.args = {
	rows: rows,
	columns: columns,
	allowToggle: true,
	initialExpandedRowIds: ["2", "3"],
	initialHighlightedRowId: "3",
	controlledSelectedRowsState: true,
	initialSelectedRowIds: ["2", "4"]
};

const schemaRows = [
	{
		id: "1",
		name: "schema1",
		shared: true,
		version_count: 3,
		schemaType: "jsonSchema",
		contentType: "json"
	},
	{
		id: "4",
		name: "schema4",
		shared: true,
		version_count: 1,
		schemaType: "xsd",
		contentType: "xml"
	},
	{
		id: "3",
		name: "binary",
		shared: false,
		version_count: 4,
		schemaType: "avro",
		contentType: "binary"
	},
	{
		id: "2",
		name: "schema2",
		shared: true,
		version_count: 3,
		schemaType: "avro",
		contentType: "json"
	},
	{
		id: "5",
		name: "schema5",
		shared: false,
		version_count: 8,
		schemaType: "dtd",
		contentType: "xml"
	}
];

const schemaColumns: SolaceTableColumn[] = [
	{
		field: "name",
		headerName: "Name",
		sortable: true,
		disableHiding: false,
		sortDirection: SolaceTableSortDirection.ASC,
		isHidden: false
	},
	{
		headerName: "Shared",
		field: "shared",
		sortable: true,
		disableHiding: false,
		sortDirection: SolaceTableSortDirection.DCS,
		isHidden: false
	},
	{
		headerName: "# of Versions",
		field: "version_count",
		sortable: false,
		disableHiding: false,
		sortDirection: SolaceTableSortDirection.DCS,
		isHidden: false,
		isNumerical: true
	},
	{
		headerName: "Schema Type",
		field: "schemaType",
		sortable: true,
		disableHiding: false,
		sortDirection: SolaceTableSortDirection.DCS,
		isHidden: false
	},
	{
		headerName: "Content Type",
		field: "contentType",
		sortable: true,
		disableHiding: false,
		sortDirection: SolaceTableSortDirection.DCS,
		isHidden: false
	}
];

enum SharedTypes {
	shared = "Shared",
	notShared = "Not Shared"
}

const schemaTypeLabel = {
	jsonSchema: "JSON Schema",
	xsd: "XSD",
	dtd: "DTD",
	avro: "AVRO"
};

const schemaContentTypeLabel = {
	jsonSchema: {
		json: "JSON"
	},
	xsd: {
		xml: "XML"
	},
	dtd: {
		xml: "XML"
	},
	avro: {
		binary: "Binary",
		json: "JSON"
	}
};

export const CustomSchemaRowTable = (): JSX.Element => {
	const data = cloneDeep(schemaRows);
	const columnsDef = useMemo(() => {
		return cloneDeep(schemaColumns);
	}, []);
	const [tableRows, setRows] = useState([...sortData(columnsDef[0], data)]);
	const handleSort = useCallback((selectedColumn) => {
		action(sortCallback);
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const renderSchemaRowCells = useCallback((row: SolaceTableRow): JSX.Element[] => {
		const cells: JSX.Element[] = [];
		cells.push(<StyledTableData key={row.id + "_name"}>{row.name}</StyledTableData>);
		cells.push(
			<StyledTableData key={row.id + "_shared"}>
				{row.shared ? SharedTypes.shared : SharedTypes.notShared}
			</StyledTableData>
		);
		cells.push(<StyledTableNumberData key={row.id + "_version_count"}>{row.version_count}</StyledTableNumberData>);
		cells.push(
			<StyledTableData key={row.id + "_schemaType"}>
				{schemaTypeLabel[row.schemaType] ?? row.schemaType}
			</StyledTableData>
		);
		cells.push(
			<StyledTableData key={row.id + "_contentType"}>
				{schemaContentTypeLabel[row.schemaType]?.[row.contentType] ?? row.contentType}
			</StyledTableData>
		);

		return cells;
	}, []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={SolaceTableSelectionType.SINGLE}
				renderCustomRowCells={renderSchemaRowCells}
			></SolaceTable>
		</div>
	);
};

const getColumnHiddenInfo = (columns) => {
	return columns?.reduce((prev, curr) => {
		prev[curr.field] = curr.isHidden;
		return prev;
	}, {});
};

const createSchemaCells = (row, columnsHiddenInfo): JSX.Element[] => {
	const cells: JSX.Element[] = [];
	if (!columnsHiddenInfo?.name) {
		cells.push(<StyledTableData key={row.id + "_name"}>{row.name}</StyledTableData>);
	}
	if (!columnsHiddenInfo?.shared) {
		cells.push(
			<StyledTableData key={row.id + "_shared"}>
				{row.shared ? SharedTypes.shared : SharedTypes.notShared}
			</StyledTableData>
		);
	}
	if (!columnsHiddenInfo?.version_count) {
		cells.push(<StyledTableNumberData key={row.id + "_version_count"}>{row.version_count}</StyledTableNumberData>);
	}
	if (!columnsHiddenInfo?.schemaType) {
		cells.push(
			<StyledTableData key={row.id + "_schemaType"}>
				{schemaTypeLabel[row.schemaType] ?? row.schemaType}
			</StyledTableData>
		);
	}
	if (!columnsHiddenInfo?.contentType) {
		cells.push(
			<StyledTableData key={row.id + "_contentType"}>
				{schemaContentTypeLabel[row.schemaType]?.[row.contentType] ?? row.contentType}
			</StyledTableData>
		);
	}

	return cells;
};

const renderExpandedSchemaRowContentHelper = (row, allowToggle, selectionType) => {
	// different padding left depending on whether there is expand/collapse column or checkbox
	let paddingLeft = "51px";
	if (!allowToggle && selectionType !== SolaceTableSelectionType.MULTI) {
		paddingLeft = "14px";
	} else if (allowToggle && selectionType === SolaceTableSelectionType.MULTI) {
		paddingLeft = "100px";
	} else if (!allowToggle && selectionType === SolaceTableSelectionType.MULTI) {
		paddingLeft = "68px";
	}
	return (
		<table style={{ width: "100%", padding: `4px 0 16px ${paddingLeft}` }}>
			<tbody key={`${row.id}_expansion`} style={{ width: "100%", display: "block" }}>
				<tr>
					<td>{row.name}</td>
					<td style={{ paddingLeft: "16px" }}>{row.shared ? SharedTypes.shared : SharedTypes.notShared}</td>
					<td style={{ paddingLeft: "16px" }}>{row.version_count}</td>
				</tr>
				<tr>
					<td>{schemaTypeLabel[row.schemaType] ?? row.schemaType}</td>
					<td style={{ paddingLeft: "16px" }}>
						{schemaContentTypeLabel[row.schemaType]?.[row.contentType] ?? row.contentType}
					</td>
					<td style={{ paddingLeft: "16px" }}></td>
				</tr>
			</tbody>
		</table>
	);
};

export const CustomSchemaRowWithActionsTable = (): JSX.Element => {
	const data = cloneDeep(schemaRows);
	const columnsDef = useMemo(() => {
		return cloneDeep(schemaColumns);
	}, []);
	const [tableRows, setRows] = useState([...sortData(columnsDef[0], data)]);
	const [columnsHiddenInfo, setColumnsHiddenInfo] = useState(null);
	const handleSort = useCallback((selectedColumn) => {
		action(sortCallback);
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const displayedColumnsChanged = useCallback((columns) => {
		setColumnsHiddenInfo(getColumnHiddenInfo(columns));
	}, []);

	const renderSchemaRowCells = useCallback(
		(row: SolaceTableRow): JSX.Element[] => createSchemaCells(row, columnsHiddenInfo),
		[columnsHiddenInfo]
	);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={SolaceTableSelectionType.SINGLE}
				rowActionMenuItems={rowActionMenuItems}
				renderCustomRowCells={renderSchemaRowCells}
				hasColumnHiding={true}
				displayedColumnsChangedCallback={displayedColumnsChanged}
			></SolaceTable>
		</div>
	);
};

export const CustomSchemaRowWithCustomActionsTable = (): JSX.Element => {
	const data = cloneDeep(schemaRows);
	const columnsDef = useMemo(() => {
		return cloneDeep(schemaColumns);
	}, []);
	const [tableRows, setRows] = useState([...sortData(columnsDef[0], data)]);
	const [columnsHiddenInfo, setColumnsHiddenInfo] = useState(null);
	const handleSort = useCallback((selectedColumn) => {
		action(sortCallback);
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const displayedColumnsChanged = useCallback((columns) => {
		setColumnsHiddenInfo(getColumnHiddenInfo(columns));
	}, []);

	const renderSchemaRowCells = useCallback(
		(row: SolaceTableRow): JSX.Element[] => createSchemaCells(row, columnsHiddenInfo),
		[columnsHiddenInfo]
	);

	const renderSchemaRowActions = useCallback((row: SolaceTableRow): SolaceTableActionMenuItem[] => {
		if (row.id === "4") {
			return null;
		} else if (row.id === "3") {
			return rowActionMenuItems.slice(0, 1);
		} else {
			return rowActionMenuItems;
		}
	}, []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={SolaceTableSelectionType.SINGLE}
				renderCustomRowActionItem={renderSchemaRowActions}
				renderCustomRowCells={renderSchemaRowCells}
				hasColumnHiding={true}
				displayedColumnsChangedCallback={displayedColumnsChanged}
			></SolaceTable>
		</div>
	);
};

export const CustomSchemaRowWithActionsCustomColumnWidthTable = (): JSX.Element => {
	const data = cloneDeep(schemaRows);
	const columnsDef = useMemo(() => {
		return cloneDeep(schemaColumns);
	}, []);
	columnsDef[1].width = "10%";
	columnsDef[2].width = "15%";
	const [tableRows, setRows] = useState([...sortData(columnsDef[0], data)]);
	const [columnsHiddenInfo, setColumnsHiddenInfo] = useState(null);
	const handleSort = useCallback((selectedColumn) => {
		action(sortCallback);
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const displayedColumnsChanged = useCallback((columns) => {
		setColumnsHiddenInfo(getColumnHiddenInfo(columns));
	}, []);

	const renderSchemaRowCells = useCallback(
		(row: SolaceTableRow): JSX.Element[] => createSchemaCells(row, columnsHiddenInfo),
		[columnsHiddenInfo]
	);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={SolaceTableSelectionType.SINGLE}
				rowActionMenuItems={rowActionMenuItems}
				renderCustomRowCells={renderSchemaRowCells}
				hasColumnHiding={true}
				displayedColumnsChangedCallback={displayedColumnsChanged}
			></SolaceTable>
		</div>
	);
};

export const ExpandableCustomSchemaRowWithActionsCustomWidthTable = (): JSX.Element => {
	const data = cloneDeep(schemaRows);
	const columnsDef = useMemo(() => {
		return cloneDeep(schemaColumns);
	}, []);
	columnsDef[1].width = "10%";
	columnsDef[2].width = "15%";
	const [tableRows, setRows] = useState([...sortData(columnsDef[0], data)]);
	const [columnsHiddenInfo, setColumnsHiddenInfo] = useState(null);
	const [expandedRowIds, setExpandedRowIds] = useState<string[]>([]);
	const handleSort = useCallback((selectedColumn) => {
		action(sortCallback);
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const selectionType = SolaceTableSelectionType.SINGLE;

	const displayedColumnsChanged = useCallback((columns) => {
		setColumnsHiddenInfo(getColumnHiddenInfo(columns));
	}, []);

	const renderSchemaRowCells = useCallback(
		(row: SolaceTableRow): JSX.Element[] => createSchemaCells(row, columnsHiddenInfo),
		[columnsHiddenInfo]
	);

	const renderExpandedRowContent = useCallback(
		(row) => renderExpandedSchemaRowContentHelper(row, true, selectionType),
		[]
	);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={selectionType}
				rowActionMenuItems={rowActionMenuItems}
				renderCustomRowCells={renderSchemaRowCells}
				hasColumnHiding={true}
				displayedColumnsChangedCallback={displayedColumnsChanged}
				expandableRowOptions={{
					allowToggle: true,
					renderChildren: renderExpandedRowContent,
					expandedRowIds: expandedRowIds,
					setExpandedRowIds: setExpandedRowIds
				}}
			></SolaceTable>
		</div>
	);
};

export const ExpandableCustomSchemaRowControlledStateTable = (): JSX.Element => {
	const data = cloneDeep(schemaRows);
	const columnsDef = useMemo(() => {
		return cloneDeep(schemaColumns);
	}, []);
	columnsDef[1].isHidden = true;
	const columnToSort = columnsDef[3];
	const [sortedColumn, setSortedColumn] = useState(columnToSort);
	const [tableRows, setRows] = useState([...sortData(columnToSort, data)]);
	const [displayedColumns, setDisplayedColumns] = useState(columnsDef);
	const [columnsHiddenInfo, setColumnsHiddenInfo] = useState(getColumnHiddenInfo(columnsDef));
	const [expandedRowIds, setExpandedRowIds] = useState<string[]>([]);
	const handleSort = useCallback((selectedColumn) => {
		setSortedColumn(selectedColumn);
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const selectionType = SolaceTableSelectionType.SINGLE;

	const displayedColumnsChanged = useCallback((columns) => {
		setDisplayedColumns(columns);
		setColumnsHiddenInfo(getColumnHiddenInfo(columns));
	}, []);

	const renderSchemaRowCells = useCallback(
		(row: SolaceTableRow): JSX.Element[] => createSchemaCells(row, columnsHiddenInfo),
		[columnsHiddenInfo]
	);

	const renderExpandedRowContent = useCallback(
		(row) => renderExpandedSchemaRowContentHelper(row, true, selectionType),
		[]
	);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortedColumn={sortedColumn}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={selectionType}
				rowActionMenuItems={rowActionMenuItems}
				renderCustomRowCells={renderSchemaRowCells}
				hasColumnHiding={true}
				displayedColumns={displayedColumns}
				displayedColumnsChangedCallback={displayedColumnsChanged}
				expandableRowOptions={{
					allowToggle: true,
					renderChildren: renderExpandedRowContent,
					expandedRowIds: expandedRowIds,
					setExpandedRowIds: setExpandedRowIds
				}}
			></SolaceTable>
		</div>
	);
};
