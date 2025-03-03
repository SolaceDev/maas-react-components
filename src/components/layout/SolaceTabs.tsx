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
	size?: keyof BASE_FONT_PX_SIZE_TYPES;
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
	"&:focus": {
		border: `1px solid ${theme.palette.ux.accent.n2.wMain}`,
		outline: "none"
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
	const handleChange = (_e: React.SyntheticEvent, value: string) => {
		onTabClick?.(value);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (["ArrowRight", "ArrowLeft"].includes(event.key)) {
			event.preventDefault();
			const currentIndex = tabs.findIndex((tab) => tab.value === activeTabValue);
			let newIndex = currentIndex;
			if (event.key === "ArrowRight") {
				newIndex = (currentIndex + 1) % tabs.length;
			} else if (event.key === "ArrowLeft") {
				newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
			}
			onTabClick?.(tabs[newIndex].value);
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
				{tabs.map((item: TabProps) => (
					<AnchorTab {...item} key={`anchroTab-${item.value}`} size={size} />
				))}
			</Tabs>
		</Box>
	);
}

export default SolaceTabs;
