import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceSearchAndFilter, FIELD_TYPES, SolaceTextFieldChangeEvent } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

export default {
	title: "Under Construction/SolaceSearchAndFilter",
	component: SolaceSearchAndFilter,
	parameters: {},
	argTypes: {
		width: {
			control: {
				type: "text"
			}
		},
		type: {
			options: [FIELD_TYPES.DEFAULT, FIELD_TYPES.FILTER, FIELD_TYPES.SEARCH],
			control: { type: "radio" }
		}
	}
} as ComponentMeta<typeof SolaceSearchAndFilter>;

const SEARCH_PLACEHOLDER_TEXT = "Search for Application";
const FILTER_PLACEHOLDER_TEXT = "Filter by name";

const Template: ComponentStory<typeof SolaceSearchAndFilter> = (args) => {
	const { value, onChange, ...rest } = args;
	const [searchValue, setSerachValue] = useState(value);
	const handleChange = (event: SolaceTextFieldChangeEvent) => {
		setSerachValue(event.value);
		onChange(event);
	};
	return <SolaceSearchAndFilter value={searchValue} onChange={handleChange} {...rest} />;
};

export const Default = Template.bind({});
Default.args = { name: "testField", onChange: action("key typed") };

export const Search = Template.bind({});
Search.args = {
	id: "searchAndFilterID",
	name: "testField",
	type: FIELD_TYPES.SEARCH,
	placeholder: SEARCH_PLACEHOLDER_TEXT,
	onChange: action("key typed")
};

export const Filter = Template.bind({});
Filter.args = {
	id: "searchAndFilterID",
	name: "testField",
	type: FIELD_TYPES.FILTER,
	placeholder: FILTER_PLACEHOLDER_TEXT,
	onChange: action("key typed")
};

export const FixedWidth = Template.bind({});
FixedWidth.args = {
	id: "searchAndFilterID",
	name: "testField",
	type: FIELD_TYPES.SEARCH,
	placeholder: SEARCH_PLACEHOLDER_TEXT,
	width: "200px",
	onChange: action("key typed")
};

export const WithLabel = Template.bind({});
WithLabel.args = {
	id: "searchAndFilterID",
	name: "testField",
	label: "Search",
	type: FIELD_TYPES.SEARCH,
	placeholder: SEARCH_PLACEHOLDER_TEXT,
	onChange: action("key typed")
};

export const HelperText = Template.bind({});
HelperText.args = {
	id: "searchAndFilterID",
	name: "testField",
	type: FIELD_TYPES.SEARCH,
	placeholder: SEARCH_PLACEHOLDER_TEXT,
	helperText: "Showing 20 of 25 Results. Specify your search for more results",
	onChange: action("key typed")
};

export const InitialValue = Template.bind({});
InitialValue.args = {
	id: "searchAndFilterID",
	name: "testField",
	type: FIELD_TYPES.SEARCH,
	placeholder: SEARCH_PLACEHOLDER_TEXT,
	width: "200px",
	value: "initial value",
	onChange: action("key typed")
};

export const HasErrors = Template.bind({});
HasErrors.args = {
	id: "searchAndFilterID",
	name: "testField",
	type: FIELD_TYPES.SEARCH,
	placeholder: SEARCH_PLACEHOLDER_TEXT,
	value: "some invalid search",
	hasErrors: true,
	helperText: "Unexpected network error, please contact your system administrator",
	onChange: action("key typed")
};

export const Disabled = Template.bind({});
Disabled.args = {
	id: "searchAndFilterID",
	name: "testField",
	type: FIELD_TYPES.SEARCH,
	placeholder: SEARCH_PLACEHOLDER_TEXT,
	width: "200px",
	disabled: true,
	onChange: action("key typed")
};
