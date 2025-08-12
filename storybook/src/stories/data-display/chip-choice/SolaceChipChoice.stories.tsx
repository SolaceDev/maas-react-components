/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Meta } from "@storybook/react";
import { SolaceChip, MODES, STATES, CHIP_VARIANT } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

(SolaceChip as React.FC & { displayName?: string }).displayName = "SolaceChip";

export default {
	title: "Data Display/Chip/Choice",
	component: SolaceChip,
	parameters: {},
	argTypes: {
		label: {
			control: { type: "text" },
			description:
				"The content to be displayed in the choice chip. Can be a string or JSX element for more complex content. Choice chips are typically used for single or multiple selection scenarios.",
			table: {
				type: { summary: "string | React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		variant: {
			options: [CHIP_VARIANT.FILLED, CHIP_VARIANT.OUTLINED],
			control: { type: "radio" },
			description:
				"The visual style variant of the choice chip. 'filled' provides a solid background when selected, while 'outlined' provides a border-only style that's common for choice chips. https://github.com/SolaceDev/maas-react-components/blob/main/src/types/solaceChip.ts",
			table: {
				type: { summary: '"filled" | "outlined"' },
				defaultValue: { summary: '"outlined"' }
			}
		},
		disabled: {
			control: { type: "boolean" },
			description:
				"If true, the choice chip will be disabled and non-interactive. Use this when the choice is not available in the current context.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		clickable: {
			control: { type: "boolean" },
			description:
				"If true, the choice chip will be clickable and show hover effects. This should typically be true for choice chips to enable selection.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" }
			}
		},
		mode: {
			options: [MODES.LIGHT_MODE, MODES.DARK_MODE],
			control: { type: "radio" },
			description:
				"The color mode for the choice chip. Controls the overall color scheme to match the application's theme. https://github.com/SolaceDev/maas-react-components/blob/main/src/types/modes.ts",
			table: {
				type: { summary: '"light" | "dark"' },
				defaultValue: { summary: '"light"' }
			}
		},
		state: {
			options: [STATES.NOT_SELECTED, STATES.ACTIVE],
			control: { type: "radio" },
			description:
				"The selection state of the choice chip. 'active' indicates the chip is selected, 'not-selected' indicates it's available but not chosen. https://github.com/SolaceDev/maas-react-components/blob/main/src/types/states.ts",
			table: {
				type: { summary: '"not-selected" | "active"' },
				defaultValue: { summary: '"not-selected"' }
			}
		},
		onClick: {
			control: false,
			description:
				"Callback function that fires when the choice chip is clicked. Essential for handling selection state changes."
		},
		maxWidth: {
			control: { type: "number" },
			description:
				"Maximum width of the choice chip in pixels. When the content exceeds this width, it will be truncated with an ellipsis.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify choice chips during automated testing.",
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

const CLICK_ACTION_TEXT = "Input button clicked";

export const DefaultActiveChoiceChip = {
	args: {
		label: "Default Choice Chip (Active)",
		variant: CHIP_VARIANT.OUTLINED,
		state: STATES.ACTIVE,
		clickable: true,
		onClick: action(CLICK_ACTION_TEXT)
	}
};

export const DarkActiveChoiceChip = {
	args: {
		mode: MODES.DARK_MODE,
		label: "Dark Choice Chip (Active)",
		variant: CHIP_VARIANT.OUTLINED,
		state: STATES.ACTIVE,
		clickable: true,
		onClick: action(CLICK_ACTION_TEXT)
	}
};

export const DefaultNotSelectedChoiceChip = {
	args: {
		label: "Default Choice Chip (Not Selected)",
		variant: CHIP_VARIANT.OUTLINED,
		clickable: true,
		onClick: action(CLICK_ACTION_TEXT)
	}
};

export const DarkNotSelectedChoiceChip = {
	args: {
		mode: MODES.DARK_MODE,
		label: "Dark Choice Chip (Not Selected)",
		variant: CHIP_VARIANT.OUTLINED,
		clickable: true,
		onClick: action(CLICK_ACTION_TEXT)
	}
};
