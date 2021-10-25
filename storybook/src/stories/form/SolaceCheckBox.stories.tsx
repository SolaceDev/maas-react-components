import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceCheckBox } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

export default {
	title: "Forms/SolaceCheckBox",
	component: SolaceCheckBox,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=2932%3A22443"
		}
	},
	argTypes: {}
} as ComponentMeta<typeof SolaceCheckBox>;

const Template: ComponentStory<typeof SolaceCheckBox> = (args) => <SolaceCheckBox {...args} />;

export const DefaultCheckbox = Template.bind({});
DefaultCheckbox.args = {
	onChange: action("callback"),
	title: "Demo Checkbox",
	id: "demoCheckboxId",
	name: "demoCheckbox"
};

export const Labeled = Template.bind({});
Labeled.args = {
	onChange: action("callback"),
	title: "Demo Checkbox",
	id: "demoCheckboxId",
	name: "demoCheckbox",
	label: "Some Label"
};

export const HelperText = Template.bind({});
HelperText.args = {
	onChange: action("callback"),
	title: "Demo Checkbox",
	id: "demoCheckboxId",
	name: "demoCheckbox",
	label: "Some Label",
	helperText: "Some helper text here"
};

export const WithErrors = Template.bind({});
WithErrors.args = {
	onChange: action("callback"),
	title: "Demo Checkbox",
	id: "demoCheckboxId",
	name: "demoCheckbox",
	label: "Some Label",
	hasErrors: true,
	helperText: "Some error occured"
};

export const Required = Template.bind({});
Required.args = {
	onChange: action("callback"),
	name: "demoCheckbox",
	title: "Demo Checkbox",
	label: "Some Label",
	isRequired: true
};

export const Disabled = Template.bind({});
Disabled.args = {
	onChange: action("callback"),
	name: "demoCheckbox",
	title: "Demo Checkbox",
	label: "Some Label",
	isChecked: true,
	isDisabled: true
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
	onChange: action("callback"),
	name: "demoCheckbox",
	title: "Demo Checkbox",
	label: "Some Label",
	isChecked: false,
	isIndeterminate: true
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
	onChange: action("callback"),
	name: "demoCheckbox",
	title: "Demo Checkbox",
	label: "Some Label",
	isChecked: true,
	readOnly: true
};
