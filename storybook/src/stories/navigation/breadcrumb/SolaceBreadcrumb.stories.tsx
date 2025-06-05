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
			description: "Optional ID of this component"
		},
		paths: {
			control: {
				type: "object"
			},
			description:
				"Array of Paths, each containing title, link, current (optional), tooltip (optional), progress (optional), and progressTooltip (optional)"
		},
		maxItems: {
			control: {
				type: "number"
			},
			defaultValue: 8,
			description: "Maximum of displayed paths (to see ... when there's more)"
		},
		onRouteClick: {
			control: false,
			description: "Optional click handler. When not set, it's assume a React Router's Link will be used"
		},
		dataQa: {
			control: { type: "text" },
			description: "Data QA attribute for testing",
			defaultValue: "breadcrumbs"
		},
		dataTags: {
			control: { type: "text" },
			description: "Data tags attribute for additional metadata"
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
