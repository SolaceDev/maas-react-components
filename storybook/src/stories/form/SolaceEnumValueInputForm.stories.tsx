import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceEnumValueInputForm } from "@SolaceDev/maas-react-components";

export default {
	title: "Forms/SolaceEnumValueInputForm",
	component: SolaceEnumValueInputForm,
	argTypes: {}
} as ComponentMeta<typeof SolaceEnumValueInputForm>;

const Template: ComponentStory<typeof SolaceEnumValueInputForm> = (args) => <SolaceEnumValueInputForm {...args} />;

export const DefaultForm = Template.bind({});
DefaultForm.args = {};
