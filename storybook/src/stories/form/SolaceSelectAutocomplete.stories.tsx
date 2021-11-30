import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import withMock from "storybook-addon-mock";
import { withState, Store } from "@sambego/storybook-state";

import {
	SolaceSelectAutocomplete,
	SolaceSelectAutocompleteItem,
	getSolaceSelectAutocompleteOptionLabel,
	isSolaceSelectAutocompleteOptionEqual,
	SolaceSelectAutocompleteItemProps
} from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

const store = new Store({
	options: []
});

export default {
	title: "Forms/SolaceSelectAutocomplete",
	component: SolaceSelectAutocomplete,
	parameters: {
		controls: { sort: "alpha" },
		state: {
			store
		}
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
	},
	decorators: [withMock, withState()]
} as ComponentMeta<typeof SolaceSelectAutocomplete>;

const SELECT_OPTIONS: Array<SolaceSelectAutocompleteItemProps> = [
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

const Template: ComponentStory<typeof SolaceSelectAutocomplete> = (args) => <SolaceSelectAutocomplete {...args} />;

async function fetchOptions(searchTerm: string) {
	return fetch("http://someOtherExample.com/filterOptions")
		.then((response) => response.json())
		.then((data) => {
			if (searchTerm) {
				// filter the data
				const filteredData = data.data.filter((option) => option.name.includes(searchTerm));
				return store.set({ options: filteredData });
			} else {
				return store.set({ options: data.data });
			}
		});
}

export const DefaultAutocomplete = Template.bind({});
DefaultAutocomplete.parameters = {
	mockData: [
		{
			url: "http://someOtherExample.com/filterOptions",
			method: "GET",
			status: 200,
			response: {
				data: SELECT_OPTIONS
			},
			delay: 500
		}
	]
};
DefaultAutocomplete.args = {
	onChange: action("callback"),
	itemComponent: SolaceSelectAutocompleteItem,
	optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
	isOptionEqualToValueCallback: isSolaceSelectAutocompleteOptionEqual,
	itemMappingCallback: (option) => option,
	title: "Demo Select",
	id: "demoSelectId",
	name: "demoSelect",
	options: store.get("options") || null,
	fetchOptionsCallback: async (searchTerm: string) => {
		await fetchOptions(searchTerm);
	},
	onCloseCallback: () => store.set({ options: [] })
};

export const StackedLabeleFormat = Template.bind({});
StackedLabeleFormat.parameters = {
	mockData: [
		{
			url: "http://someOtherExample.com/filterOptions",
			method: "GET",
			status: 200,
			response: {
				data: SELECT_OPTIONS
			},
			delay: 500
		}
	]
};
StackedLabeleFormat.args = {
	onChange: action("callback"),
	itemComponent: SolaceSelectAutocompleteItem,
	optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
	itemMappingCallback: (option) => option,
	title: "Demo Select",
	name: "demoSelect",
	label: "Some Label",
	options: store.get("options") || null,
	fetchOptionsCallback: async (searchTerm: string) => {
		await fetchOptions(searchTerm);
	},
	onCloseCallback: () => store.set({ options: [] })
};

export const InlineLabeleFormat = Template.bind({});
InlineLabeleFormat.parameters = {
	mockData: [
		{
			url: "http://someOtherExample.com/filterOptions",
			method: "GET",
			status: 200,
			response: {
				data: SELECT_OPTIONS
			},
			delay: 500
		}
	]
};
InlineLabeleFormat.args = {
	onChange: action("callback"),
	itemComponent: SolaceSelectAutocompleteItem,
	optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
	itemMappingCallback: (option) => option,
	name: "demoSelect",
	title: "Demo Select",
	label: "Some Label",
	options: store.get("options") || null,
	fetchOptionsCallback: async (searchTerm: string) => {
		await fetchOptions(searchTerm);
	},
	onCloseCallback: () => store.set({ options: [] }),
	isInlineLabel: true
};

export const HelperText = Template.bind({});
HelperText.parameters = {
	mockData: [
		{
			url: "http://someOtherExample.com/filterOptions",
			method: "GET",
			status: 200,
			response: {
				data: SELECT_OPTIONS
			},
			delay: 500
		}
	]
};
HelperText.args = {
	onChange: action("callback"),
	itemComponent: SolaceSelectAutocompleteItem,
	optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
	itemMappingCallback: (option) => option,
	name: "demoSelect",
	title: "Demo Select Field",
	label: "Some Label",
	options: store.get("options") || null,
	fetchOptionsCallback: async (searchTerm: string) => {
		await fetchOptions(searchTerm);
	},
	onCloseCallback: () => store.set({ options: [] }),
	helperText: "Some helper text"
};

export const WithErrors = Template.bind({});
WithErrors.parameters = {
	mockData: [
		{
			url: "http://someOtherExample.com/filterOptions",
			method: "GET",
			status: 200,
			response: {
				data: SELECT_OPTIONS
			},
			delay: 500
		}
	]
};
WithErrors.args = {
	onChange: action("callback"),
	itemComponent: SolaceSelectAutocompleteItem,
	optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
	itemMappingCallback: (option) => option,
	name: "demoSelect",
	title: "Demo Select Field",
	label: "Some Label",
	options: store.get("options") || null,
	fetchOptionsCallback: async (searchTerm: string) => {
		await fetchOptions(searchTerm);
	},
	onCloseCallback: () => store.set({ options: [] }),
	helperText: "The text you entered was invalid",
	hasErrors: true
};

export const Required = Template.bind({});
Required.parameters = {
	mockData: [
		{
			url: "http://someOtherExample.com/filterOptions",
			method: "GET",
			status: 200,
			response: {
				data: SELECT_OPTIONS
			},
			delay: 500
		}
	]
};
Required.args = {
	onChange: action("callback"),
	itemComponent: SolaceSelectAutocompleteItem,
	optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
	itemMappingCallback: (option) => option,
	name: "demoSelect",
	title: "Demo Select Field",
	label: "Some Label",
	options: store.get("options") || null,
	fetchOptionsCallback: async (searchTerm: string) => {
		await fetchOptions(searchTerm);
	},
	onCloseCallback: () => store.set({ options: [] }),
	isRequired: true
};

export const Disabled = Template.bind({});
Disabled.parameters = {
	mockData: [
		{
			url: "http://someOtherExample.com/filterOptions",
			method: "GET",
			status: 200,
			response: {
				data: SELECT_OPTIONS
			},
			delay: 500
		}
	]
};
Disabled.args = {
	onChange: action("callback"),
	itemComponent: SolaceSelectAutocompleteItem,
	optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
	isOptionEqualToValueCallback: isSolaceSelectAutocompleteOptionEqual,
	itemMappingCallback: (option) => option,
	name: "demoSelect",
	title: "Demo Select Field",
	label: "Some Label",
	options: store.get("options") || null,
	fetchOptionsCallback: async (searchTerm: string) => {
		await fetchOptions(searchTerm);
	},
	onCloseCallback: () => store.set({ options: [] }),
	value: {
		name: "Option #2",
		value: "option2",
		subText: "Some sub text",
		suplementalText: "opt2"
	},
	isDisabled: true
};

export const ReadOnly = Template.bind({});
ReadOnly.parameters = {
	mockData: [
		{
			url: "http://someOtherExample.com/filterOptions",
			method: "GET",
			status: 200,
			response: {
				data: SELECT_OPTIONS
			},
			delay: 500
		}
	]
};
ReadOnly.args = {
	onChange: action("callback"),
	itemComponent: SolaceSelectAutocompleteItem,
	optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
	itemMappingCallback: (option) => option,
	name: "demoSelect",
	title: "Demo Select Field",
	label: "Some Label",
	options: store.get("options") || null,
	fetchOptionsCallback: async (searchTerm: string) => {
		await fetchOptions(searchTerm);
	},
	onCloseCallback: () => store.set({ options: [] }),
	value: {
		name: "Option #2",
		value: "option2",
		subText: "Some sub text",
		suplementalText: "opt2"
	},
	isReadOnly: true
};
