import React from "react";
import { Meta } from "@storybook/react";

import {
	SolaceSelect,
	DeleteIcon,
	AddCircleOutlineOutlinedIcon,
	HelpOutlineOutlinedIcon,
	SolaceButton
} from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { MenuItem } from "@SolaceDev/maas-react-components";
import { SolaceSelectAutocompleteItem, SolaceSelectAutocompleteItemProps } from "@SolaceDev/maas-react-components";

export default {
	title: "Forms/SolaceSelect",
	component: SolaceSelect,
	parameters: {
		controls: { sort: "alpha" }
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
		value: {
			control: {
				type: "text"
			}
		},
		width: {
			control: {
				type: "text"
			}
		},
		maxHeight: {
			control: {
				type: "text"
			}
		},
		displayEmpty: {
			control: {
				type: "boolean"
			}
		}
	}
} as Meta<typeof SolaceSelect>;

export const SELECT_OPTIONS: Array<any> = [];
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

export const SELECT_OPTIONS_WITH_LONG_TEXT: Array<any> = [];
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

const SELECT_OPTIONS_WITH_ICON: Array<any> = [
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
				<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
					{option.icon}
					{option.name}
				</div>
			</MenuItem>
		);
	});
}

const SELECT_OPTIONS_WITH_ICON_TEXT: Array<any> = [
	{
		name: "Solace",
		value: "solace",
		delimiter: "use /"
	},
	{
		name: "Kafka",
		value: "kafka",
		delimiter: "use ."
	},
	{
		name: "Unknown",
		value: "unknown",
		delimiter: ""
	}
];
function generateSelectOptionsWithIconAndText(): Array<JSX.Element> {
	return SELECT_OPTIONS_WITH_ICON_TEXT.map((option) => {
		return (
			<MenuItem key={option.value} value={option.value}>
				<div
					style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", width: "100%" }}
				>
					{option.name}
					{option.delimiter ? <span>{option.delimiter}</span> : <HelpOutlineOutlinedIcon fontSize="small" />}
				</div>
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

export const CustomMaxHeight = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoSelectId",
		name: "demoSelect",
		children: SELECT_OPTIONS,
		width: "350px",
		maxHeight: "10em"
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

export const WithIconAndText = {
	args: {
		onChange: action("callback"),
		name: "demoSelect",
		title: TITLE,
		label: LABEL,
		children: generateSelectOptionsWithIconAndText()
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
