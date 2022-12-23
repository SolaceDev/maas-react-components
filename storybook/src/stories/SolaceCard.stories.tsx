import React, { ReactNode } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceButton, SolaceCard } from "@SolaceDev/maas-react-components";

export default {
	title: "Under Construction/SolaceCard",
	component: SolaceCard,
	parameters: {},
	argTypes: {
		showCloseButton: {
			control: {
				type: "boolean"
			},
			description: "Whether to show the close button",
			table: {
				defaultValue: {
					summary: false
				}
			}
		},
		backgroundColor: {
			control: {
				type: "text"
			},
			description: "specify the background color",
			table: {
				defaultValue: {
					summary: "text"
				}
			}
		}
	}
} as ComponentMeta<typeof SolaceCard>;

const Template: ComponentStory<typeof SolaceCard> = (args) => <SolaceCard {...args} />;

const DefaultCardContent = (
	<div>
		<p>When do I use literals vs variables in my addresses?</p>
		<SolaceButton variant="link" href="#">
			Best Practices
		</SolaceButton>
	</div>
);

export const DefaultCard = Template.bind({});
DefaultCard.args = {
	children: DefaultCardContent
};

export const WithCloseButton = Template.bind({});
WithCloseButton.args = {
	children: DefaultCardContent,
	showCloseButton: true
};

export const WithStringTitle = Template.bind({});
WithStringTitle.args = {
	children: DefaultCardContent,
	showCloseButton: true,
	title: "How to make a Topic Domain"
};

const CustomTitle = (
	<div style={{ textDecoration: "underline", color: "#880808" }}>How to make a Topic Domain {"\u2728"} </div>
);

export const WithCustomTitle = Template.bind({});
WithCustomTitle.args = {
	children: DefaultCardContent,
	showCloseButton: true,
	title: CustomTitle
};

export const WithCustomBackgroundColor = Template.bind({});
WithCustomBackgroundColor.args = {
	children: DefaultCardContent,
	showCloseButton: true,
	title: "How to make a Topic Domain",
	backgroundColor: "#E6F2FF"
};

export const WithinContainer = (): ReactNode => {
	return (
		<div style={{ maxWidth: "40%", border: "1px solid rgba(0, 0, 0, 0.1)" }}>
			<SolaceCard showCloseButton={true} title="How to make a Topic Domain" dataQa="topicAddressCard">
				{DefaultCardContent}
			</SolaceCard>
		</div>
	);
};
