import React, { useState } from "react";
import { Popover, styled } from "@material-ui/core";

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
	anchorElement: Element | ((element: Element) => Element) | null | undefined;
	/**
	 * The content of the Popover component.
	 */
	children: JSX.Element;
}

const MyPopover = styled(Popover)(({ theme }) => ({
	color: theme.palette.error.main,
	pointerEvents: "none",
	".MuiPaper-root.MuiPopover-paper": {
		pointerEvents: "auto",
		color: "orange"
	}
}));

// const MyPopover = styled(Popover, {
// 	shouldForwardProp: (prop) => prop !== "color"
// })<{ color?: string }>(({ color }) => ({
// 	pointerEvents: "none",
// 	color: color,
// 	".MuiPaper-root.MuiPopover-paper": {
// 		pointerEvents: "auto",
// 		color: color
// 	}
// }));

// interface PopoverContentProps{

// }

// const PopoverContent = styled("div")(({theme})=>({

// }))

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
	// const [popoverOpen, setPopoverOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<any>(null);
	// const popoverAnchor = useRef(null);
	// console.log(popoverAnchor);

	const handlePopoverOpen = (event: any) => {
		console.log(event.currentTarget);
		// setAnchorEl(event.currentTarget);
		setAnchorEl(anchorElement);
		// setPopoverOpen(true);
	};

	const handlePopoverClose = (event: any) => {
		console.log("close");
		console.log(event.target);
		setAnchorEl(null);
		// setPopoverOpen(false);
	};

	const popoverOpen = Boolean(anchorEl);

	return (
		<React.Fragment>
			<div
				id={id}
				// ref={popoverAnchor}
				aria-owns={popoverOpen ? "mouse-over-popover" : undefined}
				aria-haspopup="true"
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
			>
				{anchorElement}
			</div>
			<MyPopover
				color="orange"
				// sx={{
				// 	pointerEvents: "none"
				// }}
				open={popoverOpen}
				anchorEl={anchorEl} // this is critical
				anchorReference={anchorReference}
				anchorOrigin={anchorOrigin}
				anchorPosition={anchorPosition}
				transformOrigin={transformOrigin}
				disableRestoreFocus
				marginThreshold={marginThreshold}
				PaperProps={{ onMouseEnter: handlePopoverOpen, onMouseLeave: handlePopoverClose }}
			>
				<div
					style={{
						padding: "16px",
						borderRadius: "4px",
						backgroundColor: "#fff",
						boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)"
					}}
				>
					{children}
				</div>
				{/* {children} */}
			</MyPopover>
		</React.Fragment>
	);
};

export default SolacePopover;
