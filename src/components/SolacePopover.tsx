import { Tooltip, Fade } from "@mui/material";
import SolaceComponentProps from "./SolaceComponentProps";
import { useCallback, useRef, useState } from "react";
import { isEmpty } from "lodash";

interface SolacePopoverProps extends SolaceComponentProps {
	/**
	 * This prop is used to help implement the accessibility logic. If you don't provide this prop. It falls back to a randomly generated id by Mui
	 */
	id?: string;
	/**
	 * 	Popover title. Zero-length titles string are never displayed.
	 */
	title?: string | JSX.Element;
	/**
	 * Popover reference element. Note: Needs to be able to hold a ref.
	 */
	children: JSX.Element;
	/**
	 * Disable listener to show tooltip when referenced element is focused, default to false
	 */
	disableFocusListener?: boolean;
	/**
	 * Disable listener to show popover when referenced element is hovered, default to false
	 */
	disableHoverListener?: boolean;
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

	/**
	 * Tooltip maximum width, default to small
	 */
	maxWidth?: "small" | "medium" | "full";
	/**
	 * The number of milliseconds to wait before showing the tooltip. Default is 500ms
	 */
	enterDelay?: number;
	/**
	 * The number of milliseconds to wait before showing the tooltip when one was already recently opened. Default is 0ms
	 */
	enterNextDelay?: number;
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

const SolacePopover = ({
	id,
	title,
	placement,
	disableFocusListener = false,
	disableHoverListener = false,
	dataQa,
	dataTags,
	children,
	enterDelay = 500,
	enterNextDelay = 0,
	open,
	onOpen,
	onClose,
	maxWidth = "small"
}: SolacePopoverProps) => {
	const [internalOpen, setInternalOpen] = useState(false);
	const textElementRef = useRef<HTMLDivElement>(null);

	const handleOpen = useCallback(
		(event: React.SyntheticEvent) => {
			// if empty, don't open the tooltip.
			if (isEmpty(title)) {
				return;
			}
			let shouldOpen = true;
			if (textElementRef.current && textElementRef.current.scrollWidth <= textElementRef.current.clientWidth) {
				shouldOpen = false;
			}
			if (shouldOpen) {
				setInternalOpen(true);
				if (onOpen) {
					onOpen(event);
				}
			}
		},
		[onOpen, title]
	);

	const handleClose = useCallback(
		(event: Event | React.SyntheticEvent<Element, Event>) => {
			setInternalOpen(false);
			if (onClose) {
				onClose(event);
			}
		},
		[onClose]
	);

	return (
		<Tooltip
			id={id}
			title={title || ""}
			classes={{ tooltip: `SolacePopover ${maxWidth ? maxWidth + "Width" : ""}` }}
			data-qa={dataQa}
			data-tags={dataTags}
			disableFocusListener={disableFocusListener}
			disableHoverListener={disableHoverListener}
			enterDelay={enterDelay}
			enterNextDelay={enterNextDelay}
			leaveDelay={0}
			placement={placement}
			TransitionComponent={Fade}
			TransitionProps={{ timeout: { enter: 150, exit: 200 } }}
			open={open ?? internalOpen}
			onOpen={handleOpen}
			onClose={handleClose}
		>
			{children}
		</Tooltip>
	);
};

export default SolacePopover;
