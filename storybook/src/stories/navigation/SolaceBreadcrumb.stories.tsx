import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";
import { SolaceBreadcrumb } from "@SolaceDev/maas-react-components";

(SolaceBreadcrumb as React.FC & { displayName?: string }).displayName = "SolaceBreadcrumb";

export default {
	title: "Navigation/Breadcrumb",
	component: SolaceBreadcrumb,
	parameters: {
		docs: {
			description: {
				component:
					"Breadcrumb component for mapping out navigation breadcrumb links (as buttons). On click, the component shall send back the targeted route as a string (for the containing applicaiton to react to). Code component name: SolaceBreadcrumb"
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
} as Meta<typeof SolaceBreadcrumb>;

const ROUTE_CLICKED = "route clicked";

export const CurrentLink = {
	args: {
		onRouteClick: action(ROUTE_CLICKED),
		dataQa: "testBreadcrumb",
		paths: [
			{
				title: "Home",
				link: "",
				current: true
			}
		]
	}
};

export const ChildLink = {
	args: {
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
	}
};

export const WithLongLabels = {
	args: {
		onRouteClick: action(ROUTE_CLICKED),
		dataQa: "testBreadcrumb",
		paths: [
			{
				title: "This is a very long label that should be clipped",
				link: "/",
				current: false,
				tooltip: "Some more info about this"
			},
			{
				title: "You are here",
				link: "",
				current: true
			}
		]
	}
};

export const WithRouter = {
	args: {
		paths: [
			{
				title: "Home",
				link: "/"
			},
			{
				title: "Designer",
				link: "",
				current: true
			}
		]
	}
};

export const GrandChildLink = {
	args: {
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
	}
};

export const CollapsedLinks = {
	args: {
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
	}
};

export const WithPreloaderAtParentRoute = {
	args: {
		paths: [
			{
				title: "Home",
				link: "/",
				progress: true,
				progressTooltip: "Loading Parent"
			},
			{
				title: "Designer",
				link: "",
				current: true
			}
		]
	}
};

export const WithPreloaderAtCurrentRoute = {
	args: {
		paths: [
			{
				title: "Home",
				link: "/"
			},
			{
				title: "Designer",
				link: "",
				current: true,
				progress: true,
				progressTooltip: "Loading Child"
			}
		]
	}
};

export const WithPreloaderAtEveryRoute = {
	args: {
		paths: [
			{
				title: "Home",
				link: "/",
				progress: true,
				progressTooltip: "Loading Parent"
			},
			{
				title: "Designer",
				link: "",
				current: true,
				progress: true,
				progressTooltip: "Loading Child"
			}
		]
	}
};
