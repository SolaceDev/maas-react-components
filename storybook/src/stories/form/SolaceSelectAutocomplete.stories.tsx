/*
 *	Related Defect - DATAGO-79485 Look an alternative for @sambego/storybook-state
 **/

/* eslint-disable sonarjs/no-duplicate-string */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Meta } from "@storybook/react";
// import { withState, Store } from "@sambego/storybook-state";

import { within, userEvent } from "@storybook/testing-library";
import {
	SolaceSelectAutocomplete,
	SolaceSelectAutocompleteItem,
	getSolaceSelectAutocompleteOptionLabel,
	isSolaceSelectAutocompleteOptionEqual,
	getSolaceSelectAutocompleteGroupBy,
	SolaceSelectAutocompleteItemProps,
	SolaceChip,
	SolaceButton,
	SolaceSelectAutocompleteResponsiveTags,
	getShowSolaceSelectAutocompleteOptionDivider
} from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

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
		},
		clearSearchOnSelect: {
			control: {
				type: "boolean"
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

function fetchOptions(
	searchTerm: string,
	dataSet: Array<SolaceSelectAutocompleteItemProps>,
	delay: number,
	withDivider?: boolean
): Promise<Array<SolaceSelectAutocompleteItemProps>> {
	const processedData = dataSet.map((option) => {
		if (withDivider && (option.value === "option1" || option.value === "option2")) {
			return {
				...option,
				divider: true
			};
		}
		return option;
	});
	return new Promise((resolve) => {
		setTimeout(() => {
			if (searchTerm) {
				// filter the data
				const filteredData = processedData.filter((option) =>
					option.name.toLowerCase().includes(searchTerm.toLowerCase())
				);
				resolve(filteredData);
			} else {
				resolve(processedData);
			}
		}, delay);
	});
}

function getLongLabel(option: SolaceSelectAutocompleteItemProps) {
	return option.name + " with Long Name to Check Responsiveness Works Properly";
}

const DefaultSelectionTemplate = ({
	multiple = false,
	readOnly = false,
	required = false,
	disabled = false,
	label,
	inlineLabel = false,
	width,
	placeholder,
	helperText,
	hasErrors,
	value,
	limitTags,
	disableCloseOnSelect,
	clearSearchOnSelect,
	maxHeight,
	getOptionValidationErrorCallback,
	// storybook specific
	disabledItems = false,
	withDividers = false,
	longLabel = false
}: {
	// props of component
	multiple?: boolean;
	readOnly?: boolean;
	required?: boolean;
	disabled?: boolean;
	label?: string;
	inlineLabel?: boolean;
	width?: string;
	placeholder?: string;
	helperText?: string;
	hasErrors?: boolean;
	value?: SolaceSelectAutocompleteItemProps | Array<SolaceSelectAutocompleteItemProps>;
	limitTags?: number;
	disableCloseOnSelect?: boolean;
	clearSearchOnSelect?: boolean;
	maxHeight?: string;
	getOptionValidationErrorCallback?: ((option: SolaceSelectAutocompleteItemProps) => string | JSX.Element) | undefined;
	// storybook specific
	disabledItems?: boolean;
	withDividers?: boolean;
	longLabel?: boolean;
}): JSX.Element => {
	const [matchingValues, setMatchingValues] = useState<SolaceSelectAutocompleteItemProps[]>([]);

	const handleFetchOptionsCallback = useCallback(
		(searchTerm: string) => {
			fetchOptions(
				searchTerm,
				SELECT_OPTIONS.map((option) => {
					return {
						...option,
						name:
							longLabel && (option.value === "option2" || option.value === "option4")
								? getLongLabel(option)
								: option.name
					};
				}),
				300,
				withDividers
			).then((data) => {
				setMatchingValues(data);
			});
		},
		[withDividers, longLabel]
	);

	const handleOptionDisabled = (option) => {
		return option.value === SELECT_OPTIONS[2].value || option.value === SELECT_OPTIONS[3].value;
	};

	return (
		<div>
			<SolaceSelectAutocomplete
				onChange={action("callback")}
				multiple={multiple}
				title="Demo Select"
				id="demoSelectId"
				name="demoSelect"
				label={label}
				options={matchingValues}
				itemComponent={SolaceSelectAutocompleteItem}
				itemMappingCallback={(option) => option}
				optionsLabelCallback={getSolaceSelectAutocompleteOptionLabel}
				isOptionEqualToValueCallback={isSolaceSelectAutocompleteOptionEqual}
				fetchOptionsCallback={handleFetchOptionsCallback}
				getOptionDisabledCallback={disabledItems ? handleOptionDisabled : undefined}
				getShowOptionDividerCallback={withDividers ? getShowSolaceSelectAutocompleteOptionDivider : undefined}
				getOptionValidationErrorCallback={getOptionValidationErrorCallback}
				width={width}
				placeholder={placeholder}
				readOnly={readOnly}
				disabled={disabled}
				required={required}
				inlineLabel={inlineLabel}
				onCloseCallback={() => setMatchingValues([])}
				value={value}
				helperText={helperText}
				hasErrors={hasErrors}
				limitTags={limitTags}
				getLimitTagsText={(limit) => `+${limit} more`}
				disableCloseOnSelect={disableCloseOnSelect}
				clearSearchOnSelect={clearSearchOnSelect}
				maxHeight={maxHeight}
			></SolaceSelectAutocomplete>
		</div>
	);
};

export const DefaultAutocomplete = {
	render: DefaultSelectionTemplate,

	args: {}
};

export const WithDividers = {
	render: DefaultSelectionTemplate,

	args: {
		withDividers: true
	}
};

export const StackedLabelFormat = {
	render: DefaultSelectionTemplate,

	args: {
		label: "Some Label"
	}
};

export const StackedLabelFormatWithCustomWidth = {
	render: DefaultSelectionTemplate,

	args: {
		label: "Some Label",
		width: "50%",
		longLabel: true
	}
};

export const InlineLabelFormat = {
	render: DefaultSelectionTemplate,

	args: {
		label: "Some Label",
		inlineLabel: true
	}
};

export const HelperText = {
	render: DefaultSelectionTemplate,

	args: {
		helperText: "Some helper text"
	}
};

export const WithErrors = {
	render: DefaultSelectionTemplate,

	args: {
		helperText: "The text you entered was invalid",
		hasErrors: true
	}
};

export const Required = {
	render: DefaultSelectionTemplate,

	args: {
		label: "Some Label",
		required: true
	}
};

export const Disabled = {
	render: DefaultSelectionTemplate,

	args: {
		label: "Some Label",
		disabled: true,
		value: SELECT_OPTIONS[1]
	}
};

export const ReadOnly = {
	render: DefaultSelectionTemplate,

	args: {
		label: "Some Label",
		readOnly: true,
		value: SELECT_OPTIONS[1]
	}
};

export const WithDisabledItems = {
	render: DefaultSelectionTemplate,

	args: {
		disabledItems: true
	}
};

export const CustomHeight = {
	render: DefaultSelectionTemplate,

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { delay: 5000 }
	},

	args: {
		label: "Some Label",
		maxHeight: "7.4rem"
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByRole("combobox"));
	}
};

export const MultipleSelection = {
	render: DefaultSelectionTemplate,

	args: {
		label: "Some Label",
		multiple: true,
		value: []
	}
};

export const MultipleSelectionWithLimitedTag = {
	render: DefaultSelectionTemplate,

	args: {
		label: "Some Label",
		multiple: true,
		value: [],
		limitTags: 2
	}
};

export const MultipleSelectionWithLongLabel = {
	render: DefaultSelectionTemplate,

	args: {
		label: "Some Label",
		multiple: true,
		value: [],
		width: "50%",
		longLabel: true
	}
};

export const MultipleSelectionWithCloseOnSelect = {
	render: DefaultSelectionTemplate,

	args: {
		label: "Some Label",
		multiple: true,
		value: [],
		disableCloseOnSelect: false
	}
};

export const MultipleSelectionWithClearSearchOnSelect = {
	render: DefaultSelectionTemplate,

	args: {
		label: "Some Label",
		multiple: true,
		value: [],
		clearSearchOnSelect: true
	}
};

export const MultiSelectionDisabled = {
	render: DefaultSelectionTemplate,

	args: {
		label: "Some Label",
		multiple: true,
		disabled: true,
		value: [SELECT_OPTIONS[0], SELECT_OPTIONS[2]]
	}
};

export const MultiSelectionReadOnly = {
	render: DefaultSelectionTemplate,

	args: {
		label: "Some Label",
		multiple: true,
		readOnly: true,
		longLabel: true,
		value: [SELECT_OPTIONS[0], { ...SELECT_OPTIONS[3], name: getLongLabel(SELECT_OPTIONS[3]) }]
	}
};

export const MultiSelectionWithErrors = {
	render: DefaultSelectionTemplate,

	args: {
		label: "Some Label",
		multiple: true,
		helperText: "More than one values have errors. Hover on the values to see errors.",
		hasErrors: true,
		longLabel: true,
		getOptionValidationErrorCallback: (option: SolaceSelectAutocompleteItemProps) => {
			if (option.value === "option1") {
				return "Invalid characters. Enter only alphanumeric characters, dashes and underscores.";
			} else if (option.value === "option4") {
				return "Exceeds limit. Enter a value under 100 characters";
			}
		},
		value: [SELECT_OPTIONS[0], { ...SELECT_OPTIONS[3], name: getLongLabel(SELECT_OPTIONS[3]) }, SELECT_OPTIONS[2]]
	}
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

export const MultiSelectionWithDisabledItems = () => {
	const [values, setValues] = useState([]);
	const [matchingValues, setMatchingValues] = useState<SolaceSelectAutocompleteItemProps[]>([]);

	const handleChange = (evt) => {
		setValues(evt.value);
	};

	const handleFetchOptionsCallback = useCallback((searchTerm: string) => {
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
				isOptionEqualToValueCallback={isSolaceSelectAutocompleteOptionEqual}
				onChange={handleChange}
				fetchOptionsCallback={handleFetchOptionsCallback}
				getOptionDisabledCallback={handleOptionDisabled}
			></SolaceSelectAutocomplete>
		</div>
	);
};

const INPUT_VALUE_REGEX = /^[A-Za-z0-9-_./@()'–# ]*$/;
const MAX_SELECTED_VAlUES = 5;

const MultiSelectionWithCreateNewTemplate = ({
	clearSearchWhenSelectNew = false,
	initialValues = [],
	validateInput = false
}: {
	clearSearchWhenSelectNew: boolean;
	initialValues: SolaceSelectAutocompleteItemProps[];
	validateInput: boolean;
}) => {
	const [values, setValues] = useState<SolaceSelectAutocompleteItemProps[]>([]);
	const [matchingValues, setMatchingValues] = useState<SolaceSelectAutocompleteItemProps[]>([]);
	const [availableValues, setAvailableValues] = useState<SolaceSelectAutocompleteItemProps[]>(initialValues.slice());
	const [hasErrors, setHasErrors] = useState<boolean>(false);
	const [helperText, setHelperText] = useState("");

	const validateInputValue = useCallback((value) => {
		let errorMsg = "";
		const charLimit = 100;

		if (value.length > charLimit) {
			errorMsg = `Exceeds limit. Enter a value with no more than ${charLimit} characters.`;
		} else if (!value.match(INPUT_VALUE_REGEX)) {
			errorMsg =
				"Invalid characters. Enter only alphanumeric characters, spaces and the following characters: . - – _ @ / ( ) #";
		}

		return errorMsg;
	}, []);

	const handleChange = (evt) => {
		const selectedValues: SolaceSelectAutocompleteItemProps[] = [];
		const newValues: SolaceSelectAutocompleteItemProps[] = [];
		evt.value.forEach((value) => {
			if (value.isNew) {
				const newValue: SolaceSelectAutocompleteItemProps = { ...value, subText: undefined, isNew: false };
				newValues.push(newValue);
				selectedValues.push(newValue);
			} else {
				selectedValues.push(value);
			}
		});

		setValues(selectedValues);

		if (newValues.length > 0) {
			setAvailableValues((prevValues) => [...prevValues, ...newValues].sort((a, b) => a.name.localeCompare(b.name)));
			if (!clearSearchWhenSelectNew) {
				// update matching options manually
				setMatchingValues((prevValues) => {
					return prevValues
						.map((value) => (value.isNew ? { ...value, subText: undefined, isNew: false } : value))
						.sort((a, b) => a.name.localeCompare(b.name));
				});
			}
		}

		if (validateInput && selectedValues.length > MAX_SELECTED_VAlUES) {
			setHasErrors(true);
			setHelperText(`Maximum number of values allowed is ${MAX_SELECTED_VAlUES}`);
		} else {
			setHasErrors(false);
			setHelperText("");
		}
	};

	const shouldClearSearchOnSelectCallback = useCallback((value: SolaceSelectAutocompleteItemProps) => {
		return !!value?.isNew;
	}, []);

	const handleFetchOptionsCallback = useCallback(
		(searchTerm: string) => {
			if (searchTerm) {
				const matches = availableValues.filter((option) =>
					option["name"].toLowerCase().includes(searchTerm.toLowerCase())
				);
				const exactMatch = matches.find((option) => option["name"] === searchTerm);
				if (!exactMatch) {
					const toCreate = { name: searchTerm, value: searchTerm, subText: "Create new value", isNew: true };
					setMatchingValues([...matches, toCreate]);
				} else {
					setMatchingValues(matches);
				}
			} else {
				setMatchingValues(availableValues.slice());
			}
		},
		[availableValues]
	);

	return (
		<div>
			<SolaceSelectAutocomplete
				name="customAttributeValues"
				label="Custom Attribute Values"
				multiple={true}
				value={values}
				options={matchingValues}
				itemComponent={SolaceSelectAutocompleteItem}
				itemMappingCallback={(option) => option}
				optionsLabelCallback={getSolaceSelectAutocompleteOptionLabel}
				isOptionEqualToValueCallback={isSolaceSelectAutocompleteOptionEqual}
				onChange={handleChange}
				fetchOptionsCallback={handleFetchOptionsCallback}
				shouldClearSearchOnSelectCallback={clearSearchWhenSelectNew ? shouldClearSearchOnSelectCallback : undefined}
				maxHeight="400px"
				validateInputCallback={validateInput ? validateInputValue : undefined}
				hasErrors={hasErrors}
				helperText={helperText}
			></SolaceSelectAutocomplete>
		</div>
	);
};

export const MultiSelectionWithCreateNewAndClearSearchWhenSelectNew = {
	render: MultiSelectionWithCreateNewTemplate,

	args: {
		clearSearchWhenSelectNew: true
	}
};

export const MultiSelectionWithInitialValueCreateNewAndClearSearchWhenSelectNew = {
	render: MultiSelectionWithCreateNewTemplate,

	args: {
		clearSearchWhenSelectNew: true,
		initialValues: SELECT_OPTIONS
	}
};

export const MultiSelectionWithInitialValueCreateNewAndValidateInputAndClearSearchWhenSelectNew = {
	render: MultiSelectionWithCreateNewTemplate,

	args: {
		clearSearchWhenSelectNew: true,
		initialValues: SELECT_OPTIONS,
		validateInput: true
	}
};

export const MultiSelectionWithCreateNewAndNotClearSearchWhenSelectNew = {
	render: MultiSelectionWithCreateNewTemplate,

	args: {
		clearSearchWhenSelectNew: false
	}
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

const MultiSelectionWithHeadingTemplate = ({
	label,
	disabled = false,
	readOnly = false,
	value,
	disabledItems = false,
	showGroupDivider = false
}: {
	label?: string;
	disabled?: boolean;
	readOnly?: boolean;
	value?: Array<SolaceSelectAutocompleteItemProps>;
	disabledItems?: boolean;
	showGroupDivider?: boolean;
}): JSX.Element => {
	const [values, setValues] = useState(value ?? []);
	const [matchingValues, setMatchingValues] = useState<SolaceSelectAutocompleteItemProps[]>([]);

	const handleChange = (evt) => {
		setValues(evt.value);
	};

	const handleFetchOptionsCallback = useCallback((searchTerm: string) => {
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
				label={label}
				multiple={true}
				value={values}
				options={matchingValues}
				itemComponent={SolaceSelectAutocompleteItem}
				itemMappingCallback={(option) => option}
				optionsLabelCallback={getSolaceSelectAutocompleteOptionLabel}
				isOptionEqualToValueCallback={isSolaceSelectAutocompleteOptionEqual}
				onChange={handleChange}
				fetchOptionsCallback={handleFetchOptionsCallback}
				getOptionDisabledCallback={disabledItems ? handleOptionDisabled : undefined}
				groupByCallback={getSolaceSelectAutocompleteGroupBy}
				showGroupDivider={showGroupDivider}
				disabled={disabled}
				readOnly={readOnly}
			></SolaceSelectAutocomplete>
		</div>
	);
};

export const MultiSelectionWithHeading = {
	render: MultiSelectionWithHeadingTemplate,

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

export const MultiSelectionWithHeadingAndDisabledItems = {
	render: MultiSelectionWithHeadingTemplate,

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

export const MultiSelectionWithHeadingWithDividers = {
	render: MultiSelectionWithHeadingTemplate,

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

export const MultiSelectionWithHeadingWithDividersAndDisabledItems = {
	render: MultiSelectionWithHeadingTemplate,

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
		name: "Domain With Long Long Long Long Name #1",
		value: "domain1"
	},
	{
		name: "Domain With Long Long Long Long Name #2",
		value: "domain2"
	}
];

export const MultiSelectionWithCustomTagRenderer = () => {
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

	const handleFetchOptionsCallback = useCallback((searchTerm: string) => {
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
				isOptionEqualToValueCallback={isSolaceSelectAutocompleteOptionEqual}
				onChange={handleChange}
				fetchOptionsCallback={handleFetchOptionsCallback}
				renderTags={() => (
					<div style={{ display: "flex", alignItems: "center", gap: "4px", paddingRight: "8px" }}>
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
							<SolaceChip
								clickable
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

export const MultiSelectionWithResponsiveTagRenderer = ({ disabled = false, readOnly = false }) => {
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
	const handleFetchOptionsCallback = useCallback((searchTerm: string) => {
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
				disabled={disabled}
				readOnly={readOnly}
				multiple={true}
				value={values}
				options={matchingValues}
				itemComponent={SolaceSelectAutocompleteItem}
				itemMappingCallback={(option) => option}
				optionsLabelCallback={getSolaceSelectAutocompleteOptionLabel}
				isOptionEqualToValueCallback={isSolaceSelectAutocompleteOptionEqual}
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
								disabled={disabled}
								readOnly={readOnly}
							/>
						)}
					</>
				)}
			></SolaceSelectAutocomplete>
			<div style={{ marginBlock: "24px", display: "flex", flexWrap: "wrap" }}>
				{values.map((value) => {
					return (
						<div style={{ marginRight: "8px", marginBottom: "8px" }} key={value.value}>
							<SolaceChip clickable label={`${value.name}`} onDelete={() => handleDelete(value.value)} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const MultiSelectionWithResponsiveTagRendererDisabled = {
	render: MultiSelectionWithResponsiveTagRenderer,

	args: {
		disabled: true
	}
};

export const MultiSelectionWithResponsiveTagRendererReadOnly = {
	render: MultiSelectionWithResponsiveTagRenderer,

	args: {
		readOnly: true
	}
};

export const OpenDropDownOnButtonClick = () => {
	const [values, setValues] = useState([]);
	const [matchingValues, setMatchingValues] = useState<SolaceSelectAutocompleteItemProps[]>([]);
	const demoInputRef = useRef<HTMLInputElement>();

	const handleChange = (evt) => {
		setValues(evt.value);
	};

	const handleFetchOptionsCallback = useCallback((searchTerm: string) => {
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
				isOptionEqualToValueCallback={isSolaceSelectAutocompleteOptionEqual}
				onChange={handleChange}
				fetchOptionsCallback={handleFetchOptionsCallback}
				getOptionDisabledCallback={handleOptionDisabled}
				inputRef={(input) => {
					demoInputRef.current = input;
				}}
				openOnFocus
				width="500px"
			></SolaceSelectAutocomplete>
			<SolaceButton
				variant="outline"
				onClick={() => {
					demoInputRef.current?.focus();
				}}
			>
				open the dropdown
			</SolaceButton>
		</div>
	);
};
