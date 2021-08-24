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
			url: "https://www.figma.com/file/P5XeF1KE6z2MKyzlEyInrH/Core-Component-Specs-(Copy)?node-id=1%3A2"
		}
	},
	argTypes: {}
} as ComponentMeta<typeof SolaceTextField>;

const Template: ComponentStory<typeof SolaceTextField> = (args) => <SolaceTextField {...args} />;

export const DefaultTextfield = Template.bind({});
DefaultTextfield.args = {
	onChange: action("text-changed"),
	id: "demoTextField"
};

export const StackedLabeleFormat = Template.bind({});
StackedLabeleFormat.args = {
	onChange: action("text-changed"),
	id: "demoTextField",
	label: "Some Label"
};

export const InlineLabeleFormat = Template.bind({});
InlineLabeleFormat.args = {
	label: "Some Label",
	useSameLineLabel: true
};

export const MaterialLabeleFormat = Template.bind({});
MaterialLabeleFormat.args = {
	label: "Some Label",
	useMuiLabelFormat: true
};

export const HelperText = Template.bind({});
HelperText.args = {
	label: "Some Label",
	helperText: "Some helper text"
};

export const ErrorState = Template.bind({});
ErrorState.args = {
	label: "Some Label",
	helperText: "Some error text",
	error: true
};
