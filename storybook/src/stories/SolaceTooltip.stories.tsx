import React, { ReactNode, useState } from "react";
import { Meta, Decorator } from "@storybook/react";
import {
	SolaceTooltip,
	DeleteIcon,
	SolaceTextField,
	HelpOutlineOutlinedIcon,
	AddCircleOutlineOutlinedIcon,
	SolaceLabel,
	TooltipVariant,
	SolaceButton
} from "@SolaceDev/maas-react-components";
import { userEvent, within } from "@storybook/test";

(SolaceTooltip as React.FC & { displayName?: string }).displayName = "SolaceTooltip";
(SolaceTextField as React.FC & { displayName?: string }).displayName = "SolaceTextField";
(SolaceLabel as React.FC & { displayName?: string }).displayName = "SolaceLabel";
(DeleteIcon as React.FC & { displayName?: string }).displayName = "DeleteIcon";
(HelpOutlineOutlinedIcon as React.FC & { displayName?: string }).displayName = "HelpOutlineOutlinedIcon";
(AddCircleOutlineOutlinedIcon as React.FC & { displayName?: string }).displayName = "AddCircleOutlineOutlinedIcon";

// Create a decorator to increase the snapshot window size"
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
		},
		chromatic: { delay: 1000 }
	},
	argTypes: {
		id: {
			control: { type: "text" }
		},
		title: {
			description: "Tooltip content"
		},
		variant: {
			options: ["text", "overflow", "rich"],
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
	},
	decorators: [withSnapshotContainer]
} as Meta<typeof SolaceTooltip>;

const TITLE = "Sample Tooltip";
const LONG_TEXT =
	"Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus. Praesent non nunc mollis, fermentum neque at, semper arcu. Nullam eget est sed sem iaculis gravida eget vitae justo.";

const hoverListener = async (canvasElement, element, queryType) => {
	const canvas = within(canvasElement);
	const elementWithMoreInfo = canvas[queryType](element);
	if (elementWithMoreInfo) {
		await userEvent.hover(elementWithMoreInfo);
	}
};

export const DefaultTooltip = {
	args: {
		title: TITLE,
		children: <DeleteIcon />
	},

	play: async ({ canvasElement }) => {
		hoverListener(canvasElement, "DeleteIcon", "queryByTestId");
	}
};

export const CustomPlacement = {
	args: {
		title: TITLE,
		children: <DeleteIcon style={{ margin: "40px 100px" }} fontSize="large" />,
		placement: "left-start"
	},

	play: async ({ canvasElement }) => {
		hoverListener(canvasElement, "DeleteIcon", "queryByTestId");
	}
};

export const LongTitle = {
	args: {
		title: LONG_TEXT,
		children: <HelpOutlineOutlinedIcon />
	},

	play: async ({ canvasElement }) => {
		hoverListener(canvasElement, "HelpOutlineOutlinedIcon", "queryByTestId");
	}
};

export const CustomMediumWidth = {
	args: {
		title: LONG_TEXT,
		children: <HelpOutlineOutlinedIcon />,
		maxWidth: "medium"
	},

	play: async ({ canvasElement }) => {
		hoverListener(canvasElement, "HelpOutlineOutlinedIcon", "queryByTestId");
	}
};

export const CustomFullWidth = {
	args: {
		title: LONG_TEXT,
		children: <HelpOutlineOutlinedIcon />,
		maxWidth: "full"
	},

	play: async ({ canvasElement }) => {
		hoverListener(canvasElement, "HelpOutlineOutlinedIcon", "queryByTestId");
	}
};

export const DisableHoverListener = {
	args: {
		title: LONG_TEXT,
		children: <HelpOutlineOutlinedIcon />,
		disableHoverListener: true
	}
};

export const OverflowTooltipLongText = (): ReactNode => {
	return (
		<div style={{ width: "400px" }}>
			<SolaceTooltip variant={TooltipVariant.overflow} title={LONG_TEXT}>
				{LONG_TEXT}
			</SolaceTooltip>
		</div>
	);
};

OverflowTooltipLongText.play = async ({ canvasElement }) => {
	hoverListener(canvasElement, LONG_TEXT, "getByText");
};

export const OverflowTooltipShortText = (): ReactNode => {
	return (
		<div style={{ width: "50px" }}>
			<SolaceTooltip variant={TooltipVariant.overflow} title={TITLE}>
				{TITLE}
			</SolaceTooltip>
		</div>
	);
};

OverflowTooltipShortText.play = async ({ canvasElement }) => {
	hoverListener(canvasElement, TITLE, "getByText");
};

export const OverflowTooltipLongTextMediumWidth = (): ReactNode => {
	return (
		<div style={{ width: "400px" }}>
			<SolaceTooltip variant={TooltipVariant.overflow} title={LONG_TEXT} maxWidth="medium">
				{LONG_TEXT}
			</SolaceTooltip>
		</div>
	);
};

OverflowTooltipLongTextMediumWidth.play = async ({ canvasElement }) => {
	hoverListener(canvasElement, LONG_TEXT, "getByText");
};

export const OverflowTooltipLongTextElement = (): ReactNode => {
	return (
		<div style={{ width: "400px" }}>
			<SolaceTooltip variant={TooltipVariant.overflow} title={LONG_TEXT}>
				<span style={{ fontStyle: "italic" }}>{LONG_TEXT}</span>
			</SolaceTooltip>
		</div>
	);
};

OverflowTooltipLongTextElement.play = async ({ canvasElement }) => {
	hoverListener(canvasElement, LONG_TEXT, "getByText");
};

export const OverflowTooltipShortTextElement = (): ReactNode => {
	return (
		<div style={{ width: "50px" }}>
			<SolaceTooltip variant={TooltipVariant.overflow} title={TITLE}>
				<span style={{ fontStyle: "italic" }}>{TITLE}</span>
			</SolaceTooltip>
		</div>
	);
};

OverflowTooltipShortTextElement.play = async ({ canvasElement }) => {
	hoverListener(canvasElement, TITLE, "getByText");
};

export const OverflowTooltipLongTextElementRespondToResize = (): ReactNode => {
	return (
		<div style={{ width: "100%" }}>
			<SolaceTooltip variant={TooltipVariant.overflow} title={LONG_TEXT}>
				<span style={{ fontStyle: "italic" }}>{LONG_TEXT}</span>
			</SolaceTooltip>
		</div>
	);
};

OverflowTooltipLongTextElementRespondToResize.play = async ({ canvasElement }) => {
	hoverListener(canvasElement, LONG_TEXT, "getByText");
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
			<SolaceTooltip variant={TooltipVariant.text} title={"Add"}>
				<AddCircleOutlineOutlinedIcon />
			</SolaceTooltip>
			<SolaceTooltip variant={TooltipVariant.text} title={"Delete"}>
				<DeleteIcon />
			</SolaceTooltip>
			<SolaceTooltip variant={TooltipVariant.text} title={"Hint"}>
				<HelpOutlineOutlinedIcon />
			</SolaceTooltip>
		</div>
	);
};

TooltipGroup.play = async ({ canvasElement }) => {
	hoverListener(canvasElement, "DeleteIcon", "queryByTestId");
};

export const ControlledTooltip = (): ReactNode => {
	const [actionOpen, setActionOpen] = useState(false);
	const [inputWithTooltip, setInputWithTooltip] = useState("");
	const [inputFocused, setInputFocused] = useState(false);
	const [inputWithoutTooltip, setInputWithoutTooltip] = useState("");

	function handleFocus() {
		setInputFocused(true);
		setActionOpen(false);
	}

	function handleBlur() {
		setInputFocused(false);
	}

	function handleOpen() {
		if (inputFocused) {
			return;
		}
		setActionOpen(true);
	}

	function handleClose() {
		setActionOpen(false);
	}

	function handleChange(e) {
		if (e.name === "inputWithTooltip") {
			setInputWithTooltip(e.value);
		} else if (e.name === "inputWithoutTooltip") {
			setInputWithoutTooltip(e.value);
		}
	}

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "100px 200px 100px 200px",
				gridTemplateRows: "auto",
				columnGap: "8px",
				rowGap: "8px",
				alignItems: "center"
			}}
		>
			<SolaceLabel id="inputWithTooltipLabel" htmlForId="inputWithTooltip">
				With Toolip
			</SolaceLabel>
			<SolaceTooltip
				variant={TooltipVariant.text}
				title={"Input Something"}
				open={actionOpen}
				onOpen={handleOpen}
				onClose={handleClose}
				enterDelay={800}
				enterNextDelay={800}
			>
				<span>
					<SolaceTextField
						id="inputWithTooltip"
						name="inputWithTooltip"
						value={inputWithTooltip}
						onFocus={handleFocus}
						onBlur={handleBlur}
						onChange={handleChange}
					/>
				</span>
			</SolaceTooltip>
			<SolaceLabel id="inputWithTooltipLabel">Without Toolip</SolaceLabel>
			<SolaceTextField name="inputWithoutTooltip" value={inputWithoutTooltip} onChange={handleChange} />
		</div>
	);
};

ControlledTooltip.play = async ({ canvasElement }) => {
	hoverListener(canvasElement, "With Toolip", "queryByLabelText");
};

export const TooltipWithAndWithoutFocusListener = (): ReactNode => {
	return (
		<div
			style={{
				width: "400px",
				display: "grid",
				gridTemplateColumns: "auto auto auto",
				gridTemplateRows: "auto",
				columnGap: "8px"
			}}
		>
			<SolaceTooltip variant={TooltipVariant.text} title={"Add"}>
				<SolaceTextField name="input1" value={"add"} autoFocus={true} />
			</SolaceTooltip>
			<SolaceTooltip variant={TooltipVariant.text} title={"Delete"} disableFocusListener={true}>
				<SolaceTextField name="input2" value={"delete"} />
			</SolaceTooltip>
			<SolaceTooltip variant={TooltipVariant.text} title={"Hint"}>
				<SolaceTextField name="input3" value={"hint"} />
			</SolaceTooltip>
		</div>
	);
};

export const DefaultRichVariantTooltip = {
	args: {
		title: "simple text",
		children: <span data-testid="tooltip-details">Hover content</span>,
		variant: "html",
		maxWidth: "medium"
	},
	decorators: [withSnapshotContainer],
	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		const triggerElement = canvas.getByTestId("tooltip-details");
		await userEvent.hover(triggerElement);
	}
};

DefaultRichVariantTooltip.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	await userEvent.hover(canvas.getByText("Hover content"));
};

const MyComp = ({ myRef, ...props }) => {
	return (
		<div
			{...props}
			ref={myRef}
			style={{ width: "180px", backgroundColor: "skyblue", padding: "20px", textAlign: "center", cursor: "pointer" }}
			data-testid="tooltip-details"
		>
			Custom Component
		</div>
	);
};

// to properly apply ref use forwardRef
const MyCompForwardRef = React.forwardRef((props, ref) => {
	return <MyComp {...props} myRef={ref} />;
});

export const CustomComponentWithRichContentVariant = {
	args: {
		title: "simple text",
		children: <MyCompForwardRef />,
		maxWidth: "medium",
		variant: TooltipVariant.rich
	},

	play: async ({ canvasElement }) => {
		hoverListener(canvasElement, "Custom Component", "getByText");
	}
};

/**
 * Using Enum version list as an example to demonstrate how to customize both the hover over element and the Tooltip rich variant component
 */

// mock-up data
const enumVersionList = [
	{
		version: "1.1.0",
		desc: "description for version 1.1.0",
		values: ["value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8", "value9", "value10"]
	},
	{
		version: "1.1.1",
		desc: "description for version 1.1.1",
		values: ["value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8", "value9"]
	},
	{
		version: "1.1.2",
		desc: "description for version 1.1.2",
		values: ["value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8"]
	},
	{
		version: "1.1.3",
		desc: "description for version 1.1.3",
		values: ["value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8", "value9", "value10"]
	},
	{
		version: "1.1.4",
		desc: "description for version 1.1.4",
		values: ["value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8", "value9", "value10"]
	}
];

// custom tooltip component
const EnumVersionTooltip = ({ desc, values }) => {
	return (
		<div>
			<h3>Description</h3>
			<div>{desc}</div>
			<h3>Values ({values.length})</h3>
			{values.map((value, index) => {
				return <div key={index}>{value}</div>;
			})}
		</div>
	);
};

interface EnumVersionItemProps {
	item: unknown;
}

// custom hover over element, in this case, an Enum list item
const EnumVersionItem = ({ item, itemRef, ...props }) => {
	return (
		<div
			{...props}
			ref={itemRef}
			style={{ width: "200px", height: "auto", padding: "10px", border: "1px solid lightgrey", cursor: "pointer" }}
		>
			{item.version}
		</div>
	);
};

export const RichVariantEnumVersionList = () => {
	// to properly apply ref use forwardRef
	const EnumVersionItemForwardRef = React.forwardRef<HTMLElement, React.PropsWithChildren<EnumVersionItemProps>>(
		(props, ref) => {
			return <EnumVersionItem {...props} item={props.item} itemRef={ref} />;
		}
	);
	return (
		<div
			style={{
				width: "250px",
				height: "250px",
				padding: "10px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "flex-start"
			}}
		>
			<div>Enum versions</div>
			<div>
				{enumVersionList.map((item, index) => {
					return (
						<div key={index}>
							<SolaceTooltip
								title={<EnumVersionTooltip desc={item.desc} values={item.values} />}
								placement="right-start"
								variant={TooltipVariant.rich}
							>
								<EnumVersionItemForwardRef item={item} data-testid={`richTooltip-details-${index}`} />
							</SolaceTooltip>
						</div>
					);
				})}
			</div>
		</div>
	);
};

RichVariantEnumVersionList.play = async ({ canvasElement }) => {
	hoverListener(canvasElement, "richTooltip-details-2", "getByTestId");
};

export const TooltipRichVariantAdditonalDetails = {
	args: {
		variant: TooltipVariant.rich,
		title: (
			<div>
				<span>Semantic versioning is in the form of MAJOR.MINOR.PATCH format. For additional information, see </span>
				<SolaceButton variant="link" href="https://semver.org">
					Semantic versioning best practices
				</SolaceButton>
			</div>
		),
		children: <HelpOutlineOutlinedIcon />
	},

	play: async ({ canvasElement }) => {
		hoverListener(canvasElement, "HelpOutlineOutlinedIcon", "queryByTestId");
	}
};

export const TooltipRichVariantAdditonalDetailsMediumWidth = {
	args: {
		variant: TooltipVariant.rich,
		title: (
			<div>
				<span>Semantic versioning is in the form of MAJOR.MINOR.PATCH format. For additional information, see </span>
				<SolaceButton variant="link" href="https://semver.org">
					Semantic versioning best practices
				</SolaceButton>
			</div>
		),
		children: <HelpOutlineOutlinedIcon />,
		maxWidth: "medium"
	},

	play: async ({ canvasElement }) => {
		hoverListener(canvasElement, "HelpOutlineOutlinedIcon", "queryByTestId");
	}
};
