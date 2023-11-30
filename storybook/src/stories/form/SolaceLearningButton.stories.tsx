import React, { ReactNode } from "react";
import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";
import { SolaceLearningButton, DeleteIcon, Box } from "@SolaceDev/maas-react-components";

enum VARIANT {
	LEARNING = "learning",
	LEARNING_ICON = "learning-icon",
	LEARNING_LIGHT = "learning-light",
	LEARNING_LIGHT_OUTLINED = "learning-light-outlined"
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
			options: ["learning", "learning-icon", "learning-light", "learning-light-outlined"],
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
} as Meta<typeof SolaceLearningButton>;

export const LearningButton = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.LEARNING,
		children: "Click Me!"
	}
};

export const LearningButtonAndStartIcon = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.LEARNING,
		startIcon: <DeleteIcon />,
		children: "Start The Experience"
	}
};

export const LearningButtonAndEndIcon = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.LEARNING,
		endIcon: <DeleteIcon />,
		children: "Start The Experience"
	}
};

export const LearningLightButton = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.LEARNING_LIGHT,
		children: "Click Me!"
	}
};

export const LearningLightButtonAndStartIcon = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.LEARNING_LIGHT,
		startIcon: <DeleteIcon />,
		children: "Delete"
	}
};

export const LearningLightOutlinedButton = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.LEARNING_LIGHT_OUTLINED,
		children: "Click Me!"
	}
};

export const LearningLightOutlinedAndStartIcon = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.LEARNING_LIGHT_OUTLINED,
		startIcon: <DeleteIcon />,
		children: "Delete"
	}
};

export const LearningIcon = (): ReactNode => {
	return (
		<Box sx={{ backgroundColor: "#033A6F" }} width={100} textAlign={"center"}>
			<SolaceLearningButton variant="learning-icon" component="span">
				<DeleteIcon />
			</SolaceLearningButton>
		</Box>
	);
};
