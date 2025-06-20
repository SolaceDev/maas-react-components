/* eslint-disable sonarjs/no-duplicate-string */
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SolaceIconTabs } from "@SolaceDev/maas-react-components";
import { GraphViewIcon } from "../../../resources/images/GraphViewIcon";
import { ListViewIcon } from "../../../resources/images/ListViewIcon";

(SolaceIconTabs as React.FC & { displayName?: string }).displayName = "SolaceIconTabs";

const meta: Meta<typeof SolaceIconTabs> = {
	title: "Navigation/Tabs/Icons",
	component: SolaceIconTabs,
	parameters: {
		docs: {
			description: {
				component:
					"Icon tabs component for view switching with icon-based navigation. Code component name: SolaceIconTabs"
			}
		}
	},
	args: {
		views: [
			{ tooltip: "Graph View", icon: <GraphViewIcon />, value: "view_graph" },
			{ tooltip: "Components", icon: <ListViewIcon />, value: "view_components" }
		],
		activeViewValue: "view_graph"
	},
	argTypes: {
		views: {
			control: { type: "object" },
			description: "Array of views (typical is 2 views but could be more)",
			table: {
				defaultValue: { summary: "[]" }
			}
		},
		activeViewValue: {
			control: { type: "text" },
			description: "The value of the active view",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		onViewClick: {
			action: "clicked",
			description: "Callback fired when the value changes",
			table: {
				defaultValue: { summary: "undefined" }
			}
		}
	}
};

export default meta;
type Story = StoryObj<typeof SolaceIconTabs>;

export const DefaultViewToggle: Story = {
	args: {
		activeViewValue: "view_graph",
		views: [
			{ tooltip: "Graph View", icon: <GraphViewIcon />, value: "view_graph" },
			{ tooltip: "Components", icon: <ListViewIcon />, value: "view_components" }
		],
		onViewClick: action("onViewClick")
	}
};
