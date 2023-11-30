import { Meta } from "@storybook/react";
import { SolaceCircularProgress } from "@SolaceDev/maas-react-components";

export default {
	title: "Under Construction/SolaceCircularProgress",
	component: SolaceCircularProgress,
	parameters: {},
	argTypes: {
		variant: {
			options: ["determinate", "indeterminate"],
			control: {
				type: "select"
			}
		},
		size: {
			options: ["sm", "md", "lg"],
			control: {
				type: "select"
			}
		},
		value: {
			control: {
				type: "text"
			}
		}
	}
} as Meta<typeof SolaceCircularProgress>;

export const DefaultVariant = {
	args: {}
};

export const DeterminateVariant = {
	args: {
		variant: "determinate",
		value: 90
	}
};
