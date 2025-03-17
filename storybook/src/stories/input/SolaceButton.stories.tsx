import React, { ReactNode } from "react";
import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";
import { SolaceButton, DeleteIcon } from "@SolaceDev/maas-react-components";
import { userEvent } from "@storybook/testing-library";

(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";

enum VARIANT {
	ACTION = "call-to-action",
	OUTLINE = "outline",
	TEXT = "text",
	ICON = "icon"
}

export default {
	title: "Input/Button/Standard",
	component: SolaceButton,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/P5XeF1KE6z2MKyzlEyInrH/Core-Component-Specs-(Copy)?node-id=1%3A2"
		},
		docs: {
			description: {
				component: "Button component for reuse in all Solace based applications. Code component name: SolaceButton"
			}
		}
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Unique identifier for the button"
		},
		variant: {
			options: ["call-to-action", "outline", "text", "icon"],
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
					summary: "false"
				}
			}
		},
		title: {
			control: { type: "text" },
			description: "Text to use for tooltip and arial-label (assecibility)"
		},
		href: {
			control: { type: "text" },
			description: "URL to navigate to on click"
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
		},
		disabledFocusState: {
			control: { type: "boolean" },
			description: "Boolean flag to disable the focus state of the button"
		}
	}
} as Meta<typeof SolaceButton>;

export const DefaultButton = {
	args: {
		onClick: action("callback"),
		dataQa: "testDataProp",
		dataTags: "testDataTag1 testDataTag2",
		children: "Click Me!"
	}
};

export const CallToActionButton = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.ACTION,
		children: "Click Me!"
	}
};

export const OutlineButton = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.OUTLINE,
		children: "Click Me!"
	}
};

export const TextButton = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.TEXT,
		children: "Click Me!"
	}
};

export const IconButton = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.ICON,
		title: "Delete",
		children: <DeleteIcon />
	},

	play: async () => {
		await userEvent.tab();
	}
};

export const IconButtonWithDisabledFocusState = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.ICON,
		title: "Delete",
		children: <DeleteIcon />,
		disabledFocusState: true
	},

	play: async () => {
		await userEvent.tab();
	}
};

export const WithStartIcon = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.ACTION,
		startIcon: <DeleteIcon />,
		children: "Delete"
	}
};

export const WithEndIcon = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.ACTION,
		endIcon: <DeleteIcon />,
		children: "Delete"
	}
};

export const WithStartIconLong = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.ACTION,
		startIcon: <DeleteIcon />,
		children: "Delete is really really Long"
	}
};

export const WithEndIconLong = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.ACTION,
		endIcon: <DeleteIcon />,
		children: "Delete is really really Long"
	}
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
