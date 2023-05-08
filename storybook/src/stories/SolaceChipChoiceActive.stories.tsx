import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceChip, MODES, STATES, CHIP_VARIANT } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

export default {
	title: "Under Construction/SolaceChip/Choice Chip/Active",
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
		},
		state: {
			options: [STATES.NOT_SELECTED, STATES.ACTIVE],
			control: { type: "radio" }
		}
	}
} as ComponentMeta<typeof SolaceChip>;

const CLICK_ACTION_TEXT = "Input button clicked";
const Template: ComponentStory<typeof SolaceChip> = (args) => <SolaceChip {...args} />;

export const DefaultActiveChoiceChip = Template.bind({});
DefaultActiveChoiceChip.args = {
	label: "Default Choice Chip (Active)",
	variant: CHIP_VARIANT.OUTLINED,
	state: STATES.ACTIVE,
	clickable: true,
	onClick: action(CLICK_ACTION_TEXT)
};

export const DarkActiveChoiceChip = Template.bind({});
DarkActiveChoiceChip.args = {
	mode: MODES.DARK_MODE,
	label: "Dark Choice Chip (Active)",
	variant: CHIP_VARIANT.OUTLINED,
	state: STATES.ACTIVE,
	clickable: true,
	onClick: action(CLICK_ACTION_TEXT)
};
