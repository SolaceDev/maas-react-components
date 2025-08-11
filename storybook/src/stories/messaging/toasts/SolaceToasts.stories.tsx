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
		}
	},
	argTypes: {
		severity: {
			options: ["success", "info", "warning", "error"],
			control: {
				type: "select"
			},
			description:
				"**Deprecated** - This prop will be removed in a future version (Target: August 2025). Determines the toast variant with corresponding icon and styling.",
			table: {
				type: { summary: '"success" | "info" | "warning" | "error" | undefined' },
				defaultValue: { summary: "undefined" }
			}
		},
		message: {
			control: {
				type: "text"
			},
			description: "The message content to display in the toast. Can be a string or JSX element for rich content.",
			table: {
				type: { summary: "string | React.ReactNode" },
				defaultValue: { summary: "required" }
			}
		},
		open: {
			control: {
				type: "boolean"
			},
			description: "Controls the visibility of the toast. When true, the toast is displayed.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		action: {
			control: false,
			description:
				"Optional action element(s) to display in the toast, such as buttons or icons. Extends auto-hide duration to 8 seconds when present.",
			table: {
				type: { summary: "React.ReactNode | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		autoDismiss: {
			control: {
				type: "boolean"
			},
			description:
				"Controls automatic dismissal behavior. When true, toast auto-hides after 4 seconds (8 seconds with action). When false, toast remains visible until manually closed.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "true" }
			}
		},
		onClose: {
			control: false,
			description:
				"Required callback function triggered when the toast is closed. Receives the event that caused the closure.",
			table: {
				defaultValue: { summary: "required" }
			}
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
