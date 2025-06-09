import React from "react";
import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { SolaceLearningButton, DeleteIcon } from "@SolaceDev/maas-react-components";

(SolaceLearningButton as React.FC & { displayName?: string }).displayName = "SolaceLearningButton";

enum VARIANT {
	CALL_TO_ACTION = "call-to-action",
	ICON = "icon",
	DARK_CALL_TO_ACTION = "dark-call-to-action",
	DARK_OUTLINE = "dark-outline"
}

export default {
	title: "Input/Button/Learning",
	component: SolaceLearningButton,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/P5XeF1KE6z2MKyzlEyInrH/Core-Component-Specs-(Copy)?node-id=1%3A2"
		},
		docs: {
			description: {
				component:
					"Button component for reuse in all Solace based applications. Code component name: SolaceLearningButton"
			}
		}
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Unique identifier for the button"
		},
		hasWarnings: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the button in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the button action.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		variant: {
			options: ["call-to-action", "icon", "dark-call-to-action", "dark-outline"],
			control: {
				type: "select"
			},
			description:
				"The type/style of button to render. Enum definition: https://github.com/SolaceDev/maas-react-components/blob/main/storybook/src/stories/input/learningbutton/SolaceLearningButton.stories.tsx#L9-L14",
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
					summary: "false"
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
			control: { type: "text" },
			description: "Optional click handler"
		},
		children: {
			control: { type: "object" },
			description: "Button label or contents"
		}
	}
} as Meta<typeof SolaceLearningButton>;

export const CallToAction = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.CALL_TO_ACTION,
		children: "Click Me!",
		isDisabled: false
	}
};

export const CallToActionDisabled = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.CALL_TO_ACTION,
		children: "Click Me!",
		isDisabled: true
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const callToActionBtn = canvas.getByRole("button");

		await expect(callToActionBtn).toHaveAttribute("disabled");
	}
};

export const CallToActionWithStartIcon = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.CALL_TO_ACTION,
		startIcon: <DeleteIcon />,
		children: "Start The Experience"
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const startIcon = canvas.queryByTestId("DeleteIcon");

		await expect(startIcon).toBeInTheDocument();
	}
};

export const CallToActionWithEndIcon = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.CALL_TO_ACTION,
		endIcon: <DeleteIcon />,
		children: "Start The Experience"
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const endIcon = canvas.queryByTestId("DeleteIcon");

		await expect(endIcon).toBeInTheDocument();
	}
};

export const DarkCallToAction = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.DARK_CALL_TO_ACTION,
		children: "Click Me!"
	}
};

export const DarkCallToActionDisabled = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.DARK_CALL_TO_ACTION,
		children: "Click Me!",
		isDisabled: true
	}
};

export const DarkCallToActionWithStartIcon = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.DARK_CALL_TO_ACTION,
		startIcon: <DeleteIcon />,
		children: "Delete"
	}
};

export const DarkOutlineButton = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.DARK_OUTLINE,
		children: "Click Me!"
	}
};

export const DarkOutlineButtonDisabled = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.DARK_OUTLINE,
		children: "Click Me!",
		isDisabled: true
	}
};

export const DarkOutlineWithStartIcon = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.DARK_OUTLINE,
		startIcon: <DeleteIcon />,
		children: "Delete"
	}
};

export const DarkOutlineWithEndIcon = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.DARK_OUTLINE,
		endIcon: <DeleteIcon />,
		children: "Delete"
	}
};

export const IconButton = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.ICON,
		component: "span",
		children: <DeleteIcon />
	}
};

export const IconButtonDisabled = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.ICON,
		component: "span",
		children: <DeleteIcon />,
		isDisabled: true
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const callToActionBtn = canvas.getByRole("button");

		await expect(callToActionBtn).toHaveAttribute("disabled");
	}
};
