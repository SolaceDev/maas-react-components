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
import { Meta } from "@storybook/react";
import { SolaceDetailMessage } from "@SolaceDev/maas-react-components";

(SolaceDetailMessage as React.FC & { displayName?: string }).displayName = "SolaceDetailMessage";

export default {
	title: "Layout/Empty State/Standard",
	component: SolaceDetailMessage,
	args: {},
	parameters: {},
	argTypes: {
		id: {
			control: { type: "text" },
			description:
				"Unique identifier for the detail message component. Used for accessibility and programmatic access.",
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
				"If true, displays the detail message in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the detail message content.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		msgImg: {
			control: { type: "object" },
			description:
				"React element representing the message image or illustration. Use this to provide visual context for the detail message.",
			table: {
				type: { summary: "React.ReactElement | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		title: {
			control: { type: "text" },
			description:
				"The main heading text for the detail message. Use this to clearly communicate the message to the user.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		details: {
			control: { type: "text" },
			description: "Detailed content explaining the message. Can be a string or JSX element for rich content.",
			table: {
				type: { summary: "string | React.ReactNode | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		actions: {
			control: { type: "object" },
			description:
				"Array of button configurations or custom JSX element for action buttons. Use this to provide actionable options to the user.",
			table: {
				type: { summary: "Array<ButtonProps> | React.ReactElement | undefined" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceDetailMessage>;

const defaultButton = {
	id: "catalog-btn",
	variant: "call-to-action",
	children: "Go To Catalog",
	onClick: action("button-clicked")
};

export const NoAccessMessage = {
	args: {}
};

export const FailedFetchMessage = {
	args: {}
};

export const NoImageMessage = {
	args: {}
};

export const NoTitleMessage = {
	args: {}
};

export const NoDetailsMessage = {
	args: {}
};

export const NoActionsMessage = {
	args: {}
};

export const MultiActionMessage = {
	args: {}
};

export const CustomActionMessage = {
	args: {}
};

export const CustomDetailsMessage = {
	args: {}
};
