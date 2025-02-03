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
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceDonutChart"
			}
		}
	},
	argTypes: {
		size: {
			options: ["sm", "md", "lg"],
			control: {
				type: "select"
			}
		},
		showTooltip: {
			control: {
				type: "boolean"
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
