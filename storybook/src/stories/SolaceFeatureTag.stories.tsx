import { Meta } from "@storybook/react";
import { SolaceFeatureTag } from "@SolaceDev/maas-react-components";

export default {
	title: "Under Construction/SolaceFeatureTag",
	component: SolaceFeatureTag,
	parameters: {},
	argTypes: {
		text: { control: { type: "text" } },
		active: { control: { type: "boolean" } }
	}
} as Meta<typeof SolaceFeatureTag>;

export const DefaultReleaseTag = {
	args: {
		text: "beta",
		active: false
	}
};
