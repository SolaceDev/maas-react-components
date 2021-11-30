import { useSolaceTable, CustomTableRowProps, CustomTableColumnProps } from "./hooks/useSolaceTable";
import { styled } from "@material-ui/core";
import SolaceComponentProps from "../SolaceComponentProps";
import { SELECTION_TYPE, TableColumn, TableRow, TableActionMenuItem } from "./table-utils";
import { BASE_COLORS } from "./../../resources/colorPallette";

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
	 * Function that is called on displayed columns change
	 */
	displayedColumnsChangedCallback?: (displayedColumns: TableColumn[]) => void;
	/**
	 * has row action menu items
	 */
	rowActionMenuItems?: TableActionMenuItem[];
	/**
	 * Selected column. If not passed in, will default to the first column
	 */
	sortedColumn?: TableColumn | undefined;
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
	 * Sort callback
	 */
	sortCallback: (column: TableColumn | undefined) => void;
	/**
	 * Renders a custom row. Has two parts: renderRow is to render the row itself, and render children for creating the children
	 */
	renderCustomRow?: () => {
		renderRow: (customRowProps: CustomTableRowProps) => React.ReactNode;
		renderChildren: (row: TableRow) => React.ReactNode;
	};
	/**
	 *
	 */
	renderCustomRowCells?: (row: TableRow) => JSX.Element[];
	/**
	 * Renders a custom header
	 */
	renderCustomHeader?: (customTableColumnProps: CustomTableColumnProps) => React.ReactNode;
	/**
	 * Header hover callback
	 */
	headerHoverCallback?: () => void;
	/**
	 * Row hover callback
	 */
	rowHoverCallback?: (row: TableRow) => void;
}

const TableWrapper = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	border: `1px solid ${BASE_COLORS.greys.grey2}`,
	width: "100%",
	height: "100%",
	minHeight: "200px",
	maxHeight: "100%",
	overflow: "auto",
	fontFamily: theme.typography.fontFamily,
	fontSize: theme.typography.body1.fontSize,
	background: "white"
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
	rows,
	columns,
	selectionType,
	selectionChangedCallback,
	sortedColumn,
	sortCallback,
	renderCustomRow,
	renderCustomRowCells,
	emptyStateMessage,
	renderCustomEmptyState,
	renderCustomHeader,
	rowActionMenuItems,
	headerHoverCallback,
	rowHoverCallback,
	hasColumnHiding,
	displayedColumnsChangedCallback
}: TablePropType): JSX.Element {
	const [columnNodes, rowNodes] = useSolaceTable(
		rows,
		columns,
		selectionType,
		selectionChangedCallback,
		sortCallback,
		sortedColumn,
		renderCustomRow,
		renderCustomRowCells,
		renderCustomHeader,
		rowActionMenuItems,
		headerHoverCallback,
		rowHoverCallback,
		hasColumnHiding,
		displayedColumnsChangedCallback
	);

	function showEmptyStateMessage(): React.ReactNode {
		if (renderCustomEmptyState) {
			return <EmptyState>{renderCustomEmptyState()}</EmptyState>;
		} else {
			return <EmptyState>{emptyStateMessage ? emptyStateMessage : DEFAULT_EMPTY_MESSAGE}</EmptyState>;
		}
	}

	return (
		<TableWrapper>
			<StyledTable>
				<thead>{columnNodes}</thead>
				<tbody>{!!rows.length && rowNodes}</tbody>
			</StyledTable>
			{!rows.length && showEmptyStateMessage()}
		</TableWrapper>
	);
}

export default SolaceTable;
