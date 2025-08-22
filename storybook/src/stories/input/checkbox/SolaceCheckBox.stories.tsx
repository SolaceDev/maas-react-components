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
/* eslint-disable sonarjs/no-duplicate-string */
import { Meta } from "@storybook/react";

import { SolaceCheckBox } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

(SolaceCheckBox as React.FC & { displayName?: string }).displayName = "SolaceCheckBox";

const LABEL = "Some Label";
const TITLE = "Demo Checkbox";

export default {
	title: "Input/Checkbox",
	component: SolaceCheckBox,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=2932%3A22443"
		},
		docs: {
			description: {
				component: "Code component name: SolaceCheckBox"
			}
		}
	},
	argTypes: {
		label: {
			control: {
				type: "text"
			},
			description:
				"The label text displayed next to the checkbox. Use this to clearly describe what the checkbox represents. Labels should be concise and descriptive.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		helperText: {
			control: {
				type: "text"
			},
			description:
				"Additional text displayed below the checkbox to provide guidance or error messages. Use this to give users context about the checkbox purpose or validation requirements.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		hasErrors: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the checkbox in an error state with red styling. Use this to indicate validation failures. Often paired with error text in helperText.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		required: {
			control: {
				type: "boolean"
			},
			description:
				"If true, marks the checkbox as required and displays an asterisk (*) next to the label. Use this to indicate mandatory checkboxes in forms and ensure proper validation.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		disabled: {
			control: {
				type: "boolean"
			},
			description:
				"If true, disables the checkbox preventing user interaction. Use this when the checkbox is not applicable based on current form state or user permissions.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		readOnly: {
			control: {
				type: "boolean"
			},
			description:
				"If true, makes the checkbox read-only. Users can see the checked state but cannot change it. Use this for displaying computed values or information that shouldn't be modified.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		checked: {
			control: {
				type: "boolean"
			},
			description:
				"Controls the checked state of the checkbox. Use this for controlled components where you manage the checkbox state externally. Should be paired with an onChange handler.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		defaultChecked: {
			control: {
				type: "boolean"
			},
			description:
				"The default checked state for uncontrolled components. Use this when you want to set an initial checked state but don't need to control it.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		indeterminate: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the checkbox in an indeterminate state (partially checked). Use this for parent checkboxes when some but not all child items are selected.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		boldLabel: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the label text in bold font weight. Use this to emphasize important checkboxes or primary options.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		largeLabel: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the label text in a larger font size. Use this for prominent checkboxes or when you need better readability.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		subTextProps: {
			control: {
				type: "object"
			},
			description:
				"Configuration object for displaying additional subtext below the main label. Should include 'label' (string) and optionally 'light' (boolean) properties.",
			table: {
				type: { summary: "{label: string, light?: boolean} | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		name: {
			control: {
				type: "text"
			},
			description:
				"The name attribute for the checkbox, used for form submission and accessibility. Essential for proper form handling and assistive technology support.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		id: {
			control: {
				type: "text"
			},
			description: "Unique identifier for the checkbox component. Used for accessibility and programmatic access.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		title: {
			control: {
				type: "text"
			},
			description:
				"The title attribute for the checkbox, displayed as a tooltip on hover. Use this for additional context or instructions that don't fit in the label.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		value: {
			control: {
				type: "text"
			},
			description:
				"The value attribute for the checkbox. This is the value that will be submitted when the checkbox is checked in a form.",
			table: {
				type: { summary: "string | number | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		onChange: {
			description:
				"Callback function fired when the checkbox state changes. Receives an event object with the new checked state. Essential for controlled components and form state management."
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify the checkbox during automated testing.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data attribute for additional tagging. Use this for analytics, tracking, or additional metadata.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		hasWarnings: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the checkbox in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the checkbox selection.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		}
	}
} as Meta<typeof SolaceCheckBox>;

export const DefaultCheckbox = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoCheckboxId",
		name: "demoCheckbox"
	}
};

export const Labeled = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoCheckboxId",
		name: "demoCheckbox",
		label: LABEL
	}
};

export const BoldLabel = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoCheckboxId",
		name: "demoCheckbox",
		label: LABEL,
		boldLabel: true
	}
};

export const LargeLabel = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoCheckboxId",
		name: "demoCheckbox",
		label: LABEL,
		largeLabel: true
	}
};

export const SubText = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoCheckboxId",
		name: "demoCheckbox",
		label: "Primary Label",
		subTextProps: {
			label: "Subtext subtext"
		}
	}
};

export const LightSubText = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoCheckboxId",
		name: "demoCheckbox",
		label: "Primary Label",
		subTextProps: {
			label: "This is a light subtext",
			light: true
		}
	}
};

export const HelperText = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoCheckboxId",
		name: "demoCheckbox",
		label: LABEL,
		helperText: "Some helper text here"
	}
};

export const WithErrors = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoCheckboxId",
		name: "demoCheckbox",
		label: LABEL,
		hasErrors: true,
		helperText: "Some error occured"
	}
};

export const Required = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		name: "demoCheckbox",
		label: LABEL,
		required: true
	}
};

export const Disabled = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		name: "demoCheckbox",
		label: LABEL,
		checked: true,
		disabled: true
	}
};

export const Indeterminate = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		name: "demoCheckbox",
		label: LABEL,
		checked: true,
		indeterminate: true,
		readOnly: false
	}
};

export const ReadOnly = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		name: "demoCheckbox",
		label: LABEL,
		checked: true,
		readOnly: true
	}
};

export const IndeterminateAndReadOnly = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		name: "demoCheckbox",
		label: LABEL,
		checked: true,
		indeterminate: true,
		readOnly: true
	}
};
