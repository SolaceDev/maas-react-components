import type { Meta, StoryObj } from "@storybook/react";
import { SolaceEmptyStateBanner } from "@SolaceDev/maas-react-components";
import React from "react";
import EmptyBannerImage from "../../resources/images/EmptyBannerImage";

(SolaceEmptyStateBanner as React.FC & { displayName?: string }).displayName = "SolaceEmptyStateBanner";

const meta: Meta<typeof SolaceEmptyStateBanner> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/configure/#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "Layout/Empty State/Learning",
	component: SolaceEmptyStateBanner,
	parameters: {
		docs: {
			description: {
				component:
					"Empty state banner component for displaying helpful messages when no content is available. Code component name: SolaceEmptyStateBanner"
			}
		}
	},
	argTypes: {
		bannerImage: {
			control: { type: "object" },
			description:
				"React element representing the banner image or illustration. Use this to provide visual context for the empty state. Should be an SVG or optimized image component.",
			table: {
				type: { summary: "React.ReactElement" },
				defaultValue: { summary: "undefined" }
			}
		},
		title: {
			control: { type: "text" },
			description:
				"The main heading text for the empty state banner. Use this to clearly communicate what the user can do or what they're missing. Should be concise and action-oriented.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		subtitle: {
			control: { type: "text" },
			description:
				"Secondary heading text that provides additional context. Use this to give more specific information about the empty state or the next steps the user should take.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		description: {
			control: { type: "text" },
			description:
				"Detailed description text explaining the empty state and providing guidance. Use this to give users comprehensive information about why they're seeing this state and what they can do about it.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		primaryButton: {
			control: { type: "object" },
			description:
				"Configuration object for the primary action button. Should include 'label' (string) and 'onClick' (function) properties. Use this for the main action you want users to take.",
			table: {
				type: { summary: "{label: string, onClick: () => void}" },
				defaultValue: { summary: "undefined" }
			}
		},
		secondaryButton: {
			control: { type: "object" },
			description:
				"Configuration object for the secondary action button. Should include 'label' (string) and 'onClick' (function) properties. Use this for alternative actions or exploration options.",
			table: {
				type: { summary: "{label: string, onClick: () => void}" },
				defaultValue: { summary: "undefined" }
			}
		},
		variant: {
			options: ["default", "learning", "error", "success"],
			control: { type: "select" },
			description:
				"Visual variant of the empty state banner. Use 'learning' for educational content, 'error' for error states, 'success' for completed states, or 'default' for general empty states.",
			table: {
				type: { summary: "'default' | 'learning' | 'error' | 'success'" },
				defaultValue: { summary: "'default'" }
			}
		},
		size: {
			options: ["small", "medium", "large"],
			control: { type: "select" },
			description:
				"Controls the overall size and spacing of the banner. Use 'small' for compact layouts, 'medium' for standard usage, and 'large' for prominent empty states.",
			table: {
				type: { summary: "'small' | 'medium' | 'large'" },
				defaultValue: { summary: "'medium'" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description:
				"Data attribute for QA testing. Use this to identify the empty state banner during automated testing.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data attribute for additional tagging. Use this for analytics, tracking, or additional metadata.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof SolaceEmptyStateBanner>;

export const EmptyBanner: Story = {
	args: {
		bannerImage: <EmptyBannerImage />,
		subtitle: "Get started with integration",
		title: "Bring your data into the event mesh",
		description:
			"In this sample, Acme Inc. enterprise is taking their next step in optimizing their operations by using Event Portal to discover, audit, catalog, extend, and govern their event-driven architecture. Code component name: SolaceEmptyStateBanner",
		primaryButton: {
			label: "Check Out Available Connectors",
			onClick: () => alert("Primary button clicked")
		},
		secondaryButton: {
			label: "Explore On My Own",
			onClick: () => alert("Secondary button clicked")
		}
	}
};
