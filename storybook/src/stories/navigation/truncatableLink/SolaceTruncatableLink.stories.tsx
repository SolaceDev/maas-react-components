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

import React from "react";
import { action } from "@storybook/addon-actions";
import { Meta, Decorator } from "@storybook/react";
import { SolaceTruncatableLink, Box } from "@SolaceDev/maas-react-components";
import { userEvent, within } from "@storybook/test";

(SolaceTruncatableLink as React.FC & { displayName?: string }).displayName = "SolaceTruncatableLink";
(Box as React.FC & { displayName?: string }).displayName = "Box";

// Create a decorator to include the tooltip & popover inside the snapshot"
const withSnapshotContainer: Decorator = (Story) => {
	return (
		<div id="snapshot" style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}>
			<div style={{ margin: "16px" }}>
				<Story />
			</div>
		</div>
	);
};

export default {
	title: "Navigation/Link/Truncated",
	component: SolaceTruncatableLink,
	parameters: {},
	args: {
		id: "",
		text: "This is a truncatable link with loooong name",
		href: "",
		maxWidth: "200px",
		marginRight: "",
		dataQa: ""
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Unique identifier for the component",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		text: {
			control: { type: "text" },
			description: "This is the text that will be displayed in the button",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		href: {
			control: { type: "text" },
			description: "URL to navigate in new tab while on click",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		maxWidth: {
			control: { type: "text" },
			description: "This is the max width for the wrapper component",
			table: {
				defaultValue: { summary: '"auto"' }
			}
		},
		marginRight: {
			control: { type: "text" },
			description: "This is the margin right for the wrapper component",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		onClick: {
			action: "clicked",
			description: "Optional click handler",
			table: {
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data QA attribute for testing purposes",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data tags attribute for additional metadata",
			table: {
				defaultValue: { summary: '""' }
			}
		}
	},
	decorators: [withSnapshotContainer]
} as Meta<typeof SolaceTruncatableLink>;

const linkText = "This is a truncatable link with loooong name";

export const DefaultTruncatableLink = (): JSX.Element => {
	return (
		<Box width={"200px"}>
			<SolaceTruncatableLink id="defaultLink" text={linkText} onClick={action("callback")} />
		</Box>
	);
};

DefaultTruncatableLink.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const targetElement = await canvas.getByText(linkText);
	await userEvent.hover(targetElement);
};

export const TruncatableLinkOpenInNewTab = (): JSX.Element => {
	return (
		<div style={{ width: "200px" }}>
			<SolaceTruncatableLink id="defaultLink" text={linkText} href="https://solace.com" />
		</div>
	);
};

TruncatableLinkOpenInNewTab.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const targetElement = await canvas.getByText(linkText);
	await userEvent.hover(targetElement);
};

export const TruncatableText = (): JSX.Element => {
	return (
		<Box width={"200px"}>
			<SolaceTruncatableLink id="defaultLink" text={linkText} />
		</Box>
	);
};

TruncatableText.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const targetElement = await canvas.getByText(linkText);
	await userEvent.hover(targetElement);
};
