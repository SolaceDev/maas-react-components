import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SolaceSelect from "../../components/form/SolaceSelect";
import { action } from "@storybook/addon-actions";

export default {
	title: "Forms/SolaceSelect",
	component: SolaceSelect,
	argTypes: {
		type: {
			control: {
				type: 'select'
			}
		}
	}
} as ComponentMeta<typeof SolaceSelect>;

const Template: ComponentStory<typeof SolaceSelect> = (args) => <SolaceSelect {...args} />;

export const DefaultTextfield = Template.bind({});
DefaultTextfield.args = {
	onChange: action("selection-changed"),
	title: "Demo Select",
	id: "demoSelectId",
	name: "demoSelect"
};

export const StackedLabeleFormat = Template.bind({});
StackedLabeleFormat.args = {
	onChange: action("selection-changed"),
	title: "Demo Select",
	name: "demoSelect",
	label: "Some Label"
};

export const InlineLabeleFormat = Template.bind({});
InlineLabeleFormat.args = {
	onChange: action("selection-changed"),
	name: "demoSelect",
	title: "Demo Select",
	label: "Some Label",
	isInlineLabel: true
};