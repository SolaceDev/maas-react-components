/* eslint-disable sonarjs/no-duplicate-string */
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
	parameters: {},
	args: {
		variant: "indeterminate",
		value: undefined,
		height: "md",
		color: "default",
		dataQa: undefined,
		dataTags: undefined,
		eventName: undefined
	},
	argTypes: {
		variant: {
			options: ["determinate", "indeterminate"],
			control: {
				type: "select"
			},
			description: "The variant style to use. Use indeterminate when there is no progress value to showcase.",
			table: {
				type: { summary: '"indeterminate" | "determinate"' },
				defaultValue: {
					summary: '"indeterminate"'
				}
			}
		},
		value: {
			control: {
				type: "range",
				min: 0,
				max: 100,
				step: 1
			},
			description:
				"Represent the progress value in percentage (useful only if the variant is 'determinate', value between 0 and 100).",
			table: {
				type: { summary: "number | undefined" },
				defaultValue: {
					summary: "undefined"
				}
			}
		},
		height: {
			options: ["xs", "sm", "md", "lg"],
			control: {
				type: "select"
			},
			description: "Height of the linear indicator. xs: 4px, sm: 6px, md: 10px, lg: 14px. Uses BASE_SIZE_TYPES enum.",
			table: {
				type: { summary: '"xs" | "sm" | "md" | "lg"' },
				defaultValue: {
					summary: '"md"'
				}
			}
		},
		color: {
			options: ["default", "learning"],
			control: {
				type: "select"
			},
			description: "Color to style the progress bar with.",
			table: {
				type: { summary: '"default" | "learning"' },
				defaultValue: {
					summary: '"default"'
				}
			}
		},
		dataQa: {
			control: {
				type: "text"
			},
			description: "Data QA attribute for testing purposes.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: {
					summary: "undefined"
				}
			}
		},
		dataTags: {
			control: {
				type: "text"
			},
			description: "Data tags attribute for additional metadata.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: {
					summary: "undefined"
				}
			}
		},
		eventName: {
			control: {
				type: "text"
			},
			description: "Event name to be used in tracking facility.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: {
					summary: "undefined"
				}
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
