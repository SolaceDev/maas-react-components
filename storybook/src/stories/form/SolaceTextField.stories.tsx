import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceTextField } from "@solacedev/maas-react-components";
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
	argTypes: {
		type: {
			control: {
				type: "select"
			}
		}
	}
} as ComponentMeta<typeof SolaceTextField>;

const Template: ComponentStory<typeof SolaceTextField> = (args) => <SolaceTextField {...args} />;

export const DefaultTextfield = Template.bind({});
DefaultTextfield.args = {
	onChange: action("text-changed"),
	title: "Demo Text Field",
	id: "demoTextFieldId",
	name: "demoTextField"
};

export const StackedLabeleFormat = Template.bind({});
StackedLabeleFormat.args = {
	onChange: action("text-changed"),
	title: "Demo Text Field",
	name: "demoTextField",
	label: "Some Label"
};

export const InlineLabeleFormat = Template.bind({});
InlineLabeleFormat.args = {
	onChange: action("text-changed"),
	name: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	isInlineLabel: true
};

export const PlaceholderText = Template.bind({});
PlaceholderText.args = {
	onChange: action("text-changed"),
	name: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	placeholder: "Some placeholder text"
};

export const HelperText = Template.bind({});
HelperText.args = {
	onChange: action("text-changed"),
	name: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	helperText: "Some helper text"
};

export const WithErrors = Template.bind({});
WithErrors.args = {
	onChange: action("text-changed"),
	name: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	helperText: "The text you entered was invalid",
	hasErrors: true
};

export const Required = Template.bind({});
Required.args = {
	onChange: action("text-changed"),
	name: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	isRequired: true
};

export const Disabled = Template.bind({});
Disabled.args = {
	onChange: action("text-changed"),
	name: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	value: "Some value",
	isDisabled: true
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
	onChange: action("text-changed"),
	name: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	value: "Some value",
	isReadOnly: true
};
