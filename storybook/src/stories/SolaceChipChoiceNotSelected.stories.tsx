import { Meta } from "@storybook/react";
import { SolaceChip, MODES, STATES, CHIP_VARIANT } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

export default {
	title: "Under Construction/SolaceChip/Choice Chip/Not Selected",
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
} as Meta<typeof SolaceChip>;

const CLICK_ACTION_TEXT = "Input button clicked";

export const DefaultNotSelectedChoiceChip = {
	args: {
		label: "Default Choice Chip (Not Selected)",
		variant: "outlined",
		clickable: true,
		onClick: action(CLICK_ACTION_TEXT)
	}
};

export const DarkNotSelectedChoiceChip = {
	args: {
		mode: MODES.DARK_MODE,
		label: "Dark Choice Chip (Not Selected)",
		variant: "outlined",
		clickable: true,
		onClick: action(CLICK_ACTION_TEXT)
	}
};
