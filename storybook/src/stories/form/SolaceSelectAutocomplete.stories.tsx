/* eslint-disable sonarjs/no-duplicate-string */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import withMock from "storybook-addon-mock";
import { withState, Store } from "@sambego/storybook-state";

import {
	SolaceSelectAutocomplete,
	SolaceSelectAutocompleteItem,
	getSolaceSelectAutocompleteOptionLabel,
	isSolaceSelectAutocompleteOptionEqual,
	SolaceSelectAutocompleteItemProps,
	SolaceChip
} from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { cloneDeep } from "lodash";

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
		placeholder: {
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
		multiple: {
			control: {
				type: "boolean"
			}
		},
		limitTags: {
			control: {
				type: "number"
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
	onCloseCallback: () => store.set({ options: [] }),
	placeholder: "select an option"
};

export const StackedLabelFormat = Template.bind({});
StackedLabelFormat.parameters = {
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
StackedLabelFormat.args = {
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

export const InlineLabelFormat = Template.bind({});
InlineLabelFormat.parameters = {
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
InlineLabelFormat.args = {
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
	inlineLabel: true
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
	required: true
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
	disabled: true
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
	readOnly: true
};

export const MultipleSelection = Template.bind({});
MultipleSelection.parameters = {
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
MultipleSelection.args = {
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
	value: [],
	multiple: true
};

export const MultipleSelectionWithLimitedTag = Template.bind({});
MultipleSelectionWithLimitedTag.parameters = {
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
MultipleSelectionWithLimitedTag.args = {
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
	value: [],
	multiple: true,
	limitTags: 2
};

const SAMPLE_EVENT_MESHES: Array<SolaceSelectAutocompleteItemProps> = [
	{
		name: "MEM #1",
		value: "mem1",
		supplementalText: "Already added"
	},
	{
		name: "MEM #2",
		value: "mem2",
		supplementalText: ""
	},
	{
		name: "MEM #3",
		value: "mem3",
		supplementalText: ""
	},
	{
		name: "MEM #4",
		value: "mem4",
		supplementalText: "Already added"
	},
	{
		name: "MEM With Long Name #1",
		value: "mem5",
		supplementalText: ""
	},
	{
		name: "MEM With Long Name #2",
		value: "mem6",
		supplementalText: ""
	}
];

export const MultipleWithDisabled = () => {
	const [values, setValues] = React.useState([]);
	const [matchingValues, setMatchingValues] = React.useState([]);

	const handleChange = (evt) => {
		setValues(evt.value);
	};

	const handleFetchOptionsCallback = React.useCallback((searchTerm: string) => {
		if (searchTerm) {
			setMatchingValues(
				SAMPLE_EVENT_MESHES.filter((option) => option["name"].toLowerCase().includes(searchTerm.toLowerCase()))
			);
		} else {
			setMatchingValues(SAMPLE_EVENT_MESHES);
		}
	}, []);

	const handleOptionDisabled = (option) => {
		return option["supplementalText"] === "Already added";
	};

	return (
		<div>
			<SolaceSelectAutocomplete
				name="modeledEventMesh"
				label="Modeled Event Mesh"
				required
				multiple={true}
				value={values}
				options={matchingValues}
				itemComponent={SolaceSelectAutocompleteItem}
				itemMappingCallback={(option) => option}
				optionsLabelCallback={getSolaceSelectAutocompleteOptionLabel}
				onChange={handleChange}
				fetchOptionsCallback={handleFetchOptionsCallback}
				getOptionDisabledCallback={handleOptionDisabled}
			></SolaceSelectAutocomplete>
		</div>
	);
};

const SAMPLE_APPLICATION_DOMAINS: Array<SolaceSelectAutocompleteItemProps> = [
	{
		name: "Domain A",
		value: "domainA"
	},
	{
		name: "Domain B",
		value: "domainB"
	},
	{
		name: "Domain C",
		value: "domainC"
	},
	{
		name: "Domain D",
		value: "domainD"
	},
	{
		name: "Domain With Long Name #1",
		value: "domain1"
	},
	{
		name: "Domain With Long Name #2",
		value: "domain2"
	}
];

export const MultipleWithCustomTagRenderer = () => {
	const [values, setValues] = React.useState([]);
	const [matchingValues, setMatchingValues] = React.useState([]);

	const handleChange = (evt) => {
		setValues(evt.value);
	};

	const handleDelete = (item) => {
		let updatedValues = cloneDeep(values);
		updatedValues = updatedValues.filter((value) => value.value !== item);
		setValues(updatedValues);
	};

	const handleFetchOptionsCallback = React.useCallback(async (searchTerm: string) => {
		if (searchTerm) {
			setMatchingValues(
				SAMPLE_APPLICATION_DOMAINS.filter((option) => option["name"].toLowerCase().includes(searchTerm.toLowerCase()))
			);
		} else {
			setMatchingValues(SAMPLE_APPLICATION_DOMAINS);
		}
	}, []);

	return (
		<div>
			<SolaceSelectAutocomplete
				name="applicationDomain"
				placeholder={values.length ? "" : "Application Domain"}
				multiple={true}
				value={values}
				options={matchingValues}
				itemComponent={SolaceSelectAutocompleteItem}
				itemMappingCallback={(option) => option}
				optionsLabelCallback={getSolaceSelectAutocompleteOptionLabel}
				onChange={handleChange}
				fetchOptionsCallback={handleFetchOptionsCallback}
				renderTags={() => (
					<div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
						<span>Application Domain: </span>

						<span
							style={{
								display: "inline-block",
								backgroundColor: "rgba(0, 0, 0, 0.1)",
								borderRadius: "50%",
								lineHeight: "0px"
							}}
						>
							<span
								style={{
									display: "inline-block",
									paddingBottom: "50%",
									paddingTop: "50%",
									marginLeft: "5px",
									marginRight: "5px",
									textAlign: "center"
								}}
							>
								{values.length}
							</span>
						</span>
					</div>
				)}
			></SolaceSelectAutocomplete>
			<div style={{ marginBlock: "10px", display: "flex", flexWrap: "wrap" }}>
				{values.map((value) => {
					return (
						<div style={{ marginRight: "8px", marginBottom: "8px" }} key={value.value}>
							<SolaceChip label={`Application Domain: ${value.name}`} onDelete={() => handleDelete(value.value)} />
						</div>
					);
				})}
			</div>
		</div>
	);
};
