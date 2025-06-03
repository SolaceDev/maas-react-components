import React, { useState, useCallback, useEffect } from "react";
import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";
import {
	SolaceTable,
	SolaceTableSelectionType,
	SolaceTableSortDirection,
	SolaceTableActionMenuItem,
	SolaceTableColumn,
	SolaceTableRow,
	SolacePagination,
	styled,
	SolaceRadio,
	SolaceTableData,
	SolaceTableNumberData
} from "@SolaceDev/maas-react-components";
import { cloneDeep } from "lodash";
import { useMemo } from "react";
import { userEvent, within } from "@storybook/testing-library";

(SolaceTable as React.FC & { displayName?: string }).displayName = "SolaceTable";
(SolacePagination as React.FC & { displayName?: string }).displayName = "SolacePagination";

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

const rowsPage2 = [
	{
		id: "11",
		first_name: "Takada",
		last_name: "Fern",
		email: "fvanstone0@ft.com",
		gender: "Agender"
	},
	{
		id: "12",
		first_name: "Light",
		last_name: "Delcastel",
		email: "adelcastel1@chicagotribune.com",
		gender: "Polygender"
	},
	{
		id: "13",
		first_name: "Misa",
		last_name: "Bowering",
		email: "sbowering2@globo.com",
		gender: "Agender"
	},
	{
		id: "14",
		first_name: "Hime",
		last_name: "Wingeatt",
		email: "hwingeatt3@pcworld.com",
		gender: "Female"
	},
	{
		id: "15",
		first_name: "Suruga",
		last_name: "Hull",
		email: "chull4@tiny.cc",
		gender: "Female"
	},
	{
		id: "16",
		first_name: "Dio",
		last_name: "Karsh",
		email: "dkarsh5@forbes.com",
		gender: "Agender"
	},
	{
		id: "17",
		first_name: "Alphonse",
		last_name: "O'Grogane",
		email: "kogrogane6@narod.ru",
		gender: "Non-binary"
	},
	{
		id: "18",
		first_name: "Levi",
		last_name: "Spillard",
		email: "wspillard7@e-recht24.de",
		gender: "Polygender"
	},
	{
		id: "19",
		first_name: "Sasha",
		last_name: "Trahear",
		email: "ltrahear8@telegraph.co.uk",
		gender: "Male"
	},
	{
		id: "20",
		first_name: "Connie",
		last_name: "Malsher",
		email: "vmalsher9@twitpic.com",
		gender: "Polygender"
	}
];

const rowsPage3 = [
	{
		id: "21",
		first_name: "Wakada",
		last_name: "Bern",
		email: "vanstone0@vt.com",
		gender: "Agender"
	}
];

const threePagesOfRows = [...rows, ...rowsPage2, ...rowsPage3];

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
	title: "Data Display/Table",
	component: SolaceTable,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=2558%3A9993"
		},
		docs: {
			description: {
				component: "Table component for reuse in all Solace based applications. Code component name: SolaceTable"
			}
		}
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description:
				"Unique identifier for the Table component. Used for accessibility and programmatic access to the table instance.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		hasWarnings: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the table in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the table data.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		rows: {
			control: { type: "object" },
			description:
				"Array of data objects to be displayed in the table. Each object should have an 'id' field and properties that correspond to the column field names.",
			table: {
				type: { summary: "SolaceTableRow[]" },
				defaultValue: { summary: "[]" }
			}
		},
		columns: {
			control: { type: "object" },
			description:
				"Array of column definitions that determine how data is displayed. Each column specifies field mapping, display name, sorting capabilities, and visibility options.",
			table: {
				type: { summary: "SolaceTableColumn[]" },
				defaultValue: { summary: "[]" }
			}
		},
		selectionType: {
			options: [SolaceTableSelectionType.NONE, SolaceTableSelectionType.SINGLE, SolaceTableSelectionType.MULTI],
			control: { type: "select" },
			description:
				"Determines the row selection behavior. 'NONE' disables selection, 'SINGLE' allows one row selection, 'MULTI' enables multiple row selection with checkboxes.",
			table: {
				type: { summary: '"NONE" | "SINGLE" | "MULTI"' },
				defaultValue: { summary: '"NONE"' }
			}
		},
		loading: {
			control: { type: "boolean" },
			description:
				"When true, displays a loading spinner overlay on the table. Use this during data fetching or processing operations to provide user feedback.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		loadingMessage: {
			control: { type: "text" },
			description:
				"Custom message to display alongside the loading spinner. Provides context about what operation is in progress.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		selectionChangedCallback: {
			control: false,
			description:
				"Callback function fired when row selection changes. Receives an array of selected row IDs. Use this to handle selection state in parent components.",
			table: {
				type: { summary: "(selectedRowIds: string[]) => void" },
				defaultValue: { summary: "undefined" }
			}
		},
		sortCallback: {
			control: false,
			description:
				"Callback function fired when column sorting is requested. Receives the column definition and sort direction. Implement custom sorting logic here.",
			table: {
				type: { summary: "(column: SolaceTableColumn, direction: SolaceTableSortDirection) => void" },
				defaultValue: { summary: "undefined" }
			}
		},
		selectedRowIds: {
			control: { type: "object" },
			description:
				"Controlled state for selected rows. Array of row IDs that should be selected. Use this for external control of table selection state.",
			table: {
				type: { summary: "string[]" },
				defaultValue: { summary: "undefined" }
			}
		},
		disabledRowIds: {
			control: { type: "object" },
			description:
				"Array of row IDs that should be disabled and non-selectable. Disabled rows appear muted and cannot be selected by users.",
			table: {
				type: { summary: "string[]" },
				defaultValue: { summary: "undefined" }
			}
		},
		independentRowHighlight: {
			control: { type: "boolean" },
			description:
				"When true in MULTI selection mode, row highlighting is handled independently of checkbox selection. Allows separate visual highlighting and selection states.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		highlightedRowId: {
			control: { type: "text" },
			description:
				"Controlled state for the currently highlighted row. Use this to programmatically highlight specific rows for focus or navigation purposes.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		hasColumnHiding: {
			control: { type: "boolean" },
			description:
				"Enables column visibility controls, allowing users to show/hide columns through the table interface. Provides a column management menu.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		maxHeight: {
			control: { type: "text" },
			description:
				"Maximum height constraint for the table container. Can be specified in any CSS unit. When exceeded, the table becomes scrollable.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		minHeight: {
			control: { type: "text" },
			description:
				"Minimum height constraint for the table container. Can be specified in any CSS unit. Ensures consistent layout even with few rows.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		crossPageRowSelectionSupported: {
			control: { type: "boolean" },
			description:
				"Enables selection persistence across pagination. When true, selected rows remain selected when navigating between pages in multi-selection mode.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		totalObjectCount: {
			control: { type: "number" },
			description:
				"Total number of objects across all pages. Required for cross-page selection features and accurate selection count displays.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "undefined" }
			}
		},
		allPagesSelectedByDefault: {
			control: { type: "boolean" },
			description:
				"When true, all pages are considered selected by default in cross-page selection mode. Users can then deselect specific items as needed.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		emptyStateMessage: {
			control: { type: "text" },
			description:
				"Message to display when the table has no data. Provides user guidance when no results are available.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		rowActionMenuItems: {
			control: false,
			description:
				"Array of action menu items for each row. Provides contextual actions like edit, delete, or view details accessible via row menu.",
			table: {
				type: { summary: "SolaceTableActionMenuItem[]" },
				defaultValue: { summary: "undefined" }
			}
		},
		onRowClick: {
			control: false,
			description:
				"Callback function fired when a table row is clicked. Receives the clicked row data. Use this for row navigation or detailed view actions.",
			table: {
				type: { summary: "(row: SolaceTableRow) => void" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceTable>;

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
const crossPageSelectionCallback = "cross page selection callback";
const rowHighlightCallback = "row highlight callback";
const sortCallback = "sort callback";

const renderSelectedRowsInfo = (selectedRowIds, tableRows) => {
	return selectedRowIds.map((rowId) => {
		return (
			<div key={`selectedRow_${rowId}`}>
				Selected Row Id: {rowId}, Email: {tableRows.find((row) => row.id === rowId)?.email};
			</div>
		);
	});
};

const showHideColumn = async (canvas, fieldName) => {
	await userEvent.click(await canvas.findByTestId("TuneIcon"));
	const tuneIcon = canvas.getByTestId("TuneIcon");
	const body = tuneIcon.closest("body") as HTMLElement;
	const presentation = await within(body).findByRole("presentation");
	const menu = await within(presentation).findByRole("menu");
	await userEvent.click(within(menu).getByText(fieldName));
};

const selectCheckbox = async (canvas, textInRow) => {
	if (textInRow) {
		const textElements = await canvas.findAllByText(textInRow);
		const tr = textElements[0].closest("tr");
		await userEvent.click(within(tr).getAllByRole("checkbox")[1]);
	} else {
		const checkboxes = await canvas.findAllByRole("checkbox");
		const selectAllCheckbox = checkboxes.find((checkbox) => checkbox.id === "selectAllCheckbox-checkbox");
		await userEvent.click(selectAllCheckbox);
	}
};

const selectRow = async (canvas, textInRow) => {
	if (textInRow) {
		const textElements = await canvas.findAllByText(textInRow);
		await userEvent.click(textElements[0]);
	}
};

const expandRow = async (canvas, textInRow) => {
	if (textInRow) {
		const textElements = await canvas.findAllByText(textInRow);
		const tr = textElements[0].closest("tr");
		await userEvent.click(within(tr).getByTestId("ArrowRightIcon"));
	}
};

const goToPage = async (canvas, pageNumber) => {
	if (pageNumber) {
		await userEvent.click(await canvas.findByLabelText("Go to page " + pageNumber));
	}
};

// Table template which supports uncontrolled column sorting state
const TableTemplate = ({ rows, columns, selectionType, initialSelectedRowIds, ...args }): JSX.Element => {
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
		<SolaceTable
			{...args}
			selectedRowIds={selectedRowIds}
			selectionChangedCallback={handleRowSelectionsChange}
			sortCallback={handleSort}
			rows={tableRows}
			columns={columnsDef}
			selectionType={selectionType}
		></SolaceTable>
	);
};

export const DefaultTable = {
	render: TableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.NONE
	}
};

export const DefaultWithMinMaxHeightTable = {
	render: TableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.NONE,
		minHeight: "100px",
		maxHeight: "150px"
	}
};

export const SingleSelectionTable = {
	render: TableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.SINGLE
	}
};

export const SingleSelectionTableInitialSelections = {
	render: TableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.SINGLE,
		initialSelectedRowIds: ["2"]
	}
};

export const MultiSelectionTable = {
	render: TableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.MULTI
	}
};

export const MultiSelectionTableWithDisabledRows = {
	render: TableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.MULTI,
		disabledRowIds: [rows[0].id, rows[4].id]
	}
};

export const InteractiveMultiSelectionTableWithInvalidDisabledRowIds = {
	render: TableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.MULTI,
		disabledRowIds: ["unknownRowId"]
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		// click on Select All
		await selectCheckbox(canvas, null);
	},

	parameters: {
		// Delay snapshot 1 seconds until all interactions are done
		chromatic: { delay: 1000 }
	}
};

export const MultiSelectionTableInitialSelections = {
	render: TableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.MULTI,
		initialSelectedRowIds: ["2", "4"]
	}
};

const PaginationContainer = styled("div")(({ theme }) => ({
	border: `1px solid ${theme.palette.ux.secondary.w20}`,
	borderRadius: "4px"
}));

const VerticalPadding = styled("div")(() => ({
	padding: "8px 0px"
}));

const CustomContentWrapper = styled("div")(() => ({
	// remove the border on table
	".tableWrapper": {
		border: "none"
	}
}));

const TableWrapper = (props) => {
	return <CustomContentWrapper>{props.children}</CustomContentWrapper>;
};

export const TableWithNoBorder = {
	render: TableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.MULTI
	},

	decorators: [
		(Story) => (
			<TableWrapper>
				<Story />
			</TableWrapper>
		)
	]
};

export const ScrollableTable = {
	render: TableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.MULTI
	},

	decorators: [
		(Story) => (
			<div style={{ height: "300px" }}>
				<h3>Table header becomes sticky when table content is scrollable</h3>
				<Story />
			</div>
		)
	]
};

export const TableWithOnlyOneRow = {
	render: TableTemplate,

	args: {
		rows: rows.slice(-1),
		columns: columns,
		selectionType: SolaceTableSelectionType.MULTI
	}
};

export const LoadingTableWithOnlyOneRow = {
	render: TableTemplate,

	args: {
		rows: rows.slice(-1),
		columns: columns,
		selectionType: SolaceTableSelectionType.MULTI,
		loading: true,
		loadingMessage: "loading..."
	}
};

export const LoadingTableWithPagination = {
	render: TableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.MULTI,
		loading: true,
		loadingMessage: "loading..."
	},

	decorators: [
		(Story) => (
			<div style={{ padding: 16 }}>
				<h3>A loading table with (loading) pagination</h3>
				<PaginationContainer>
					<TableWrapper>
						<Story />
					</TableWrapper>
					<VerticalPadding>
						<SolacePagination totalResults={rows.length} loading={true} />
					</VerticalPadding>
				</PaginationContainer>
			</div>
		)
	]
};

export const EmptyStateTable = {
	render: TableTemplate,

	args: {
		rows: [],
		columns: columns,
		selectionType: SolaceTableSelectionType.MULTI
	}
};

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
				sortCallback={action(sortCallback)}
				rows={[]}
				columns={columns}
				selectionType={SolaceTableSelectionType.NONE}
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
				sortCallback={action(sortCallback)}
				rows={[]}
				columns={columns}
				selectionType={SolaceTableSelectionType.NONE}
				renderCustomEmptyState={renderCustomEmptyState}
			></SolaceTable>
		</div>
	);
};

export const RowActionMenuTable = (): JSX.Element => {
	const data = cloneDeep(rows);
	const columnsDef = useMemo(() => {
		return cloneDeep(columns);
	}, []);
	const [tableRows, setRows] = useState([...sortData(columnsDef[0], data)]);

	const handleSort = useCallback(
		(selectedColumn) => {
			action(sortCallback);
			setRows([...sortData(selectedColumn, data)]);
		},
		[data]
	);

	const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
	const handleRowSelectionsChange = useCallback((rows: SolaceTableRow[]) => {
		action(selectionCallback);
		setSelectedRowIds(rows.map((row) => row.id));
	}, []);

	return (
		<div>
			<SolaceTable
				selectedRowIds={selectedRowIds}
				selectionChangedCallback={handleRowSelectionsChange}
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

	const handleSort = useCallback(
		(selectedColumn) => {
			action(sortCallback);
			setRows([...sortData(selectedColumn, data)]);
		},
		[data]
	);

	const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
	const handleRowSelectionsChange = useCallback((rows: SolaceTableRow[]) => {
		action(selectionCallback);
		setSelectedRowIds(rows.map((row) => row.id));
	}, []);

	const renderSchemaRowActions = useCallback((row: SolaceTableRow): SolaceTableActionMenuItem[] => {
		if (row.id === "4") {
			return [];
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
				selectedRowIds={selectedRowIds}
				selectionChangedCallback={handleRowSelectionsChange}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={SolaceTableSelectionType.MULTI}
				renderCustomRowActionItem={renderSchemaRowActions}
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

	const handleSort = useCallback(
		(selectedColumn) => {
			action(sortCallback);
			setRows([...sortData(selectedColumn, data)]);
			setSortedColumn(selectedColumn);
		},
		[data]
	);

	const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
	const handleRowSelectionsChange = useCallback((rows: SolaceTableRow[]) => {
		action(selectionCallback);
		setSelectedRowIds(rows.map((row) => row.id));
	}, []);

	return (
		<div>
			<SolaceTable
				selectedRowIds={selectedRowIds}
				selectionChangedCallback={handleRowSelectionsChange}
				sortedColumn={sortedColumn}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={SolaceTableSelectionType.MULTI}
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

	const handleSort = useCallback(
		(selectedColumn) => {
			action(sortCallback);
			setRows([...sortData(selectedColumn, data)]);
		},
		[data]
	);

	const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
	const handleRowSelectionsChange = useCallback((rows: SolaceTableRow[]) => {
		action(selectionCallback);
		setSelectedRowIds(rows.map((row) => row.id));
	}, []);

	return (
		<div>
			<SolaceTable
				selectedRowIds={selectedRowIds}
				selectionChangedCallback={handleRowSelectionsChange}
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

export const ControlledColumnHidingTable = (): JSX.Element => {
	const data = cloneDeep(rows);
	const columnsDef = useMemo(() => {
		return cloneDeep(columns);
	}, []);
	columnsDef[1].isHidden = true;
	const [displayedColumns, setDisplayedColumns] = useState(columnsDef);
	const [tableRows, setRows] = useState([...sortData(columns[0], data)]);

	const handleSort = useCallback(
		(selectedColumn) => {
			action(sortCallback);
			setRows([...sortData(selectedColumn, data)]);
		},
		[data]
	);

	const displayedColumnsChanged = useCallback((columns) => {
		setDisplayedColumns(columns);
	}, []);

	const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
	const handleRowSelectionsChange = useCallback((rows: SolaceTableRow[]) => {
		action(selectionCallback);
		setSelectedRowIds(rows.map((row) => row.id));
	}, []);

	return (
		<div>
			<SolaceTable
				selectedRowIds={selectedRowIds}
				selectionChangedCallback={handleRowSelectionsChange}
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

	const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
	const handleRowSelectionsChange = useCallback((rows: SolaceTableRow[]) => {
		action(selectionCallback);
		setSelectedRowIds(rows.map((row) => row.id));
	}, []);

	return (
		<div>
			<SolaceTable
				selectedRowIds={selectedRowIds}
				selectionChangedCallback={handleRowSelectionsChange}
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

	const handleSort = useCallback(
		(selectedColumn) => {
			action(sortCallback);
			setRows([...sortData(selectedColumn, data)]);
		},
		[data]
	);

	const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
	const handleRowSelectionsChange = useCallback((rows: SolaceTableRow[]) => {
		action(selectionCallback);
		setSelectedRowIds(rows.map((row) => row.id));
	}, []);

	return (
		<div>
			<SolaceTable
				selectedRowIds={selectedRowIds}
				selectionChangedCallback={handleRowSelectionsChange}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={SolaceTableSelectionType.SINGLE}
			></SolaceTable>
		</div>
	);
};

// Table template to decouple row highlight from checkbox selection for multi selection table
const MultiSelectionTableIndependentRowHighlightTemplate = ({
	rows,
	columns,
	initialHighlightedRowId,
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
	const handleRowSelectionsChange = useCallback((rows: SolaceTableRow[]) => {
		action(selectionCallback);
		setSelectedRowIds(rows.map((row) => row.id));
	}, []);

	return (
		<div>
			<SolaceTable
				{...args}
				selectedRowIds={selectedRowIds}
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

export const MultiSelectionTableIndependentRowHighlight = {
	render: MultiSelectionTableIndependentRowHighlightTemplate,

	args: {
		rows: rows,
		columns: columns
	}
};

export const MultiSelectionTableIndependentRowHighlightWithInitialHighlight = {
	render: MultiSelectionTableIndependentRowHighlightTemplate,

	args: {
		rows: rows,
		columns: columns,
		initialHighlightedRowId: rows[0].id
	}
};

export const MultiSelectionTableIndependentRowHighlightInitialHighlightAndSelection = {
	render: MultiSelectionTableIndependentRowHighlightTemplate,

	args: {
		rows: rows,
		columns: columns,
		initialHighlightedRowId: rows[0].id,
		initialSelectedRowIds: [rows[0].id, rows[2].id]
	}
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

// Table template for expandable table
const ExpandableRowTableTemplate = ({
	rows,
	columns,
	selectionType,
	rowActionMenuItems,
	initialExpandedRowIds,
	allowToggle,
	initialSelectedRowIds,
	customContentDefinitions,
	displayedCustomContent,
	enableCustomContents,
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

	const [displayedColumns, setDisplayedColumns] = useState(columnsDef);
	const displayedColumnsChanged = useCallback((columns) => {
		setDisplayedColumns(columns);
	}, []);

	const [expandedRowIds, setExpandedRowIds] = useState<string>(
		Array.isArray(initialExpandedRowIds) ? initialExpandedRowIds : []
	);
	const renderExpandedRowContent = useCallback(
		(row) => renderExpandedRowContentHelper(row, allowToggle, selectionType),
		[selectionType, allowToggle]
	);

	const [selectedRowIds, setSelectedRowIds] = useState<string[]>(initialSelectedRowIds ?? []);
	const [contentTypesShown, setContentTypesShown] = useState<string[]>(displayedCustomContent ?? []);
	const handleRowSelectionsChange = useCallback((rows: SolaceTableRow[]) => {
		action(selectionCallback);
		setSelectedRowIds(rows.map((row) => row.id));
	}, []);

	const customContentDisplayChangeCallback = useCallback(
		(type, isHidden) => {
			const shownContentsArray = [...contentTypesShown];
			if (isHidden) {
				const contentIndex = shownContentsArray.indexOf(type);
				shownContentsArray.splice(contentIndex, 1);
			} else {
				shownContentsArray.push(type);
			}
			setContentTypesShown(shownContentsArray);
		},
		[contentTypesShown]
	);

	return (
		<div>
			<SolaceTable
				{...args}
				selectedRowIds={selectedRowIds}
				selectionChangedCallback={handleRowSelectionsChange}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={selectionType}
				hasColumnHiding={true}
				displayedColumns={displayedColumns}
				displayedColumnsChangedCallback={displayedColumnsChanged}
				customContentDefinitions={customContentDefinitions}
				displayedCustomContent={contentTypesShown}
				customContentDisplayChangeCallback={customContentDisplayChangeCallback}
				expandableRowOptions={
					enableCustomContents
						? contentTypesShown.includes("tags")
							? {
									allowToggle: allowToggle,
									renderChildren: renderExpandedRowContent,
									expandedRowIds: expandedRowIds,
									setExpandedRowIds: setExpandedRowIds
							  }
							: undefined
						: {
								allowToggle: allowToggle,
								renderChildren: renderExpandedRowContent,
								expandedRowIds: expandedRowIds,
								setExpandedRowIds: setExpandedRowIds
						  }
				}
				rowActionMenuItems={rowActionMenuItems ? rowActionMenuItems : undefined}
			></SolaceTable>
			<div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", columnGap: "8px" }}>
				{renderSelectedRowsInfo(selectedRowIds, tableRows)}
			</div>
		</div>
	);
};

export const ExpandableRowSelectionNone = {
	render: ExpandableRowTableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.NONE,
		allowToggle: true
	}
};

export const ExpandableRowSingleSelectionNoToggle = {
	render: ExpandableRowTableTemplate,

	args: {
		rows: rows,
		columns: columns.map((column) => {
			if (column.field === "first_name" || column.field === "email") {
				const col = cloneDeep(column);
				col.disableHiding = true;
				return col;
			}
			return column;
		}),
		selectionType: SolaceTableSelectionType.SINGLE,
		allowToggle: false,
		rowActionMenuItems: rowActionMenuItems
	}
};

export const ExpandableRowMultiSelection = {
	render: ExpandableRowTableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.MULTI,
		allowToggle: true
	}
};

export const ExpandableRowMultiSelectionNoToggle = {
	render: ExpandableRowTableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.MULTI,
		allowToggle: false
	}
};

export const ExpandableRowSelectionNoneInitialExpandedRows = {
	render: ExpandableRowTableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.NONE,
		allowToggle: true,
		initialExpandedRowIds: ["2", "3"]
	}
};

export const ExpandableRowSingleSelectionInitialExpandedRowsAndSelection = {
	render: ExpandableRowTableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.SINGLE,
		allowToggle: true,
		initialExpandedRowIds: ["2", "3"],
		initialSelectedRowIds: ["2", "4"]
	}
};

export const ExpandableRowMultiSelectionInitialExpandedRowsAndSelection = {
	render: ExpandableRowTableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.MULTI,
		allowToggle: true,
		initialExpandedRowIds: ["2", "3"],
		initialSelectedRowIds: ["2", "4"]
	}
};

export const ExpandableRowSingleSectionNoToggleWithCustomContentShowHideOption = {
	render: ExpandableRowTableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.SINGLE,
		allowToggle: false,
		rowActionMenuItems: rowActionMenuItems,
		displayedCustomContent: ["tags"],
		enableCustomContents: true,
		customContentDefinitions: [
			{ type: "tags", label: "Tags" },
			{ type: "detail", label: "Detail" }
		]
	}
};

export const ExpandableRowMultiSelectionNoToggleWithCustomContentShowHideOption = {
	render: ExpandableRowTableTemplate,

	args: {
		rows: rows,
		columns: columns,
		selectionType: SolaceTableSelectionType.MULTI,
		allowToggle: false,
		rowActionMenuItems: rowActionMenuItems,
		displayedCustomContent: ["tags"],
		enableCustomContents: true,
		customContentDefinitions: [
			{ type: "tags", label: "Tags" },
			{ type: "detail", label: "Detail" }
		]
	}
};

// Table template for multiselection expandable table with independent row hightlight
const ExpandableRowMultiSelectionIndependentRowHighlightTemplate = ({
	rows,
	columns,
	rowActionMenuItems,
	initialExpandedRowIds,
	initialHighlightedRowId,
	allowToggle,
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

	const [expandedRowIds, setExpandedRowIds] = useState<string>(
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
	const handleRowSelectionsChange = useCallback((rows: SolaceTableRow[]) => {
		action(selectionCallback);
		setSelectedRowIds(rows.map((row) => row.id));
	}, []);

	return (
		<div>
			<SolaceTable
				{...args}
				selectedRowIds={selectedRowIds}
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

export const ExpandableRowMultiSelectionIndependentRowHighlight = {
	render: ExpandableRowMultiSelectionIndependentRowHighlightTemplate,

	args: {
		rows: rows,
		columns: columns,
		rowActionMenuItems: rowActionMenuItems,
		allowToggle: true
	}
};

export const ExpandableRowMultiSelectionNoToggleIndependentRowHighlight = {
	render: ExpandableRowMultiSelectionIndependentRowHighlightTemplate,

	args: {
		rows: rows,
		columns: columns,
		allowToggle: false
	}
};

export const ExpandableRowMultiSelectionInitialHighlightedRow = {
	render: ExpandableRowMultiSelectionIndependentRowHighlightTemplate,

	args: {
		rows: rows,
		columns: columns,
		allowToggle: true,
		initialHighlightedRowId: "3"
	}
};

export const ExpandableRowMultiSelectionInitialExpandedRowsAndHighlightedRow = {
	render: ExpandableRowMultiSelectionIndependentRowHighlightTemplate,

	args: {
		rows: rows,
		columns: columns,
		allowToggle: true,
		initialExpandedRowIds: ["2", "3"],
		initialHighlightedRowId: "3"
	}
};

export const ExpandableRowMultiSelectionInitialHighlightedRowAndSelection = {
	render: ExpandableRowMultiSelectionIndependentRowHighlightTemplate,

	args: {
		rows: rows,
		columns: columns,
		allowToggle: true,
		initialHighlightedRowId: "3",
		initialSelectedRowIds: ["4"]
	}
};

export const ExpandableRowMultiSelectionInitialExpandedRowsAndHighlightedRowAndSelection = {
	render: ExpandableRowMultiSelectionIndependentRowHighlightTemplate,

	args: {
		rows: rows,
		columns: columns,
		allowToggle: true,
		initialExpandedRowIds: ["2", "3"],
		initialHighlightedRowId: "3",
		initialSelectedRowIds: ["2", "4"]
	}
};

export const CustomMenuActionsTable = (): JSX.Element => {
	const data = cloneDeep(rows);
	const columnsDef = useMemo(() => {
		return cloneDeep(columns);
	}, []);
	const [tableRows, setRows] = useState([...sortData(columnsDef[0], data)]);
	const handleSort = useCallback(
		(selectedColumn) => {
			action(sortCallback);
			setRows([...sortData(selectedColumn, data)]);
		},
		[data]
	);

	const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
	const handleRowSelectionsChange = useCallback((rows: SolaceTableRow[]) => {
		action(selectionCallback);
		setSelectedRowIds(rows.map((row) => row.id));
	}, []);

	const RESULTS_PER_PAGE_OPTIONS = useMemo(() => [10, 20, 50], []);

	const [resultsPerPageState, setResultsPerPageState] = useState(RESULTS_PER_PAGE_OPTIONS[0]);

	const handleResultsPerPageChange = (resultsPerPage) => {
		alert(`Results per page changed to ${resultsPerPage}`);
		setResultsPerPageState(resultsPerPage);
	};

	const renderResultsPerPageOptions = RESULTS_PER_PAGE_OPTIONS.map((resultPerPage) => ({
		name: (
			<SolaceRadio
				checked={resultPerPage === resultsPerPageState}
				onChange={() => handleResultsPerPageChange(resultPerPage)}
				key={`resultsPerPage_${resultPerPage}`}
				name="resultsPerPage"
				value={`${resultPerPage}`}
				label={`${resultPerPage}`}
			/>
		),
		categoryHeading: "Results Per Page"
	}));

	const alertUserMenuOption = {
		name: <div onClick={() => alert("User clicked on the menu option")}>Alert</div>,
		categoryHeading: "Custom Menu Option"
	};

	const customMenuActions = [...renderResultsPerPageOptions, alertUserMenuOption];

	return (
		<SolaceTable
			selectedRowIds={selectedRowIds}
			selectionChangedCallback={handleRowSelectionsChange}
			sortCallback={handleSort}
			rows={tableRows}
			columns={columnsDef}
			selectionType={SolaceTableSelectionType.SINGLE}
			hasColumnHiding={true}
			customMenuActions={customMenuActions}
		/>
	);
};

// ========= Table with interactions for callback method coverage ============
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
		id: "3",
		name: "schema3",
		shared: true,
		version_count: 1,
		schemaType: "xsd",
		contentType: "xml"
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
		id: "4",
		name: "schema4",
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
		// eslint-disable-next-line sonarjs/no-duplicate-string
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

const getColumnHiddenInfo = (columns) => {
	return columns?.reduce((prev, curr) => {
		prev[curr.field] = curr.isHidden;
		return prev;
	}, {});
};

const createSchemaCells = (row, columnsHiddenInfo): JSX.Element[] => {
	const cells: JSX.Element[] = [];
	if (!columnsHiddenInfo?.name) {
		cells.push(<SolaceTableData key={row.id + "_name"}>{row.name}</SolaceTableData>);
	}
	if (!columnsHiddenInfo?.shared) {
		cells.push(
			<SolaceTableData key={row.id + "_shared"}>
				{row.shared ? SharedTypes.shared : SharedTypes.notShared}
			</SolaceTableData>
		);
	}
	if (!columnsHiddenInfo?.version_count) {
		cells.push(<SolaceTableNumberData key={row.id + "_version_count"}>{row.version_count}</SolaceTableNumberData>);
	}
	if (!columnsHiddenInfo?.schemaType) {
		cells.push(
			<SolaceTableData key={row.id + "_schemaType"}>
				{schemaTypeLabel[row.schemaType] ?? row.schemaType}
			</SolaceTableData>
		);
	}
	if (!columnsHiddenInfo?.contentType) {
		cells.push(
			<SolaceTableData key={row.id + "_contentType"}>
				{schemaContentTypeLabel[row.schemaType]?.[row.contentType] ?? row.contentType}
			</SolaceTableData>
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
		paddingLeft = "92px";
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

const InteractiveSchemaTableTemplate = () => {
	const data = cloneDeep(schemaRows);
	const columnsDef = useMemo(() => {
		return cloneDeep(schemaColumns);
	}, []);
	columnsDef[1].width = "10%";
	columnsDef[2].width = "15%";
	const [tableRows, setRows] = useState([...sortData(columnsDef[0], data)]);
	const [columnsHiddenInfo, setColumnsHiddenInfo] = useState(null);

	const handleSort = useCallback(
		(selectedColumn) => {
			action(sortCallback);
			setRows([...sortData(selectedColumn, data)]);
		},
		[data]
	);

	const displayedColumnsChanged = useCallback((columns) => {
		setColumnsHiddenInfo(getColumnHiddenInfo(columns));
	}, []);

	const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
	const handleRowSelectionsChange = useCallback((rows: SolaceTableRow[]) => {
		action(selectionCallback);
		setSelectedRowIds(rows.map((row) => row.id));
	}, []);

	const renderSchemaRowCells = useCallback(
		(row: SolaceTableRow): JSX.Element[] => createSchemaCells(row, columnsHiddenInfo),
		[columnsHiddenInfo]
	);

	return (
		<div>
			<SolaceTable
				selectedRowIds={selectedRowIds}
				selectionChangedCallback={handleRowSelectionsChange}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={SolaceTableSelectionType.SINGLE}
				rowActionMenuItems={rowActionMenuItems}
				renderCustomRowCells={renderSchemaRowCells}
				hasColumnHiding={true}
				displayedColumnsChangedCallback={displayedColumnsChanged}
				headerHoverCallback={action("header hover callback")}
				rowHoverCallback={action("row hover callback")}
			></SolaceTable>
		</div>
	);
};

export const InteractiveSchemaTable = {
	render: InteractiveSchemaTableTemplate,

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		await userEvent.hover(await canvas.findByText("Schema Type"));
		await userEvent.hover(await canvas.findByText("schema2"));

		// no sort action triggererd
		await userEvent.click(await canvas.findByText("# of Versions"));
		// sort by Name in descending order
		await userEvent.click(await canvas.findByText("Name"));
		// sort by different column
		await userEvent.click(await canvas.findByText("Schema Type"));

		// select row
		await selectRow(canvas, "schema1");
		await selectRow(canvas, "schema2");
		await selectRow(canvas, "schema1");

		// hide Shared
		await showHideColumn(canvas, "Shared");
	},

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { delay: 5000 }
	}
};

const ExpandableSchemaTableTemplate = ({ independentRowHighlight }): JSX.Element => {
	const data = cloneDeep(schemaRows);
	const columnsDef = useMemo(() => {
		return cloneDeep(schemaColumns);
	}, []);
	columnsDef[1].width = "10%";
	columnsDef[2].isHidden = true;
	columnsDef[2].width = "15%";
	const columnToSort = columnsDef[3];
	const [sortedColumn, setSortedColumn] = useState(columnToSort);
	const [tableRows, setRows] = useState([...sortData(columnToSort, data)]);
	const [displayedColumns, setDisplayedColumns] = useState(columnsDef);
	const [columnsHiddenInfo, setColumnsHiddenInfo] = useState(getColumnHiddenInfo(columnsDef));
	const [expandedRowIds, setExpandedRowIds] = useState<string[]>([]);
	const handleSort = useCallback(
		(selectedColumn) => {
			setSortedColumn(selectedColumn);
			setRows([...sortData(selectedColumn, data)]);
		},
		[data]
	);

	const selectionType = SolaceTableSelectionType.MULTI;

	const displayedColumnsChanged = useCallback((columns) => {
		setDisplayedColumns(columns);
		setColumnsHiddenInfo(getColumnHiddenInfo(columns));
	}, []);

	const [highlightedRowId, setHighlightedRowId] = useState<string | null>(null);
	const handleRowHighlightChanged = useCallback((row) => {
		action(rowHighlightCallback);
		setHighlightedRowId(row ? row.id : null);
	}, []);

	const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
	const handleRowSelectionsChange = useCallback((rows: SolaceTableRow[]) => {
		action(selectionCallback);
		setSelectedRowIds(rows.map((row) => row.id));
	}, []);

	const renderSchemaRowCells = useCallback(
		(row: SolaceTableRow): JSX.Element[] => createSchemaCells(row, columnsHiddenInfo),
		[columnsHiddenInfo]
	);

	const renderExpandedRowContent = useCallback(
		(row) => renderExpandedSchemaRowContentHelper(row, true, selectionType),
		[selectionType]
	);

	return (
		<div>
			<SolaceTable
				selectedRowIds={selectedRowIds}
				selectionChangedCallback={handleRowSelectionsChange}
				sortedColumn={sortedColumn}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columnsDef}
				selectionType={selectionType}
				independentRowHighlight={independentRowHighlight}
				highlightedRowId={highlightedRowId}
				rowHighlightChangedCallback={handleRowHighlightChanged}
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
			<div style={{ marginTop: "24px" }}>Highlighted Row Id: {highlightedRowId}</div>
			<div style={{ marginTop: "24px" }}>Selected Row Ids: {selectedRowIds.join(", ")}</div>
			<div style={{ marginTop: "24px" }}>Expanded Row Ids: {expandedRowIds.join(", ")}</div>
		</div>
	);
};

const schemaInteractions = async (canvasElement) => {
	// Starts querying the component from it's root element
	const canvas = within(canvasElement);

	// click on Select All
	await selectCheckbox(canvas, null);
	// click on checkbox for each row to deselect
	for (let i = 0; i < schemaRows.length; i++) {
		await selectCheckbox(canvas, schemaRows[i].name);
	}
	// click on checkbox for each row to select
	for (let i = schemaRows.length - 1; i >= 0; i--) {
		await selectCheckbox(canvas, schemaRows[i].name);
	}
	// click on Select All to deselect
	await selectCheckbox(canvas, null);

	// expand/collapse on rows
	for (let i = 0; i < schemaRows.length; i++) {
		await expandRow(canvas, schemaRows[i].name);
	}
	await expandRow(canvas, "schema4");
	await expandRow(canvas, "schema2");

	// click checkbox of a row
	await selectCheckbox(canvas, "schema4");

	// click on a row
	await selectRow(canvas, "schema1");

	// click checkbox of a row
	await selectCheckbox(canvas, "schema3");

	// update sorting of schema type
	await userEvent.click(await canvas.findByText("Schema Type"));

	// change sorting to Name
	await userEvent.click(await canvas.findByText("Name"));

	// hide Shared
	await showHideColumn(canvas, "Shared");
};

export const InteractiveExpandableSchemaTableIndependentRowHighlight = {
	render: ExpandableSchemaTableTemplate,

	args: {
		independentRowHighlight: true
	},

	play: async ({ canvasElement }) => {
		await schemaInteractions(canvasElement);
	},

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { delay: 5000 }
	}
};

export const InteractiveExpandableSchemaTableCoupledRowHighlight = {
	render: ExpandableSchemaTableTemplate,

	args: {
		independentRowHighlight: false
	},

	play: async ({ canvasElement }) => {
		await schemaInteractions(canvasElement);
	},

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { delay: 5000 }
	}
};

// ========= Table with cross page selection behaviour ============
const MultiSelectionTableWithCrossPagesRowSelectionTemplate = ({
	tableData,
	columns,
	independentRowHighlight,
	totalObjectCount,
	initialAllPagesSelectedByDefault = false,
	initialSelectedRowIds,
	expandedRow,
	allowToggle,
	initialExpandedRowIds,
	...args
}): JSX.Element => {
	const data = cloneDeep(tableData);
	const columnsDef = useMemo(() => {
		// disable sorting for hardcoded paged data
		return cloneDeep(columns).map((column) => {
			return {
				...column,
				sortable: false
			};
		});
	}, [columns]);
	const [tableRows, setRows] = useState(data);
	const [expandedRowIds, setExpandedRowIds] = useState<string>(
		Array.isArray(initialExpandedRowIds) ? initialExpandedRowIds : []
	);
	const [selectedRowIds, setSelectedRowIds] = useState<string[]>(initialSelectedRowIds ?? []);
	const [deselectedRowIds, setDeselectedRowIds] = useState<string[]>([]);
	const [allPagesSelectedByDefault, setAllPagesSelectedByDefault] = useState<boolean>(
		initialAllPagesSelectedByDefault ? initialAllPagesSelectedByDefault : false
	);
	// Setting this rule: store selected entities across multiple pages only if allPageSelectedByDefault is false,
	// this is to simulate how audit bulk import would work when allPageSelectedByDefault is false
	const [selectedEntities, setSelectedEntities] = useState<SolaceTableRow[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);

	const handleSort = useCallback(
		(selectedColumn) => {
			action(sortCallback);
			setRows([...sortData(selectedColumn, data)]);
		},
		[data]
	);

	const handleCrossPageRowSelectionsChange = useCallback(
		(
			selectedRowsInCurrentPage: SolaceTableRow[],
			allPagesSelectedByDefault: boolean,
			selectedRowIdsInVisitedPages: string[],
			deselectedRowIdsInVisitedPages: string[]
		) => {
			action(crossPageSelectionCallback);

			const selectedEntitiesMap = selectedEntities.reduce((prev, curr) => {
				prev[curr.id] = curr;
				return prev;
			}, {});
			const newEntitiesMap = selectedRowsInCurrentPage.reduce((prev, curr) => {
				prev[curr.id] = curr;
				return prev;
			}, {});
			const newSelectedEntities: SolaceTableRow[] = [];

			selectedEntities.forEach((entity) => {
				if (selectedRowIdsInVisitedPages.includes(entity.id)) {
					newSelectedEntities.push(newEntitiesMap[entity.id] ?? selectedEntitiesMap[entity.id]);
				}
			});
			selectedRowsInCurrentPage.forEach((entity) => {
				if (!selectedEntitiesMap[entity.id]) {
					newSelectedEntities.push(entity);
				}
			});

			setSelectedEntities(newSelectedEntities);

			setAllPagesSelectedByDefault(allPagesSelectedByDefault);
			setSelectedRowIds(selectedRowIdsInVisitedPages);
			setDeselectedRowIds(deselectedRowIdsInVisitedPages);
		},
		[selectedEntities]
	);

	const handlePageSelection = useCallback((pageNumber) => {
		if (pageNumber === 1) {
			setRows(rows);
		} else if (pageNumber === 2) {
			setRows(rowsPage2);
		} else {
			setRows(rowsPage3);
		}
		setPageNumber(pageNumber);
	}, []);

	const [highlightedRowId, setHighlightedRowId] = useState<string | null>(null);
	const handleRowHighlightChanged = useCallback((row) => {
		action(rowHighlightCallback);
		setHighlightedRowId(row ? row.id : null);
	}, []);

	const renderExpandedRowContent = useCallback(
		(row) => renderExpandedRowContentHelper(row, allowToggle, SolaceTableSelectionType.MULTI),
		[allowToggle]
	);

	return (
		<div>
			<PaginationContainer>
				<TableWrapper>
					<SolaceTable
						{...args}
						selectedRowIds={selectedRowIds}
						rows={tableRows}
						columns={columnsDef}
						selectionType={SolaceTableSelectionType.MULTI}
						sortCallback={handleSort}
						independentRowHighlight={independentRowHighlight}
						rowHighlightChangedCallback={handleRowHighlightChanged}
						highlightedRowId={highlightedRowId}
						crossPageRowSelectionSupported={true}
						totalObjectCount={totalObjectCount}
						deselectedRowIds={deselectedRowIds}
						allPagesSelectedByDefault={allPagesSelectedByDefault}
						crossPageSelectionChangedCallback={handleCrossPageRowSelectionsChange}
						expandableRowOptions={
							expandedRow
								? {
										allowToggle: true,
										renderChildren: renderExpandedRowContent,
										expandedRowIds: expandedRowIds,
										setExpandedRowIds: setExpandedRowIds
								  }
								: undefined
						}
					></SolaceTable>
				</TableWrapper>
				<VerticalPadding>
					{totalObjectCount > 0 && (
						<SolacePagination
							activePage={pageNumber}
							totalResults={totalObjectCount}
							loading={false}
							onPageSelection={handlePageSelection}
						/>
					)}
				</VerticalPadding>
			</PaginationContainer>
			<div style={{ marginTop: "24px", display: "flex", flexDirection: "column", rowGap: "8px" }}>
				<div style={{ display: "flex", columnGap: "32px" }}>
					<div>All Pages Selected By Default: {allPagesSelectedByDefault ? "Yes" : "No"}</div>
					<div>Total Object Count: {totalObjectCount}</div>
				</div>
				<div>Selected IDs from Visited Pages: {JSON.stringify(selectedRowIds)}</div>
				<div>Deselected IDs from Visited Pages: {JSON.stringify(deselectedRowIds)}</div>
				<div>
					Selected Entities from Visited Pages: {JSON.stringify(selectedEntities?.map((entity) => entity.email))}
				</div>
			</div>
		</div>
	);
};

export const MultiSelectionTableWithCrossPagesRowSelectionAndIndependentRowHighlight = {
	render: MultiSelectionTableWithCrossPagesRowSelectionTemplate,

	args: {
		tableData: rows,
		columns: columns,
		independentRowHighlight: true,
		totalObjectCount: threePagesOfRows.length
	}
};

export const MultiSelectionTableWithCrossPagesRowSelectionAndCoupledRowHightlight = {
	render: MultiSelectionTableWithCrossPagesRowSelectionTemplate,

	args: {
		tableData: rows,
		columns: columns,
		independentRowHighlight: false,
		totalObjectCount: threePagesOfRows.length
	}
};

export const MultiSelectionTableWithCrossPagesRowSelectionAndExpandedRow = {
	render: MultiSelectionTableWithCrossPagesRowSelectionTemplate,

	args: {
		tableData: rows,
		columns: columns,
		independentRowHighlight: true,
		totalObjectCount: threePagesOfRows.length,
		expandedRow: true,
		allowToggle: true,
		initialExpandedRowIds: ["6", "12"]
	}
};

export const MultiSelectionTableWithCrossPagesRowSelectionNotInPageInDefaultIfAllRowsSelectedManually = {
	render: MultiSelectionTableWithCrossPagesRowSelectionTemplate,

	args: {
		tableData: rows,
		columns: columns,
		independentRowHighlight: true,
		totalObjectCount: threePagesOfRows.length,
		initialSelectedRowIds: threePagesOfRows.map((row) => row.id)
	}
};

export const MultiSelectionTableWithCrossPagesRowSelectionInitAllPagesSelectedByDefault = {
	render: MultiSelectionTableWithCrossPagesRowSelectionTemplate,

	args: {
		tableData: rows,
		columns: columns,
		independentRowHighlight: true,
		totalObjectCount: threePagesOfRows.length,
		initialAllPagesSelectedByDefault: true
	}
};

export const InteractiveMultiSelectionTableWithCrossPagesRowSelectionAndEmptyTable = {
	render: MultiSelectionTableWithCrossPagesRowSelectionTemplate,

	args: {
		tableData: [],
		columns: columns,
		independentRowHighlight: true,
		totalObjectCount: 0
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		// click on Select All
		await selectCheckbox(canvas, null);
		// click on Select All again
		await selectCheckbox(canvas, null);
	},

	parameters: {
		// Delay snapshot 1 seconds until all interactions are done
		chromatic: { delay: 1000 }
	}
};

export const InteractiveMultiSelectionTableWithCrossPagesRowSelectionAndOneRow = {
	render: MultiSelectionTableWithCrossPagesRowSelectionTemplate,

	args: {
		tableData: rows.slice(0, 1),
		columns: columns,
		independentRowHighlight: true,
		totalObjectCount: 1
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		// click on Select All
		await selectCheckbox(canvas, null);
		// uncheck first row to exit select all mode
		await selectCheckbox(canvas, rows[0].email);
	},

	parameters: {
		// Delay snapshot 1 seconds until all interactions are done
		chromatic: { delay: 1000 }
	}
};

const pagedTableInteractions = async (canvasElement) => {
	// Starts querying the component from it's root element
	const canvas = within(canvasElement);

	// click on Select All
	await selectCheckbox(canvas, null);
	// click on checkbox for each row in page 1 to deselect
	for (let i = 0; i < rows.length; i++) {
		await selectCheckbox(canvas, rows[i].email);
	}
	// click on checkbox for each row to select
	for (let i = rows.length - 1; i >= 0; i--) {
		await selectCheckbox(canvas, rows[i].email);
	}
	// click on Select All to deselect all
	await selectCheckbox(canvas, null);

	// expand/collapse on rows
	await expandRow(canvas, rows[3].email);
	await expandRow(canvas, rows[1].email);

	// click checkbox of a row
	await selectCheckbox(canvas, rows[3].email);

	// click on a row
	await selectRow(canvas, rows[1].email);

	// click checkbox of a row
	await selectCheckbox(canvas, rows[2].email);

	// go to page 2
	await goToPage(canvas, "2");
	// click on Select All to deselect all
	await selectCheckbox(canvas, null);
	// click on Select All to select all
	await selectCheckbox(canvas, null);
	// deselect row 1 and 2
	await selectCheckbox(canvas, rowsPage2[0].email);
	await selectCheckbox(canvas, rowsPage2[1].email);
	// expand row 5
	await expandRow(canvas, rows[4].email);

	// go to page 1
	await goToPage(canvas, "1");
	// click on checkbox for each row in page 1 to deselect
	for (let i = 0; i < rows.length; i++) {
		await selectCheckbox(canvas, rows[i].email);
	}

	// go to page 2
	await goToPage(canvas, "2");
	// deselect 2 to 9
	for (let i = 2; i < rowsPage2.length; i++) {
		await selectCheckbox(canvas, rowsPage2[i].email);
	}

	// go to page 3
	await goToPage(canvas, "3");
	// deselect all rows
	for (let i = 0; i < rowsPage3.length; i++) {
		await selectCheckbox(canvas, rowsPage3[i].email);
	}

	// select all should be unchecked
};

export const InteractiveMultiSelectionTableWithCrossPagesRowSelectionAndExpandedRow = {
	render: MultiSelectionTableWithCrossPagesRowSelectionTemplate,

	args: {
		tableData: rows,
		columns: columns,
		independentRowHighlight: true,
		totalObjectCount: threePagesOfRows.length,
		expandedRow: true,
		allowToggle: true
	},

	play: async ({ canvasElement }) => {
		await pagedTableInteractions(canvasElement);
	},

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { delay: 5000 }
	}
};
