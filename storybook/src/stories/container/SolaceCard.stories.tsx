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
		},
		docs: {
			description: {
				component: "Code component name: SolaceCard"
			}
		}
	},
	argTypes: {
		cardHeaderProps: {
			description: "Props for the card header component",
			control: "object",
			table: {
				type: {
					summary: "SolaceCardHeaderProps"
				}
			}
		},
		cardContent: {
			description: "Content to display in the card body"
		},
		cardActions: {
			description: "Actions to display at the bottom of the card"
		},
		width: {
			control: { type: "text" },
			description: "Width of the card"
		},
		height: {
			control: { type: "text" },
			description: "Height of the card"
		},
		minWidth: {
			control: { type: "text" },
			description: "Minimum width of the card",
			table: {
				defaultValue: {
					summary: "250px"
				}
			}
		},
		padding: {
			control: { type: "text" },
			description: "Padding for the entire card",
			table: {
				defaultValue: {
					summary: "16px"
				}
			}
		},
		readOnly: {
			control: { type: "boolean" },
			description: "Whether the card is in read-only mode",
			table: {
				defaultValue: {
					summary: "false"
				}
			}
		},
		ariaLabel: {
			control: { type: "text" },
			description: "ARIA label for the card"
		},
		dataQa: {
			control: { type: "text" },
			description: "Data-qa attribute for testing"
		},
		dataTags: {
			control: { type: "text" },
			description: "Data-tags attribute for additional metadata"
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
	return <SolaceCard {...args} />;
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
		<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
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
