/* eslint-disable sonarjs/no-duplicate-string */
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
	args: {
		id: "",
		variant: "text",
		isDisabled: false,
		title: "",
		href: "",
		component: "button",
		type: "button",
		size: "medium",
		startIcon: undefined,
		endIcon: undefined,
		onClick: undefined,
		children: "",
		disabledFocusState: false,
		fullWidth: false,
		loading: false,
		dataQa: "",
		dataTags: "",
		hasWarnings: false
	},
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/P5XeF1KE6z2MKyzlEyInrH/Core-Component-Specs-(Copy)?node-id=1%3A2"
		}
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Unique identifier for the button component. Used for accessibility and programmatic access.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		variant: {
			options: ["call-to-action", "outline", "text", "icon"],
			control: {
				type: "select"
			},
			description:
				"The visual style variant of the button. Use 'call-to-action' for primary actions, 'outline' for secondary actions, 'text' for tertiary actions, and 'icon' for icon-only buttons. Enum definition: https://github.com/SolaceDev/maas-react-components/blob/main/storybook/src/stories/input/button/SolaceButton.stories.tsx#L10-L15",
			table: {
				type: { summary: '"call-to-action" | "outline" | "text" | "icon" | undefined' },
				defaultValue: { summary: '"text"' }
			}
		},
		isDisabled: {
			control: { type: "boolean" },
			description:
				"If true, renders the button in a disabled state preventing user interaction. Use this when the button action is not currently available.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		title: {
			control: { type: "text" },
			description:
				"Text to use for tooltip and aria-label for accessibility. Essential for icon buttons and helpful for providing additional context on any button.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		href: {
			control: { type: "text" },
			description:
				"URL to navigate to when the button is clicked. When provided, the button will behave as a link. Use this for navigation actions.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		component: {
			options: ["button", "span", "a"],
			control: { type: "select" },
			description:
				"The root HTML element or component to render. Use 'button' for form actions, 'span' for custom implementations, or 'a' for link behavior.",
			table: {
				type: { summary: '"button" | "span" | "a" | undefined' },
				defaultValue: { summary: '"button"' }
			}
		},
		type: {
			options: ["button", "submit", "reset"],
			control: { type: "select" },
			description:
				"The button type attribute. Use 'submit' for form submission, 'reset' for form reset, or 'button' for general actions. https://github.com/SolaceDev/maas-react-components/blob/main/src/types/buttonTypes.ts",
			table: {
				type: { summary: '"button" | "submit" | "reset" | undefined' },
				defaultValue: { summary: '"button"' }
			}
		},
		size: {
			options: ["small", "medium", "large"],
			control: { type: "select" },
			description:
				"Controls the size of the button. Use 'small' for compact layouts, 'medium' for standard usage, and 'large' for prominent actions. https://github.com/SolaceDev/maas-react-components/blob/main/src/types/sizing.ts",
			table: {
				type: { summary: '"small" | "medium" | "large" | undefined' },
				defaultValue: { summary: '"medium"' }
			}
		},
		startIcon: {
			control: { type: "object" },
			description:
				"React element placed before the button text. Use this to add visual context or enhance the button's meaning with an icon.",
			table: {
				type: { summary: "React.ReactElement | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		endIcon: {
			control: { type: "object" },
			description:
				"React element placed after the button text. Use this for directional indicators like arrows or secondary actions.",
			table: {
				type: { summary: "React.ReactElement | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		onClick: {
			description:
				"Callback function fired when the button is clicked. Essential for interactive buttons to handle user actions.",
			table: {
				type: { summary: "(event: React.MouseEvent) => void | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		children: {
			control: { type: "object" },
			description:
				"The content of the button, typically text or an icon. For icon buttons, this should be the icon component. For text buttons, this should be the label text.",
			table: {
				type: { summary: "React.ReactNode | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		disabledFocusState: {
			control: { type: "boolean" },
			description:
				"If true, disables the focus state styling of the button. Use this sparingly as it can impact accessibility and keyboard navigation.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		fullWidth: {
			control: { type: "boolean" },
			description:
				"If true, the button will take up the full width of its container. Use this for prominent actions or in mobile layouts.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		loading: {
			control: { type: "boolean" },
			description:
				"If true, shows a loading state with a spinner. Use this to indicate that the button action is in progress.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify the button during automated testing.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data attribute for additional tagging. Use this for analytics, tracking, or additional metadata.",
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
				"If true, displays the button in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the button action.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
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
