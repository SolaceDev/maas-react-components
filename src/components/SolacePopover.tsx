import { Tooltip, Fade } from "@mui/material";
import SolaceComponentProps from "./SolaceComponentProps";

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
}

const SolacePopover = ({
	id,
	title,
	placement,
	disableHoverListener = false,
	dataQa,
	dataTags,
	children,
	maxWidth = "small"
}: SolacePopoverProps) => {
	return (
		<Tooltip
			id={id}
			title={title || ""}
			classes={{ tooltip: `SolacePopover ${maxWidth ? maxWidth + "Width" : ""}` }}
			data-qa={dataQa}
			data-tags={dataTags}
			disableHoverListener={disableHoverListener}
			enterDelay={500}
			enterNextDelay={0}
			leaveDelay={0}
			placement={placement}
			TransitionComponent={Fade}
			TransitionProps={{ timeout: { enter: 150, exit: 200 } }}
		>
			{children}
		</Tooltip>
	);
};

export default SolacePopover;
