import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceAttributeBadge, SolaceTooltip, CHIP_COLORS } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

export default {
	title: "Under Construction/SolaceAttributeBadge",
	component: SolaceAttributeBadge,
	parameters: {},
	argTypes: {
		label: {},
		variant: {
			options: ["outlined", "filled"],
			control: { type: "radio" }
		},
		disabled: {
			control: { type: "boolean" }
		},
		size: {
			options: ["xs", "sm", "md", "lg", "xl", "xxl", "huge"],
			control: {
				type: "select"
			}
		},
		borderColor: {
			options: Object.values(CHIP_COLORS),
			control: {
				type: "select"
			}
		},
		borderRadius: {
			options: ["sm", "md", "lg"],
			control: {
				type: "select"
			}
		},
		dashedBorder: {
			control: {
				type: "boolean"
			}
		},
		fillColor: {
			options: Object.values(CHIP_COLORS),
			control: {
				type: "select"
			}
		},
		boldLabel: {
			control: {
				type: "boolean"
			}
		},
		labelColor: {
			options: Object.values(CHIP_COLORS),
			control: {
				type: "select"
			}
		},
		height: {
			options: ["sm", "md", "lg"],
			control: {
				type: "select"
			}
		},
		compressed: {
			control: { type: "boolean" }
		},
		clickable: {
			control: { type: "boolean" }
		}
	},
	args: {
		size: "xs"
	}
} as ComponentMeta<typeof SolaceAttributeBadge>;

const Template: ComponentStory<typeof SolaceAttributeBadge> = (args) => <SolaceAttributeBadge {...args} />;

export const DefaultAttributeBadge = Template.bind({});
DefaultAttributeBadge.args = {
	label: "Filled Attribute Badge"
};

export const OutlinedAttributeBadge = Template.bind({});
OutlinedAttributeBadge.args = {
	label: "Outlined Attribute Badge",
	variant: "outlined"
};

export const ClickableAttributeBadge = Template.bind({});
ClickableAttributeBadge.args = {
	label: "Clickable Attribute Badge",
	clickable: true
};

export const EllipsisContentAttributeBadge = Template.bind({});
EllipsisContentAttributeBadge.args = {
	label: "Attribute Badge With Long Content",
	maxWidth: 100
};

export const LargeFontSizeAttributeBadge = Template.bind({});
LargeFontSizeAttributeBadge.args = {
	label: "Larger Text",
	size: "md"
};

export const NonBoldLabelAttributeBadge = Template.bind({});
NonBoldLabelAttributeBadge.args = {
	label: "Regular (400) Font Weight",
	boldLabel: false
};

export const NonCompressedAttributeBadge = Template.bind({});
NonCompressedAttributeBadge.args = {
	label: "Non Compressed Attribute Badge",
	compressed: false
};

export const WithTooltipAttributeBadge = Template.bind({});
WithTooltipAttributeBadge.args = {
	label: <SolaceTooltip title="Attribute Badge With Long Content">Attribute Badge With Long Content</SolaceTooltip>,
	maxWidth: 100
};

export const WithColorTextAttributeBadge = Template.bind({});
WithColorTextAttributeBadge.args = {
	label: <span style={{ color: "#FFFFFF" }}>White Text</span>
};

export const WithDashedBorderAttributeBadge = Template.bind({});
WithDashedBorderAttributeBadge.args = {
	label: "Dashed Border Attribute Badge",
	variant: "outlined",
	dashedBorder: true
};

export const WithFillColorAttributeBadge = Template.bind({});
WithFillColorAttributeBadge.args = {
	label: "Fill Color Attribute Badge",
	fillColor: CHIP_COLORS.OPAQUE_BLUE
};

export const WithDeleteButtonAttributeBadge = Template.bind({});
WithDeleteButtonAttributeBadge.args = {
	label: "Attribute Badge Text",
	onDelete: action("delete button clicked")
};
