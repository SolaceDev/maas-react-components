/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
	title: "Data Display/Badge/Attribute",
	component: SolaceAttributeBadge,
	parameters: {},
	argTypes: {
		label: {
			control: { type: "text" },
			description:
				"The content to be displayed in the attribute badge. Can be a string or JSX element for more complex content like tooltips or styled text. Attribute badges are typically used for displaying metadata or categorical information.",
			table: {
				type: { summary: "string | React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		variant: {
			options: ["outlined", "filled"],
			control: { type: "radio" },
			description:
				"The visual style variant of the attribute badge. 'filled' provides a solid background for high visibility, while 'outlined' provides a border-only style for subtle categorization without visual weight. https://github.com/SolaceDev/maas-react-components/blob/main/src/types/solaceChip.ts",
			table: {
				type: { summary: '"outlined" | "filled"' },
				defaultValue: { summary: '"filled"' }
			}
		},
		disabled: {
			control: { type: "boolean" },
			description:
				"If true, the attribute badge will be disabled and appear muted. Use this when the attribute represents information that is not currently applicable or actionable.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		size: {
			options: ["xs", "sm", "md", "lg", "xl", "xxl", "huge"],
			control: {
				type: "select"
			},
			description:
				"The size of the attribute badge affecting both font size and padding. Use smaller sizes for dense layouts and larger sizes for emphasis or when the badge is a primary interface element. https://github.com/SolaceDev/maas-react-components/blob/main/src/types/sizing.ts",
			table: {
				type: { summary: '"xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "huge"' },
				defaultValue: { summary: '"xs"' }
			}
		},
		borderColor: {
			options: Object.values(CHIP_COLORS),
			control: {
				type: "select"
			},
			description:
				"Custom border color for the attribute badge. Use this to create color-coded categorization systems or to match specific design requirements. Only applicable when variant is 'outlined'.",
			table: {
				type: { summary: "CHIP_COLORS" },
				defaultValue: { summary: "undefined" }
			}
		},
		borderRadius: {
			options: ["sm", "md", "lg"],
			control: {
				type: "select"
			},
			description:
				"The border radius size of the attribute badge. Use 'sm' for sharp corners, 'md' for standard rounded corners, or 'lg' for pill-shaped badges. https://github.com/SolaceDev/maas-react-components/blob/main/src/types/sizing.ts",
			table: {
				type: { summary: '"sm" | "md" | "lg"' },
				defaultValue: { summary: '"md"' }
			}
		},
		dashedBorder: {
			control: {
				type: "boolean"
			},
			description:
				"If true, the border will be dashed instead of solid. Use this for badges representing temporary, pending, or draft states. Only applicable when variant is 'outlined'.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		fillColor: {
			options: Object.values(CHIP_COLORS),
			control: {
				type: "select"
			},
			description:
				"Custom background color for the attribute badge. Use this to create color-coded categorization systems or to match specific brand colors. Only applicable when variant is 'filled'.",
			table: {
				type: { summary: "CHIP_COLORS" },
				defaultValue: { summary: "undefined" }
			}
		},
		boldLabel: {
			control: {
				type: "boolean"
			},
			description:
				"If true, the label text will be bold (font-weight 600). Use this for emphasizing important attributes or when the badge needs to stand out more prominently.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" }
			}
		},
		labelColor: {
			options: Object.values(CHIP_COLORS),
			control: {
				type: "select"
			},
			description:
				"Custom text color for the attribute badge label. Use this in conjunction with fillColor or borderColor to ensure proper contrast and readability.",
			table: {
				type: { summary: "CHIP_COLORS" },
				defaultValue: { summary: "undefined" }
			}
		},
		height: {
			options: ["sm", "md", "lg"],
			control: {
				type: "select"
			},
			description:
				"The height of the attribute badge. Use this to control the vertical space the badge occupies, independent of the font size controlled by the 'size' prop. https://github.com/SolaceDev/maas-react-components/blob/main/src/types/sizing.ts",
			table: {
				type: { summary: '"sm" | "md" | "lg"' },
				defaultValue: { summary: '"md"' }
			}
		},
		compressed: {
			control: { type: "boolean" },
			description:
				"If true, reduces the horizontal padding of the badge for a more compact appearance. Use this in dense layouts where space is constrained.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" }
			}
		},
		clickable: {
			control: { type: "boolean" },
			description:
				"If true, the attribute badge will be clickable and show hover effects. Use this when the badge should trigger an action such as filtering or navigation.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		maxWidth: {
			control: { type: "number" },
			description:
				"Maximum width of the attribute badge in pixels. When the content exceeds this width, it will be truncated with an ellipsis. Use this to maintain consistent layout.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify attribute badges during automated testing.",
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
