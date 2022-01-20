import React, { ReactNode, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceDrawer, SolaceDetailMessage, styled } from "@SolaceDev/maas-react-components";
import NoAccessImg from "../resources/images/NoAccessBook";

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
} as ComponentMeta<typeof SolaceDrawer>;

const Template: ComponentStory<typeof SolaceDrawer> = (args) => <SolaceDrawer {...args} />;

export const DefaultDrawer = Template.bind({});
DefaultDrawer.args = {
	open: true
};

export const ResizableLeftDrawer = Template.bind({});
ResizableLeftDrawer.args = {
	open: true,
	anchor: "left",
	resizable: true
};

export const ResizableRightDrawer = Template.bind({});
ResizableRightDrawer.args = {
	open: true,
	resizable: true
};

const DirectParent = styled("div", { shouldForwardProp: (prop) => prop !== "contained" })<{
	contained: boolean;
}>(({ contained }) => ({
	// To have the SolaceDrawer contained within the parent, a relative position is required.
	...(contained && { position: "relative" })
}));

export const WithParentAndContent = (): ReactNode => {
	const [open, setOpen] = useState(true);
	const [anchor, setAnchor] = useState(ANCHOR.RIGHT);
	const [contained, setContained] = useState(false);
	const [currentWidth, setCurrentWidth] = useState(INITIAL_WIDTH);
	const handleOpenChange = () => {
		setOpen(!open);
	};
	const handleAnchorChange = () => {
		setAnchor(anchor === ANCHOR.RIGHT ? ANCHOR.LEFT : ANCHOR.RIGHT);
	};
	const handleContainedChange = () => {
		setContained(!contained);
	};
	const handleResizeDone = (newWidth: number) => {
		setCurrentWidth(newWidth);
	};
	return (
		<div style={{ height: "100vh - 40px" }}>
			<div style={{ height: "80px", borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }}>
				<div style={{ paddingTop: "30px", textAlign: "center" }}>Header</div>
			</div>
			<DirectParent sx={{ height: "calc(100vh - 160px - 34px)" }} contained={contained}>
				<div style={{ margin: "auto" }}>
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
								id: "contained-button",
								variant: CALL_TO_ACTION,
								children: contained ? "Change to Float" : "Change to Contained",
								onClick: handleContainedChange
							}
						]}
					/>
					<div style={{ textAlign: "center", marginTop: "32px" }}>
						{currentWidth === INITIAL_WIDTH ? "Initial Width: " : "New Width: "}
						{currentWidth}
						<p>*Only update after the action of resizing is completed.</p>
					</div>
				</div>
				<SolaceDrawer
					open={open}
					resizable={true}
					anchor={anchor}
					width={INITIAL_WIDTH}
					onResizeDone={handleResizeDone}
				>
					{drawerMessage}
				</SolaceDrawer>
			</DirectParent>
			<div
				style={{
					height: "80px",
					bottom: "0px",
					position: "sticky",
					borderTop: "1px solid rgba(0, 0, 0, 0.2)"
				}}
			>
				<div style={{ paddingTop: "30px", textAlign: "center" }}>Footer</div>
			</div>
		</div>
	);
};
