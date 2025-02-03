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
