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

export const NoAnimationBadge = Template.bind({});
NoAnimationBadge.args = {
	value: "1",
	show: false,
	animationDuration: 0
};

export const CustomBadge = Template.bind({});
CustomBadge.args = {
	value: "99+",
	fontSize: 11,
	show: false,
	animationDuration: 1500,
	animationRepeatsInitialCount: 1,
	animationRepeatsUpdateCount: 2
};

export const BadgeWithTooltip = Template.bind({});
BadgeWithTooltip.args = {
	value: "3",
	show: true,
	title: "3 new events"
};
