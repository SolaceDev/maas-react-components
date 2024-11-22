/* eslint-disable sonarjs/no-duplicate-string */
import React, { useCallback, useRef, useState, useEffect } from "react";
import { Meta, Decorator } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
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
	getShowSolaceSelectAutocompleteOptionDivider,
	styled
} from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

// Create a decorator to increase the snapshot window size
const withSnapshotContainer: Decorator = (Story) => {
	return (
		<div id="snapshot" style={{ width: "auto", height: "500px", padding: "10px 35px" }}>
			<Story />
		</div>
	);
};

export default {
	title: "Forms/SolaceSelectAutocomplete",
	component: SolaceSelectAutocomplete,
	parameters: {
		controls: { sort: "alpha" },
		chromatic: { delay: 500 }
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
		disableCloseOnSelect: {
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
		},
		tagMaxWidth: {
			control: {
				type: "text"
			}
		}
	},
	decorators: [withSnapshotContainer]
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
	tagMaxWidth,
	minWidth,
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
	tagMaxWidth?: string;
	minWidth?: string;
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
				tagMaxWidth={tagMaxWidth}
				minWidth={minWidth}
			></SolaceSelectAutocomplete>
		</div>
	);
};

export const DefaultAutocomplete = {
	render: DefaultSelectionTemplate,

	args: {
		value: SELECT_OPTIONS[0]
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByRole("combobox"));
	}
};

export const WithDividers = {
	render: DefaultSelectionTemplate,

	args: {
		value: SELECT_OPTIONS[0],
		withDividers: true
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByRole("combobox"));
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
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByRole("combobox"));
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
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByRole("combobox"));
	}
};

export const CustomHeight = {
	render: DefaultSelectionTemplate,

	args: {
		label: "Some Label",
		maxHeight: "150px"
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByRole("combobox"));
	}
};

export const MultipleSelection = {
	render: DefaultSelectionTemplate,

	args: {
		label: "Some Label",
		multiple: true,
		value: [SELECT_OPTIONS[0], SELECT_OPTIONS[1], SELECT_OPTIONS[2]]
	}
};

export const MultipleSelectionWithLimitedTag = {
	render: DefaultSelectionTemplate,

	args: {
		label: "Some Label",
		multiple: true,
		value: [SELECT_OPTIONS[0], SELECT_OPTIONS[1], SELECT_OPTIONS[2]],
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
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByRole("combobox"));
	}
};

export const MultipleSelectionWithLongLabelAndNullMaxTagWidth = {
	render: DefaultSelectionTemplate,

	args: {
		label: "Some Label",
		multiple: true,
		value: [],
		width: "50%",
		longLabel: true,
		tagMaxWidth: null
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByRole("combobox"));
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

export const MultiSelectionWithDisabledItems = ({
	multiple = true,
	readOnly = false,
	required = true,
	disabled = false,
	label = "Modeled Event Mesh",
	inlineLabel = false,
	width,
	placeholder,
	helperText,
	hasErrors,
	limitTags,
	disableCloseOnSelect,
	clearSearchOnSelect,
	maxHeight,
	tagMaxWidth,
	minWidth,
	getOptionValidationErrorCallback
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
	limitTags?: number;
	disableCloseOnSelect?: boolean;
	clearSearchOnSelect?: boolean;
	maxHeight?: string;
	tagMaxWidth?: string;
	minWidth?: string;
	getOptionValidationErrorCallback?: ((option: SolaceSelectAutocompleteItemProps) => string | JSX.Element) | undefined;
}): JSX.Element => {
	const [values, setValues] = useState([SAMPLE_EVENT_MESHES[1], SAMPLE_EVENT_MESHES[2]]);
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
				label={label}
				required={required}
				clearSearchOnSelect={clearSearchOnSelect}
				disabled={disabled}
				hasErrors={hasErrors}
				helperText={helperText}
				inlineLabel={inlineLabel}
				limitTags={limitTags}
				multiple={multiple}
				readOnly={readOnly}
				width={width}
				placeholder={placeholder}
				disableCloseOnSelect={disableCloseOnSelect}
				maxHeight={maxHeight}
				minWidth={minWidth}
				tagMaxWidth={tagMaxWidth}
				getOptionValidationErrorCallback={getOptionValidationErrorCallback}
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

MultiSelectionWithDisabledItems.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	await userEvent.click(await canvas.findByRole("combobox"));
};

const INPUT_VALUE_REGEX = /^[A-Za-z0-9-_./@()'–# ]*$/;

const MultiSelectionWithCreateNewTemplate = ({
	multiple = true,
	readOnly = false,
	required = false,
	disabled = false,
	name = "customAttributeValues",
	label = "Custom Attribute Values",
	inlineLabel = false,
	width,
	placeholder,
	helperText,
	hasErrors,
	limitTags,
	disableCloseOnSelect,
	clearSearchOnSelect = false,
	maxHeight = "400px",
	minWidth,
	tagMaxWidth,
	getOptionValidationErrorCallback,
	value = [],
	options = [],
	validateInput = false
}: {
	// props of component
	multiple?: boolean;
	readOnly?: boolean;
	required?: boolean;
	disabled?: boolean;
	name?: string;
	label?: string;
	inlineLabel?: boolean;
	width?: string;
	placeholder?: string;
	helperText?: string;
	hasErrors?: boolean;
	limitTags?: number;
	disableCloseOnSelect?: boolean;
	clearSearchOnSelect?: boolean;
	maxHeight?: string;
	minWidth?: string;
	tagMaxWidth?: string;
	getOptionValidationErrorCallback?: ((option: SolaceSelectAutocompleteItemProps) => string | JSX.Element) | undefined;
	value?: SolaceSelectAutocompleteItemProps | Array<SolaceSelectAutocompleteItemProps>;
	options: SolaceSelectAutocompleteItemProps[];
	validateInput: boolean;
}): JSX.Element => {
	const [values, setValues] = useState<SolaceSelectAutocompleteItemProps[]>(Array.isArray(value) ? value : [value]);
	const [matchingValues, setMatchingValues] = useState<SolaceSelectAutocompleteItemProps[]>(options);

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
			options.push(...newValues); // Update the options array directly
			setMatchingValues([...options].sort((a, b) => a.name.localeCompare(b.name)));
		}
	};

	const handleFetchOptionsCallback = useCallback(
		(searchTerm: string) => {
			if (searchTerm) {
				const matches = options.filter((option) => option["name"].toLowerCase().includes(searchTerm.toLowerCase()));
				const exactMatch = matches.find((option) => option["name"] === searchTerm);
				if (!exactMatch) {
					const toCreate = { name: searchTerm, value: searchTerm, subText: "Create new value", isNew: true };
					setMatchingValues([...matches, toCreate]);
				} else {
					setMatchingValues(matches);
				}
			} else {
				setMatchingValues([...options]);
			}
		},
		[options]
	);

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

	return (
		<div>
			<SolaceSelectAutocomplete
				name={name}
				label={label}
				multiple={multiple}
				readOnly={readOnly}
				disabled={disabled}
				required={required}
				inlineLabel={inlineLabel}
				value={values}
				options={matchingValues}
				itemComponent={SolaceSelectAutocompleteItem}
				itemMappingCallback={(option) => option}
				optionsLabelCallback={getSolaceSelectAutocompleteOptionLabel}
				isOptionEqualToValueCallback={isSolaceSelectAutocompleteOptionEqual}
				onChange={handleChange}
				fetchOptionsCallback={handleFetchOptionsCallback}
				clearSearchOnSelect={clearSearchOnSelect}
				width={width}
				placeholder={placeholder}
				limitTags={limitTags}
				disableCloseOnSelect={disableCloseOnSelect}
				maxHeight={maxHeight}
				minWidth={minWidth}
				tagMaxWidth={tagMaxWidth}
				getOptionValidationErrorCallback={getOptionValidationErrorCallback}
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
		clearSearchOnSelect: true,
		options: []
	}
};

export const MultiSelectionWithInitialValueCreateNewAndClearSearchWhenSelectNew = {
	render: MultiSelectionWithCreateNewTemplate,
	args: {
		value: [SELECT_OPTIONS[0], SELECT_OPTIONS[1]],
		clearSearchOnSelect: true,
		options: SELECT_OPTIONS
	}
};

export const MultiSelectionWithInitialValueCreateNewAndValidateInputAndClearSearchWhenSelectNew = {
	render: MultiSelectionWithCreateNewTemplate,

	args: {
		value: [SELECT_OPTIONS[0], SELECT_OPTIONS[1]],
		clearSearchOnSelect: true,
		options: SELECT_OPTIONS,
		validateInput: true
	}
};

export const MultiSelectionWithCreateNewAndNotClearSearchWhenSelectNew = {
	render: MultiSelectionWithCreateNewTemplate,

	args: {
		clearSearchOnSelect: false,
		options: SELECT_OPTIONS
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
		name: "Option #5",
		value: "option5",
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
	disabled,
	readOnly = false,
	value,
	showGroupDivider = false,
	clearSearchOnSelect = false,
	hasErrors,
	disableCloseOnSelect,
	helperText,
	inlineLabel,
	limitTags,
	maxHeight,
	minWidth,
	multiple = true,
	placeholder,
	required,
	tagMaxWidth,
	width,
	//storybook specific
	disabledItems
}: {
	label?: string;
	disabled?: boolean;
	readOnly?: boolean;
	value?: Array<SolaceSelectAutocompleteItemProps>;
	showGroupDivider?: boolean;
	clearSearchOnSelect?: boolean;
	disableCloseOnSelect?: boolean;
	hasErrors?: boolean;
	helperText?: string;
	inlineLabel?: boolean;
	limitTags?: number;
	maxHeight?: string;
	minWidth?: string;
	multiple?: boolean;
	placeholder?: string;
	required?: boolean;
	tagMaxWidth?: string;
	width?: string;
	//storybook specific
	disabledItems?: boolean;
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
				multiple={multiple}
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
				clearSearchOnSelect={clearSearchOnSelect}
				disableCloseOnSelect={disableCloseOnSelect}
				hasErrors={hasErrors}
				helperText={helperText}
				inlineLabel={inlineLabel}
				limitTags={limitTags}
				maxHeight={maxHeight}
				minWidth={minWidth}
				placeholder={placeholder}
				required={required}
				tagMaxWidth={tagMaxWidth}
				width={width}
			></SolaceSelectAutocomplete>
		</div>
	);
};

export const MultiSelectionWithHeading = {
	render: MultiSelectionWithHeadingTemplate,

	args: {},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByRole("combobox"));
	}
};

export const MultiSelectionWithHeadingWithCustomHeight = {
	render: MultiSelectionWithHeadingTemplate,

	args: {
		maxHeight: "205px"
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByRole("combobox"));
	}
};

export const MultiSelectionWithHeadingAndDisabledItems = {
	render: MultiSelectionWithHeadingTemplate,

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

export const MultiSelectionWithCustomTagRenderer = ({
	label,
	disabled,
	readOnly,
	showGroupDivider = false,
	clearSearchOnSelect = false,
	hasErrors,
	disableCloseOnSelect,
	helperText,
	inlineLabel,
	maxHeight,
	minWidth,
	options = [],
	required,
	tagMaxWidth,
	width
}: {
	label?: string;
	disabled?: boolean;
	readOnly?: boolean;
	value?: Array<SolaceSelectAutocompleteItemProps>;
	showGroupDivider?: boolean;
	clearSearchOnSelect?: boolean;
	disableCloseOnSelect?: boolean;
	hasErrors?: boolean;
	helperText?: string;
	inlineLabel?: boolean;
	maxHeight?: string;
	minWidth?: string;
	multiple?: boolean;
	placeholder?: string;
	required?: boolean;
	tagMaxWidth?: string;
	width?: string;
	options?: SolaceSelectAutocompleteItemProps[];
}): JSX.Element => {
	const [values, setValues] = useState<SolaceSelectAutocompleteItemProps[]>([
		SAMPLE_APPLICATION_DOMAINS[0],
		SAMPLE_APPLICATION_DOMAINS[2]
	]);
	const [matchingValues, setMatchingValues] = useState<SolaceSelectAutocompleteItemProps[]>(options);

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
				label={label}
				disabled={disabled}
				readOnly={readOnly}
				showGroupDivider={showGroupDivider}
				clearSearchOnSelect={clearSearchOnSelect}
				hasErrors={hasErrors}
				disableCloseOnSelect={disableCloseOnSelect}
				helperText={helperText}
				inlineLabel={inlineLabel}
				maxHeight={maxHeight}
				minWidth={minWidth}
				required={required}
				tagMaxWidth={tagMaxWidth}
				width={width}
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
			<div
				style={{ marginBlock: "24px", display: "flex", flexWrap: "wrap", width: width === null ? undefined : width }}
			>
				{values.map((value) => {
					return (
						<div style={{ marginRight: "8px", marginBottom: "8px" }} key={value.value}>
							<SolaceChip
								clickable
								label={`Application Domain: ${value.name}`}
								maxWidth={tagMaxWidth === null ? undefined : tagMaxWidth}
								onDelete={!disabled && !readOnly ? () => handleDelete(value.value) : undefined} // Conditionally render onDelete
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const Container = styled("div")(() => ({
	".MuiAutocomplete-root .MuiOutlinedInput-root .MuiInputBase-root": {
		// avoid the dropdown to grow due to search input area being wrapped around temporarily during re-render between window resize events
		height: "32px",
		maxHeight: "32px"
	}
}));

export const MultiSelectionWithResponsiveTagRenderer = ({
	label = "Application Label",
	disabled,
	readOnly,
	showGroupDivider = false,
	clearSearchOnSelect = false,
	hasErrors,
	disableCloseOnSelect,
	helperText,
	inlineLabel,
	maxHeight,
	minWidth = "500px",
	options = [],
	required,
	tagMaxWidth,
	width,
	limitTags
}: {
	label?: string;
	disabled?: boolean;
	readOnly?: boolean;
	value?: Array<SolaceSelectAutocompleteItemProps>;
	showGroupDivider?: boolean;
	clearSearchOnSelect?: boolean;
	disableCloseOnSelect?: boolean;
	hasErrors?: boolean;
	helperText?: string;
	inlineLabel?: boolean;
	maxHeight?: string;
	minWidth?: string;
	multiple?: boolean;
	placeholder?: string;
	required?: boolean;
	tagMaxWidth?: string;
	width?: string;
	options?: SolaceSelectAutocompleteItemProps[];
	limitTags?: number | null | undefined;
	getLimitTagsText?: (limit: number) => string;
}): JSX.Element => {
	const [values, setValues] = useState<SolaceSelectAutocompleteItemProps[]>(SAMPLE_APPLICATION_DOMAINS.slice(1));
	const [matchingValues, setMatchingValues] = useState<SolaceSelectAutocompleteItemProps[]>(options);
	const [selectedTags, setSelectedTags] = useState<{ id: string; label: string }[]>([]);

	const handleChange = (evt) => {
		setValues(evt.value);
	};

	// eslint-disable-next-line sonarjs/no-identical-functions
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

	useEffect(() => {
		const tags = values?.map((selectedItemValue) => {
			return {
				id: selectedItemValue.value,
				label: selectedItemValue.name
			};
		});
		setSelectedTags(tags);
	}, [values]);

	return (
		<Container>
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
				label={label}
				disabled={disabled}
				readOnly={readOnly}
				showGroupDivider={showGroupDivider}
				clearSearchOnSelect={clearSearchOnSelect}
				hasErrors={hasErrors}
				disableCloseOnSelect={disableCloseOnSelect}
				helperText={helperText}
				inlineLabel={inlineLabel}
				maxHeight={maxHeight}
				minWidth={minWidth}
				required={required}
				tagMaxWidth={tagMaxWidth}
				width={width}
				{...(typeof limitTags === "number" && { limitTags })}
				getLimitTagsText={(limit) => `+${limit} more`}
				renderTags={() => (
					<>
						{values && values.length > 0 && (
							<SolaceSelectAutocompleteResponsiveTags
								containerWidth={500}
								tags={selectedTags}
								tagMaxWidth={tagMaxWidth}
								overflowIndicatorLabel={"Filters"}
								overflowIndicatorLabelSingular={"Filter"}
								onDelete={handleDelete}
								dataQa={"applicationDomainSelect-tags"}
								disabled={disabled}
							/>
						)}
					</>
				)}
			></SolaceSelectAutocomplete>
			<div
				style={{ marginBlock: "24px", display: "flex", flexWrap: "wrap", width: width === null ? undefined : width }}
			>
				{values.length > 0 &&
					(() => {
						const count = values.length;
						return (
							<div style={{ marginRight: "8px", marginBottom: "8px" }} key="selected-tags">
								<SolaceChip
									clickable
									label={`${label}: ${count}`}
									onDelete={!disabled && !readOnly ? () => setValues([]) : undefined}
								/>
							</div>
						);
					})()}
			</div>
		</Container>
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
