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
import { GraphViewIcon } from "../../resources/images/GraphViewIcon";
import { ListViewIcon } from "../../resources/images/ListViewIcon";

const DemoMenu = (): JSX.Element => {
	return (
		<SolaceMenu
			buttonProps={{
				children: <MoreHorizOutlinedIcon />,
				title: "Actions",
				variant: "icon",
				dataQa: "actions"
			}}
			anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			transformOrigin={{ horizontal: "right", vertical: "top" }}
			id={"actions"}
			items={[
				{ name: "Menu Item 1" },
				{ name: "Menu Item 2" },
				{ name: "Menu Item 3", divider: true },
				{ name: "Menu Item 4" }
			]}
		/>
	);
};

export default {
	title: "Layout/SolacePageHeader",
	component: SolacePageHeader,
	parameters: {},
	argTypes: {
		title: {
			control: { type: "text" }
		},
		subTitle: {
			control: { type: "text" }
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
