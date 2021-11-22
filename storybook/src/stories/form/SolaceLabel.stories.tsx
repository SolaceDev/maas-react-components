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
		required: {
			control: {
				type: "boolean"
			}
		},
		disabled: {
			control: {
				type: "boolean"
			}
		},
		largeLabel: {
			control: {
				type: "boolean"
			}
		},
		boldLabel: {
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
	children: "Custom Label"
};

export const LargeLabel = Template.bind({});
LargeLabel.args = {
	id: "demoTextFieldId",
	largeLabel: true,
	children: "Custom Label"
};

export const BoldLabel = Template.bind({});
BoldLabel.args = {
	id: "demoTextFieldId",
	boldLabel: true,
	children: "Custom Label"
};

export const Required = Template.bind({});
Required.args = {
	id: "demoTextFieldId",
	required: true,
	children: "Custom Label"
};

export const Disabled = Template.bind({});
Disabled.args = {
	id: "demoTextFieldId",
	disabled: true,
	children: "Custom Label"
};
