import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceStackLabel } from "@SolaceDev/maas-react-components";

export default {
	title: "Forms/SolaceStackLabel",
	component: SolaceStackLabel,
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
		large: {
			control: {
				type: "boolean"
			}
		},
		bold: {
			control: {
				type: "boolean"
			}
		}
	}
} as ComponentMeta<typeof SolaceStackLabel>;

const Template: ComponentStory<typeof SolaceStackLabel> = (args) => <SolaceStackLabel {...args} />;

export const DefaultLabel = Template.bind({});
DefaultLabel.args = {
	id: "demoTextFieldId",
	children: "Custom Label"
};

export const LargeLabel = Template.bind({});
LargeLabel.args = {
	id: "demoTextFieldId",
	large: true,
	children: "Custom Label"
};

export const BoldLabel = Template.bind({});
BoldLabel.args = {
	id: "demoTextFieldId",
	bold: true,
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
