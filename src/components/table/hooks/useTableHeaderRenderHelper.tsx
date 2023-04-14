/* eslint-disable sonarjs/cognitive-complexity */
import React, { useCallback } from "react";
import {
	CustomContentDefinition,
	SELECTION_TYPE,
	SORT_DIRECTION,
	StyledTableHeader,
	StyledTableRow,
	TableActionMenuItem,
	TableColumn,
	TableRow,
	addColumnHidingControl,
	addEmptyHeaderCell
} from "../table-utils";
import SolaceTooltip from "../../SolaceToolTip";
import SolaceCheckBox, { SolaceCheckboxChangeEvent } from "../../form/SolaceCheckBox";
import { AscendingSortIcon, DescendingSortIcon, UnsortedIcon } from "../../../resources/icons/SortIcons";

import { ExpandableRowOptions } from "../SolaceTable";
import { SolaceMenuItemProps } from "../../SolaceMenuItem";
import { cloneDeep } from "lodash";

const DEFAULT_TOOLTIP_PLACEMENT = "bottom-end";
const SELECT_ALL_TOOLTIP = "Select all on this page";
const DESELECT_ALL_TOOLTIP = "Deselect all on this page";
const SELECT_ALL_PAGES_TOOLTIP = "Select all pages";
const DESELECT_ALL_PAGES_TOOLTIP = "Deselect all pages";

function getTooltip(selectAll: boolean, crossPageSelectionEnabled: boolean) {
	if (selectAll) {
		return crossPageSelectionEnabled ? SELECT_ALL_PAGES_TOOLTIP : SELECT_ALL_TOOLTIP;
	} else {
		return crossPageSelectionEnabled ? DESELECT_ALL_PAGES_TOOLTIP : DESELECT_ALL_TOOLTIP;
	}
}

const useTableHeaderRenderHelper = ({
	// pass down from SolaceTable props
	selectionType,
	sortedColumn,
	rowActionMenuItems,
	renderCustomRowActionItem,
	headerHoverCallback,
	hasColumnHiding,
	displayedColumns,
	expandableRowOptions,
	customContentDefinitions,
	displayedCustomContent,
	customContentDisplayChangeCallback,
	customMenuActions,
	// state and callbacks defined in useSolaceTable
	crossPageSelectionEnabled,
	selectAll,
	indeterminate,
	handleSelectAllChange,
	internalSortedColumn,
	handleSort,
	internalDisplayedColumns,
	handleDisplayColumnsChanged
}: {
	// pass down from SolaceTable props
	selectionType: SELECTION_TYPE;
	sortedColumn: TableColumn | undefined;
	rowActionMenuItems?: TableActionMenuItem[];
	renderCustomRowActionItem?: (row: TableRow) => TableActionMenuItem[];
	headerHoverCallback?: () => void;
	hasColumnHiding?: boolean;
	displayedColumns?: TableColumn[];
	expandableRowOptions?: ExpandableRowOptions;
	customContentDefinitions?: CustomContentDefinition[];
	displayedCustomContent?: string[];
	customContentDisplayChangeCallback?: (type: string, isHidden: boolean) => void;
	customMenuActions?: SolaceMenuItemProps[];
	// state and callbacks defined in useSolaceTable
	crossPageSelectionEnabled: boolean;
	selectAll: boolean;
	indeterminate: boolean;
	handleSelectAllChange: (event: SolaceCheckboxChangeEvent) => void;
	internalSortedColumn: TableColumn | undefined;
	handleSort: (
		newColumn: TableColumn,
		sortedColumn: TableColumn | undefined,
		internalSortedColumn: TableColumn | undefined
	) => void;
	internalDisplayedColumns: TableColumn[] | undefined;
	handleDisplayColumnsChanged: (cols: TableColumn[]) => void;
}) => {
	const addCheckBoxToHeader = useCallback((): React.ReactNode | void => {
		if (selectionType === SELECTION_TYPE.MULTI) {
			return (
				<StyledTableHeader key={"selectAllCheckbox"} className="checkbox-column">
					<SolaceTooltip
						title={
							selectAll || indeterminate
								? getTooltip(false, crossPageSelectionEnabled)
								: getTooltip(true, crossPageSelectionEnabled)
						}
						placement={"bottom-start"}
					>
						<div>
							<SolaceCheckBox
								name={"selectAllCheckbox"}
								onChange={handleSelectAllChange}
								checked={selectAll || indeterminate}
								indeterminate={indeterminate}
							/>
						</div>
					</SolaceTooltip>
				</StyledTableHeader>
			);
		} else {
			return;
		}
	}, [selectionType, selectAll, indeterminate, handleSelectAllChange, crossPageSelectionEnabled]);

	const addChevronToHeader = useCallback((): React.ReactNode | void => {
		if (expandableRowOptions?.allowToggle) {
			return <StyledTableHeader key={"expandHeader"} className="expand-column"></StyledTableHeader>;
		} else {
			return;
		}
	}, [expandableRowOptions?.allowToggle]);

	const addConfigureColumnHeader = useCallback(
		(columnsToDisplay: TableColumn[], columnToSort: TableColumn | undefined): React.ReactNode | void => {
			return columnsToDisplay.map(
				(col) =>
					!col.isHidden && (
						<StyledTableHeader
							key={col.headerName}
							className={`${
								(col.hasNoCell && "icon-column") || (col.isNumerical && "number-column") || col.class || ""
							}`}
							width={col.width ? (typeof col.width === "number" ? col.width + "px" : col.width) : "auto"}
						>
							<span
								className={`${col.sortable ? "sortable header" : "header"}`}
								onClick={() => (col.sortable ? handleSort(col, sortedColumn, internalSortedColumn) : undefined)}
							>
								<SolaceTooltip variant="overflow" title={col.headerName} placement={DEFAULT_TOOLTIP_PLACEMENT}>
									{col.headerName}
								</SolaceTooltip>
								{columnToSort?.field === col.field && col.sortable && (
									<SolaceTooltip title="Sort" placement={DEFAULT_TOOLTIP_PLACEMENT}>
										<div>
											{columnToSort.sortDirection === SORT_DIRECTION.ASC ? (
												<AscendingSortIcon />
											) : (
												<DescendingSortIcon />
											)}
										</div>
									</SolaceTooltip>
								)}
								{columnToSort?.field !== col.field && col.sortable && (
									<SolaceTooltip title="Sort" placement={DEFAULT_TOOLTIP_PLACEMENT}>
										<div>
											<UnsortedIcon />
										</div>
									</SolaceTooltip>
								)}
							</span>
						</StyledTableHeader>
					)
			);
		},
		[handleSort, internalSortedColumn, sortedColumn]
	);

	const createHeaderNodes = useCallback(() => {
		const columnToSort = sortedColumn ? sortedColumn : internalSortedColumn;
		const columnsToDisplay = cloneDeep((displayedColumns ? displayedColumns : internalDisplayedColumns) ?? []);

		return (
			<StyledTableRow
				key="headerRow"
				className="header"
				onMouseEnter={headerHoverCallback ? () => headerHoverCallback() : undefined}
			>
				{[
					addCheckBoxToHeader(),
					addChevronToHeader(),
					addConfigureColumnHeader(columnsToDisplay, columnToSort),
					(!!rowActionMenuItems || renderCustomRowActionItem) && !hasColumnHiding && addEmptyHeaderCell(),
					hasColumnHiding &&
						addColumnHidingControl({
							columns: columnsToDisplay,
							displayedColumnsChangedCallback: handleDisplayColumnsChanged,
							customContentDefinitions: customContentDefinitions,
							displayedCustomContent: displayedCustomContent,
							customContentDisplayChangeCallback: customContentDisplayChangeCallback,
							customMenuActions: customMenuActions
						})
				]}
			</StyledTableRow>
		);
	}, [
		sortedColumn,
		internalSortedColumn,
		displayedColumns,
		internalDisplayedColumns,
		headerHoverCallback,
		addCheckBoxToHeader,
		addChevronToHeader,
		addConfigureColumnHeader,
		rowActionMenuItems,
		renderCustomRowActionItem,
		hasColumnHiding,
		handleDisplayColumnsChanged,
		customContentDefinitions,
		displayedCustomContent,
		customContentDisplayChangeCallback,
		customMenuActions
	]);

	return createHeaderNodes();
};

export default useTableHeaderRenderHelper;
