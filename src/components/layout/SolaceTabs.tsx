import * as React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import SolaceComponentProps from "../SolaceComponentProps";

interface TabProps {
	/**
	 * Label of the tab
	 */
	label: string | JSX.Element;
	/**
	 * Unique identifier of the tab
	 */
	value: string;
	/**
	 * The route pathname of the tab. For tabs that have different routes.
	 */
	href?: string;
	/**
	 * Optional click handler if routes is not used for navigation. For in-page navigation.
	 */
	onTabClick?: (tabValue: string) => void;
	/**
	 * If the tab is disabled
	 */
	disabled?: boolean;
}

interface SolaceTabsProps extends SolaceComponentProps {
	tabs: TabProps[];
	/**
	 * The value of the active tab
	 */
	activeTabValue: string;
	/**
	 * Callback fired when the value changes.
	 */
	onTabClick?: (value: string) => void;
}

function AnchorTab(props: TabProps) {
	const { onTabClick, ...rest } = props;
	return (
		<Tab
			component="a"
			onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
				event.preventDefault();
				if (onTabClick) {
					// The unique tab value is passed back to the callback function
					onTabClick(props.value);
				}
			}}
			disableRipple={true}
			sx={{ height: "100%" }}
			{...rest}
		/>
	);
}

function SolaceTabs({ tabs, activeTabValue, onTabClick }: SolaceTabsProps): JSX.Element {
	const handleChange = (_e: React.SyntheticEvent, value: string) => {
		onTabClick?.(value);
	};
	return (
		<Box sx={{ width: "100%" }}>
			<Tabs value={activeTabValue} onChange={handleChange}>
				{tabs.map((item: TabProps) => (
					<AnchorTab {...item} key={`anchroTab-${item.value}`} />
				))}
			</Tabs>
		</Box>
	);
}

export default SolaceTabs;
