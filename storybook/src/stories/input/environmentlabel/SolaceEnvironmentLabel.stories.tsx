import React from "react";
import { Decorator, Meta } from "@storybook/react";
import {
	MenuItem,
	SolaceEnvironmentChipProps,
	SolaceEnvironmentLabel,
	SolaceSelect,
	useTheme
} from "@SolaceDev/maas-react-components";
import {
	Broker16Icon,
	Bug16Icon,
	Construction16Icon,
	ContentSearch16Icon,
	Maintenance16Icon,
	NewRelease16Icon,
	RocketLaunch16Icon,
	Terminal16Icon,
	TestTube16Icon,
	Toolkit16Icon
} from "@SolaceDev/maas-icons";

(SolaceEnvironmentLabel as React.FC & { displayName?: string }).displayName = "SolaceEnvironmentLabel";
(Broker16Icon as React.FC & { displayName?: string }).displayName = "Broker16Icon";

// Create a decorator to decrease the snapshot window size
const withSnapshotContainer: Decorator = (Story) => {
	return (
		<div id="snapshot" style={{ width: "200px", height: "50px" }}>
			<Story />
		</div>
	);
};

export default {
	title: "Input/Label/Environment",
	component: SolaceEnvironmentLabel,
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceEnvironmentLabel"
			}
		}
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description:
				"Unique identifier for the environment label component. Used for accessibility and programmatic access.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		hasWarnings: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the environment label in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the environment.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
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

export const WithinSelect = (): JSX.Element => {
	const {
		palette: { ux }
	} = useTheme();
	const examples: SolaceEnvironmentChipProps[] = [
		{ label: "Environment 1", fgColor: ux.primary.text.w100, bgColor: ux.background.w10, icon: <Maintenance16Icon /> },
		{ label: "Environment 2", fgColor: ux.primary.text.w100, bgColor: ux.accent.n2.w20, icon: <Construction16Icon /> },
		{ label: "Environment 3", fgColor: ux.primary.text.w100, bgColor: ux.accent.n1.w20, icon: <Toolkit16Icon /> },
		{ label: "Environment 4", fgColor: ux.primary.text.w100, bgColor: ux.accent.n6.w30, icon: <Terminal16Icon /> },
		{ label: "Environment 5", fgColor: ux.primary.text.w100, bgColor: ux.accent.n5.w60, icon: <Bug16Icon /> },
		{ label: "Environment 6", fgColor: ux.primary.text.w100, bgColor: ux.accent.n7.wMain, icon: <TestTube16Icon /> },
		{ label: "Environment 7", fgColor: ux.primary.text.w10, bgColor: ux.accent.n0.wMain, icon: <NewRelease16Icon /> },
		{
			label: "Environment 8",
			fgColor: ux.primary.text.w10,
			bgColor: ux.accent.n3.wMain,
			icon: <ContentSearch16Icon />
		},
		{ label: "Environment 9", fgColor: ux.primary.text.w10, bgColor: ux.accent.n4.wMain, icon: <Broker16Icon /> },
		{
			label: "Environment 10",
			fgColor: ux.primary.text.w10,
			bgColor: ux.accent.n9.wMain,
			icon: <RocketLaunch16Icon />
		}
	];
	return (
		<SolaceSelect name="select" value="Environment 10">
			{examples.map((props) => (
				<MenuItem key={props.label} value={props.label}>
					<SolaceEnvironmentLabel {...props} />
				</MenuItem>
			))}
		</SolaceSelect>
	);
};
