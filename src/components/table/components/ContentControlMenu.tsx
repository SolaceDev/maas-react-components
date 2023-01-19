import { useState } from "react";
import { CustomContentDefinition, TableColumn } from "../table-utils";
import SolaceComponentProps from "../../SolaceComponentProps";
import SolaceCheckBox from "../../form/SolaceCheckBox";
import SolaceMenu from "../../SolaceMenu";
import TuneIcon from "@mui/icons-material/Tune";

export interface ContentControlProps extends SolaceComponentProps {
	id?: string;
	columns: TableColumn[];
	displayedColumnsChangedCallback?: (displayedColumns: TableColumn[]) => void;
	customContentDefinitions?: CustomContentDefinition[];
	displayedCustomContent?: string[];
	customContentDisplayChangeCallback?: (customContentDefinitions: string, isHidden: boolean) => void;
}

const ContentControlMenu = ({
	id,
	columns,
	customContentDefinitions,
	displayedCustomContent,
	displayedColumnsChangedCallback,
	customContentDisplayChangeCallback
}: ContentControlProps): JSX.Element => {
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

	const customContentItems =
		customContentDefinitions?.map((customContent: CustomContentDefinition) => ({
			name: (
				<SolaceCheckBox
					name={customContent.type}
					label={customContent.label}
					onChange={
						customContentDisplayChangeCallback
							? (event) => customContentDisplayChangeCallback(customContent.type, !event.value)
							: undefined
					}
					checked={displayedCustomContent?.includes(customContent.type) ? true : false}
				></SolaceCheckBox>
			)
		})) ?? [];

	return (
		<SolaceMenu
			header="Manage Content Shown"
			id={id}
			buttonProps={{
				variant: "icon",
				children: <TuneIcon />,
				title: "Settings"
			}}
			items={[...customItems, ...customContentItems]}
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

export default ContentControlMenu;
