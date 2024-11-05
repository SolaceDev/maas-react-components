import React from "react";
import { Decorator, Meta } from "@storybook/react";
import { SolaceEnvironmentLabel } from "@SolaceDev/maas-react-components";
import { Broker16Icon } from "@SolaceDev/maas-icons";

// Create a decorator to decrease the snapshot window size
const withSnapshotContainer: Decorator = (Story) => {
	return (
		<div id="snapshot" style={{ width: "200px", height: "50px" }}>
			<Story />
		</div>
	);
};

export default {
	title: "Under Construction/SolaceEnvironmentLabel",
	component: SolaceEnvironmentLabel,
	parameters: {},
	argTypes: {
		label: { control: { type: "text" } },
		fgColor: { control: { type: "color" } },
		bgColor: { control: { type: "color" } },
		variant: {
			options: ["standard", "title"],
			control: {
				type: "select"
			}
		}
	},
	decorators: [withSnapshotContainer]
} as Meta<typeof SolaceEnvironmentLabel>;

export const DefaultEnvironmentLabel = {
	args: {
		label: "Default",
		fgColor: "#ffffff",
		bgColor: "#7841A8",
		icon: <Broker16Icon />,
		variant: "standard"
	}
};

export const LabelTitleVariant = {
	args: {
		label: "Default",
		fgColor: "#ffffff",
		bgColor: "#7841A8",
		icon: <Broker16Icon />,
		variant: "title"
	}
};

export const LongTitle = {
	args: {
		label: "This is an environment with a very long name",
		fgColor: "#ffffff",
		bgColor: "#7841A8",
		icon: <Broker16Icon />,
		variant: "standard"
	}
};
