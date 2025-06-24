import React from "react";
import { StoryFn, Meta, Decorator } from "@storybook/react";
import {
	SolaceTag,
	CHIP_VARIANT,
	SolaceTooltip,
	CHIP_COLORS,
	InfoIcon,
	TooltipVariant
} from "@SolaceDev/maas-react-components";
import { userEvent, within } from "@storybook/test";

(SolaceTag as React.FC & { displayName?: string }).displayName = "SolaceTag";

// Create a decorator to include the tooltip & popover inside the snapshot"
const withSnapshotContainer: Decorator = (Story) => {
	return (
		<div id="snapshot" style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}>
			<div style={{ margin: "16px" }}>
				<Story />
			</div>
		</div>
	);
};

export default {
	title: "Data Display/Badge/Tag",
	component: SolaceTag,
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceTag"
			}
		}
	},
	argTypes: {
		label: {
			control: { type: "text" },
			description:
				"The content to be displayed in the tag. Can be a string or JSX element for more complex content like tooltips or icons. Tags are typically used for categorization, status indicators, or metadata display.",
			table: {
				type: { summary: "string | React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		variant: {
			options: [CHIP_VARIANT.FILLED, CHIP_VARIANT.OUTLINED],
			control: { type: "radio" },
			description:
				"The visual style variant of the tag. 'filled' provides a solid background with high contrast for important categorization, while 'outlined' provides a border-only style for secondary information or when you need multiple tags without visual clutter. See enum at https://github.com/SolaceDev/maas-react-components/blob/main/src/types/modes.ts",
			table: {
				type: { summary: '"filled" | "outlined"' },
				defaultValue: { summary: '"filled"' }
			}
		},
		clickable: {
			control: { type: "boolean" },
			description:
				"If true, the tag will be clickable and show hover effects. Use this when the tag should trigger an action, such as filtering or navigation. When enabled, the tag will have appropriate cursor styling and interaction feedback.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		fillColor: {
			control: { type: "color" },
			description:
				"Custom background color for the tag. Use this to create color-coded categorization systems or to match specific brand colors. When not specified, the tag uses the default theme colors. See color constants at https://github.com/SolaceDev/maas-react-components/blob/main/src/types/states.ts",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		labelColor: {
			control: { type: "color" },
			description:
				"Custom text color for the tag label. Use this in conjunction with fillColor to ensure proper contrast and readability. When not specified, the tag uses theme-appropriate text colors.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		icon: {
			control: false,
			description:
				"Optional icon to display at the beginning of the tag. Should be a React element, typically an icon component. The icon will be automatically sized and positioned appropriately within the tag layout.",
			table: {
				type: { summary: "React.ReactElement" },
				defaultValue: { summary: "undefined" }
			}
		},
		maxWidth: {
			control: { type: "number" },
			description:
				"Maximum width of the tag in pixels. When the content exceeds this width, it will be truncated with an ellipsis. Use this to maintain consistent layout when tag content varies in length.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "undefined" }
			}
		},
		onClick: {
			control: false,
			description:
				"Callback function that fires when the tag is clicked. Only functional when the 'clickable' prop is true. The function receives the click event as its parameter."
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify tags during automated testing.",
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
} as Meta<typeof SolaceTag>;

// custom Popover component
const CustomPopoverText = () => {
	return (
		<div>
			<p style={{ fontWeight: 200 }}>Shared From</p>
			<p style={{ fontWeight: "bold" }}>Domain ABCDEFGHIJKL</p>
		</div>
	);
};

const Template: StoryFn<typeof SolaceTag> = (args) => <SolaceTag {...args} />;

const PopoverTemplate: StoryFn<typeof SolaceTag> = (args) => {
	return (
		<SolaceTooltip variant={TooltipVariant.rich} title={<CustomPopoverText />} placement="right-end">
			<span>
				<SolaceTag {...args} />
			</span>
		</SolaceTooltip>
	);
};

export const DefaultTag = Template.bind({});
DefaultTag.args = {
	label: "Default Chip"
};

export const OutlinedTag = Template.bind({});
OutlinedTag.args = {
	label: "Outlined Tag",
	variant: CHIP_VARIANT.OUTLINED
};

export const HoverableTag = PopoverTemplate.bind({});
HoverableTag.args = {
	label: "Hoverable Tag",
	clickable: true
};
HoverableTag.decorators = [withSnapshotContainer];

HoverableTag.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const targetElement = await canvas.getByText("Hoverable Tag");
	await userEvent.hover(targetElement);
};

export const StyledTag = Template.bind({});
StyledTag.args = {
	label: "Styled Tag",
	fillColor: CHIP_COLORS.INFO_LIGHT_BG_BLUE,
	labelColor: CHIP_COLORS.DARK_GREY
};

export const TruncatedTextTag = Template.bind({});
TruncatedTextTag.args = {
	label: <SolaceTooltip title="Choice Chip With Long Content">Choice Chip With Long Content</SolaceTooltip>,
	maxWidth: 150
};
TruncatedTextTag.decorators = [withSnapshotContainer];

TruncatedTextTag.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const targetElement = await canvas.getByText("Choice Chip With Long Content");
	await userEvent.hover(targetElement);
};

export const WithLeadingIcon = Template.bind({});
WithLeadingIcon.args = {
	label: "Tag with icon",
	icon: <InfoIcon size={14} fill="green" />
};
