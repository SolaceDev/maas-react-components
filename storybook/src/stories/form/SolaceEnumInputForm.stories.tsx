import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceEnumInputForm } from "@SolaceDev/maas-react-components";

export default {
	title: "Forms/SolaceEnumValueInputForm",
	component: SolaceEnumInputForm,
	argTypes: {}
} as ComponentMeta<typeof SolaceEnumInputForm>;

const Template: ComponentStory<typeof SolaceEnumInputForm> = (args) => <SolaceEnumInputForm {...args} />;

export const DefaultForm = Template.bind({});
DefaultForm.args = {};
