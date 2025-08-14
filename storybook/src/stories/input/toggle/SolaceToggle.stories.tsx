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

import { SolaceToggle } from "@SolaceDev/maas-react-components";

(SolaceToggle as React.FC & { displayName?: string }).displayName = "SolaceToggle";

export default {
	title: "Input/Toggle Switch",
	component: SolaceToggle,
	args: {},
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/UI-Library%3A-Patterns?node-id=2937%3A22461"
		},
		docs: {
			description: {
				component:
					"Toggle switch component for reuse in all Solace based applications. Code component name: SolaceToggle"
			}
		}
	},
	argTypes: {
		id: {
			description:
				"Unique identifier for the toggle. If not specified, name value will be used to make label accessible for screen readers.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		name: {
			description: "Name attribute to assign to the toggle element.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		title: {
			description: "The text to display as the tooltip hint.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		label: {
			description: "The label content to display on the screen.",
			table: {
				type: { summary: "string | JSX.Element" },
				defaultValue: { summary: "undefined" }
			}
		},
		helperText: {
			description: "Content to display as supportive/explanatory text.",
			table: {
				type: { summary: "string | JSX.Element" },
				defaultValue: { summary: "undefined" }
			}
		},
		isOn: {
			description: "Boolean flag to check or uncheck the toggle.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		hasErrors: {
			description: "Boolean flag to mark the toggle in error state.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		required: {
			control: {
				type: "boolean"
			},
			description: "Boolean flag used to display an indicator of whether or not this toggle is mandatory.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		disabled: {
			control: {
				type: "boolean"
			},
			description: "Boolean flag to disable the toggle.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		largeLabel: {
			control: {
				type: "boolean"
			},
			description: "Display the label with a larger font.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		stateText: {
			control: {
				type: "boolean"
			},
			description: "Boolean flag to show the state of toggle element.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		onChange: {
			description: "Callback function to trigger whenever the value of the toggle is changed."
		},
		dataQa: {
			description: "Data attribute for QA testing.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			description: "Data attribute for additional tagging.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceToggle>;

const title = "Demo Toggle";
const label = "Some Label";

export const DefaultToggle = {
	args: {}
};

export const Labeled = {
	args: {}
};

export const LargeLabel = {
	args: {}
};

export const LabeledWithStateText = {
	args: {}
};

export const HelperText = {
	args: {}
};

export const WithErrors = {
	args: {}
};

export const Required = {
	args: {}
};

export const Disabled = {
	args: {}
};
