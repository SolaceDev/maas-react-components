import { useSolaceTable } from "./hooks/useSolaceTable";
import { styled } from "@mui/material";
import SolaceComponentProps from "../SolaceComponentProps";
import { SELECTION_TYPE, TableColumn, TableRow, TableActionMenuItem, CustomContentDefinition } from "./table-utils";
import SolaceCircularProgress from "../SolaceCircularProgress";

interface TablePropType extends SolaceComponentProps {
	/**
	 * Unique identifier for the button
	 */
	id?: string;
	/**
	 * Array of items to be displayed
	 */
	rows: TableRow[];
	/**
	 * Array of columns to be rendered
	 */
	columns: TableColumn[];
	/**
	 * Selection Type enum: NONE, SINGLE, MULTI
	 */
	selectionType: SELECTION_TYPE;
	/**
	 * Whether to use controlled state for row selection, default is false
	 * Introduced this flag to maintain backward compatiblity. Once all usage of SolaceTable uses controlled selection state, this flag will be removed.
	 */
	controlledSelectedRowsState?: boolean;
	/**
	 * Controlled state for rows to be selected
	 */
	selectedRowIds?: string[] | null;
	/**
	 * If selection type is MULTI and independentRowHighlight is true, table row highlight is handled via row click only,
	 * not affected by checkbox selection, default is false
	 */
	independentRowHighlight?: boolean;
	/**
	 * Controlled state for a row to be highlighted
	 */
	highlightedRowId?: string | null;
	/**
	 * Enables columns hiding
	 */
	hasColumnHiding?: boolean;
	/**
	 * Controlled state for columns show and hide information
	 */
	displayedColumns?: TableColumn[];
	/**
	 * Function that is called when displayed columns change is requested
	 */
	displayedColumnsChangedCallback?: (displayedColumns: TableColumn[]) => void;
	/**
	 * Custom content definition to identify the attributes
	 */
	customContentDefinitions?: CustomContentDefinition[];
	/**
	 * Function that is called when custom content disply change is requested
	 */
	customContentDisplayChangeCallback?: (type: string, isHidden: boolean) => void;
	/**
	 * Controlled state for custom content to be displayed
	 */
	displayedCustomContent?: string[];
	/**
	 * Action menu items that apply to all rows
	 */
	rowActionMenuItems?: TableActionMenuItem[];
	/**
	 * Controlled state for sorted column.
	 */
	sortedColumn?: TableColumn | undefined;
	/**
	 * Sort callback when sorted column change is requested
	 */
	sortCallback: (column: TableColumn | undefined) => void;
	/**
	 * Empty state message
	 */
	emptyStateMessage?: string;
	/**
	 * Renders a custom empty state message
	 */
	renderCustomEmptyState?: () => React.ReactNode;
	/**
	 * Show emptyStateMessage or cunstomEmptyState when set to true
	 */
	showEmptyState?: boolean;
	/**
	 * Selection changed callback
	 */
	selectionChangedCallback?: (rows: TableRow[]) => void;
	/**
	 * Row highlight changed callback, applicable when selection type is MULTI and independentRowHighlight is true
	 */
	rowHighlightChangedCallback?: (row: TableRow | null) => void;
	/**
	 * Renders a custom row without predefined columns, such as checkbox column, expand/collapse column
	 */
	renderCustomRowCells?: (row: TableRow) => JSX.Element[];
	/**
	 * Renders action items for a row. If set at the same time as rowActionMenuItems, this callback takes precedence.
	 */
	renderCustomRowActionItem?: (row: TableRow) => TableActionMenuItem[];
	/**
	 * Header hover callback
	 */
	headerHoverCallback?: () => void;
	/**
	 * Row hover callback
	 */
	rowHoverCallback?: (row: TableRow) => void;
	/**
	 * If option is set, the table row is expandable.
	 */
	expandableRowOptions?: ExpandableRowOptions;
	/**
	 * loading state
	 */
	loading?: boolean;
	/**
	 * loading state messaging
	 */
	loadingMessage?: string;
}

export interface ExpandableRowOptions {
	/**
	 * Show expand/collapse icon
	 */
	allowToggle: boolean;
	/**
	 * Whether clicking on children will select the parent row, default is true
	 */
	selectRowWhenClickOnChildren?: boolean;
	/**
	 * Renders expanded content
	 */
	renderChildren: (row: TableRow) => React.ReactNode;
	/**
	 * Expanded row ids
	 */
	expandedRowIds: string[];
	/**
	 * Set expanded row ids
	 */
	setExpandedRowIds: (rowIds: string[]) => void;
}

const TableWrapper = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	color: theme.palette.ux.primary.text.wMain,
	border: `1px solid ${theme.palette.ux.secondary.w40}`,
	borderRadius: "4px",
	width: "100%",
	height: "100%",
	minHeight: "200px",
	maxHeight: "100%",
	overflow: "auto",
	fontFamily: theme.typography.fontFamily,
	fontSize: theme.typography.body1.fontSize,
	background: theme.palette.ux.background.w10,
	position: "relative" // to allow loading indicators to position relatively
}));

const StyledTable = styled("table")(() => ({
	borderCollapse: "collapse",
	width: "100%",
	tableLayout: "fixed"
}));

const EmptyState = styled("div")(() => ({
	position: "relative", // to allow loading overlay to position relatively
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flex: "1"
}));

/**
 * styled loading overlays & loading indicators
 */
const TableHeaderLoadingOverlay = styled("tr")(() => ({
	position: "absolute",
	width: "100%",
	height: "100%",
	top: 0,
	left: 0,
	backgroundColor: "rgba(255, 255, 255, 0.45)", // temp decision on the color by uiux, not available from theme, will update once finalized
	zIndex: 20
}));

// as HTML doesn't allow <div> or <span> to be directly wrapped inside <tbody>
// <tr> is required to construct the overlay for tbody
const TableBodyLoadingOverlay = styled("tr")(({ theme }) => ({
	position: "absolute",
	width: "100%",
	height: "100%",
	top: 0,
	left: 0,
	backgroundColor: theme.palette.ux.deprecated.primary.text.w10,
	zIndex: 2
}));

// eslint-disable-next-line  sonarjs/no-identical-functions
const EmptyStateLoadingOverlay = styled("div")(({ theme }) => ({
	position: "absolute",
	width: "100%",
	height: "100%",
	top: 0,
	left: 0,
	backgroundColor: theme.palette.ux.deprecated.primary.text.w10,
	zIndex: 2
}));

const LoadingIndicatorWrapper = styled("div")(({ theme }) => ({
	position: "absolute",
	width: "100%",
	// To allow vertically center the loading indicators inside the table body (e.g. table body + empty state)
	height: "calc(100% - 56px)", // table height (e.g. header + body + empty state) - header height
	top: 56, // height of the header
	left: 0,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	rowGap: theme.spacing(2),
	zIndex: 3
}));

const LoadingMessage = styled("div")(({ theme }) => ({
	fontSize: theme.typography.body1.fontSize,
	fontWeight: theme.typography.fontWeightRegular,
	color: theme.palette.text.primary
}));

const DEFAULT_EMPTY_MESSAGE = "No Items Found";

function SolaceTable({
	id,
	rows,
	columns,
	selectionType,
	controlledSelectedRowsState = false,
	selectedRowIds,
	selectionChangedCallback,
	independentRowHighlight = false,
	highlightedRowId,
	rowHighlightChangedCallback,
	sortedColumn,
	sortCallback,
	renderCustomRowCells,
	emptyStateMessage,
	renderCustomEmptyState,
	showEmptyState,
	rowActionMenuItems,
	renderCustomRowActionItem,
	headerHoverCallback,
	rowHoverCallback,
	hasColumnHiding,
	displayedColumns,
	displayedColumnsChangedCallback,
	expandableRowOptions,
	loading,
	loadingMessage,
	customContentDefinitions,
	displayedCustomContent,
	customContentDisplayChangeCallback
}: TablePropType): JSX.Element {
	// sanitize selectedRowIds
	let selectedIds = selectedRowIds ? selectedRowIds : [];
	if (selectionType === SELECTION_TYPE.SINGLE && selectedIds.length > 1) {
		selectedIds = selectedIds.slice(0, 1);
	}

	const [columnNodes, rowNodes] = useSolaceTable({
		rows,
		columns,
		selectionType,
		controlledSelectedRowsState,
		selectedRowIds: selectedIds,
		selectionChangedCallback,
		independentRowHighlight,
		highlightedRowId,
		rowHighlightChangedCallback,
		sortCallback,
		sortedColumn,
		renderCustomRowCells,
		rowActionMenuItems,
		renderCustomRowActionItem,
		headerHoverCallback,
		rowHoverCallback,
		hasColumnHiding,
		displayedColumns,
		displayedColumnsChangedCallback,
		expandableRowOptions,
		customContentDefinitions,
		displayedCustomContent,
		customContentDisplayChangeCallback
	});

	function renderEmptyStateMessage(): string {
		return emptyStateMessage ? emptyStateMessage : DEFAULT_EMPTY_MESSAGE;
	}

	function showEmptyStateMessage(): React.ReactNode {
		return <>{renderCustomEmptyState ? renderCustomEmptyState() : renderEmptyStateMessage()}</>;
	}

	function showLoadingIndicators(): React.ReactNode {
		return (
			<LoadingIndicatorWrapper>
				<SolaceCircularProgress />
				{loadingMessage && <LoadingMessage>{loadingMessage}</LoadingMessage>}
			</LoadingIndicatorWrapper>
		);
	}

	return (
		<TableWrapper className="tableWrapper">
			<StyledTable data-qa={id}>
				{/* The border style of thead is set in table-utils on th with boxShadow */}
				<thead style={{ borderBottom: 0, position: "relative" }}>
					{columnNodes}
					{loading && <TableHeaderLoadingOverlay />}
				</thead>
				<tbody style={{ position: "relative" }}>
					{!!rows.length && rowNodes}
					{loading && <TableBodyLoadingOverlay />}
				</tbody>
			</StyledTable>
			<EmptyState>
				{showEmptyState !== false && !rows.length && showEmptyStateMessage()}
				{loading && <EmptyStateLoadingOverlay />}
			</EmptyState>
			{loading && showLoadingIndicators()}
		</TableWrapper>
	);
}

export default SolaceTable;
