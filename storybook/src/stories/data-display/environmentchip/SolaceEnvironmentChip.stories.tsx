import React from "react";
import { Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SolaceEnvironmentChip, SolaceEnvironmentChipProps, styled, useTheme } from "@SolaceDev/maas-react-components";
import {
	Maintenance16Icon,
	Construction16Icon,
	Toolkit16Icon,
	Terminal16Icon,
	Bug16Icon,
	TestTube16Icon,
	NewRelease16Icon,
	ContentSearch16Icon,
	Broker16Icon,
	RocketLaunch16Icon
} from "@SolaceDev/maas-icons";

(SolaceEnvironmentChip as React.FC & { displayName?: string }).displayName = "SolaceEnvironmentChip";
(Broker16Icon as React.FC & { displayName?: string }).displayName = "Broker16Icon";

const Grid = styled("div")`
	display: flex;
	flex-direction: column;
	row-gap: 8px;
`;

export default {
	title: "Data Display/Chip/Environment",
	component: SolaceEnvironmentChip,
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceEnvironmentChip"
			}
		}
	},
	argTypes: {
		label: {
			control: { type: "text" },
			description:
				"The text content to be displayed in the environment chip. Typically used for environment names like 'Production', 'Staging', 'Development', etc. When empty, only the icon will be displayed.",
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
				"If true, displays the environment chip in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the environment.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		fgColor: {
			control: { type: "color" },
			description:
				"The foreground (text and icon) color of the environment chip. Should provide sufficient contrast against the background color for accessibility. Use theme colors for consistency.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		bgColor: {
			control: { type: "color" },
			description:
				"The background color of the environment chip. Use distinct colors for different environments to help users quickly identify and differentiate between them.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		maxWidth: {
			control: { type: "text" },
			description:
				"Maximum width of the environment chip. Can be specified in any CSS unit (px, rem, %, etc.). When content exceeds this width, it will be truncated with an ellipsis.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		icon: {
			control: false,
			description:
				"Icon to display within the environment chip. Should be a React element, typically a 16px icon. The icon helps users quickly identify the type or category of environment.",
			table: {
				type: { summary: "React.ReactElement" },
				defaultValue: { summary: "undefined" }
			}
		},
		onDelete: {
			control: false,
			description:
				"Callback function that fires when the delete button is clicked. When provided, a delete button will be added to the chip. Use this for removable environment selections.",
			table: {
				type: { summary: "(event: React.MouseEvent<HTMLButtonElement>) => void" },
				defaultValue: { summary: "undefined" }
			}
		},
		onClick: {
			control: false,
			description:
				"Callback function that fires when the environment chip is clicked. Use this when the chip should trigger an action such as environment selection or navigation.",
			table: {
				type: { summary: "(event: React.MouseEvent<HTMLDivElement>) => void" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify environment chips during automated testing.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data attribute for additional tagging. Use this for analytics, tracking, or additional metadata.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceEnvironmentChip>;

export const DefaultEnvironmentChip = {
	args: {
		label: "Default",
		fgColor: "#000000",
		bgColor: "#ffffff",
		icon: <Broker16Icon />
	}
};

export const TruncatedChip = {
	args: {
		label: "This is an environment with a very long name",
		fgColor: "#000000",
		bgColor: "#ffffff",
		icon: <Broker16Icon />
	}
};

export const TruncatedChipWithOptionalMaxWidth = {
	args: {
		label: "This is an environment with a very long name",
		fgColor: "#000000",
		bgColor: "#ffffff",
		maxWidth: "150px",
		icon: <Broker16Icon />
	}
};

export const RemovableChip = (): JSX.Element => {
	const {
		palette: { ux }
	} = useTheme();

	return (
		<SolaceEnvironmentChip
			onDelete={action("callback")}
			label="This is a removable environment chip"
			bgColor={ux.accent.n9.wMain}
			fgColor={ux.primary.text.w10}
			icon={<Broker16Icon />}
			dataQa="example"
		/>
	);
};

export const IconOnlyChip = {
	args: {
		label: "",
		fgColor: "#000000",
		bgColor: "#ffffff",
		icon: <Broker16Icon />
	}
};

export const EveryColors = (): JSX.Element => {
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
		<Grid>
			{examples.map((props) => (
				<SolaceEnvironmentChip key={props.label} {...props} />
			))}
		</Grid>
	);
};

export const WithInContainer = (): JSX.Element => {
	const {
		palette: { ux }
	} = useTheme();
	const examples: SolaceEnvironmentChipProps[] = [
		{ label: "Env 2", fgColor: ux.primary.text.w100, bgColor: ux.accent.n2.w20, icon: <Construction16Icon /> },
		{
			label: "Environment 7 with very long name to test truncation",
			fgColor: ux.primary.text.w10,
			bgColor: ux.accent.n0.wMain,
			icon: <NewRelease16Icon />
		},
		{
			label: "Environment 10",
			fgColor: ux.primary.text.w10,
			bgColor: ux.accent.n9.wMain,
			icon: <RocketLaunch16Icon />
		}
	];
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "8px",
				width: "200px",
				padding: "16px",
				border: "1px dotted grey"
			}}
		>
			{examples.map((props) => (
				<SolaceEnvironmentChip key={props.label} {...props} />
			))}
		</div>
	);
};
