import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceToggle } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

export default {
	title: "Forms/SolaceToggle",
	component: SolaceToggle,
	parameters: {},
	argTypes: {}
} as ComponentMeta<typeof SolaceToggle>;

const Template: ComponentStory<typeof SolaceToggle> = (args) => <SolaceToggle {...args} />;

export const DefaultToggle = Template.bind({});
DefaultToggle.args = {
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
	isOn: true,
	isDisabled: true
};
