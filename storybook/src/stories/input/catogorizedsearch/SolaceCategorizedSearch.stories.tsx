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
import { Meta, StoryFn } from "@storybook/react";
import {
	SolaceCategorizedSearch,
	SolaceCategorizedSearchLayout,
	SolaceTextFieldChangeEvent,
	SolaceToggleButtonGroupOptionProps
} from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { within, userEvent } from "@storybook/testing-library";

(SolaceCategorizedSearch as React.FC & { displayName?: string }).displayName = "SolaceCategorizedSearch";

export default {
	title: "Input/Search & Filter/Categorized",
	component: SolaceCategorizedSearch,
	args: {
		id: "",
		name: "",
		layout: SolaceCategorizedSearchLayout.vertical,
		equalButtonWidth: false,
		disabled: false,
		autoFocus: false,
		hasErrors: false,
		hasWarnings: false,
		categoryOptions: [],
		selectedCategoryValue: "",
		searchValue: "",
		placeholder: "",
		helperText: "",
		categoryOptionsWidth: "",
		searchInputWidth: ""
	},
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceCategorizedSearch"
			}
		}
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description:
				"Unique identifier for the categorized search component. Used for accessibility and programmatic access.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		name: {
			control: { type: "text" },
			description: "Name attribute for the search input field.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		layout: {
			options: ["horizontal", "vertical"],
			control: { type: "radio" },
			description:
				"Determines the layout of the search component. 'horizontal' places categories next to the search field, 'vertical' places them above.",
			table: {
				type: { summary: "SolaceCategorizedSearchLayout" },
				defaultValue: { summary: "SolaceCategorizedSearchLayout.vertical" }
			}
		},
		equalButtonWidth: {
			control: { type: "boolean" },
			description: "If true, all category buttons will have equal width.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		disabled: {
			control: { type: "boolean" },
			description: "If true, the entire component will be disabled and non-interactive.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		autoFocus: {
			control: { type: "boolean" },
			description: "If true, the search input will automatically receive focus when the component mounts.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		hasErrors: {
			control: { type: "boolean" },
			description: "If true, displays the component in an error state.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		hasWarnings: {
			control: { type: "boolean" },
			description:
				"If true, displays the categorized search in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the search.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		categoryOptions: {
			control: { type: "object" },
			description: "Array of category options to display as toggle buttons.",
			table: {
				type: { summary: "SolaceToggleButtonGroupOptionProps[]" },
				defaultValue: { summary: "[]" }
			}
		},
		selectedCategoryValue: {
			control: { type: "text" },
			description: "The currently selected category value.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		onCategoryChange: {
			description: "Callback function triggered when a category is selected.",
			table: {
				type: { summary: "(event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => void" },
				defaultValue: { summary: "undefined" }
			}
		},
		searchValue: {
			control: { type: "text" },
			description: "The current value of the search input.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: '""' }
			}
		},
		onSearchValueChange: {
			description: "Callback function triggered when the search input value changes.",
			table: {
				type: { summary: "(event: SolaceTextFieldChangeEvent) => void" },
				defaultValue: { summary: "undefined" }
			}
		},
		placeholder: {
			control: { type: "text" },
			description: "Placeholder text for the search input when it's empty.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		helperText: {
			control: { type: "text" },
			description: "Helper text displayed below the search input.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		categoryOptionsWidth: {
			control: { type: "text" },
			description: "Width of the category options container.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		searchInputWidth: {
			control: { type: "text" },
			description: "Width of the search input field.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		onClearAll: {
			description: "Callback function triggered when the clear all button is clicked.",
			table: {
				type: { summary: "() => void" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta;

const SEARCH_PLACEHOLDER_TEXT = "Search by name";
const VALUE_CHANGED = "key typed";
const CATEGORY_CHANGED = "on category change";
const getCategories = (disabledCategory?: string) => {
	const options: SolaceToggleButtonGroupOptionProps[] = [
		{ value: "all", label: "All", disabled: "all" === disabledCategory },
		{ value: "category1", label: "Category 1", disabled: "category1" === disabledCategory },
		{ value: "category200", label: "Category 200", disabled: "category200" === disabledCategory }
	];

	return options;
};

const Template: StoryFn<typeof SolaceCategorizedSearch> = (args) => {
	const { searchValue, onSearchValueChange, selectedCategoryValue, onCategoryChange, ...rest } = args;
	const [searchTextValue, setSearchTextValue] = useState(searchValue);
	const [activeCategoryValue, setActiveCategoryValue] = useState(selectedCategoryValue);

	const handleChange = (event: SolaceTextFieldChangeEvent) => {
		setSearchTextValue(event.value);
		onSearchValueChange(event);
	};

	const handleCategoryChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => {
		setActiveCategoryValue(value);
		onCategoryChange(event, value);
	};

	return (
		<SolaceCategorizedSearch
			searchValue={searchTextValue}
			onSearchValueChange={handleChange}
			selectedCategoryValue={activeCategoryValue}
			onCategoryChange={handleCategoryChange}
			{...rest}
		/>
	);
};

export const Default = {
	render: Template,
	args: {
		name: "testCategorizedSearch",
		onSearchValueChange: action(VALUE_CHANGED),
		onCategoryChange: action(CATEGORY_CHANGED),
		categoryOptions: getCategories(),
		placeholder: SEARCH_PLACEHOLDER_TEXT
	}
};

export const FixedWidth = {
	render: Template,
	args: {
		name: "testCategorizedSearch",
		onSearchValueChange: action(VALUE_CHANGED),
		onCategoryChange: action(CATEGORY_CHANGED),
		categoryOptions: getCategories(),
		selectedCategoryValue: "category1",
		categoryOptionsWidth: "300px",
		searchInputWidth: "300px"
	}
};

export const EqualButtonWidth = {
	render: Template,
	args: {
		name: "testCategorizedSearch",
		onSearchValueChange: action(VALUE_CHANGED),
		onCategoryChange: action(CATEGORY_CHANGED),
		categoryOptions: getCategories(),
		selectedCategoryValue: "category1",
		equalButtonWidth: true,
		categoryOptionsWidth: "360px",
		searchInputWidth: "360px"
	}
};

export const HelperText = {
	render: Template,

	args: {
		id: "testCategorizedSearch",
		name: "testCategorizedSearch",
		onSearchValueChange: action(VALUE_CHANGED),
		onCategoryChange: action(CATEGORY_CHANGED),
		categoryOptions: getCategories(),
		selectedCategoryValue: "category1",
		equalButtonWidth: true,
		categoryOptionsWidth: "360px",
		searchInputWidth: "360px",
		helperText: "Showing 20 of 25 Results. Specify your search for more results"
	}
};

export const HasErrors = {
	render: Template,

	args: {
		id: "testCategorizedSearch",
		name: "testCategorizedSearch",
		onSearchValueChange: action(VALUE_CHANGED),
		onCategoryChange: action(CATEGORY_CHANGED),
		categoryOptions: getCategories(),
		selectedCategoryValue: "category1",
		equalButtonWidth: true,
		categoryOptionsWidth: "360px",
		searchInputWidth: "360px",
		hasErrors: true,
		helperText: "Unexpected network error, please contact your system administrator"
	}
};

export const Disabled = {
	render: Template,

	args: {
		id: "testCategorizedSearch",
		name: "testCategorizedSearch",
		onSearchValueChange: action(VALUE_CHANGED),
		onCategoryChange: action(CATEGORY_CHANGED),
		categoryOptions: getCategories(),
		selectedCategoryValue: "category1",
		equalButtonWidth: true,
		categoryOptionsWidth: "360px",
		searchInputWidth: "360px",
		disabled: true
	}
};

export const OneCategoryDisabled = {
	render: Template,

	args: {
		id: "testCategorizedSearch",
		name: "testCategorizedSearch",
		onSearchValueChange: action(VALUE_CHANGED),
		onCategoryChange: action(CATEGORY_CHANGED),
		categoryOptions: getCategories("category200"),
		selectedCategoryValue: "category1",
		equalButtonWidth: true,
		categoryOptionsWidth: "360px",
		searchInputWidth: "360px"
	}
};

export const WithAutoFocus = {
	render: Template,

	args: {
		id: "testCategorizedSearch",
		name: "testCategorizedSearch",
		onSearchValueChange: action(VALUE_CHANGED),
		onCategoryChange: action(CATEGORY_CHANGED),
		categoryOptions: getCategories(),
		selectedCategoryValue: "category1",
		equalButtonWidth: true,
		categoryOptionsWidth: "360px",
		searchInputWidth: "360px",
		autoFocus: true
	}
};

export const ClearAllNotification = {
	render: Template,

	args: {
		id: "testCategorizedSearch",
		name: "testCategorizedSearch",
		onSearchValueChange: action(VALUE_CHANGED),
		onCategoryChange: action(CATEGORY_CHANGED),
		categoryOptions: getCategories(),
		selectedCategoryValue: "category1",
		searchValue: "initial value to be cleared",
		equalButtonWidth: true,
		categoryOptionsWidth: "360px",
		searchInputWidth: "360px",
		onClearAll: action("clear all triggered")
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from its root element
		const canvas = within(canvasElement);

		// Find the clear button using role and its accessible name (aria-label)
		const clearButton = canvas.getByRole("button", { name: /clear/i });
		await userEvent.click(clearButton);
	}
};

export const NoCategoryOptions = {
	render: Template,
	args: {
		name: "testCategorizedSearch",
		onSearchValueChange: action(VALUE_CHANGED),
		placeholder: SEARCH_PLACEHOLDER_TEXT
	}
};

export const HorizontalLayout = {
	render: Template,
	args: {
		name: "testCategorizedSearch",
		onSearchValueChange: action(VALUE_CHANGED),
		onCategoryChange: action(CATEGORY_CHANGED),
		categoryOptions: getCategories(),
		selectedCategoryValue: "all",
		placeholder: SEARCH_PLACEHOLDER_TEXT,
		layout: SolaceCategorizedSearchLayout.horizontal
	}
};

export const HorizontalLayoutEqualButtonWidth = {
	render: Template,
	args: {
		name: "testCategorizedSearch",
		onSearchValueChange: action(VALUE_CHANGED),
		onCategoryChange: action(CATEGORY_CHANGED),
		categoryOptions: getCategories(),
		selectedCategoryValue: "all",
		placeholder: SEARCH_PLACEHOLDER_TEXT,
		layout: SolaceCategorizedSearchLayout.horizontal,
		equalButtonWidth: true
	}
};
