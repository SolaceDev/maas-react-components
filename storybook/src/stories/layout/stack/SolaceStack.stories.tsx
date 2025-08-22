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

// SolaceStack.stories.tsx

import React from "react";

import { Meta } from "@storybook/react";

import { SolaceStack, SolaceSelect, SolaceTextField, Divider, MenuItem } from "@SolaceDev/maas-react-components";

(SolaceStack as React.FC & { displayName?: string }).displayName = "SolaceStack";
(SolaceSelect as React.FC & { displayName?: string }).displayName = "SolaceSelect";
(SolaceTextField as React.FC & { displayName?: string }).displayName = "SolaceTextField";
(Divider as React.FC & { displayName?: string }).displayName = "Divider";
(MenuItem as React.FC & { displayName?: string }).displayName = "MenuItem";

const SELECT_OPTIONS: Array<JSX.Element> = [
	<MenuItem key="no option" value="">
		No Option
	</MenuItem>,
	<MenuItem key="option1" value="option1">
		Menu Option #1
	</MenuItem>,
	<MenuItem key="option2" value="option2">
		Menu Option #2
	</MenuItem>,
	<MenuItem key="option3" value="option3">
		Menu Option #3
	</MenuItem>
];

export default {
	title: "Layout/Stack",
	component: SolaceStack,
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Unique identifier for the stack component. Used for accessibility and programmatic access.",
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
				"If true, displays the stack in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the stack content.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		spacing: {
			control: { type: "range", min: 1, max: 10, step: 1 },
			description:
				"If customSpacing is passed in the default 16px would be replaced by the appropriate value. eg: if 3 is passed in the result would be theme.spacing(3) = 24px between all elements.If 0 is passed in all spacing is disabled.For detailed documentation please refer to https://mui.com/api/stack/. Code component name: SolaceStack",
			table: {
				type: { summary: "number | undefined" },
				defaultValue: {
					summary: "2"
				}
			}
		},
		direction: {
			options: ["column-reverse", "column", "row-reverse", "row"],
			control: { type: "select" },
			table: {
				type: { summary: '"column-reverse" | "column" | "row-reverse" | "row" | undefined' },
				defaultValue: {
					summary: "column"
				}
			},
			description:
				"To align child elements in vertical or horizontal direction.For detailed documentation please refer to https://mui.com/api/stack/"
		},
		divider: {
			control: { type: "object" },
			description:
				"Add an element between each child.For detailed documentation please refer to https://mui.com/api/stack/",
			table: {
				type: { summary: "React.ReactNode | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		sx: {
			control: { type: "object" },
			description: "System prop for custom styling",
			table: {
				type: { summary: "object | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		children: {
			control: { type: "object" },
			description: "The content of the stack component",
			table: {
				type: { summary: "React.ReactNode | undefined" },
				defaultValue: { summary: "undefined" }
			}
		}
	},
	parameters: {
		docs: {
			description: {
				component:
					"SolaceStack is concerned with one-dimensional layouts, while SolaceGrid handles two-dimensional layouts. For more examples and documentation please refer to https://mui.com/components/stack/"
			}
		}
	}
} as Meta;

const defaultContent = (
	<>
		<SolaceTextField label="default spacing1" name={"1"} />
		<SolaceTextField label="default spacing2" name={"2"} />
		<SolaceSelect label="default spacing3" name={"3"}>
			{SELECT_OPTIONS}
		</SolaceSelect>
	</>
);

export const DefaultSolaceStack = {
	args: {
		children: defaultContent
	}
};

export const DisabledSpacing = {
	args: {
		children: defaultContent,
		spacing: 0
	}
};

export const Direction = {
	args: {
		children: defaultContent,
		direction: "row"
	}
};

export const WithDivider = (): JSX.Element => {
	return (
		<SolaceStack direction="row" divider={<Divider orientation="vertical" flexItem />}>
			<SolaceTextField label="default spacing1" name={"1"} />
			<SolaceTextField label="default spacing2" name={"2"} />
			<SolaceSelect label="default spacing3" name={"3"}>
				{SELECT_OPTIONS}
			</SolaceSelect>
		</SolaceStack>
	);
};

export const MultipleChildren = (): JSX.Element => {
	return (
		<>
			<SolaceStack>
				<SolaceTextField label="default spacing1" name={"1"} />
				<SolaceTextField label="default spacing2" name={"2"} />
				<SolaceSelect label="default spacing3" name={"3"}>
					{SELECT_OPTIONS}
				</SolaceSelect>
			</SolaceStack>

			<SolaceStack sx={{ marginTop: 5 }}>
				<SolaceTextField label="MarginTop5 - 1" name={"1"} />
				<SolaceTextField label="MarginTop5 - 2" name={"2"} />
			</SolaceStack>

			<SolaceStack direction="row" sx={{ marginTop: 1 }}>
				<SolaceTextField label="MarginTop1-1" name={"1"} />
				<SolaceTextField label="MarginTop1-2" name={"2"} />
			</SolaceStack>

			<SolaceStack direction="row" sx={{ marginTop: 1 }} spacing={0}>
				<SolaceTextField label="MarginTop1-noSpacing-1" name={"1"} />
				<SolaceTextField label="MarginTop1-noSpacing-2" name={"2"} />
			</SolaceStack>

			<SolaceStack sx={{ marginTop: 6 }} spacing={3}>
				<SolaceTextField label="MarginTop6-customSpacing3-1" name={"1"} />
				<SolaceTextField label="MarginTop6-customSpacing3-2" name={"2"} />
			</SolaceStack>

			<SolaceStack sx={{ marginTop: 10 }} direction="row">
				<SolaceTextField label="customWidthText-1" name={"1"} width="150px" />
				<SolaceTextField label="MarginTop10-2" name={"2"} />
				<SolaceTextField label="MarginTop10-3" name={"3"} />
				<SolaceTextField label="MarginTop10-4" name={"4"} />
			</SolaceStack>
		</>
	);
};
