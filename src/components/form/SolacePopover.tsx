import { Tooltip, Fade, styled, TooltipProps } from "@material-ui/core";
import React, { ReactChild, ReactFragment, ReactPortal } from "react";

const ToBeStyledTooltip = ({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className, tooltip: className }} />
);
const StyledTooltip = styled(ToBeStyledTooltip)(({ theme }) => theme.mixins.formComponent_SolacePopover);

interface SolacePopoverProps {
	/**
	 * This prop is used to help implement the accessibility logic. If you don't provide this prop. It falls back to a randomly generated id by Mui
	 */
	id?: string;
	/**
	 * If true, the component is shown.
	 */
	open?: boolean;
	/**
	 * 	Popover title. Zero-length titles string are never displayed.
	 */
	title: boolean | ReactChild | ReactFragment | ReactPortal;
	/**
	 * Popover reference element. Note: Needs to be able to hold a ref.
	 */
	children: JSX.Element;
	/**
	 * 	If true, adds an arrow to the Popover.
	 */
	arrow?: boolean;
	/**
	 * Set to true if the title acts as an accessible description. By default the title acts as an accessible label for the child.
	 */
	describeChild?: boolean;
	/**
	 * Do not respond to focus-visible events.
	 */
	disableFocusListener?: boolean;
	/**
	 * Do not respond to hover events.
	 */
	disableHoverListener?: boolean;
	/**
	 * Makes a Popover not interactive, i.e. it will close when the user hovers over the Popover before the leaveDelay is expired.
	 */
	disableInteractive?: boolean;
	/**
	 * Do not respond to long press touch events.
	 */
	disableTouchListener?: boolean;
	/**
	 * The number of milliseconds to wait before showing the Popover. This prop won't impact the enter touch delay (enterTouchDelay).
	 */
	enterDelay: number;
	/**
	 * The number of milliseconds to wait before showing the Popover when one was already recently opened.
	 */
	enterNextDelay: number;
	/**
	 * The number of milliseconds a user must touch the element before showing the Popover.
	 */
	enterTouchDelay?: number;
	/**
	 * 	If true, the Popover follow the cursor over the wrapped element.
	 */
	followCursor?: boolean;
	/**
	 * The number of milliseconds to wait before hiding the Popover. This prop won't impact the leave touch delay (leaveTouchDelay).
	 */
	leaveDelay: number;
	/**
	 * 	The number of milliseconds after the user stops touching an element before hiding the Popover.
	 */
	leaveTouchDelay?: number;
	/**
	 * 	Callback fired when the component requests to be closed.
	 */
	onClose?: (event: Event | React.SyntheticEvent) => void;
	/**
	 * 	Callback fired when the component requests to be open.
	 */
	onOpen?: (event: Event | React.SyntheticEvent) => void;
	/**
	 * 	Popover placement.
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
}

const SolacePopover = ({
	id,
	open,
	title,
	arrow,
	describeChild,
	disableFocusListener,
	disableHoverListener,
	disableInteractive,
	disableTouchListener,
	enterDelay = 500, //Popover appears with 500ms delay
	enterNextDelay = 500,
	enterTouchDelay,
	followCursor,
	leaveDelay,
	leaveTouchDelay,
	placement,
	onOpen,
	onClose,
	children
}: SolacePopoverProps) => {
	return (
		<StyledTooltip
			id={id}
			open={open}
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
			onClose={onOpen}
			onOpen={onClose}
			placement={placement}
			// fade-in & fade-out
			TransitionComponent={Fade}
			// Popover fade in duration 150ms, fade out duration 1000ms
			TransitionProps={{ timeout: { enter: 150, exit: 1000 } }}
		>
			{children}
		</StyledTooltip>
	);
};

export default SolacePopover;
