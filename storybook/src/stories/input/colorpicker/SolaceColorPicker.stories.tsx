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
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/test";
import { SolacePicker } from "@SolaceDev/maas-react-components";

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
	title: "Input/Picker/Colour",
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
		id: {
			control: { type: "text" },
			description: "Unique identifier for the color picker component. Used for accessibility and programmatic access.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		name: {
			control: { type: "text" },
			description: "Name attribute for the color picker input. Used for form submission and identification.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		label: {
			control: { type: "text" },
			description:
				"Label text displayed above or beside the color picker. Provides context for what the user is selecting.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		value: {
			control: { type: "text" },
			description:
				"The selected color values as a comma-separated string (e.g., '#FF0000,#00FF00'). This is the controlled value.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		onChange: {
			description:
				"Callback function triggered when color selection changes. Receives the new color value(s) as parameter.",
			table: {
				type: { summary: "(value: string) => void" },
				defaultValue: { summary: "undefined" }
			}
		},
		variant: {
			control: { type: "select" },
			options: ["colors", "icons"],
			description: "The type of picker to display. 'colors' shows a color palette, 'icons' shows an icon selection.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "colors" }
			}
		},
		title: {
			control: { type: "text" },
			description: "Title attribute for the picker input. Provides additional context on hover.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		helperText: {
			control: { type: "text" },
			description:
				"Helper text displayed below the picker. Can be used for instructions, error messages, or additional context.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		hasErrors: {
			control: { type: "boolean" },
			description: "If true, displays the picker in an error state with red styling to indicate validation issues.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		inlineLabel: {
			control: { type: "boolean" },
			description:
				"If true, displays the label inline (beside) the picker instead of above it. Useful for compact layouts.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		required: {
			control: { type: "boolean" },
			description: "If true, marks the picker as required and displays a required indicator (*) in the label.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		disabled: {
			control: { type: "boolean" },
			description: "If true, disables the picker and prevents user interaction. The picker appears grayed out.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		readOnly: {
			control: { type: "boolean" },
			description: "If true, makes the picker read-only. Users can see the value but cannot change it.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		displayEmpty: {
			control: { type: "boolean" },
			description: "If true, allows the picker to display an empty state when no value is selected.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify the color picker during automated testing.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		}
	},
	decorators: [withSnapshotContainer]
} as Meta<typeof SolacePicker>;

export const ColorPicker = {
	args: {
		variant: "colors",
		label: "Color",
		value: "#000000,#FFFFFF",
		onChange: action("callback"),
		title: "Color Picker",
		id: "demoColorPickerId",
		name: "demoColorPicker"
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole("combobox"));
	}
};
