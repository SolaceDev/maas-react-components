import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceTextDiff } from "@SolaceDev/maas-react-components";

export default {
	title: "Under Construction/SolaceTextDiff",
	component: SolaceTextDiff,
	parameters: {}
} as ComponentMeta<typeof SolaceTextDiff>;

const Template: ComponentStory<typeof SolaceTextDiff> = (args) => <SolaceTextDiff {...args} />;

export const DefaultSolaceTextDiff = Template.bind({});
DefaultSolaceTextDiff.args = {
	text1: `{
		"subscriptions": ["match"]
	}`,
	text2: `{
		"subscriptions": [
			"partial/match"
		]
	}`
};
