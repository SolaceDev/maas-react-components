import React, { useState, useCallback } from "react";
import { action } from "@storybook/addon-actions";
import { ComponentMeta } from "@storybook/react";
import { SolaceTable } from "@SolaceDev/maas-react-components";
import {
	SELECTION_TYPE,
	SORT_DIRECTION,
	StyledTableData,
	StyledExpandedTableRow,
	StyledExpandedTableData,
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

const renderExpandedRowContentHelper = (row, displayedColumnsCount) => {
	return (
		<StyledExpandedTableRow className={row.rowSelected ? "selected" : ""}>
			<StyledExpandedTableData colSpan={displayedColumnsCount}>
				<table style={{ display: "block", width: "100%", padding: "12px 0 12px 60px" }}>
					<tbody key={`${row.id}_expansion`} style={{ width: "100%", display: "block" }}>
						<tr style={{ display: "block", width: "100%" }}>
							<td style={{ display: "block", width: "100%" }}>{row.first_name}</td>
						</tr>
						<tr style={{ display: "block", width: "100%" }}>
							<td style={{ display: "block", width: "100%" }}>{row.last_name}</td>
						</tr>
						<tr style={{ display: "block", width: "100%" }}>
							<td style={{ display: "block", width: "100%" }}>{row.email}</td>
						</tr>
						<tr style={{ display: "block", width: "100%" }}>
							<td style={{ display: "block", width: "100%" }}>{row.gender}</td>
						</tr>
					</tbody>
				</table>
			</StyledExpandedTableData>
		</StyledExpandedTableRow>
	);
};

const handleDisplayColumnsChanged = (
	columns,
	hasColumnHiding,
	hasExpandedRow,
	selectionType,
	setDisplayedColumnsCount
) => {
	let numberOfDisplayedDataCols = 0;
	columns.forEach((col) => {
		if (!col.isHidden) {
			numberOfDisplayedDataCols++;
		}
	});
	let numberOfNonDataCols = 0;

	if (hasColumnHiding) numberOfNonDataCols++;
	if (hasExpandedRow) numberOfNonDataCols++;
	if (selectionType === SELECTION_TYPE.MULTI) numberOfNonDataCols++;
	setDisplayedColumnsCount(numberOfDisplayedDataCols + numberOfNonDataCols);
};

export const ExpandableRowTableSelectNone = (): JSX.Element => {
	const data = cloneDeep(rows);
	const [tableRows, setRows] = useState([...sortData(columns[0], data)]);
	const [displayedColumnsCount, setDisplayedColumnsCount] = useState<number>();
	const [expandedRowIds, setExpandedRowIds] = useState<string[]>([]);
	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn, data)]);
	}, []);
	const hasColumnHiding = true;
	const hasExpandedRow = true;
	const selectionType = SELECTION_TYPE.NONE;

	const renderExpandedRowContent = useCallback(
		(row) => renderExpandedRowContentHelper(row, displayedColumnsCount),
		[displayedColumnsCount]
	);

	const displayedColumnsChanged = useCallback(
		(columns) => {
			handleDisplayColumnsChanged(columns, hasColumnHiding, hasExpandedRow, selectionType, setDisplayedColumnsCount);
		},
		[hasColumnHiding, hasExpandedRow, selectionType]
	);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columns}
				selectionType={selectionType}
				hasColumnHiding={hasColumnHiding}
				displayedColumnsChangedCallback={displayedColumnsChanged}
				hasExpandedRow={hasExpandedRow}
				renderExpandedRowContent={renderExpandedRowContent}
				expandedRowIds={expandedRowIds}
				setExpandedRowIds={setExpandedRowIds}
			></SolaceTable>
		</div>
	);
};

export const ExpandableRowTableSelectMulti = (): JSX.Element => {
	const data = cloneDeep(rows);
	const [tableRows, setRows] = useState([...sortData(columns[0], data)]);
	const [displayedColumnsCount, setDisplayedColumnsCount] = useState<number>();
	const [expandedRowIds, setExpandedRowIds] = useState<string[]>([]);
	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn, data)]);
	}, []);
	const hasColumnHiding = true;
	const hasExpandedRow = true;
	const selectionType = SELECTION_TYPE.MULTI;

	const renderExpandedRowContent = useCallback(
		(row) => renderExpandedRowContentHelper(row, displayedColumnsCount),
		[displayedColumnsCount]
	);

	const displayedColumnsChanged = useCallback(
		(columns) => {
			handleDisplayColumnsChanged(columns, hasColumnHiding, hasExpandedRow, selectionType, setDisplayedColumnsCount);
		},
		[hasColumnHiding, hasExpandedRow, selectionType]
	);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action(selectionCallback)}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columns}
				selectionType={selectionType}
				hasColumnHiding={hasColumnHiding}
				displayedColumnsChangedCallback={displayedColumnsChanged}
				hasExpandedRow={hasExpandedRow}
				renderExpandedRowContent={renderExpandedRowContent}
				expandedRowIds={expandedRowIds}
				setExpandedRowIds={setExpandedRowIds}
			></SolaceTable>
		</div>
	);
};

export const CustomSchemaRowTable = (): JSX.Element => {
	const data = cloneDeep(schemaRows);
	const [tableRows, setRows] = useState([...sortData(schemaColumns[0], data)]);
	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn, data)]);
	}, []);

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

export const CustomSchemaRowWithActionsTable = (): JSX.Element => {
	const data = cloneDeep(schemaRows);
	const [tableRows, setRows] = useState([...sortData(schemaColumns[0], data)]);
	const [columnsHiddenInfo, setColumnsHiddenInfo] = useState(null);
	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn, data)]);
	}, []);

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

	const displayedColumnsChanged = useCallback((columns) => {
		const columnsHiddenInfo = columns?.reduce((prev, curr) => {
			prev[curr.field] = curr.isHidden;
			return prev;
		}, {});
		setColumnsHiddenInfo(columnsHiddenInfo);
	}, []);

	const renderSchemaRowCells = useCallback(
		(row: TableRow): JSX.Element[] => {
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
		},
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
