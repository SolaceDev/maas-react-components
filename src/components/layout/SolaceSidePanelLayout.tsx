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

import { Box, Drawer, styled } from "@mui/material";
export enum PANEL_POSITION {
	LEFT = "left",
	RIGHT = "right"
}

// Use `shouldForwardProp` to get rid of the warning that React does not recognize the custom prop on a DOM element.
const Main = styled("main", { shouldForwardProp: (prop) => prop === "children" })<{
	showSidePanel: boolean;
	overlayContent: boolean;
	sidePanelPosition: PANEL_POSITION;
	sidePanelWidth: number | string;
}>(({ theme, showSidePanel, sidePanelPosition, overlayContent }) => ({
	flexGrow: 1,
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.easeIn,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(showSidePanel &&
		sidePanelPosition === PANEL_POSITION.RIGHT &&
		!overlayContent && {
			marginRight: 0,
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			})
		}),
	...(showSidePanel &&
		sidePanelPosition === PANEL_POSITION.LEFT &&
		!overlayContent && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			}),
			marginLeft: 0
		})
}));

export interface SolaceSidePanelLayoutProps {
	/**
	 * The content you want to show/hide in the side panel
	 */
	sidePanelContent?: JSX.Element;
	/**
	 * Flag signifying if the side panel is expanded or collapsed
	 */
	showSidePanel: boolean;
	/**
	 * The desired width of the side panel
	 */
	sidePanelWidth?: number | string;
	/**
	 * property to control which side of the main content the side panel is rendered on
	 */
	sidePanelPosition?: PANEL_POSITION;
	/**
	 * Optional flag to have side panel (drawer) float over main content. default is set to false (shifting the main content)
	 */
	overlayContent?: boolean;
	/**
	 * The main content that is render on the screen regardless if the side panel is
	 * expanded or collapsed. As the side panel expands, the main content area shall be
	 * responsive and shink to accomodate it's size
	 */
	children: JSX.Element;
}

function SolaceSidePanelLayout({
	children,
	sidePanelContent,
	showSidePanel,
	sidePanelWidth = 320,
	sidePanelPosition = PANEL_POSITION.RIGHT,
	overlayContent = false
}: SolaceSidePanelLayoutProps): JSX.Element {
	return (
		<Box
			sx={{
				display: "flex",
				width: "100%",
				height: "100%",
				position: "relative",
				overflow: "hidden",
				...(sidePanelPosition === PANEL_POSITION.RIGHT && { flexDirection: "row-reverse" })
			}}
			id={"drawer-container"}
		>
			<Drawer
				sx={{
					width: showSidePanel ? sidePanelWidth : "0px",
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: sidePanelWidth,
						boxSizing: "border-box"
					},
					transition: "width 0.25s"
				}}
				PaperProps={{ style: { position: "absolute" } }}
				BackdropProps={{ style: { position: "absolute", display: "none" } }}
				ModalProps={{
					container: document.getElementById("drawer-container"),
					style: {
						position: "absolute",
						left: sidePanelPosition === PANEL_POSITION.RIGHT ? "unset" : 0, // by default MUI puts left and right set to 0 ... want
						right: sidePanelPosition === PANEL_POSITION.LEFT ? "unset" : 0 // to pick and choose when to force panel to left or right
					}
				}}
				variant={overlayContent ? "temporary" : "persistent"}
				anchor={sidePanelPosition}
				open={showSidePanel}
			>
				{sidePanelContent}
			</Drawer>
			<Main
				showSidePanel={showSidePanel}
				sidePanelPosition={sidePanelPosition}
				sidePanelWidth={sidePanelWidth}
				overlayContent={overlayContent}
			>
				{children}
			</Main>
		</Box>
	);
}
export default SolaceSidePanelLayout;
