import React from "react";
import { Meta } from "@storybook/react";
import { SolaceMessageBox, SolaceButton } from "@SolaceDev/maas-react-components";

export default {
	title: "Under Construction/SolaceMessageBox",
	component: SolaceMessageBox,
	parameters: {
		docs: {
			description: {
				component: "MessageBox component for reuse in all Solace based applications"
			}
		}
	},
	argTypes: {
		message: {
			control: {
				type: "text"
			},
			description: "The message to render",
			table: {
				defaultValue: {
					summary: "text"
				}
			}
		},
		showIcon: {
			control: {
				type: "boolean"
			},
			description: "Whether to show icon",
			table: {
				defaultValue: {
					summary: "true"
				}
			}
		},
		showCloseButton: {
			control: {
				type: "boolean"
			},
			description: "Whether to show the close button",
			table: {
				defaultValue: {
					summary: "false"
				}
			}
		},
		variant: {
			options: ["info", "error", "warn", "success"],
			control: {
				type: "select"
			},
			description: "The type/style of message box to render",
			table: {
				defaultValue: {
					summary: "text"
				}
			}
		},
		color: {
			control: {
				type: "text"
			},
			description: "specify the message text color",
			table: {
				defaultValue: {
					summary: "text"
				}
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
