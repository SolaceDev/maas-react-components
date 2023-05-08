import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceChip, MODES, CHIP_VARIANT } from "@SolaceDev/maas-react-components";

export default {
	title: "Under Construction/SolaceChip/Standard Chip",
	component: SolaceChip,
	parameters: {},
	argTypes: {
		label: {},
		variant: {
			options: [CHIP_VARIANT.FILLED, CHIP_VARIANT.OUTLINED],
			control: { type: "radio" }
		},
		disabled: {
			control: { type: "boolean" }
		},
		clickable: {
			control: { type: "boolean" }
		},
		mode: {
			options: [MODES.LIGHT_MODE, MODES.DARK_MODE],
			control: { type: "radio" }
		}
	}
} as ComponentMeta<typeof SolaceChip>;

const Template: ComponentStory<typeof SolaceChip> = (args) => <SolaceChip {...args} />;

export const DefaultStandardChip = Template.bind({});
DefaultStandardChip.args = {
	label: "Default Standard Chip"
};
export const DisabledStandardChip = Template.bind({});
DisabledStandardChip.args = {
	label: "Disabled Standard Chip",
	disabled: true
};

export const DarkStandardChip = Template.bind({});
DarkStandardChip.args = {
	mode: MODES.DARK_MODE,
	label: "Dark Standard Chip"
};

export const DisabledDarkStandardChip = Template.bind({});
DisabledDarkStandardChip.args = {
	mode: MODES.DARK_MODE,
	disabled: true,
	label: "Disabled Dark Standard Chip"
};
