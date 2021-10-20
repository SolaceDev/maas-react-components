import React, { useState, useCallback } from "react";
import { action } from "@storybook/addon-actions";
import { ComponentMeta } from "@storybook/react";
import { SolaceTable } from "@SolaceDev/maas-react-components";
import { SELECTION_TYPE, SORT_DIRECTION, TableColumn } from "../../../../src/components/table/table-utils";
import { useExpandableRows } from "../../../../src/components/table/hooks/useExpandableRows";
import { styled } from "@material-ui/core";

const StyledCustomRow = styled("tr")(() => ({
	"&:hover": {
		background: "#e5e5e5"
	},
	"&.selected": {
		backgroundColor: "#e8f9f4"
	}
}));

const rows = [
	{
		id: "1",
		first_name: "Fern",
		last_name: "Vanstone",
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

const sortData = (selectedColumn: TableColumn) => {
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

export const DefaultTable = (): JSX.Element => {
	const [tableRows, setRows] = useState([...sortData(columns[0])]);

	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn)]);
	}, []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action("selection callback")}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columns}
				selectionType={SELECTION_TYPE.MULTI}
			></SolaceTable>
		</div>
	);
};

export const SingleSelectionTable = (): JSX.Element => {
	const [tableRows, setRows] = useState([...sortData(columns[0])]);
	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn)]);
	}, []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action("selection callback")}
				sortCallback={handleSort}
				rows={tableRows}
				columns={columns}
				selectionType={SELECTION_TYPE.SINGLE}
			></SolaceTable>
		</div>
	);
};

export const CustomRowTable = (): JSX.Element => {
	const [tableRows, setRows] = useState([...sortData(columns[0])]);
	const [displayedColumnsCount, setDisplayedColumnsCount] = useState<number>();
	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn)]);
	}, []);
	const hasColumnHiding = true;
	const selectionType = SELECTION_TYPE.MULTI;

	const renderExpandableRowChildren = useCallback(
		(row) => {
			return (
				<StyledCustomRow className={row.rowSelected ? "selected" : ""}>
					<td colSpan={displayedColumnsCount}>
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
					</td>
				</StyledCustomRow>
			);
		},
		[displayedColumnsCount]
	);

	const renderCustomExpandableRows = useCallback(() => {
		return {
			renderRow: useExpandableRows,
			renderChildren: renderExpandableRowChildren
		};
	}, [renderExpandableRowChildren]);

	const displayedColumnsChanged = useCallback((columns) => {
		let numberOfDisplayedDataCols = 0;
		columns.forEach((col) => {
			if (!col.isHidden) {
				numberOfDisplayedDataCols++;
			}
		});
		let numberOfNonDataCols = 0;

		if (hasColumnHiding) numberOfNonDataCols++;
		if (selectionType === SELECTION_TYPE.MULTI) numberOfNonDataCols++;
		setDisplayedColumnsCount(numberOfDisplayedDataCols + numberOfNonDataCols);
	}, []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action("selection callback")}
				sortCallback={handleSort}
				rows={tableRows}
				columns={[
					{
						field: "chevron",
						headerName: "",
						sortable: false,
						disableHiding: true,
						hasNoCell: true
					},
					...columns
				]}
				selectionType={SELECTION_TYPE.MULTI}
				renderCustomRow={renderCustomExpandableRows}
				hasColumnHiding={hasColumnHiding}
				displayedColumnsChangedCallback={displayedColumnsChanged}
			></SolaceTable>
		</div>
	);
};

export const EmptyStateTable = (): JSX.Element => {
	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action("selection callback")}
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
				selectionChangedCallback={action("selection callback")}
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
	const [tableRows, setRows] = useState([...sortData(columns[0])]);

	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn)]);
	}, []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action("selection callback")}
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
	const [tableRows, setRows] = useState([...sortData(columns[0])]);

	const handleSort = useCallback((selectedColumn) => {
		setRows([...sortData(selectedColumn)]);
	}, []);

	return (
		<div>
			<SolaceTable
				selectionChangedCallback={action("selection callback")}
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
