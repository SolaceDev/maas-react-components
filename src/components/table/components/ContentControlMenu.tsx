/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useState } from "react";
import { CustomContentDefinition, TableColumn } from "../table-utils";
import SolaceComponentProps from "../../SolaceComponentProps";
import SolaceCheckBox from "../../form/SolaceCheckBox";
import SolaceMenu from "../../SolaceMenu";
import TuneIcon from "@mui/icons-material/Tune";
import { SolaceMenuItemProps } from "../../SolaceMenuItem";

export interface ContentControlProps extends SolaceComponentProps {
	id?: string;
	columns: TableColumn[];
	displayedColumnsChangedCallback?: (displayedColumns: TableColumn[]) => void;
	customContentDefinitions?: CustomContentDefinition[];
	displayedCustomContent?: string[];
	customContentDisplayChangeCallback?: (customContentDefinitions: string, isHidden: boolean) => void;
	customMenuActions?: SolaceMenuItemProps[];
}

const ContentControlMenu = ({
	id,
	columns,
	customContentDefinitions,
	displayedCustomContent,
	displayedColumnsChangedCallback,
	customContentDisplayChangeCallback,
	customMenuActions
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
			),
			categoryHeading: "Manage Content Shown"
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
			),
			categoryHeading: "Manage Content Shown"
		})) ?? [];

	const customMenuActionsItems = customMenuActions ? customMenuActions : [];

	return (
		<SolaceMenu
			id={id}
			buttonProps={{
				variant: "icon",
				children: <TuneIcon />,
				title: "Settings"
			}}
			items={[...customItems, ...customContentItems, ...customMenuActionsItems]}
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
