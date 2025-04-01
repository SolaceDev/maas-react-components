import React from "react";
import { StoryFn, Meta, Decorator } from "@storybook/react";
import {
	SolaceTag,
	CHIP_VARIANT,
	SolaceTooltip,
	CHIP_COLORS,
	InfoIcon,
	TooltipVariant
} from "@SolaceDev/maas-react-components";
import { userEvent, within } from "@storybook/test";

(SolaceTag as React.FC & { displayName?: string }).displayName = "SolaceTag";

// Create a decorator to include the tooltip & popover inside the snapshot"
const withSnapshotContainer: Decorator = (Story) => {
	return (
		<div id="snapshot" style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}>
			<div style={{ margin: "16px" }}>
				<Story />
			</div>
		</div>
	);
};

export default {
	title: "Data Display/Badge/Tag",
	component: SolaceTag,
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceTag"
			}
		}
	},
	argTypes: {
		label: {},
		variant: {
			options: [CHIP_VARIANT.FILLED, CHIP_VARIANT.OUTLINED],
			control: { type: "radio" }
		}
	}
} as Meta<typeof SolaceTag>;

// custom Popover component
const CustomPopoverText = () => {
	return (
		<div>
			<p style={{ fontWeight: 200 }}>Shared From</p>
			<p style={{ fontWeight: "bold" }}>Domain ABCDEFGHIJKL</p>
		</div>
	);
};

const Template: StoryFn<typeof SolaceTag> = (args) => <SolaceTag {...args} />;

const PopoverTemplate: StoryFn<typeof SolaceTag> = (args) => {
	return (
		<SolaceTooltip variant={TooltipVariant.rich} title={<CustomPopoverText />} placement="right-end">
			<span>
				<SolaceTag {...args} />
			</span>
		</SolaceTooltip>
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
HoverableTag.decorators = [withSnapshotContainer];

HoverableTag.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const targetElement = await canvas.getByText("Hoverable Tag");
	await userEvent.hover(targetElement);
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
TruncatedTextTag.decorators = [withSnapshotContainer];

TruncatedTextTag.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const targetElement = await canvas.getByText("Choice Chip With Long Content");
	await userEvent.hover(targetElement);
};

export const WithLeadingIcon = Template.bind({});
WithLeadingIcon.args = {
	label: "Tag with icon",
	icon: <InfoIcon size={14} fill="green" />
};
