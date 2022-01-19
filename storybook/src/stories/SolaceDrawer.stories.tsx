import React, { ReactNode, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceDrawer, SolaceDetailMessage } from "@SolaceDev/maas-react-components";
import NoAccessImg from "../resources/images/NoAccessBook";

const btnID = "catalog-btn";
const VARIANT = "call-to-action";
const CLOSEPANEL = "Close Drawer";
const OPENPANEL = "Open Drawer";

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

export const WithParentAndContent = (): ReactNode => {
	const [open, setOpen] = useState(true);
	const handleClick = () => {
		setOpen(!open);
	};
	return (
		<>
			<div style={{ margin: "auto" }}>
				<SolaceDetailMessage
					msgImg={<NoAccessImg />}
					title="Drawer Demo"
					details={<span>Click the buton to toggle the drawer</span>}
					actions={[
						{
							id: btnID,
							variant: VARIANT,
							children: open ? CLOSEPANEL : OPENPANEL,
							onClick: handleClick
						}
					]}
				/>
			</div>
			<SolaceDrawer open={open} resizable={true}>
				{drawerMessage}
			</SolaceDrawer>
		</>
	);
};
