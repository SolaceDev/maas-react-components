import React from "react";
import { Meta } from "@storybook/react";
import { SolaceEnvironmentLabel } from "@SolaceDev/maas-react-components";
import { Broker16Icon } from "@SolaceDev/maas-icons";

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
	}
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

export const DefaultEnvironmentTitle = {
	args: {
		label: "Default",
		fgColor: "#ffffff",
		bgColor: "#7841A8",
		icon: <Broker16Icon />,
		variant: "title"
	}
};
