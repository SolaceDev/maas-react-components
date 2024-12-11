import React from "react";
import { Meta, Decorator } from "@storybook/react";
import { SolaceAttributeBadge, SolaceTooltip, CHIP_COLORS } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/test";

(SolaceAttributeBadge as React.FC & { displayName?: string }).displayName = "SolaceAttributeBadge";
(SolaceTooltip as React.FC & { displayName?: string }).displayName = "SolaceTooltip";

// Create a decorator to include the tooltip inside the snapshot"
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
} as Meta<typeof SolaceAttributeBadge>;

export const DefaultAttributeBadge = {
	args: {
		label: "Filled Attribute Badge"
	}
};

export const OutlinedAttributeBadge = {
	args: {
		label: "Outlined Attribute Badge",
		variant: "outlined"
	}
};

export const ClickableAttributeBadge = {
	args: {
		label: "Clickable Attribute Badge",
		clickable: true
	}
};

export const EllipsisContentAttributeBadge = {
	args: {
		label: "Attribute Badge With Long Content",
		maxWidth: 100
	}
};

export const LargeFontSizeAttributeBadge = {
	args: {
		label: "Larger Text",
		size: "md"
	}
};

export const NonBoldLabelAttributeBadge = {
	args: {
		label: "Regular (400) Font Weight",
		boldLabel: false
	}
};

export const NonCompressedAttributeBadge = {
	args: {
		label: "Non Compressed Attribute Badge",
		compressed: false
	}
};

export const WithTooltipAttributeBadge = {
	args: {
		label: <SolaceTooltip title="Attribute Badge With Long Content">Attribute Badge With Long Content</SolaceTooltip>,
		maxWidth: 100
	},
	decorators: [withSnapshotContainer],

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const targetElement = await canvas.getByText("Attribute Badge With Long Content");
		await userEvent.hover(targetElement);
	}
};

export const WithColorTextAttributeBadge = {
	args: {
		label: <span style={{ color: "#FFFFFF" }}>White Text</span>
	}
};

export const WithDashedBorderAttributeBadge = {
	args: {
		label: "Dashed Border Attribute Badge",
		variant: "outlined",
		dashedBorder: true
	}
};

export const WithFillColorAttributeBadge = {
	args: {
		label: "Fill Color Attribute Badge",
		fillColor: CHIP_COLORS.OPAQUE_BLUE
	}
};

export const WithDeleteButtonAttributeBadge = {
	args: {
		label: "Attribute Badge Text",
		onDelete: action("delete button clicked")
	}
};
