import { styled, useTheme } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import SolaceComponentProps from "../SolaceComponentProps";
import { CSSProperties } from "@mui/styled-engine";
import { getGridListItemHeight } from "../../utils";
import { useScrollIndicator } from "../../hooks/useScrollIndicator";

const Row = styled("div")(({ theme }) => ({ ...(theme.mixins.layoutComponent_ImageList.row as CSSProperties) }));
const List = styled("div")(({ theme }) => ({ ...(theme.mixins.layoutComponent_ImageList.list as CSSProperties) }));
const Border = styled("div")(({ theme }) => ({ ...(theme.mixins.layoutComponent_ImageList.border as CSSProperties) }));

interface SolaceGridListProps<T> extends SolaceComponentProps {
	id?: string;
	items: T[];
	objectIdentifier?: string;
	headers?: string[];
	selectedItemId?: string | number;
	onSelection?: (item: T) => void;
	rowMapping: (item: T, index: number) => JSX.Element[];
	gridTemplate: string;
	background?: string;
	numOfGridListItemDisplayed?: number;
}

interface SolaceGridListRowProps extends SolaceComponentProps {
	id: string;
	index: number;
	items: JSX.Element[];
	gridTemplate: string;
	selected?: boolean;
	onClick: (id: string) => void;
	dataQa?: string;
	background?: string;
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
			onClick={(e) => {
				if (e.target === e.currentTarget) onClick(id);
			}}
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
	dataQa,
	background,
	numOfGridListItemDisplayed
}: SolaceGridListProps<T>): JSX.Element {
	const [headerBGC, setHeaderBGC] = useState("");
	const theme = useTheme();

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

	const { maskImage, onScrollHandler } = useScrollIndicator();
	const itemHeight = getGridListItemHeight();

	const maskImageEffect = () => {
		return numOfGridListItemDisplayed
			? items && items.length > numOfGridListItemDisplayed
				? maskImage
				: "none"
			: "none";
	};

	const [gridListRef, setGridListRef] = useState<null | HTMLElement>(null);

	useEffect(() => {
		const gridElement = gridListRef;
		gridElement?.addEventListener("scroll", onScrollHandler);
		return () => {
			gridElement?.removeEventListener("scroll", onScrollHandler);
		};
	}, [gridListRef, onScrollHandler]);

	return (
		<div
			id="listComponent"
			key={id}
			data-qa={dataQa}
			style={{
				color: theme.palette.ux.primary.text.wMain
			}}
		>
			{headers && getListHeader}
			<Border>
				<List
					ref={setGridListRef}
					style={{
						backgroundColor: background,
						maxHeight: numOfGridListItemDisplayed
							? `${itemHeight * numOfGridListItemDisplayed + itemHeight / 2}px`
							: "none",
						maskImage: maskImageEffect(),
						WebkitMaskImage: maskImageEffect()
					}}
				>
					{items?.map((item, index) => (
						<SolaceGridListRow
							key={`solaceGridListRow-${item[objectIdentifier] ?? index}`}
							id={item[objectIdentifier] ?? index}
							index={index + 1}
							items={rowMapping(item, index)}
							selected={selectedItemId ? item[objectIdentifier] === selectedItemId : false}
							gridTemplate={gridTemplate}
							onClick={handleRowClick}
							dataQa={dataQa}
						/>
					))}
				</List>
			</Border>
		</div>
	);
}

export default SolaceGridList;
