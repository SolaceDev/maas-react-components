import React from "react";
import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceButton, DeleteIcon } from "@solacedev/maas-react-components";

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

export const DefaultButton = Template.bind({});
DefaultButton.args = {
	onClick: action("default-button-clicked"),
	dataQa: "testDataProp",
	dataTags: "testDataTag1 testDataTag2",
	children: "Click Me!"
};

export const CallToActionButton = Template.bind({});
CallToActionButton.args = {
	onClick: action("call-to-action-button-clicked"),
	variant: "call-to-action",
	children: "Click Me!"
};

export const OutlineButton = Template.bind({});
OutlineButton.args = {
	onClick: action("outline-button-clicked"),
	variant: "outline",
	children: "Click Me!"
};

export const TextButton = Template.bind({});
TextButton.args = {
	onClick: action("text-button-clicked"),
	variant: "text",
	children: "Click Me!"
};

export const IconButton = Template.bind({});
IconButton.args = {
	onClick: action("icon-button-clicked"),
	variant: "icon",
	title: "Delete",
	children: <DeleteIcon />
};

export const LinkButton = Template.bind({});
LinkButton.args = {
	onClick: action("link-button-clicked"),
	variant: "link",
	children: "Click Me!"
};

export const ExternalLinkButton = Template.bind({});
ExternalLinkButton.args = {
	variant: "link",
	href: "http://www.cnn.com",
	children: "Visit CNN"
};

export const WithStartIcon = Template.bind({});
WithStartIcon.args = {
	onClick: action("button-clicked"),
	variant: "call-to-action",
	startIcon: <DeleteIcon />,
	children: "Delete"
};

export const WithEndIcon = Template.bind({});
WithEndIcon.args = {
	onClick: action("button-clicked"),
	variant: "call-to-action",
	endIcon: <DeleteIcon />,
	children: "Delete"
};
