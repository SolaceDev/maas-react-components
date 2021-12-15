import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceCheckBox } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

const LABEL = "Some Label";

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
		lightSubText: {
			control: {
				type: "boolean"
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
	id: "demoCheckboxId",
	name: "demoCheckbox"
};

export const Labeled = Template.bind({});
Labeled.args = {
	onChange: action("callback"),
	id: "demoCheckboxId",
	name: "demoCheckbox",
	label: LABEL,
	subText: ""
};

export const BoldLabel = Template.bind({});
BoldLabel.args = {
	onChange: action("callback"),
	id: "demoCheckboxId",
	name: "demoCheckbox",
	label: LABEL,
	boldLabel: true,
	subText: ""
};

export const LargeLabel = Template.bind({});
LargeLabel.args = {
	onChange: action("callback"),
	id: "demoCheckboxId",
	name: "demoCheckbox",
	label: LABEL,
	largeLabel: true,
	subText: ""
};

export const SubText = Template.bind({});
SubText.args = {
	onChange: action("callback"),
	id: "demoCheckboxId",
	name: "demoCheckbox",
	label: "Primary Label",
	subText: "subtext subtext",
	boldLabel: false,
	lightSubText: false
};

export const LightSubText = Template.bind({});
LightSubText.args = {
	onChange: action("callback"),
	id: "demoCheckboxId",
	name: "demoCheckbox",
	label: "Primary Label",
	subText: "This is a light subtext",
	lightSubText: true
};

export const HelperText = Template.bind({});
HelperText.args = {
	onChange: action("callback"),
	id: "demoCheckboxId",
	name: "demoCheckbox",
	label: LABEL,
	helperText: "Some helper text here",
	subText: ""
};

export const WithErrors = Template.bind({});
WithErrors.args = {
	onChange: action("callback"),
	id: "demoCheckboxId",
	name: "demoCheckbox",
	label: LABEL,
	hasErrors: true,
	helperText: "Some error occured",
	subText: ""
};

export const Required = Template.bind({});
Required.args = {
	onChange: action("callback"),
	name: "demoCheckbox",
	label: LABEL,
	required: true,
	subText: ""
};

export const Disabled = Template.bind({});
Disabled.args = {
	onChange: action("callback"),
	name: "demoCheckbox",
	label: LABEL,
	checked: true,
	disabled: true,
	subText: ""
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
	onChange: action("callback"),
	name: "demoCheckbox",
	label: LABEL,
	checked: false,
	indeterminate: true
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
	onChange: action("callback"),
	name: "demoCheckbox",
	label: LABEL,
	checked: true,
	readOnly: true,
	subText: ""
};
