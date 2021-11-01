import * as React from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import SolaceComponentProps from "../SolaceComponentProps";

interface TabProps extends SolaceComponentProps {
	/**
	 * Label of the tab
	 */
	label: string;
	/**
	 * Unique identifier of the tab
	 */
	value: string;
	/**
	 * The anchor tag of the tab. For tabs that have different routes
	 */
	href?: string;
	/**
	 * Optional click handler if href is not used for navigation
	 */
	onTabClick?: (tabValue: string) => void;
	/**
	 * If the tab is disabled
	 */
	disabled?: boolean;
}

interface SolaceTabsProps {
	tabs: TabProps[];
	/**
	 * The value of the active tab
	 */
	activeTabValue: string;
}

function AnchorTab(props: TabProps) {
	return (
		<Tab
			component="a"
			onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
				event.preventDefault();
				if (props.onTabClick) {
					// The unique tab value is passed back to the callback function
					props.onTabClick(props.value);
				}
			}}
			sx={{ height: "100%", textTransform: "none", fontWeight: "normal" }}
			{...props}
		/>
	);
}

function SolaceTabs({ tabs, activeTabValue }: SolaceTabsProps): JSX.Element {
	return (
		<Box sx={{ width: "100%" }}>
			<Tabs value={activeTabValue}>
				{tabs.map((item: TabProps) => (
					<AnchorTab {...item} key={item.value} />
				))}
			</Tabs>
		</Box>
	);
}

export default SolaceTabs;
