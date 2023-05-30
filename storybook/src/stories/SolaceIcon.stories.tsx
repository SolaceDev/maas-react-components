import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceIcon } from "@SolaceDev/maas-react-components";
import { Icons } from "@solacedev/maas-icons";

export default {
	title: "Under Construction/SolaceIcon",
	component: SolaceIcon,
	parameters: {},
	argTypes: {
		name: {
			options: Object.values(Icons),
			control: {
				type: "select"
			}
		},
		color: {
			options: [
				"inherit",
				"action",
				"disabled",
				"primary",
				"secondary",
				"error",
				"info",
				"success",
				"warning",
				"string"
			],
			control: {
				type: "select"
			}
		},
		fontSize: {
			options: ["inherit", "large", "medium", "small", "string"],
			control: {
				type: "select"
			}
		},
		classes: {
			control: {
				type: "object"
			},
			description: "Override or extend the styles applied to the component. See CSS API below for more details."
		}
	}
} as ComponentMeta<typeof SolaceIcon>;

const Template: ComponentStory<typeof SolaceIcon> = (args) => <SolaceIcon {...args} />;

export const AddIcon = Template.bind({});
AddIcon.args = {
	name: Icons.add_24
};

export const AddIconWithTheme = Template.bind({});
AddIconWithTheme.args = {
	name: Icons.add_24,
	color: "primary"
};
