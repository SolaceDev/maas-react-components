import React, { ReactNode } from "react";
import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceButton, DeleteIcon } from "@SolaceDev/maas-react-components";

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
	onClick: action("callback"),
	dataQa: "testDataProp",
	dataTags: "testDataTag1 testDataTag2",
	children: "Click Me!"
};

export const CallToActionButton = Template.bind({});
CallToActionButton.args = {
	onClick: action("callback"),
	variant: "call-to-action",
	children: "Click Me!"
};

export const OutlineButton = Template.bind({});
OutlineButton.args = {
	onClick: action("callback"),
	variant: "outline",
	children: "Click Me!"
};

export const TextButton = Template.bind({});
TextButton.args = {
	onClick: action("callback"),
	variant: "text",
	children: "Click Me!"
};

export const IconButton = Template.bind({});
IconButton.args = {
	onClick: action("callback"),
	variant: "icon",
	title: "Delete",
	children: <DeleteIcon />
};

export const LinkButton = Template.bind({});
LinkButton.args = {
	onClick: action("callback"),
	variant: "link",
	children: "Click Me!"
};

export const ExternalLinkButton = Template.bind({});
ExternalLinkButton.args = {
	variant: "link",
	href: "http://www.cnn.com",
	children: "Visit CNN"
};

export const ExternaLinkWithText = (): ReactNode => {
	return (
		<div>
			You can{" "}
			<SolaceButton variant="link" href="https://solace.com">
				learn more in the SSO documentation
			</SolaceButton>{" "}
			or just figure it out yourself.
		</div>
	);
};

export const WithStartIcon = Template.bind({});
WithStartIcon.args = {
	onClick: action("callback"),
	variant: "call-to-action",
	startIcon: <DeleteIcon />,
	children: "Delete"
};

export const WithEndIcon = Template.bind({});
WithEndIcon.args = {
	onClick: action("callback"),
	variant: "call-to-action",
	endIcon: <DeleteIcon />,
	children: "Delete"
};

export const FileUpload = (): ReactNode => {
	return (
		<label htmlFor="upload-photo">
			<input style={{ display: "none" }} id="upload-photo" name="upload-photo" type="file" />

			<SolaceButton variant="outline" component="span">
				Upload button
			</SolaceButton>
		</label>
	);
};
