import { Meta } from "@storybook/react";
import { SolaceFeatureTag } from "@SolaceDev/maas-react-components";

(SolaceFeatureTag as React.FC & { displayName?: string }).displayName = "SolaceFeatureTag";

export default {
	title: "Data Display/Badge/Feature",
	component: SolaceFeatureTag,
	parameters: {},
	argTypes: {
		text: {
			control: { type: "text" },
			description:
				"The text content to be displayed in the feature tag. Typically used for version indicators, status labels, or feature availability markers like 'beta', 'new', 'deprecated', etc.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		active: {
			control: { type: "boolean" },
			description:
				"If true, the feature tag will be displayed with active styling (highlighted appearance). Use this to indicate when a feature is currently enabled, selected, or in an active state.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		variant: {
			control: { type: "select" },
			options: ["default", "success", "warning", "error", "info"],
			description:
				"The visual variant of the feature tag that determines its color scheme. Use 'success' for stable features, 'warning' for beta features, 'error' for deprecated features, or 'info' for informational tags. See enum at https://github.com/SolaceLabs/maas-react-components/blob/main/src/types/states.ts",
			table: {
				type: { summary: '"default" | "success" | "warning" | "error" | "info"' },
				defaultValue: { summary: '"default"' }
			}
		},
		size: {
			control: { type: "select" },
			options: ["small", "medium", "large"],
			description:
				"The size of the feature tag affecting both font size and padding. Use 'small' for compact layouts, 'medium' for standard use, and 'large' for emphasis. See enum at https://github.com/SolaceLabs/maas-react-components/blob/main/src/types/sizing.ts",
			table: {
				type: { summary: '"small" | "medium" | "large"' },
				defaultValue: { summary: '"medium"' }
			}
		},
		onClick: {
			control: false,
			description:
				"Callback function that fires when the feature tag is clicked. Use this when the tag should trigger an action such as toggling a feature or showing more information."
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify feature tags during automated testing.",
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
} as Meta<typeof SolaceFeatureTag>;

export const DefaultReleaseTag = {
	args: {
		text: "beta",
		active: false
	}
};
