import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SolaceButton from "../../components/form/SolaceButton";

export default {
	title: "Forms/SolaceButton",
	component: SolaceButton,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/P5XeF1KE6z2MKyzlEyInrH/Core-Component-Specs-(Copy)?node-id=1%3A2"
		}
	},
	argTypes: {
		variant: {
			control: { type: "radio" }
		}
	}
} as ComponentMeta<typeof SolaceButton>;

const Template: ComponentStory<typeof SolaceButton> = (args) => <SolaceButton {...args} />;

export const DefaultButton = (args: any) => <SolaceButton {...args}>Click Me!</SolaceButton>;
