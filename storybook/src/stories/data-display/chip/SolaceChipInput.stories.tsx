import { Meta } from "@storybook/react";
import { SolaceChip, MODES, STATUSES, CHIP_VARIANT } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

(SolaceChip as React.FC & { displayName?: string }).displayName = "SolaceChip";

export default {
	title: "Data Display/Chip/Input",
	component: SolaceChip,
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceChip"
			}
		}
	},
	argTypes: {
		label: {
			control: { type: "text" },
			description:
				"The content to be displayed in the input chip. Can be a string or JSX element for more complex content. Input chips are typically used for user-entered values that can be edited or removed.",
			table: {
				type: { summary: "string | React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		variant: {
			options: [CHIP_VARIANT.FILLED, CHIP_VARIANT.OUTLINED],
			control: { type: "radio" },
			description:
				"The visual style variant of the input chip. 'filled' provides a solid background for high visibility, while 'outlined' provides a border-only style for more subtle appearance. https://github.com/SolaceDev/maas-react-components/blob/main/src/types/solaceChip.ts",
			table: {
				type: { summary: '"filled" | "outlined"' },
				defaultValue: { summary: '"filled"' }
			}
		},
		disabled: {
			control: { type: "boolean" },
			description:
				"If true, the input chip will be disabled and non-interactive. Use this when the chip represents read-only data or when editing is not allowed in the current context.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		clickable: {
			control: { type: "boolean" },
			description:
				"If true, the input chip will be clickable and show hover effects. This enables interaction for editing or selecting the chip value.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		mode: {
			options: [MODES.LIGHT_MODE, MODES.DARK_MODE],
			control: { type: "radio" },
			description:
				"The color mode for the input chip. Controls the overall color scheme to match the application's theme. https://github.com/SolaceDev/maas-react-components/blob/main/src/types/modes.ts",
			table: {
				type: { summary: '"light" | "dark"' },
				defaultValue: { summary: '"light"' }
			}
		},
		status: {
			options: [STATUSES.NO_STATUS, STATUSES.ERROR_STATUS],
			control: { type: "radio" },
			description:
				"The validation status of the input chip. Use 'error' to indicate invalid input that needs user attention. https://github.com/SolaceDev/maas-react-components/blob/main/src/types/statuses.ts",
			table: {
				type: { summary: '"no-status" | "error"' },
				defaultValue: { summary: '"no-status"' }
			}
		},
		onDelete: {
			control: false,
			description:
				"Callback function that fires when the delete button is clicked. When provided, a delete button will be added to the chip for removing the input value.",
			table: {
				type: { summary: "(event: React.MouseEvent<HTMLButtonElement>) => void" },
				defaultValue: { summary: "undefined" }
			}
		},
		onClick: {
			control: false,
			description:
				"Callback function that fires when the input chip is clicked. Only functional when the 'clickable' prop is true.",
			table: {
				type: { summary: "(event: React.MouseEvent<HTMLDivElement>) => void" },
				defaultValue: { summary: "undefined" }
			}
		},
		maxWidth: {
			control: { type: "number" },
			description:
				"Maximum width of the input chip in pixels. When the content exceeds this width, it will be truncated with an ellipsis.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify input chips during automated testing.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data attribute for additional tagging. Use this for analytics, tracking, or additional metadata.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
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
