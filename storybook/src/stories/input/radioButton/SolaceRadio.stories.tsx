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
import { Meta, StoryFn } from "@storybook/react";

import { SolaceRadio, SolaceRadioGroup } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

(SolaceRadio as React.FC & { displayName?: string }).displayName = "SolaceRadio";

export default {
	title: "Input/Radio Button",
	component: SolaceRadio,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=2931%3A22385"
		}
	},
	argTypes: {
		label: {
			control: {
				type: "text"
			},
			description:
				"The label text displayed next to the radio button. Use this to clearly describe what this radio option represents. Labels should be concise and descriptive.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		subText: {
			control: {
				type: "text"
			},
			description:
				"Additional descriptive text displayed below the main label. Use this to provide more context or explanation for the radio option.",
			table: {
				type: { summary: "string | React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		helperText: {
			control: {
				type: "text"
			},
			description:
				"Helper text displayed below the radio group to provide guidance or error messages. Use this to give users context about the selection or validation requirements.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		hasErrors: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the radio button in an error state with red styling. Use this to indicate validation failures. Often paired with error text in helperText.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		required: {
			control: {
				type: "boolean"
			},
			description:
				"If true, marks the radio group as required and displays an asterisk (*) next to the label. Use this to indicate mandatory selections in forms.",
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
				"If true, disables the radio button preventing user interaction. Use this when the option is not applicable based on current form state or user permissions.",
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
				"If true, makes the radio button read-only. Users can see the selected state but cannot change it. Use this for displaying computed values or information that shouldn't be modified.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		checked: {
			control: {
				type: "boolean"
			},
			description:
				"Controls the checked state of the radio button. Use this for controlled components where you manage the radio state externally. Should be paired with an onChange handler.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		defaultChecked: {
			control: {
				type: "boolean"
			},
			description:
				"The default checked state for uncontrolled components. Use this when you want to set an initial checked state but don't need to control it.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		largeLabel: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the label text in a larger font size. Use this for prominent radio options or when you need better readability.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		lightSubText: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the subtext in a lighter color. Use this to de-emphasize secondary information while still providing context.",
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
				"The value attribute for the radio button. This is the value that will be selected when this radio option is chosen.",
			table: {
				type: { summary: "string | number" },
				defaultValue: { summary: "undefined" }
			}
		},
		name: {
			control: {
				type: "text"
			},
			description:
				"The name attribute for the radio button, used for form submission and grouping. Radio buttons with the same name form a group where only one can be selected.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		id: {
			control: {
				type: "text"
			},
			description:
				"Unique identifier for the radio button. Used to associate the label with the input for accessibility and to reference the field programmatically.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		title: {
			control: {
				type: "text"
			},
			description:
				"The title attribute for the radio button, displayed as a tooltip on hover. Use this for additional context or instructions that don't fit in the label.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		inline: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays radio buttons in a horizontal row instead of vertically stacked. Use this for compact layouts when you have limited vertical space.",
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
				"If true, displays the group label inline with the radio options rather than above them. Use this for compact layouts or when you need to save vertical space.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		stackLabel: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the group label above the radio options in a stacked layout. This is the default behavior for radio groups.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" }
			}
		},
		bold: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the group label in bold font weight. Use this to emphasize important radio groups or primary selections.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		large: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the group label in a larger font size. Use this for prominent radio groups or when you need better readability.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		onChange: {
			description:
				"Callback function fired when the radio selection changes. Receives an event object with the new selected value. Essential for controlled components and form state management."
		},
		onBlur: {
			description:
				"Callback function fired when the radio button loses focus. Use this for validation or other actions that should occur when the user finishes selecting."
		},
		onFocus: {
			description:
				"Callback function fired when the radio button gains focus. Use this for analytics or other actions that should occur when the user interacts with the field."
		},
		children: {
			description:
				"Content to be rendered inside the radio component. This can be used to add custom content or icons alongside the radio button.",
			table: {
				type: { summary: "React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify the radio button during automated testing.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data attribute for additional tagging. Use this for analytics, tracking, or additional metadata.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceRadio>;

const RADIOS: Array<React.ReactNode> = [];
RADIOS.push(<SolaceRadio key="option1" name="option1" value="option1" label="Option 1" readOnly={false} />);
RADIOS.push(<SolaceRadio key="option2" name="option2" value="option2" label="Option 2" readOnly={false} />);
RADIOS.push(<SolaceRadio key="option3" name="option3" value="option3" label="Option 3" readOnly={false} />);

const RADIO_GROUP = {
	title: "Demo RadioGroup",
	name: "demoRadioGroup",
	id: "demoRadioGroupId",
	value: "option1",
	children: RADIOS,
	onChange: action("callback")
};

const LABELLED_RADIO_GROUP = {
	...RADIO_GROUP,
	label: "Some Label"
};

const title = "Demo Radio";
const label = "Inline Label";

const RadioTemplate: StoryFn<typeof SolaceRadio> = (args) => <SolaceRadio {...args} />;
const RadioGroupTemplate: StoryFn<typeof SolaceRadioGroup> = (args) => <SolaceRadioGroup {...args} />;

export const DefaultRadio = RadioTemplate.bind({});
RadioTemplate.args = {
	onChange: action("callback"),
	title: title,
	id: "demoRadioId",
	name: "demoRadio",
	value: "someValue"
};

export const Labeled = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoRadioId",
		name: "demoRadio",
		label: "Inline label",
		value: "someValue"
	}
};

export const SubText = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoRadioId",
		name: "demoRadio",
		label: "Header text",
		subText: "Subtext subtext",
		value: "someValue"
	}
};

export const LightSubText = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoRadioId",
		name: "demoRadio",
		label: "Header text",
		subText: "Subtext subtext",
		lightSubText: true,
		value: "someValue"
	}
};

function buildSubText() {
	return (
		<span>
			Runtime Discovery is used to import your architecture into the <i>PubSub+ Discovery</i>
		</span>
	);
}

export const LargeLabelAndCustomSubText = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoRadioId",
		name: "demoRadio",
		label: "Import to Event Portal",
		subText: buildSubText(),
		value: "someValue",
		largeLabel: true,
		disabled: false
	}
};

export const Required = {
	args: {
		onChange: action("callback"),
		name: "demoRadio",
		title: "Demo Checkbox",
		label: label,
		required: true,
		value: "someValue"
	}
};

export const Disabled = {
	args: {
		onChange: action("callback"),
		name: "demoRadio",
		title: title,
		label: label,
		checked: true,
		disabled: true,
		value: "someValue"
	}
};

export const ReadOnly = {
	args: {
		onChange: action("callback"),
		name: "demoRadio",
		title: title,
		label: label,
		checked: true,
		readOnly: true,
		value: "someValue"
	}
};

// Radio Group Tests

export const DefaultRadioGroup = RadioGroupTemplate.bind({});
DefaultRadioGroup.args = { ...RADIO_GROUP };

export const InlineRadioGroup = RadioGroupTemplate.bind({});
InlineRadioGroup.args = { ...RADIO_GROUP, inline: true };

export const StackedLabelFormat = RadioGroupTemplate.bind({});
StackedLabelFormat.args = {
	...LABELLED_RADIO_GROUP,
	stackLabel: true
};

export const WithLargeStackLabel = RadioGroupTemplate.bind({});
WithLargeStackLabel.args = {
	...LABELLED_RADIO_GROUP,
	stackLabel: true,
	large: true
};

export const WithBoldStackLabel = RadioGroupTemplate.bind({});
WithBoldStackLabel.args = {
	...LABELLED_RADIO_GROUP,
	stackLabel: true,
	bold: true
};

export const InlineLabelFormat = RadioGroupTemplate.bind({});
InlineLabelFormat.args = {
	...LABELLED_RADIO_GROUP,
	inlineLabel: true
};

const RADIOS_WITH_HELPER: Array<React.ReactNode> = [];
RADIOS_WITH_HELPER.push(
	<SolaceRadio
		key="option1"
		name="option1"
		value="option1"
		label="Import to Event Portal"
		subText={buildSubText()}
		largeLabel={true}
		readOnly={false}
	/>
);
RADIOS_WITH_HELPER.push(
	<SolaceRadio
		key="option2"
		name="option2"
		value="option2"
		label="Topic Subscriptions Analysis"
		subText="Topic Scans are used in the PubSub+ Topic Explorer to analyze your runtime data"
		largeLabel={true}
		readOnly={false}
	/>
);

export const HelperText = RadioGroupTemplate.bind({});
HelperText.args = {
	...LABELLED_RADIO_GROUP,
	label: "Select the discovery type and fill the form to start a scan",
	helperText: "Some group helper text here",
	children: RADIOS_WITH_HELPER
};

const RADIOS_WITH_LIGHT_SUBTEXT: Array<React.ReactNode> = [];
RADIOS_WITH_LIGHT_SUBTEXT.push(
	<SolaceRadio
		key="option1"
		name="option1"
		value="option1"
		label="Option 1"
		subText="This is a regular subText for Option 1"
		largeLabel={true}
		readOnly={false}
	/>
);
RADIOS_WITH_LIGHT_SUBTEXT.push(
	<SolaceRadio
		key="option2"
		name="option2"
		value="option2"
		label="Option 2"
		subText="This is a light subText for Option 2"
		largeLabel={true}
		lightSubText={true}
		readOnly={false}
	/>
);

export const LightSubtext = RadioGroupTemplate.bind({});
LightSubtext.args = {
	...LABELLED_RADIO_GROUP,
	label: "Select the discovery type and fill the form to start a scan",
	children: RADIOS_WITH_LIGHT_SUBTEXT
};

export const WithErrors = RadioGroupTemplate.bind({});
WithErrors.args = {
	...LABELLED_RADIO_GROUP,
	hasErrors: true,
	helperText: "Some error occured"
};

export const RequiredRadioGroup = RadioGroupTemplate.bind({});
RequiredRadioGroup.args = {
	...LABELLED_RADIO_GROUP,
	required: true
};

const DISABLED_RADIOS: Array<React.ReactNode> = [];
DISABLED_RADIOS.push(
	<SolaceRadio key="option1" value="option1" disabled={true} name="option1" label="Option 1" readOnly={false} />
);
DISABLED_RADIOS.push(
	<SolaceRadio key="option2" value="option2" disabled={true} name="option2" label="Option 2" readOnly={false} />
);
DISABLED_RADIOS.push(
	<SolaceRadio key="option3" value="option3" disabled={true} name="option3" label="Option 3" readOnly={false} />
);

export const DisabledRadioGroup = RadioGroupTemplate.bind({});
DisabledRadioGroup.args = {
	...LABELLED_RADIO_GROUP,
	value: "option2",
	disabled: true,
	children: DISABLED_RADIOS
};
