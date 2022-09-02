import { useSolaceTable } from "./hooks/useSolaceTable";
import { styled } from "@mui/material";
import SolaceComponentProps from "../SolaceComponentProps";
import { SELECTION_TYPE, TableColumn, TableRow, TableActionMenuItem } from "./table-utils";

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
	 * Selection changed callback
	 */
	selectionChangedCallback: (row: TableRow[]) => void;
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
	width: "100%",
	height: "100%",
	minHeight: "200px",
	maxHeight: "100%",
	overflow: "auto",
	fontFamily: theme.typography.fontFamily,
	fontSize: theme.typography.body1.fontSize,
	background: theme.palette.ux.background.w10
}));

const StyledTable = styled("table")(() => ({
	borderCollapse: "collapse",
	width: "100%",
	tableLayout: "fixed"
}));

const EmptyState = styled("div")(() => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flex: "1"
}));

const DEFAULT_EMPTY_MESSAGE = "No Items Found";

function SolaceTable({
	id,
	rows,
	columns,
	selectionType,
	selectionChangedCallback,
	sortedColumn,
	sortCallback,
	renderCustomRowCells,
	emptyStateMessage,
	renderCustomEmptyState,
	rowActionMenuItems,
	renderCustomRowActionItem,
	headerHoverCallback,
	rowHoverCallback,
	hasColumnHiding,
	displayedColumns,
	displayedColumnsChangedCallback,
	expandableRowOptions
}: TablePropType): JSX.Element {
	const [columnNodes, rowNodes] = useSolaceTable({
		rows,
		columns,
		selectionType,
		selectionChangedCallback,
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
		expandableRowOptions
	});

	function showEmptyStateMessage(): React.ReactNode {
		if (renderCustomEmptyState) {
			return <EmptyState>{renderCustomEmptyState()}</EmptyState>;
		} else {
			return <EmptyState>{emptyStateMessage ? emptyStateMessage : DEFAULT_EMPTY_MESSAGE}</EmptyState>;
		}
	}

	return (
		<TableWrapper>
			<StyledTable data-qa={id}>
				<thead>{columnNodes}</thead>
				<tbody>{!!rows.length && rowNodes}</tbody>
			</StyledTable>
			{!rows.length && showEmptyStateMessage()}
		</TableWrapper>
	);
}

export default SolaceTable;
