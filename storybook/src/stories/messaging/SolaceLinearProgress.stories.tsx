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

import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SolaceLinearProgress } from "@SolaceDev/maas-react-components";

(SolaceLinearProgress as React.FC & { displayName?: string }).displayName = "SolaceLinearProgress";

export default {
	title: "Messaging/Progress Indicator/Linear",
	component: SolaceLinearProgress,
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceLinearProgress"
			}
		}
	},
	argTypes: {
		variant: {
			options: ["determinate", "indeterminate"],
			control: {
				type: "select"
			}
		},
		value: {
			control: {
				type: "range",
				min: 0,
				max: 100,
				step: 1
			}
		},
		height: {
			options: ["xs", "sm", "md", "lg"],
			control: {
				type: "select"
			}
		},
		color: {
			options: ["default", "learning"],
			control: {
				type: "select"
			}
		}
	}
} as Meta<typeof SolaceLinearProgress>;

const Template: StoryFn<typeof SolaceLinearProgress> = (args) => (
	<div style={{ border: "solid 1px #EEE" }}>
		<SolaceLinearProgress {...args} />
	</div>
);

export const IndeterminateVariant = {
	render: Template,
	args: {}
};

export const DeterminateVariant = {
	render: Template,

	args: {
		variant: "determinate",
		value: 75
	}
};

export const LearningVariant = {
	render: Template,

	args: {
		variant: "determinate",
		value: 45,
		color: "learning"
	}
};

export const ThinnerVariant = {
	render: Template,

	args: {
		variant: "determinate",
		value: 35,
		height: "xs"
	}
};
