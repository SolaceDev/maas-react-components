import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceChip, SolaceTooltip } from "@SolaceDev/maas-react-components";
import { BASE_COLORS } from "../../../src/resources/colorPallette";

export default {
	title: "Under Construction/SolaceChip",
	component: SolaceChip,
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
			options: ["royalBlue", "darkBlue", "opaqueBlue", "lightGrey", "smokeGrey"],
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
			options: ["royalBlue", "darkBlue", "opaqueBlue", "lightGrey", "smokeGrey"],
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
			options: ["royalBlue", "darkBlue", "opaqueBlue", "lightGrey", "smokeGrey"],
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
	}
} as ComponentMeta<typeof SolaceChip>;

const Template: ComponentStory<typeof SolaceChip> = (args) => <SolaceChip {...args} />;

export const DefaultChip = Template.bind({});
DefaultChip.args = {
	label: "Filled Chip"
};

export const OutlinedChip = Template.bind({});
OutlinedChip.args = {
	label: "Outlined Chip",
	variant: "outlined"
};

export const ClickableChip = Template.bind({});
ClickableChip.args = {
	label: "Clickable Chip",
	clickable: true
};

export const EllipsisContentChip = Template.bind({});
EllipsisContentChip.args = {
	label: "Chip With Long Content",
	maxWidth: "100"
};

export const LargeFontSizeChip = Template.bind({});
LargeFontSizeChip.args = {
	label: "Large Text",
	size: "lg"
};

export const BoldLabelChip = Template.bind({});
BoldLabelChip.args = {
	label: "Bold Label Chip",
	boldLabel: true
};

export const NonCompressedChip = Template.bind({});
NonCompressedChip.args = {
	label: "Non Compressed Chip",
	size: "xs",
	compressed: false
};

export const WithTooltipChip = Template.bind({});
WithTooltipChip.args = {
	label: <SolaceTooltip title="Chip With Long Content">Chip With Long Content</SolaceTooltip>,
	maxWidth: "100"
};

export const WithColorTextChip = Template.bind({});
WithColorTextChip.args = {
	label: <span style={{ color: BASE_COLORS.whites.white1 }}>White Text</span>,
	maxWidth: "100"
};

export const WithDashedBorderChip = Template.bind({});
WithDashedBorderChip.args = {
	label: "Dashed Border Chip",
	variant: "outlined",
	dashedBorder: true
};

export const WithFillColorChip = Template.bind({});
WithFillColorChip.args = {
	label: "Fill Color Chip",
	fillColor: "opaqueBlue"
};

export const WithDeleteButtonChip = () => {
	const handleDelete = () => {
		alert("delete acton triggered");
	};
	return <SolaceChip label="Chip Text" onDelete={handleDelete} />;
};
