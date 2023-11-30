import { Meta } from "@storybook/react";

import { SolaceLabel } from "@SolaceDev/maas-react-components";

export default {
	title: "Forms/SolaceLabel",
	component: SolaceLabel,
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

export const DefaultLabel = {
	args: {
		id: "demoTextFieldId",
		children: "Custom Label"
	}
};

export const Required = {
	args: {
		id: "demoTextFieldId",
		required: true,
		children: "Custom Label"
	}
};

export const Disabled = {
	args: {
		id: "demoTextFieldId",
		disabled: true,
		children: "Custom Label"
	}
};
