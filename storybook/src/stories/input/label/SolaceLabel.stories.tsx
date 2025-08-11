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

import { SolaceLabel } from "@SolaceDev/maas-react-components";

(SolaceLabel as React.FC & { displayName?: string }).displayName = "SolaceLabel";

export default {
	title: "Input/Label/Inline",
	component: SolaceLabel,
	args: {
		id: "",
		htmlForId: "",
		required: false,
		disabled: false,
		children: "Label",
		dataQa: "",
		dataTags: ""
	},
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceLabel"
			}
		}
	},
	argTypes: {
		id: {
			control: {
				type: "text"
			},
			description:
				"Unique identifier for the label element. Used for accessibility and programmatic access to the label component.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		htmlForId: {
			control: {
				type: "text"
			},
			description:
				"The ID of the form element this label is associated with. Creates an accessible relationship between the label and its corresponding input field for screen readers and assistive technology.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		required: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays a required indicator (typically an asterisk *) next to the label text. Use this to indicate mandatory form fields to users.",
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
				"If true, displays the label in a disabled state with reduced opacity. Use this when the associated form field is disabled or not currently interactive.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		children: {
			control: {
				type: "text"
			},
			description:
				"The label text content to display. This should be descriptive and concise, clearly indicating what the associated form field is for.",
			table: {
				type: { summary: "React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: {
				type: "text"
			},
			description: "Data attribute for QA testing. Use this to identify the label element during automated testing.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: {
				type: "text"
			},
			description:
				"Data attribute for additional tagging. Use this for analytics, tracking, or additional metadata related to the label.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceLabel>;

const label = "Custom Label";

export const DefaultLabel = {
	args: {
		id: "demoTextFieldId",
		children: label
	}
};

export const Required = {
	args: {
		id: "demoTextFieldId",
		required: true,
		children: label
	}
};

export const Disabled = {
	args: {
		id: "demoTextFieldId",
		disabled: true,
		children: label
	}
};
