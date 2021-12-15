import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

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

export const DefaultErrorBox = Template.bind({});
DefaultErrorBox.args = {
	message: "Something is wrong."
};

export const WithCloseButton = Template.bind({});
WithCloseButton.args = {
	message: "Something is wrong.",
	showCloseButton: true
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
