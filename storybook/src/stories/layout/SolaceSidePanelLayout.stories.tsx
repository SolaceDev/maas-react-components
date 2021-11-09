/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { ComponentMeta } from "@storybook/react";
import {
	SolaceSidePanelLayout,
	SolacePanelPosition,
	SolaceDetailMessage,
	styled
} from "@SolaceDev/maas-react-components";
import NoAccessImg from "../../resources/images/NoAccessBook";

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
	argTypes: {}
} as ComponentMeta<typeof SolaceSidePanelLayout>;

export const DefaultSidePanel = (): JSX.Element => {
	const [panelOpen, setPanelOpen] = useState(true);

	const HandlePanelToggle = () => {
		setPanelOpen(!panelOpen);
	};

	return (
		<StoryContainer>
			<SolaceSidePanelLayout sidePanelContent={sidePanelMessage} showSidePanel={panelOpen}>
				<div style={{ margin: "auto" }}>
					<SolaceDetailMessage
						msgImg={<NoAccessImg />}
						title="Side Panel Layout Demo"
						details={<span>Click the buton to toggle the side panel</span>}
						actions={[
							{
								id: "catalog-btn",
								variant: "call-to-action",
								children: panelOpen ? "Close Panel" : "Open Panel",
								onClick: HandlePanelToggle
							}
						]}
					/>
				</div>
			</SolaceSidePanelLayout>
		</StoryContainer>
	);
};

export const CustomSidePanelSize = (): JSX.Element => {
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
						title="Side Panel Layout Demo"
						details={<span>Click the buton to toggle the side panel</span>}
						actions={[
							{
								id: "catalog-btn",
								variant: "call-to-action",
								children: panelOpen ? "Close Panel" : "Open Panel",
								onClick: HandlePanelToggle
							}
						]}
					/>
				</div>
			</SolaceSidePanelLayout>
		</StoryContainer>
	);
};

export const LeftSidePanelSize = (): JSX.Element => {
	const [panelOpen, setPanelOpen] = useState(true);

	const HandlePanelToggle = () => {
		setPanelOpen(!panelOpen);
	};

	return (
		<StoryContainer>
			<SolaceSidePanelLayout
				sidePanelContent={sidePanelMessage}
				showSidePanel={panelOpen}
				sidePanelWidth={400}
				sidePanelPosition={SolacePanelPosition.LEFT}
			>
				<div style={{ margin: "auto" }}>
					<SolaceDetailMessage
						msgImg={<NoAccessImg />}
						title="Side Panel Layout Demo"
						details={<span>Click the buton to toggle the side panel</span>}
						actions={[
							{
								id: "catalog-btn",
								variant: "call-to-action",
								children: panelOpen ? "Close Panel" : "Open Panel",
								onClick: HandlePanelToggle
							}
						]}
					/>
				</div>
			</SolaceSidePanelLayout>
		</StoryContainer>
	);
};
