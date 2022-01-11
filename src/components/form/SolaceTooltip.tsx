import { Tooltip } from "@material-ui/core";
import React, { ReactChild, ReactFragment, ReactPortal } from "react";

interface SolaceTooltipProps {
	children: JSX.Element;
	title: boolean | ReactChild | ReactFragment | ReactPortal;
	arrow?: boolean;
	classes?: any;
	components?: any;
	componentsProps?: any;
	describeChild?: boolean;
	disableFocusListener?: boolean;
	disableHoverListener?: boolean;
	disableInteractive?: boolean;
	disableTouchListener?: boolean;
	enterDelay?: number;
	enterNextDelay?: number;
	enterTouchDelay?: number;
	followCursor?: boolean;
	/**
	 * This prop is used to help implement the accessibility logic. If you don't provide this prop. It falls back to a randomly generated id.
	 */
	id?: string;
	leaveDelay?: number;
	leaveTouchDelay?: number;
	onClose?: (event: Event | React.SyntheticEvent) => void;
	onOpen?: (event: Event | React.SyntheticEvent) => void;
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
}

const SolaceTooltip = ({
	id,
	title,
	arrow,
	describeChild,
	disableFocusListener,
	disableHoverListener,
	disableInteractive,
	disableTouchListener,
	enterDelay,
	enterNextDelay,
	enterTouchDelay,
	followCursor,
	leaveDelay,
	leaveTouchDelay,
	onClose,
	onOpen,
	placement,
	children
}: SolaceTooltipProps) => {
	return (
		<Tooltip
			id={id}
			title={title}
			arrow={arrow}
			describeChild={describeChild}
			disableFocusListener={disableFocusListener}
			disableHoverListener={disableHoverListener}
			disableInteractive={disableInteractive}
			disableTouchListener={disableTouchListener}
			enterDelay={enterDelay}
			enterNextDelay={enterNextDelay}
			enterTouchDelay={enterTouchDelay}
			followCursor={followCursor}
			leaveDelay={leaveDelay}
			leaveTouchDelay={leaveTouchDelay}
			onClose={onClose}
			onOpen={onOpen}
			placement={placement}
		>
			{children}
		</Tooltip>
	);
};

export default SolaceTooltip;
