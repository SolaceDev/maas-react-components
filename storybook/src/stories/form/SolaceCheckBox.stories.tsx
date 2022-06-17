import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceCheckBox } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

const LABEL = "Some Label";
const TITLE = "Demo Checkbox";

export default {
	title: "Forms/SolaceCheckBox",
	component: SolaceCheckBox,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=2932%3A22443"
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
		boldLabel: {
			control: {
				type: "boolean"
			}
		},
		subTextProps: {
			label: {
				control: {
					type: "text"
				}
			},
			light: {
				control: {
					type: "boolean"
				}
			}
		},
		largeLabel: {
			control: {
				type: "boolean"
			}
		}
	}
} as ComponentMeta<typeof SolaceCheckBox>;

const Template: ComponentStory<typeof SolaceCheckBox> = (args) => <SolaceCheckBox {...args} />;

export const DefaultCheckbox = Template.bind({});
DefaultCheckbox.args = {
	onChange: action("callback"),
	title: TITLE,
	id: "demoCheckboxId",
	name: "demoCheckbox"
};

export const Labeled = Template.bind({});
Labeled.args = {
	onChange: action("callback"),
	title: TITLE,
	id: "demoCheckboxId",
	name: "demoCheckbox",
	label: LABEL
};

export const BoldLabel = Template.bind({});
BoldLabel.args = {
	onChange: action("callback"),
	title: TITLE,
	id: "demoCheckboxId",
	name: "demoCheckbox",
	label: LABEL,
	boldLabel: true
};

export const LargeLabel = Template.bind({});
LargeLabel.args = {
	onChange: action("callback"),
	title: TITLE,
	id: "demoCheckboxId",
	name: "demoCheckbox",
	label: LABEL,
	largeLabel: true
};

export const SubText = Template.bind({});
SubText.args = {
	onChange: action("callback"),
	title: TITLE,
	id: "demoCheckboxId",
	name: "demoCheckbox",
	label: "Primary Label",
	subTextProps: {
		label: "Subtext subtext"
	}
};

export const LightSubText = Template.bind({});
LightSubText.args = {
	onChange: action("callback"),
	title: TITLE,
	id: "demoCheckboxId",
	name: "demoCheckbox",
	label: "Primary Label",
	subTextProps: {
		label: "This is a light subtext",
		light: true
	}
};

export const HelperText = Template.bind({});
HelperText.args = {
	onChange: action("callback"),
	title: TITLE,
	id: "demoCheckboxId",
	name: "demoCheckbox",
	label: LABEL,
	helperText: "Some helper text here"
};

export const WithErrors = Template.bind({});
WithErrors.args = {
	onChange: action("callback"),
	title: TITLE,
	id: "demoCheckboxId",
	name: "demoCheckbox",
	label: LABEL,
	hasErrors: true,
	helperText: "Some error occured"
};

export const Required = Template.bind({});
Required.args = {
	onChange: action("callback"),
	title: TITLE,
	name: "demoCheckbox",
	label: LABEL,
	required: true
};

export const Disabled = Template.bind({});
Disabled.args = {
	onChange: action("callback"),
	title: TITLE,
	name: "demoCheckbox",
	label: LABEL,
	checked: true,
	disabled: true
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
	onChange: action("callback"),
	title: TITLE,
	name: "demoCheckbox",
	label: LABEL,
	checked: true,
	indeterminate: true
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
	onChange: action("callback"),
	title: TITLE,
	name: "demoCheckbox",
	label: LABEL,
	checked: true,
	readOnly: true
};
