import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SolaceTextField from "../../components/form/SolaceTextField";
import { action } from "@storybook/addon-actions";

export default {
	title: "Forms/SolaceTextfield",
	component: SolaceTextField,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/P5XeF1KE6z2MKyzlEyInrH/Core-Component-Specs-(Copy)?node-id=430%3A548"
		}
	},
	argTypes: {}
} as ComponentMeta<typeof SolaceTextField>;

const Template: ComponentStory<typeof SolaceTextField> = (args) => <SolaceTextField {...args} />;

export const DefaultTextfield = Template.bind({});
DefaultTextfield.args = {
	onChange: action("text-changed"),
	title: "Demo Text Field",
	id: "demoTextField"
};

export const StackedLabeleFormat = Template.bind({});
StackedLabeleFormat.args = {
	onChange: action("text-changed"),
	title: "Demo Text Field",
	id: "demoTextField",
	label: "Some Label"
};

export const InlineLabeleFormat = Template.bind({});
InlineLabeleFormat.args = {
	onChange: action("text-changed"),
	id: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	isInlineLabel: true
};

export const PlaceholderText = Template.bind({});
PlaceholderText.args = {
	onChange: action("text-changed"),
	id: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	placeholder: "Some placeholder text"
};

export const HelperText = Template.bind({});
HelperText.args = {
	onChange: action("text-changed"),
	id: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	helperText: "Some helper text"
};

export const ErrorState = Template.bind({});
ErrorState.args = {
	onChange: action("text-changed"),
	id: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	helperText: "The text you entered was invalid",
	hasErrors: true
};

export const RequiredTextField = Template.bind({});
RequiredTextField.args = {
	onChange: action("text-changed"),
	id: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	isRequired: true
};

export const DisabledTextField = Template.bind({});
DisabledTextField.args = {
	onChange: action("text-changed"),
	id: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	value: "Some value",
	isDisabled: true
};

export const ReadOnlyTextField = Template.bind({});
ReadOnlyTextField.args = {
	onChange: action("text-changed"),
	id: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	value: "Some value",
	isReadOnly: true
};

export const PasswordTextField = Template.bind({});
PasswordTextField.args = {
	onChange: action("text-changed"),
	id: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	isPassword: true
};
