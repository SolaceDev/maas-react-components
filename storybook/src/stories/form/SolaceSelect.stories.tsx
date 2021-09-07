import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceSelect } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { MenuItem } from "@material-ui/core";

export default {
	title: "Forms/SolaceSelect",
	component: SolaceSelect,
	parameters: {
		controls: { sort: "alpha" }
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
		isInlineLabel: {
			control: {
				type: "boolean"
			}
		},
		isRequired: {
			control: {
				type: "boolean"
			}
		},
		isDisabled: {
			control: {
				type: "boolean"
			}
		},
		isReadOnly: {
			control: {
				type: "boolean"
			}
		},
		value: {
			control: {
				type: "text"
			}
		}
	}
} as ComponentMeta<typeof SolaceSelect>;

const SELECT_OPTIONS: Array<any> = [];
SELECT_OPTIONS.push(
	<MenuItem key="option1" value="option1">
		Menu Option #1
	</MenuItem>
);
SELECT_OPTIONS.push(
	<MenuItem key="option2" value="option2">
		Menu Option #2
	</MenuItem>
);
SELECT_OPTIONS.push(
	<MenuItem key="option3" value="option3">
		Menu Option #3
	</MenuItem>
);
const Template: ComponentStory<typeof SolaceSelect> = (args) => <SolaceSelect {...args} />;

export const DefaultTextfield = Template.bind({});
DefaultTextfield.args = {
	onChange: action("callback"),
	title: "Demo Select",
	id: "demoSelectId",
	name: "demoSelect",
	children: SELECT_OPTIONS
};

export const StackedLabeleFormat = Template.bind({});
StackedLabeleFormat.args = {
	onChange: action("callback"),
	title: "Demo Select",
	name: "demoSelect",
	label: "Some Label",
	children: SELECT_OPTIONS
};

export const InlineLabeleFormat = Template.bind({});
InlineLabeleFormat.args = {
	onChange: action("callback"),
	name: "demoSelect",
	title: "Demo Select",
	label: "Some Label",
	children: SELECT_OPTIONS,
	isInlineLabel: true
};

export const HelperText = Template.bind({});
HelperText.args = {
	onChange: action("callback"),
	name: "demoSelect",
	title: "Demo Select Field",
	label: "Some Label",
	children: SELECT_OPTIONS,
	helperText: "Some helper text"
};

export const WithErrors = Template.bind({});
WithErrors.args = {
	onChange: action("callback"),
	name: "demoSelect",
	title: "Demo Select Field",
	label: "Some Label",
	children: SELECT_OPTIONS,
	helperText: "The text you entered was invalid",
	hasErrors: true
};

export const Required = Template.bind({});
Required.args = {
	onChange: action("callback"),
	name: "demoSelect",
	title: "Demo Select Field",
	label: "Some Label",
	children: SELECT_OPTIONS,
	isRequired: true
};

export const Disabled = Template.bind({});
Disabled.args = {
	onChange: action("callback"),
	name: "demoSelect",
	title: "Demo Select Field",
	label: "Some Label",
	children: SELECT_OPTIONS,
	value: "option2",
	isDisabled: true
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
	onChange: action("callback"),
	name: "demoSelect",
	title: "Demo Select Field",
	label: "Some Label",
	children: SELECT_OPTIONS,
	value: "option3",
	isReadOnly: true
};
