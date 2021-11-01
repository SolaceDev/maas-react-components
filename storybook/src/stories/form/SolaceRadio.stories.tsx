import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceRadio } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

export default {
	title: "Forms/SolaceRadio",
	component: SolaceRadio,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=2931%3A22385"
		}
	},
	argTypes: {
		isRequired: {
			control: {
				type: "boolean"
			}
		},
		isDisabled: {
			control: {
				type: "boolean"
			}
		},
		isLargeLabel: {
			control: {
				type: "boolean"
			}
		}
	}
} as ComponentMeta<typeof SolaceRadio>;

const Template: ComponentStory<typeof SolaceRadio> = (args) => <SolaceRadio {...args} />;

export const DefaultRadio = Template.bind({});
DefaultRadio.args = {
	onChange: action("callback"),
	title: "Demo Radio",
	id: "demoRadioId",
	name: "demoRadio",
	value: "someValue"
};

export const Labeled = Template.bind({});
Labeled.args = {
	onChange: action("callback"),
	title: "Demo Radio",
	id: "demoRadioId",
	name: "demoRadio",
	label: "Inline label",
	value: "someValue"
};

export const SubText = Template.bind({});
SubText.args = {
	onChange: action("callback"),
	title: "Demo Radio",
	id: "demoRadioId",
	name: "demoRadio",
	label: "Header text",
	subText: "Subtext subtext",
	value: "someValue"
};

function buildSubText() {
	return (
		<span>
			Runtime Discovery is used to import your architecture into the <i>PubSub+ Discovery</i>
		</span>
	);
}
export const LargeLabelAndCustomSubText = Template.bind({});
LargeLabelAndCustomSubText.args = {
	onChange: action("callback"),
	title: "Demo Radio",
	id: "demoRadioId",
	name: "demoRadio",
	label: "Import to Event Portal",
	subText: buildSubText(),
	value: "someValue",
	isLargeLabel: true,
	isDisabled: false
};

export const Required = Template.bind({});
Required.args = {
	onChange: action("callback"),
	name: "demoRadio",
	title: "Demo Checkbox",
	label: "Inline Label",
	isRequired: true,
	value: "someValue"
};

export const Disabled = Template.bind({});
Disabled.args = {
	onChange: action("callback"),
	name: "demoRadio",
	title: "Demo Radio",
	label: "Inline Label",
	isChecked: true,
	isDisabled: true,
	value: "someValue"
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
	onChange: action("callback"),
	name: "demoRadio",
	title: "Demo Radio",
	label: "Inline Label",
	isChecked: true,
	readOnly: true,
	value: "someValue"
};
