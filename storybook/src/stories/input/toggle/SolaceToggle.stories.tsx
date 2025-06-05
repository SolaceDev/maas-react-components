import { Meta } from "@storybook/react";

import { SolaceToggle } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

(SolaceToggle as React.FC & { displayName?: string }).displayName = "SolaceToggle";

export default {
	title: "Input/Toggle Switch",
	component: SolaceToggle,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/UI-Library%3A-Patterns?node-id=2937%3A22461"
		},
		docs: {
			description: {
				component:
					"Toggle switch component for reuse in all Solace based applications. Code component name: SolaceToggle"
			}
		}
	},
	argTypes: {
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
		largeLabel: {
			control: {
				type: "boolean"
			}
		},
		stateText: {
			control: {
				type: "boolean"
			}
		}
	}
} as Meta<typeof SolaceToggle>;

const title = "Demo Toggle";
const label = "Some Label";

export const DefaultToggle = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoToggleId",
		name: "demoToggle"
	}
};

export const Labeled = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoToggleId",
		name: "demoToggle",
		label: label
	}
};

export const LargeLabel = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoToggleId",
		name: "demoToggle",
		label: label,
		largeLabel: true
	}
};

export const LabeledWithStateText = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoToggleId",
		name: "demoToggle",
		label: label,
		stateText: true
	}
};

export const HelperText = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoToggleId",
		name: "demoToggle",
		label: label,
		helperText: "Some helper text here"
	}
};

export const WithErrors = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoToggleId",
		name: "demoToggle",
		label: label,
		hasErrors: true,
		helperText: "Some error occured"
	}
};

export const Required = {
	args: {
		onChange: action("callback"),
		name: "demoToggle",
		title: title,
		label: label,
		required: true
	}
};

export const Disabled = {
	args: {
		onChange: action("callback"),
		name: "demoToggle",
		title: title,
		label: label,
		isOn: true,
		disabled: true
	}
};
