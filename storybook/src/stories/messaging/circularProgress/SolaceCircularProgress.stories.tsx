import { Meta } from "@storybook/react";
import { SolaceCircularProgress } from "@SolaceDev/maas-react-components";

(SolaceCircularProgress as React.FC & { displayName?: string }).displayName = "SolaceCircularProgress";

export default {
	title: "Messaging/Progress Indicator/Circular",
	component: SolaceCircularProgress,
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceCircularProgress"
			}
		}
	},
	argTypes: {
		variant: {
			options: ["determinate", "indeterminate"],
			control: {
				type: "select"
			}
		},
		size: {
			options: ["xs", "sm", "md", "lg"],
			control: {
				type: "select"
			}
		},
		disableShrink: {
			control: {
				type: "boolean"
			}
		},
		value: {
			control: {
				type: "text"
			}
		},
		message: {
			control: {
				type: "text"
			}
		}
	}
} as Meta<typeof SolaceCircularProgress>;

export const DefaultVariant = {
	args: {}
};

export const WithMessageVariant = {
	args: {
		message: "Loading"
	}
};

export const DeterminateVariant = {
	args: {
		variant: "determinate",
		value: 90
	}
};

export const LargeSize = {
	args: {
		size: "lg"
	}
};

export const DisableShrink = {
	args: {
		disableShrink: true
	}
};
