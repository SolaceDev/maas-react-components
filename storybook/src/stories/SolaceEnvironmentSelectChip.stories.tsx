import React from "react";
import { Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
	SolaceEnvironmentSelectChip,
	SolaceEnvironmentSelectChipOption,
	useTheme
} from "@SolaceDev/maas-react-components";
import { TestTube16Icon, Broker16Icon, RocketLaunch16Icon } from "@SolaceDev/maas-icons";

export default {
	title: "Under Construction/SolaceEnvironmentSelectChip",
	component: SolaceEnvironmentSelectChip,
	parameters: {},
	argTypes: {
		label: { control: { type: "text" } },
		fgColor: { control: { type: "color" } },
		bgColor: { control: { type: "color" } }
	}
} as Meta<typeof SolaceEnvironmentSelectChip>;

export const EnvironmentSelectChip = (): JSX.Element => {
	const {
		palette: { ux }
	} = useTheme();

	const options: SolaceEnvironmentSelectChipOption[] = [
		{
			label: "Default",
			value: "default",
			bgColor: ux.background.w10,
			fgColor: ux.primary.text.w100,
			icon: <Broker16Icon />
		},
		{
			label: "Production",
			value: "prod",
			bgColor: ux.accent.n9.wMain,
			fgColor: ux.primary.text.w10,
			icon: <RocketLaunch16Icon />
		},
		{
			label: "Test",
			value: "test",
			bgColor: ux.accent.n7.wMain,
			fgColor: ux.primary.text.w100,
			icon: <TestTube16Icon />
		}
	];

	return <SolaceEnvironmentSelectChip name="env" value={"default"} onChange={action("callback")} options={options} />;
};

export const TruncatedSelectChip = (): JSX.Element => {
	const {
		palette: { ux }
	} = useTheme();

	const options: SolaceEnvironmentSelectChipOption[] = [
		{
			label: "This is an environment with a very long name",
			value: "default",
			bgColor: ux.background.w10,
			fgColor: ux.primary.text.w100,
			icon: <Broker16Icon />
		},
		{
			label: "Production",
			value: "prod",
			bgColor: ux.accent.n9.wMain,
			fgColor: ux.primary.text.w10,
			icon: <RocketLaunch16Icon />
		},
		{
			label: "Test",
			value: "test",
			bgColor: ux.accent.n7.wMain,
			fgColor: ux.primary.text.w100,
			icon: <TestTube16Icon />
		}
	];

	return <SolaceEnvironmentSelectChip name="env" value={"default"} onChange={action("callback")} options={options} />;
};
