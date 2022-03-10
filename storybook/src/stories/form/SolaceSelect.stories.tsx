import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
	SolaceSelect,
	DeleteIcon,
	AddCircleOutlineOutlinedIcon,
	HelpOutlineOutlinedIcon
} from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { MenuItem } from "@SolaceDev/maas-react-components";
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
			<MenuItem key={option.value} value={option.value}>
				<SolaceSelectAutocompleteItem {...option} />
			</MenuItem>
		);
	});
}

const SELECT_OPTIONS_WITH_ICON: Array<any> = [
	{
		name: "Option #1",
		value: "option1",
		icon: <DeleteIcon />
	},
	{
		name: "Option #2",
		value: "option2",
		icon: <AddCircleOutlineOutlinedIcon />
	},
	{
		name: "Option #3",
		value: "option3",
		icon: <HelpOutlineOutlinedIcon />
	}
];
function generateSelectOptionsWithIcon(): Array<JSX.Element> {
	return SELECT_OPTIONS_WITH_ICON.map((option) => {
		return (
			<MenuItem key={option.value} value={option.value}>
				<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
					{option.icon}
					{option.name}
				</div>
			</MenuItem>
		);
	});
}

const SELECT_OPTIONS_WITH_ICON_TEXT: Array<any> = [
	{
		name: "Solace",
		value: "solace",
		delimiter: "use /"
	},
	{
		name: "Kafka",
		value: "kafka",
		delimiter: "use ."
	},
	{
		name: "Unknown",
		value: "unknown",
		delimiter: ""
	}
];
function generateSelectOptionsWithIconAndText(): Array<JSX.Element> {
	return SELECT_OPTIONS_WITH_ICON_TEXT.map((option) => {
		return (
			<MenuItem key={option.value} value={option.value}>
				<div
					style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", width: "100%" }}
				>
					{option.name}
					{option.delimiter ? <span>{option.delimiter}</span> : <HelpOutlineOutlinedIcon fontSize="small" />}
				</div>
			</MenuItem>
		);
	});
}

const TITLE = "Demo Select";
const LABEL = "Some Label";

const Template: ComponentStory<typeof SolaceSelect> = (args) => <SolaceSelect {...args} />;

export const DefaultTextfield = Template.bind({});
DefaultTextfield.args = {
	onChange: action("callback"),
	title: TITLE,
	id: "demoSelectId",
	name: "demoSelect",
	children: SELECT_OPTIONS
};

export const StackedLabelFormat = Template.bind({});
StackedLabelFormat.args = {
	onChange: action("callback"),
	title: TITLE,
	name: "demoSelect",
	label: LABEL,
	children: SELECT_OPTIONS
};

export const InlineLabelFormat = Template.bind({});
InlineLabelFormat.args = {
	onChange: action("callback"),
	name: "demoSelect",
	title: TITLE,
	label: LABEL,
	children: SELECT_OPTIONS,
	inlineLabel: true
};

export const Subtext = Template.bind({});
Subtext.args = {
	onChange: action("callback"),
	getOptionDisplayValue: (value) => {
		const match = SELECT_OPTIONS_WITH_SUBTEXT.find((props) => props.value === value);
		return match ? match.name : "";
	},
	name: "demoSelect",
	title: TITLE,
	label: LABEL,
	children: generateSelectOptionsWithSubtext()
};

export const HelperText = Template.bind({});
HelperText.args = {
	onChange: action("callback"),
	name: "demoSelect",
	title: TITLE,
	label: LABEL,
	children: SELECT_OPTIONS,
	helperText: "Some helper text"
};

export const WithErrors = Template.bind({});
WithErrors.args = {
	onChange: action("callback"),
	name: "demoSelect",
	title: TITLE,
	label: LABEL,
	children: SELECT_OPTIONS,
	helperText: "The text you entered was invalid",
	hasErrors: true
};

export const Required = Template.bind({});
Required.args = {
	onChange: action("callback"),
	name: "demoSelect",
	title: TITLE,
	label: LABEL,
	children: SELECT_OPTIONS,
	required: true
};

export const Disabled = Template.bind({});
Disabled.args = {
	onChange: action("callback"),
	name: "demoSelect",
	title: TITLE,
	label: LABEL,
	children: SELECT_OPTIONS,
	value: "option2",
	disabled: true
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
	onChange: action("callback"),
	name: "demoSelect",
	title: TITLE,
	label: LABEL,
	children: SELECT_OPTIONS,
	value: "option3",
	readOnly: true
};

export const WithIcon = Template.bind({});
WithIcon.args = {
	onChange: action("callback"),
	name: "demoSelect",
	title: TITLE,
	label: LABEL,
	children: generateSelectOptionsWithIcon()
};

export const WithIconDisabled = Template.bind({});
WithIconDisabled.args = {
	onChange: action("callback"),
	name: "demoSelect",
	title: TITLE,
	label: LABEL,
	value: "option2",
	children: generateSelectOptionsWithIcon(),
	disabled: true
};

export const WithIconReadonly = Template.bind({});
WithIconReadonly.args = {
	onChange: action("callback"),
	name: "demoSelect",
	title: TITLE,
	label: LABEL,
	value: "option3",
	children: generateSelectOptionsWithIcon(),
	readOnly: true
};

export const WithIconAndText = Template.bind({});
WithIconAndText.args = {
	onChange: action("callback"),
	name: "demoSelect",
	title: TITLE,
	label: LABEL,
	children: generateSelectOptionsWithIconAndText()
};
