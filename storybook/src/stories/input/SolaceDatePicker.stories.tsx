import React from "react";
import { Decorator, StoryFn, Meta } from "@storybook/react";
import { SolaceDatePicker, SolaceDatePickerVariant } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/test";

(SolaceDatePicker as React.FC & { displayName?: string }).displayName = "SolaceDatePicker";

const DateStringInISOFormat = "2025-05-12T00:00:00Z";
const UTC_TIMEZONE = "UTC";
const DATE_CHANGED_EVENT = "Date Changed";
const CLEARED_EVENT = "Cleared";

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
	title: "Input/Date Picker/Standard",
	component: SolaceDatePicker,
	properties: {
		docs: {
			description: {
				component: "Code component name: SolaceDatePicker"
			}
		}
	},
	argTypes: {
		variant: {
			options: [SolaceDatePickerVariant.FORMAT_YEAR_MONTH_DAY, SolaceDatePickerVariant.FORMAT_MONTH_YEAR],
			control: { type: "select" }
		},
		disableFuture: {
			control: { type: "boolean" }
		}
	},
	decorators: [withSnapshotContainer]
} as Meta<typeof SolaceDatePicker>;

export const DefaultSolaceDatePicker = {
	args: {
		value: DateStringInISOFormat, // in ISO 8601 format
		onChange: action(DATE_CHANGED_EVENT),
		onClear: action(CLEARED_EVENT)
	},
	decorators: [withSnapshotContainer],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const triggerElement = canvas.getByTestId("CalendarIcon");
		await userEvent.click(triggerElement);
	}
};

const Template: StoryFn<typeof SolaceDatePicker> = (args) => (
	<div>
		<SolaceDatePicker {...args} />
	</div>
);

export const UncontrolledDatePicker = {
	render: Template,
	decorators: [withSnapshotContainer],
	args: {}
};

export const DatePickerWithTimezoneUTC = {
	render: Template,
	decorators: [withSnapshotContainer],
	args: {
		value: DateStringInISOFormat,
		timezone: UTC_TIMEZONE,
		onChange: action(DATE_CHANGED_EVENT)
	}
};

export const DatePickerWithFutureDateDisabled = {
	render: Template,
	decorators: [withSnapshotContainer],
	args: {
		value: DateStringInISOFormat,
		disableFuture: true,
		timezone: UTC_TIMEZONE,
		onChange: action(DATE_CHANGED_EVENT)
	}
};

export const ControlledDatePicker = {
	render: Template,
	decorators: [withSnapshotContainer],
	args: {
		value: DateStringInISOFormat, // in ISO 8601 format
		onChange: action(DATE_CHANGED_EVENT),
		onClear: action(CLEARED_EVENT)
	}
};

export const ReadOnlyDatePicker = {
	render: Template,
	decorators: [withSnapshotContainer],
	args: {
		value: DateStringInISOFormat, // in ISO 8601 format
		disabled: true
	}
};

export const MonthYearDatePicker = {
	render: Template,
	args: {
		value: DateStringInISOFormat,
		variant: SolaceDatePickerVariant.FORMAT_MONTH_YEAR
	},
	decorators: [withSnapshotContainer],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const triggerElement = canvas.getByTestId("CalendarIcon");
		await userEvent.click(triggerElement);
	}
};
