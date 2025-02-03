/* eslint-disable sonarjs/no-duplicate-string */
import React, { useState } from "react";
import { Meta } from "@storybook/react";
import { SolaceIconTabs } from "@SolaceDev/maas-react-components";
import { GraphViewIcon } from "../../resources/images/GraphViewIcon";
import { ListViewIcon } from "../../resources/images/ListViewIcon";

(SolaceIconTabs as React.FC & { displayName?: string }).displayName = "SolaceIconTabs";

export default {
	title: "Navigation/Tabs/Icons",
	component: SolaceIconTabs,
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceIconTabs"
			}
		}
	},
	argTypes: {}
} as Meta<typeof SolaceIconTabs>;

export function DefaultViewToggle(): JSX.Element {
	const [view, setView] = useState("view_graph");
	return (
		<SolaceIconTabs
			activeViewValue={view}
			views={[
				{ tooltip: "Graph View", icon: <GraphViewIcon />, value: "view_graph" },
				{ tooltip: "Components", icon: <ListViewIcon />, value: "view_components" }
			]}
			onViewClick={setView}
		/>
	);
}
