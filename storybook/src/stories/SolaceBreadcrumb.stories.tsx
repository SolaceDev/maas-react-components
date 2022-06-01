import React from "react";
import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceBreadcrumb } from "@SolaceDev/maas-react-components";

export default {
	title: "Under Construction/SolaceBreadcrumb",
	component: SolaceBreadcrumb,
	parameters: {
		docs: {
			description: {
				component:
					"Breadcrumb component for mapping out navigation breadcrumb links (as buttons). On click, the component shall send back the targeted route as a string (for the containing applicaiton to react to)"
			}
		}
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Unique identifier for the breadcrumb component"
		},
		paths: {
			control: {
				type: "select"
			},
			description: "the list of route objects to render"
		},
		maxItems: {
			control: {
				type: "number"
			},
			description:
				"Specifies the maximum number of breadcrumbs to display. When there are more than the maximum number, only the first and last item will be shown, with an ellipsis in between"
		}
	}
} as ComponentMeta<typeof SolaceBreadcrumb>;

const Template: ComponentStory<typeof SolaceBreadcrumb> = (args) => <SolaceBreadcrumb {...args} />;
const ROUTE_CLICKED = "route clicked";

export const CurrentLink = Template.bind({});
CurrentLink.args = {
	onRouteClick: action(ROUTE_CLICKED),
	dataQa: "testBreadcrumb",
	paths: [
		{
			title: "Home",
			link: "",
			current: true
		}
	]
};

export const ChildLink = Template.bind({});
ChildLink.args = {
	onRouteClick: action(ROUTE_CLICKED),
	dataQa: "testBreadcrumb",
	paths: [
		{
			title: "Home",
			link: "/",
			current: false
		},
		{
			title: "Designer",
			link: "",
			current: true
		}
	]
};

export const GrandChildLink = Template.bind({});
GrandChildLink.args = {
	onRouteClick: action(ROUTE_CLICKED),
	dataQa: "testBreadcrumb",
	paths: [
		{
			title: "Home",
			link: "/",
			current: false
		},
		{
			title: "Designer",
			link: "/ep/designer",
			current: false
		},
		{
			title: "Catalog",
			link: "",
			current: true
		}
	]
};

export const CollapsedLinks = Template.bind({});
CollapsedLinks.args = {
	onRouteClick: action(ROUTE_CLICKED),
	dataQa: "testBreadcrumb",
	maxItems: 2,
	paths: [
		{
			title: "Home",
			link: "/",
			current: false
		},
		{
			title: "Designer",
			link: "/ep/designer",
			current: false
		},
		{
			title: "Catalog",
			link: "",
			current: true
		}
	]
};
