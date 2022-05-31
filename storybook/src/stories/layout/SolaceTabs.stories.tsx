import React, { ReactNode, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceTabs, SolaceNotificationCounter, SolaceButton } from "@SolaceDev/maas-react-components";

export default {
	title: "Layout/SolaceTabs",
	component: SolaceTabs,
	parameters: {},
	argTypes: {
		activeTabValue: {
			control: { type: "text" }
		}
	}
} as ComponentMeta<typeof SolaceTabs>;

const Template: ComponentStory<typeof SolaceTabs> = (args) => <SolaceTabs {...args} />;

// The tabValue is a controlled state. The tab won't change if no callback is defined.
export const DefaultTabs = Template.bind({});
DefaultTabs.args = {
	tabs: [
		{ label: "Tab One", value: "tab_one", href: "#" },
		{ label: "Tab Two", value: "tab_two", href: "#" },
		{ label: "Tab Three", value: "tab_three", href: "#" }
	],
	activeTabValue: "tab_one"
};
export const IncreaseFontTabs = Template.bind({});
IncreaseFontTabs.args = {
	tabs: [
		{ label: "Tab One", value: "tab_one" },
		{ label: "Tab Two", value: "tab_two" },
		{ label: "Tab Three", value: "tab_three" }
	],
	activeTabValue: "tab_one",
	size: "md"
};
export const DisabledTabs = Template.bind({});
DisabledTabs.args = {
	tabs: [
		{ label: "Tab One", value: "tab_one", disabled: true },
		{ label: "Tab Two", value: "tab_two" },
		{ label: "Tab Three", value: "tab_three" }
	],
	activeTabValue: "tab_two"
};

export const WithCallbackTabs = (): ReactNode => {
	const [activeTabValue, setActiveTabValue] = useState("tab_one");
	const handleTabClick = (tabValue: string) => {
		setActiveTabValue(tabValue);
	};
	return (
		<SolaceTabs
			activeTabValue={activeTabValue}
			onTabClick={handleTabClick}
			tabs={[
				{ label: "Tab One", value: "tab_one" },
				{ label: "Tab Two", value: "tab_two" },
				{ label: "Tab Three", value: "tab_three" }
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

	const renderStyledTab1 = () => (
		<div style={{ display: "flex", gap: "4px" }}>
			<div>Subscribed</div>
			<SolaceNotificationCounter value={count} show={count !== 0} size={18} />
		</div>
	);

	const renderStyledTab2 = () => (
		<div style={{ display: "flex", gap: "4px" }}>
			<div>Published</div>
			<SolaceNotificationCounter value={2} size={18} animationDuration={0} />
		</div>
	);

	return (
		<>
			<SolaceTabs
				activeTabValue={activeTabValue}
				onTabClick={handleTabClick}
				tabs={[
					{ label: renderStyledTab1(), value: "tab_one" },
					{ label: renderStyledTab2(), value: "tab_two" },
					{ label: "Tab Three", value: "tab_three" }
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
