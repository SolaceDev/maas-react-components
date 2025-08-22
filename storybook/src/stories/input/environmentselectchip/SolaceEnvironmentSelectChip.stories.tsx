/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
		id: {
			control: { type: "text" },
			description:
				"Unique identifier for the environment select chip component. Used for accessibility and programmatic access.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		name: {
			control: { type: "text" },
			description: "Name attribute for the select chip input. Used for form submission and identification.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		value: {
			control: { type: "text" },
			description: "The currently selected environment value. This should match one of the option values.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		options: {
			control: { type: "object" },
			description:
				"Array of environment options with label, value, colors, and icon. Each option represents an environment that can be selected.",
			table: {
				type: { summary: "SolaceEnvironmentSelectChipOption[]" },
				defaultValue: { summary: "[]" }
			}
		},
		onChange: {
			description:
				"Callback function triggered when environment selection changes. Receives the new selected value as parameter."
		},
		label: {
			control: { type: "text" },
			description: "Label text displayed for the select chip. Provides context for what the user is selecting.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		fgColor: {
			control: { type: "color" },
			description: "Foreground (text) color for the selected chip. Overrides the option's fgColor if provided.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		bgColor: {
			control: { type: "color" },
			description: "Background color for the selected chip. Overrides the option's bgColor if provided.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		disabled: {
			control: { type: "boolean" },
			description: "If true, disables the select chip and prevents user interaction. The chip appears grayed out.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		required: {
			control: { type: "boolean" },
			description: "If true, marks the select chip as required for form validation purposes.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		maxWidth: {
			control: { type: "text" },
			description:
				"Maximum width for the chip display. Long environment names will be truncated if they exceed this width.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		children: {
			description:
				"Additional content to display in the dropdown below the environment options (e.g., toggles, actions).",
			table: {
				type: { summary: "React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description:
				"Data attribute for QA testing. Use this to identify the environment select chip during automated testing.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		}
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
