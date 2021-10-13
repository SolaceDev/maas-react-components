import React from "react";
import { useSolaceTable, CustomTableRowProps, CustomTableColumnProps } from "./useSolaceTable";
import { styled } from "@material-ui/core";
import SolaceComponentProps from "../SolaceComponentProps";

interface TablePropType extends SolaceComponentProps {
	rows: Record<string, unknown>[];
	columns: TableColumn[];
	selectionType: SELECTION_TYPE;
	hasColumnHiding?: boolean;
	selectedColumn?: TableColumn;
	zeroStateMessage?: string;
	renderCustomZeroState?: () => React.ReactNode;
	selectionChangedCallback: (row: Record<string, unknown>[]) => void;
	sortCallback: (column: TableColumn) => void;
	renderCustomRow?: () => {
		renderRow: (customRowProps: CustomTableRowProps) => React.ReactNode;
		renderChildren: (row: Record<string, unknown>) => React.ReactNode;
	};
	renderCustomColumn?: (customTableColumnProps: CustomTableColumnProps) => React.ReactNode;
	headerHoverCallback?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
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

const TableWrapper = styled("div")(() => ({
	display: "flex",
	flexDirection: "column",
	borderRadius: "2px",
	border: "1px solid rgba(0, 0, 0, 0.05)",
	width: "100%",
	height: "100%",
	minHeight: "200px",
	maxHeight: "100%",
	overflow: "auto"
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
