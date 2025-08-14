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

import React, { useState } from "react";
import { Meta } from "@storybook/react";

import { SolaceChipTextArea } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { within, userEvent } from "@storybook/test";

// Constants for reuse
const DEMO_TITLE = "Demo Chip Text Area";
const DEMO_LABEL = "Demo Label";
const DEMO_PLACEHOLDER = "Enter email addresses (Placeholder)";
const DEMO_HELPER_TEXT = "This is helper text for the text area";
const DEMO_EMAIL = "demo@example.com";

(SolaceChipTextArea as React.FC & { displayName?: string }).displayName = "SolaceChipTextArea";

const emailValidationFunction = (text: string): string | undefined => {
	if (!text) return undefined;

	// Simple regex for email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(text) ? undefined : "Invalid email format";
};

export default {
	title: "Input/Textfield/Text Area with Chips",
	component: SolaceChipTextArea,
	parameters: {
		docs: {
			description: {
				component:
					"Chip Text Area component for entering texts separated by comma, semi colon or space- that get converted into chips. Code component name: SolaceChipTextArea"
			}
		}
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description:
				"Unique identifier for the chip textarea component. If not specified, name value will be used to make label and helperText accessible for screen readers.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		name: {
			control: { type: "text" },
			description: "Name attribute to assign to the input element.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		label: {
			control: { type: "text" },
			description: "The label content to display on the screen.",
			table: {
				type: { summary: "string | JSX.Element" },
				defaultValue: { summary: "undefined" }
			}
		},
		value: {
			control: { type: "text" },
			description: "The value of the input element, required for controlled component.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		helperText: {
			control: { type: "text" },
			description: "Content to display as supportive/explanatory text.",
			table: {
				type: { summary: "string | JSX.Element" },
				defaultValue: { summary: "undefined" }
			}
		},
		maxLength: {
			control: { type: "number" },
			description: "The maximum number of characters which can be typed as the input value.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "constants.maxLength" }
			}
		},
		title: {
			control: { type: "text" },
			description: "The text to display as the tooltip hint.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		autoFocus: {
			control: { type: "boolean" },
			description: "Boolean flag to control whether the input element is focused during first mount.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		hasErrors: {
			control: { type: "boolean" },
			description: "Boolean flag to mark the input in error state.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		hasWarnings: {
			control: { type: "boolean" },
			description:
				"If true, displays the chip textarea in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the chip textarea content.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		required: {
			control: { type: "boolean" },
			description: "Boolean flag used to display an indicator of whether or not this input is mandatory.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		inlineLabel: {
			control: { type: "boolean" },
			description:
				"Boolean flag to control whether to stack the label on top of the input element (false) or place them inline to one another (true).",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		width: {
			control: { type: "text" },
			description: "Custom width of the component.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		onChange: {
			description: "Callback function to trigger whenever the value of the input is changed."
		},
		onBlur: {
			description: "Callback function to trigger whenever the element of the input loses focus."
		},
		onKeyDown: {
			description: "Callback function to trigger whenever the element of the input receives key down event."
		},
		onKeyUp: {
			description: "Callback function to trigger whenever the element of the input receives key up event."
		},
		onFocus: {
			description: "Callback function to trigger whenever the element of the input is focused."
		},
		validateChip: {
			description:
				"Callback function to validate the text before converting to a chip. Returns undefined if valid, or an error message if invalid."
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data attribute for additional tagging.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceChipTextArea>;

/**
 * Play function to simulate typing an email and converting it to a chip
 */
const simulateTypingEmail = async ({ canvasElement }) => {
	const canvas = within(canvasElement);

	// Find the input element
	const inputElement = canvas.getByRole("textbox");

	// Focus the input
	await userEvent.click(inputElement);

	// Type the email character by character with a slight delay
	const email = "a@test.com,b@test.com";

	// Type each character with a small delay to make it visible
	for (const char of email) {
		await userEvent.type(inputElement, char, { delay: 50 });
	}

	// Press Enter to convert to chip
	await userEvent.keyboard("{Enter}");

	// Add a small delay to see the result
	await new Promise((resolve) => setTimeout(resolve, 100));
};

export const DefaultTextAreaWithChips = {
	args: {
		onChange: action("onChange"),
		title: DEMO_TITLE,
		id: "demoChipTextAreaId",
		name: "demoChipTextArea",
		value: "", // Start with empty value to demonstrate typing
		placeholder: DEMO_PLACEHOLDER,
		helperText: DEMO_HELPER_TEXT,
		label: DEMO_LABEL
	},
	play: simulateTypingEmail
};

export const WithPredefinedChips = {
	args: {
		onChange: action("onChange"),
		title: DEMO_TITLE,
		id: "demoChipTextAreaId",
		name: "demoChipTextArea",
		placeholder: DEMO_PLACEHOLDER,
		helperText: DEMO_HELPER_TEXT,
		label: DEMO_LABEL,
		validateChip: emailValidationFunction,
		value: `${DEMO_EMAIL}, another@example.com`
	}
};

export const WithValidationErrors = {
	args: {
		onChange: action("onChange"),
		title: DEMO_TITLE,
		id: "demoChipTextAreaId",
		name: "demoChipTextArea",
		placeholder: DEMO_PLACEHOLDER,
		helperText: DEMO_HELPER_TEXT,
		label: DEMO_LABEL,
		validateChip: emailValidationFunction,
		value: `${DEMO_EMAIL}, invalid-email`,
		hasErrors: true
	}
};

export const CustomWidth = {
	args: {
		onChange: action("onChange"),
		title: DEMO_TITLE,
		id: "demoChipTextAreaId",
		name: "demoChipTextArea",
		placeholder: DEMO_PLACEHOLDER,
		helperText: DEMO_HELPER_TEXT,
		label: DEMO_LABEL,
		validateChip: emailValidationFunction,
		width: "50%"
	}
};

export const CustomValidation = {
	args: {
		onChange: action("onChange"),
		title: DEMO_TITLE,
		id: "demoChipTextAreaId",
		name: "demoChipTextArea",
		placeholder: DEMO_PLACEHOLDER,
		helperText: "Only example.com email addresses are allowed",
		label: DEMO_LABEL,
		validateChip: (text: string) => {
			if (!text.endsWith("@example.com")) {
				return "Only example.com email addresses are allowed";
			}
			return undefined;
		}
	}
};

const ControlledComponent = ({ name, ...args }): JSX.Element => {
	const [value, setValue] = useState<string>(args.value || "");

	const handleChange = (e) => {
		setValue(e.value);
		action("onChange")(e);
	};

	return <SolaceChipTextArea value={value} name={name} onChange={handleChange} {...args} />;
};

export const Controlled = {
	render: ControlledComponent,

	args: {
		name: "controlledChipTextArea",
		label: "Controlled Chip Text Area",
		validateChip: emailValidationFunction,
		placeholder: DEMO_PLACEHOLDER,
		helperText: "The value of the text area is controlled by the change handler in the story.",
		value: DEMO_EMAIL
	}
};
