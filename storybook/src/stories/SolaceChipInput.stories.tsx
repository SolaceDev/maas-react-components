import { Meta } from "@storybook/react";
import { SolaceChip, MODES, STATUSES, CHIP_VARIANT } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

export default {
	title: "Under Construction/SolaceChip/Input Chip",
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
		status: {
			options: [STATUSES.NO_STATUS, STATUSES.ERROR_STATUS],
			control: { type: "radio" }
		}
	}
} as Meta<typeof SolaceChip>;

const DELETE_ACTION_TEXT = "Delete icon clicked";
const CLICK_ACTION_TEXT = "Input button clicked";

export const DefaultInputChip = {
	args: {
		label: "Default Input Chip",
		clickable: true,
		onDelete: action(DELETE_ACTION_TEXT),
		onClick: action(CLICK_ACTION_TEXT)
	}
};

export const DarkInputChip = {
	args: {
		mode: MODES.DARK_MODE,
		label: "Dark Input Chip",
		clickable: true,
		onDelete: action(DELETE_ACTION_TEXT),
		onClick: action(CLICK_ACTION_TEXT)
	}
};

export const ErrorInputChip = {
	args: {
		status: STATUSES.ERROR_STATUS,
		label: "Error Input Chip",
		clickable: true,
		onDelete: action(DELETE_ACTION_TEXT),
		onClick: action(CLICK_ACTION_TEXT)
	}
};
