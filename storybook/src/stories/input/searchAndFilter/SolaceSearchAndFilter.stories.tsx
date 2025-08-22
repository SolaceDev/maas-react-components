/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SolaceSearchAndFilter, FIELD_TYPES, SolaceTextFieldChangeEvent } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/testing-library";

(SolaceSearchAndFilter as React.FC & { displayName?: string }).displayName = "SolaceSearchAndFilter";

const SEARCH_AND_FILTER = "search-and-filter";

export default {
	title: "Input/Search & Filter/Standard",
	component: SolaceSearchAndFilter,
	parameters: {
		docs: {
			description: {
				component: "A search and filter component that can be used to search or filter a list of items."
			}
		}
	},
	argTypes: {
		id: {
			description:
				"Unique identifier ... if `id` is not specified, `name` value will be used in order to make `label` and `helperText` accessible for screen readers",
			defaultValue: {
				summary: SEARCH_AND_FILTER
			}
		},
		name: {
			description: "Name attribute to assign to the `input` element",
			defaultValue: {
				summary: SEARCH_AND_FILTER
			}
		},
		label: {
			description: "The label content to display on the screen",
			defaultValue: {
				summary: "Search"
			}
		},
		value: {
			description: "The value of the `input` element, required for controlled component",
			defaultValue: {
				summary: ""
			}
		},
		placeholder: {
			description: "Short hint displayed in the `input` before user enters a value",
			defaultValue: {
				summary: "Search..."
			}
		},
		width: {
			description: "Custom Width of the component.",
			control: {
				type: "text"
			},
			defaultValue: {
				summary: "100%"
			}
		},
		helperText: {
			description: "Content to display as supportive/explanitory text",
			defaultValue: {
				summary: ""
			}
		},
		hasErrors: {
			description: "Boolean flag to mark the field in error state",
			defaultValue: {
				summary: false
			}
		},
		disabled: {
			description: "Boolean flag to disable the `input`",
			defaultValue: {
				summary: false
			}
		},
		autoFocus: {
			description: "Boolean flag to keep the `input` focused",
			defaultValue: {
				summary: false
			}
		},
		type: {
			description:
				'Indicates whether this is a "search" or "filter" field (appropriate icon will show as the adornment)',
			options: [FIELD_TYPES.DEFAULT, FIELD_TYPES.FILTER, FIELD_TYPES.SEARCH],
			control: { type: "radio" },
			defaultValue: {
				summary: "FIELD_TYPES.DEFAULT"
			}
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
