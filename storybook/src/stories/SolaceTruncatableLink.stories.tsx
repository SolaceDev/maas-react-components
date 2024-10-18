import React from "react";
import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";
import { SolaceTruncatableLink, Box } from "@SolaceDev/maas-react-components";

export default {
	title: "Under Construction/SolaceTruncatableLink",
	component: SolaceTruncatableLink,
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Unique identifier for the component"
		},
		text: {
			control: { type: "text" },
			description: "This is the text that will be displayed in the button",
			table: {
				defaultValue: {
					summary: false
				}
			}
		},
		href: {
			control: { type: "text" },
			description: "URL to navigate in new tab while on click"
		},
		maxWidth: {
			control: { type: "text" },
			description: "This is the max width for the wrapper component"
		},
		marginRight: {
			control: { type: "text" },
			description: "This is the margin right for the wrapper component"
		},
		onClick: {
			control: { type: "string" },
			description: "Optional click handler"
		}
	}
} as Meta<typeof SolaceTruncatableLink>;

export const DefaultTruncatableLink = (): JSX.Element => {
	return (
		<Box width={"200px"}>
			<SolaceTruncatableLink
				id="defaultLink"
				text="This is a truncatable link with loooong name"
				onClick={action("callback")}
			/>
		</Box>
	);
};

export const TruncatableLinkOpenInNewTab = (): JSX.Element => {
	return (
		<div style={{ width: "200px" }}>
			<SolaceTruncatableLink
				id="defaultLink"
				text="This is a truncatable link with loooong name"
				href="https://solace.com"
			/>
		</div>
	);
};

export const TruncatableText = (): JSX.Element => {
	return (
		<Box width={"200px"}>
			<SolaceTruncatableLink id="defaultLink" text="This is a truncatable link with loooong name" />
		</Box>
	);
};
