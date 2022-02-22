import { useState } from "react";
import { TableColumn } from "../table-utils";
import SolaceComponentProps from "../../SolaceComponentProps";
import SolaceCheckBox from "../../form/SolaceCheckBox";
import SolaceMenu from "../../SolaceMenu";
import TuneIcon from "@material-ui/icons/Tune";

export interface ColumnControProps extends SolaceComponentProps {
	id?: string;
	columns: TableColumn[];
	displayedColumnsChangedCallback?: (displayedColumns: TableColumn[]) => void;
}

const ColumnControlMenu = ({ id, columns, displayedColumnsChangedCallback }: ColumnControProps): JSX.Element => {
	const [oneColumnIsVisible, setOneColumnIsVisible] = useState<boolean>(
		columns.filter((col) => !col.isHidden && !col.hasNoCell).length === 1
	);

	const handleColumnControlChange = (column: TableColumn) => {
		const columnIndex = columns.findIndex((col) => col.field === column.field);
		if (columnIndex >= 0) {
			const newColumns = columns.slice();
			newColumns[columnIndex].isHidden = !newColumns[columnIndex].isHidden;
			if (displayedColumnsChangedCallback) {
				displayedColumnsChangedCallback(newColumns);
			}
		}
		if (columns.filter((col) => !col.isHidden).length === 1) {
			setOneColumnIsVisible(true);
		} else {
			setOneColumnIsVisible(false);
		}
	};

	const customItems = columns
		.filter((column: TableColumn) => !column.disableHiding)
		.map((column: TableColumn) => ({
			name: (
				<SolaceCheckBox
					name={column.field}
					label={column.headerName}
					onChange={() => handleColumnControlChange(column)}
					checked={!column.isHidden}
					disabled={!column.isHidden && oneColumnIsVisible}
				></SolaceCheckBox>
			)
		}));

	return (
		<SolaceMenu
			id={id}
			buttonProps={{
				variant: "icon",
				children: <TuneIcon />,
				title: "Settings"
			}}
			items={customItems}
			closeOnSelect={false}
			anchorOrigin={{
				vertical: "center",
				horizontal: "left"
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "right"
			}}
		></SolaceMenu>
	);
};

export default ColumnControlMenu;
