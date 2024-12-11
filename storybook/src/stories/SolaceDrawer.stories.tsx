import React, { ReactNode, useState } from "react";
import { Meta } from "@storybook/react";
import { SolaceDrawer, SolaceDetailMessage, styled } from "@SolaceDev/maas-react-components";
import NoAccessImg from "../resources/images/NoAccessBook";

(SolaceDrawer as React.FC & { displayName?: string }).displayName = "SolaceDrawer";
(SolaceDetailMessage as React.FC & { displayName?: string }).displayName = "SolaceDetailMessage";

enum ANCHOR {
	LEFT = "left",
	RIGHT = "right"
}

const INITIAL_WIDTH = 320;

const CALL_TO_ACTION = "call-to-action";

const drawerMessage = (
	<div style={{ margin: "15px" }}>
		<h3>Drawer</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
			magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
			imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
			velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing
			bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis
			imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
			vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi
			tincidunt. Lorem donec massa sapien faucibus et molestie ac.
		</p>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
			magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
			imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
			velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing
			bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis
			imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
			vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi
			tincidunt. Lorem donec massa sapien faucibus et molestie ac.
		</p>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
			magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
			imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
			velit laoreet id donec ultrices.
		</p>
	</div>
);

export default {
	title: "Under Construction/SolaceDrawer",
	component: SolaceDrawer,
	parameters: {},
	argTypes: {
		open: {
			control: { type: "boolean" }
		},
		width: {
			control: { type: "number" }
		},
		resizable: {
			control: { type: "boolean" }
		}
	}
} as Meta<typeof SolaceDrawer>;

export const DefaultDrawer = {
	args: {
		open: true
	}
};

export const DefaultLeftDrawerWithOffset = {
	args: {
		open: true,
		anchor: "left",
		offset: "200px"
	}
};

export const ResizableLeftDrawer = {
	args: {
		open: true,
		anchor: "left",
		resizable: true
	}
};

export const ResizableLeftDrawerWithOffset = {
	args: {
		open: true,
		anchor: "left",
		offset: "200px",
		resizable: true
	}
};

export const ResizableRightDrawer = {
	args: {
		open: true,
		resizable: true
	}
};

export const ResizableRightDrawerWithOffset = {
	args: {
		open: true,
		resizable: true,
		offset: "200px"
	}
};

const ContentBlock = styled("div")({
	height: "250px",
	width: "100%",
	backgroundColor: "rgba(0, 0, 0, 0.2)",
	marginTop: "24px",
	padding: "24px"
});

function useWindowWidth({ offset }) {
	const [width, setWidth] = React.useState(window.innerWidth - offset);

	React.useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth - offset);
		};
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	});

	// Return the width with debounce to reduce the frequency of re-rendering
	return width;
}

export const WithParentAndContent = (): ReactNode => {
	const [open, setOpen] = useState(true);
	const [anchor, setAnchor] = useState(ANCHOR.RIGHT);
	const [offset, setOffset] = useState("0");
	const [currentWidth, setCurrentWidth] = useState(INITIAL_WIDTH);
	const maxWidth = useWindowWidth({ offset: 0 });

	const handleOpenChange = () => {
		setOpen(!open);
	};
	const handleAnchorChange = () => {
		setAnchor(anchor === ANCHOR.RIGHT ? ANCHOR.LEFT : ANCHOR.RIGHT);
	};
	const handleOffsetChange = () => {
		setOffset(offset === "0" ? "100px" : "0");
	};
	const handleResizeDone = (newWidth: number) => {
		setCurrentWidth(newWidth);
	};

	return (
		<div style={{ display: "flex", flexDirection: "column", margin: "-16px" }}>
			<div
				style={{
					width: "100%",
					height: "80px",
					position: "fixed",
					borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
					backgroundColor: "white"
				}}
			>
				<div style={{ paddingTop: "30px", textAlign: "center" }}>Header</div>
			</div>
			<div style={{ overflowY: "hidden", marginTop: "80px" }}>
				<SolaceDetailMessage
					msgImg={<NoAccessImg />}
					title="Drawer Demo"
					details={<span>Click the buton to toggle the drawer</span>}
					actions={[
						{
							id: "open-button",
							variant: CALL_TO_ACTION,
							children: open ? "Close Drawer" : "Open Drawer",
							onClick: handleOpenChange
						},
						{
							id: "anchor-button",
							variant: CALL_TO_ACTION,
							children: anchor === ANCHOR.RIGHT ? "Change to Left" : "Change to Right",
							onClick: handleAnchorChange
						},
						{
							id: "anchor-button",
							variant: CALL_TO_ACTION,
							children: offset === "0" ? "Add Offset" : "Remove Offset",
							onClick: handleOffsetChange
						}
					]}
				/>
				<div style={{ textAlign: "center", marginTop: "32px" }}>
					{currentWidth === INITIAL_WIDTH ? "Initial Width: " : "New Width: "}
					{currentWidth}
					<p>*Only update after the action of resizing is completed.</p>
				</div>
				<ContentBlock>Content Block 1</ContentBlock>
				<ContentBlock>Content Block 2</ContentBlock>
			</div>
			<SolaceDrawer
				open={open}
				resizable={true}
				anchor={anchor}
				width={INITIAL_WIDTH}
				maxWidth={maxWidth}
				onResizeDone={handleResizeDone}
				top="80px"
				offset={offset}
				height="calc(100vh - 160px)"
			>
				{drawerMessage}
			</SolaceDrawer>
			<div
				style={{
					height: "80px",
					bottom: "0px",
					position: "sticky",
					borderTop: "1px solid rgba(0, 0, 0, 0.2)",
					backgroundColor: "white",
					zIndex: 100
				}}
			>
				<div style={{ paddingTop: "30px", textAlign: "center" }}>Footer</div>
			</div>
		</div>
	);
};
