import React, { ReactNode, useState } from "react";
import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";
import { SolaceToggleButtonGroup, SolaceToggleButtonGroupOptionProps } from "@SolaceDev/maas-react-components";

const options: Array<SolaceToggleButtonGroupOptionProps> = [];
options.push({ value: "option1", label: "All" });
options.push({ value: "option2", label: "Sub" });
options.push({ value: "option3", label: "Pub" });

export default {
	title: "Under Construction/SolaceToggleButtonGroup",
	component: SolaceToggleButtonGroup,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/OSo8hNAnLk3cGhtizCxjzs/Endpoints---April-2022---Designer?node-id=902%3A99398"
		},
		docs: {
			description: {
				component:
					"A toggle button group component for reuse in all Solace based applications. Typically used to control filtering."
			}
		}
	},
	argTypes: {
		options: {
			description: "An array of label - value toggle options"
		},
		onChange: {
			description:
				"A function handler for toggle changes with parameters: (event: React.MouseEvent<HTMLElement>, value: string)"
		},
		activeValue: {
			description: "The value of the active toggle value"
		},
		isDisabled: {
			control: { type: "boolean" },
			description: "Renders the button group as disabled",
			table: {
				defaultValue: {
					summary: false
				}
			}
		}
	}
} as Meta<typeof SolaceToggleButtonGroup>;

export const DefaultToggleButtonGroup = {
	args: {
		dataQa: "testDefaultTBG",
		options: options,
		onChange: action("on change")
	}
};

export const ToggleButtonGroupWithSelection = {
	args: {
		dataQa: "testTBGWithSelection",
		options: options,
		onChange: action("on change"),
		activeValue: "option1"
	}
};

export const ToggleButtonGroupWithCallback = (): ReactNode => {
	const [activeValue, setActiveValue] = useState("option2");
	const handleOnChange = (_event: React.MouseEvent<HTMLElement>, value: string) => {
		setActiveValue(value);
	};
	return (
		<SolaceToggleButtonGroup
			dataQa="testTBGWithCallback"
			options={options}
			onChange={handleOnChange}
			activeValue={activeValue}
		/>
	);
};

export const ToggleButtonGroupDisabled = {
	args: {
		dataQa: "testTBGDisabled",
		options: options,
		activeValue: "option3",
		onChange: action("on change"),
		isDisabled: true
	}
};
