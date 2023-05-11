/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { ComponentMeta } from "@storybook/react";
import {
	SolaceSidePanelLayout,
	SolacePanelPosition,
	SolaceDetailMessage,
	styled,
	SolaceButton,
	ListSubheader,
	ChevronRightIcon,
	ChevronLeftIcon
} from "@SolaceDev/maas-react-components";
import NoAccessImg from "../../resources/images/NoAccessBook";
import { within, userEvent } from "@storybook/testing-library";

const btnID = "catalog-btn";
const VARIANT = "call-to-action";
const CLOSEPANEL = "Close Panel";
const OPENPANEL = "Open Panel";

const StoryContainer = styled("div")(() => ({
	height: "500px",
	width: "800px",
	margin: "0px auto",
	border: "solid 1px #000"
}));

const sidePanelMessage = (
	<div style={{ margin: "15px" }}>
		<h3>Side Panel</h3>
		<p>
			Here's a bunch of text that keeps repeating... Here's a bunch of text that keeps repeating... Here's a bunch of
			text that keeps repeating... Here's a bunch of text that keeps repeating... Here's a bunch of text that keeps
			repeating... Here's a bunch of text that keeps repeating... Here's a bunch of text that keeps repeating...{" "}
		</p>
		<p>
			Here's a bunch of text that keeps repeating... Here's a bunch of text that keeps repeating... Here's a bunch of
			text that keeps repeating... Here's a bunch of text that keeps repeating... Here's a bunch of text that keeps
			repeating... Here's a bunch of text that keeps repeating... Here's a bunch of text that keeps repeating...{" "}
		</p>
		<p>
			Here's a bunch of text that keeps repeating... Here's a bunch of text that keeps repeating... Here's a bunch of
			text that keeps repeating... Here's a bunch of text that keeps repeating... Here's a bunch of text that keeps
			repeating... Here's a bunch of text that keeps repeating... Here's a bunch of text that keeps repeating...{" "}
		</p>
		<p>
			Here's a bunch of text that keeps repeating... Here's a bunch of text that keeps repeating... Here's a bunch of
			text that keeps repeating... Here's a bunch of text that keeps repeating... Here's a bunch of text that keeps
			repeating... Here's a bunch of text that keeps repeating... Here's a bunch of text that keeps repeating...{" "}
		</p>
		<p>
			Here's a bunch of text that keeps repeating... Here's a bunch of text that keeps repeating... Here's a bunch of
			text that keeps repeating... Here's a bunch of text that keeps repeating... Here's a bunch of text that keeps
			repeating... Here's a bunch of text that keeps repeating... Here's a bunch of text that keeps repeating...{" "}
		</p>
		<p>
			Here's a bunch of text that keeps repeating... Here's a bunch of text that keeps repeating... Here's a bunch of
			text that keeps repeating... Here's a bunch of text that keeps repeating... Here's a bunch of text that keeps
			repeating... Here's a bunch of text that keeps repeating... Here's a bunch of text that keeps repeating...{" "}
		</p>
	</div>
);

export default {
	title: "Layout/SolaceSidePanelLayout",
	component: SolaceSidePanelLayout,
	parameters: {},
	argTypes: {
		showSidePanel: {
			control: { type: "boolean" }
		},
		sidePanelPosition: {
			options: ["right", "left"],
			control: { type: "select" }
		},
		sidePanelWidth: {
			control: {
				type: "number"
			}
		},
		overlayContent: {
			control: { type: "boolean" }
		}
	}
} as ComponentMeta<typeof SolaceSidePanelLayout>;

const mainContent = (panelOpen, handlePanelToggle) => (
	<SolaceDetailMessage
		msgImg={<NoAccessImg />}
		title="Side Panel Layout Demo"
		details={
			<p style={{ margin: "0px", padding: "0px 15px" }}>
				Click the buton to toggle the side panel{" "}
				<a href="http://www.someURL.com">some really really really long anchor tag to showcase all is clickable</a>
			</p>
		}
		actions={[
			{
				id: btnID,
				variant: VARIANT,
				children: panelOpen ? CLOSEPANEL : OPENPANEL,
				onClick: handlePanelToggle
			}
		]}
	/>
);

const sidePanelContent = (handlePanelToggle, rightSide: boolean) => (
	<React.Fragment>
		<ListSubheader style={{ textAlign: rightSide ? "left" : "right" }}>
			<SolaceButton onClick={handlePanelToggle} title="Close" variant="icon">
				{rightSide ? <ChevronRightIcon /> : <ChevronLeftIcon />}
			</SolaceButton>
		</ListSubheader>
		{sidePanelMessage}
	</React.Fragment>
);

export const DefaultSidePanel = (): JSX.Element => {
	const [panelOpen, setPanelOpen] = useState(false);

	const handlePanelToggle = () => {
		setPanelOpen(!panelOpen);
	};

	return (
		<StoryContainer>
			<SolaceSidePanelLayout showSidePanel={panelOpen} sidePanelContent={sidePanelMessage}>
				{mainContent(panelOpen, handlePanelToggle)}
			</SolaceSidePanelLayout>
		</StoryContainer>
	);
};
DefaultSidePanel.play = async ({ canvasElement }) => {
	// Starts querying the component from it's root element
	const canvas = within(canvasElement);
	await userEvent.click(await canvas.findByText(OPENPANEL));
};

export const LeftSidePanel = (): JSX.Element => {
	const [panelOpen, setPanelOpen] = useState(false);

	const handlePanelToggle = () => {
		setPanelOpen(!panelOpen);
	};

	return (
		<StoryContainer>
			<SolaceSidePanelLayout
				sidePanelContent={sidePanelMessage}
				showSidePanel={panelOpen}
				sidePanelPosition={SolacePanelPosition.LEFT}
			>
				{mainContent(panelOpen, handlePanelToggle)}
			</SolaceSidePanelLayout>
		</StoryContainer>
	);
};
LeftSidePanel.play = async ({ canvasElement }) => {
	// Starts querying the component from it's root element
	const canvas = within(canvasElement);
	await userEvent.click(await canvas.findByText(OPENPANEL));
};

export const CustomWidthSidePanel = (): JSX.Element => {
	const [panelOpen, setPanelOpen] = useState(false);

	const handlePanelToggle = () => {
		setPanelOpen(!panelOpen);
	};

	return (
		<StoryContainer>
			<SolaceSidePanelLayout sidePanelContent={sidePanelMessage} showSidePanel={panelOpen} sidePanelWidth={500}>
				{mainContent(panelOpen, handlePanelToggle)}
			</SolaceSidePanelLayout>
		</StoryContainer>
	);
};
CustomWidthSidePanel.play = async ({ canvasElement }) => {
	// Starts querying the component from it's root element
	const canvas = within(canvasElement);
	await userEvent.click(await canvas.findByText(OPENPANEL));
};

export const SelfClosingSidePanel = (): JSX.Element => {
	const handlePanelToggle = () => {
		setPanelOpen(!panelOpen);
	};
	const [panelOpen, setPanelOpen] = useState(false);

	return (
		<StoryContainer>
			<SolaceSidePanelLayout sidePanelContent={sidePanelContent(handlePanelToggle, true)} showSidePanel={panelOpen}>
				{mainContent(panelOpen, handlePanelToggle)}
			</SolaceSidePanelLayout>
		</StoryContainer>
	);
};
SelfClosingSidePanel.play = async ({ canvasElement }) => {
	// Starts querying the component from it's root element
	const canvas = within(canvasElement);
	await userEvent.click(await canvas.findByText(OPENPANEL));
};

export const OverlaySidePanelRight = (): JSX.Element => {
	const handlePanelToggle = () => {
		setPanelOpen(!panelOpen);
	};
	const [panelOpen, setPanelOpen] = useState(false);

	return (
		<StoryContainer>
			<SolaceSidePanelLayout
				sidePanelContent={sidePanelContent(handlePanelToggle, true)}
				showSidePanel={panelOpen}
				overlayContent={true}
				sidePanelWidth={400}
			>
				{mainContent(panelOpen, handlePanelToggle)}
			</SolaceSidePanelLayout>
		</StoryContainer>
	);
};
OverlaySidePanelRight.play = async ({ canvasElement }) => {
	// Starts querying the component from it's root element
	const canvas = within(canvasElement);
	await userEvent.click(await canvas.findByText(OPENPANEL));
};

export const OverlaySidePanelLeft = (): JSX.Element => {
	const handlePanelToggle = () => {
		setPanelOpen(!panelOpen);
	};
	const [panelOpen, setPanelOpen] = useState(false);

	return (
		<StoryContainer>
			<SolaceSidePanelLayout
				sidePanelContent={sidePanelContent(handlePanelToggle, false)}
				showSidePanel={panelOpen}
				overlayContent={true}
				sidePanelWidth={400}
				sidePanelPosition={SolacePanelPosition.LEFT}
			>
				{mainContent(panelOpen, handlePanelToggle)}
			</SolaceSidePanelLayout>
		</StoryContainer>
	);
};
OverlaySidePanelLeft.play = async ({ canvasElement }) => {
	// Starts querying the component from it's root element
	const canvas = within(canvasElement);
	await userEvent.click(await canvas.findByText(OPENPANEL));
};
