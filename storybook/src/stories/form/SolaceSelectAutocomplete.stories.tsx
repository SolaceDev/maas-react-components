/*
 *	Related Defect - DATAGO-79485 Look an alternative for @sambego/storybook-state
 **/

/* eslint-disable sonarjs/no-duplicate-string */
import React, { useCallback, useEffect, useState } from "react";
import { Meta } from "@storybook/react";
// import { withState, Store } from "@sambego/storybook-state";

import { within, userEvent } from "@storybook/testing-library";
import {
	SolaceSelectAutocomplete,
	SolaceSelectAutocompleteItem,
	getSolaceSelectAutocompleteOptionLabel,
	// getShowSolaceSelectAutocompleteOptionDivider,
	// isSolaceSelectAutocompleteOptionEqual,
	getSolaceSelectAutocompleteGroupBy,
	SolaceSelectAutocompleteItemProps,
	SolaceAttributeBadge,
	SolaceChip,
	SolaceButton,
	SolaceSelectAutocompleteResponsiveTags
} from "@SolaceDev/maas-react-components";
// import { action } from "@storybook/addon-actions";

// const store = new Store({
// 	options: []
// });

export default {
	title: "Forms/SolaceSelectAutocomplete",
	component: SolaceSelectAutocomplete,
	parameters: {
		controls: { sort: "alpha" }
		// state: {
		// 	store
		// }
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
		width: {
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
		},
		maxHeight: {
			control: {
				type: "text"
			}
		},
		fullWidth: {
			control: {
				type: "boolean"
			}
		},
		minWidth: {
			control: {
				type: "text"
			}
		}
	}
	// decorators: [withState()]
} as Meta<typeof SolaceSelectAutocomplete>;

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
		subText: "Some sub text for option 2, should be taking up the whole 2nd row"
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

// async function fetchOptions(searchTerm: string) {
// 	return fetch("http://someOtherExample.com/filterOptions")
// 		.then((response) => response.json())
// 		.then((data) => {
// 			if (searchTerm) {
// 				// filter the data
// 				const filteredData = data.data.filter((option) => option.name.includes(searchTerm));
// 				return store.set({ options: filteredData });
// 			} else {
// 				return store.set({ options: data.data });
// 			}
// 		});
// }

// export const DefaultAutocomplete = {
// 	parameters: {
// 		mockData: [
// 			{
// 				url: "http://someOtherExample.com/filterOptions",
// 				method: "GET",
// 				status: 200,
// 				response: {
// 					data: SELECT_OPTIONS
// 				},
// 				delay: 500
// 			}
// 		]
// 	},

// 	args: {
// 		onChange: action("callback"),
// 		itemComponent: SolaceSelectAutocompleteItem,
// 		optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
// 		isOptionEqualToValueCallback: isSolaceSelectAutocompleteOptionEqual,
// 		itemMappingCallback: (option) => option,
// 		title: "Demo Select",
// 		id: "demoSelectId",
// 		name: "demoSelect",
// 		options: store.get("options") || null,
// 		fetchOptionsCallback: async (searchTerm: string) => {
// 			await fetchOptions(searchTerm);
// 		},
// 		onCloseCallback: () => store.set({ options: [] }),
// 		placeholder: "select an option"
// 	}
// };

// export const WithDividers = {
// 	parameters: {
// 		mockData: [
// 			{
// 				url: "http://someOtherExample.com/filterOptions",
// 				method: "GET",
// 				status: 200,
// 				response: {
// 					data: SELECT_OPTIONS.map((option) => {
// 						if (option.value === "option1" || option.value === "option3") {
// 							return {
// 								...option,
// 								divider: true
// 							};
// 						}
// 						return option;
// 					})
// 				},
// 				delay: 500
// 			}
// 		]
// 	},

// 	args: {
// 		onChange: action("callback"),
// 		itemComponent: SolaceSelectAutocompleteItem,
// 		optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
// 		getShowOptionDividerCallback: getShowSolaceSelectAutocompleteOptionDivider,
// 		isOptionEqualToValueCallback: isSolaceSelectAutocompleteOptionEqual,
// 		itemMappingCallback: (option) => option,
// 		title: "Demo Select",
// 		id: "demoSelectId",
// 		name: "demoSelect",
// 		options: store.get("options") || null,
// 		fetchOptionsCallback: async (searchTerm: string) => {
// 			await fetchOptions(searchTerm);
// 		},
// 		onCloseCallback: () => store.set({ options: [] }),
// 		placeholder: "select an option"
// 	}
// };

// export const StackedLabelFormat = {
// 	parameters: {
// 		mockData: [
// 			{
// 				url: "http://someOtherExample.com/filterOptions",
// 				method: "GET",
// 				status: 200,
// 				response: {
// 					data: SELECT_OPTIONS
// 				},
// 				delay: 500
// 			}
// 		]
// 	},

// 	args: {
// 		onChange: action("callback"),
// 		itemComponent: SolaceSelectAutocompleteItem,
// 		optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
// 		itemMappingCallback: (option) => option,
// 		title: "Demo Select",
// 		name: "demoSelect",
// 		label: "Some Label",
// 		options: store.get("options") || null,
// 		fetchOptionsCallback: async (searchTerm: string) => {
// 			await fetchOptions(searchTerm);
// 		},
// 		onCloseCallback: () => store.set({ options: [] })
// 	}
// };

// export const StackedLabelFormatWithCustomWidth = {
// 	args: {
// 		onChange: action("callback"),
// 		itemComponent: SolaceSelectAutocompleteItem,
// 		optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
// 		itemMappingCallback: (option) => option,
// 		title: "Demo Select",
// 		name: "demoSelect",
// 		label: "Some Label",
// 		options: store.get("options") || null,
// 		fetchOptionsCallback: async (searchTerm: string) => {
// 			await fetchOptions(searchTerm);
// 		},
// 		onCloseCallback: () => store.set({ options: [] }),
// 		width: "50%"
// 	}
// };

// export const InlineLabelFormat = {
// 	parameters: {
// 		mockData: [
// 			{
// 				url: "http://someOtherExample.com/filterOptions",
// 				method: "GET",
// 				status: 200,
// 				response: {
// 					data: SELECT_OPTIONS
// 				},
// 				delay: 500
// 			}
// 		]
// 	},

// 	args: {
// 		onChange: action("callback"),
// 		itemComponent: SolaceSelectAutocompleteItem,
// 		optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
// 		itemMappingCallback: (option) => option,
// 		name: "demoSelect",
// 		title: "Demo Select",
// 		label: "Some Label",
// 		options: store.get("options") || null,
// 		fetchOptionsCallback: async (searchTerm: string) => {
// 			await fetchOptions(searchTerm);
// 		},
// 		onCloseCallback: () => store.set({ options: [] }),
// 		inlineLabel: true
// 	}
// };

// export const HelperText = {
// 	parameters: {
// 		mockData: [
// 			{
// 				url: "http://someOtherExample.com/filterOptions",
// 				method: "GET",
// 				status: 200,
// 				response: {
// 					data: SELECT_OPTIONS
// 				},
// 				delay: 500
// 			}
// 		]
// 	},

// 	args: {
// 		onChange: action("callback"),
// 		itemComponent: SolaceSelectAutocompleteItem,
// 		optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
// 		itemMappingCallback: (option) => option,
// 		name: "demoSelect",
// 		title: "Demo Select Field",
// 		label: "Some Label",
// 		options: store.get("options") || null,
// 		fetchOptionsCallback: async (searchTerm: string) => {
// 			await fetchOptions(searchTerm);
// 		},
// 		onCloseCallback: () => store.set({ options: [] }),
// 		helperText: "Some helper text"
// 	}
// };

// export const WithErrors = {
// 	parameters: {
// 		mockData: [
// 			{
// 				url: "http://someOtherExample.com/filterOptions",
// 				method: "GET",
// 				status: 200,
// 				response: {
// 					data: SELECT_OPTIONS
// 				},
// 				delay: 500
// 			}
// 		]
// 	},

// 	args: {
// 		onChange: action("callback"),
// 		itemComponent: SolaceSelectAutocompleteItem,
// 		optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
// 		itemMappingCallback: (option) => option,
// 		name: "demoSelect",
// 		title: "Demo Select Field",
// 		label: "Some Label",
// 		options: store.get("options") || null,
// 		fetchOptionsCallback: async (searchTerm: string) => {
// 			await fetchOptions(searchTerm);
// 		},
// 		onCloseCallback: () => store.set({ options: [] }),
// 		helperText: "The text you entered was invalid",
// 		hasErrors: true
// 	}
// };

// export const Required = {
// 	parameters: {
// 		mockData: [
// 			{
// 				url: "http://someOtherExample.com/filterOptions",
// 				method: "GET",
// 				status: 200,
// 				response: {
// 					data: SELECT_OPTIONS
// 				},
// 				delay: 500
// 			}
// 		]
// 	},

// 	args: {
// 		onChange: action("callback"),
// 		itemComponent: SolaceSelectAutocompleteItem,
// 		optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
// 		itemMappingCallback: (option) => option,
// 		name: "demoSelect",
// 		title: "Demo Select Field",
// 		label: "Some Label",
// 		options: store.get("options") || null,
// 		fetchOptionsCallback: async (searchTerm: string) => {
// 			await fetchOptions(searchTerm);
// 		},
// 		onCloseCallback: () => store.set({ options: [] }),
// 		required: true
// 	}
// };

// export const Disabled = {
// 	parameters: {
// 		mockData: [
// 			{
// 				url: "http://someOtherExample.com/filterOptions",
// 				method: "GET",
// 				status: 200,
// 				response: {
// 					data: SELECT_OPTIONS
// 				},
// 				delay: 500
// 			}
// 		]
// 	},

// 	args: {
// 		onChange: action("callback"),
// 		itemComponent: SolaceSelectAutocompleteItem,
// 		optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
// 		isOptionEqualToValueCallback: isSolaceSelectAutocompleteOptionEqual,
// 		itemMappingCallback: (option) => option,
// 		name: "demoSelect",
// 		title: "Demo Select Field",
// 		label: "Some Label",
// 		options: store.get("options") || null,
// 		fetchOptionsCallback: async (searchTerm: string) => {
// 			await fetchOptions(searchTerm);
// 		},
// 		onCloseCallback: () => store.set({ options: [] }),
// 		value: {
// 			name: "Option #2",
// 			value: "option2",
// 			subText: "Some sub text",
// 			supplementalText: "opt2"
// 		},
// 		disabled: true
// 	}
// };

// export const ReadOnly = {
// 	parameters: {
// 		mockData: [
// 			{
// 				url: "http://someOtherExample.com/filterOptions",
// 				method: "GET",
// 				status: 200,
// 				response: {
// 					data: SELECT_OPTIONS
// 				},
// 				delay: 500
// 			}
// 		]
// 	},

// 	args: {
// 		onChange: action("callback"),
// 		itemComponent: SolaceSelectAutocompleteItem,
// 		optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
// 		itemMappingCallback: (option) => option,
// 		name: "demoSelect",
// 		title: "Demo Select Field",
// 		label: "Some Label",
// 		options: store.get("options") || null,
// 		fetchOptionsCallback: async (searchTerm: string) => {
// 			await fetchOptions(searchTerm);
// 		},
// 		onCloseCallback: () => store.set({ options: [] }),
// 		value: {
// 			name: "Option #2",
// 			value: "option2",
// 			subText: "Some sub text",
// 			supplementalText: "opt2"
// 		},
// 		readOnly: true
// 	}
// };

// export const MultipleSelection = {
// 	parameters: {
// 		mockData: [
// 			{
// 				url: "http://someOtherExample.com/filterOptions",
// 				method: "GET",
// 				status: 200,
// 				response: {
// 					data: SELECT_OPTIONS
// 				},
// 				delay: 500
// 			}
// 		]
// 	},

// 	args: {
// 		onChange: action("callback"),
// 		itemComponent: SolaceSelectAutocompleteItem,
// 		optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
// 		itemMappingCallback: (option) => option,
// 		name: "demoSelect",
// 		title: "Demo Select Field",
// 		label: "Some Label",
// 		options: store.get("options") || null,
// 		fetchOptionsCallback: async (searchTerm: string) => {
// 			await fetchOptions(searchTerm);
// 		},
// 		onCloseCallback: () => store.set({ options: [] }),
// 		value: [],
// 		multiple: true
// 	}
// };

// export const MultipleSelectionWithLimitedTag = {
// 	parameters: {
// 		mockData: [
// 			{
// 				url: "http://someOtherExample.com/filterOptions",
// 				method: "GET",
// 				status: 200,
// 				response: {
// 					data: SELECT_OPTIONS
// 				},
// 				delay: 500
// 			}
// 		]
// 	},

// 	args: {
// 		onChange: action("callback"),
// 		itemComponent: SolaceSelectAutocompleteItem,
// 		optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
// 		itemMappingCallback: (option) => option,
// 		name: "demoSelect",
// 		title: "Demo Select Field",
// 		label: "Some Label",
// 		options: store.get("options") || null,
// 		fetchOptionsCallback: async (searchTerm: string) => {
// 			await fetchOptions(searchTerm);
// 		},
// 		onCloseCallback: () => store.set({ options: [] }),
// 		value: [],
// 		multiple: true,
// 		limitTags: 2
// 	}
// };

// export const MultipleSelectionWithCloseOnSelect = {
// 	parameters: {
// 		mockData: [
// 			{
// 				url: "http://someOtherExample.com/filterOptions",
// 				method: "GET",
// 				status: 200,
// 				response: {
// 					data: SELECT_OPTIONS
// 				},
// 				delay: 500
// 			}
// 		]
// 	},

// 	args: {
// 		onChange: action("callback"),
// 		itemComponent: SolaceSelectAutocompleteItem,
// 		optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
// 		itemMappingCallback: (option) => option,
// 		name: "demoSelect",
// 		title: "Demo Select Field",
// 		label: "Some Label",
// 		options: store.get("options") || null,
// 		fetchOptionsCallback: async (searchTerm: string) => {
// 			await fetchOptions(searchTerm);
// 		},
// 		onCloseCallback: () => store.set({ options: [] }),
// 		value: [],
// 		multiple: true,
// 		disableCloseOnSelect: false
// 	}
// };

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
	const [values, setValues] = useState([]);
	const [matchingValues, setMatchingValues] = useState<SolaceSelectAutocompleteItemProps[]>([]);

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

const SELECT_OPTIONS_WITH_CATEGORY_HEADING: Array<SolaceSelectAutocompleteItemProps> = [
	{
		name: "Option #1",
		value: "option1",
		categoryHeading: "Shared"
	},
	{
		name: "Option #2",
		value: "option2",
		categoryHeading: "Shared"
	},
	{
		name: "Option #3",
		value: "option3",
		categoryHeading: "Non-Shared"
	},
	{
		name: "Option #4",
		value: "option4",
		categoryHeading: "Non-Shared"
	}
];

const SelectionWithHeadingTemplate = ({
	disabledItems = false,
	showGroupDivider = false
}: {
	disabledItems: boolean;
	showGroupDivider: boolean;
}): JSX.Element => {
	const [values, setValues] = useState([]);
	const [matchingValues, setMatchingValues] = useState<SolaceSelectAutocompleteItemProps[]>([]);

	const handleChange = (evt) => {
		setValues(evt.value);
	};

	const handleFetchOptionsCallback = React.useCallback((searchTerm: string) => {
		if (searchTerm) {
			setMatchingValues(
				SELECT_OPTIONS_WITH_CATEGORY_HEADING.filter((option) =>
					option["name"].toLowerCase().includes(searchTerm.toLowerCase())
				)
			);
		} else {
			setMatchingValues(SELECT_OPTIONS_WITH_CATEGORY_HEADING);
		}
	}, []);

	const handleOptionDisabled = (option) => {
		return option.categoryHeading === "Non-Shared";
	};

	return (
		<div>
			<SolaceSelectAutocomplete
				name="demoSelect"
				multiple={true}
				value={values}
				options={matchingValues}
				itemComponent={SolaceSelectAutocompleteItem}
				itemMappingCallback={(option) => option}
				optionsLabelCallback={getSolaceSelectAutocompleteOptionLabel}
				onChange={handleChange}
				fetchOptionsCallback={handleFetchOptionsCallback}
				getOptionDisabledCallback={disabledItems ? handleOptionDisabled : undefined}
				groupByCallback={getSolaceSelectAutocompleteGroupBy}
				showGroupDivider={showGroupDivider}
			></SolaceSelectAutocomplete>
		</div>
	);
};

export const SelectionWithHeading = {
	render: SelectionWithHeadingTemplate,

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { delay: 5000 }
	},

	args: {},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByRole("combobox"));
	}
};

export const SelectionWithHeadingAndDisabledItems = {
	render: SelectionWithHeadingTemplate,

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { delay: 5000 }
	},

	args: {
		disabledItems: true
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByRole("combobox"));
	}
};

export const SelectionWithHeadingWithDividers = {
	render: SelectionWithHeadingTemplate,

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { delay: 5000 }
	},

	args: {
		showGroupDivider: true
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByRole("combobox"));
	}
};

export const SelectionWithHeadingWithDividersAndDisabledItems = {
	render: SelectionWithHeadingTemplate,

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { delay: 5000 }
	},

	args: {
		disabledItems: true,
		showGroupDivider: true
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByRole("combobox"));
	}
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
	const [values, setValues] = useState<SolaceSelectAutocompleteItemProps[]>([
		SAMPLE_APPLICATION_DOMAINS[0],
		SAMPLE_APPLICATION_DOMAINS[2]
	]);
	const [matchingValues, setMatchingValues] = useState<SolaceSelectAutocompleteItemProps[]>([]);

	const handleChange = (evt) => {
		setValues(evt.value);
	};

	const handleDelete = (item) => {
		setValues((prevValues) => {
			return prevValues.filter((value) => value.value !== item);
		});
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
			<div style={{ marginBlock: "24px", display: "flex", flexWrap: "wrap" }}>
				{values.map((value) => {
					return (
						<div style={{ marginRight: "8px", marginBottom: "8px" }} key={value.value}>
							<SolaceAttributeBadge
								label={`Application Domain: ${value.name}`}
								onDelete={() => handleDelete(value.value)}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const MultipleWithResponsiveTagRenderer = () => {
	const [values, setValues] = useState<SolaceSelectAutocompleteItemProps[]>(SAMPLE_APPLICATION_DOMAINS.slice(1));
	const [matchingValues, setMatchingValues] = useState<SolaceSelectAutocompleteItemProps[]>([]);
	const [selectedTags, setSelectedTags] = useState<{ id: string; label: string }[]>([]);

	const handleChange = (evt) => {
		setValues(evt.value);
	};

	// eslint-disable-next-line sonarjs/no-identical-functions
	const handleDelete = useCallback((item) => {
		setValues((prevValues) => {
			return prevValues.filter((value) => value.value !== item);
		});
	}, []);

	const handleDeleteTag = useCallback(
		(id: string) => {
			setValues((prevValues) => {
				return prevValues.filter((preValue) => preValue.value !== id);
			});
		},
		[setValues]
	);

	useEffect(() => {
		const tags = values?.map((selectedItemValue) => {
			return {
				id: selectedItemValue.value,
				label: selectedItemValue.name
			};
		});

		setSelectedTags(tags);
	}, [values]);

	// eslint-disable-next-line sonarjs/no-identical-functions
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
		<div style={{ width: "500px", height: "32px" }}>
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
					<>
						{values && values.length > 0 && (
							<SolaceSelectAutocompleteResponsiveTags
								containerWidth={500}
								tags={selectedTags}
								tagMaxWidth={"300px"}
								onDelete={handleDeleteTag}
								overflowIndicatorLabel={"Filters"}
								overflowIndicatorLabelSingular={"Filter"}
								dataQa={"applicationDomainSelect-tags"}
							/>
						)}
					</>
				)}
			></SolaceSelectAutocomplete>
			<div style={{ marginBlock: "24px", display: "flex", flexWrap: "wrap" }}>
				{values.map((value) => {
					return (
						<div style={{ marginRight: "8px", marginBottom: "8px" }} key={value.value}>
							<SolaceChip label={`${value.name}`} onDelete={() => handleDelete(value.value)} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const OpenDropDownOnButtonClick = () => {
	const [values, setValues] = useState([]);
	const [matchingValues, setMatchingValues] = useState<SolaceSelectAutocompleteItemProps[]>([]);
	let demoInputRef;

	const handleChange = (evt) => {
		setValues(evt.value);
	};

	const handleFetchOptionsCallback = React.useCallback((searchTerm: string) => {
		if (searchTerm) {
			setMatchingValues(
				SELECT_OPTIONS.filter((option) => option["name"].toLowerCase().includes(searchTerm.toLowerCase()))
			);
		} else {
			setMatchingValues(SELECT_OPTIONS);
		}
	}, []);

	const handleOptionDisabled = (option) => {
		return option["supplementalText"] === "Already added";
	};

	return (
		<div style={{ display: "flex", columnGap: "10px", alignItems: "end" }}>
			<SolaceSelectAutocomplete
				name="demoOptions"
				label="Demo Select Options"
				multiple={true}
				value={values}
				options={matchingValues}
				itemComponent={SolaceSelectAutocompleteItem}
				itemMappingCallback={(option) => option}
				optionsLabelCallback={getSolaceSelectAutocompleteOptionLabel}
				onChange={handleChange}
				fetchOptionsCallback={handleFetchOptionsCallback}
				getOptionDisabledCallback={handleOptionDisabled}
				inputRef={(input) => {
					demoInputRef = input;
				}}
				openOnFocus
				width="500px"
			></SolaceSelectAutocomplete>
			<SolaceButton
				variant="outline"
				onClick={() => {
					demoInputRef.focus();
				}}
			>
				open the dropdown
			</SolaceButton>
		</div>
	);
};

// export const CustomHeight = {
// 	parameters: {
// 		// Delay snapshot 5 seconds until all interactions are done
// 		chromatic: { delay: 5000 },
// 		mockData: [
// 			{
// 				url: "http://someOtherExample.com/filterOptions",
// 				method: "GET",
// 				status: 200,
// 				response: {
// 					data: SELECT_OPTIONS
// 				},
// 				delay: 500
// 			}
// 		]
// 	},

// 	args: {
// 		maxHeight: "7.4rem",
// 		onChange: action("callback"),
// 		itemComponent: SolaceSelectAutocompleteItem,
// 		optionsLabelCallback: getSolaceSelectAutocompleteOptionLabel,
// 		itemMappingCallback: (option) => option,
// 		title: "Demo Select",
// 		name: "demoSelect",
// 		label: "Some Label",
// 		dataQa: "customHeight",
// 		options: store.get("options") || null,
// 		fetchOptionsCallback: async (searchTerm: string) => {
// 			await fetchOptions(searchTerm);
// 		},
// 		onCloseCallback: () => store.set({ options: [] })
// 	},

// 	play: async ({ canvasElement }) => {
// 		// Starts querying the component from it's root element
// 		const canvas = within(canvasElement);
// 		await userEvent.click(await canvas.findByRole("combobox"));
// 	}
// };
