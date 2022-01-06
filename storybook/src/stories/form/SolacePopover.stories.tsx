import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceButton, SolacePopover } from "@SolaceDev/maas-react-components";

export default {
	title: "Forms/SolacePopover",
	component: SolacePopover,
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
} as ComponentMeta<typeof SolacePopover>;

const Template: ComponentStory<typeof SolacePopover> = (args) => <SolacePopover {...args} />;

export const DefaultButtonPopover = () => {
	const renderPopoverContent = () => {
		return <div>Popover content</div>;
	};
	return (
		<div>
			<SolacePopover anchorElement={<SolaceButton variant="text">Hover to show Popover</SolaceButton>}>
				{renderPopoverContent()}
			</SolacePopover>
		</div>
	);
};

export const PositionedButtonPopover = () => {
	const renderPopoverContent = () => {
		return <div>Popover content is now positioned to the bottom left of the button</div>;
	};
	return (
		<div>
			<SolacePopover
				anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
				transformOrigin={{ horizontal: "left", vertical: "top" }}
				anchorElement={<SolaceButton variant="text">Hover to show Popover</SolaceButton>}
			>
				{renderPopoverContent()}
			</SolacePopover>
		</div>
	);
};

export const PositionedPopover = Template.bind({});
PositionedPopover.args = {
	anchorOrigin: { horizontal: "right", vertical: "top" },
	transformOrigin: { horizontal: "left", vertical: "top" },
	anchorElement: <div>This is the anchor element</div>,
	children: <div>The is the popover element</div>
};
