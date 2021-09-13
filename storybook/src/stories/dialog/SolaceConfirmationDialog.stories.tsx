import React from "react";
import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceConfirmationDialog } from "@SolaceDev/maas-react-components";

export default {
	title: "Dialogs/SolaceConfirmationDialog",
	component: SolaceConfirmationDialog,
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
} as ComponentMeta<typeof SolaceConfirmationDialog>;

const Template: ComponentStory<typeof SolaceConfirmationDialog> = (args) => <SolaceConfirmationDialog {...args} />;

export const DefaultDialog = Template.bind({});
DefaultDialog.args = {
	title: "Test Dialog",
	contentText: "Please ensure you complete all mandatory fields",
	isOpen: true,
	actions: [
		{
			label: "Cancel",
			onClick: action("cancel-callback")
		},
		{
			label: "Ok",
			onClick: action("ok-callback"),
			variant: "outline"
		}
	]
};
