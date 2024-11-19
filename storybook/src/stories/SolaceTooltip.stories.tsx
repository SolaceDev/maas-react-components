import React, { ReactNode, useState } from "react";
import { Meta, Decorator } from "@storybook/react";
import {
	SolaceTooltip,
	DeleteIcon,
	SolaceTextField,
	HelpOutlineOutlinedIcon,
	AddCircleOutlineOutlinedIcon,
	SolaceLabel,
	TooltipVariant
} from "@SolaceDev/maas-react-components";
import { userEvent, within } from "@storybook/test";

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
			options: ["text", "overflow"],
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
