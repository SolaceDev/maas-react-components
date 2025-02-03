import React, { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SolaceSearchAndFilter, FIELD_TYPES, SolaceTextFieldChangeEvent } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/testing-library";

(SolaceSearchAndFilter as React.FC & { displayName?: string }).displayName = "SolaceSearchAndFilter";

export default {
	title: "Input/Textfield/Search & Filter",
	component: SolaceSearchAndFilter,
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceSearchAndFilter"
			}
		}
	},
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
} as Meta<typeof SolaceSearchAndFilter>;

const SEARCH_PLACEHOLDER_TEXT = "Search for Application";
const FILTER_PLACEHOLDER_TEXT = "Filter by name";

const Template: StoryFn<typeof SolaceSearchAndFilter> = (args) => {
	const { value, onChange, ...rest } = args;
	const [searchValue, setSerachValue] = useState(value);
	const handleChange = (event: SolaceTextFieldChangeEvent) => {
		setSerachValue(event.value);
		onChange(event);
	};
	return <SolaceSearchAndFilter value={searchValue} onChange={handleChange} {...rest} />;
};

export const Default = {
	render: Template,
	args: { name: "testField", onChange: action("key typed") }
};

export const Search = {
	render: Template,

	args: {
		id: "searchAndFilterID",
		name: "testField",
		type: FIELD_TYPES.SEARCH,
		placeholder: SEARCH_PLACEHOLDER_TEXT,
		onChange: action("key typed")
	}
};

export const Filter = {
	render: Template,

	args: {
		id: "searchAndFilterID",
		name: "testField",
		type: FIELD_TYPES.FILTER,
		placeholder: FILTER_PLACEHOLDER_TEXT,
		onChange: action("key typed")
	}
};

export const FixedWidth = {
	render: Template,

	args: {
		id: "searchAndFilterID",
		name: "testField",
		type: FIELD_TYPES.SEARCH,
		placeholder: SEARCH_PLACEHOLDER_TEXT,
		width: "200px",
		onChange: action("key typed")
	}
};

export const WithLabel = {
	render: Template,

	args: {
		id: "searchAndFilterID",
		name: "testField",
		label: "Search",
		type: FIELD_TYPES.SEARCH,
		placeholder: SEARCH_PLACEHOLDER_TEXT,
		onChange: action("key typed")
	}
};

export const HelperText = {
	render: Template,

	args: {
		id: "searchAndFilterID",
		name: "testField",
		type: FIELD_TYPES.SEARCH,
		placeholder: SEARCH_PLACEHOLDER_TEXT,
		helperText: "Showing 20 of 25 Results. Specify your search for more results",
		onChange: action("key typed")
	}
};

export const InitialValue = {
	render: Template,

	args: {
		id: "searchAndFilterID",
		name: "testField",
		type: FIELD_TYPES.SEARCH,
		placeholder: SEARCH_PLACEHOLDER_TEXT,
		width: "200px",
		value: "initial value",
		onChange: action("key typed")
	}
};

export const HasErrors = {
	render: Template,

	args: {
		id: "searchAndFilterID",
		name: "testField",
		type: FIELD_TYPES.SEARCH,
		placeholder: SEARCH_PLACEHOLDER_TEXT,
		value: "some invalid search",
		hasErrors: true,
		helperText: "Unexpected network error, please contact your system administrator",
		onChange: action("key typed")
	}
};

export const Disabled = {
	render: Template,

	args: {
		id: "searchAndFilterID",
		name: "testField",
		type: FIELD_TYPES.SEARCH,
		placeholder: SEARCH_PLACEHOLDER_TEXT,
		width: "200px",
		disabled: true,
		onChange: action("key typed")
	}
};

export const ClearAllNotification = {
	render: Template,

	args: {
		id: "searchAndFilterID",
		name: "testField",
		type: FIELD_TYPES.SEARCH,
		placeholder: SEARCH_PLACEHOLDER_TEXT,
		width: "400px",
		value: "initial value to be cleared",
		onChange: action("key typed"),
		onClearAll: action("clear all triggered")
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("button"));
	}
};

export const OnFocus = Template.bind({});

OnFocus.args = {
	id: "searchAndFilterOnFocus",
	name: "testFieldOnFocus",
	type: FIELD_TYPES.SEARCH,
	placeholder: "Click or tab into me and observe the action!",
	onChange: action("value changed"),
	onFocus: action("input focused") // Using action() to log the onFocus event
};

OnFocus.play = async ({ canvasElement }) => {
	// Starts querying the component from it's root element
	const canvas = within(canvasElement);
	await userEvent.click(canvas.getByRole("textbox"));
};
