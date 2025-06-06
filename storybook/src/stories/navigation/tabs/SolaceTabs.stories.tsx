import React, { ReactNode, useState } from "react";
import { Meta } from "@storybook/react";
import { SolaceTabs, SolaceNotificationCounter, SolaceButton } from "@SolaceDev/maas-react-components";

(SolaceTabs as React.FC & { displayName?: string }).displayName = "SolaceTabs";
(SolaceNotificationCounter as React.FC & { displayName?: string }).displayName = "SolaceNotificationCounter";
(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";

export default {
	title: "Navigation/Tabs/Standard",
	component: SolaceTabs,
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceTabs"
			}
		}
	},
	argTypes: {
		tabs: {
			control: { type: "object" },
			description: "Array of tab objects with label, value, and optional properties"
		},
		activeTabValue: {
			control: { type: "text" },
			description: "The value of the active tab"
		},
		onTabClick: {
			action: "clicked",
			description: "Callback fired when a tab is clicked"
		},
		size: {
			control: "select",
			description:
				"Size of the tab font. Uses TabSize enum from https://github.com/SolaceDev/maas-react-components/blob/main/src/types/solaceTabs.ts"
		},
		variant: {
			control: "select",
			description:
				"The variant to use. Uses TabVariant enum from https://github.com/SolaceDev/maas-react-components/blob/main/src/types/solaceTabs.ts"
		}
	}
} as Meta<typeof SolaceTabs>;

export const DefaultTabs = {
	args: {
		tabs: [
			{ label: "Tab One", value: "tab_one", href: "#" },
			{ label: "Tab Two", value: "tab_two", href: "#" },
			{ label: "Tab Three", value: "tab_three", href: "#" }
		],
		activeTabValue: "tab_one"
	}
};

export const IncreaseFontTabs = {
	args: {
		tabs: [
			{ label: "Tab One", value: "tab_one" },
			{ label: "Tab Two", value: "tab_two" },
			{ label: "Tab Three", value: "tab_three" }
		],
		activeTabValue: "tab_one",
		size: "md"
	}
};

export const DisabledTabs = {
	args: {
		tabs: [
			{ label: "Tab One", value: "tab_one", disabled: true },
			{ label: "Tab Two", value: "tab_two" },
			{ label: "Tab Three", value: "tab_three" }
		],
		activeTabValue: "tab_two"
	}
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
			<SolaceNotificationCounter
				value={count}
				show={count !== 0}
				size={18}
				animationDuration={500}
				animationRepeatsInitialCount={1}
				animationRepeatsUpdateCount={1}
				title={`${count} new event${count > 1 ? "s" : ""}`}
			/>
		</div>
	);

	const renderStyledTab2 = () => (
		<div style={{ display: "flex", gap: "4px" }}>
			<div>Published</div>
			<SolaceNotificationCounter
				value={2}
				size={18}
				animationRepeatsInitialCount={1}
				animationRepeatsUpdateCount={1}
				title="2 new events"
			/>
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

export const WithSingleTab = {
	args: {
		tabs: [{ label: "Tab One", value: "tab_one", href: "#" }],
		activeTabValue: "tab_one"
	}
};

export const FullWidthTabs = {
	args: {
		tabs: [
			{ label: "Tab One", value: "tab_one", href: "#" },
			{ label: "Tab Two", value: "tab_two", href: "#" },
			{ label: "Tab Three", value: "tab_three", href: "#" }
		],
		activeTabValue: "tab_one",
		variant: "fullWidth"
	}
};

export const ScrollableTabs = (): ReactNode => {
	const [activeTabValue, setActiveTabValue] = useState("tab_one");
	const handleTabClick = (tabValue: string) => {
		setActiveTabValue(tabValue);
	};
	return (
		<div style={{ width: "800px" }}>
			<SolaceTabs
				activeTabValue={activeTabValue}
				onTabClick={handleTabClick}
				variant="scrollable"
				tabs={[
					{ label: "Tab One with Long Name", value: "tab_one", href: "#" },
					{ label: "Tab Two with Long Name", value: "tab_two", href: "#" },
					{ label: "Tab Three with Long Name", value: "tab_three", href: "#" },
					{ label: "Tab Four", value: "tab_four", href: "#" },
					{ label: "Tab Five with Long Name", value: "tab_five", href: "#" },
					{ label: "Tab Six", value: "tab_six", href: "#" }
				]}
			/>
		</div>
	);
};
