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
import { Meta } from "@storybook/react";
import { SolaceToasts, SolaceButton, IconButton } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import CloseIcon from "@mui/icons-material/Close";

(SolaceToasts as React.FC & { displayName?: string }).displayName = "SolaceToasts";
(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";
(CloseIcon as React.FC & { displayName?: string }).displayName = "CloseIcon";
(IconButton as React.FC & { displayName?: string }).displayName = "IconButton";

export default {
	title: "Messaging/Toast",
	component: SolaceToasts,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=4434%3A30917"
		},
		docs: {
			description: {
				component:
					"SolaceToasts component for reuse in all Solace based applications. Code component name: SolaceToasts"
			}
		}
	},
	argTypes: {
		severity: {
			options: ["success", "info", "warning", "error"],
			control: {
				type: "select"
			},
			description: "**Deprecated** - This prop will be removed in a future version",
			table: {
				type: { summary: '"success" | "info" | "warning" | "error"' },
				defaultValue: { summary: "undefined" }
			}
		},
		message: {
			control: { type: "object" },
			description: "Title displayed at the top of the tooltip"
		},
		open: {
			control: { type: "boolean" }
		},
		autoDismiss: {
			control: { type: "boolean" }
		}
	}
} as Meta<typeof SolaceToasts>;

const buttonClickedAction = action("action button clicked");

export const DefaultToast = {
	args: {
		message: "This is a default toast",
		open: true,
		onClose: action("closing")
	}
};

export const WithActionIcon = {
	args: {
		message: "This is with an action icon",
		action: (
			<IconButton onClick={action("close icon clicked")}>
				<CloseIcon className="close-icon" />
			</IconButton>
		),
		open: true,
		onClose: action("closing")
	}
};

export const WithActionAndCloseIcon = {
	args: {
		message: "This is with an action icon and a close icon",
		action: (
			<React.Fragment>
				<SolaceButton variant="text" onClick={buttonClickedAction}>
					Action
				</SolaceButton>
				<IconButton onClick={action("close icon clicked")}>
					<CloseIcon className="close-icon" />
				</IconButton>
			</React.Fragment>
		),
		open: true,
		onClose: action("closing")
	}
};

export const WithStyledMessage = {
	args: {
		message: (
			<span>
				3 applications added to <b>Staging EventMesh</b>
			</span>
		),
		action: (
			<SolaceButton variant="text" onClick={buttonClickedAction}>
				Undo
			</SolaceButton>
		),
		open: true,
		onClose: action("closing")
	}
};

export const WithAutoDismissDisabled = {
	args: {
		message: "This is toast that will not auto dismiss",
		action: (
			<SolaceButton variant="text" onClick={buttonClickedAction}>
				Refresh
			</SolaceButton>
		),
		open: true,
		autoDismiss: false,
		onClose: action("closing")
	}
};
