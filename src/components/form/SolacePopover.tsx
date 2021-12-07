import React from "react";
import { Popover } from "@material-ui/core";

export interface SolacePopoverProps {
	/**
	 * unique identifier for the component
	 */
	id?: string;
	/**
	 * This is the point on the anchor where the popover's anchorEl will attach to.
	 */
	anchorOrigin?: { horizontal: "center" | "left" | "right" | number; vertical: "bottom" | "center" | "top" | number };
	/**
	 * This is the position that may be used to set the position of the popover.
	 * The coordinates are relative to the application's client area.
	 */
	anchorPosition?: { left: number; top: number };
	/**
	 * This is the point on the popover which will attach to the anchor's origin.
	 */
	transformOrigin?: {
		horizontal: "center" | "left" | "right" | number;
		vertical: "bottom" | "center" | "top" | number;
	};
	/**
	 * This determines which anchor prop to refer to when setting the position of the popover. Default to "anchorEl"
	 */
	anchorReference?: "anchorEl" | "anchorPosition" | "none";
	/**
	 * Specifies how close to the edge of the window the popover can appear.
	 */
	marginThreshold?: number;
	/**
	 * The React component that displays the popover when hovered over
	 */
	anchorElement: JSX.Element;
	/**
	 * The content of the Popover component.
	 */
	children: JSX.Element;
}

const SolacePopover = ({
	id,
	anchorOrigin,
	anchorPosition,
	transformOrigin,
	anchorReference,
	marginThreshold,
	anchorElement,
	children
}: SolacePopoverProps): JSX.Element => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		console.log(event.currentTarget);
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<React.Fragment>
			<div
				id={id}
				aria-owns={open ? "mouse-over-popover" : undefined}
				aria-haspopup="true"
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
			>
				{anchorElement}
			</div>
			<Popover
				sx={{ pointerEvents: "none" }}
				open={open}
				anchorEl={anchorEl}
				anchorReference={anchorReference}
				anchorOrigin={anchorOrigin}
				anchorPosition={anchorPosition}
				transformOrigin={transformOrigin}
				onClose={handlePopoverClose}
				disableRestoreFocus
				marginThreshold={marginThreshold}
			>
				{children}
			</Popover>
		</React.Fragment>
	);
};

export default SolacePopover;
