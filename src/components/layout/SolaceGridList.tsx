import { styled } from "@material-ui/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BASE_COLORS } from "../../resources/colorPallette";
import SolaceComponentProps from "../SolaceComponentProps";

const Row = styled("div")(({ theme }) => theme.mixins.layoutComponent_GridList.row);
const List = styled("div")(({ theme }) => theme.mixins.layoutComponent_GridList.list);

interface SolaceGridListItem {
	id: string;
}

interface SolaceGridListProps<T extends SolaceGridListItem> extends SolaceComponentProps {
	id?: string;
	items: T[];
	headers?: string[];
	selectedItemId?: string;
	onSelection?: (item: T | undefined) => void;
	rowMapping: (item: T) => HTMLDivElement[];
	gridTemplate: string;
}

interface SolaceGridListRowProps extends SolaceComponentProps {
	id: string;
	index: number;
	items: HTMLDivElement[];
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
			key={`row${id}`}
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

function SolaceGridList<T extends SolaceGridListItem>({
	id,
	items,
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
				<Row className="headerRow" style={{ gridTemplateColumns: gridTemplate, backgroundColor: headerBGC }}>
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
				onSelection(items.find((item) => item.id === id));
			}
		},
		[items, onSelection]
	);

	return (
		<div id="listComponent" key={id} data-qa={dataQa} style={{ height: "100%" }}>
			<List>
				{headers && getListHeader}
				{items?.map((item, index) => (
					<SolaceGridListRow
						key={`solaceGridListRow-${item.id}`}
						id={item.id}
						index={index + 1}
						items={rowMapping(item)}
						selected={item.id === selectedItemId}
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
