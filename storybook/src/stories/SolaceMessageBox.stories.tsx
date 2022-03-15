import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

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
					summary: true
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
					summary: false
				}
			}
		},
		variant: {
			options: ["info", "error", "warn"],
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
} as ComponentMeta<typeof SolaceMessageBox>;

const Template: ComponentStory<typeof SolaceMessageBox> = (args) => <SolaceMessageBox {...args} />;

export const InfoBox = Template.bind({});
InfoBox.args = {
	message: "helpful information.",
	variant: "info"
};

export const ErrorBox = Template.bind({});
ErrorBox.args = {
	message: "this is an error message",
	variant: "error",
	color: "#D0021B"
};

export const WarnBox = Template.bind({});
WarnBox.args = {
	message: "this is a warn message",
	variant: "warn"
};

export const MessageWithIcon = Template.bind({});
MessageWithIcon.args = {
	message: (
		<div>
			<span>Learn more in </span>
			<SolaceButton variant="link" href="https://#">
				documentations
			</SolaceButton>
		</div>
	),
	variant: "info"
};

export const CompactBoxWithCustomButton = Template.bind({});
CompactBoxWithCustomButton.args = {
	message: (
		<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexGrow: 1 }}>
			<div>
				<span>Learn more in </span>
				<SolaceButton variant="link" href="https://#">
					documentations
				</SolaceButton>
			</div>
			<SolaceButton variant="text">Set Preferences</SolaceButton>
		</div>
	),
	variant: "info",
	dense: true
};

export const WithCloseButton = Template.bind({});
WithCloseButton.args = {
	message: "helpful information that can be closed",
	variant: "info",
	showCloseButton: true
};

export const WithCloseAction = Template.bind({});
const handleClose = () => {
	alert("message box will be closed");
};
WithCloseAction.args = {
	message: "helpful information with onClose callback",
	showCloseButton: true,
	variant: "info",
	onClose: handleClose
};

export const WithinContainer = ({ message, ...args }): JSX.Element => {
	return (
		<div style={{ width: "300px" }}>
			<SolaceMessageBox variant="info" message={message} {...args} />
		</div>
	);
};
WithinContainer.args = {
	message: "Helpful information. The info box is in a small container.",
	showCloseButton: true
};

export const WarnWithinContainer = ({ message, ...args }): JSX.Element => {
	return (
		<div style={{ width: "300px" }}>
			<SolaceMessageBox variant="warn" message={message} {...args} />
		</div>
	);
};
WarnWithinContainer.args = {
	message: "Helpful information. The warn box is in a small container.",
	showCloseButton: true
};
