import React, { ReactNode, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SolaceSidePanelLayout from "@SolaceDev/maas-react-components";

export default {
	title: "Layout/SolaceSidePanelLayout",
	component: SolaceSidePanelLayout,
	parameters: {},
	argTypes: {}
} as ComponentMeta<typeof SolaceSidePanelLayout>;

const Template: ComponentStory<typeof SolaceSidePanelLayout> = (args) => <SolaceSidePanelLayout {...args} />;

export const DefaultTabs = Template.bind({});
DefaultTabs.args = {
	tabs: [
		{ label: "Tab One", value: "tab_one", href: "#" },
		{ label: "Tab Two", value: "tab_two", href: "#" },
		{ label: "Tab Three", value: "tab_three", href: "#" }
	],
	activeTabValue: "tab_one"
};
