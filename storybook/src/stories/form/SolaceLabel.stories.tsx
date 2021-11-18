import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceLabel } from "@SolaceDev/maas-react-components";

export default {
	title: "Forms/SolaceLabel",
	component: SolaceLabel,
	argTypes: {
		htmlForId: {
			control: {
				type: "text"
			}
		},
		isRequired: {
			control: {
				type: "boolean"
			}
		},
		isDisabled: {
			control: {
				type: "boolean"
			}
		},
		isLargeLabel: {
			control: {
				type: "boolean"
			}
		},
		isBoldLabel: {
			control: {
				type: "boolean"
			}
		}
	}
} as ComponentMeta<typeof SolaceLabel>;

const Template: ComponentStory<typeof SolaceLabel> = (args) => <SolaceLabel {...args} />;

export const DefaultLabel = Template.bind({});
DefaultLabel.args = {
	id: "demoTextFieldId",
	children: "Custom Lable"
};

export const LargeLabel = Template.bind({});
LargeLabel.args = {
	id: "demoTextFieldId",
	isLargeLabel: true,
	children: "Custom Label"
};

export const BoldLabel = Template.bind({});
BoldLabel.args = {
	id: "demoTextFieldId",
	isBoldLabel: true,
	children: "Custom Label"
};

export const Required = Template.bind({});
Required.args = {
	id: "demoTextFieldId",
	isRequired: true,
	children: "Custom Lable"
};

export const Disabled = Template.bind({});
Disabled.args = {
	id: "demoTextFieldId",
	isDisabled: true,
	children: "Custom Lable"
};
