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

import React from "react";
import { Meta, Decorator } from "@storybook/react";
import {
	SolaceSelect,
	DeleteIcon,
	MenuItem,
	AddCircleOutlineOutlinedIcon,
	HelpOutlineOutlinedIcon,
	SolaceButton,
	SolaceEnvironmentChip,
	SolaceEnvironmentChipProps,
	SolaceSelectAutocompleteItem,
	SolaceSelectAutocompleteItemProps,
	useTheme
} from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { within, userEvent, screen } from "@storybook/test";
import {
	Maintenance16Icon,
	Construction16Icon,
	Toolkit16Icon,
	Broker16Icon,
	RocketLaunch16Icon
} from "@SolaceDev/maas-icons";

(SolaceSelect as React.FC & { displayName?: string }).displayName = "SolaceSelect";
(MenuItem as React.FC & { displayName?: string }).displayName = "MenuItem";
(SolaceSelectAutocompleteItem as React.FC & { displayName?: string }).displayName = "SolaceSelectAutocompleteItem";
(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";

// Create a decorator to increase the snapshot window size"
const withSnapshotContainer: Decorator = (Story) => {
	return (
		<div id="snapshot" style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}>
			<div style={{ margin: "16px" }}>
				<Story />
			</div>
		</div>
	);
};

export default {
	title: "Input/Dropdown/Standard",
	component: SolaceSelect,
	parameters: {
		controls: { sort: "alpha" },
		docs: {
			description: {
				component: "Code component name: SolaceSelect"
			}
		}
	},
	argTypes: {
		label: {
			control: {
				type: "text"
			},
			description:
				"The label text displayed above or inline with the select field. Use this to clearly describe what the user is selecting. Labels should be concise and descriptive.",
			table: {}
		},
		helperText: {
			control: {
				type: "text"
			},
			description:
				"Additional text displayed below the select field to provide guidance or error messages. Use this to give users context about available options or validation requirements."
		},
		hasErrors: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the select field in an error state with red styling. Use this to indicate validation failures or selection errors. Often paired with error text in helperText.",
			table: {
				type: { summary: "boolean" }
			}
		},
		hasWarnings: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the select in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the select options.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		inlineLabel: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the label inline with the select field rather than above it. Use this for compact layouts or when you need to save vertical space.",
			table: {
				type: { summary: "boolean" }
			}
		},
		required: {
			control: {
				type: "boolean"
			},
			description:
				"If true, marks the field as required and displays an asterisk (*) next to the label. Use this to indicate mandatory fields in forms and ensure proper validation.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		disabled: {
			control: {
				type: "boolean"
			},
			description:
				"If true, disables the select field preventing user interaction. Use this when the field is not applicable based on current form state or user permissions.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		readOnly: {
			control: {
				type: "boolean"
			},
			description:
				"If true, makes the select field read-only. Users can see the selected value but cannot change it. Use this for displaying computed values or information that shouldn't be modified.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		value: {
			control: {
				type: "text"
			},
			description:
				"The current selected value of the select field. Use this for controlled components where you manage the field state externally. Should be paired with an onChange handler.",
			table: {}
		},
		defaultValue: {
			control: {
				type: "text"
			},
			description:
				"The default selected value for uncontrolled components. Use this when you want to set an initial value but don't need to control the selection state.",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		multiple: {
			control: {
				type: "boolean"
			},
			description:
				"If true, enables multiple selection mode. Users can select multiple options from the dropdown. The value will be an array of selected values.",
			table: {
				type: { summary: "boolean" }
			}
		},
		width: {
			control: {
				type: "text"
			},
			description:
				"The width of the select field. Can be a number (pixels), percentage, or CSS width value. Use this to control the field width within your layout constraints.",
			table: {}
		},
		maxHeight: {
			control: {
				type: "text"
			},
			description:
				"Maximum height of the dropdown menu. Use this to limit the dropdown height and enable scrolling when there are many options.",
			table: {}
		},
		displayEmpty: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays a placeholder or empty option when no value is selected. Use this to show users that they need to make a selection.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		placeholder: {
			control: {
				type: "text"
			},
			description:
				"Placeholder text displayed when no value is selected and displayEmpty is true. Use this to provide guidance about what the user should select."
		},
		name: {
			control: {
				type: "text"
			},
			description:
				"The name attribute for the select field, used for form submission and accessibility. Essential for proper form handling and assistive technology support.",
			table: {}
		},
		id: {
			control: {
				type: "text"
			},
			description:
				"Unique identifier for the select field. Used to associate the label with the input for accessibility and to reference the field programmatically."
		},
		title: {
			control: {
				type: "text"
			},
			description:
				"The title attribute for the select field, displayed as a tooltip on hover. Use this for additional context or instructions that don't fit in the label or helper text.",
			table: {}
		},
		onChange: {
			description:
				"Callback function fired when the selection changes. Receives an event object with the new value. Essential for controlled components and form state management."
		},
		onBlur: {
			description:
				"Callback function fired when the select field loses focus. Use this for validation, formatting, or other actions that should occur when the user finishes selecting."
		},
		onFocus: {
			description:
				"Callback function fired when the select field gains focus. Use this for tracking user interaction, showing additional UI elements, or preparing the field for selection."
		},
		children: {
			control: { type: "object" },
			description:
				"MenuItem components that represent the available options. Use MenuItem components from the library to ensure proper styling and behavior.",
			table: {}
		},
		getOptionDisplayValue: {
			description:
				"Function to customize how selected values are displayed in the input field. Use this when you need to show different text than the MenuItem content."
		},
		open: {
			control: {
				type: "boolean"
			},
			description:
				"Controls whether the dropdown is open. Use this for controlled dropdown state, often paired with onOpen and onClose handlers.",
			table: {
				type: { summary: "boolean" }
			}
		},
		onOpen: {
			description:
				"Callback function fired when the dropdown opens. Use this for controlled dropdown state or to trigger actions when the dropdown becomes visible."
		},
		onClose: {
			description:
				"Callback function fired when the dropdown closes. Use this for controlled dropdown state or to trigger actions when the dropdown becomes hidden."
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify the select field during automated testing."
		},
		dataTags: {
			control: { type: "text" },
			description: "Data attribute for additional tagging. Use this for analytics, tracking, or additional metadata."
		}
	},
	decorators: [withSnapshotContainer]
} as Meta<typeof SolaceSelect>;

const SELECT_OPTIONS: Array<JSX.Element> = [];
SELECT_OPTIONS.push(
	<MenuItem key="no option" value="">
		No Option
	</MenuItem>
);
SELECT_OPTIONS.push(
	<MenuItem key="option1" value="option1">
		Menu Option #1
	</MenuItem>
);
SELECT_OPTIONS.push(
	<MenuItem key="option2" value="option2">
		Menu Option #2
	</MenuItem>
);
SELECT_OPTIONS.push(
	<MenuItem key="option3" value="option3">
		Menu Option #3
	</MenuItem>
);

const SELECT_OPTIONS_WITH_LONG_TEXT: Array<JSX.Element> = [];
SELECT_OPTIONS_WITH_LONG_TEXT.push(...SELECT_OPTIONS);
SELECT_OPTIONS_WITH_LONG_TEXT.push(
	<MenuItem key="option4" value="option4">
		Very long menu option used to test how long I can go before it breaks the dialog
	</MenuItem>
);
const SELECT_OPTIONS_WITH_LONG_TEXT_AND_CUSTOM_WIDTH = [...SELECT_OPTIONS];
SELECT_OPTIONS_WITH_LONG_TEXT_AND_CUSTOM_WIDTH.push(
	<MenuItem key="option4" value="option4" sx={{ maxWidth: "400px" }}>
		Very long menu option used to test how long I can go before it breaks the dialog with custom width
	</MenuItem>
);

const SELECT_OPTIONS_WITH_SUBTEXT: Array<SolaceSelectAutocompleteItemProps> = [
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

function generateSelectOptionsWithSubtext(): Array<JSX.Element> {
	return SELECT_OPTIONS_WITH_SUBTEXT.map((option) => {
		return (
			<MenuItem key={option.value} value={option.value}>
				<SolaceSelectAutocompleteItem {...option} />
			</MenuItem>
		);
	});
}

const SELECT_OPTIONS_WITH_ICON: Array<SolaceSelectAutocompleteItemProps> = [
	{
		name: "Option #1",
		value: "option1",
		icon: <DeleteIcon />
	},
	{
		name: "Option #2",
		value: "option2",
		icon: <AddCircleOutlineOutlinedIcon />
	},
	{
		name: "Option #3",
		value: "option3",
		icon: <HelpOutlineOutlinedIcon />
	}
];

function generateSelectOptionsWithIcon(): Array<JSX.Element> {
	return SELECT_OPTIONS_WITH_ICON.map((option) => {
		return (
			<MenuItem key={option.value} value={option.value}>
				<SolaceSelectAutocompleteItem {...option} />
			</MenuItem>
		);
	});
}

const SELECT_OPTIONS_WITH_ICON_TEXT: Array<SolaceSelectAutocompleteItemProps> = [
	{
		name: "Solace",
		value: "solace",
		supplementalText: "use /"
	},
	{
		name: "Kafka",
		value: "kafka",
		supplementalText: "use ."
	},
	{
		name: "Unknown",
		value: "unknown",
		secondaryAction: <HelpOutlineOutlinedIcon fontSize="small" />
	}
];

const SELECT_OPTIONS_SHOWING_ALL_CONDITIONS: Array<SolaceSelectAutocompleteItemProps> = [
	{
		name: "Option 1",
		value: "option1",
		subText: "Subtext Option 1",
		supplementalText: "supplemental text option 1",
		icon: <DeleteIcon />
	},
	{
		name: "Option 2",
		value: "option2",
		subText: "Subtext Option 2",
		secondaryAction: <HelpOutlineOutlinedIcon fontSize="small" />,
		icon: <DeleteIcon />
	},
	{
		name: "Option 3",
		value: "option3",
		supplementalText: "supplemental text option 3",
		icon: <DeleteIcon />
	},
	{
		name: "Option 4",
		value: "option4",
		subText: "Subtext Option 4",
		icon: <DeleteIcon />
	}
];

function generateSelectOptionsWithAll(): Array<JSX.Element> {
	return SELECT_OPTIONS_SHOWING_ALL_CONDITIONS.map((option) => {
		return (
			<MenuItem key={option.value} value={option.value}>
				<SolaceSelectAutocompleteItem {...option} />
			</MenuItem>
		);
	});
}

const TITLE = "Demo Select";
const LABEL = "Some Label";

export const DefaultTextfield = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoSelectId",
		name: "demoSelect",
		children: SELECT_OPTIONS
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("combobox"));
	}
};

export const CustomSelectWidth = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoSelectId",
		name: "demoSelect",
		children: SELECT_OPTIONS_WITH_LONG_TEXT,
		width: "350px"
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("combobox"));
	}
};

/**
 * The width on SolaceSelect applies to both Select input and MenuProps so by default they have the same width.
 * The width on MenuProps applies to the MuiModal-root (with role="presentation") that wraps the menu list
 * It starts at the top left corner of the screen. If set, custom menuItem width won't work.
 * In this example, the width of the select is set to 350px on the wrapper container and the custom menu item has maxWidth 400px.
 * The alignment is calculated based on the space available. If available, the default of anchorOrigin is bottom center, and the transformOrigin is top center.
 * In this example, it is set to bottom left and top left respectively, so that the menu list starts from the bottom left corner of the select.
 */
export const CustomMenuItemWidthAndAlignment = () => {
	return (
		<div style={{ marginLeft: "400px", width: "350px" }}>
			<SolaceSelect
				title={TITLE}
				id="demoSelectId"
				name="demoSelect"
				dataQa="demoSelect"
				onChange={action("callback")}
				menuAnchorOrigin={{ vertical: "bottom", horizontal: "left" }}
				menuTransformOrigin={{ vertical: "top", horizontal: "left" }}
			>
				{SELECT_OPTIONS_WITH_LONG_TEXT_AND_CUSTOM_WIDTH}
			</SolaceSelect>
		</div>
	);
};

CustomMenuItemWidthAndAlignment.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	await userEvent.click(canvas.getByRole("combobox"));
};

export const CustomMaxHeight = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoSelectId",
		name: "demoSelect",
		children: SELECT_OPTIONS,
		width: "350px",
		maxHeight: "15em"
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("combobox"));
	}
};

export const StackedLabelFormat = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		name: "demoSelect",
		label: LABEL,
		children: SELECT_OPTIONS
	}
};

export const InlineLabelFormat = {
	args: {
		onChange: action("callback"),
		name: "demoSelect",
		title: TITLE,
		label: LABEL,
		children: SELECT_OPTIONS,
		inlineLabel: true
	}
};

export const Subtext = {
	args: {
		onChange: action("callback"),
		getOptionDisplayValue: (value) => {
			const match = SELECT_OPTIONS_WITH_SUBTEXT.find((props) => props.value === value);
			return match ? match.name : "";
		},
		name: "demoSelect",
		title: TITLE,
		label: LABEL,
		children: generateSelectOptionsWithSubtext()
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("combobox"));
	}
};

export const DisplayEmpty = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoSelectId",
		name: "demoSelect",
		children: SELECT_OPTIONS,
		displayEmpty: true
	}
};

export const HelperText = {
	args: {
		onChange: action("callback"),
		name: "demoSelect",
		title: TITLE,
		label: LABEL,
		children: SELECT_OPTIONS,
		helperText: "Some helper text"
	}
};

export const WithErrors = {
	args: {
		onChange: action("callback"),
		name: "demoSelect",
		title: TITLE,
		label: LABEL,
		children: SELECT_OPTIONS,
		helperText: "The text you entered was invalid",
		hasErrors: true
	}
};

export const Required = {
	args: {
		onChange: action("callback"),
		name: "demoSelect",
		title: TITLE,
		label: LABEL,
		children: SELECT_OPTIONS,
		required: true
	}
};

export const Disabled = {
	args: {
		onChange: action("callback"),
		name: "demoSelect",
		title: TITLE,
		label: LABEL,
		children: SELECT_OPTIONS,
		value: "option2",
		disabled: true
	}
};

export const ReadOnly = {
	args: {
		onChange: action("callback"),
		name: "demoSelect",
		title: TITLE,
		label: LABEL,
		children: SELECT_OPTIONS,
		value: "option3",
		readOnly: true
	}
};

export const ReadOnlyAndDisabled = {
	args: {
		onChange: action("callback"),
		name: "demoSelect",
		title: TITLE,
		label: LABEL,
		children: SELECT_OPTIONS,
		value: "option3",
		readOnly: true,
		disabled: true
	}
};

export const WithIcon = {
	args: {
		onChange: action("callback"),
		name: "demoSelect",
		title: TITLE,
		label: LABEL,
		children: generateSelectOptionsWithIcon()
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("combobox"));
	}
};

export const WithIconDisabled = {
	args: {
		onChange: action("callback"),
		name: "demoSelect",
		title: TITLE,
		label: LABEL,
		value: "option2",
		children: generateSelectOptionsWithIcon(),
		disabled: true
	}
};

export const WithIconReadonly = {
	args: {
		onChange: action("callback"),
		name: "demoSelect",
		title: TITLE,
		label: LABEL,
		value: "option3",
		children: generateSelectOptionsWithIcon(),
		readOnly: true
	}
};

export const WithIconAndText = (): JSX.Element => {
	const options = SELECT_OPTIONS_WITH_ICON_TEXT.map((option) => {
		return (
			<MenuItem key={option.value} value={option.value}>
				<SolaceSelectAutocompleteItem {...option} />
			</MenuItem>
		);
	});
	return (
		<SolaceSelect onChange={action("callback")} name="demoSelect" title={TITLE} label={LABEL}>
			{options}
		</SolaceSelect>
	);
};

WithIconAndText.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	await userEvent.click(canvas.getByRole("combobox"));
};

export const ShowingAllDropdownOptions = {
	args: {
		onChange: action("callback"),
		name: "demoSelect",
		getOptionDisplayValue: (value) => {
			const match = SELECT_OPTIONS_WITH_SUBTEXT.find((props) => props.value === value);
			return match ? match.name : "";
		},
		title: TITLE,
		label: LABEL,
		value: "option3",
		children: generateSelectOptionsWithAll()
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("combobox"));
	}
};

export const OpenDropDownOnButtonClick = () => {
	const [selectedSharedType, setSelectedSharedType] = React.useState("");
	const [openDropdown, setOpenDropdown] = React.useState(false);

	const handleSharedTypeChange = (evt) => {
		setSelectedSharedType(evt.value);
	};
	const handleClose = () => {
		setOpenDropdown(false);
	};

	const handleOpen = () => {
		setOpenDropdown(true);
	};

	return (
		<div style={{ display: "flex", columnGap: "10px", alignItems: "end" }}>
			<SolaceSelect
				id="sharedTypeSelect"
				name="sharedTypeSelect"
				dataQa="sharedTypeSelect"
				label={"Shared"}
				onChange={handleSharedTypeChange}
				value={selectedSharedType}
				width={"30%"}
				displayEmpty
				open={openDropdown}
				onClose={handleClose}
				onOpen={handleOpen}
			>
				{SELECT_OPTIONS}
			</SolaceSelect>
			<SolaceButton
				variant="outline"
				onClick={() => {
					setOpenDropdown(true);
				}}
			>
				open the dropdown
			</SolaceButton>
		</div>
	);
};

export const WithSolaceEnvironmentChips = () => {
	const {
		palette: { ux }
	} = useTheme();
	const examples: SolaceEnvironmentChipProps[] = [
		{ label: "Environment 1", fgColor: ux.primary.text.w100, bgColor: ux.background.w10, icon: <Maintenance16Icon /> },
		{ label: "Environment 2", fgColor: ux.primary.text.w100, bgColor: ux.accent.n2.w20, icon: <Construction16Icon /> },
		{ label: "Environment 3", fgColor: ux.primary.text.w100, bgColor: ux.accent.n1.w20, icon: <Toolkit16Icon /> },
		{ label: "Environment 9", fgColor: ux.primary.text.w10, bgColor: ux.accent.n4.wMain, icon: <Broker16Icon /> },
		{ label: "Environment 10", fgColor: ux.primary.text.w10, bgColor: ux.accent.n9.wMain, icon: <RocketLaunch16Icon /> }
	];
	const options = examples.map((example) => {
		return (
			<MenuItem key={example.label} value={example.label} style={{ width: "100%" }}>
				<SolaceEnvironmentChip {...example} />
			</MenuItem>
		);
	});
	return (
		<SolaceSelect label="Environment" name="Environment">
			{options}
		</SolaceSelect>
	);
};

WithSolaceEnvironmentChips.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const dropdown = canvas.getByRole("combobox");
	await userEvent.click(dropdown);
	const environment2 = await screen.getByText("Environment 2");
	await userEvent.click(environment2);
	await userEvent.click(dropdown);
};
