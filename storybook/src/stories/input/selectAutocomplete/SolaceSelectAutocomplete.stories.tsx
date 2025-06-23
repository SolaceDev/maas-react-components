/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sonarjs/no-duplicate-string */
import React, { useCallback, useState } from "react";
import { Meta, Decorator } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
import {
	SolaceSelectAutocomplete,
	SolaceSelectAutocompleteItem,
	getSolaceSelectAutocompleteOptionLabel,
	isSolaceSelectAutocompleteOptionEqual,
	SolaceSelectAutocompleteItemProps,
	SolaceChip,
	SolaceButton,
	SolaceSelectAutocompleteResponsiveTags,
	getShowSolaceSelectAutocompleteOptionDivider,
	SolaceTooltip,
	HelpOutlineOutlinedIcon
} from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

(SolaceSelectAutocomplete as React.FC & { displayName?: string }).displayName = "SolaceSelectAutocomplete";
(SolaceSelectAutocompleteItem as React.FC & { displayName?: string }).displayName = "SolaceSelectAutocompleteItem";
(SolaceChip as React.FC & { displayName?: string }).displayName = "SolaceChip";
(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";
(SolaceSelectAutocompleteResponsiveTags as unknown as React.FC & { displayName?: string }).displayName =
	"SolaceSelectAutocompleteResponsiveTags";

// Create a decorator to increase the snapshot window size
const withSnapshotContainer: Decorator = (Story) => {
	return (
		<div id="snapshot" style={{ width: "auto", height: "500px", padding: "10px 35px" }}>
			<Story />
		</div>
	);
};

export default {
	title: "Input/Dropdown/Autocomplete",
	component: SolaceSelectAutocomplete,
	args: {
		id: "",
		name: "",
		title: "",
		label: "",
		placeholder: "",
		width: "",
		helperText: "",
		hasErrors: false,
		inlineLabel: false,
		required: false,
		disabled: false,
		disableCloseOnSelect: true,
		readOnly: false,
		multiple: false,
		limitTags: undefined,
		maxHeight: "",
		fullWidth: false,
		minWidth: "",
		clearSearchOnSelect: false,
		tagMaxWidth: "",
		freeSolo: false,
		startAdornment: undefined,
		endAdornment: undefined,
		showSupplementalTextOrSecondaryAction: false,
		showLeftIcon: false,
		options: [],
		value: undefined
	},
	parameters: {
		controls: { sort: "alpha" },
		chromatic: { delay: 500 },
		docs: {
			description: {
				component: "Code component name: SolaceSelectAutocomplete"
			}
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
		},
		itemMappingCallback: {
			control: {
				type: "object"
			}
		},
		showSupplementalTextOrSecondaryAction: {
			control: {
				type: "boolean"
			}
		},
		showLeftIcon: {
			control: {
				type: "boolean"
			}
		}
	},
	decorators: [withSnapshotContainer]
} as Meta<typeof SolaceSelectAutocomplete>;

const SUBTEXT = "Subtext subtext";
const SUPPLEMENTALText = "Supplemental text";
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

const SELECT_OPTIONS_FOR_SECONDARY_ACTION = [
	{
		name: "Option 1",
		value: "option1",
		secondaryAction: (
			<SolaceTooltip title="Help">
				<HelpOutlineOutlinedIcon />
			</SolaceTooltip>
		),
		onMenuItemClick: action("callback"),
		subText: SUBTEXT
	},
	{
		name: "Option 2",
		value: "option2",
		supplementalText: SUPPLEMENTALText,
		onMenuItemClick: action("callback")
	},
	{
		name: "Option 3",
		value: "option3",
		secondaryAction: (
			<SolaceTooltip title="Help">
				<HelpOutlineOutlinedIcon />
			</SolaceTooltip>
		),
		onMenuItemClick: action("callback"),
		subText: SUBTEXT
	},
	{
		name: "Option 4",
		value: "option4",
		supplementalText: SUPPLEMENTALText,
		onMenuItemClick: action("callback"),
		subText: SUBTEXT
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
	options = SELECT_OPTIONS,
	limitTags,
	disableCloseOnSelect,
	clearSearchOnSelect,
	maxHeight,
	tagMaxWidth,
	minWidth,
	getOptionValidationErrorCallback,
	showSupplementalTextOrSecondaryAction,
	showLeftIcon,
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
	options: Array<SolaceSelectAutocompleteItemProps>;
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
	showSupplementalTextOrSecondaryAction?: boolean;
	showLeftIcon?: boolean;
}): JSX.Element => {
	const [matchingValues, setMatchingValues] = useState<SolaceSelectAutocompleteItemProps[]>([]);
	const dropdownOptions = options;

	const handleFetchOptionsCallback = useCallback(
		(searchTerm: string) => {
			fetchOptions(
				searchTerm,
				dropdownOptions.map((option) => {
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
		[withDividers, longLabel, dropdownOptions]
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
				showSupplementalTextOrSecondaryAction={showSupplementalTextOrSecondaryAction}
				showLeftIcon={showLeftIcon}
			></SolaceSelectAutocomplete>
		</div>
	);
};

export const DefaultAutocomplete = {
	render: DefaultSelectionTemplate,
	args: {
		value: SELECT_OPTIONS[0],
		options: SELECT_OPTIONS
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
		withDividers: true,
		options: SELECT_OPTIONS
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByRole("combobox"));
	}
};

export const StackedLabelFormat = {
	render: DefaultSelectionTemplate,
	args: {
		label: "Some Label",
		options: SELECT_OPTIONS
	}
};

export const StackedLabelFormatWithCustomWidth = {
	render: DefaultSelectionTemplate,
	args: {
		label: "Some Label",
		width: "50%",
		longLabel: true,
		options: SELECT_OPTIONS
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
		inlineLabel: true,
		options: SELECT_OPTIONS
	}
};

export const HelperText = {
	render: DefaultSelectionTemplate,
	args: {
		helperText: "Some helper text",
		options: SELECT_OPTIONS
	}
};

export const WithErrors = {
	render: DefaultSelectionTemplate,
	args: {
		helperText: "The text you entered was invalid",
		hasErrors: true,
		options: SELECT_OPTIONS
	}
};

export const Required = {
	render: DefaultSelectionTemplate,
	args: {
		label: "Some Label",
		required: true,
		options: SELECT_OPTIONS
	}
};

export const Disabled = {
	render: DefaultSelectionTemplate,
	args: {
		label: "Some Label",
		disabled: true,
		value: SELECT_OPTIONS[1],
		options: SELECT_OPTIONS
	}
};

export const ReadOnly = {
	render: DefaultSelectionTemplate,
	args: {
		label: "Some Label",
		readOnly: true,
		value: SELECT_OPTIONS[1],
		options: SELECT_OPTIONS
	}
};

export const WithDisabledItems = {
	render: DefaultSelectionTemplate,
	args: {
		disabledItems: true,
		options: SELECT_OPTIONS
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
		maxHeight: "150px",
		options: SELECT_OPTIONS
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
		value: [SELECT_OPTIONS[0], SELECT_OPTIONS[1], SELECT_OPTIONS[2]],
		options: SELECT_OPTIONS
	}
};

export const MultipleSelectionWithLimitedTag = {
	render: DefaultSelectionTemplate,
	args: {
		label: "Some Label",
		multiple: true,
		value: [SELECT_OPTIONS[0], SELECT_OPTIONS[1], SELECT_OPTIONS[2]],
		limitTags: 2,
		options: SELECT_OPTIONS
	}
};

export const MultipleSelectionWithLongLabel = {
	render: DefaultSelectionTemplate,
	args: {
		label: "Some Label",
		multiple: true,
		value: [],
		width: "50%",
		longLabel: true,
		options: SELECT_OPTIONS
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
		tagMaxWidth: null,
		options: SELECT_OPTIONS
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
		disableCloseOnSelect: false,
		options: SELECT_OPTIONS
	}
};

export const MultipleSelectionWithClearSearchOnSelect = {
	render: DefaultSelectionTemplate,
	args: {
		label: "Some Label",
		multiple: true,
		value: [],
		clearSearchOnSelect: true,
		options: SELECT_OPTIONS
	}
};

export const MultiSelectionDisabled = {
	render: DefaultSelectionTemplate,
	args: {
		label: "Some Label",
		multiple: true,
		disabled: true,
		value: [SELECT_OPTIONS[0], SELECT_OPTIONS[2]],
		options: SELECT_OPTIONS
	}
};

export const MultiSelectionReadOnly = {
	render: DefaultSelectionTemplate,
	args: {
		label: "Some Label",
		multiple: true,
		readOnly: true,
		longLabel: true,
		value: [SELECT_OPTIONS[0], { ...SELECT_OPTIONS[3], name: getLongLabel(SELECT_OPTIONS[3]) }],
		options: SELECT_OPTIONS
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
		value: [SELECT_OPTIONS[0], { ...SELECT_OPTIONS[3], name: getLongLabel(SELECT_OPTIONS[3]) }, SELECT_OPTIONS[2]],
		options: SELECT_OPTIONS
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

export const MultiSelectionWithDisabledItems = {
	render: DefaultSelectionTemplate,
	args: {
		label: "Some Label",
		multiple: true,
		disabledItems: true,
		value: [],
		options: SELECT_OPTIONS
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByRole("combobox"));
	}
};

const LARGE_AMOUNT_OF_DATA = Array.from(Array(1000).keys()).map((i) => {
	return {
		name: `Option #${i}`,
		value: `option${i}`
	};
});

export const LargeAmountOfData = {
	render: DefaultSelectionTemplate,
	args: {
		label: "Some Label",
		multiple: true,
		value: [LARGE_AMOUNT_OF_DATA[0], LARGE_AMOUNT_OF_DATA[2]],
		options: LARGE_AMOUNT_OF_DATA
	}
};

export const AllowNonMatchingValues = {
	render: DefaultSelectionTemplate,
	args: {
		label: "Some Label",
		multiple: true,
		freeSolo: true,
		value: [SELECT_OPTIONS[0], { name: "Non existing option", value: "Non existing option" }],
		options: SELECT_OPTIONS
	}
};

export const AllowNonMatchingValuesWithValidation = {
	render: DefaultSelectionTemplate,
	args: {
		label: "Some Label",
		multiple: true,
		freeSolo: true,
		getOptionValidationErrorCallback: (option: SolaceSelectAutocompleteItemProps) => {
			if (option.value === "Non existing option") {
				return "Invalid characters. Enter only alphanumeric characters, dashes and underscores.";
			}
		},
		hasErrors: true,
		helperText: "At least one value is invalid. Hover over the value to see error details.",
		value: [SELECT_OPTIONS[0], { name: "Non existing option", value: "Non existing option" }],
		options: SELECT_OPTIONS
	}
};

import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

export const AutocompleteWithIcon = {
	render: DefaultSelectionTemplate,
	args: {
		startAdornment: <PeopleIcon />,
		label: "Some Label",
		options: SELECT_OPTIONS
	}
};

export const AutocompleteWithIconAndMultiple = {
	render: DefaultSelectionTemplate,
	args: {
		startAdornment: <PeopleIcon />,
		label: "Some Label",
		multiple: true,
		value: [SELECT_OPTIONS[0], SELECT_OPTIONS[1]],
		options: SELECT_OPTIONS
	}
};

export const AutocompleteWithActionButton = {
	render: DefaultSelectionTemplate,
	args: {
		label: "Some Label",
		options: SELECT_OPTIONS,
		endAdornment: (
			<IconButton size="small" color="primary" onClick={() => alert("action button clicked")}>
				<AddIcon />
			</IconButton>
		)
	}
};

export const AutocompleteWithActionButtonAndMultiple = {
	render: DefaultSelectionTemplate,
	args: {
		label: "Some Label",
		multiple: true,
		value: [SELECT_OPTIONS[0], SELECT_OPTIONS[1]],
		options: SELECT_OPTIONS,
		endAdornment: (
			<IconButton size="small" color="primary" onClick={() => alert("action button clicked")}>
				<AddIcon />
			</IconButton>
		)
	}
};

export const AsyncLoading = {
	render: AsyncTemplate,
	args: {}
};

const GROUPED_OPTIONS = [
	{
		group: "Group 1",
		options: [
			{ name: "Option 1-1", value: "option1-1" },
			{ name: "Option 1-2", value: "option1-2" }
		]
	},
	{
		group: "Group 2",
		options: [
			{ name: "Option 2-1", value: "option2-1" },
			{ name: "Option 2-2", value: "option2-2" }
		]
	}
];

export const OptionsGrouped = {
	render: DefaultSelectionTemplate,
	args: {
		label: "Some Label",
		options: GROUPED_OPTIONS
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByRole("combobox"));
	}
};

export const OptionsGroupedWithMultiple = {
	render: DefaultSelectionTemplate,
	args: {
		label: "Some Label",
		multiple: true,
		value: [GROUPED_OPTIONS[0], GROUPED_OPTIONS[1]],
		options: GROUPED_OPTIONS
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByRole("combobox"));
	}
};
