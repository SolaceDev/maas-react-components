import { Meta } from "@storybook/react";

import { SolaceStackLabel } from "@SolaceDev/maas-react-components";

(SolaceStackLabel as React.FC & { displayName?: string }).displayName = "SolaceStackLabel";

export default {
	title: "Input/Label/Stacked",
	component: SolaceStackLabel,
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceStackLabel"
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

const label = "Custom Label";

export const DefaultLabel = {
	args: {
		id: "demoTextFieldId",
		children: label
	}
};

export const LargeLabel = {
	args: {
		id: "demoTextFieldId",
		large: true,
		children: label
	}
};

export const BoldLabel = {
	args: {
		id: "demoTextFieldId",
		bold: true,
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
