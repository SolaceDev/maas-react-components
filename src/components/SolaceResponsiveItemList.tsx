import { styled } from "@mui/material";
import SolaceButton from "./form/SolaceButton";
import SolacePopover from "./SolacePopover";
import { difference } from "lodash";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SolaceComponentProps from "./SolaceComponentProps";

const ItemsContainer = styled("div", {
	shouldForwardProp: (prop) =>
		prop !== "multiline" && prop !== "maxHeight" && prop !== "columnGap" && prop !== "rowGap" && prop !== "show"
})<{ multiline: boolean; maxHeight?: string; columnGap: string; rowGap: string; show: boolean }>(
	({ multiline, maxHeight, columnGap, rowGap, show }) => ({
		display: "flex",
		flexWrap: multiline ? "wrap" : "nowrap",
		columnGap: columnGap,
		rowGap: rowGap,
		alignItems: multiline ? "flex-start" : "center",
		visibility: show ? "visible" : "hidden",
		maxHeight: maxHeight ? maxHeight : "unset",
		overflow: "hidden"
	})
);

const PopoverContainer = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	rowGap: theme.spacing(1.5)
}));

export interface SolaceResponsiveItem {
	/**
	 * Uniquely identify the itme in the list
	 */
	id: string;
	content: JSX.Element;
}

function getOverflowIndicatorLabel(itemCount: number, label: string, labelSingular?: string) {
	if (itemCount === 1 && labelSingular) {
		return labelSingular;
	}

	return label;
}

export interface SolaceResponsiveItemListProps extends SolaceComponentProps {
	/**
	 * A list of items to display in a row
	 */
	items: SolaceResponsiveItem[];
	/**
	 * When showAll is true, all the items will be displayed inside the container wrapped around; when it is false,
	 * show items whose total width <= container's width, display "+ N more" and show remaining items in a popover when "+ N more" is hovered.
	 * Default is true.
	 */
	showAll?: boolean;
	/**
	 * Spacing between items, default is 12px
	 */
	columnGap?: number;
	/**
	 * Space between rows, default is 8px
	 * */
	rowGap?: number;
	/**
	 * Width of the container of the component.
	 *
	 * If containerWidth is undefined and showAll is false, then all items will be rendered in one row which can overflow the container.
	 * The container should have resize listener configured to properly update the value if its width is changing dynamically.
	 */
	containerWidth: number | undefined;
	/**
	 * Which component to use to display hidden items. Default is popover.
	 */
	componentToShowOverflowItems?: "popover" | null;
	/**
	 * Overflow component's placement
	 */
	overflowItemsPlacement?:
		| "bottom-end"
		| "bottom-start"
		| "bottom"
		| "left-end"
		| "left-start"
		| "left"
		| "right-end"
		| "right-start"
		| "right"
		| "top-end"
		| "top-start"
		| "top";
	/**
	 * Overflow indicator label. Default value is "more".
	 */
	overflowIndicatorLabel?: string;
	/**
	 * Overflow indicator label when number of filters is 1.
	 */
	overflowIndicatorLabelSingular?: string;
	/**
	 * Overflow indicator label width.
	 */
	overflowIndicatorLabelWidth?: number;
	/**
	 * Number of rows to show before hiding items. Default is 1.
	 * */
	numOfRowsToShow?: number;
	/**
	 * Callback to notify items rendered
	 */
	onItemsRendered?: () => void;
	/**
	 * Callback to notify items that are hidden
	 */
	onItemsOverflow?: (overflowedItems: SolaceResponsiveItem[]) => void;
	/**
	 * Callback when "+ N more" indicator is clicked. If the callback is defined and componentToShowOverflowItems is not null, then "+ N more" is a hyperlink.
	 */
	onItemsOverflowIndicatorClick?: () => void;
}

const defaultItemsHiddenIndicatorWidth = 58; // Width for "+ x more"
const defaultItemsHiddenIndicatorWidth1 = 66; // Width for "+ xx more"

// eslint-disable-next-line sonarjs/cognitive-complexity
function SolaceResponsiveItemList({
	items,
	showAll = true,
	columnGap = 12,
	rowGap = 8,
	containerWidth,
	componentToShowOverflowItems = "popover",
	overflowItemsPlacement = "bottom-start",
	overflowIndicatorLabel = "more",
	overflowIndicatorLabelSingular,
	overflowIndicatorLabelWidth,
	numOfRowsToShow = 1,
	onItemsRendered,
	onItemsOverflow,
	onItemsOverflowIndicatorClick,
	dataQa = "responsiveItemList"
}: SolaceResponsiveItemListProps) {
	const [visibleItemIds, setVisibleItemIds] = useState<string[] | null>(null);
	const [show, setShow] = useState(false);
	const [readyForCalculation, setReadyForCalculation] = useState(false);
	const itemsWidthRef = useRef<{ [key: string]: number }>({});
	const itemHeightRef = useRef<number>(24);

	const hiddenItemsCount = useMemo(() => {
		const totalCount = items?.length ?? 0;
		const visibleCount = visibleItemIds?.length ?? 0;

		return totalCount - visibleCount;
	}, [items?.length, visibleItemIds?.length]);

	const popoverContents = useMemo(() => {
		if (items && visibleItemIds) {
			return (
				<PopoverContainer>
					{items
						.filter((item) => !visibleItemIds.includes(item.id))
						.map((item) => (
							<div key={`popoverItem-${item.id}`}>{item.content}</div>
						))}
				</PopoverContainer>
			);
		} else {
			return undefined;
		}
	}, [items, visibleItemIds]);

	const itemIds = useMemo(() => {
		return items ? items.map((item) => item.id) : null;
	}, [items]);

	const calculateItemsToShow = useCallback(() => {
		if (containerWidth === undefined) {
			return;
		}
		const availableWidth = containerWidth;
		const newVisibleIds: string[] = [];
		let totalWidth = 0;
		let lastWidth = 0;
		let lastNumOfRows = 1;
		let hasHidden = false;

		if (items) {
			for (let i = 0; i < items.length; i++) {
				lastWidth = totalWidth;

				const itemWidth = (itemsWidthRef.current[items[i].id] ?? 0) + (i < items.length - 1 ? columnGap : 0);

				totalWidth += itemWidth;

				if (totalWidth > availableWidth) {
					if (lastNumOfRows === numOfRowsToShow) {
						hasHidden = true;
						break;
					} else {
						newVisibleIds.push(items[i].id);
						lastWidth = itemWidth;
						totalWidth = itemWidth;
						lastNumOfRows++;
					}
				} else {
					newVisibleIds.push(items[i].id);
					lastWidth = totalWidth;
				}
			}

			let indicatorWidth =
				items.length - newVisibleIds.length < 10 ? defaultItemsHiddenIndicatorWidth : defaultItemsHiddenIndicatorWidth1;
			if (overflowIndicatorLabelWidth) {
				indicatorWidth = overflowIndicatorLabelWidth;
			}

			if (hasHidden && lastWidth + indicatorWidth > availableWidth) {
				for (let i = newVisibleIds.length - 1; i >= 0; i--) {
					lastWidth -= (itemsWidthRef.current[newVisibleIds[i]] ?? 0) + (i < items.length - 1 ? columnGap : 0);
					newVisibleIds.splice(i, 1);

					if (lastWidth + indicatorWidth <= availableWidth) {
						break;
					}
				}
			}

			setShow(true);
			setVisibleItemIds(newVisibleIds);

			if (onItemsOverflow) {
				onItemsOverflow(items.filter((item) => !newVisibleIds.includes(item.id)));
			}

			onItemsRendered?.();
		}
	}, [
		containerWidth,
		items,
		overflowIndicatorLabelWidth,
		onItemsOverflow,
		onItemsRendered,
		columnGap,
		numOfRowsToShow
	]);

	useEffect(() => {
		if (items) {
			const itemIds = items.map((item) => item.id);

			setVisibleItemIds(itemIds);
			setReadyForCalculation(false);

			if (showAll) {
				setShow(true);
				onItemsRendered?.();
			}
		}
	}, [items, showAll, onItemsRendered]);

	useEffect(() => {
		if (readyForCalculation && !showAll) {
			calculateItemsToShow();
		}
	}, [readyForCalculation, calculateItemsToShow, showAll]);

	return itemIds ? (
		<ItemsContainer
			multiline={showAll || numOfRowsToShow > 1}
			maxHeight={!showAll ? `${numOfRowsToShow * itemHeightRef.current + (numOfRowsToShow - 1) * rowGap}px` : undefined}
			columnGap={columnGap + "px"}
			rowGap={rowGap + "px"}
			show={show}
			data-qa={dataQa}
		>
			{items.map((item) => {
				return (
					visibleItemIds?.includes(item.id) && (
						<span
							key={`listItem-${item.id}`}
							data-qa={`${dataQa}-listItem`}
							ref={(el) => {
								if (el) {
									itemsWidthRef.current[item.id] = el.offsetWidth;
									itemHeightRef.current = el.offsetHeight;

									const diffs = difference(itemIds, Object.keys(itemsWidthRef.current));

									if (diffs.length === 0 && !showAll) {
										setReadyForCalculation(true);
									}
								}
							}}
						>
							{item.content}
						</span>
					)
				);
			})}
			{!showAll && hiddenItemsCount > 0 && (
				<>
					{componentToShowOverflowItems === "popover" && (
						<SolacePopover
							title={popoverContents}
							placement={overflowItemsPlacement}
							dataQa={`${dataQa}-overflowPopover`}
						>
							<span>
								<SolaceButton
									variant="link"
									onClick={onItemsOverflowIndicatorClick ? onItemsOverflowIndicatorClick : undefined}
									dense={true}
								>
									<span style={{ whiteSpace: "nowrap" }}>{`+ ${hiddenItemsCount} ${getOverflowIndicatorLabel(
										hiddenItemsCount,
										overflowIndicatorLabel,
										overflowIndicatorLabelSingular
									)}`}</span>
								</SolaceButton>
							</span>
						</SolacePopover>
					)}
					{componentToShowOverflowItems !== "popover" && (
						<span style={{ whiteSpace: "nowrap" }}>{`+ ${hiddenItemsCount} ${getOverflowIndicatorLabel(
							hiddenItemsCount,
							overflowIndicatorLabel,
							overflowIndicatorLabelSingular
						)}`}</span>
					)}
				</>
			)}
		</ItemsContainer>
	) : null;
}

export default React.memo(SolaceResponsiveItemList);
