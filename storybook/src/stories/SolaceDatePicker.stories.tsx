import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SolaceDatePicker } from "@SolaceDev/maas-react-components";

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
		onChange: (date: string | null) => console.log(date),
		onClear: () => console.log("Cleared")
	}
};
