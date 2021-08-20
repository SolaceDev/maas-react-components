import React from "react";
import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SolaceSelect from "../../components/form/SolaceSelect";

export default {
	title: "Forms/SolaceSelect",
	component: SolaceSelect,
	argTypes: {}
} as ComponentMeta<typeof SolaceSelect>;

const Template: ComponentStory<typeof SolaceSelect> = (args) => <SolaceSelect {...args} />;

export const DefaultSelect = Template.bind({});
DefaultSelect.args = {
	id: "demoSelect",
	onChange: action("new-selection")
};
