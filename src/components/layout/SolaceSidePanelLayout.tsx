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
	sidePanelWidth: number;
}>(({ theme, showSidePanel, sidePanelPosition, sidePanelWidth, overlayContent }) => ({
	flexGrow: 1,
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.easeIn,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(sidePanelPosition === PANEL_POSITION.RIGHT && { marginRight: `-${sidePanelWidth}px` }),

	...(showSidePanel &&
		sidePanelPosition === PANEL_POSITION.RIGHT &&
		!overlayContent && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			}),
			marginRight: 0
		}),
	...(sidePanelPosition === PANEL_POSITION.LEFT && { marginLeft: `-${sidePanelWidth}px` }),
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
	sidePanelWidth?: number;
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
					width: sidePanelWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: sidePanelWidth,
						boxSizing: "border-box"
					}
				}}
				PaperProps={{ style: { position: "absolute" } }}
				BackdropProps={{ style: { position: "absolute" } }}
				ModalProps={{
					container: document.getElementById("drawer-container"),
					style: { position: "absolute" }
				}}
				variant="persistent"
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
