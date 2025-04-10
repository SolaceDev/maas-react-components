import * as React from "react";
import { Box, Tabs, Tab, Theme } from "@mui/material";
import SolaceComponentProps from "../SolaceComponentProps";
import { BASE_FONT_PX_SIZES, BASE_FONT_PX_SIZE_TYPES } from "../../resources/typography";

export interface TabProps {
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
	/**
	 * Size of the tab font
	 */
	size?: keyof BASE_FONT_PX_SIZE_TYPES;
	/**
	 * Tab index for keyboard navigation
	 */
	tabIndex?: number;
}

export interface SolaceTabsProps extends SolaceComponentProps {
	tabs: TabProps[];
	/**
	 * The value of the active tab
	 */
	activeTabValue: string;
	/**
	 * Callback fired when the value changes.
	 */
	onTabClick?: (value: string) => void;
	size?: keyof BASE_FONT_PX_SIZE_TYPES;
	/**
	 * scrollable will invoke scrolling properties and allow for horizontally scrolling of the tab bar.
	 * fullWidth will make the tabs grow to use all the available space.
	 * standard will render the default state.
	 */
	variant?: "fullWidth" | "scrollable" | "standard";
}

const tabStyles = (theme: Theme, size: keyof BASE_FONT_PX_SIZE_TYPES) => ({
	height: "100%",
	fontSize: BASE_FONT_PX_SIZES[size],
	"&.Mui-focusVisible": {
		padding: "11px 15px 13px 15px",
		border: `1px solid ${theme.palette.ux.accent.n2.wMain}`
	}
});

function AnchorTab(props: TabProps) {
	const { onTabClick, size = "sm", ...rest } = props;

	const onClickCallBack = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		event.preventDefault();
		if (onTabClick) {
			// The unique tab value is passed back to the callback function
			onTabClick(props.value);
		}
	};

	return <Tab component="a" onClick={onClickCallBack} disableRipple sx={(theme) => tabStyles(theme, size)} {...rest} />;
}

function SolaceTabs({
	tabs,
	activeTabValue,
	onTabClick,
	size = "sm",
	variant = "standard"
}: SolaceTabsProps): JSX.Element {
	// Find initial focused index directly (without useMemo)
	const [focusedTabIndex, setFocusedTabIndex] = React.useState(() =>
		tabs.findIndex((tab) => tab.value === activeTabValue)
	);

	// Update focused tab index when active tab changes
	React.useEffect(() => {
		const activeIndex = tabs.findIndex((tab) => tab.value === activeTabValue);
		if (activeIndex !== -1) {
			setFocusedTabIndex(activeIndex);
		}
	}, [activeTabValue, tabs]);

	const handleChange = (_e: React.SyntheticEvent, value: string) => {
		onTabClick?.(value);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		const { key } = event;

		if (["ArrowRight", "ArrowDown"].includes(key)) {
			event.preventDefault();
			const newIndex = (focusedTabIndex + 1) % tabs.length;
			setFocusedTabIndex(newIndex);
		} else if (["ArrowLeft", "ArrowUp"].includes(key)) {
			event.preventDefault();
			const newIndex = (focusedTabIndex - 1 + tabs.length) % tabs.length;
			setFocusedTabIndex(newIndex);
		} else if (key === " " || key === "Enter") {
			event.preventDefault();
			onTabClick?.(tabs[focusedTabIndex].value);
		}
	};

	return (
		<Box sx={{ width: "100%", fontSize: BASE_FONT_PX_SIZES[size] }}>
			<Tabs
				value={activeTabValue}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				className={tabs.length === 1 ? "singleTab" : ""}
				variant={variant}
			>
				{tabs.map((item) => (
					<AnchorTab
						{...item}
						key={`anchorTab-${item.value}`}
						size={size}
						tabIndex={item.value === activeTabValue ? 0 : -1}
					/>
				))}
			</Tabs>
		</Box>
	);
}

export default SolaceTabs;
