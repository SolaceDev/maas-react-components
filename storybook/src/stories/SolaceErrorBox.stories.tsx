import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { SolaceErrorBox } from "@SolaceDev/maas-react-components";

export default {
	title: "Under Construction/SolaceErrorBox",
	component: SolaceErrorBox,
	parameters: {},
	argTypes: {
		message: {
			control: {
				type: "string"
			}
		},
		showErrorIcon: {
			control: {
				type: "boolean",
				defaultValue: true
			}
		},
		showCloseButton: {
			control: {
				type: "boolean",
				defaultValue: false
			}
		}
	}
} as ComponentMeta<typeof SolaceErrorBox>;

const Template: ComponentStory<typeof SolaceErrorBox> = (args) => <SolaceErrorBox {...args} />;

const message = "Something is wrong.";

export const DefaultErrorBox = Template.bind({});
DefaultErrorBox.args = {
	message
};

export const WithCloseButton = Template.bind({});
WithCloseButton.args = {
	message,
	showCloseButton: true
};

export const WithCloseAction = Template.bind({});
WithCloseAction.args = {
	message,
	showCloseButton: true,
	onClose: action("callback")
};

export const WithinContainer = ({ message, ...args }): JSX.Element => {
	return (
		<div style={{ width: "300px" }}>
			<SolaceErrorBox message={message} {...args} />
		</div>
	);
};
WithinContainer.args = {
	message: "Something is wrong. The error box is in a small container.",
	showCloseButton: true
};
