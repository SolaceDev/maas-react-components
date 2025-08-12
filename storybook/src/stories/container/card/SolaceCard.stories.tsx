/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
	DeleteIcon,
	MoreHorizOutlinedIcon,
	SolaceButton,
	SolaceCard,
	SolaceMenu,
	SolaceTypography
} from "@SolaceDev/maas-react-components";
import { SolaceCardProps } from "@SolaceDev/maas-react-components";
import InfoIcon from "@mui/icons-material/Info";

(SolaceCard as React.FC & { displayName?: string }).displayName = "SolaceCard";

export default {
	title: "Container/Card",
	component: SolaceCard,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/design/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=19215-2455&p=f&t=FAQR9BgIIAEYGEql-0"
		}
	},
	argTypes: {
		cardHeaderProps: {
			control: { type: "object" },
			description:
				"Configuration object for the card header component. Contains properties like title, subtitle, icon, and action elements. Use this to create a consistent header across different card implementations.",
			table: {
				type: { summary: "SolaceCardHeaderProps" },
				defaultValue: { summary: "undefined" }
			}
		},
		cardContent: {
			description:
				"The main content area of the card. Can be any React node including text, components, or complex layouts. This is where the primary information or functionality of the card is displayed.",
			table: {
				type: { summary: "React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		cardActions: {
			description:
				"Action elements displayed at the bottom of the card. Typically contains buttons, links, or other interactive elements that users can perform on the card content.",
			table: {
				type: { summary: "React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		width: {
			control: { type: "text" },
			description:
				"Explicit width of the card. Can be specified in any valid CSS unit (px, %, rem, etc.). Use this to control the exact width when the card needs to fit specific layout requirements.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		height: {
			control: { type: "text" },
			description:
				"Explicit height of the card. Can be specified in any valid CSS unit (px, %, rem, etc.). Use this when you need cards to have consistent heights in a grid layout.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		minWidth: {
			control: { type: "text" },
			description:
				"Minimum width constraint for the card. Ensures the card maintains usability and readability even in responsive layouts. Prevents content from becoming too cramped.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "250px" }
			}
		},
		maxWidth: {
			control: { type: "text" },
			description:
				"Maximum width constraint for the card. Prevents cards from becoming too wide on large screens, maintaining optimal readability and visual balance.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		padding: {
			control: { type: "text" },
			description:
				"Internal padding for the entire card content. Controls the spacing between the card border and its content. Use larger padding for cards with more content or when more breathing room is needed.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "16px" }
			}
		},
		margin: {
			control: { type: "text" },
			description:
				"External margin around the card. Controls spacing between the card and adjacent elements. Useful for creating consistent spacing in card grids or lists.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		readOnly: {
			control: { type: "boolean" },
			description:
				"When true, the card is in read-only mode and cannot be interacted with. Used for display-only cards that serve as visual layout elements to categorize and group content without interactive functionality.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		onClick: {
			description:
				"Callback function triggered when the card is clicked. Only functional when readOnly is false. Use this to make the entire card clickable for navigation or selection purposes."
		},
		onKeyDown: {
			description:
				"Callback function triggered when a key is pressed while the card has focus. Enables keyboard accessibility for card interactions. Typically used to support Enter and Space key activation."
		},
		elevation: {
			control: { type: "number", min: 0, max: 24 },
			description:
				"Material-UI elevation level for the card shadow. Higher values create more pronounced shadows, giving the appearance of the card being elevated above the background.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "1" }
			}
		},
		variant: {
			control: { type: "select" },
			options: ["elevation", "outlined"],
			description:
				"Visual variant of the card. 'elevation' uses shadow for depth, 'outlined' uses a border. Choose based on your design system and the visual hierarchy you want to establish.",
			table: {
				type: { summary: '"elevation" | "outlined"' },
				defaultValue: { summary: "elevation" }
			}
		},
		square: {
			control: { type: "boolean" },
			description:
				"When true, removes border radius for sharp corners. When false, applies rounded corners for a softer appearance. Use square cards for more formal or technical interfaces.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		raised: {
			control: { type: "boolean" },
			description:
				"When true, applies a more prominent elevation/shadow effect. Use this to make certain cards stand out more prominently in the interface, such as featured content or important notifications.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		ariaLabel: {
			control: { type: "text" },
			description:
				"ARIA label for accessibility. Provides a text description of the card's purpose for screen readers. Essential for making interactive cards accessible to users with disabilities.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		ariaDescribedBy: {
			control: { type: "text" },
			description:
				"ARIA described-by attribute referencing elements that provide additional description for the card. Use this to link the card to help text or detailed descriptions elsewhere on the page.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		role: {
			control: { type: "text" },
			description:
				"ARIA role for the card element. Defines the semantic meaning of the card for assistive technologies. Common values include 'button' for clickable cards or 'article' for content cards.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		tabIndex: {
			control: { type: "number" },
			description:
				"Tab index for keyboard navigation. When set to 0, makes the card focusable via keyboard navigation. When -1, removes from tab order but allows programmatic focus.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description:
				"Data attribute for QA testing. Use this to identify card elements during automated testing. Should be unique and descriptive of the card's purpose or content.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description:
				"Data attribute for additional tagging and metadata. Use this for analytics tracking, categorization, or any additional metadata that needs to be associated with the card element.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		className: {
			control: { type: "text" },
			description:
				"Additional CSS class names to apply to the card. Use this to extend the card's styling with custom CSS classes while maintaining the base card functionality.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		id: {
			control: { type: "text" },
			description:
				"Unique identifier for the card element. Use this when you need to reference the card programmatically or for linking with other elements via ARIA attributes.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceCard>;

// Menu items with secondary actions
const menuItemsWithSecondaryActions = [
	{
		name: "Doc",
		onMenuItemClick: action("callback"),
		secondaryAction: <SolaceButton href="http://www.cnn.com" variant="link" />
	},
	{
		name: "Tutorial",
		onMenuItemClick: action("callback"),
		secondaryAction: <SolaceButton href="http://www.cnn.com" variant="link" />
	},
	{
		name: "Download",
		onMenuItemClick: action("callback"),
		secondaryAction: <SolaceButton href="http://www.cnn.com" variant="link" />
	}
];

/**
 * Default SolaceCard story
 */
const SolaceCardStory = (args: SolaceCardProps) => {
	return (
		<div style={{ margin: "20px", padding: "20px" }}>
			<SolaceCard {...args} />
		</div>
	);
};

/**
 * Default story - A card that has nothing in it except an empty content area.
 * No header, no footer. This helps show what devs will get if they pass nothing in.
 */
export const Default = {
	render: SolaceCardStory,

	args: {
		dataQa: "default-empty-card",
		width: "250px",
		height: "250px",
		minWidth: "250px",
		cardContent: <SolaceTypography variant="body1">Click me! I&apos;m interactive.</SolaceTypography>,
		onClick: action("callback")
	},

	parameters: {
		docs: {
			description: {
				story:
					"Default empty card with no header or footer, just an empty content area. This is the interactive card per the Card pattern. This card has an onClick handler that will be triggered when the card is clicked."
			}
		}
	}
};

/**
 * Read Only story - Show an example of what it looks like when the card is read-only.
 */
export const ReadOnly = {
	render: SolaceCardStory,

	args: {
		dataQa: "read-only-card",
		width: "250px",
		height: "250px",
		minWidth: "250px",
		cardContent: <div></div>,
		readOnly: true,
		onClick: action("callback")
	},

	parameters: {
		docs: {
			description: {
				story:
					"Read-only card example. Read-only cards are used as a visual layout option to help categorize and group topics. " +
					"Note that even though an onClick handler is provided, it will not be triggered because the card is in read-only mode."
			}
		}
	}
};

/**
 * Custom Content story - No header, no footer. Content only with custom title.
 */
export const CustomContent = {
	render: SolaceCardStory,

	args: {
		dataQa: "custom-content-card",
		width: "400px",
		minWidth: "300px",
		onClick: () => {
			alert("Card Clicked");
		},
		cardContent: (
			<>
				<SolaceTypography variant="h3" sx={{ marginBottom: "8px" }}>
					Custom Title
				</SolaceTypography>
				<SolaceTypography variant="body1">
					This is an example of a custom title as an example of what teams can do if they do not want to use the
					built-in header styling.
				</SolaceTypography>
			</>
		)
	},

	parameters: {
		docs: {
			description: {
				story:
					"Card with custom content only. No header or footer. Shows an example of a custom title as an alternative to using the built-in header styling."
			}
		}
	}
};

/**
 * Padding Options story - Demonstrate both 16px and 24px padding options.
 */
export const PaddingOptions = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "20px", margin: "20px" }}>
			<SolaceCard
				dataQa="padding-16px-card"
				width="300px"
				cardHeaderProps={{
					title: "16px Padding (Default)"
				}}
				cardContent={
					<SolaceTypography variant="body1">
						This card uses the default padding of 16px. This is suitable for most card sizes.
					</SolaceTypography>
				}
			/>
			<SolaceCard
				dataQa="padding-24px-card"
				width="300px"
				padding="24px"
				cardHeaderProps={{
					title: "24px Padding"
				}}
				cardContent={
					<SolaceTypography variant="body1">
						This card uses a larger padding of 24px. This is suitable for larger cards that need more breathing room.
					</SolaceTypography>
				}
			/>
		</div>
	),

	parameters: {
		docs: {
			description: {
				story: "Demonstrates both 16px (default) and 24px padding options for the card."
			}
		}
	}
};

/**
 * Original Default SolaceCard story
 */
export const WithDefaultHeader = {
	render: SolaceCardStory,

	args: {
		dataQa: "with-header-card",
		width: "400px",
		minWidth: "371px",
		readOnly: true,
		cardHeaderProps: {
			title: "Java",
			icon: <InfoIcon />,
			actionElements: (
				<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
					<SolaceButton variant="text" onClick={action("callback")}>
						Tutorials
					</SolaceButton>
					<SolaceMenu
						buttonProps={{
							variant: "icon",
							title: "Actions",
							"aria-label": "Actions menu",
							children: <MoreHorizOutlinedIcon />
						}}
						items={menuItemsWithSecondaryActions.map((item) => ({ ...item }))}
						numOfMenuItemDisplayed={menuItemsWithSecondaryActions.length}
					/>
				</div>
			)
		}
	},

	parameters: {
		docs: {
			description: {
				story: "Original SolaceCard with icon, title, button, and menu"
			}
		}
	}
};

export const CardWithSubTitle = {
	render: SolaceCardStory,

	args: {
		dataQa: "With-subtitle-card",
		width: "400px",
		minWidth: "371px",
		readOnly: true,
		cardHeaderProps: {
			title: "Go",
			subTitle: "PubSub+ Messaging API for Go",
			icon: <InfoIcon />,
			actionElements: (
				<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
					<SolaceButton variant="text" onClick={action("callback")}>
						Tutorials
					</SolaceButton>
					<SolaceMenu
						buttonProps={{
							variant: "icon",
							title: "actions",
							"aria-label": "menu actions",
							children: <MoreHorizOutlinedIcon />
						}}
						items={menuItemsWithSecondaryActions.map((item) => ({ ...item }))}
						numOfMenuItemDisplayed={menuItemsWithSecondaryActions.length}
					/>
				</div>
			)
		}
	},

	parameters: {
		docs: {
			description: {
				story: "SolaceCard with icon, title, subTitle, button, and menu"
			}
		}
	}
};

export const CompleteCard = {
	render: SolaceCardStory,
	args: {
		dataQa: "complete-card-example",
		width: "400px",
		readOnly: true,
		cardHeaderProps: {
			title: "Built-in header",
			subTitle: "subtitle",
			actionElements: (
				<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
					<SolaceMenu
						buttonProps={{
							variant: "icon",
							title: "More actions",
							"aria-label": "Action menu",
							children: <MoreHorizOutlinedIcon />
						}}
						items={menuItemsWithSecondaryActions}
						numOfMenuItemDisplayed={menuItemsWithSecondaryActions.length}
					/>
				</div>
			)
		},
		cardContent: (
			<>
				<SolaceTypography variant="body1">Card Content</SolaceTypography>
			</>
		),
		cardActions: (
			<div
				style={{
					display: "flex",
					gap: "8px",
					justifyContent: "space-between",
					alignItems: "center",
					flex: "1"
				}}
			>
				<SolaceTypography variant="body1">CardActions</SolaceTypography>
				<SolaceButton variant="icon" onClick={action("callback")}>
					<DeleteIcon />
				</SolaceButton>
			</div>
		)
	},
	parameters: {
		docs: {
			description: {
				story: "Complete card with all 3 parts"
			}
		}
	}
};
