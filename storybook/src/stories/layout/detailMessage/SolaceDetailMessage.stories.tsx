import React from "react";
import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";
import { SolaceDetailMessage } from "@SolaceDev/maas-react-components";
import NoAccessImg from "../../../resources/images/NoAccessBook";
import FailedFetch from "../../../resources/images/FailedFetch";
import ApiProducts from "../../../resources/images/ApiProducts";

(SolaceDetailMessage as React.FC & { displayName?: string }).displayName = "SolaceDetailMessage";

export default {
	title: "Layout/Empty State/Standard",
	component: SolaceDetailMessage,
	args: {
		id: "",
		hasWarnings: false,
		msgImg: undefined,
		title: "",
		details: "",
		actions: undefined
	},
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceDetailMessage"
			}
		}
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description:
				"Unique identifier for the detail message component. Used for accessibility and programmatic access.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		hasWarnings: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the detail message in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the detail message content.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		msgImg: {
			control: { type: "object" },
			description:
				"React element representing the message image or illustration. Use this to provide visual context for the detail message.",
			table: {
				type: { summary: "React.ReactElement | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		title: {
			control: { type: "text" },
			description:
				"The main heading text for the detail message. Use this to clearly communicate the message to the user.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		details: {
			control: { type: "text" },
			description: "Detailed content explaining the message. Can be a string or JSX element for rich content.",
			table: {
				type: { summary: "string | React.ReactNode | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		actions: {
			control: { type: "object" },
			description:
				"Array of button configurations or custom JSX element for action buttons. Use this to provide actionable options to the user.",
			table: {
				type: { summary: "Array<ButtonProps> | React.ReactElement | undefined" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceDetailMessage>;

const defaultButton = {
	id: "catalog-btn",
	variant: "call-to-action",
	children: "Go To Catalog",
	onClick: action("button-clicked")
};

export const NoAccessMessage = {
	args: {
		msgImg: <NoAccessImg />,
		title: "You do not have access to view this application domain",
		details: (
			<span>
				Contact the owner <strong>jdoe@mail.com</strong> for access
			</span>
		),
		actions: [defaultButton]
	}
};

export const FailedFetchMessage = {
	args: {
		msgImg: <FailedFetch />,
		title: "Unable to retreive data",
		details: "Something went wrong. Please try again later",
		actions: [defaultButton]
	}
};

export const NoImageMessage = {
	args: {
		title: "No Image Message",
		details: "Hey, this message has no image",
		actions: [defaultButton]
	}
};

export const NoTitleMessage = {
	args: {
		msgImg: <ApiProducts />,
		details: "Somebody stole my title!!!",
		actions: [defaultButton]
	}
};

export const NoDetailsMessage = {
	args: {
		msgImg: <ApiProducts />,
		title: "Ha ... I Only Have A Title and Button",
		actions: [defaultButton]
	}
};

export const NoActionsMessage = {
	args: {
		msgImg: <ApiProducts />,
		title: "Actionless Jackson",
		details: "Where my buttons at???"
	}
};

export const MultiActionMessage = {
	args: {
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
	}
};

export const CustomActionMessage = {
	args: {
		msgImg: <FailedFetch />,
		title: "Something went wrong",
		details: "This is a custom action JSX.Element!",
		actions: <h1>This is a custom action!</h1>
	}
};

export const CustomDetailsMessage = {
	args: {
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
		actions: [defaultButton]
	}
};
