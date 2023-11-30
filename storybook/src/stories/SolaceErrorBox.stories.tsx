import React from "react";
import { Meta } from "@storybook/react";
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
} as Meta<typeof SolaceErrorBox>;

const message = "Something is wrong.";

export const DefaultErrorBox = {
	args: {
		message
	}
};

export const WithCloseButton = {
	args: {
		message,
		showCloseButton: true
	}
};

export const WithCloseAction = {
	args: {
		message,
		showCloseButton: true,
		onClose: action("callback")
	}
};

export const WithinContainer = {
	render: ({ message, ...args }): JSX.Element => {
		return (
			<div style={{ width: "300px" }}>
				<SolaceErrorBox message={message} {...args} />
			</div>
		);
	},

	args: {
		message: "Something is wrong. The error box is in a small container.",
		showCloseButton: true
	}
};
