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
import { within, userEvent } from "@storybook/testing-library";
import { Search } from "@mui/icons-material";
import { SolaceTextField, SolaceButton, CloseIcon } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { fn } from "@storybook/test";

(SolaceTextField as React.FC & { displayName?: string }).displayName = "SolaceTextField";
(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";

export default {
	title: "Input/Textfield/Standard",
	component: SolaceTextField,
	args: {
		id: "",
		name: "",
		title: "",
		label: "",
		placeholder: "",
		helperText: "",
		value: "",
		hasErrors: false,
		hasWarnings: false,
		autoFocus: false,
		inlineLabel: false,
		required: false,
		disabled: false,
		readOnly: false,
		type: "text",
		size: undefined,
		width: undefined,
		minWidth: undefined,
		customIcon: undefined,
		endAdornment: undefined,
		dataQa: "",
		dataTags: "",
		onFocus: fn()
	},
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/P5XeF1KE6z2MKyzlEyInrH/Core-Component-Specs-(Copy)?node-id=430%3A548"
		}
	},
	argTypes: {
		label: {
			control: {
				type: "text"
			},
			description:
				"The label text displayed above or inline with the text field. Use this to clearly describe what information the user should enter. Labels should be concise and descriptive.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		helperText: {
			control: {
				type: "text"
			},
			description:
				"Additional text displayed below the input field to provide guidance or error messages. Use this to give users context about expected input format or validation requirements.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		hasErrors: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the text field in an error state with red styling. Use this to indicate validation failures or input errors. Often paired with error text in helperText.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		hasWarnings: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the textfield in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the textfield content.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		autoFocus: {
			control: {
				type: "boolean"
			},
			description:
				"If true, automatically focuses the text field when the component mounts. Use sparingly as it can disrupt user navigation and accessibility. Best for primary input fields on forms.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		inlineLabel: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the label inline with the input field rather than above it. Use this for compact layouts or when you need to save vertical space.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		required: {
			control: {
				type: "boolean"
			},
			description:
				"If true, marks the field as required and displays an asterisk (*) next to the label. Use this to indicate mandatory fields in forms and ensure proper validation.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		disabled: {
			control: {
				type: "boolean"
			},
			description:
				"If true, disables the text field preventing user interaction. Use this when the field is not applicable based on current form state or user permissions.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		readOnly: {
			control: {
				type: "boolean"
			},
			description:
				"If true, makes the text field read-only. Users can see and select the text but cannot edit it. Use this for displaying computed values or information that shouldn't be modified.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		value: {
			control: {
				type: "text"
			},
			description:
				"The current value of the text field. Use this for controlled components where you manage the field state externally. Should be paired with an onChange handler.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		placeholder: {
			control: {
				type: "text"
			},
			description:
				"Placeholder text displayed when the field is empty. Use this to provide examples of expected input format or additional guidance. Should not replace proper labels.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		type: {
			options: ["text", "number", "password", "email", "url"],
			control: {
				type: "select"
			},
			description:
				"The input type which affects validation, keyboard behavior on mobile devices, and browser auto-completion. Choose the most appropriate type for your data to improve user experience.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		size: {
			control: {
				type: "number"
			},
			description:
				"The size attribute for the input field, affecting the visible character width. Use this to hint at the expected input length, but don't rely on it for validation.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "undefined" }
			}
		},
		width: {
			control: {
				type: "text"
			},
			description:
				"The width of the text field. Can be a number (pixels), percentage, or CSS width value. Use this to control the field width within your layout constraints.",
			table: {
				type: { summary: "string | number" },
				defaultValue: { summary: "undefined" }
			}
		},
		minWidth: {
			control: {
				type: "text"
			},
			description:
				"The minimum width of the text field. Prevents the field from becoming too narrow in responsive layouts. Useful for ensuring readability of input content.",
			table: {
				type: { summary: "string | number" },
				defaultValue: { summary: "undefined" }
			}
		},
		name: {
			control: {
				type: "text"
			},
			description:
				"The name attribute for the input field, used for form submission and accessibility. Essential for proper form handling and assistive technology support.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		id: {
			control: { type: "text" },
			description: "Unique identifier for the textfield component. Used for accessibility and programmatic access.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		title: {
			control: {
				type: "text"
			},
			description:
				"The title attribute for the input field, displayed as a tooltip on hover. Use this for additional context or instructions that don't fit in the label or helper text.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		onChange: {
			description:
				"Callback function fired when the input value changes. Receives an event object with the new value. Essential for controlled components and form state management.",
			table: {
				defaultValue: { summary: "undefined" }
			}
		},
		onBlur: {
			description:
				"Callback function fired when the input loses focus. Use this for validation, formatting, or other actions that should occur when the user finishes editing.",
			table: {
				defaultValue: { summary: "undefined" }
			}
		},
		onFocus: {
			description:
				"Callback function fired when the input gains focus. Use this for tracking user interaction, showing additional UI elements, or preparing the field for input.",
			table: {
				defaultValue: { summary: "undefined" }
			}
		},
		customIcon: {
			control: { type: "object" },
			description:
				"Custom icon configuration object with position ('start' or 'end') and icon element. Use this to add visual cues or actions like search, clear, or validation indicators.",
			table: {
				type: { summary: "{position: 'start' | 'end', icon: React.ReactElement}" },
				defaultValue: { summary: "undefined" }
			}
		},
		endAdornment: {
			control: { type: "object" },
			description:
				"Array of React elements to display at the end of the input field. Use this for action buttons, status indicators, or additional interactive elements.",
			table: {
				type: { summary: "React.ReactElement[]" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify the text field during automated testing.",
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
} as Meta<typeof SolaceTextField>;

const DEMO_TITLE = "Demo Text Field";
const DEMO_LABEL = "Some Label";

export const DefaultTextfield = {
	args: {
		onChange: action("callback"),
		title: DEMO_TITLE,
		id: "demoTextFieldId",
		name: "demoTextField"
	}
};

export const CustomWidth = {
	args: {
		onChange: action("callback"),
		title: DEMO_TITLE,
		id: "demoTextFieldId",
		name: "demoTextField",
		width: "50%"
	}
};

export const StackedLabelFormat = {
	args: {
		onChange: action("callback"),
		title: DEMO_TITLE,
		name: "demoTextField",
		label: DEMO_LABEL
	}
};

export const InlineLabelFormat = {
	args: {
		onChange: action("text-changed"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		inlineLabel: true
	}
};

export const HelperText = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		helperText: "Some helper text"
	}
};

export const PlaceholderText = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		placeholder: "Some placeholder text"
	}
};

export const WithErrors = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		helperText: "The text you entered was invalid",
		hasErrors: true
	}
};

export const WithWarning = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		helperText: "The text you entered triggered a warning",
		hasWarnings: true
	}
};

export const WithIcon = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		helperText: "Text field with search icon",
		customIcon: { position: "end", icon: <Search /> }
	}
};

const WithClearButtonComponent = (): JSX.Element => {
	const [value, setValue] = useState("");
	const handleChange = (e) => {
		setValue(e.value);
	};
	const handleClearInput = () => {
		setValue("");
	};
	const endAdornment = [
		value ? (
			<SolaceButton key={"closeIcon"} dataQa="clearButton" variant="icon" onClick={handleClearInput}>
				<CloseIcon />
			</SolaceButton>
		) : null,
		<SolaceButton key={"searchIcon"} variant="icon" onClick={handleClearInput}>
			<Search key="search" />
		</SolaceButton>
	];

	return (
		<SolaceTextField
			value={value}
			name="demoTextField"
			onChange={handleChange}
			endAdornment={endAdornment}
			title={DEMO_TITLE}
			label={DEMO_LABEL}
			helperText="Text field with clear button"
			dataQa="textfieldWithClearButton"
		/>
	);
};

export const WithClearButton = {
	render: WithClearButtonComponent,

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		await userEvent.type(canvas.getByTestId("textfieldWithClearButton"), "This is a test ", {
			delay: 100
		});
	},

	parameters: {
		// Delay snapshot 10 seconds until all interactions are done
		chromatic: { delay: 10000 }
	}
};

export const AutoFocus = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		autoFocus: true
	}
};

export const WithOnBlurOnFocus = {
	args: {
		onChange: action("callback"),
		onBlur: action("blur"),
		onFocus: action("focus"),
		title: DEMO_TITLE,
		id: "demoTextFieldId",
		name: "demoTextField"
	}
};

export const Required = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		required: true
	}
};

export const Disabled = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		value: "Some value",
		disabled: true
	}
};

export const ReadOnly = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		value: "Some value",
		readOnly: true
	}
};

export const ReadOnlyLongTextOverflowWithTooltip = (): JSX.Element => {
	return (
		<div style={{ width: "400px" }}>
			<SolaceTextField
				name={"demoTextField"}
				title={DEMO_TITLE}
				label={DEMO_LABEL}
				value={"Some long value that will be truncated by ellipsis along with a tooltip upon hover!"}
				readOnly={true}
			/>
		</div>
	);
};

export const ReadOnlyInlineLabelLongTextOverflowWithTooltip = (): JSX.Element => {
	return (
		<div style={{ width: "400px" }}>
			<SolaceTextField
				name={"demoTextField"}
				title={DEMO_TITLE}
				label={DEMO_LABEL}
				value={"Some long value that will be truncated by ellipsis along with a tooltip upon hover!"}
				inlineLabel={true}
				readOnly={true}
			/>
		</div>
	);
};

const ControlledComponent = ({ value: initialValue, name, ...args }): JSX.Element => {
	const [value, setValue] = useState(initialValue);
	const handleChange = (e) => {
		setValue(e.value);
	};

	return <SolaceTextField value={value} name={name} onChange={handleChange} {...args} />;
};

export const Controlled = {
	render: ControlledComponent,

	args: {
		name: "controlledTextField",
		label: "Controlled Text Field",
		value: "Initial value",
		helperText: "The value of the text field is controlled by the change handler in the story."
	}
};

export const Interaction = {
	args: {
		onChange: action("callback"),
		id: "interactionTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		dataQa: "interactionTextField"
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		await userEvent.type(canvas.getByTestId("interactionTextField"), "This is a test", {
			delay: 100
		});
	},

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { delay: 5000 }
	}
};
