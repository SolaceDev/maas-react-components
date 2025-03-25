import { Tooltip, Fade } from "@mui/material";
import SolaceComponentProps from "./SolaceComponentProps";

// Define the props interface for SolacePopover component
interface SolacePopoverProps extends SolaceComponentProps {
	// Optional id for accessibility, falls back to a randomly generated id by MUI if not provided
	id?: string;
	// Popover title, not displayed if it's an empty string
	title?: string | JSX.Element;
	// Reference element for the popover, must be able to hold a ref
	children: JSX.Element;
	// Disable focus listener for showing the tooltip, defaults to false
	disableFocusListener?: boolean;
	// Disable hover listener for showing the popover, defaults to false
	disableHoverListener?: boolean;
	// Popover placement options
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
	// Tooltip maximum width, defaults to small
	maxWidth?: "small" | "medium" | "full";
	// Delay in milliseconds before showing the tooltip, defaults to 500ms
	enterDelay?: number;
	// Delay in milliseconds before showing the tooltip when one was recently opened, defaults to 0ms
	enterNextDelay?: number;
	// Flag to enable/disable the animation, defaults to true
	useAnimation?: boolean;
}

// SolacePopover functional component
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
	maxWidth = "small",
	useAnimation = true
}: SolacePopoverProps) => {
	// Return the Tooltip component with the provided props and handlers
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
			slots={{ transition: useAnimation ? Fade : undefined }}
			slotProps={{
				transition: { timeout: { enter: useAnimation ? 150 : undefined, exit: useAnimation ? 200 : undefined } }
			}}
		>
			{children}
		</Tooltip>
	);
};

export default SolacePopover;
