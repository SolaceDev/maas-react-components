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
			options: ["link"],
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
		underline: {
			options: ["none", "hover", "always"],
			control: { type: "select" },
			description: "Controls when the link should have an underline",
			table: {
				defaultValue: {
					summary: "hover"
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
		dense: {
			control: { type: "boolean" },
			description: "Removes spacing from link button",
			table: {
				defaultValue: {
					summary: "false"
				}
			}
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
			options: ["button"],
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
