import React, { Children } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceRadio, SolaceRadioGroup } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

export default {
	title: "Forms/SolaceRadioGroup",
	component: SolaceRadioGroup,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=2931%3A22385"
		}
	},
	argTypes: {}
} as ComponentMeta<typeof SolaceRadioGroup>;

const Template: ComponentStory<typeof SolaceRadioGroup> = (args) => <SolaceRadioGroup {...args} />;

const RADIOS: Array<React.ReactNode> = [];
RADIOS.push(<SolaceRadio key="option1" name="option1" value="option1" label="Option 1" />);
RADIOS.push(<SolaceRadio key="option2" name="option2" value="option2" label="Option 2" />);
RADIOS.push(<SolaceRadio key="option3" name="option3" value="option3" label="Option 3" />);

export const DefaultRadioGroup = Template.bind({});
DefaultRadioGroup.args = {
	onChange: action("callback"),
	title: "Demo RadioGroup",
	name: "demoRadioGroup",
	value: "option1",
	children: RADIOS
};

export const StackedLabelFormat = Template.bind({});
StackedLabelFormat.args = {
	onChange: action("callback"),
	title: "Demo RadioGroup",
	id: "demoRadioGroupId",
	name: "demoRadioGroup",
	label: "Some Label",
	value: "option1",
	children: RADIOS
};

export const InlineLabelFormat = Template.bind({});
InlineLabelFormat.args = {
	onChange: action("callback"),
	title: "Demo RadioGroup",
	id: "demoRadioGroupId",
	name: "demoRadioGroup",
	label: "Some Label",
	isInlineLabel: true,
	value: "option1",
	children: RADIOS
};

function buildSubText() {
	return (
		<div>
			Runtime Discovery is used to import your architecture into the{" "}
			<a href="#" style={{ color: "#00c895", textDecoration: "none" }}>
				PubSub+ Discovery
			</a>
		</div>
	);
}

const RADIOS_WITH_HELPER: Array<React.ReactNode> = [];
RADIOS_WITH_HELPER.push(
	<SolaceRadio
		key="option1"
		name="option1"
		value="option1"
		label="Import to Event Portal"
		subText={buildSubText()}
		isLargeLabel={true}
	/>
);
RADIOS_WITH_HELPER.push(
	<SolaceRadio
		key="option2"
		name="option2"
		value="option2"
		label="Topic Subscriptions Analysis"
		subText="Topic Scans are used in the PubSub+ Topic Explorer to analyze your runtime data"
		isLargeLabel={true}
	/>
);

export const HelperText = Template.bind({});
HelperText.args = {
	onChange: action("callback"),
	title: "Demo RadioGroup",
	id: "demoRadioGroupId",
	name: "demoRadioGroup",
	label: "Some Label",
	helperText: "Some group helper text here",
	value: "option1",
	children: RADIOS_WITH_HELPER
};

export const WithErrors = Template.bind({});
WithErrors.args = {
	onChange: action("callback"),
	title: "Demo RadioGroup",
	id: "demoRadioGroupId",
	name: "demoRadioGroup",
	label: "Some Label",
	hasErrors: true,
	helperText: "Some error occured",
	value: "option1",
	children: RADIOS
};

export const Required = Template.bind({});
Required.args = {
	onChange: action("callback"),
	name: "demoRadioGroup",
	title: "Demo RadioGroup",
	label: "Some Label",
	value: "option1",
	isRequired: true,
	children: RADIOS
};

const DISABLED_RADIOS: Array<React.ReactNode> = [];
DISABLED_RADIOS.push(<SolaceRadio key="option1" value="option1" isDisabled={true} name="option1" label="Option 1" />);
DISABLED_RADIOS.push(<SolaceRadio key="option2" value="option2" isDisabled={true} name="option2" label="Option 2" />);
DISABLED_RADIOS.push(<SolaceRadio key="option3" value="option3" isDisabled={true} name="option3" label="Option 3" />);

export const Disabled = Template.bind({});
Disabled.args = {
	onChange: action("callback"),
	name: "demoRadioGroup",
	title: "Demo RadioGroup",
	label: "Some Label",
	value: "option2",
	isDisabled: true,
	children: DISABLED_RADIOS
};
