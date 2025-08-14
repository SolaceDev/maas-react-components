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
import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";
import { SolaceBreadcrumb } from "@SolaceDev/maas-react-components";

(SolaceBreadcrumb as React.FC & { displayName?: string }).displayName = "SolaceBreadcrumb";

export default {
	title: "Navigation/Breadcrumb",
	component: SolaceBreadcrumb,
	parameters: {},
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Optional ID of this component",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		paths: {
			control: {
				type: "object"
			},
			description:
				"Array of Paths, each containing title, link, current (optional), tooltip (optional), progress (optional), and progressTooltip (optional)",
			table: {
				type: {
					summary:
						"Array<{ title: string; link: string; current?: boolean; tooltip?: string; progress?: boolean; progressTooltip?: string }>"
				},
				defaultValue: {
					summary: '[{ "title": "Home", "link": "/", "current": true }]'
				}
			}
		},
		maxItems: {
			control: {
				type: "number"
			},
			table: {
				type: { summary: "number | undefined" },
				defaultValue: { summary: "8" }
			},
			description: "Maximum of displayed paths (to see ... when there's more)"
		},
		onRouteClick: {
			action: "route clicked",
			description: "Callback function triggered when a route is clicked",
			table: {
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data QA attribute for testing",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: {
					summary: '"breadcrumbs"'
				}
			},
			defaultValue: "breadcrumbs"
		},
		dataTags: {
			control: { type: "text" },
			description: "Data tags attribute for additional metadata",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
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
