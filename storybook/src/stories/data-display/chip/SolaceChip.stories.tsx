import React from "react";
import { Meta, StoryFn, Decorator } from "@storybook/react";
import {
	SolaceChip,
	SolaceTooltip,
	CHIP_VARIANT,
	InfoIcon,
	TooltipVariant,
	MODES
} from "@SolaceDev/maas-react-components";
import { userEvent, within } from "@storybook/test";

(SolaceChip as React.FC & { displayName?: string }).displayName = "SolaceChip";
(SolaceTooltip as React.FC & { displayName?: string }).displayName = "SolaceTooltip";

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
	title: "Data Display/Chip/Standard",
	component: SolaceChip,
	parameters: {},
	argTypes: {
		label: {
			control: { type: "text" },
			description:
				"The content to be displayed in the chip. Can be a string or JSX element for more complex content like tooltips or icons. When using JSX elements, ensure they are accessible and provide appropriate interaction feedback.",
			table: {
				type: { summary: "string | React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		variant: {
			options: [CHIP_VARIANT.FILLED, CHIP_VARIANT.OUTLINED],
			control: { type: "radio" },
			description:
				"The visual style variant of the chip. 'filled' provides a solid background with high contrast, while 'outlined' provides a border-only style that's less visually prominent. Use 'filled' for primary categorization and 'outlined' for secondary or supplementary information.",
			table: {
				type: { summary: '"filled" | "outlined"' },
				defaultValue: { summary: '"filled"' }
			}
		},
		disabled: {
			control: { type: "boolean" },
			description:
				"If true, the chip will be disabled and non-interactive. Use this when the chip represents information that is not currently applicable or actionable based on the current application state.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		clickable: {
			control: { type: "boolean" },
			description:
				"If true, the chip will be clickable and show hover effects. Use this when the chip should trigger an action or navigation when clicked. When enabled, the chip will have appropriate cursor styling and interaction feedback.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		mode: {
			options: [MODES.LIGHT_MODE, MODES.DARK_MODE],
			control: { type: "radio" },
			description:
				"The color mode for the chip. Controls the overall color scheme to match the application's theme. Use 'light' for standard interfaces and 'dark' for dark-themed applications or when the chip appears on dark backgrounds.",
			table: {
				type: { summary: '"light" | "dark"' },
				defaultValue: { summary: '"light"' }
			}
		},
		icon: {
			control: false,
			description:
				"Optional icon to display at the beginning of the chip. Should be a React element, typically an icon component. The icon will be automatically sized and positioned appropriately within the chip layout.",
			table: {
				type: { summary: "React.ReactElement" },
				defaultValue: { summary: "undefined" }
			}
		},
		maxWidth: {
			control: { type: "number" },
			description:
				"Maximum width of the chip in pixels. When the content exceeds this width, it will be truncated with an ellipsis. Use this to maintain consistent layout when chip content varies in length.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "undefined" }
			}
		},
		onClick: {
			control: false,
			description:
				"Callback function that fires when the chip is clicked. Only functional when the 'clickable' prop is true. The function receives the click event as its parameter."
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify chips during automated testing.",
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
} as Meta<typeof SolaceChip>;

// custom Popover component
const CustomPopoverText = () => {
	return (
		<div>
			<p style={{ fontWeight: 200 }}>Shared From</p>
			<p style={{ fontWeight: "bold" }}>Domain ABCDEFGHIJKL</p>
		</div>
	);
};

const Template: StoryFn<typeof SolaceChip> = (args) => <SolaceChip {...args} />;

const PopoverTemplate: StoryFn<typeof SolaceChip> = (args) => {
	return (
		<SolaceTooltip variant={TooltipVariant.rich} title={<CustomPopoverText />} placement="right-end">
			<span>
				<SolaceChip {...args} />
			</span>
		</SolaceTooltip>
	);
};

export const DefaultChip = Template.bind({});
DefaultChip.args = {
	label: "Default Chip"
};

export const ChipWithPopover = PopoverTemplate.bind({});
ChipWithPopover.args = {
	label: "Chip With Popover"
};
ChipWithPopover.decorators = [withSnapshotContainer];
ChipWithPopover.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const targetElement = await canvas.getByText("Chip With Popover");
	await userEvent.hover(targetElement);
};

export const ChipWithTooltip = Template.bind({});
ChipWithTooltip.args = {
	label: <SolaceTooltip title="This is a tooltip when you hover over an choice chip">Hover Over Me</SolaceTooltip>
};
ChipWithTooltip.decorators = [withSnapshotContainer];
ChipWithTooltip.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const targetElement = await canvas.getByText("Hover Over Me");
	await userEvent.hover(targetElement);
};

export const TruncatedChip = Template.bind({});
TruncatedChip.args = {
	label: <SolaceTooltip title="Choice Chip With Long Content">Choice Chip With Long Content</SolaceTooltip>,
	maxWidth: 100
};

export const ChipWithLeadingIcon = Template.bind({});
ChipWithLeadingIcon.args = {
	label: "Chip with icon",
	icon: <InfoIcon size={14} fill="green" />
};

export const DisabledStandardChip = Template.bind({});
DisabledStandardChip.args = {
	label: "Disabled Standard Chip",
	disabled: true
};

export const DarkStandardChip = Template.bind({});
DarkStandardChip.args = {
	mode: MODES.DARK_MODE,
	label: "Dark Standard Chip"
};

export const DisabledDarkStandardChip = Template.bind({});
DisabledDarkStandardChip.args = {
	mode: MODES.DARK_MODE,
	disabled: true,
	label: "Disabled Dark Standard Chip"
};
