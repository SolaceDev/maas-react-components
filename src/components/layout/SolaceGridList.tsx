import { styled } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BASE_COLORS } from "../../resources/colorPallette";
import SolaceComponentProps from "../SolaceComponentProps";

const Row = styled("div")(({ theme }) => theme.mixins.layoutComponent_ImageList.row);
const List = styled("div")(({ theme }) => theme.mixins.layoutComponent_ImageList.list);

interface SolaceGridListProps<T> extends SolaceComponentProps {
	id?: string;
	items: T[];
	objectIdentifier?: string;
	headers?: string[];
	selectedItemId?: string | number;
	onSelection?: (item: T) => void;
	rowMapping: (item: T) => JSX.Element[];
	gridTemplate: string;
}

interface SolaceGridListRowProps extends SolaceComponentProps {
	id: string;
	index: number;
	items: JSX.Element[];
	gridTemplate: string;
	selected?: boolean;
	onClick: (id: string) => void;
	dataQa?: string;
}

function SolaceGridListRow({
	id,
	index,
	items,
	gridTemplate,
	selected,
	onClick,
	dataQa
}: SolaceGridListRowProps): JSX.Element {
	const handleKeyPress = (e: any) => {
		if (e.key === "Enter") {
			onClick(id);
		}
	};

	return (
		<Row
			key={`row-${id}`}
			className={selected ? "selected" : ""}
			onClick={() => onClick(id)}
			onKeyPress={(e) => handleKeyPress(e)}
			style={{ gridTemplateColumns: gridTemplate }}
			tabIndex={index}
			data-qa={`${dataQa}-row-${id}`}
		>
			{items}
		</Row>
	);
}

function SolaceGridList<T>({
	id,
	items,
	objectIdentifier = "id",
	headers,
	selectedItemId,
	onSelection,
	rowMapping,
	gridTemplate,
	dataQa
}: SolaceGridListProps<T>): JSX.Element {
	const [headerBGC, setHeaderBGC] = useState("");

	useEffect(() => {
		const getBackgroundColour = (element: Element): string => {
			let backgroundColor = window.getComputedStyle(element).backgroundColor;
			if (backgroundColor !== "rgba(0, 0, 0, 0)") {
				return backgroundColor;
			} else if (element.parentElement) {
				backgroundColor = getBackgroundColour(element.parentElement);
			} else {
				// fall through case (no background color defined in any parent element)
				backgroundColor = BASE_COLORS.whites.white1;
			}

			return backgroundColor;
		};

		const currentBase = document.getElementById("listComponent");
		const parentElement = currentBase?.parentElement;
		if (parentElement) {
			const bkColor = getBackgroundColour(parentElement);
			setHeaderBGC(bkColor);
		}
	}, []);

	const getListHeader = useMemo(() => {
		if (headers) {
			return (
				<Row
					key="headerRow"
					className="headerRow"
					style={{ gridTemplateColumns: gridTemplate, backgroundColor: headerBGC }}
				>
					{headers.map((label, index) => (
						<span key={index}>{label}</span>
					))}
				</Row>
			);
		}
		return null;
	}, [gridTemplate, headerBGC, headers]);

	const handleRowClick = useCallback(
		(id: string) => {
			if (onSelection) {
				const selectedRow = items.find((item) => item[objectIdentifier] === id);
				if (selectedRow && selectedRow[objectIdentifier] !== selectedItemId) {
					onSelection(selectedRow);
				}
			}
		},
		[items, objectIdentifier, onSelection, selectedItemId]
	);

	return (
		<div id="listComponent" key={id} data-qa={dataQa} style={{ height: "100%" }}>
			<List>
				{headers && getListHeader}
				{items?.map((item, index) => (
					<SolaceGridListRow
						key={`solaceGridListRow-${item[objectIdentifier]}`}
						id={item[objectIdentifier]}
						index={index + 1}
						items={rowMapping(item)}
						selected={item[objectIdentifier] === selectedItemId}
						gridTemplate={gridTemplate}
						onClick={handleRowClick}
						dataQa={dataQa}
					/>
				))}
			</List>
		</div>
	);
}

export default SolaceGridList;
