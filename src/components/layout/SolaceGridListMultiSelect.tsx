import { styled, useTheme } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import SolaceCheckBox, { SolaceCheckboxChangeEvent } from "../form/SolaceCheckBox";
import { CSSProperties } from "@mui/styled-engine";

import SolaceComponentProps from "../SolaceComponentProps";
import SolaceGridList, { VirtualizeListOptions } from "./SolaceGridList";

const ImageListHeader = styled("div")(({ theme }) => ({
	...(theme.mixins.layoutComponent_ImageList.header as CSSProperties)
}));
const Row = styled("div")(({ theme }) => ({ ...(theme.mixins.layoutComponent_ImageList.row as CSSProperties) }));

interface SolaceGridListMultiSelectProps<T> extends SolaceComponentProps {
	id?: string;
	items: T[];
	objectIdentifier?: string;
	indicatorVariantIdentifier?: string;
	emphasizedIdentifier?: string;
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
	numOfGridListItemDisplayed?: number;
	showCount?: boolean;
	itemsType?: string;
	virtualizedListOption?: VirtualizeListOptions;
}

function SolaceGridListMultiSelect<T>({
	id,
	items,
	objectIdentifier = "id",
	indicatorVariantIdentifier = "indicatorVariant",
	emphasizedIdentifier = "emphasized",
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
	dataQa,
	numOfGridListItemDisplayed,
	showCount = false,
	itemsType = "",
	virtualizedListOption
}: SolaceGridListMultiSelectProps<T>): JSX.Element {
	// checkbox is 25px wide, column gap is 16px, setting a min width of 17px
	// gives a gap of 8px between checkbox and first column (as per UX design)
	const CHECKBOX_GRID_STRING = "min(17px)";
	const HEADER_HEIGHT = "49px";

	const [allSelected, setAllSelected] = useState(false);
	const [headerBGC, setHeaderBGC] = useState("");
	const theme = useTheme();
	const [indeterminate, setIndeterminate] = useState(false);

	const getGridTemplate = useMemo(() => {
		return CHECKBOX_GRID_STRING.concat(" ", gridTemplate);
	}, [gridTemplate]);

	//set indeterminate state for select all checkbox
	useEffect(() => {
		if (selectedRowIds.length > 0 && selectedRowIds.length < items.length) {
			setIndeterminate(true);
		} else {
			setIndeterminate(false);
		}
	}, [items?.length, selectedRowIds?.length]);

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

	useEffect(() => {
		const getBackgroundColour = (element: Element): string => {
			let backgroundColor = window.getComputedStyle(element).backgroundColor;
			if (backgroundColor !== "rgba(0, 0, 0, 0)") {
				return backgroundColor;
			} else if (element.parentElement) {
				backgroundColor = getBackgroundColour(element.parentElement);
			} else {
				// fall through case (no background color defined in any parent element)
				backgroundColor = theme.palette.ux.background.w10;
			}

			return backgroundColor;
		};

		const currentBase = document.getElementById("listComponent");
		const parentElement = currentBase?.parentElement;
		if (parentElement) {
			const bkColor = getBackgroundColour(parentElement);
			setHeaderBGC(bkColor);
		}
	}, [theme.palette.ux.background.w10]); // will not change

	const getListHeader = useMemo(() => {
		if (headers) {
			return (
				<Row
					key="headerRow"
					className="headerRow"
					style={{
						padding: "0 64px",
						gridTemplateColumns: gridTemplate,
						backgroundColor: headerBGC,
						color: theme.palette.ux.secondary.text.wMain
					}}
				>
					{headers.map((label, index) => (
						<span key={index}>{label}</span>
					))}
				</Row>
			);
		}
		return null;
	}, [gridTemplate, headerBGC, headers, theme.palette.ux.secondary.text.wMain]);

	const isHeaderDisplayed = useMemo(() => {
		return selectAll || actions;
	}, [actions, selectAll]);

	return (
		<div
			data-qa={dataQa}
			style={
				!virtualizedListOption ? { height: isHeaderDisplayed ? `calc(100% - ${HEADER_HEIGHT})` : "100%" } : undefined
			}
		>
			{getListHeader}
			{isHeaderDisplayed && (
				<ImageListHeader>
					{selectAll && (
						<div className="selectAll" key="selectAll">
							<SolaceCheckBox
								name={"ImageListSelectAllCheckbox"}
								onChange={handleSelectAll}
								checked={allSelected || indeterminate}
								indeterminate={indeterminate}
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
					{
						<span>
							{showCount && actions && (
								<span className="countItemsText">{`${selectedRowIds.length} ${itemsType} Selected`}</span>
							)}
							{actions}
						</span>
					}
				</ImageListHeader>
			)}
			<SolaceGridList
				id={id}
				items={items}
				objectIdentifier={objectIdentifier}
				indicatorVariantIdentifier={indicatorVariantIdentifier}
				emphasizedIdentifier={emphasizedIdentifier}
				selectedItemId={highlightedRowId}
				onSelection={onRowHighlight}
				rowMapping={getRowMapping}
				gridTemplate={getGridTemplate}
				dataQa={`${dataQa}-gridlist`}
				numOfGridListItemDisplayed={numOfGridListItemDisplayed}
				virtualizedListOption={virtualizedListOption}
			/>
		</div>
	);
}

export default SolaceGridListMultiSelect;
