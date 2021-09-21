import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceRadio } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

export default {
	title: "Forms/SolaceRadio",
	component: SolaceRadio,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=2931%3A22385"
		}
	},
	argTypes: {}
} as ComponentMeta<typeof SolaceRadio>;

const Template: ComponentStory<typeof SolaceRadio> = (args) => <SolaceRadio {...args} />;

export const DefaultRadio = Template.bind({});
DefaultRadio.args = {
	onChange: action("callback"),
	title: "Demo Radio",
	id: "demoRadioId",
	name: "demoRadio",
	value: "someValue"
};

export const Labeled = Template.bind({});
Labeled.args = {
	onChange: action("callback"),
	title: "Demo Radio",
	id: "demoRadioId",
	name: "demoRadio",
	label: "Some Label",
	value: "someValue"
};

export const HelperText = Template.bind({});
HelperText.args = {
	onChange: action("callback"),
	title: "Demo Radio",
	id: "demoRadioId",
	name: "demoRadio",
	label: "Some Label",
	helperText: "Some helper text here",
	value: "someValue"
};

export const WithErrors = Template.bind({});
WithErrors.args = {
	onChange: action("callback"),
	title: "Demo Radio",
	id: "demoRadioId",
	name: "demoRadio",
	label: "Some Label",
	hasErrors: true,
	helperText: "Some error occured",
	value: "someValue"
};

export const Required = Template.bind({});
Required.args = {
	onChange: action("callback"),
	name: "demoRadio",
	title: "Demo Checkbox",
	label: "Some Label",
	isRequired: true,
	value: "someValue"
};

export const Disabled = Template.bind({});
Disabled.args = {
	onChange: action("callback"),
	name: "demoRadio",
	title: "Demo Radio",
	label: "Some Label",
	isChecked: true,
	isDisabled: true,
	value: "someValue"
};
