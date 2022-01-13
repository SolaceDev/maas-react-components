/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { ComponentMeta } from "@storybook/react";
import {
	SolaceSidePanelLayout,
	SolacePanelPosition,
	SolaceDetailMessage,
	styled,
	SolaceButton,
	ListSubheader
} from "@SolaceDev/maas-react-components";
import NoAccessImg from "../../resources/images/NoAccessBook";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

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

export const DefaultSidePanel = (): JSX.Element => {
	const [panelOpen, setPanelOpen] = useState(true);

	const HandlePanelToggle = () => {
		setPanelOpen(!panelOpen);
	};

	return (
		<StoryContainer>
			<SolaceSidePanelLayout showSidePanel={panelOpen} sidePanelContent={sidePanelMessage}>
				<SolaceDetailMessage
					msgImg={<NoAccessImg />}
					title="Side Panel Layout Demo"
					details={<span>Click the buton to toggle the side panel</span>}
					actions={[
						{
							id: btnID,
							variant: VARIANT,
							children: panelOpen ? CLOSEPANEL : OPENPANEL,
							onClick: HandlePanelToggle
						}
					]}
				/>
			</SolaceSidePanelLayout>
		</StoryContainer>
	);
};

export const LeftSidePane = (): JSX.Element => {
	const [panelOpen, setPanelOpen] = useState(true);

	const HandlePanelToggle = () => {
		setPanelOpen(!panelOpen);
	};

	return (
		<StoryContainer>
			<SolaceSidePanelLayout
				sidePanelContent={sidePanelMessage}
				showSidePanel={panelOpen}
				sidePanelPosition={SolacePanelPosition.LEFT}
			>
				<div style={{ margin: "auto" }}>
					<SolaceDetailMessage
						msgImg={<NoAccessImg />}
						title="Left Side Panel Layout Demo"
						details={<span>Click the buton to toggle the side panel</span>}
						actions={[
							{
								id: btnID,
								variant: VARIANT,
								children: panelOpen ? CLOSEPANEL : OPENPANEL,
								onClick: HandlePanelToggle
							}
						]}
					/>
				</div>
			</SolaceSidePanelLayout>
		</StoryContainer>
	);
};

export const CustomWidthSidePanel = (): JSX.Element => {
	const [panelOpen, setPanelOpen] = useState(true);

	const HandlePanelToggle = () => {
		setPanelOpen(!panelOpen);
	};

	return (
		<StoryContainer>
			<SolaceSidePanelLayout sidePanelContent={sidePanelMessage} showSidePanel={panelOpen} sidePanelWidth={500}>
				<div style={{ margin: "auto" }}>
					<SolaceDetailMessage
						msgImg={<NoAccessImg />}
						title="Custom Width Side Panel Layout Demo"
						details={<span>Click the buton to toggle the side panel</span>}
						actions={[
							{
								id: btnID,
								variant: VARIANT,
								children: panelOpen ? CLOSEPANEL : OPENPANEL,
								onClick: HandlePanelToggle
							}
						]}
					/>
				</div>
			</SolaceSidePanelLayout>
		</StoryContainer>
	);
};

export const SelfClosingSidePanel = (): JSX.Element => {
	const HandlePanelToggle = () => {
		setPanelOpen(!panelOpen);
	};
	const [panelOpen, setPanelOpen] = useState(true);
	const sidePanelContent = (
		<React.Fragment>
			<ListSubheader>
				<SolaceButton onClick={HandlePanelToggle} title="Close" variant="icon">
					<ChevronRightIcon />
				</SolaceButton>
			</ListSubheader>
			{sidePanelMessage}
		</React.Fragment>
	);

	return (
		<StoryContainer>
			<SolaceSidePanelLayout sidePanelContent={sidePanelContent} showSidePanel={panelOpen}>
				<div style={{ margin: "auto" }}>
					<SolaceDetailMessage
						msgImg={<NoAccessImg />}
						title="Self-Closing Side Panel Layout Demo"
						details={<span>Click the buton to toggle the side panel</span>}
						actions={[
							{
								id: btnID,
								variant: VARIANT,
								children: panelOpen ? CLOSEPANEL : OPENPANEL,
								onClick: HandlePanelToggle
							}
						]}
					/>
				</div>
			</SolaceSidePanelLayout>
		</StoryContainer>
	);
};

export const OverlaySidePanel = (): JSX.Element => {
	const HandlePanelToggle = () => {
		setPanelOpen(!panelOpen);
	};
	const [panelOpen, setPanelOpen] = useState(true);
	const sidePanelContent = (
		<React.Fragment>
			<ListSubheader>
				<SolaceButton onClick={HandlePanelToggle} title="Close" variant="icon">
					<ChevronRightIcon />
				</SolaceButton>
			</ListSubheader>
			{sidePanelMessage}
		</React.Fragment>
	);

	return (
		<StoryContainer>
			<SolaceSidePanelLayout
				sidePanelContent={sidePanelContent}
				showSidePanel={panelOpen}
				overlayContent={true}
				sidePanelWidth={400}
			>
				<div style={{ margin: "auto" }}>
					<SolaceDetailMessage
						msgImg={<NoAccessImg />}
						title="Side Panel Layout Demo"
						details={<span>Click the buton to toggle the side panel</span>}
						actions={[
							{
								id: btnID,
								variant: VARIANT,
								children: panelOpen ? CLOSEPANEL : OPENPANEL,
								onClick: HandlePanelToggle
							}
						]}
					/>
				</div>
			</SolaceSidePanelLayout>
		</StoryContainer>
	);
};
