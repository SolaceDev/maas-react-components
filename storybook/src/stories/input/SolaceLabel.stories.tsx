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
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceLabel"
			}
		}
	},
	argTypes: {
		htmlForId: {
			control: {
				type: "text"
			}
		},
		required: {
			control: {
				type: "boolean"
			}
		},
		disabled: {
			control: {
				type: "boolean"
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
