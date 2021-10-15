import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
	SolaceSelectAutocomplete,
	SolaceSelectAutocompleteItem,
	getSolaceSelectAutocompleteOptionLabel,
	SolaceSelectAutocompleteItemProps
} from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

export default {
	title: "Forms/SolaceSelectAutocomplete",
	component: SolaceSelectAutocomplete,
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
		}
	}
} as ComponentMeta<typeof SolaceSelectAutocomplete>;

const SELECT_OPTIONS: Array<SolaceSelectAutocompleteItemProps> = [
	{
		name: "Option #1",
		value: "option1",
		subText: "Some sub text for option 1",
		suplementalText: "suplemental text option 1"
	},
	{
		name: "Option #2",
		value: "option2",
		subText: "Some sub text for option 2"
	},
	{
		name: "Option #3",
		value: "option3"
	},
	{
		name: "Option #4",
		value: "option4",
		suplementalText: "suplemental text option 4"
	}
];

const Template: ComponentStory<typeof SolaceSelectAutocomplete> = (args) => <SolaceSelectAutocomplete {...args} />;

export const DefaultAutocomplete = Template.bind({});
DefaultAutocomplete.args = {
	onChange: action("callback"),
	itemComponent: SolaceSelectAutocompleteItem,
	optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
	itemMappingCallback: (option) => option,
	title: "Demo Select",
	id: "demoSelectId",
	name: "demoSelect",
	options: SELECT_OPTIONS
};

export const StackedLabeleFormat = Template.bind({});
StackedLabeleFormat.args = {
	onChange: action("callback"),
	itemComponent: SolaceSelectAutocompleteItem,
	optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
	itemMappingCallback: (option) => option,
	title: "Demo Select",
	name: "demoSelect",
	label: "Some Label",
	options: SELECT_OPTIONS
};

export const InlineLabeleFormat = Template.bind({});
InlineLabeleFormat.args = {
	onChange: action("callback"),
	itemComponent: SolaceSelectAutocompleteItem,
	optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
	itemMappingCallback: (option) => option,
	name: "demoSelect",
	title: "Demo Select",
	label: "Some Label",
	options: SELECT_OPTIONS,
	isInlineLabel: true
};

export const HelperText = Template.bind({});
HelperText.args = {
	onChange: action("callback"),
	itemComponent: SolaceSelectAutocompleteItem,
	optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
	itemMappingCallback: (option) => option,
	name: "demoSelect",
	title: "Demo Select Field",
	label: "Some Label",
	options: SELECT_OPTIONS,
	helperText: "Some helper text"
};

export const WithErrors = Template.bind({});
WithErrors.args = {
	onChange: action("callback"),
	itemComponent: SolaceSelectAutocompleteItem,
	optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
	itemMappingCallback: (option) => option,
	name: "demoSelect",
	title: "Demo Select Field",
	label: "Some Label",
	options: SELECT_OPTIONS,
	helperText: "The text you entered was invalid",
	hasErrors: true
};

export const Required = Template.bind({});
Required.args = {
	onChange: action("callback"),
	itemComponent: SolaceSelectAutocompleteItem,
	optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
	itemMappingCallback: (option) => option,
	name: "demoSelect",
	title: "Demo Select Field",
	label: "Some Label",
	options: SELECT_OPTIONS,
	isRequired: true
};

export const Disabled = Template.bind({});
Disabled.args = {
	onChange: action("callback"),
	itemComponent: SolaceSelectAutocompleteItem,
	optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
	itemMappingCallback: (option) => option,
	name: "demoSelect",
	title: "Demo Select Field",
	label: "Some Label",
	options: SELECT_OPTIONS,
	value: {
		name: "Option #2",
		value: "option2",
		subText: "Some sub text",
		suplementalText: "opt2"
	},
	isDisabled: true
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
	onChange: action("callback"),
	itemComponent: SolaceSelectAutocompleteItem,
	optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
	itemMappingCallback: (option) => option,
	name: "demoSelect",
	title: "Demo Select Field",
	label: "Some Label",
	options: SELECT_OPTIONS,
	value: {
		name: "Option #2",
		value: "option2",
		subText: "Some sub text",
		suplementalText: "opt2"
	},
	isReadOnly: true
};
