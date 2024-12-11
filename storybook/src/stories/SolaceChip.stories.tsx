import React from "react";
import { Meta, StoryFn, Decorator } from "@storybook/react";
import { SolaceChip, SolacePopover, SolaceTooltip, CHIP_VARIANT, InfoIcon } from "@SolaceDev/maas-react-components";
import { userEvent, within } from "@storybook/test";

(SolaceChip as React.FC & { displayName?: string }).displayName = "SolaceChip";
(SolacePopover as React.FC & { displayName?: string }).displayName = "SolacePopover";
(SolaceTooltip as React.FC & { displayName?: string }).displayName = "SolaceTooltip";

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
} as Meta<typeof SolaceChip>;

// custom Popover component
const CustomPopoverText = () => {
	return (
		<div>
			<p style={{ fontWeight: 200 }}>Shared From</p>
			<p style={{ fontWeight: "bold" }}>Domain ABCDEFGHIJKL</p>
		</div>
	);
};

const Template: StoryFn<typeof SolaceChip> = (args) => <SolaceChip {...args} />;

const PopoverTemplate: StoryFn<typeof SolaceChip> = (args) => {
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
ChipWithPopover.decorators = [withSnapshotContainer];
ChipWithPopover.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const targetElement = await canvas.getByText("Chip With Popover");
	await userEvent.hover(targetElement);
};

export const ChipWithTooltip = Template.bind({});
ChipWithTooltip.args = {
	label: <SolaceTooltip title="This is a tooltip when you hover over an choice chip">Hover Over Me</SolaceTooltip>
};
ChipWithTooltip.decorators = [withSnapshotContainer];
ChipWithTooltip.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const targetElement = await canvas.getByText("Hover Over Me");
	await userEvent.hover(targetElement);
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
