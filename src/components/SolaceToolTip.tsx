import { Tooltip } from "@mui/material";
import { Fade } from "@mui/material";
import SolaceComponentProps from "./SolaceComponentProps";
import { useEffect, useRef, useState } from "react";
import useResizeAware from "react-resize-aware";

export interface SolaceTooltipProps extends SolaceComponentProps {
	/**
	 * Unique identifier ... if `id` is not specified, a randomly generated value will be used in order to make it accessible for screen readers
	 */
	id?: string;
	/**
	 * Tooltip title
	 */
	title?: string | JSX.Element;
	/**
	 * Different type of tooltip, default to `text`
	 */
	variant?: "text" | "overflow" | "html";
	/**
	 * Tooltip referenced element.
	 */
	children: string | JSX.Element;
	/**
	 * Tooltip placement, default to `bottom`
	 */
	placement?:
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
	 * Tooltip maximum width, default to small
	 */
	maxWidth?: "small" | "medium" | "full";
	/**
	 * Disable listener to show tooltip when referenced element is hovered, default to false
	 */
	disableHoverListener?: boolean;
	/**
	 * The number of milliseconds to wait before showing the tooltip. Default is 500ms
	 */
	enterDelay?: number;
	/**
	 * The number of milliseconds to wait before showing the tooltip when one was already recently opened. Default is 0ms
	 */
	enterNextDelay?: number;
	/**
	 * The number of milliseconds to wait before hiding the tooltip. Default is 0ms
	 */
	leaveDelay?: number;
	/**
	 * Controlled open state for tooltip. If `true`, the component is shown
	 */
	open?: boolean;
	/**
	 * Callback fired when the component requests to be open. Used in conjunction with `open` and `onClose`
	 */
	onOpen?: (event: React.SyntheticEvent) => void;
	/**
	 * Callback fired when the component requests to be closed. Used in conjunction with `open` and `onOpen`
	 */
	onClose?: (event: Event | React.SyntheticEvent<Element, Event>) => void;
}

function SolaceTooltip({
	id,
	title,
	variant = "text",
	children,
	placement = "bottom",
	maxWidth = "small",
	disableHoverListener = false,
	enterDelay = 500,
	enterNextDelay = 0,
	leaveDelay = 0,
	open,
	onOpen,
	onClose,
	dataQa,
	dataTags
}: SolaceTooltipProps) {
	const [isOverflowed, setIsOverflow] = useState(false);
	const textElementRef = useRef<HTMLDivElement>(null);
	const [resizeListener, sizes] = useResizeAware();

	useEffect(() => {
		// listen to container resize event and then reevaluate whether to show tooltip
		if (textElementRef.current) {
			setIsOverflow(textElementRef.current.scrollWidth > textElementRef.current.clientWidth);
		}
	}, [sizes]);

	return (
		<Tooltip
			id={id}
			title={title ?? ""}
			classes={{ tooltip: `${variant === "html" ? "htmlContent" : ""} ${maxWidth ? maxWidth + "Width" : ""}` }}
			placement={placement}
			data-qa={dataQa}
			data-tags={dataTags}
			disableHoverListener={disableHoverListener || (variant === "overflow" && !isOverflowed)}
			enterDelay={enterDelay}
			enterNextDelay={enterNextDelay}
			leaveDelay={leaveDelay}
			TransitionComponent={Fade}
			TransitionProps={{ timeout: { enter: 150, exit: 200 } }}
			open={open}
			onOpen={onOpen}
			onClose={onClose}
		>
			{variant === "overflow" ? (
				<div
					ref={textElementRef}
					style={{
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
						position: "relative"
					}}
				>
					{resizeListener}
					{children}
				</div>
			) : typeof children === "string" ? (
				<span>{children}</span>
			) : (
				children
			)}
		</Tooltip>
	);
}

export default SolaceTooltip;
