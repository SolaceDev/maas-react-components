import { Meta } from "@storybook/react";

import { SolaceStackLabel } from "@SolaceDev/maas-react-components";

export default {
	title: "Forms/SolaceStackLabel",
	component: SolaceStackLabel,
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
		},
		large: {
			control: {
				type: "boolean"
			}
		},
		bold: {
			control: {
				type: "boolean"
			}
		}
	}
} as Meta<typeof SolaceStackLabel>;

export const DefaultLabel = {
	args: {
		id: "demoTextFieldId",
		children: "Custom Label"
	}
};

export const LargeLabel = {
	args: {
		id: "demoTextFieldId",
		large: true,
		children: "Custom Label"
	}
};

export const BoldLabel = {
	args: {
		id: "demoTextFieldId",
		bold: true,
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
