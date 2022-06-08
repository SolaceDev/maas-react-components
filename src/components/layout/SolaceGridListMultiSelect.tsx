import { styled } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import SolaceCheckBox, { SolaceCheckboxChangeEvent } from "../form/SolaceCheckBox";

import SolaceComponentProps from "../SolaceComponentProps";
import SolaceGridList from "./SolaceGridList";

const ImageListHeader = styled("div")(({ theme }) => ({ ...(theme.mixins.layoutComponent_ImageList.header as any) }));

interface SolaceGridListMultiSelectProps<T> extends SolaceComponentProps {
	id?: string;
	items: T[];
	objectIdentifier?: string;
	headers?: string[];
	highlightedRowId?: string | number;
	onRowHighlight?: (item: T) => void;
	selectedRowIds?: Array<string | number>;
	onSelection?: (item: T[]) => void;
	rowMapping: (item: T) => JSX.Element[];
	gridTemplate: string;
	selectAll?: boolean;
	selectAllLabel?: string;
	actions?: JSX.Element[];
}

function SolaceGridListMultiSelect<T>({
	id,
	items,
	objectIdentifier = "id",
	headers,
	highlightedRowId,
	onRowHighlight,
	selectedRowIds = [],
	onSelection,
	rowMapping,
	gridTemplate,
	selectAllLabel = "Select All",
	selectAll = true,
	actions,
	dataQa
}: SolaceGridListMultiSelectProps<T>): JSX.Element {
	// checkbox is 25px wide, column gap is 16px, setting a min width of 17px
	// gives a gap of 8px between checkbox and first column (as per UX design)
	const CHECKBOX_GRID_STRING = "min(17px)";
	const HEADER_HEIGHT = "49px";

	const [allSelected, setAllSelected] = useState(false);

	const getGridTemplate = useMemo(() => {
		return CHECKBOX_GRID_STRING.concat(" ", gridTemplate);
	}, [gridTemplate]);

	const handleRowSelection = useCallback(
		(event: SolaceCheckboxChangeEvent) => {
			const selectedObj = items.find((obj) => obj[objectIdentifier] === event.name);
			if (selectedObj) {
				// found the selected row object
				if (event.value && !selectedRowIds.includes(event.name) && onSelection) {
					// a new checkbox is being selected
					const selectedRows = items.filter((item) => selectedRowIds.includes(item[objectIdentifier]));
					onSelection([...selectedRows, selectedObj]);

					if (selectedRows.length + 1 === items.length && !allSelected) {
						// all items in the list have been selected, check the "Select All" checkbox
						setAllSelected(true);
					}
				} else if (onSelection) {
					// a checkbox is being unselected
					const selectedRows = items.filter(
						(item) => selectedRowIds.includes(item[objectIdentifier]) && item[objectIdentifier] !== event.name
					);
					onSelection(selectedRows);

					if (selectedRows.length < items.length && allSelected) {
						// not all items in the list have been selected, uncheck the "Select All" checkbox
						setAllSelected(false);
					}
				}
			}
		},
		[allSelected, items, objectIdentifier, onSelection, selectedRowIds]
	);

	const handleSelectAll = useCallback(
		(event: SolaceCheckboxChangeEvent) => {
			if (onSelection) {
				if (event.value) {
					// select all items
					setAllSelected(true);
					onSelection(items);
				} else {
					// clear all selections
					setAllSelected(false);
					onSelection([]);
				}
			}
		},
		[items, onSelection]
	);

	const getRowMapping = useCallback(
		(item: T) => {
			const checkboxList = [];
			const rowItems = rowMapping(item);
			checkboxList.push(
				<div
					id={`checkbox-${item[objectIdentifier]}`}
					key={`checkbox-${item[objectIdentifier]}`}
					style={{ justifySelf: "left" }}
				>
					<SolaceCheckBox
						name={item[objectIdentifier]}
						onChange={handleRowSelection}
						checked={selectedRowIds.includes(item[objectIdentifier])}
					/>
				</div>
			);
			checkboxList.push(...rowItems);

			return checkboxList;
		},
		[handleRowSelection, objectIdentifier, rowMapping, selectedRowIds]
	);

	const isHeaderDisplayed = useMemo(() => {
		return selectAll || actions;
	}, [actions, selectAll]);

	return (
		<div data-qa={dataQa} style={{ height: isHeaderDisplayed ? `calc(100% - ${HEADER_HEIGHT})` : "100%" }}>
			{isHeaderDisplayed && (
				<ImageListHeader>
					{selectAll && (
						<div className="selectAll" key="selectAll">
							<SolaceCheckBox
								name={"ImageListSelectAllCheckbox"}
								onChange={handleSelectAll}
								checked={allSelected}
								dataQa={`${dataQa}-selectAll`}
							/>
							<span className="selectAllText">{selectAllLabel}</span>
						</div>
					)}
					{
						!selectAll && (
							<span key="selectAllPlaceholder"></span>
						) /*this is to ensure 'actions' are right aligned when there is no 'Select All' checkbox */
					}
					{actions}
				</ImageListHeader>
			)}
			<SolaceGridList
				id={id}
				items={items}
				headers={headers ? ["", ...headers] : undefined}
				objectIdentifier={objectIdentifier}
				selectedItemId={highlightedRowId}
				onSelection={onRowHighlight}
				rowMapping={getRowMapping}
				gridTemplate={getGridTemplate}
				dataQa={`${dataQa}-gridlist`}
			/>
		</div>
	);
}

export default SolaceGridListMultiSelect;
