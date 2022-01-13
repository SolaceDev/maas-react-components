import { Tooltip } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import SolaceComponentProps from "./SolaceComponentProps";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import { useEffect, useRef, useState } from "react";

export interface SolaceTooltipProps extends SolaceComponentProps {
	/**
	 * Unique identifier ... if `id` is not specified, a randomly generated value will be used in order to make it accessible for screen readers
	 */
	id?: string;
	/**
	 * Tooltip title
	 */
	title?: JSX.Element;
	/**
	 * Different type of tooltip
	 */
	variant: "text" | "overflow" | "html";
	/**
	 * Tooltip referenced element, default to question mark icon.
	 */
	children?: JSX.Element;
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
	maxWidth,
	disableHoverListener = false,
	dataQa,
	dataTags
}: SolaceTooltipProps) {
	const [isOverflowed, setIsOverflow] = useState(false);
	const textElementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (textElementRef.current) {
			setIsOverflow(textElementRef.current.scrollWidth > textElementRef.current.clientWidth);
		}
	}, []);

	if (variant === "overflow") {
		return (
			<Tooltip
				id={id}
				title={title ?? ""}
				placement={placement}
				data-qa={dataQa}
				data-tags={dataTags}
				disableHoverListener={disableHoverListener || !isOverflowed}
				enterDelay={500}
				enterNextDelay={0}
				leaveDelay={150}
				TransitionComponent={Fade}
				TransitionProps={{ timeout: { enter: 150, exit: 200 } }}
			>
				<div
					ref={textElementRef}
					style={{
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis"
					}}
				>
					{children ? children : ""}
				</div>
			</Tooltip>
		);
	} else {
		return (
			<Tooltip
				id={id}
				title={title ?? ""}
				classes={{ tooltip: `${variant === "html" ? "htmlContent" : ""} ${maxWidth + "Width" ?? ""}` }}
				placement={placement}
				data-qa={dataQa}
				data-tags={dataTags}
				disableHoverListener={disableHoverListener}
				enterDelay={500}
				enterNextDelay={0}
				leaveDelay={150}
				TransitionComponent={Fade}
				TransitionProps={{ timeout: { enter: 150, exit: 200 } }}
			>
				{children ? children : <HelpOutlineOutlinedIcon fontSize="small" />}
			</Tooltip>
		);
	}
}

export default SolaceTooltip;
