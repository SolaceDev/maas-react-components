import { Tooltip } from "@material-ui/core";
import { Fade } from "@material-ui/core";
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
}

function SolaceTooltip({
	id,
	title,
	variant = "text",
	children,
	placement = "bottom",
	maxWidth = "small",
	disableHoverListener = false,
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
			enterDelay={500}
			enterNextDelay={0}
			leaveDelay={0}
			TransitionComponent={Fade}
			TransitionProps={{ timeout: { enter: 150, exit: 200 } }}
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
