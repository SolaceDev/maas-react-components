import React, { ReactNode } from "react";
import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";
import { SolaceButton } from "@SolaceDev/maas-react-components";

(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";

enum VARIANT {
	LINK = "link"
}

export default {
	title: "Navigation/Link/Standard",
	component: SolaceButton,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/P5XeF1KE6z2MKyzlEyInrH/Core-Component-Specs-(Copy)?node-id=1%3A2"
		}
	},
	args: {
		id: "",
		variant: "link",
		isDisabled: false,
		underline: "hover",
		title: "",
		href: "",
		dense: false,
		component: "button",
		type: "button",
		children: "Click Me!",
		openLinkInNewTab: true,
		disabledFocusState: false,
		dataQa: "",
		dataTags: "",
		eventName: ""
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Unique identifier for the button",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		variant: {
			options: ["link"],
			control: { type: "select" },
			description:
				"The type/style of button to render. Uses button variant enum values. For full list of variants, see: https://github.com/SolaceDev/maas-react-components/blob/main/src/components/form/SolaceButton.tsx",
			table: {
				defaultValue: { summary: '"text"' }
			}
		},
		"aria-label": {
			control: { type: "text" },
			description:
				"Accessibility label for screen readers. Provides an accessible name for the button when visible text is not sufficient.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		"aria-labelledby": {
			control: { type: "text" },
			description:
				"ID of element(s) that describe the button. Used to reference other elements that provide the button's accessible name.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		isDisabled: {
			control: { type: "boolean" },
			description: "Renders the button disabled",
			table: {
				defaultValue: { summary: "false" }
			}
		},
		underline: {
			options: ["none", "hover", "always"],
			control: { type: "select" },
			description: "Controls when the link should have an underline",
			table: {
				defaultValue: { summary: '"hover"' }
			}
		},
		title: {
			control: { type: "text" },
			description: "Text to use for tooltip",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		href: {
			control: { type: "text" },
			description: "URL to navigate to on click",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		dense: {
			control: { type: "boolean" },
			description: "Removes spacing from link button",
			table: {
				defaultValue: { summary: "false" }
			}
		},
		component: {
			options: ["button", "span"],
			control: { type: "select" },
			description: "The component used for the root node. Either a string to use a HTML element or a component button",
			table: {
				defaultValue: { summary: '"button"' }
			}
		},
		type: {
			options: ["button", "submit", "reset"],
			control: { type: "select" },
			description: "Attribute which specifies the type of button",
			table: {
				defaultValue: { summary: '"button"' }
			}
		},
		startIcon: {
			control: false,
			description:
				"React element placed before the button text. Use this to add visual context or enhance the button's meaning with an icon.",
			table: {
				type: { summary: "React.ReactElement | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		endIcon: {
			control: false,
			description:
				"React element placed after the button text. Use this for directional indicators like arrows or secondary actions.",
			table: {
				type: { summary: "React.ReactElement | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		onClick: {
			action: "clicked",
			description: "Optional click handler",
			table: {
				defaultValue: { summary: "undefined" }
			}
		},
		children: {
			control: { type: "text" },
			description: "Button label or contents",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		openLinkInNewTab: {
			control: { type: "boolean" },
			description: "Whether to open link in new tab",
			table: {
				defaultValue: { summary: "true if href is provided, false otherwise" }
			}
		},
		disabledFocusState: {
			control: { type: "boolean" },
			description: "Whether to disable the focus state styling",
			table: {
				defaultValue: { summary: "false" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data QA attribute for testing",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data tags attribute for additional metadata",
			table: {
				defaultValue: { summary: '""' }
			}
		},
		eventName: {
			control: { type: "text" },
			description: "Event name for tracking",
			table: {
				defaultValue: { summary: '""' }
			}
		}
	}
} as Meta<typeof SolaceButton>;

export const LinkButton = {
	args: {
		onClick: action("callback"),
		variant: VARIANT.LINK,
		children: "Click Me!"
	}
};

export const LinkButtonWithDenseStyle = (): JSX.Element => {
	return (
		<div>
			This is a{" "}
			<SolaceButton variant="link" dense onClick={action("callback")}>
				link button
			</SolaceButton>{" "}
			without spacing.
		</div>
	);
};

export const ExternalLinkButton = {
	args: {
		variant: "link",
		href: "http://www.cnn.com",
		children: "Visit CNN"
	}
};

export const ExternalLinkButtonOpenPageInSameTab = {
	args: {
		variant: "link",
		openLinkInNewTab: false,
		href: "http://www.cnn.com",
		children: "Visit CNN"
	}
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
