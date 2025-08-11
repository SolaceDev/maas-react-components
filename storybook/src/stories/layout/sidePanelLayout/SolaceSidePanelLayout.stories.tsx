<<<<<<< HEAD:storybook/src/stories/layout/sidePanelLayout/SolaceSidePanelLayout.stories.tsx
=======
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

/* eslint-disable react/no-unescaped-entities */
>>>>>>> main:storybook/src/stories/layout/SolaceSidePanelLayout.stories.tsx
import React, { useState } from "react";
import { Meta } from "@storybook/react";
import {
	SolaceSidePanelLayout,
	SolacePanelPosition,
	SolaceDetailMessage,
	styled,
	SolaceButton,
	ListSubheader,
	CloseIcon
} from "@SolaceDev/maas-react-components";
import NoAccessImg from "../../../resources/images/NoAccessBook.tsx";
import { within, userEvent } from "@storybook/testing-library";

(SolaceSidePanelLayout as React.FC & { displayName?: string }).displayName = "SolaceSidePanelLayout";

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
	<div style={{ margin: "24px" }}>
		<h3 style={{ marginTop: 0 }}>Side Panel</h3>
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
	title: "Layout/Side Panel",
	component: SolaceSidePanelLayout,
	args: {
		id: "",
		hasWarnings: false,
		showSidePanel: false,
		sidePanelPosition: "right",
		sidePanelWidth: "20%",
		overlayContent: false,
		sidePanelContent: undefined,
		children: undefined
	},
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceSidePanelLayout"
			}
		}
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description:
				"Unique identifier for the side panel layout component. Used for accessibility and programmatic access.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		hasWarnings: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the side panel layout in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the side panel content.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		showSidePanel: {
			control: { type: "boolean" },
			description:
				"Controls whether the side panel is visible. Use this to show or hide the side panel programmatically.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		sidePanelPosition: {
			options: ["right", "left"],
			control: { type: "select" },
			description:
				"Position of the side panel relative to the main content. Use 'right' for right-aligned panels or 'left' for left-aligned panels.",
			table: {
				type: { summary: "'right' | 'left' | undefined" },
				defaultValue: { summary: "right" }
			}
		},
		sidePanelWidth: {
			control: {
				type: "text"
			},
			description:
				"Width of the side panel. Can be specified as a percentage (e.g., '20%') or pixels (e.g., 300). Use this to control how much space the panel occupies.",
			table: {
				type: { summary: "string | number | undefined" },
				defaultValue: { summary: "20%" }
			}
		},
		overlayContent: {
			control: { type: "boolean" },
			description:
				"If true, the side panel will overlay the main content instead of pushing it aside. Use this for modal-like behavior where the panel appears on top of existing content.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		sidePanelContent: {
			control: { type: "object" },
			description:
				"Content to display within the side panel. Can be any React node including text, components, or complex layouts.",
			table: {
				type: { summary: "React.ReactNode | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		children: {
			control: { type: "object" },
			description:
				"Main content of the layout that appears alongside the side panel. This is where your primary page content should be placed.",
			table: {
				type: { summary: "React.ReactNode | undefined" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceSidePanelLayout>;

const mainContent = (panelOpen, handlePanelToggle) => (
	<SolaceDetailMessage
		msgImg={<NoAccessImg />}
		title="Side Panel Layout Demo"
		details={
			<p style={{ margin: "0px", padding: "0px 15px" }}>
				Click the buton to toggle the side panel{" "}
				<SolaceButton variant="link" dense href="https://solace.com">
					some really really really long anchor tag to showcase all is clickable
				</SolaceButton>
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

const sidePanelContent = (handlePanelToggle) => (
	<React.Fragment>
		<ListSubheader style={{ position: "absolute", right: 0, top: "10px" }}>
			<SolaceButton onClick={handlePanelToggle} title="Close" variant="icon">
				<CloseIcon />
			</SolaceButton>
		</ListSubheader>
		{sidePanelMessage}
	</React.Fragment>
);

const SolaceDefaultSidePanel = () => {
	const [panelOpen, setPanelOpen] = useState(false);

	const handlePanelToggle = () => {
		setPanelOpen(!panelOpen);
	};

	return (
		<StoryContainer>
			<SolaceSidePanelLayout showSidePanel={panelOpen} sidePanelContent={sidePanelMessage} sidePanelWidth={"20%"}>
				{mainContent(panelOpen, handlePanelToggle)}
			</SolaceSidePanelLayout>
		</StoryContainer>
	);
};

const SolaceLeftSidePanel = () => {
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

export const DefaultSidePanel = {
	render: SolaceDefaultSidePanel,
	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByText(OPENPANEL));
	}
};

export const LeftSidePanel = {
	render: SolaceLeftSidePanel,
	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByText(OPENPANEL));
	}
};

const SolaceCustomWidthSidePanel = () => {
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

export const CustomWidthSidePanel = {
	render: SolaceCustomWidthSidePanel,

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByText(OPENPANEL));
	}
};

const SolaceSelfClosingSidePanel = () => {
	const handlePanelToggle = () => {
		setPanelOpen(!panelOpen);
	};
	const [panelOpen, setPanelOpen] = useState(false);

	return (
		<StoryContainer>
			<SolaceSidePanelLayout sidePanelContent={sidePanelContent(handlePanelToggle)} showSidePanel={panelOpen}>
				{mainContent(panelOpen, handlePanelToggle)}
			</SolaceSidePanelLayout>
		</StoryContainer>
	);
};

export const SelfClosingSidePanel = {
	render: SolaceSelfClosingSidePanel,

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByText(OPENPANEL));
	}
};

const SolaceOverlaySidePanelRight = () => {
	const handlePanelToggle = () => {
		setPanelOpen(!panelOpen);
	};
	const [panelOpen, setPanelOpen] = useState(false);

	return (
		<StoryContainer>
			<SolaceSidePanelLayout
				sidePanelContent={sidePanelContent(handlePanelToggle)}
				showSidePanel={panelOpen}
				overlayContent={true}
				sidePanelWidth={400}
			>
				{mainContent(panelOpen, handlePanelToggle)}
			</SolaceSidePanelLayout>
		</StoryContainer>
	);
};

export const OverlaySidePanelRight = {
	render: SolaceOverlaySidePanelRight,

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByText(OPENPANEL));
	}
};

const SolaceOverlaySidePanelLeft = () => {
	const handlePanelToggle = () => {
		setPanelOpen(!panelOpen);
	};
	const [panelOpen, setPanelOpen] = useState(false);

	return (
		<StoryContainer>
			<SolaceSidePanelLayout
				sidePanelContent={sidePanelContent(handlePanelToggle)}
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

export const OverlaySidePanelLeft = {
	render: SolaceOverlaySidePanelLeft,
	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByText(OPENPANEL));
	}
};
