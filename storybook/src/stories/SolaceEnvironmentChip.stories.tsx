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
	title: "Under Construction/SolaceEnvironmentChip",
	component: SolaceEnvironmentChip,
	parameters: {},
	argTypes: {
		label: { control: { type: "text" } },
		fgColor: { control: { type: "color" } },
		bgColor: { control: { type: "color" } },
		maxWidth: { control: { type: "text" } }
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
