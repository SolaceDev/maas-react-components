import React, { ReactNode, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceTabs, SolaceBadge, SolaceButton } from "@SolaceDev/maas-react-components";

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

export const WithIconTabs = (): ReactNode => {
	const [activeTabValue, setActiveTabValue] = useState("tab_one");
	const [count, setCount] = useState(0);

	const handleTabClick = (tabValue: string) => {
		setActiveTabValue(tabValue);
	};

	const handleButtonClick = () => {
		setCount(count + 1);
	};

	const renderStyledTab = () => (
		<div style={{ display: "flex", gap: "4px" }}>
			<div>Subscribed</div>
			<SolaceBadge value={count} show={count !== 0} size={18} />
		</div>
	);

	return (
		<>
			<SolaceTabs
				activeTabValue={activeTabValue}
				tabs={[
					{ label: renderStyledTab(), value: "tab_one", onTabClick: handleTabClick },
					{ label: "Tab Two", value: "tab_two", onTabClick: handleTabClick },
					{ label: "Tab Three", value: "tab_three", onTabClick: handleTabClick }
				]}
			/>
			<div style={{ marginTop: "24px" }}>
				<SolaceButton variant="call-to-action" onClick={handleButtonClick}>
					Increase
				</SolaceButton>
			</div>
		</>
	);
};
