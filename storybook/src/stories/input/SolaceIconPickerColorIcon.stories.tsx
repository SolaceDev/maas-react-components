import React from "react";
import { Meta, Decorator, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/test";
import { Box, SolacePicker, styled, useTheme } from "@SolaceDev/maas-react-components";

(SolacePicker as React.FC & { displayName?: string }).displayName = "SolacePicker";

// Create a decorator to include the dropdown inside the snapshot"
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
	title: "Input/Picker/Icon",
	component: SolacePicker,
	parameters: {
		controls: { sort: "alpha" },
		docs: {
			description: {
				component: "Code component name: SolacePicker"
			}
		}
	},
	argTypes: {
		label: {
			control: {
				type: "text"
			}
		},
		helperText: {
			control: {
				type: "text"
			}
		},
		hasErrors: {
			control: {
				type: "boolean"
			}
		},
		inlineLabel: {
			control: {
				type: "boolean"
			}
		},
		required: {
			control: {
				type: "boolean"
			}
		},
		disabled: {
			control: {
				type: "boolean"
			}
		},
		readOnly: {
			control: {
				type: "boolean"
			}
		},
		value: {
			control: {
				type: "text"
			}
		},
		displayEmpty: {
			control: {
				type: "boolean"
			}
		},
		numOfItemsPerRow: {
			control: {
				type: "number"
			}
		},
		numOfRowsDisplayed: {
			control: {
				type: "number"
			}
		},
		autoFocusItem: {
			control: {
				type: "boolean"
			}
		}
	},
	decorators: [withSnapshotContainer]
} as Meta<typeof SolacePicker>;

const NodeColorBlockContainer = styled("div")(({ theme }) => ({
	display: "inline-block",
	width: theme.spacing(3),
	height: theme.spacing(3),
	boxSizing: "border-box",
	borderRadius: theme.spacing(0.5)
}));

const NodeColorBlockDualColorContainer = styled(NodeColorBlockContainer)(() => ({
	display: "grid",
	gridTemplateColumns: "50% 50%",
	columnGap: "1px"
}));

const SupportedColorVariationList = ["n2", "n0", "n3"];

function NodeColorBlock({ colorVariation, nodeType }: { colorVariation: string; nodeType?: string }) {
	const theme = useTheme();

	const dualColor = nodeType === "applicationDomain";
	const accentValueWMain = theme.palette.ux.accent[colorVariation].wMain;
	const accentValueW100 = theme.palette.ux.accent[colorVariation].w100;

	if (dualColor) {
		const bgColor = accentValueWMain;
		const bgColor2 = accentValueW100;

		return (
			<NodeColorBlockDualColorContainer>
				<Box
					sx={{
						backgroundColor: bgColor,
						borderTopLeftRadius: theme.spacing(0.5),
						borderBottomLeftRadius: theme.spacing(0.5)
					}}
				></Box>
				<Box
					sx={{
						backgroundColor: bgColor2,
						borderTopRightRadius: theme.spacing(0.5),
						borderBottomRightRadius: theme.spacing(0.5)
					}}
				></Box>
			</NodeColorBlockDualColorContainer>
		);
	} else {
		const bgColor = nodeType === "event" ? accentValueWMain : accentValueW100;

		return <NodeColorBlockContainer style={{ backgroundColor: bgColor }}></NodeColorBlockContainer>;
	}
}

function getNodeColorForCustomization(nodeType: string): { [key: string]: JSX.Element } {
	const colors = {};

	SupportedColorVariationList.forEach((colorVariation) => {
		colors[colorVariation] = (
			<NodeColorBlock key={colorVariation} colorVariation={colorVariation} nodeType={nodeType} />
		);
	});

	return colors;
}

const Template: StoryFn<typeof SolacePicker> = (args) => {
	return (
		<SolacePicker
			{...args}
			variant="icons"
			name="demoIconPicker"
			value={"n2"}
			numOfItemsPerRow={3}
			onChange={action("callback")}
		/>
	);
};

export const ColorIcon = {
	render: Template,
	args: { icons: getNodeColorForCustomization("application"), iconKeyOrderedList: SupportedColorVariationList },

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole("combobox"));
	},

	parameters: {
		// Delay snapshot 1 second until all interactions are done
		chromatic: { delay: 1000 }
	}
};

export const DualColorIcon = {
	render: Template,
	args: { icons: getNodeColorForCustomization("applicationDomain"), iconKeyOrderedList: SupportedColorVariationList },

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole("combobox"));
	},

	parameters: {
		// Delay snapshot 1 second until all interactions are done
		chromatic: { delay: 1000 }
	}
};
