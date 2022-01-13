import React, { ReactNode } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
	SolaceTooltip,
	DeleteIcon,
	SolaceButton,
	HelpOutlineOutlinedIcon,
	AddCircleOutlineOutlinedIcon
} from "@SolaceDev/maas-react-components";

export default {
	title: "Under Construction/SolaceTooltip",
	component: SolaceTooltip,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=4434%3A30917"
		},
		docs: {
			description: {
				component: "Tooltip component for reuse in all Solace based applications"
			}
		}
	},
	argTypes: {
		id: {
			control: { type: "text" }
		},
		title: {
			description: "Tooltip content"
		},
		variant: {
			options: ["text", "overflow", "html"],
			control: {
				type: "select"
			}
		},
		placement: {
			options: [
				"bottom-end",
				"bottom-start",
				"bottom",
				"left-end",
				"left-start",
				"left",
				"right-end",
				"right-start",
				"right",
				"top-end",
				"top-start",
				"top"
			],
			control: {
				type: "select"
			}
		},
		maxWidth: {
			options: ["small", "medium", "full"],
			control: { type: "select" }
		},
		disableHoverListener: {
			control: { type: "boolean" }
		}
	}
} as ComponentMeta<typeof SolaceTooltip>;

const Template: ComponentStory<typeof SolaceTooltip> = (args) => <SolaceTooltip {...args} />;

const TITLE = "Sample Tooltip";
const LONG_TEXT =
	"Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus. Praesent non nunc mollis, fermentum neque at, semper arcu. Nullam eget est sed sem iaculis gravida eget vitae justo.";

export const DefaultTooltip = Template.bind({});
DefaultTooltip.args = {
	title: TITLE,
	children: <DeleteIcon />
};

export const CustomPlacement = Template.bind({});
CustomPlacement.args = {
	title: TITLE,
	children: <DeleteIcon style={{ margin: "40px 100px" }} fontSize="large" />,
	placement: "left-start"
};

export const LongTitle = Template.bind({});
LongTitle.args = {
	title: LONG_TEXT,
	children: <HelpOutlineOutlinedIcon />
};

export const CustomMediumWidth = Template.bind({});
CustomMediumWidth.args = {
	title: LONG_TEXT,
	children: <HelpOutlineOutlinedIcon />,
	maxWidth: "medium"
};

export const CustomFullWidth = Template.bind({});
CustomFullWidth.args = {
	title: LONG_TEXT,
	children: <HelpOutlineOutlinedIcon />,
	maxWidth: "full"
};

export const DisableHoverListener = Template.bind({});
DisableHoverListener.args = {
	title: LONG_TEXT,
	children: <HelpOutlineOutlinedIcon />,
	disableHoverListener: true
};

export const HtmlTooltip = Template.bind({});
HtmlTooltip.args = {
	title: (
		<div>
			<span>Semantic versioning is in the form of MAJOR.MINOR.PATCH format. For additional information, see </span>
			<SolaceButton variant="link" href="https://semver.org">
				Semantic versioning best practices
			</SolaceButton>
		</div>
	),
	children: <HelpOutlineOutlinedIcon />,
	variant: "html"
};

export const OverflowTooltipLongText = (): ReactNode => {
	return (
		<div style={{ width: "400px" }}>
			<SolaceTooltip variant="overflow" title={LONG_TEXT}>
				<span style={{ fontStyle: "italic" }}>{LONG_TEXT}</span>
			</SolaceTooltip>
		</div>
	);
};

export const OverflowTooltipShortText = (): ReactNode => {
	return (
		<div style={{ width: "400px" }}>
			<SolaceTooltip variant="overflow" title={TITLE}>
				<span style={{ fontStyle: "italic" }}>{TITLE}</span>
			</SolaceTooltip>
		</div>
	);
};

export const TooltipGroup = (): ReactNode => {
	return (
		<div
			style={{
				width: "400px",
				display: "grid",
				gridTemplateColumns: "32px 32px 32px",
				gridTemplateRows: "auto",
				columnGap: "8px"
			}}
		>
			<SolaceTooltip variant="text" title={"Add"}>
				<AddCircleOutlineOutlinedIcon />
			</SolaceTooltip>
			<SolaceTooltip variant="text" title={"Delete"}>
				<DeleteIcon />
			</SolaceTooltip>
			<SolaceTooltip variant="text" title={"Hint"}>
				<HelpOutlineOutlinedIcon />
			</SolaceTooltip>
		</div>
	);
};
