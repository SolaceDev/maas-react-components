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

import { SolaceTextArea } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

(SolaceTextArea as React.FC & { displayName?: string }).displayName = "SolaceTextArea";

export default {
	title: "Input/Textfield/Text Area",
	component: SolaceTextArea,
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
		rows: 4,
		maxRows: undefined,
		minRows: undefined,
		size: undefined,
		width: undefined,
		resizable: "both",
		dataQa: "",
		dataTags: ""
	},
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/P5XeF1KE6z2MKyzlEyInrH/Core-Component-Specs-(Copy)?node-id=430%3A548"
		},
		docs: {
			description: {
				component: "Text area component for reuse in all Solace based applications. Code component name: SolaceTextArea"
			}
		}
	},
	argTypes: {
		label: {
			control: {
				type: "text"
			},
			description:
				"The label text displayed above or inline with the text area. Use this to clearly describe what information the user should enter. Labels should be concise and descriptive.",
			table: {
				defaultValue: { summary: "" }
			}
		},
		helperText: {
			control: {
				type: "text"
			},
			description:
				"Additional text displayed below the text area to provide guidance or error messages. Use this to give users context about expected input format or validation requirements.",
			table: {
				defaultValue: { summary: "" }
			}
		},
		hasErrors: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the text area in an error state with red styling. Use this to indicate validation failures or input errors. Often paired with error text in helperText.",
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
				"If true, displays the text area in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the textarea content.",
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
				"If true, automatically focuses the text area when the component mounts. Use sparingly as it can disrupt user navigation and accessibility. Best for primary input areas on forms.",
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
				"If true, displays the label inline with the text area rather than above it. Use this for compact layouts or when you need to save vertical space.",
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
				"If true, disables the text area preventing user interaction. Use this when the field is not applicable based on current form state or user permissions.",
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
				"If true, makes the text area read-only. Users can see and select the text but cannot edit it. Use this for displaying computed values or information that shouldn't be modified.",
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
				"The current value of the text area. Use this for controlled components where you manage the field state externally. Should be paired with an onChange handler.",
			table: {
				defaultValue: { summary: "" }
			}
		},
		placeholder: {
			control: {
				type: "text"
			},
			description:
				"Placeholder text displayed when the field is empty. Use this to provide examples of expected input format or additional guidance. Should not replace proper labels.",
			table: {
				defaultValue: { summary: "" }
			}
		},
		type: {
			options: ["text", "number", "password", "email", "url"],
			control: {
				type: "select"
			},
			description:
				"The input type which affects validation and browser auto-completion. Choose the most appropriate type for your data to improve user experience.",
			table: {
				type: { summary: '"text" | "number" | "password" | "email" | "url"' },
				defaultValue: { summary: '"text"' }
			}
		},
		rows: {
			control: {
				type: "number"
			},
			description:
				"The number of visible text lines for the text area. Use this to control the initial height of the text area. Users can still resize if resizable is enabled.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "4" }
			}
		},
		maxRows: {
			control: {
				type: "number"
			},
			description:
				"Maximum number of rows to display before scrolling. Use this with multiline text areas to limit the maximum height while allowing content expansion.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "undefined" }
			}
		},
		minRows: {
			control: {
				type: "number"
			},
			description:
				"Minimum number of rows to display. Use this to ensure the text area maintains a minimum height even when empty or with little content.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "undefined" }
			}
		},
		size: {
			control: {
				type: "number"
			},
			description:
				"The size attribute for the text area, affecting the visible character width. Use this to hint at the expected input length, but don't rely on it for validation.",
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
				"The width of the text area. Can be a number (pixels), percentage, or CSS width value. Use this to control the field width within your layout constraints.",
			table: {
				defaultValue: { summary: "undefined" }
			}
		},
		resizable: {
			options: ["both", "horizontal", "vertical", "none"],
			control: { type: "select" },
			description:
				"Controls whether and how the text area can be resized by the user. Use 'both' for maximum flexibility, 'vertical' for content that expands downward, or 'none' for fixed-size areas.",
			table: {
				type: { summary: "'both' | 'horizontal' | 'vertical' | 'none'" },
				defaultValue: { summary: "'both'" }
			}
		},
		name: {
			control: {
				type: "text"
			},
			description:
				"The name attribute for the text area, used for form submission and accessibility. Essential for proper form handling and assistive technology support.",
			table: {
				defaultValue: { summary: "" }
			}
		},
		id: {
			control: {
				type: "text"
			},
			description: "Unique identifier for the textarea component. Used for accessibility and programmatic access.",
			table: {
				defaultValue: { summary: "" }
			}
		},
		title: {
			control: {
				type: "text"
			},
			description:
				"The title attribute for the text area, displayed as a tooltip on hover. Use this for additional context or instructions that don't fit in the label or helper text.",
			table: {
				defaultValue: { summary: "" }
			}
		},
		onChange: {
			description:
				"Callback function fired when the text area value changes. Receives an event object with the new value. Essential for controlled components and form state management."
		},
		onBlur: {
			description:
				"Callback function fired when the text area loses focus. Use this for validation, formatting, or other actions that should occur when the user finishes editing."
		},
		onKeyDown: {
			description:
				"Callback function fired when a key is pressed down in the text area. Use this for custom keyboard shortcuts, input validation, or navigation controls."
		},
		onKeyUp: {
			description:
				"Callback function fired when a key is released in the text area. Use this for delayed validation, auto-save functionality, or character counting."
		},
		onFocus: {
			description:
				"Callback function fired when the text area gains focus. Use this for tracking user interaction, showing additional UI elements, or preparing the field for input."
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify the text area during automated testing.",
			table: {
				defaultValue: { summary: "" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data attribute for additional tagging. Use this for analytics, tracking, or additional metadata.",
			table: {
				defaultValue: { summary: "" }
			}
		}
	}
} as Meta<typeof SolaceTextArea>;

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
		width: "40%"
	}
};

export const StackedLabeleFormat = {
	args: {
		onChange: action("callback"),
		title: DEMO_TITLE,
		name: "demoTextField",
		label: DEMO_LABEL
	}
};

export const InlineLabeleFormat = {
	args: {
		onChange: action("text-changed"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		inlineLabel: true
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

export const HelperText = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		helperText: "Some helper text"
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

const ControlledComponent = ({ value: initialValue, name, ...args }): JSX.Element => {
	const [value, setValue] = useState(initialValue);
	const handleChange = (e) => {
		setValue(e.value);
	};

	return <SolaceTextArea value={value} name={name} onChange={handleChange} {...args} />;
};

export const Controlled = {
	render: ControlledComponent,

	args: {
		name: "controlledTextArea",
		label: "Controlled Text Area",
		value: "Initial value",
		helperText: "The value of the text area is controlled by the change handler in the story."
	}
};

export const ResizableBoth = {
	args: {
		onChange: action("callback"),
		title: DEMO_TITLE,
		id: "demoTextFieldId",
		name: "demoTextField",
		width: "40%",
		resizable: "both"
	}
};

export const ResizableVertically = {
	args: {
		onChange: action("callback"),
		title: DEMO_TITLE,
		id: "demoTextFieldId",
		name: "demoTextField",
		width: "40%",
		resizable: "vertical"
	}
};

export const ResizableHorizontal = {
	args: {
		onChange: action("callback"),
		title: DEMO_TITLE,
		id: "demoTextFieldId",
		name: "demoTextField",
		width: "40%",
		resizable: "horizontal"
	}
};
