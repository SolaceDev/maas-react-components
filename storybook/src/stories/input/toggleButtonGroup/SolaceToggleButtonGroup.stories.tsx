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

import React, { ReactNode, useState } from "react";
import { Meta } from "@storybook/react";
import { SolaceToggleButtonGroup, SolaceToggleButtonGroupOptionProps } from "@SolaceDev/maas-react-components";

(SolaceToggleButtonGroup as React.FC & { displayName?: string }).displayName = "SolaceToggleButtonGroup";

const options: Array<SolaceToggleButtonGroupOptionProps> = [];
options.push({ value: "option1", label: "All" });
options.push({ value: "option2", label: "Sub" });
options.push({ value: "option3", label: "Pub" });

export default {
	title: "Input/Toggle Button",
	component: SolaceToggleButtonGroup,
	args: {},
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/OSo8hNAnLk3cGhtizCxjzs/Endpoints---April-2022---Designer?node-id=902%3A99398"
		}
	},
	argTypes: {
		options: {
			description: "An array of label - value toggle options",
			table: {
				defaultValue: {
					summary: "[]"
				}
			}
		},
		onChange: {
			description: "A function handler for toggle changes"
		},
		activeValue: {
			description: "The value of the active toggle value",
			table: {
				defaultValue: {
					summary: ""
				}
			}
		},
		isDisabled: {
			control: { type: "boolean" },
			description: "Renders the button group as disabled",
			table: {
				defaultValue: {
					summary: "false"
				}
			}
		},
		dataQa: {
			description: "The data-qa attribute for the toggle button group.",
			table: {
				defaultValue: {
					summary: ""
				}
			}
		}
	}
} as Meta<typeof SolaceToggleButtonGroup>;

export const DefaultToggleButtonGroup = {
	args: {}
};

export const ToggleButtonGroupWithSelection = {
	args: {}
};

export const ToggleButtonGroupWithCallback = (): ReactNode => {
	const [activeValue, setActiveValue] = useState("option2");
	const handleOnChange = (_event: React.MouseEvent<HTMLElement>, value: string) => {
		setActiveValue(value);
	};
	return (
		<SolaceToggleButtonGroup
			dataQa="testTBGWithCallback"
			options={options}
			onChange={handleOnChange}
			activeValue={activeValue}
		/>
	);
};

export const ToggleButtonGroupDisabled = {
	args: {}
};
