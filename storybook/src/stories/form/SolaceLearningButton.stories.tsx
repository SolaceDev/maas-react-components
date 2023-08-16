import React, { ReactNode } from "react";
import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceLearningButton, DeleteIcon } from "@SolaceDev/maas-react-components";

enum VARIANT {
	LEARNING = "learning",
	LEARNING_ICON = "learning-icon",
	LEARNING_LIGHT = "learning-light"
}

export default {
	title: "Forms/SolaceLearningButton",
	component: SolaceLearningButton,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/P5XeF1KE6z2MKyzlEyInrH/Core-Component-Specs-(Copy)?node-id=1%3A2"
		},
		docs: {
			description: {
				component: "Button component for reuse in all Solace based applications"
			}
		}
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Unique identifier for the button"
		},
		variant: {
			options: ["learning", "learning-icon", "learning-light"],
			control: {
				type: "select"
			},
			description: "The type/style of button to render",
			table: {
				defaultValue: {
					summary: "text"
				}
			}
		},
		isDisabled: {
			control: { type: "boolean" },
			description: "Renders the button disabled",
			table: {
				defaultValue: {
					summary: false
				}
			}
		},
		title: {
			control: { type: "text" },
			description: "Text to use for tooltip and arial-label (assecibility)"
		},

		component: {
			options: ["button", "span"],
			control: { type: "select" },
			description: "The component used for the root node. Either a string to use a HTML element or a component button",
			table: {
				defaultValue: {
					summary: "button"
				}
			}
		},
		type: {
			options: ["button", "submit", "reset"],
			control: { type: "select" },
			description: "Attribute which specifies the type of button (button, submit or reset)",
			table: {
				defaultValue: {
					summary: "button"
				}
			}
		},
		startIcon: {
			description: "Element placed before the children"
		},
		endIcon: {
			description: "Element placed after the children"
		},
		onClick: {
			control: { type: "string" },
			description: "Optional click handler"
		},
		children: {
			control: { type: "object" },
			description: "Button label or contents"
		}
	}
} as ComponentMeta<typeof SolaceLearningButton>;

const Template: ComponentStory<typeof SolaceLearningButton> = (args) => <SolaceLearningButton {...args} />;

export const LearningButton = Template.bind({});
LearningButton.args = {
	onClick: action("callback"),
	variant: VARIANT.LEARNING,
	children: "Click Me!"
};

export const LearningButtonAndStartIcon = Template.bind({});
LearningButtonAndStartIcon.args = {
	onClick: action("callback"),
	variant: VARIANT.LEARNING,
	startIcon: <DeleteIcon />,
	children: "Start The Experience"
};

export const LearningButtonAndEndIcon = Template.bind({});
LearningButtonAndEndIcon.args = {
	onClick: action("callback"),
	variant: VARIANT.LEARNING,
	endIcon: <DeleteIcon />,
	children: "Start The Experience"
};

export const LearningLightButton = Template.bind({});
LearningLightButton.args = {
	onClick: action("callback"),
	variant: VARIANT.LEARNING_LIGHT,
	children: "Click Me!"
};

export const LearningLightButtonAndStartIcon = Template.bind({});
LearningLightButtonAndStartIcon.args = {
	onClick: action("callback"),
	variant: VARIANT.LEARNING_LIGHT,
	startIcon: <DeleteIcon />,
	children: "Delete"
};

export const LEARNING_ICON = Template.bind({});
LEARNING_ICON.args = {
	onClick: action("callback"),
	variant: VARIANT.LEARNING_ICON,
	title: "Delete",
	children: <DeleteIcon />
};
