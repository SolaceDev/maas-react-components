import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceTextArea } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

export default {
	title: "Forms/SolaceTextArea",
	component: SolaceTextArea,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/P5XeF1KE6z2MKyzlEyInrH/Core-Component-Specs-(Copy)?node-id=430%3A548"
		}
	},
	argTypes: {
		label: {
			control: {
				type: "text"
			}
		},
		helperText: {
			control: {
				type: "text"
			}
		},
		hasErrors: {
			control: {
				type: "boolean"
			}
		},
		autoFocus: {
			control: {
				type: "boolean"
			}
		},
		inlineLabel: {
			control: {
				type: "boolean"
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
		readOnly: {
			control: {
				type: "boolean"
			}
		},
		value: {
			control: {
				type: "text"
			}
		},
		type: {
			options: ["text", "number", "password", "email", "url"],
			control: {
				type: "select"
			}
		},
		size: {
			control: {
				type: "number"
			}
		}
	}
} as ComponentMeta<typeof SolaceTextArea>;

const Template: ComponentStory<typeof SolaceTextArea> = (args) => <SolaceTextArea {...args} />;

export const DefaultTextfield = Template.bind({});
DefaultTextfield.args = {
	onChange: action("callback"),
	title: "Demo Text Field",
	id: "demoTextFieldId",
	name: "demoTextField"
};

export const StackedLabeleFormat = Template.bind({});
StackedLabeleFormat.args = {
	onChange: action("callback"),
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
	inlineLabel: true
};

export const PlaceholderText = Template.bind({});
PlaceholderText.args = {
	onChange: action("callback"),
	name: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	placeholder: "Some placeholder text"
};

export const HelperText = Template.bind({});
HelperText.args = {
	onChange: action("callback"),
	name: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	helperText: "Some helper text"
};

export const WithErrors = Template.bind({});
WithErrors.args = {
	onChange: action("callback"),
	name: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	helperText: "The text you entered was invalid",
	hasErrors: true
};

export const AutoFocus = Template.bind({});
AutoFocus.args = {
	onChange: action("callback"),
	name: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	autoFocus: true
};

export const Required = Template.bind({});
Required.args = {
	onChange: action("callback"),
	name: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	required: true
};

export const Disabled = Template.bind({});
Disabled.args = {
	onChange: action("callback"),
	name: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	value: "Some value",
	disabled: true
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
	onChange: action("callback"),
	name: "demoTextField",
	title: "Demo Text Field",
	label: "Some Label",
	value: "Some value",
	readOnly: true
};
