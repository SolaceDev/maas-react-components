/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
		activeTabValue: {
			control: { type: "text" }
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
