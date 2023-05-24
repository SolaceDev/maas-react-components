import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceTag, CHIP_VARIANT, SolacePopover, SolaceTooltip, CHIP_COLORS } from "@SolaceDev/maas-react-components";
import { InfoIcon } from "../../../src/resources/icons/InfoIcon";

export default {
	title: "Under Construction/SolaceTag",
	component: SolaceTag,
	parameters: {},
	argTypes: {
		label: {},
		variant: {
			options: [CHIP_VARIANT.FILLED, CHIP_VARIANT.OUTLINED],
			control: { type: "radio" }
		}
	}
} as ComponentMeta<typeof SolaceTag>;

// custom Popover component
const CustomPopoverText = () => {
	return (
		<div>
			<p style={{ fontWeight: 200 }}>Shared From</p>
			<p style={{ fontWeight: "bold" }}>Domain ABCDEFGHIJKL</p>
		</div>
	);
};

const Template: ComponentStory<typeof SolaceTag> = (args) => <SolaceTag {...args} />;

const PopoverTemplate: ComponentStory<typeof SolaceTag> = (args) => {
	return (
		<SolacePopover title={<CustomPopoverText />} placement="right-end">
			<span>
				<SolaceTag {...args} />
			</span>
		</SolacePopover>
	);
};

export const DefaultTag = Template.bind({});
DefaultTag.args = {
	label: "Default Chip"
};

export const OutlinedTag = Template.bind({});
OutlinedTag.args = {
	label: "Outlined Tag",
	variant: CHIP_VARIANT.OUTLINED
};

export const HoverableTag = PopoverTemplate.bind({});
HoverableTag.args = {
	label: "Hoverable Tag",
	clickable: true
};

export const StyledTag = Template.bind({});
StyledTag.args = {
	label: "Styled Tag",
	fillColor: CHIP_COLORS.INFO_LIGHT_BG_BLUE,
	labelColor: CHIP_COLORS.DARK_GREY
};

export const TruncatedTextTag = Template.bind({});
TruncatedTextTag.args = {
	label: <SolaceTooltip title="Choice Chip With Long Content">Choice Chip With Long Content</SolaceTooltip>,
	maxWidth: 150
};

export const WithLeadingIcon = Template.bind({});
WithLeadingIcon.args = {
	label: "Tag with icon",
	icon: <InfoIcon size={14} fill="green" />
};
