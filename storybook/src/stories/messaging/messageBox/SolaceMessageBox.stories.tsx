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
import { SolaceMessageBox, SolaceButton } from "@SolaceDev/maas-react-components";

(SolaceMessageBox as React.FC & { displayName?: string }).displayName = "SolaceMessageBox";
(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";

export default {
	title: "Messaging/Banner/Notification",
	component: SolaceMessageBox,
	parameters: {},
	argTypes: {
		message: {
			control: { type: "text" },
			description: "The message to render (string or JSX element)",
			table: {
				defaultValue: { summary: "required" }
			}
		},
		showIcon: {
			control: { type: "boolean" },
			description: "Whether to show icon",
			table: {
				defaultValue: { summary: "true" }
			}
		},
		showCloseButton: {
			control: { type: "boolean" },
			description: "Whether to show the close button",
			table: {
				defaultValue: { summary: "false" }
			}
		},
		variant: {
			options: ["info", "error", "warn", "success"],
			control: { type: "select" },
			description:
				"The type/style of message box to render. Uses status enum values similar to STATUSES from https://github.com/SolaceDev/maas-react-components/blob/main/src/types/statuses.ts",
			table: {
				defaultValue: { summary: '"info"' }
			}
		},
		color: {
			control: { type: "text" },
			description: "Specify the message text color (overrides default variant color)",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		dense: {
			control: { type: "boolean" },
			description: "If true, compact vertical padding is used",
			table: {
				defaultValue: { summary: "false" }
			}
		},
		details: {
			control: false,
			description: "To display further details about the message (string or JSX element)",
			table: {
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data QA attribute for testing",
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
	}
} as Meta<typeof SolaceMessageBox>;

export const InfoBox = {
	args: {
		message: "helpful information.",
		variant: "info"
	}
};

export const ErrorBox = {
	args: {
		message: "this is an error message",
		variant: "error"
	}
};

export const WarnBox = {
	args: {
		message: "this is a warn message",
		variant: "warn"
	}
};

export const SuccessBox = {
	args: {
		message: "this is a success message",
		variant: "success"
	}
};

export const MessageWithIcon = {
	args: {
		message: (
			<div>
				<span>Learn more in </span>
				<SolaceButton variant="link" href="https://#">
					documentations
				</SolaceButton>
			</div>
		),
		variant: "info"
	}
};

export const CompactBoxWithCustomButton = {
	args: {
		message: (
			/*
				This layout will keep the button to the right when there is enough space and wrap to the next line below the text when there is not enough space or when the component size reduces.
			*/
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					flexWrap: "wrap",
					flexGrow: 1
				}}
			>
				<div style={{ padding: "4px 0px" }}>
					<span>Learn more in </span>
					<SolaceButton variant="link" href="https://#">
						documentations
					</SolaceButton>
				</div>
				<div style={{ whiteSpace: "nowrap", marginLeft: "auto" }}>
					<SolaceButton variant="text">Set Preferences</SolaceButton>
				</div>
			</div>
		),
		variant: "info",
		dense: true
	}
};

export const WithCloseButton = {
	args: {
		message: "helpful information that can be closed",
		variant: "info",
		showCloseButton: true
	}
};

const handleClose = () => {
	alert("message box will be closed");
};

export const WithCloseAction = {
	args: {
		message: "helpful information with onClose callback",
		showCloseButton: true,
		variant: "info",
		onClose: handleClose
	}
};

export const WithinContainer = {
	render: ({ message, ...args }): JSX.Element => {
		return (
			<div style={{ width: "300px" }}>
				<SolaceMessageBox variant="info" message={message} {...args} />
			</div>
		);
	},

	args: {
		message: "Helpful information. The info box is in a small container.",
		showCloseButton: true
	}
};

export const WarnWithinContainer = {
	render: ({ message, ...args }): JSX.Element => {
		return (
			<div style={{ width: "300px" }}>
				<SolaceMessageBox variant="warn" message={message} {...args} />
			</div>
		);
	},

	args: {
		message: "Helpful information. The warn box is in a small container.",
		showCloseButton: true
	}
};

export const ErrorWithDetailsWithinContainer = {
	render: ({ message, ...args }): JSX.Element => {
		return (
			<div style={{ width: "300px" }}>
				<SolaceMessageBox variant="error" message={message} {...args} />
			</div>
		);
	},

	args: {
		message: "The error box is in a small container with font color overridden and details.",
		showCloseButton: true,
		color: "#778899",
		details: <div style={{ backgroundColor: "#F9F9F9", padding: "8px" }}>More Details</div>
	}
};
