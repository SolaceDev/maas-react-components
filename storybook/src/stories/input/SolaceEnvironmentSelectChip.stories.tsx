import React from "react";
import { Meta, Decorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
	SolaceEnvironmentSelectChip,
	SolaceEnvironmentSelectChipOption,
	SolaceToggle,
	styled,
	useTheme
} from "@SolaceDev/maas-react-components";
import { TestTube16Icon, Broker16Icon, RocketLaunch16Icon, DeployedCode16Icon } from "@SolaceDev/maas-icons";
import { userEvent, within } from "@storybook/test";

(SolaceEnvironmentSelectChip as React.FC & { displayName?: string }).displayName = "SolaceEnvironmentSelectChip";

// Create a decorator to include the tooltip & popover inside the snapshot"
const withSnapshotContainer: Decorator = (Story) => {
	return (
		<div id="snapshot" style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}>
			<div style={{ margin: "16px" }}>
				<Story />
			</div>
		</div>
	);
};

const ToggleWrapper = styled("div")(({ theme }) => ({
	borderTop: `1px solid ${theme.palette.ux.secondary.w20}`,
	padding: theme.spacing(1, 2)
}));

const ToggleExample = (): JSX.Element => (
	<ToggleWrapper>
		<SolaceToggle
			id="show_all"
			isOn={false}
			onChange={() => false}
			name="show_all_envs"
			label={"Show resources in all environments"}
			helperText={"Enable to manage resources across environments"}
		/>
	</ToggleWrapper>
);

export default {
	title: "Input/Dropdown/Environment",
	component: SolaceEnvironmentSelectChip,
	argTypes: {
		label: { control: { type: "text" } },
		fgColor: { control: { type: "color" } },
		bgColor: { control: { type: "color" } }
	},
	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole("combobox"));
	},
	parameters: {
		// Delay snapshot 1 second until all interactions are done
		chromatic: { delay: 1000 },
		docs: {
			description: {
				component: "Code component name: SolaceEnvironmentSelectChip"
			}
		}
	},
	decorators: [withSnapshotContainer]
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

export const ScrollingSelectChip = (): JSX.Element => {
	const {
		palette: { ux }
	} = useTheme();

	const options: SolaceEnvironmentSelectChipOption[] = [...Array(20).keys()].map((key) => ({
		label: `Environment ${key + 1}`,
		value: `env-${key + 1}`,
		bgColor: ux.background.w10,
		fgColor: ux.primary.text.w100,
		icon: <DeployedCode16Icon />
	}));

	return <SolaceEnvironmentSelectChip name="env" value={"env-1"} onChange={action("callback")} options={options} />;
};

export const SelectChipWithExtras = (): JSX.Element => {
	const {
		palette: { ux }
	} = useTheme();

	const options: SolaceEnvironmentSelectChipOption[] = [...Array(20).keys()].map((key) => ({
		label: `Environment ${key + 1}`,
		value: `env-${key + 1}`,
		bgColor: ux.background.w10,
		fgColor: ux.primary.text.w100,
		icon: <DeployedCode16Icon />
	}));

	return (
		<SolaceEnvironmentSelectChip name="env" value={"env-1"} onChange={action("callback")} options={options}>
			<ToggleExample />
		</SolaceEnvironmentSelectChip>
	);
};
