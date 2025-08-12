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
import { StoryFn, Meta, Decorator } from "@storybook/react";
import { SolaceDonutChart, InfoIcon, SolaceButton } from "@SolaceDev/maas-react-components";
import { userEvent } from "@storybook/test";

(SolaceDonutChart as React.FC & { displayName?: string }).displayName = "SolaceDonutChart";
(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";

// Create a decorator to include the tooltip & popover inside the snapshot"
const withSnapshotContainer: Decorator = (Story) => {
	return (
		<div id="snapshot" style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}>
			<div style={{ margin: "16px" }}>
				<Story />
			</div>
		</div>
	);
};

export default {
	title: "Data Visualization/Donut Chart",
	component: SolaceDonutChart,
	args: {
		data: [],
		size: "md",
		showTooltip: false,
		icon: undefined,
		iconWidth: undefined,
		iconHeight: undefined,
		dataQa: "",
		dataTags: ""
	},
	parameters: {},
	argTypes: {
		data: {
			control: { type: "object" },
			description:
				"Array of data objects to display in the donut chart. Each object should contain name, value, and optionally color and label properties. Use this to provide the chart data that will be visualized as segments.",
			table: {
				type: { summary: "Array<{name: string, value: number, color?: string, label?: string}>" },
				defaultValue: { summary: "[]" }
			}
		},
		size: {
			options: ["sm", "md", "lg"],
			control: {
				type: "select"
			},
			description:
				"Controls the size of the donut chart. Use 'sm' for compact displays, 'md' for standard layouts, and 'lg' for prominent chart presentations. The size affects both the outer and inner radius of the chart.",
			table: {
				type: { summary: '"sm" | "md" | "lg"' },
				defaultValue: { summary: '"md"' }
			}
		},
		showTooltip: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays tooltips when hovering over chart segments. Tooltips show the segment name, value, and percentage. Enable this to provide additional context for chart data.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		icon: {
			control: { type: "object" },
			description:
				"Optional icon to display in the center of the donut chart. Use this to add visual context or branding to the chart. Should be a React element/component.",
			table: {
				type: { summary: "React.ReactElement" },
				defaultValue: { summary: "undefined" }
			}
		},
		iconWidth: {
			control: { type: "number" },
			description:
				"Width of the center icon in pixels. Use this to control the size of the icon displayed in the chart center. Should be used together with iconHeight for proper scaling.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "undefined" }
			}
		},
		iconHeight: {
			control: { type: "number" },
			description:
				"Height of the center icon in pixels. Use this to control the size of the icon displayed in the chart center. Should be used together with iconWidth for proper scaling.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify the chart during automated testing.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data attribute for additional tagging. Use this for analytics, tracking, or additional metadata.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceDonutChart>;

const Template: StoryFn<typeof SolaceDonutChart> = (args) => (
	<div style={{ margin: "50px 150px" }}>
		<SolaceDonutChart {...args} />
	</div>
);

const DEFAULT_DATA = [
	{ name: "A", value: 400, color: "#0088FE", label: "label A" },
	{ name: "B", value: 300, color: "#00C49F", label: "label B" },
	{ name: "C", value: 300, color: "#FFBB28", label: "label C" },
	{ name: "D", value: 200, color: "#FF8042", label: "label D" }
];

export const DefaultChart = {
	render: Template,
	args: {
		data: DEFAULT_DATA
	}
};

export const WithTooltip = {
	render: Template,
	args: {
		...DefaultChart.args,
		showTooltip: true
	},
	play: async ({ canvasElement }) => {
		const targetElement = canvasElement.querySelector(".recharts-pie-sector");
		if (targetElement) {
			await userEvent.hover(targetElement);
		}
	},
	decorators: [withSnapshotContainer]
};

export const WithSingleDataPoint = {
	render: Template,
	args: {
		...DefaultChart.args,
		showTooltip: true,
		data: [{ name: "A", value: 100, color: "#0088FE", label: "label A" }]
	}
};

export const WithInnerIcon = {
	render: Template,
	args: {
		...DefaultChart.args,
		showTooltip: true,
		icon: <InfoIcon size={24} fill="grey" />,
		iconWidth: 24,
		iconHeight: 24
	}
};

export const LargeSize = {
	render: Template,
	args: {
		...DefaultChart.args,
		size: "lg",
		showTooltip: true
	}
};

export const MediumSize = {
	render: Template,
	args: {
		...DefaultChart.args,
		size: "md",
		showTooltip: true
	}
};

export const WithUndefinedColorAndLabel = {
	render: Template,
	args: {
		data: [
			{ name: "A", value: 400 },
			{ name: "B", value: 300 },
			{ name: "C", value: 300 },
			{ name: "D", value: 200 }
		],
		showTooltip: true,
		size: "lg"
	}
};

export const WithDynamicData = () => {
	const [data, setData] = React.useState(DEFAULT_DATA);

	const updateRandomValue = () => {
		const newData = data.map((item) => ({
			...item,
			value: Math.floor(Math.random() * 500)
		}));
		setData(newData);
	};

	return (
		<div style={{ margin: "50px 150px" }}>
			<SolaceDonutChart data={data} size="lg" showTooltip={true} />
			<div style={{ margin: "30px 0" }}>
				<SolaceButton onClick={updateRandomValue} variant="call-to-action">
					Update with Random Values
				</SolaceButton>
			</div>
		</div>
	);
};
