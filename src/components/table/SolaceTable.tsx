import React from "react";
import { useSolaceTable, CustomTableRowProps, CustomTableColumnProps } from "./useSolaceTable";
import { styled } from "@material-ui/core";
import SolaceComponentProps from "../SolaceComponentProps";
import { BASE_COLORS } from "./../../resources/colorPallette";

interface TablePropType extends SolaceComponentProps {
	/**
	 * Unique identifier for the button
	 */
	id?: string;
	/**
	 * Array of items to be displayed
	 */
	rows: Record<string, unknown>[];
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
	 * Selected column. If not passed in, will default to the first column
	 */
	selectedColumn?: TableColumn;
	/**
	 * Zero state message
	 */
	zeroStateMessage?: string;
	/**
	 * Renders a custom zero state message
	 */
	renderCustomZeroState?: () => React.ReactNode;
	/**
	 * Selection changed callback
	 */
	selectionChangedCallback: (row: Record<string, unknown>[]) => void;
	/**
	 * Sort callback
	 */
	sortCallback: (column: TableColumn) => void;
	/**
	 * Renders a custom row. Has two parts: renderRow is to render the row itself, and render children for creating the children
	 */
	renderCustomRow?: () => {
		renderRow: (customRowProps: CustomTableRowProps) => React.ReactNode;
		renderChildren: (row: Record<string, unknown>) => React.ReactNode;
	};
	/**
	 * Renders custom columns
	 */
	renderCustomColumn?: (customTableColumnProps: CustomTableColumnProps) => React.ReactNode;
	/**
	 * Header hover callback
	 */
	headerHoverCallback?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	/**
	 * Row hover callback
	 */
	rowHoverCallback?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export interface TableColumn {
	field: string;
	headerName: string;
	class?: string;
	width?: number;
	sortable: boolean;
	sortDirection?: SORT_DIRECTION;
	disableToggling: boolean;
	resizable?: boolean;
}

export enum SELECTION_TYPE {
	SINGLE = "single",
	MULTI = "multi",
	NONE = "none"
}

export enum SORT_DIRECTION {
	ASC = "asc",
	DCS = "desc"
}

const TableWrapper = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	borderRadius: theme.shape.borderRadius,
	border: `1px solid ${BASE_COLORS.greys.grey0}`,
	width: "100%",
	height: "100%",
	minHeight: "200px",
	maxHeight: "100%",
	overflow: "auto",
	fontFamily: theme.typography.fontFamily,
	fontSize: theme.typography.body1.fontSize
}));

const StyledTable = styled("table")(() => ({
	borderCollapse: "collapse",
	width: "100%"
}));

const ZeroState = styled("div")(() => ({
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
	selectedColumn,
	sortCallback,
	renderCustomRow,
	zeroStateMessage,
	renderCustomZeroState,
	renderCustomColumn
}: TablePropType): JSX.Element {
	const [columnNodes, rowNodes] = useSolaceTable(
		rows,
		columns,
		selectionType,
		selectionChangedCallback,
		sortCallback,
		selectedColumn,
		renderCustomRow,
		renderCustomColumn
	);

	function showZeroStateMessage(): React.ReactNode {
		if (renderCustomZeroState) {
			return <ZeroState>{renderCustomZeroState()}</ZeroState>;
		} else {
			return <ZeroState>{zeroStateMessage ? zeroStateMessage : DEFAULT_EMPTY_MESSAGE}</ZeroState>;
		}
	}

	return (
		<TableWrapper>
			<StyledTable>
				<thead>{columnNodes}</thead>
				<tbody>{!!rows.length && rowNodes}</tbody>
			</StyledTable>
			{!rows.length && showZeroStateMessage()}
		</TableWrapper>
	);
}

export default SolaceTable;
