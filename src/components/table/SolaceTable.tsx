import React from "react";
import { useSolaceTable } from "./useSolaceTable";
import { styled } from "@material-ui/core";
import SolaceComponentProps from "../SolaceComponentProps";

interface TablePropType extends SolaceComponentProps {
	rows: Record<string, unknown>[];
	columns: TableColumn[];
	selectionType: SELECTION_TYPE;
	hasColumnHiding?: boolean;
	selectedColumn?: TableColumn;
	zeroStateMessage?: string;
	selectionChangedCallback: (row: Record<string, unknown>[]) => void;
	sortCallback: (column: TableColumn) => void;
	renderCustomRow?: () => React.ReactNode;
	renderCustomColumn?: () => React.ReactNode;
	headerHoverCallback?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	rowHoverCallback?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	renderCustomZeroState?: () => React.ReactNode;
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

const StyledTable = styled("table")(() => ({
	borderCollapse: "collapse",
	borderRadius: "2px",
	border: "1px solid rgba(0, 0, 0, 0.2)",
	width: "100%"
}));

function SolaceTable({
	rows,
	columns,
	selectionType,
	selectionChangedCallback,
	selectedColumn,
	sortCallback
}: TablePropType): JSX.Element {
	const [columnNodes, rowNodes] = useSolaceTable(
		rows,
		columns,
		selectionType,
		selectionChangedCallback,
		sortCallback,
		selectedColumn
	);

	return (
		<StyledTable>
			<thead>{columnNodes}</thead>
			<tbody>{rowNodes}</tbody>
		</StyledTable>
	);
}

export default SolaceTable;
