/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A functional component that wraps the Material-UI `Popover` component with additional
 * customization options and props. This component is used to display content in a popover
 * anchored to a specific element or position.
 *
 * @param props - The properties to configure the `SolacePopover` component.
 * @param props.id - The unique identifier for the popover.
 * @param props.key - A React key for the component.
 * @param props.anchorElement - The element to which the popover is anchored.
 * @param props.anchorPosition - The position to anchor the popover, if specified.
 * @param props.anchorOrigin - The origin point for the popover's anchor.
 * @param props.transformOrigin - The origin point for the popover's transformation.
 * @param props.open - A boolean indicating whether the popover is open.
 * @param props.dataQa - A data attribute for QA purposes.
 * @param props.dataTags - A data attribute for tagging purposes.
 * @param props.children - The content to be displayed inside the popover.
 * @param props.onClose - A callback function triggered when the popover is closed.
 * @param props.marginThreshold - The margin threshold for the popover's positioning.
 * @param props.activateOnHover - A boolean indicating whether the popover should activate on hover.
 * @param props.additionalProps - Additional props to be passed to the `Popover` component.
 *
 * @returns A Material-UI `Popover` component with the provided configuration and content.
 *
 * @example
 * ```tsx
 * import React, { useState } from "react";
 * import SolacePopover from "./SolacePopover";
 *
 * const Example = () => {
 *   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
 *   const [open, setOpen] = useState(false);
 *
 *   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
 *     setAnchorEl(event.currentTarget);
 *     setOpen(true);
 *   };
 *
 *   const handleClose = () => {
 *     setAnchorEl(null);
 *     setOpen(false);
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleClick}>Open Popover</button>
 *       <SolacePopover
 *         id="example-popover"
 *         open={open}
 *         anchorElement={anchorEl}
 *         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
 *         transformOrigin={{ vertical: "top", horizontal: "center" }}
 *         onClose={handleClose}
 *       >
 *         <div style={{ padding: "16px" }}>This is the content of the popover.</div>
 *       </SolacePopover>
 *     </div>
 *   );
 * };
 *
 * export default Example;
 * ```
 */
import Popover from "@mui/material/Popover";
import { SolacePopoverProps } from "../types/solacePopover";

const SolacePopover = (props: SolacePopoverProps) => {
	const {
		id,
		key,
		anchorElement,
		anchorPosition,
		anchorOrigin,
		transformOrigin,
		open,
		dataQa,
		dataTags,
		children,
		onClose,
		marginThreshold,
		activateOnHover,
		...additionalProps
	} = props;
	// Determine the anchorReference based on the presence of anchorPosition
	const anchorRef = anchorPosition ? "anchorPosition" : "anchorEl";

	// Return the Popover component with the provided props and handlers
	return (
		<Popover
			id={id}
			open={open}
			anchorReference={anchorRef}
			anchorOrigin={anchorOrigin}
			transformOrigin={transformOrigin}
			anchorPosition={anchorPosition}
			anchorEl={anchorElement}
			key={key}
			classes={{ paper: "SolacePopover" }}
			data-qa={dataQa}
			data-tags={dataTags}
			onClose={onClose}
			marginThreshold={marginThreshold}
			sx={{ pointerEvents: activateOnHover ? "none" : "auto" }}
			{...additionalProps}
		>
			{children}
		</Popover>
	);
};

SolacePopover.displayName = "SolacePopover";

export default SolacePopover;
