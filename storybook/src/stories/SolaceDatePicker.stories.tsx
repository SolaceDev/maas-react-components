import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SolaceDatePicker } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

(SolaceDatePicker as React.FC & { displayName?: string }).displayName = "SolaceDatePicker";

export default {
	title: "Under Construction/SolaceDatePicker",
	component: SolaceDatePicker,
	parameters: {},
	argTypes: {}
} as Meta<typeof SolaceDatePicker>;

const Template: StoryFn<typeof SolaceDatePicker> = (args) => (
	<div>
		<SolaceDatePicker {...args} />
	</div>
);

export const UncontrolledDatePicker = {
	render: Template,
	args: {}
};

export const ControlledDatePicker = {
	render: Template,
	args: {
		value: "2022-01-01T00:00:00Z", // in ISO 8601 format
		onChange: action("Date Changed"),
		onClear: action("Cleared")
	}
};

export const ReadOnlyDatePicker = {
	render: Template,
	args: {
		value: "2022-01-01T00:00:00Z", // in ISO 8601 format
		disabled: true
	}
};
