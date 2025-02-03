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
		},
		docs: {
			description: {
				component: "Code component name: SolaceRadio"
			}
		}
	},
	argTypes: {
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
		largeLabel: {
			control: {
				type: "boolean"
			}
		},
		lightSubText: {
			control: {
				type: "boolean"
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
