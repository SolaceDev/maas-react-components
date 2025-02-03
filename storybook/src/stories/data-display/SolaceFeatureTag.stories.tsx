import { Meta } from "@storybook/react";
import { SolaceFeatureTag } from "@SolaceDev/maas-react-components";

(SolaceFeatureTag as React.FC & { displayName?: string }).displayName = "SolaceFeatureTag";

export default {
	title: "Data Display/Badge/Feature",
	component: SolaceFeatureTag,
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceFeatureTag"
			}
		}
	},
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
