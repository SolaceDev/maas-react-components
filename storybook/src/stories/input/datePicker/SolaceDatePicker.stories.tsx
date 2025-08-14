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
/* eslint-disable sonarjs/no-duplicate-string */
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
		value: {
			control: { type: "text" },
			description:
				"The current date value in ISO 8601 format (e.g., '2025-05-12T00:00:00Z'). Use this for controlled components where you manage the date state externally. Should be paired with an onChange handler.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		defaultValue: {
			control: { type: "text" },
			description:
				"The default date value for uncontrolled components in ISO 8601 format. Use this when you want to set an initial date but don't need to control the state.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		variant: {
			options: [SolaceDatePickerVariant.FORMAT_YEAR_MONTH_DAY, SolaceDatePickerVariant.FORMAT_MONTH_YEAR],
			control: { type: "select" },
			description:
				"The display format variant of the date picker. Use FORMAT_YEAR_MONTH_DAY for full date selection or FORMAT_MONTH_YEAR for month/year only selection.",
			table: {
				type: { summary: "SolaceDatePickerVariant | undefined" },
				defaultValue: { summary: "FORMAT_YEAR_MONTH_DAY" }
			}
		},
		timezone: {
			control: { type: "text" },
			description:
				"The timezone to use for date calculations (e.g., 'UTC', 'America/New_York'). Use this to ensure dates are displayed and calculated in the correct timezone context.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "browser timezone" }
			}
		},
		label: {
			control: { type: "text" },
			description:
				"The label text displayed above the date picker field. Use this to clearly describe what date the user is selecting. Labels should be concise and descriptive.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		helperText: {
			control: { type: "text" },
			description:
				"Additional text displayed below the date picker to provide guidance or error messages. Use this to give users context about date requirements or validation rules.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		hasErrors: {
			control: { type: "boolean" },
			description:
				"If true, displays the date picker in an error state with red styling. Use this to indicate validation failures. Often paired with error text in helperText.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		required: {
			control: { type: "boolean" },
			description:
				"If true, marks the date picker as required and displays an asterisk (*) next to the label. Use this to indicate mandatory date fields in forms.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		disabled: {
			control: { type: "boolean" },
			description:
				"If true, disables the date picker preventing user interaction. Use this when the date field is not applicable based on current form state or user permissions.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		readOnly: {
			control: { type: "boolean" },
			description:
				"If true, makes the date picker read-only. Users can see the selected date but cannot change it. Use this for displaying computed dates or information that shouldn't be modified.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		disableFuture: {
			control: { type: "boolean" },
			description:
				"If true, disables future dates from being selected. Use this for date fields where only past or current dates are valid, such as birth dates or historical events.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		disablePast: {
			control: { type: "boolean" },
			description:
				"If true, disables past dates from being selected. Use this for date fields where only future or current dates are valid, such as event scheduling or deadlines.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		minDate: {
			control: { type: "text" },
			description:
				"The minimum selectable date in ISO 8601 format. Use this to restrict date selection to a specific range, ensuring users can only select valid dates.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		maxDate: {
			control: { type: "text" },
			description:
				"The maximum selectable date in ISO 8601 format. Use this to restrict date selection to a specific range, ensuring users can only select valid dates.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		placeholder: {
			control: { type: "text" },
			description:
				"Placeholder text displayed when no date is selected. Use this to provide guidance about the expected date format or selection instructions.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		name: {
			control: { type: "text" },
			description:
				"The name attribute for the date picker, used for form submission and accessibility. Essential for proper form handling and assistive technology support.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		id: {
			control: { type: "text" },
			description: "Unique identifier for the date picker component. Used for accessibility and programmatic access.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		hasWarnings: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the date picker in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the date selection.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		onChange: {
			description:
				"Callback function fired when the date selection changes. Receives the new date value in ISO 8601 format. Essential for controlled components and form state management."
		},
		onClear: {
			description:
				"Callback function fired when the date is cleared. Use this to handle clearing actions and update form state appropriately."
		},
		onBlur: {
			description:
				"Callback function fired when the date picker loses focus. Use this for validation or other actions that should occur when the user finishes date selection."
		},
		onFocus: {
			description:
				"Callback function fired when the date picker gains focus. Use this for tracking user interaction or showing additional UI elements."
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify the date picker during automated testing.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data attribute for additional tagging. Use this for analytics, tracking, or additional metadata.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
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
