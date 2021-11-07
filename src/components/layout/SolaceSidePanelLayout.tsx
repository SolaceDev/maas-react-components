import React from "react";
import { styled } from "@material-ui/core";

export enum PANEL_POSITION {
	LEFT = "left",
	RIGHT = "right"
}

export interface SolaceSidePanelLayoutProps {
	mainContent: JSX.Element;
	sidePanelContent?: JSX.Element;
	showSidePanel?: boolean;
	sidePanelWidth?: number;
	sidePanelPosition?: PANEL_POSITION;
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
	mainContent,
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
			<MainPanelContainer>{mainContent}</MainPanelContainer>
			{showSidePanel && sidePanelPosition === PANEL_POSITION.RIGHT && (
				<SidePanelContainer>{sidePanelContent}</SidePanelContainer>
			)}
		</PanelContainer>
	);
}

export default SolaceSidePanelLayout;
