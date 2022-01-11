import React, { useState } from "react";
import { ComponentMeta } from "@storybook/react";

import { SolaceButton, SolacePopper } from "@SolaceDev/maas-react-components";

export default {
	title: "Forms/SolacePopper",
	component: SolacePopper,
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Unique identifier for the popover"
		},
		anchorOrigin: {
			description: "The anchoring position where the popover's anchorEl will attach to",
			table: {
				defaultValue: {
					vertical: "top",
					horizontal: "left"
				}
			}
		},
		anchorPosition: {
			description: "",
			table: {
				defaultValue: {}
			}
		},
		transformOrigin: {
			description: "",
			table: {
				defaultValue: {}
			}
		},
		anchorReference: {
			description: ""
		},
		marginThreshold: {
			control: { type: "number" },
			description: ""
		},
		anchorElement: {
			control: { type: "object" },
			description: ""
		},
		children: {
			control: { type: "object" },
			description: ""
		}
	}
} as ComponentMeta<typeof SolacePopper>;

export const SimplePopover = () => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const renderPopoverContent = () => {
		return <div>Popover content</div>;
	};
	const open = Boolean(anchorEl);
	return (
		<div>
			<SolaceButton variant="outline" onClick={handleClick}>
				Toggle Popper
			</SolaceButton>
			<SolacePopper open={open} anchorEl={anchorEl}>
				{renderPopoverContent()}
			</SolacePopper>
		</div>
	);
};

// export const PositionedButtonPopover = () => {
// 	const renderPopoverContent = () => {
// 		return <div>Popover content is now positioned to the bottom left of the button</div>;
// 	};
// 	return (
// 		<div style={{ border: "1px solid orange" }}>
// 			<SolacePopover
// 				anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
// 				transformOrigin={{ horizontal: "left", vertical: "top" }}
// 				marginThreshold={0}
// 				anchorElement={<div style={{ border: "1px solid red" }}>Hover to show Popover</div>}
// 			>
// 				{renderPopoverContent()}
// 			</SolacePopover>
// 		</div>
// 	);
// };

// export const ScrollPopover = () => {
// 	const renderPopoverContent = () => {
// 		return <div>Popover content is now positioned to the bottom left of the button</div>;
// 	};
// 	return (
// 		<div
// 			style={{
// 				width: "600px",
// 				height: "400px",
// 				border: "1px solid orange",
// 				padding: "10px"
// 			}}
// 		>
// 			<div
// 				style={{
// 					width: "600px",
// 					height: "300px",
// 					border: "1px solid skyblue"
// 				}}
// 			>
// 				Content
// 			</div>
// 			<div
// 				style={{
// 					width: "600px",
// 					height: "auto",
// 					display: "flex",
// 					flexDirection: "row",
// 					justifyContent: "center",
// 					alignItems: "center"
// 				}}
// 			>
// 				<div
// 					style={{
// 						width: "500px",
// 						padding: "40px",
// 						border: "1px solid grey"
// 					}}
// 				>
// 					More content, More content, More content
// 				</div>
// 				<SolacePopover
// 					anchorOrigin={{ horizontal: "right", vertical: "top" }}
// 					transformOrigin={{ horizontal: "right", vertical: 56 }}
// 					anchorElement={<SolaceButton variant="text">Hover me</SolaceButton>}
// 				>
// 					{renderPopoverContent()}
// 				</SolacePopover>
// 			</div>
// 		</div>
// 	);
// };
