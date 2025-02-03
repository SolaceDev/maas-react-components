import { Meta } from "@storybook/react";

import { SolaceLabel } from "@SolaceDev/maas-react-components";

(SolaceLabel as React.FC & { displayName?: string }).displayName = "SolaceLabel";

export default {
	title: "Input/Label/Inline",
	component: SolaceLabel,
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceLabel"
			}
		}
	},
	argTypes: {
		htmlForId: {
			control: {
				type: "text"
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
		}
	}
} as Meta<typeof SolaceLabel>;

const label = "Custom Label";

export const DefaultLabel = {
	args: {
		id: "demoTextFieldId",
		children: label
	}
};

export const Required = {
	args: {
		id: "demoTextFieldId",
		required: true,
		children: label
	}
};

export const Disabled = {
	args: {
		id: "demoTextFieldId",
		disabled: true,
		children: label
	}
};
