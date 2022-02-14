import React, { useState, useCallback } from "react";
import { action } from "@storybook/addon-actions";
import { ComponentMeta } from "@storybook/react";
import { SolaceTable } from "@SolaceDev/maas-react-components";
import {
	SELECTION_TYPE,
	SORT_DIRECTION,
	StyledTableData,
	TableActionMenuItem,
	TableColumn,
	TableRow
} from "../../../../src/components/table/table-utils";
import { cloneDeep } from "lodash";

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

const columns: TableColumn[] = [
	{
		field: "first_name",
		headerName: "First Name",
		sortable: true,
		disableHiding: false,
		sortDirection: SORT_DIRECTION.ASC,
		isHidden: false
	},
	{
		headerName: "Last Name",
		field: "last_name",
		sortable: false,
		disableHiding: false,
		sortDirection: SORT_DIRECTION.DCS,
		isHidden: false
	},
	{
		headerName: "Email",
		field: "email",
		sortable: true,
		disableHiding: false,
		sortDirection: SORT_DIRECTION.DCS,
		isHidden: false
	},
	{
		headerName: "Gender",
		field: "gender",
		sortable: true,
		disableHiding: false,
		sortDirection: SORT_DIRECTION.DCS,
		isHidden: false
	}
];

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

const schemaColumns: TableColumn[] = [
	{
		field: "name",
		headerName: "Name",
		sortable: true,
		disableHiding: false,
		sortDirection: SORT_DIRECTION.ASC,
		isHidden: false
	},
	{
		headerName: "Shared",
		field: "shared",
		sortable: true,
		disableHiding: false,
		sortDirection: SORT_DIRECTION.DCS,
		isHidden: false
	},
	{
		headerName: "# of Versions",
		field: "version_count",
		sortable: false,
		disableHiding: false,
		sortDirection: SORT_DIRECTION.DCS,
		isHidden: false
	},
	{
		headerName: "Schema Type",
		field: "schemaType",
		sortable: true,
		disableHiding: false,
		sortDirection: SORT_DIRECTION.DCS,
		isHidden: false
	},
	{
		headerName: "Content Type",
		field: "contentType",
		sortable: true,
		disableHiding: false,
		sortDirection: SORT_DIRECTION.DCS,
		isHidden: false
	}
];

enum SharedTypes {
	shared = "Shared",
	notShared = "Not Shared"
}

export default {
	title: "Under Construction/SolaceTable",
	component: SolaceTable,
	parameters: {
		design: {
			type: "figma",
			url: ""
		},
		args: {
			rows,
			columns
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

const sortData = (selectedColumn: TableColumn, rows) => {
	return rows.sort((a, b) => {
		if (selectedColumn.sortDirection === SORT_DIRECTION.ASC) {
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

export const DefaultTable = (): JSX.Element => {
	const data = cloneDeep(rows);
	const [tableRows, setRows] = useState([...sortData(columns[0], data)]);

	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columns}
				selectionType={SELECTION_TYPE.MULTI}
			></SolaceTable>
		</div>
	);
};

export const SingleSelectionTable = (): JSX.Element => {
	const data = cloneDeep(rows);
	const [tableRows, setRows] = useState([...sortData(columns[0], data)]);

	const handleSort = useCallback((selectedColumn) => {
		action("columnSort");
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columns}
				selectionType={SELECTION_TYPE.SINGLE}
			></SolaceTable>
		</div>
	);
};

export const CustomColumnWidthTable = (): JSX.Element => {
	const data = cloneDeep(rows);
	const customColumns = cloneDeep(columns);
	customColumns[0].width = 140;
	customColumns[1].width = 140;
	customColumns[3].width = 130;
	const [tableRows, setRows] = useState([...sortData(columns[0], data)]);

	const handleSort = useCallback((selectedColumn) => {
		action("columnSort");
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={customColumns}
				selectionType={SELECTION_TYPE.SINGLE}
			></SolaceTable>
		</div>
	);
};

export const ControlledSortedColumnTable = (): JSX.Element => {
	const data = cloneDeep(rows);
	const columnToSort = cloneDeep(columns[3]);
	const [sortedColumn, setSortedColumn] = useState(columnToSort);
	const [tableRows, setRows] = useState([...sortData(columnToSort, data)]);

	const handleSort = useCallback((selectedColumn) => {
		console.log("handleSort", selectedColumn);
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
				columns={columns}
				selectionType={SELECTION_TYPE.MULTI}
			></SolaceTable>
		</div>
	);
};

const renderExpandedRowContentHelper = (row, allowToggle, selectionType) => {
	// different padding left depending on whether there is expand/collapse column or checkbox
	let paddingLeft = "51px";
	if (!allowToggle && selectionType !== SELECTION_TYPE.MULTI) {
		paddingLeft = "12px";
	} else if (allowToggle && selectionType === SELECTION_TYPE.MULTI) {
		paddingLeft = "100px";
	} else if (!allowToggle && selectionType === SELECTION_TYPE.MULTI) {
		paddingLeft = "68px";
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

export const ExpandableRowTableSelectNone = (): JSX.Element => {
	const data = cloneDeep(rows);
	const [tableRows, setRows] = useState([...sortData(columns[0], data)]);
	const [expandedRowIds, setExpandedRowIds] = useState<string[]>([]);
	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const selectionType = SELECTION_TYPE.NONE;
	const renderExpandedRowContent = useCallback((row) => renderExpandedRowContentHelper(row, true, selectionType), []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columns}
				selectionType={selectionType}
				hasColumnHiding={true}
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

export const ExpandableRowTableSelectMulti = (): JSX.Element => {
	const data = cloneDeep(rows);
	const [tableRows, setRows] = useState([...sortData(columns[0], data)]);
	const [expandedRowIds, setExpandedRowIds] = useState<string[]>([]);
	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn, data)]);
	}, []);
	const selectionType = SELECTION_TYPE.MULTI;

	const renderExpandedRowContent = useCallback((row) => renderExpandedRowContentHelper(row, true, selectionType), []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columns}
				selectionType={selectionType}
				hasColumnHiding={true}
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

export const ExpandableRowNoToggleTableSelectSingle = (): JSX.Element => {
	const data = cloneDeep(rows);
	const [tableRows, setRows] = useState([...sortData(columns[0], data)]);
	const [expandedRowIds, setExpandedRowIds] = useState<string[]>([]);
	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const selectionType = SELECTION_TYPE.SINGLE;
	const renderExpandedRowContent = useCallback((row) => renderExpandedRowContentHelper(row, false, selectionType), []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columns}
				selectionType={selectionType}
				hasColumnHiding={true}
				expandableRowOptions={{
					allowToggle: false,
					renderChildren: renderExpandedRowContent,
					expandedRowIds: expandedRowIds,
					setExpandedRowIds: setExpandedRowIds
				}}
			></SolaceTable>
		</div>
	);
};

export const ExpandableRowNoToggleTableSelectMulti = (): JSX.Element => {
	const data = cloneDeep(rows);
	const [tableRows, setRows] = useState([...sortData(columns[0], data)]);
	const [expandedRowIds, setExpandedRowIds] = useState<string[]>([]);
	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const selectionType = SELECTION_TYPE.MULTI;
	const renderExpandedRowContent = useCallback((row) => renderExpandedRowContentHelper(row, false, selectionType), []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columns}
				selectionType={selectionType}
				hasColumnHiding={true}
				expandableRowOptions={{
					allowToggle: false,
					renderChildren: renderExpandedRowContent,
					expandedRowIds: expandedRowIds,
					setExpandedRowIds: setExpandedRowIds
				}}
			></SolaceTable>
		</div>
	);
};

export const ExpandableRowTableSelectNoneInitialExpandedRows = (): JSX.Element => {
	const data = cloneDeep(rows);
	const [tableRows, setRows] = useState([...sortData(columns[0], data)]);
	const [expandedRowIds, setExpandedRowIds] = useState<string[]>(["2", "3"]);
	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const selectionType = SELECTION_TYPE.NONE;
	const renderExpandedRowContent = useCallback((row) => renderExpandedRowContentHelper(row, true, selectionType), []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columns}
				selectionType={selectionType}
				hasColumnHiding={true}
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
	const [tableRows, setRows] = useState([...sortData(schemaColumns[0], data)]);
	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const renderSchemaRowCells = useCallback((row: TableRow): JSX.Element[] => {
		const cells: JSX.Element[] = [];
		cells.push(<StyledTableData key={row.id + "_name"}>{row.name}</StyledTableData>);
		cells.push(
			<StyledTableData key={row.id + "_shared"}>
				{row.shared ? SharedTypes.shared : SharedTypes.notShared}
			</StyledTableData>
		);
		cells.push(<StyledTableData key={row.id + "_version_count"}>{row.version_count}</StyledTableData>);
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
				columns={[...schemaColumns]}
				selectionType={SELECTION_TYPE.SINGLE}
				renderCustomRowCells={renderSchemaRowCells}
			></SolaceTable>
		</div>
	);
};

const handleShowHideColumns = (columns, setColumnsHiddenInfo) => {
	const columnsHiddenInfo = columns?.reduce((prev, curr) => {
		prev[curr.field] = curr.isHidden;
		return prev;
	}, {});
	setColumnsHiddenInfo(columnsHiddenInfo);
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
		cells.push(<StyledTableData key={row.id + "_version_count"}>{row.version_count}</StyledTableData>);
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
	if (!allowToggle && selectionType !== SELECTION_TYPE.MULTI) {
		paddingLeft = "14px";
	} else if (allowToggle && selectionType === SELECTION_TYPE.MULTI) {
		paddingLeft = "100px";
	} else if (!allowToggle && selectionType === SELECTION_TYPE.MULTI) {
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
	const [tableRows, setRows] = useState([...sortData(schemaColumns[0], data)]);
	const [columnsHiddenInfo, setColumnsHiddenInfo] = useState(null);
	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const displayedColumnsChanged = useCallback((columns) => {
		handleShowHideColumns(columns, setColumnsHiddenInfo);
	}, []);

	const renderSchemaRowCells = useCallback(
		(row: TableRow): JSX.Element[] => createSchemaCells(row, columnsHiddenInfo),
		[columnsHiddenInfo]
	);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={[...schemaColumns]}
				selectionType={SELECTION_TYPE.SINGLE}
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
	const [tableRows, setRows] = useState([...sortData(schemaColumns[0], data)]);
	const [columnsHiddenInfo, setColumnsHiddenInfo] = useState(null);
	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const displayedColumnsChanged = useCallback((columns) => {
		handleShowHideColumns(columns, setColumnsHiddenInfo);
	}, []);

	const renderSchemaRowCells = useCallback(
		(row: TableRow): JSX.Element[] => createSchemaCells(row, columnsHiddenInfo),
		[columnsHiddenInfo]
	);

	const renderSchemaRowActions = useCallback((row: TableRow): TableActionMenuItem[] => {
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
				columns={[...schemaColumns]}
				selectionType={SELECTION_TYPE.SINGLE}
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
	const customColumns = cloneDeep(schemaColumns);
	customColumns[1].width = 120;
	customColumns[2].width = 120;
	const [tableRows, setRows] = useState([...sortData(customColumns[0], data)]);
	const [columnsHiddenInfo, setColumnsHiddenInfo] = useState(null);
	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const displayedColumnsChanged = useCallback((columns) => {
		handleShowHideColumns(columns, setColumnsHiddenInfo);
	}, []);

	const renderSchemaRowCells = useCallback(
		(row: TableRow): JSX.Element[] => createSchemaCells(row, columnsHiddenInfo),
		[columnsHiddenInfo]
	);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={customColumns}
				selectionType={SELECTION_TYPE.SINGLE}
				rowActionMenuItems={rowActionMenuItems}
				renderCustomRowCells={renderSchemaRowCells}
				hasColumnHiding={true}
				displayedColumnsChangedCallback={displayedColumnsChanged}
			></SolaceTable>
		</div>
	);
};

export const ExpandableCustomSchemaRowWithActionsTable = (): JSX.Element => {
	const data = cloneDeep(schemaRows);
	const [tableRows, setRows] = useState([...sortData(schemaColumns[0], data)]);
	const [columnsHiddenInfo, setColumnsHiddenInfo] = useState(null);
	const [expandedRowIds, setExpandedRowIds] = useState<string[]>([]);
	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const selectionType = SELECTION_TYPE.SINGLE;

	const displayedColumnsChanged = useCallback((columns) => {
		handleShowHideColumns(columns, setColumnsHiddenInfo);
	}, []);

	const renderSchemaRowCells = useCallback(
		(row: TableRow): JSX.Element[] => createSchemaCells(row, columnsHiddenInfo),
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
				columns={[...schemaColumns]}
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

export const ExpandableCustomSchemaRowWithActionsCustomWidthTable = (): JSX.Element => {
	const data = cloneDeep(schemaRows);
	const customColumns = cloneDeep(schemaColumns);
	customColumns[1].width = 120;
	customColumns[2].width = 120;
	const [tableRows, setRows] = useState([...sortData(customColumns[0], data)]);
	const [columnsHiddenInfo, setColumnsHiddenInfo] = useState(null);
	const [expandedRowIds, setExpandedRowIds] = useState<string[]>([]);
	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const selectionType = SELECTION_TYPE.SINGLE;

	const displayedColumnsChanged = useCallback((columns) => {
		handleShowHideColumns(columns, setColumnsHiddenInfo);
	}, []);

	const renderSchemaRowCells = useCallback(
		(row: TableRow): JSX.Element[] => createSchemaCells(row, columnsHiddenInfo),
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
				columns={customColumns}
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

export const EmptyStateTable = (): JSX.Element => {
	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={action("sort callback")}
				rows={[]}
				columns={columns}
				selectionType={SELECTION_TYPE.MULTI}
			></SolaceTable>
		</div>
	);
};

export const CustomEmptyStateTable = (): JSX.Element => {
	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={action("sort callback")}
				rows={[]}
				columns={columns}
				selectionType={SELECTION_TYPE.MULTI}
				renderCustomEmptyState={renderCustomEmptyState}
			></SolaceTable>
		</div>
	);
};

export const RowActionMenuTable = (): JSX.Element => {
	const data = cloneDeep(rows);
	const [tableRows, setRows] = useState([...sortData(columns[0], data)]);

	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columns}
				selectionType={SELECTION_TYPE.MULTI}
				rowActionMenuItems={rowActionMenuItems}
				headerHoverCallback={action("header hover callback")}
				rowHoverCallback={action("row hover callback")}
			></SolaceTable>
		</div>
	);
};

export const ColumnHidingTable = (): JSX.Element => {
	const data = cloneDeep(rows);
	const [tableRows, setRows] = useState([...sortData(columns[0], data)]);

	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columns}
				selectionType={SELECTION_TYPE.MULTI}
				rowActionMenuItems={rowActionMenuItems}
				hasColumnHiding={true}
			></SolaceTable>
		</div>
	);
};

export const ControlledColumnHidingTable = (): JSX.Element => {
	const data = cloneDeep(rows);
	const tableColumns = cloneDeep(columns);
	tableColumns[1].isHidden = true;
	const [displayedColumns, setDisplayedColumns] = useState(tableColumns);
	const [tableRows, setRows] = useState([...sortData(columns[0], data)]);

	const handleSort = useCallback((selectedColumn) => {
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
				columns={columns}
				selectionType={SELECTION_TYPE.MULTI}
				rowActionMenuItems={rowActionMenuItems}
				hasColumnHiding={true}
				displayedColumns={displayedColumns}
				displayedColumnsChangedCallback={displayedColumnsChanged}
			></SolaceTable>
		</div>
	);
};

export const ExpandableCustomSchemaRowControlledStateTable = (): JSX.Element => {
	const data = cloneDeep(schemaRows);
	const tableColumns = cloneDeep(schemaColumns);
	tableColumns[1].isHidden = true;
	const columnToSort = tableColumns[3];
	const [sortedColumn, setSortedColumn] = useState(columnToSort);
	const [tableRows, setRows] = useState([...sortData(columnToSort, data)]);
	const [displayedColumns, setDisplayedColumns] = useState(tableColumns);
	const [columnsHiddenInfo, setColumnsHiddenInfo] = useState(null);
	const [expandedRowIds, setExpandedRowIds] = useState<string[]>([]);
	const handleSort = useCallback((selectedColumn) => {
		setSortedColumn(selectedColumn);
		setRows([...sortData(selectedColumn, data)]);
	}, []);

	const selectionType = SELECTION_TYPE.SINGLE;

	const displayedColumnsChanged = useCallback((columns) => {
		setDisplayedColumns(columns);
		handleShowHideColumns(columns, setColumnsHiddenInfo);
	}, []);

	const renderSchemaRowCells = useCallback(
		(row: TableRow): JSX.Element[] => createSchemaCells(row, columnsHiddenInfo),
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
				columns={[...schemaColumns]}
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
