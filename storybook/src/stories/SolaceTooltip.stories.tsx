import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceTooltip, DeleteIcon, SolaceButton } from "@SolaceDev/maas-react-components";
import { HelpOutlineOutlined } from "@material-ui/icons";
import { ReactNode } from "react";

export default {
	title: "Under Construction/SolaceTooltip",
	component: SolaceTooltip,
	parameters: {},
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
		}
	}
} as ComponentMeta<typeof SolaceTooltip>;

const Template: ComponentStory<typeof SolaceTooltip> = (args) => <SolaceTooltip {...args} />;

const TITLE = "Sample Tooltip";
const LONG_TEXT =
	"Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus. Praesent non nunc mollis, fermentum neque at, semper arcu. Nullam eget est sed sem iaculis gravida eget vitae justo.";

export const DefaultTooltip = Template.bind({});
DefaultTooltip.args = {
	title: TITLE
};

export const CustomChildren = Template.bind({});
CustomChildren.args = {
	title: "Delete",
	children: <DeleteIcon />
};

export const CustomPlacement = Template.bind({});
CustomPlacement.args = {
	title: TITLE,
	children: <HelpOutlineOutlined style={{ margin: "40px 100px" }} fontSize="large" />,
	placement: "left-start"
};

export const LongTitle = Template.bind({});
LongTitle.args = {
	title: LONG_TEXT
};

export const CustomMediumWidth = Template.bind({});
CustomMediumWidth.args = {
	title: LONG_TEXT,
	maxWidth: "medium"
};

export const CustomFullWidth = Template.bind({});
CustomFullWidth.args = {
	title: LONG_TEXT,
	maxWidth: "full"
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
