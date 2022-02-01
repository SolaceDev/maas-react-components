import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SolaceBadge } from "@SolaceDev/maas-react-components";

export default {
	title: "Under Construction/SolaceBadge",
	component: SolaceBadge,
	parameters: {},
	argTypes: {
		value: {
			control: { type: "text" }
		},
		show: {
			control: { type: "boolean" }
		},
		size: {
			control: { type: "number" }
		}
	}
} as ComponentMeta<typeof SolaceBadge>;

const Template: ComponentStory<typeof SolaceBadge> = (args) => <SolaceBadge {...args} />;

export const DefaultBadge = Template.bind({});
DefaultBadge.args = {
	value: "0",
	show: false,
	size: 21
};
