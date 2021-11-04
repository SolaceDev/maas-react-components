import React from "react";
import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceDetailMessage } from "@SolaceDev/maas-react-components";
import NoAccessImg from "../resources/images/NoAccessBook";
import FailedFetch from "../resources/images/FailedFetch";
import ApiProducts from "../resources/images/ApiProducts";

export default {
	title: "Under Construction/SolaceDetailMessage",
	component: SolaceDetailMessage,
	parameters: {},
	argTypes: {}
} as ComponentMeta<typeof SolaceDetailMessage>;

const Template: ComponentStory<typeof SolaceDetailMessage> = (args) => <SolaceDetailMessage {...args} />;

export const NoAccessMessage = Template.bind({});
NoAccessMessage.args = {
	msgImg: <NoAccessImg />,
	title: "You do not have access to view this application domain",
	details: (
		<span>
			Contact the owner <strong>jdoe@mail.com</strong> for access
		</span>
	),
	actions: [
		{
			id: "catalog-btn",
			variant: "call-to-action",
			children: "Go To Catalog",
			onClick: action("button-clicked")
		}
	]
};

export const FailedFetchMessage = Template.bind({});
FailedFetchMessage.args = {
	msgImg: <FailedFetch />,
	title: "Unable to retreive data",
	details: "Something went wrong. Please try again later",
	actions: [
		{
			id: "catalog-btn",
			variant: "call-to-action",
			children: "Go To Catalog",
			onClick: action("button-clicked")
		}
	]
};

export const NoImageMessage = Template.bind({});
NoImageMessage.args = {
	title: "No Image Message",
	details: "Hey, this message has no image",
	actions: [
		{
			id: "catalog-btn",
			variant: "call-to-action",
			children: "Go To Catalog",
			onClick: action("button-clicked")
		}
	]
};

export const NoTitleMessage = Template.bind({});
NoTitleMessage.args = {
	msgImg: <ApiProducts />,
	details: "Somebody stole my title!!!",
	actions: [
		{
			id: "catalog-btn",
			variant: "call-to-action",
			children: "Go To Catalog",
			onClick: action("button-clicked")
		}
	]
};

export const NoActionsMessage = Template.bind({});
NoActionsMessage.args = {
	msgImg: <ApiProducts />,
	title: "Actionless Jackson",
	details: "Where my buttons at???"
};

export const MultiActionMessage = Template.bind({});
MultiActionMessage.args = {
	msgImg: <FailedFetch />,
	title: "Something went wrong",
	details: "Don't worry, I'll give you multiple choices to choose from...",
	actions: [
		{
			id: "cnn-btn",
			variant: "text",
			children: "I'm Outta Here",
			onClick: action("cnn-button-clicked")
		},
		{
			id: "try-again-btn",
			variant: "outline",
			children: "Try Again",
			onClick: action("try-again-button-clicked")
		},
		{
			id: "catalog-btn",
			variant: "call-to-action",
			children: "Go To Catalog",
			onClick: action("catalog-button-clicked")
		}
	]
};

export const CustomDetailsMessage = Template.bind({});
CustomDetailsMessage.args = {
	msgImg: <NoAccessImg />,
	title: "Title text for message with custom detail content",
	details: (
		<>
			Details section with some custom text above a custom table
			<table style={{ border: "1px solid #000", width: "100%", marginTop: "8px" }}>
				<tr style={{ backgroundColor: "lightGrey" }}>
					<th>Column 1</th>
					<th>Column 2</th>
				</tr>
				<tr>
					<td style={{ borderRight: "1px solid #000" }}>content for column 1, row 1</td>
					<td>content for column 2, row 1</td>
				</tr>
			</table>
		</>
	),
	actions: [
		{
			id: "catalog-btn",
			variant: "call-to-action",
			children: "Go To Catalog",
			onClick: action("button-clicked")
		}
	]
};
