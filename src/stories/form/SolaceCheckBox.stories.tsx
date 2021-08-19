import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SolaceCheckBox from "../../components/form/SolaceCheckBox";

export default {
	title: "Forms/SolaceCheckBox",
	component: SolaceCheckBox,
	parameters: {},
	argTypes: {}
} as ComponentMeta<typeof SolaceCheckBox>;

const Template: ComponentStory<typeof SolaceCheckBox> = (args) => <SolaceCheckBox {...args} />;

export const DefaultCheckbox = (args: any) => <SolaceCheckBox {...args} />;
