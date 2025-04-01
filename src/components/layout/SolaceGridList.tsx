import { styled, useTheme } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SolaceComponentProps from "../SolaceComponentProps";
import { CSSProperties } from "@mui/styled-engine";
import { getGridListItemHeight } from "../../utils";
import { useScrollIndicator } from "../../hooks/useScrollIndicator";
import { FixedSizeList as VirtualizedList } from "react-window";

const Row = styled("div")(({ theme }) => ({ ...(theme.mixins.layoutComponent_ImageList.row as CSSProperties) }));
const VirtualRow = styled("div")(({ theme }) => ({
	...(theme.mixins.layoutComponent_ImageList.virtualRow as CSSProperties)
}));
const VirtualRowContainer = styled("div")(({ theme }) => ({
	...(theme.mixins.layoutComponent_ImageList.virtualRowContainer as CSSProperties)
}));
const List = styled("div")(({ theme }) => ({
	...(theme.mixins.layoutComponent_ImageList.list as CSSProperties)
}));
const Border = styled("div")(({ theme }) => ({ ...(theme.mixins.layoutComponent_ImageList.border as CSSProperties) }));

export interface VirtualizeListOptions {
	height?: number;
	width?: string | number;
	itemHeight?: number;
	overscanCount?: number;
	contentPlaceholder?: JSX.Element;
}

interface SolaceGridListProps<T> extends SolaceComponentProps {
	id?: string;
	items: T[];
	objectIdentifier?: string;
	indicatorVariantIdentifier?: string;
	emphasizedIdentifier?: string;
	headers?: string[];
	selectedItemId?: string | number;
	onSelection?: (item: T) => void;
	rowMapping: (item: T, index: number) => JSX.Element[];
	gridTemplate: string;
	background?: string;
	numOfGridListItemDisplayed?: number;
	// only render part of a large data set to fill the viewport
	virtualizedListOption?: VirtualizeListOptions;
}

interface SolaceGridListRowProps extends SolaceComponentProps {
	id: string;
	index: number;
	items: JSX.Element[];
	gridTemplate: string;
	selected?: boolean;
	/**
	 * A colored vertical bar displayed inside the left border to indicate the variant
	 */
	indicatorVariant?: "info" | "error" | "warn" | "success" | "secondary";
	/**
	 * A colored background applies to the row to provide emphasize
	 */
	emphasized?: boolean;
	onClick: (id: string) => void;
	dataQa?: string;
	background?: string;
	virtualRow?: boolean;
	isLoading?: boolean;
	contentPlaceholder?: JSX.Element;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function SolaceGridListRow({
	id,
	index,
	items,
	gridTemplate,
	selected,
	indicatorVariant,
	emphasized,
	onClick,
	dataQa,
	virtualRow = false,
	isLoading = false,
	contentPlaceholder
}: SolaceGridListRowProps): JSX.Element {
	const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter") {
			onClick(id);
		}
	};

	return virtualRow ? (
		<VirtualRow
			key={`row-${id}`}
			className={`${selected ? "selected" : ""} ${indicatorVariant ? "indicator-" + indicatorVariant : ""} ${
				emphasized ? "emphasized" : ""
			}`}
			onClick={() => onClick(id)}
			onKeyPress={(e) => handleKeyPress(e)}
			style={{ gridTemplateColumns: gridTemplate }}
			tabIndex={index}
			data-qa={`${dataQa}-row-${id}`}
		>
			{isLoading && contentPlaceholder ? contentPlaceholder : items}
		</VirtualRow>
	) : (
		<Row
			key={`row-${id}`}
			className={`${selected ? "selected" : ""} ${indicatorVariant ? "indicator-" + indicatorVariant : ""} ${
				emphasized ? "emphasized" : ""
			}`}
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
	indicatorVariantIdentifier = "indicatorVariant",
	emphasizedIdentifier = "emphasized",
	headers,
	selectedItemId,
	onSelection,
	rowMapping,
	gridTemplate,
	dataQa,
	background,
	numOfGridListItemDisplayed,
	virtualizedListOption
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

	const virtualListRef = useRef<VirtualizedList<T> | null>();

	useEffect(() => {
		if (selectedItemId && virtualListRef.current && items) {
			const foundIndex = items.findIndex((item) => item[objectIdentifier] === selectedItemId);
			if (foundIndex >= 0) {
				// scroll to the selected row as little as possible
				virtualListRef.current.scrollToItem(foundIndex);
			}
		}
	}, [items, objectIdentifier, selectedItemId]);

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
				{!virtualizedListOption && (
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
								indicatorVariant={item[indicatorVariantIdentifier]}
								emphasized={item[emphasizedIdentifier]}
								gridTemplate={gridTemplate}
								onClick={handleRowClick}
								dataQa={dataQa}
							/>
						))}
					</List>
				)}
				{virtualizedListOption && items?.length > 0 && (
					<VirtualizedList
						className="List"
						style={{ backgroundColor: background }}
						height={
							virtualizedListOption.height
								? virtualizedListOption.height
								: numOfGridListItemDisplayed
								  ? itemHeight * numOfGridListItemDisplayed + itemHeight / 2
								  : 200
						}
						width={virtualizedListOption.width ?? "100%"}
						itemCount={items.length}
						itemSize={virtualizedListOption.itemHeight ? virtualizedListOption.itemHeight : getGridListItemHeight()}
						overscanCount={virtualizedListOption.overscanCount ?? 1}
						useIsScrolling={true}
						ref={(element) => {
							virtualListRef.current = element;
						}}
					>
						{({ index, style, isScrolling }) => (
							<VirtualRowContainer style={style}>
								<SolaceGridListRow
									key={`solaceGridListRow-${items[index][objectIdentifier] ?? index}`}
									id={items[index][objectIdentifier] ?? index}
									index={index + 1}
									items={rowMapping(items[index], index)}
									selected={selectedItemId ? items[index][objectIdentifier] === selectedItemId : false}
									indicatorVariant={items[index][indicatorVariantIdentifier]}
									emphasized={items[index][emphasizedIdentifier]}
									gridTemplate={gridTemplate}
									onClick={handleRowClick}
									dataQa={dataQa}
									virtualRow={true}
									isLoading={isScrolling}
									contentPlaceholder={virtualizedListOption.contentPlaceholder}
								/>
							</VirtualRowContainer>
						)}
					</VirtualizedList>
				)}
			</Border>
		</div>
	);
}

export default SolaceGridList;
