import React, { useRef, useState } from "react";
import { TableColumn } from "../table-utils";
import { styled } from "@material-ui/core";
import { BASE_COLORS } from "../../../resources/colorPallette";
import { useOutsideClicked } from "../hooks/useClickedOutside";
import SolaceComponentProps from "../../SolaceComponentProps";
import SolaceCheckBox from "../../form/SolaceCheckBox";

export const ColumnHidingContainer = styled("div")(({ theme }) => ({
	position: "absolute",
	display: "block",
	whiteSpace: "nowrap",
	top: "30px",
	right: "40px",
	padding: `${theme.spacing()} 0`,
	border: `1px solid ${BASE_COLORS.greys.grey1}`,
	borderRadius: "2px",
	minHeight: "32px",
	minWidth: "60px",
	background: BASE_COLORS.whites.white1,
	zIndex: 3
}));

export const StyledColumnControl = styled("div")(({ theme }) => ({
	minWidth: "60px",
	padding: `${theme.spacing()} ${theme.spacing(2)}`,
	cursor: "pointer"
}));

interface ColumnHidingControlMenu extends SolaceComponentProps {
	id?: string;
	columns: TableColumn[];
	onCloseCallback: (value: React.SetStateAction<boolean>) => void;
	setDisplayedColumns: (displayedColumns: TableColumn[]) => void;
	displayedColumnsChangedCallback?: (displayedColumns: TableColumn[]) => void;
}

const ColumnHidingControlMenu = ({
	id,
	columns,
	onCloseCallback,
	setDisplayedColumns,
	displayedColumnsChangedCallback
}: ColumnHidingControlMenu): JSX.Element => {
	const [oneColumnIsVisible, setOneColumnIsVisible] = useState<boolean>(
		columns.filter((col) => !col.isHidden && !col.hasNoCell).length === 1
	);
	const columnHidingMenuRef = useRef(null);
	useOutsideClicked(columnHidingMenuRef, onCloseCallback);

	const handleColumnControlChange = (column: TableColumn) => {
		onCloseCallback(false);
		const columnIndex = columns.findIndex((col) => col.field === column.field);
		const newColumns = columns.slice();
		newColumns[columnIndex].isHidden = !newColumns[columnIndex].isHidden;
		setDisplayedColumns(newColumns);
		if (displayedColumnsChangedCallback) {
			displayedColumnsChangedCallback(newColumns);
		}
		if (columns.filter((col) => !col.isHidden).length === 1) {
			setOneColumnIsVisible(true);
		} else {
			setOneColumnIsVisible(false);
		}
	};

	return (
		<ColumnHidingContainer id={id} onClick={(e) => e.stopPropagation()} ref={columnHidingMenuRef}>
			{columns.map(
				(column: TableColumn) =>
					!column.disableHiding && (
						<StyledColumnControl key={column.field}>
							<SolaceCheckBox
								name={column.field}
								label={column.headerName}
								onChange={() => handleColumnControlChange(column)}
								checked={!column.isHidden}
								disabled={!column.isHidden && oneColumnIsVisible}
							></SolaceCheckBox>
						</StyledColumnControl>
					)
			)}
		</ColumnHidingContainer>
	);
};

export default ColumnHidingControlMenu;
