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
				component: "Code component name: SolaceIconTabs"
			}
		}
	},
	argTypes: {
		views: {
			control: { type: "object" },
			description: "Array of views (typical is 2 views but could be more)"
		},
		activeViewValue: {
			control: { type: "text" },
			description: "The value of the active view"
		},
		onViewClick: {
			action: "clicked",
			description: "Callback fired when the value changes"
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
