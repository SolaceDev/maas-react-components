import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceToggle } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

export default {
	title: "Forms/SolaceToggle",
	component: SolaceToggle,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/UI-Library%3A-Patterns?node-id=2937%3A22461"
		}
	},
	argTypes: {
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
		stateText: {
			control: {
				type: "boolean"
			}
		}
	}
} as ComponentMeta<typeof SolaceToggle>;

const Template: ComponentStory<typeof SolaceToggle> = (args) => <SolaceToggle {...args} />;

export const DefaultToggle = Template.bind({});
DefaultToggle.args = {
	onChange: action("callback"),
	title: "Demo Toggle",
	id: "demoToggleId",
	name: "demoToggle"
};

export const Labeled = Template.bind({});
Labeled.args = {
	onChange: action("callback"),
	title: "Demo Toggle",
	id: "demoToggleId",
	name: "demoToggle",
	label: "Some Label"
};

export const LargeLabel = Template.bind({});
LargeLabel.args = {
	onChange: action("callback"),
	title: "Demo Toggle",
	id: "demoToggleId",
	name: "demoToggle",
	label: "Some Label",
	largeLabel: true
};

export const LabeledWithStateText = Template.bind({});
LabeledWithStateText.args = {
	onChange: action("callback"),
	title: "Demo Toggle",
	id: "demoToggleId",
	name: "demoToggle",
	label: "Some Label",
	stateText: true
};

export const HelperText = Template.bind({});
HelperText.args = {
	onChange: action("callback"),
	title: "Demo Toggle",
	id: "demoToggleId",
	name: "demoToggle",
	label: "Some Label",
	helperText: "Some helper text here"
};

export const WithErrors = Template.bind({});
WithErrors.args = {
	onChange: action("callback"),
	title: "Demo Toggle",
	id: "demoToggleId",
	name: "demoToggle",
	label: "Some Label",
	hasErrors: true,
	helperText: "Some error occured"
};

export const Required = Template.bind({});
Required.args = {
	onChange: action("callback"),
	name: "demoToggle",
	title: "Demo Toggle",
	label: "Some Label",
	required: true
};

export const Disabled = Template.bind({});
Disabled.args = {
	onChange: action("callback"),
	name: "demoToggle",
	title: "Demo Toggle",
	label: "Some Label",
	isOn: true,
	disabled: true
};
