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

/* eslint-disable sonarjs/no-duplicate-string */
import React, { useState } from "react";
import { Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
	MoreHorizOutlinedIcon,
	SolaceBreadcrumb,
	SolaceButton,
	SolaceEnvironmentChip,
	SolaceEnvironmentSelectChip,
	SolaceEnvironmentSelectChipOption,
	SolaceIconTabs,
	SolaceMenu,
	SolacePageHeader,
	SolaceTabs,
	useTheme
} from "@SolaceDev/maas-react-components";
import { Broker16Icon, RocketLaunch16Icon, TestTube16Icon, DeployedCode16Icon } from "@SolaceDev/maas-icons";
import { GraphViewIcon } from "../../../resources/images/GraphViewIcon";
import { ListViewIcon } from "../../../resources/images/ListViewIcon";

(SolacePageHeader as React.FC & { displayName?: string }).displayName = "SolacePageHeader";
(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";
(SolaceTabs as React.FC & { displayName?: string }).displayName = "SolaceTabs";
(SolaceEnvironmentChip as React.FC & { displayName?: string }).displayName = "SolaceEnvironmentChip";
(SolaceEnvironmentSelectChip as React.FC & { displayName?: string }).displayName = "SolaceEnvironmentSelectChip";

const DemoMenu = (): JSX.Element => {
	return (
		<SolaceMenu
			buttonProps={{
				children: <MoreHorizOutlinedIcon />,
				title: "Actions",
				variant: "icon"
			}}
			anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			transformOrigin={{ horizontal: "right", vertical: "top" }}
			id="actions"
			items={[
				{ name: "Menu Item 1", onMenuItemClick: action("menu-item-1") },
				{ name: "Menu Item 2", onMenuItemClick: action("menu-item-2") },
				{ name: "Menu Item 3", onMenuItemClick: action("menu-item-3"), divider: true },
				{ name: "Menu Item 4", onMenuItemClick: action("menu-item-4") }
			]}
		/>
	);
};

export default {
	title: "Navigation/Page Header",
	component: SolacePageHeader,
	parameters: {},
	args: {
		id: "",
		title: "Page Name",
		subTitle: "",
		release: "",
		environment: undefined,
		borderTop: "",
		breadcrumbs: undefined,
		actions: undefined,
		actionMenu: undefined,
		tabs: undefined,
		iconTabs: undefined,
		returnTo: undefined,
		dataQa: "",
		dataTags: ""
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Optional id to be used",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		title: {
			control: { type: "text" },
			description: "The header's title to display",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		subTitle: {
			control: { type: "text" },
			description: "The sub-title to display next to the title",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		release: {
			control: { type: "text" },
			description: "The release string (e.g. 'BETA')",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		environment: {
			control: { type: "object" },
			description: "The environment's chip (SolaceEnvironmentChip or SolaceEnvironmentSelectChip)",
			table: {
				defaultValue: { summary: "undefined" }
			}
		},
		borderTop: {
			control: { type: "text" },
			description: "The header's top border color",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		breadcrumbs: {
			control: { type: "object" },
			description: "Breadcrumbs where the last path should be the current one",
			table: {
				defaultValue: { summary: "undefined" }
			}
		},
		actions: {
			control: { type: "object" },
			description: "Array of actions (like SolaceButton)",
			table: {
				defaultValue: { summary: "undefined" }
			}
		},
		actionMenu: {
			control: { type: "object" },
			description: "The action menu (usually with a '...' icon)",
			table: {
				defaultValue: { summary: "undefined" }
			}
		},
		tabs: {
			control: { type: "object" },
			description: "The tabs (SolaceTabs) to be displayed next to the title/sub-title",
			table: {
				defaultValue: { summary: "undefined" }
			}
		},
		iconTabs: {
			control: { type: "object" },
			description: "The icon tabs (SolaceIconTabs) to be displayed before the title/sub-title",
			table: {
				defaultValue: { summary: "undefined" }
			}
		},
		returnTo: {
			control: { type: "object" },
			description: "Used to add a 'Return to X' link in front of the breadcrumbs",
			table: {
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data QA attribute for testing",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data tags attribute for additional metadata",
			table: {
				defaultValue: { summary: '""' }
			}
		}
	}
} as Meta<typeof SolacePageHeader>;

export const DefaultPageHeader = {
	args: {
		title: "Page Name"
	}
};

export const WithSubTitle = {
	args: {
		title: "Title",
		subTitle: "Sub Title"
	}
};

export const WithBreadcrumbs = (): JSX.Element => {
	return (
		<SolacePageHeader
			title="Service Details"
			subTitle="My Service"
			breadcrumbs={
				<SolaceBreadcrumb
					paths={[
						{ title: "Cluster Manager", link: "/#1" },
						{ title: "Services Details", link: "/#2", current: true }
					]}
					onRouteClick={action("callback")}
				/>
			}
		/>
	);
};

export const WithRouterBreadcrumbs = {
	args: {
		title: "Service Details",
		subTitle: "My Service",
		breadcrumbs: [
			{ title: "Cluster Manager", link: "/#1" },
			{ title: "Services Details", link: "/#2", current: true }
		]
	}
};

export const WithBreadcrumbsAndRelease = {
	args: {
		title: "Mesh Manager",
		breadcrumbs: [{ title: "Mesh Manager", link: "#1", current: true }],
		release: "BETA"
	}
};

export const WithReturnTo = (): JSX.Element => {
	return (
		<SolacePageHeader
			title="Runtime Event Manager"
			breadcrumbs={[{ title: "Runtime Event Manager", link: "#1", current: true }]}
			returnTo={
				<SolaceButton variant="link" href="#" onClick={() => 0}>
					Return to Catalog
				</SolaceButton>
			}
		/>
	);
};

export const WithTabs = (): JSX.Element => {
	const [activeTabValue, setActiveTabValue] = useState("status");
	const handleTabClick = (tabValue: string) => {
		setActiveTabValue(tabValue);
	};

	return (
		<SolacePageHeader
			title="Service Details"
			subTitle="My Service"
			breadcrumbs={[
				{ title: "Cluster Manager", link: "/#1" },
				{ title: "Services Details", link: "/#2", current: true }
			]}
			tabs={
				<SolaceTabs
					activeTabValue={activeTabValue}
					tabs={[
						{ label: "Status", value: "status" },
						{ label: "Connect", value: "connect" },
						{ label: "Manage", value: "manage" },
						{ label: "Monitoring", value: "monitoring" },
						{ label: "Configuration", value: "configuration" },
						{ label: "Try Me!", value: "tryme" }
					]}
					onTabClick={handleTabClick}
				></SolaceTabs>
			}
		/>
	);
};

export const WithLongSubTitle = (): JSX.Element => {
	const [activeTabValue, setActiveTabValue] = useState("status");
	const handleTabClick = (tabValue: string) => {
		setActiveTabValue(tabValue);
	};

	return (
		<SolacePageHeader
			title="Service Details"
			subTitle="ThisIsAVeryLongTitleWithManyCharactersWithoutAnySpaces"
			breadcrumbs={[
				{ title: "Cluster Manager", link: "/#1" },
				{ title: "Services Details", link: "/#2", current: true }
			]}
			tabs={
				<SolaceTabs
					activeTabValue={activeTabValue}
					tabs={[
						{ label: "Status", value: "status" },
						{ label: "Connect", value: "connect" },
						{ label: "Manage", value: "manage" },
						{ label: "Monitoring", value: "monitoring" },
						{ label: "Configuration", value: "configuration" },
						{ label: "Try Me!", value: "tryme" }
					]}
					onTabClick={handleTabClick}
				></SolaceTabs>
			}
		/>
	);
};

export const WithActionMenu = (): JSX.Element => {
	return <SolacePageHeader title="Service Details" subTitle="My Service" actionMenu={<DemoMenu />} />;
};

export const WithOneAction = (): JSX.Element => {
	return (
		<SolacePageHeader
			title="Cluster Manager"
			subTitle="Services"
			actions={[
				<SolaceButton key="create" variant="text">
					Create Service
				</SolaceButton>
			]}
		/>
	);
};

export const WithMultipleActions = (): JSX.Element => {
	return (
		<SolacePageHeader
			title="Runtime Event Manager"
			breadcrumbs={[{ title: "Runtime Event Manager", link: "#1", current: true }]}
			actions={[
				<SolaceButton key="manage_agents" variant="text">
					Manage Event Management Agents
				</SolaceButton>,
				<SolaceButton key="create_mee" variant="call-to-action">
					Create Modeled Event Mesh
				</SolaceButton>
			]}
		/>
	);
};

export const WithActionsAndMenu = (): JSX.Element => {
	return (
		<SolacePageHeader
			title="Designer"
			subTitle="Application Domains"
			breadcrumbs={[{ title: "Designer", link: "#1", current: true }]}
			actions={[
				<SolaceButton key="create_app" variant="text">
					Create Application
				</SolaceButton>
			]}
			actionMenu={<DemoMenu />}
		/>
	);
};

export const WithIconTabs = (): JSX.Element => {
	const [activeViewValue, setActiveViewValue] = useState("view_1");
	const handleViewClick = (viewValue: string) => {
		setActiveViewValue(viewValue);
	};

	return (
		<SolacePageHeader
			title="Graph View"
			subTitle="My Application"
			breadcrumbs={[
				{ title: "Designer", link: "/#1" },
				{ title: "My Application", link: "/#2", current: true }
			]}
			iconTabs={
				<SolaceIconTabs
					activeViewValue={activeViewValue}
					views={[
						{ tooltip: "Graph View", icon: <GraphViewIcon />, value: "view_1" },
						{ tooltip: "Components", icon: <ListViewIcon />, value: "view_2" }
					]}
					onViewClick={handleViewClick}
				/>
			}
		/>
	);
};

const pickColor = (options: SolaceEnvironmentSelectChipOption[], value: string): string => {
	const option = options.find((opt) => opt.value === value);
	if (option) {
		return option.bgColor;
	}
	return "";
};

export const WithEnvironmentChip = (): JSX.Element => {
	const {
		palette: { ux }
	} = useTheme();

	return (
		<SolacePageHeader
			title="Title"
			subTitle="Sub Title"
			environment={
				<SolaceEnvironmentChip
					fgColor={ux.primary.text.w10}
					bgColor={ux.accent.n0.wMain}
					label={"Default Environment"}
					icon={<DeployedCode16Icon />}
				/>
			}
			borderTop={ux.accent.n0.wMain}
		/>
	);
};

export const WithEnvironmentSelectChip = (): JSX.Element => {
	const [value, setValue] = React.useState<string>("default");

	const {
		palette: { ux }
	} = useTheme();

	const options: SolaceEnvironmentSelectChipOption[] = [
		{
			label: "Default",
			value: "default",
			bgColor: ux.background.w10,
			fgColor: ux.primary.text.w100,
			icon: <Broker16Icon />
		},
		{
			label: "Production",
			value: "prod",
			bgColor: ux.accent.n9.wMain,
			fgColor: ux.primary.text.w10,
			icon: <RocketLaunch16Icon />
		},
		{
			label: "Test",
			value: "test",
			bgColor: ux.accent.n7.wMain,
			fgColor: ux.primary.text.w100,
			icon: <TestTube16Icon />
		}
	];

	return (
		<SolacePageHeader
			title="Cluster Manager"
			subTitle="Services"
			environment={
				<SolaceEnvironmentSelectChip
					name="env"
					value={value}
					onChange={({ value }) => setValue(value)}
					options={options}
				/>
			}
			borderTop={pickColor(options, value)}
			breadcrumbs={[{ title: "Cluster Manager", link: "/", current: true }]}
			actions={[
				<SolaceButton key="do_something1" variant="text">
					Create Service
				</SolaceButton>
			]}
		/>
	);
};

export const EverythingButTheKitchenSink = (): JSX.Element => {
	const [value, setValue] = React.useState<string>("default");
	const [activeTabValue, setActiveTabValue] = useState("tab_1");
	const [activeViewValue, setActiveViewValue] = useState("view_graph");
	const handleTabClick = (tabValue: string) => {
		setActiveTabValue(tabValue);
	};
	const handleViewClick = (viewValue: string) => {
		setActiveViewValue(viewValue);
	};

	const {
		palette: { ux }
	} = useTheme();

	const options: SolaceEnvironmentSelectChipOption[] = [
		{
			label: "Default",
			value: "default",
			bgColor: ux.background.w10,
			fgColor: ux.primary.text.w100,
			icon: <Broker16Icon />
		},
		{
			label: "Production",
			value: "prod",
			bgColor: ux.accent.n9.wMain,
			fgColor: ux.primary.text.w10,
			icon: <RocketLaunch16Icon />
		},
		{
			label: "Test",
			value: "test",
			bgColor: ux.accent.n7.wMain,
			fgColor: ux.primary.text.w100,
			icon: <TestTube16Icon />
		}
	];

	return (
		<SolacePageHeader
			title="Title"
			subTitle="Sub Title"
			environment={
				<SolaceEnvironmentSelectChip
					name="env"
					value={value}
					onChange={({ value }) => setValue(value)}
					options={options}
				/>
			}
			borderTop={pickColor(options, value)}
			release="BETA"
			breadcrumbs={[
				{ title: "Product", link: "/#1" },
				{ title: "Title", link: "/#2", current: true }
			]}
			actions={[
				<SolaceButton key="do_something1" variant="text">
					Do Something
				</SolaceButton>,
				<SolaceButton key="do_something2" variant="text">
					Do Something Else
				</SolaceButton>
			]}
			actionMenu={<DemoMenu />}
			tabs={
				<SolaceTabs
					activeTabValue={activeTabValue}
					tabs={[
						{ label: "Tab #1", value: "tab_1" },
						{ label: "Tab #2", value: "tab_2" },
						{ label: "Tab #3", value: "tab_3" }
					]}
					onTabClick={handleTabClick}
				></SolaceTabs>
			}
			iconTabs={
				<SolaceIconTabs
					activeViewValue={activeViewValue}
					views={[
						{ tooltip: "Graph View", icon: <GraphViewIcon />, value: "view_graph" },
						{ tooltip: "Components", icon: <ListViewIcon />, value: "view_components" }
					]}
					onViewClick={handleViewClick}
				/>
			}
		/>
	);
};
