import React, { ReactNode, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceTabs } from "@SolaceDev/maas-react-components";

export default {
	title: "Layout/SolaceTabs",
	component: SolaceTabs,
	parameters: {},
	argTypes: {
		activeTabValue: {
			control: { type: "string" }
		}
	}
} as ComponentMeta<typeof SolaceTabs>;

const Template: ComponentStory<typeof SolaceTabs> = (args) => <SolaceTabs {...args} />;

export const DefaultTabs = Template.bind({});
DefaultTabs.args = {
	tabs: [
		{ label: "Tab One", value: "tab_one", href: "#" },
		{ label: "Tab Two", value: "tab_two", href: "#" },
		{ label: "Tab Three", value: "tab_three", href: "#" }
	],
	activeTabValue: "tab_one"
};

export const DisabledTabs = Template.bind({});
DisabledTabs.args = {
	tabs: [
		{ label: "Tab One", value: "tab_one", disabled: true, href: "#" },
		{ label: "Tab Two", value: "tab_two", href: "#" },
		{ label: "Tab Three", value: "tab_three", href: "#" }
	],
	activeTabValue: "tab_two"
};

export const WithCallbackTabs = (): ReactNode => {
	const [activeTabValue, setActiveTabValue] = useState("tab_one");
	const handleClick = (tabValue: string) => {
		setActiveTabValue(tabValue);
	};
	return (
		<SolaceTabs
			activeTabValue={activeTabValue}
			tabs={[
				{ label: "Tab One", value: "tab_one", onTabClick: handleClick },
				{ label: "Tab Two", value: "tab_two", onTabClick: handleClick },
				{ label: "Tab Three", value: "tab_three", onTabClick: handleClick }
			]}
		/>
	);
};
