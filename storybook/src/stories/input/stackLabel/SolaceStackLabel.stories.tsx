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

import { SolaceStackLabel } from "@SolaceDev/maas-react-components";

(SolaceStackLabel as React.FC & { displayName?: string }).displayName = "SolaceStackLabel";

export default {
	title: "Input/Label/Stacked",
	component: SolaceStackLabel,
	args: {},
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceStackLabel"
			}
		}
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Unique identifier for the stack label component. Used for accessibility and programmatic access.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		hasWarnings: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the stack label in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the stack label content.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		htmlForId: {
			control: {
				type: "text"
			},
			description:
				"The ID of the form element that this label is associated with. Used to establish proper form relationships for accessibility.",
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
				"If true, displays a required indicator (*) next to the label text. Use this to indicate mandatory fields in forms.",
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
				"If true, displays the label in a disabled state with muted styling. Use this when the associated form element is disabled.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		large: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the label in a larger font size. Use this for prominent labels or when better readability is needed.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		bold: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the label text in bold font weight. Use this to emphasize important labels or create visual hierarchy.",
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
				"The content to be displayed as the label text. Can be a string or React node for more complex label content.",
			table: {
				type: { summary: "React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceStackLabel>;

const label = "Custom Label";

export const DefaultLabel = {
	args: {}
};

export const LargeLabel = {
	args: {}
};

export const BoldLabel = {
	args: {}
};

export const Required = {
	args: {}
};

export const Disabled = {
	args: {}
};
