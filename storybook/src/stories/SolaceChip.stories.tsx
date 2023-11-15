import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceChip, SolacePopover, SolaceTooltip, CHIP_VARIANT, InfoIcon } from "@SolaceDev/maas-react-components";

export default {
	title: "Under Construction/SolaceChip",
	component: SolaceChip,
	parameters: {},
	argTypes: {
		label: {},
		variant: {
			options: [CHIP_VARIANT.FILLED, CHIP_VARIANT.OUTLINED],
			control: { type: "radio" }
		}
	}
} as ComponentMeta<typeof SolaceChip>;

// custom Popover component
const CustomPopoverText = () => {
	return (
		<div>
			<p style={{ fontWeight: 200 }}>Shared From</p>
			<p style={{ fontWeight: "bold" }}>Domain ABCDEFGHIJKL</p>
		</div>
	);
};

const Template: ComponentStory<typeof SolaceChip> = (args) => <SolaceChip {...args} />;

const PopoverTemplate: ComponentStory<typeof SolaceChip> = (args) => {
	return (
		<SolacePopover title={<CustomPopoverText />} placement="right-end">
			<span>
				<SolaceChip {...args} />
			</span>
		</SolacePopover>
	);
};

export const DefaultChip = Template.bind({});
DefaultChip.args = {
	label: "Default Chip"
};

export const ChipWithPopover = PopoverTemplate.bind({});
ChipWithPopover.args = {
	label: "Chip With Popover"
};

export const ChipWithTooltip = Template.bind({});
ChipWithTooltip.args = {
	label: <SolaceTooltip title="This is a tooltip when you hover over an choice chip">Hover Over Me</SolaceTooltip>
};

export const TruncatedChip = Template.bind({});
TruncatedChip.args = {
	label: <SolaceTooltip title="Choice Chip With Long Content">Choice Chip With Long Content</SolaceTooltip>,
	maxWidth: 100
};

export const ChipWithLeadingIcon = Template.bind({});
ChipWithLeadingIcon.args = {
	label: "Chip with icon",
	icon: <InfoIcon size={14} fill="green" />
};
