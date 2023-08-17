import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceLinearProgress } from "@SolaceDev/maas-react-components";

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
} as ComponentMeta<typeof SolaceLinearProgress>;

const Template: ComponentStory<typeof SolaceLinearProgress> = (args) => (
	<div style={{ border: "solid 1px #EEE" }}>
		<SolaceLinearProgress {...args} />
	</div>
);

export const IndeterminateVariant = Template.bind({});
IndeterminateVariant.args = {};

export const DeterminateVariant = Template.bind({});
DeterminateVariant.args = {
	variant: "determinate",
	value: 75
};

export const LearningVariant = Template.bind({});
LearningVariant.args = {
	variant: "determinate",
	value: 45,
	color: "learning"
};

export const ThinnerVariant = Template.bind({});
ThinnerVariant.args = {
	variant: "determinate",
	value: 35,
	height: "xs"
};
