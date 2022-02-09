import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceChip } from "@solacedev/maas-react-components";

export default {
	title: "Under Construction/SolaceChip",
	component: SolaceChip,
	parameters: {},
	argTypes: {
		label: {
			control: { type: "text" }
		},
		variant: {
			control: { type: "radio" }
		},
		disabled: {
			control: { type: "boolean" }
		}
	}
} as ComponentMeta<typeof SolaceChip>;

const Template: ComponentStory<typeof SolaceChip> = (args) => <SolaceChip {...args} />;

export const DefaultChip = Template.bind({});
DefaultChip.args = {
	label: "Filled Chip"
};

export const OutlinedChip = Template.bind({});
OutlinedChip.args = {
	label: "Outlined Chip",
	variant: "outlined"
};
