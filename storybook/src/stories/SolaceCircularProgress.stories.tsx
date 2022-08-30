import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceCircularProgress } from "@SolaceDev/maas-react-components";

export default {
	title: "Under Construction/SolaceCircularProgress",
	component: SolaceCircularProgress,
	parameters: {},
	argTypes: {
		variant: {
			options: ["determinate", "indeterminate"],
			control: {
				type: "select"
			}
		},
		size: {
			options: ["sm", "md", "lg"],
			control: {
				type: "select"
			}
		},
		value: {
			control: {
				type: "text"
			}
		}
	}
} as ComponentMeta<typeof SolaceCircularProgress>;

const Template: ComponentStory<typeof SolaceCircularProgress> = (args) => <SolaceCircularProgress {...args} />;

export const DefaultVariant = Template.bind({});
DefaultVariant.args = {};

export const DeterminateVariant = Template.bind({});
DeterminateVariant.args = {
	variant: "determinate",
	value: 90
};
