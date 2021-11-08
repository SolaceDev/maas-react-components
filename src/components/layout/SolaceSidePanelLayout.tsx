import React from "react";
import { styled } from "@material-ui/core";

export enum PANEL_POSITION {
	LEFT = "left",
	RIGHT = "right"
}

export interface SolaceSidePanelLayoutProps {
	/**
	 * The content you want to show/hide in the side panel
	 */
	sidePanelContent?: JSX.Element;
	/**
	 * Flag signifying if the side panel is expanded or collapsed
	 */
	showSidePanel?: boolean;
	/**
	 * The desired width of the side panel
	 */
	sidePanelWidth?: number;
	/**
	 * property to control which side of the main content the side panel is rendered on
	 */
	sidePanelPosition?: PANEL_POSITION;
	/**
	 * The main content that is render on the screen regardless if the side panel is
	 * expanded or collapsed. As the side panel expands, the main content area shall be
	 * responsive and shink to accomodate it's size
	 */
	children: JSX.Element;
}

const SidePanelContainer = styled("div")(({ theme }) => ({
	...theme.mixins.sidePanelLayout_sidePanelSection
}));

const MainPanelContainer = styled("div")(({ theme }) => ({
	...theme.mixins.sidePanelLayout_contentPanelSection
}));

const PanelContainer = styled("div")(({ theme }) => ({
	...theme.mixins.sidePanelLayout_mainPanel
}));

function SolaceSidePanelLayout({
	children,
	sidePanelContent,
	showSidePanel,
	sidePanelWidth = 320,
	sidePanelPosition = PANEL_POSITION.RIGHT
}: SolaceSidePanelLayoutProps): JSX.Element {
	const panelPlacement =
		sidePanelPosition === PANEL_POSITION.RIGHT
			? `4fr minmax(${sidePanelWidth}px, 1fr)`
			: `minmax(${sidePanelWidth}px, 1fr) 4fr`;

	return (
		<PanelContainer sx={{ gridTemplateColumns: `${showSidePanel ? panelPlacement : "1fr"}` }}>
			{showSidePanel && sidePanelPosition === PANEL_POSITION.LEFT && (
				<SidePanelContainer>{sidePanelContent}</SidePanelContainer>
			)}
			<MainPanelContainer>{children}</MainPanelContainer>
			{showSidePanel && sidePanelPosition === PANEL_POSITION.RIGHT && (
				<SidePanelContainer>{sidePanelContent}</SidePanelContainer>
			)}
		</PanelContainer>
	);
}

export default SolaceSidePanelLayout;
