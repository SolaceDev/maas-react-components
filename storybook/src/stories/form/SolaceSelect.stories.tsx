import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceSelect } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { MenuItem } from "@material-ui/core";
import { SolaceSelectAutocompleteItem, SolaceSelectAutocompleteItemProps } from "@SolaceDev/maas-react-components";

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
	<MenuItem key="option1" value="Menu Option #1">
		Menu Option #1
	</MenuItem>
);
SELECT_OPTIONS.push(
	<MenuItem key="option2" value="Menu Option #2">
		Menu Option #2
	</MenuItem>
);
SELECT_OPTIONS.push(
	<MenuItem key="option3" value="Menu Option #3">
		Menu Option #3
	</MenuItem>
);

const SELECT_OPTIONS_WITH_SUBTEXT: Array<SolaceSelectAutocompleteItemProps> = [
	{
		name: "Option #1",
		value: "option1",
		subText: "Some sub text for option 1",
		supplementalText: "supplemental text option 1"
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
		supplementalText: "supplemental text option 4"
	}
];
function generateSelectOptionsWithSubtext(): Array<JSX.Element> {
	return SELECT_OPTIONS_WITH_SUBTEXT.map((option) => {
		return (
			<MenuItem key={option.value} value={option.name}>
				<SolaceSelectAutocompleteItem {...option} />
			</MenuItem>
		);
	});
}

const Template: ComponentStory<typeof SolaceSelect> = (args) => <SolaceSelect {...args} />;

export const DefaultTextfield = Template.bind({});
DefaultTextfield.args = {
	onChange: action("callback"),
	title: "Demo Select",
	id: "demoSelectId",
	name: "demoSelect",
	children: SELECT_OPTIONS
};

export const StackedLabelFormat = Template.bind({});
StackedLabelFormat.args = {
	onChange: action("callback"),
	title: "Demo Select",
	name: "demoSelect",
	label: "Some Label",
	children: SELECT_OPTIONS
};

export const InlineLabelFormat = Template.bind({});
InlineLabelFormat.args = {
	onChange: action("callback"),
	name: "demoSelect",
	title: "Demo Select",
	label: "Some Label",
	children: SELECT_OPTIONS,
	isInlineLabel: true
};

export const Subtext = Template.bind({});
Subtext.args = {
	onChange: action("callback"),
	name: "demoSelect",
	title: "Demo Select Field",
	label: "Some Label",
	children: generateSelectOptionsWithSubtext()
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
