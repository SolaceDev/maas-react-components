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
import { action } from "@storybook/addon-actions";

(SolaceToggle as React.FC & { displayName?: string }).displayName = "SolaceToggle";

export default {
	title: "Input/Toggle Switch",
	component: SolaceToggle,
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
		required: {
			control: {
				type: "boolean"
			}
		},
		disabled: {
			control: {
				type: "boolean"
			}
		},
		largeLabel: {
			control: {
				type: "boolean"
			}
		},
		stateText: {
			control: {
				type: "boolean"
			}
		}
	}
} as Meta<typeof SolaceToggle>;

const title = "Demo Toggle";
const label = "Some Label";

export const DefaultToggle = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoToggleId",
		name: "demoToggle"
	}
};

export const Labeled = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoToggleId",
		name: "demoToggle",
		label: label
	}
};

export const LargeLabel = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoToggleId",
		name: "demoToggle",
		label: label,
		largeLabel: true
	}
};

export const LabeledWithStateText = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoToggleId",
		name: "demoToggle",
		label: label,
		stateText: true
	}
};

export const HelperText = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoToggleId",
		name: "demoToggle",
		label: label,
		helperText: "Some helper text here"
	}
};

export const WithErrors = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoToggleId",
		name: "demoToggle",
		label: label,
		hasErrors: true,
		helperText: "Some error occured"
	}
};

export const Required = {
	args: {
		onChange: action("callback"),
		name: "demoToggle",
		title: title,
		label: label,
		required: true
	}
};

export const Disabled = {
	args: {
		onChange: action("callback"),
		name: "demoToggle",
		title: title,
		label: label,
		isOn: true,
		disabled: true
	}
};
