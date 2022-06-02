import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { Search } from "@mui/icons-material";
import { SolaceTextField, SolaceButton } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { CloseIcon } from "../../../../src/resources/icons/CloseIcon";

export default {
	title: "Forms/SolaceTextfield",
	component: SolaceTextField,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/P5XeF1KE6z2MKyzlEyInrH/Core-Component-Specs-(Copy)?node-id=430%3A548"
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
		autoFocus: {
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
		type: {
			options: ["text", "number", "password", "email", "url"],
			control: {
				type: "select"
			}
		},
		size: {
			control: {
				type: "number"
			}
		},
		width: {
			control: {
				type: "number"
			}
		}
	}
} as ComponentMeta<typeof SolaceTextField>;

const Template: ComponentStory<typeof SolaceTextField> = (args) => <SolaceTextField {...args} />;

const DEMO_TITLE = "Demo Text Field";
const DEMO_LABEL = "Some Label";

export const DefaultTextfield = Template.bind({});
DefaultTextfield.args = {
	onChange: action("callback"),
	title: DEMO_TITLE,
	id: "demoTextFieldId",
	name: "demoTextField"
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
	onChange: action("callback"),
	title: DEMO_TITLE,
	id: "demoTextFieldId",
	name: "demoTextField",
	width: "50%"
};

export const StackedLabelFormat = Template.bind({});
StackedLabelFormat.args = {
	onChange: action("callback"),
	title: DEMO_TITLE,
	name: "demoTextField",
	label: DEMO_LABEL
};

export const InlineLabelFormat = Template.bind({});
InlineLabelFormat.args = {
	onChange: action("text-changed"),
	name: "demoTextField",
	title: DEMO_TITLE,
	label: DEMO_LABEL,
	inlineLabel: true
};

export const HelperText = Template.bind({});
HelperText.args = {
	onChange: action("callback"),
	name: "demoTextField",
	title: DEMO_TITLE,
	label: DEMO_LABEL,
	helperText: "Some helper text"
};

export const PlaceholderText = Template.bind({});
PlaceholderText.args = {
	onChange: action("callback"),
	name: "demoTextField",
	title: DEMO_TITLE,
	label: DEMO_LABEL,
	placeholder: "Some placeholder text"
};

export const WithErrors = Template.bind({});
WithErrors.args = {
	onChange: action("callback"),
	name: "demoTextField",
	title: DEMO_TITLE,
	label: DEMO_LABEL,
	helperText: "The text you entered was invalid",
	hasErrors: true
};

export const WithWarning = Template.bind({});
WithWarning.args = {
	onChange: action("callback"),
	name: "demoTextField",
	title: DEMO_TITLE,
	label: DEMO_LABEL,
	helperText: "The text you entered triggered a warning",
	hasWarnings: true
};

export const WithIcon = Template.bind({});
WithIcon.args = {
	onChange: action("callback"),
	name: "demoTextField",
	title: DEMO_TITLE,
	label: DEMO_LABEL,
	helperText: "Text field with search icon",
	customIcon: { position: "end", icon: <Search /> }
};

export const WithClearButton = (): JSX.Element => {
	const [value, setValue] = useState("");
	const handleChange = (e) => {
		setValue(e.value);
	};
	const handleClearInput = () => {
		setValue("");
	};
	const endAdornment = [
		value ? (
			<SolaceButton key={"closeIcon"} variant="icon" onClick={handleClearInput}>
				<CloseIcon />
			</SolaceButton>
		) : null,
		<Search key="search" />
	];

	return (
		<SolaceTextField
			value={value}
			name="demoTextField"
			onChange={handleChange}
			endAdornment={endAdornment}
			title={DEMO_TITLE}
			label={DEMO_LABEL}
			helperText="Text field with clear button"
			dataQa="textfieldWithClearButton"
		/>
	);
};
WithClearButton.play = async ({ canvasElement }) => {
	// Starts querying the component from it's root element
	const canvas = within(canvasElement);

	await userEvent.type(canvas.getByTestId("textfieldWithClearButton"), "This is a test ", {
		delay: 400
	});
	//click on clear button
	await userEvent.click(await canvas.findByRole("button"));
};

export const AutoFocus = Template.bind({});
AutoFocus.args = {
	onChange: action("callback"),
	name: "demoTextField",
	title: DEMO_TITLE,
	label: DEMO_LABEL,
	autoFocus: true
};

export const WithOnBlurOnFocus = Template.bind({});
WithOnBlurOnFocus.args = {
	onChange: action("callback"),
	onBlur: action("blur"),
	onFocus: action("focus"),
	title: DEMO_TITLE,
	id: "demoTextFieldId",
	name: "demoTextField"
};

export const Required = Template.bind({});
Required.args = {
	onChange: action("callback"),
	name: "demoTextField",
	title: DEMO_TITLE,
	label: DEMO_LABEL,
	required: true
};

export const Disabled = Template.bind({});
Disabled.args = {
	onChange: action("callback"),
	name: "demoTextField",
	title: DEMO_TITLE,
	label: DEMO_LABEL,
	value: "Some value",
	disabled: true
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
	onChange: action("callback"),
	name: "demoTextField",
	title: DEMO_TITLE,
	label: DEMO_LABEL,
	value: "Some value",
	readOnly: true
};

export const ReadOnlyLongTextOverflowWithTooltip = (): JSX.Element => {
	return (
		<div style={{ width: "400px" }}>
			<SolaceTextField
				name={"demoTextField"}
				title={DEMO_TITLE}
				label={DEMO_LABEL}
				value={"Some long value that will be truncated by ellipsis along with a tooltip upon hover!"}
				readOnly={true}
			/>
		</div>
	);
};

export const ReadOnlyInlineLabelLongTextOverflowWithTooltip = (): JSX.Element => {
	return (
		<div style={{ width: "400px" }}>
			<SolaceTextField
				name={"demoTextField"}
				title={DEMO_TITLE}
				label={DEMO_LABEL}
				value={"Some long value that will be truncated by ellipsis along with a tooltip upon hover!"}
				inlineLabel={true}
				readOnly={true}
			/>
		</div>
	);
};

export const Controlled = ({ value: initialValue, name, ...args }): JSX.Element => {
	const [value, setValue] = useState(initialValue);
	const handleChange = (e) => {
		setValue(e.value);
	};

	return <SolaceTextField value={value} name={name} onChange={handleChange} {...args} />;
};
Controlled.args = {
	name: "controlledTextField",
	label: "Controlled Text Field",
	value: "Initial value",
	helperText: "The value of the text field is controlled by the change handler in the story."
};

export const Interaction = Template.bind({});
Interaction.args = {
	onChange: action("callback"),
	id: "interactionTextField",
	title: DEMO_TITLE,
	label: DEMO_LABEL,
	dataQa: "interactionTextField"
};
Interaction.play = async ({ canvasElement }) => {
	// Starts querying the component from it's root element
	const canvas = within(canvasElement);

	await userEvent.type(canvas.getByTestId("interactionTextField"), "This is a test", {
		delay: 100
	});
};
