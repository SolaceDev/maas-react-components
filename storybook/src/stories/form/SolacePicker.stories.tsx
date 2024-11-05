import React from "react";
import { Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/test";

import { SolacePicker } from "@SolaceDev/maas-react-components";
import {
	Maintenance24Icon,
	Construction24Icon,
	Toolkit24Icon,
	Terminal24Icon,
	Bug24Icon,
	TestTube24Icon,
	NewRelease24Icon,
	ContentSearch24Icon,
	Broker24Icon,
	RocketLaunch24Icon,
	Verified24Icon,
	DeployedCode24Icon
} from "@SolaceDev/maas-icons";

export default {
	title: "Forms/SolacePicker",
	component: SolacePicker,
	parameters: {
		controls: { sort: "alpha" }
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
	}
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

export const IconPicker = {
	args: {
		variant: "icons",
		label: "Icon",
		value: "DEPLOYED_CODE",
		onChange: action("callback"),
		title: "Icon Picker",
		id: "demoIconPickerId",
		name: "demoIconPicker",
		icons: {
			MAINTENANCE: <Maintenance24Icon />,
			CONSTRUCTION: <Construction24Icon />,
			TOOLKIT: <Toolkit24Icon />,
			TERMINAL: <Terminal24Icon />,
			BUG: <Bug24Icon />,
			TEST_TUBE: <TestTube24Icon />,
			NEW_RELEASE: <NewRelease24Icon />,
			CONTENT_SEARCH: <ContentSearch24Icon />,
			BROKER: <Broker24Icon />,
			ROCKET_LAUNCH: <RocketLaunch24Icon />,
			VERIFIED: <Verified24Icon />,
			DEPLOYED_CODE: <DeployedCode24Icon />
		}
	},

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
