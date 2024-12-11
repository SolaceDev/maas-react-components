import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SolaceLinearProgress } from "@SolaceDev/maas-react-components";

(SolaceLinearProgress as React.FC & { displayName?: string }).displayName = "SolaceLinearProgress";

export default {
	title: "Under Construction/SolaceLinearProgress",
	component: SolaceLinearProgress,
	parameters: {},
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
