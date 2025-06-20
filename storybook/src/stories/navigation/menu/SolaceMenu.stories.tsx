/* eslint-disable sonarjs/no-duplicate-string */
import React, { useState } from "react";
import { Decorator, Meta } from "@storybook/react";
import {
	SolaceMenu,
	SolaceButton,
	SolaceCheckBox,
	DeleteIcon,
	SolaceRadio,
	SelectDropdownIcon,
	SolaceToggle,
	MoreHorizOutlinedIcon,
	SolaceMenuItemProps,
	SolaceLabel,
	HelpOutlineOutlinedIcon,
	SolaceTooltip
} from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { userEvent, within, screen, fireEvent } from "@storybook/test";

(SolaceMenu as React.FC & { displayName?: string }).displayName = "SolaceMenu";
(SolaceRadio as React.FC & { displayName?: string }).displayName = "SolaceRadio";
(SolaceCheckBox as React.FC & { displayName?: string }).displayName = "SolaceCheckBox";
(MoreHorizOutlinedIcon as React.FC & { displayName?: string }).displayName = "MoreHorizOutlinedIcon";
(DeleteIcon as React.FC & { displayName?: string }).displayName = "DeleteIcon";

// Create a decorator to increase the snapshot window size"
const withSnapshotContainer: Decorator = (Story) => {
	return (
		<div id="snapshot" style={{ width: "100vw", height: "400px", padding: "10px 35px" }}>
			<Story />
		</div>
	);
};

export default {
	title: "Navigation/Menu",
	component: SolaceMenu,
	parameters: {
		chromatic: { delay: 1000 },
		docs: {
			description: {
				component: "Menu component that displays a list of options in a dropdown. Code component name: SolaceMenu"
			}
		}
	},
	args: {
		id: "",
		buttonProps: {
			variant: "icon",
			children: <MoreHorizOutlinedIcon />
		},
		header: "",
		anchorOrigin: { vertical: "bottom", horizontal: "left" },
		transformOrigin: { vertical: "top", horizontal: "left" },
		multiline: false,
		propagateMenuClick: false,
		closeOnSelect: true,
		numOfMenuItemDisplayed: 9,
		maxWidth: 335,
		dataQa: "",
		dataTags: ""
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Optional ID of this component",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		buttonProps: {
			control: { type: "object" },
			description: "Attributes to customize menu button",
			table: {
				type: { summary: "object | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		items: {
			control: { type: "object" },
			description: "An array of options when using default menu",
			table: {
				type: { summary: "SolaceMenuItemProps[] | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		header: {
			control: { type: "text" },
			description: "Header of menu when using default menu",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		anchorOrigin: {
			control: { type: "object" },
			description: "Optional attribute to change the position of menu popper only for default menu",
			table: {
				type: { summary: "{ vertical: string; horizontal: string } | undefined" },
				defaultValue: { summary: '{ vertical: "bottom", horizontal: "left" }' }
			}
		},
		transformOrigin: {
			control: { type: "object" },
			description: "Optional attribute to change the position of menu popper only for default menu",
			table: {
				type: { summary: "{ vertical: string; horizontal: string } | undefined" },
				defaultValue: { summary: '{ vertical: "top", horizontal: "left" }' }
			}
		},
		multiline: {
			control: { type: "boolean" },
			description: "Optional boolean flag to adjust the maxHeight of menu",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		propagateMenuClick: {
			control: { type: "boolean" },
			description: "Optional attribute to propagate menu button click event to parent",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		closeOnSelect: {
			control: { type: "boolean" },
			description: "Optional flag to close the menu on menuItemClick",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "true" }
			}
		},
		onMenuItemClick: {
			action: "clicked",
			description: "The callback function runs when the user clicks on a menu item",
			table: {
				defaultValue: { summary: "undefined" }
			}
		},
		numOfMenuItemDisplayed: {
			control: { type: "number" },
			description: "Optional flag to specify the number of menu items to be displayed",
			table: {
				type: { summary: "number | undefined" },
				defaultValue: { summary: "9" }
			}
		},
		maxWidth: {
			control: { type: "number" },
			description: "Optional attribute to define the maximum width of menu popper",
			table: {
				type: { summary: "number | undefined" },
				defaultValue: { summary: "335" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data QA attribute for testing",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data tags attribute for additional metadata",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		}
	},
	decorators: [withSnapshotContainer]
} as Meta<typeof SolaceMenu>;

const SUBTEXT = "Subtext subtext";
const SUPPLEMENTALText = "Supplemental text";
const TITLE = "More actions!";
const DEFAULT_MENU_ITEMS = [
	{
		name: "Option 1",
		onMenuItemClick: action("callback"),
		dataQa: "testDataProp2",
		dataTags: "testDataTag2"
	},
	{
		name: "Option 2",
		onMenuItemClick: action("callback")
	},
	{
		name: "Option 3",
		onMenuItemClick: action("callback")
	},
	{
		name: "Option 4",
		onMenuItemClick: action("callback")
	},
	{
		name: "Option 5",
		onMenuItemClick: action("callback")
	}
];

export const SolaceMenuItemSelectedState = {
	args: {
		id: "demo-solace-menu-item-selected",
		buttonProps: {
			title: TITLE,
			variant: "icon",
			children: <MoreHorizOutlinedIcon />
		},
		dataQa: "testDataProp",
		dataTags: "testDataTag1",
		items: [
			{
				name: "Option 1",
				onMenuItemClick: action("callback"),
				dataQa: "testDataProp2",
				dataTags: "testDataTag2"
			},
			{
				name: "Option 2",
				onMenuItemClick: action("callback"),
				selected: true
			},
			{
				name: "Option 3",
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 4",
				onMenuItemClick: action("callback")
			}
		],
		numOfMenuItemDisplayed: 3 // default to 9 if this number is not specified
	}
};

export const DefaultSolaceMenu = {
	args: {
		id: "demo-solace-menu",
		buttonProps: {
			title: TITLE,
			variant: "icon",
			children: <MoreHorizOutlinedIcon />
		},
		dataQa: "testDataProp",
		dataTags: "testDataTag1",
		items: DEFAULT_MENU_ITEMS,
		numOfMenuItemDisplayed: 3 // default to 9 if this number is not specified
	}
};

export const DefaultSolaceMenuPressed = {
	args: {
		buttonProps: {
			title: TITLE,
			variant: "icon",
			children: <MoreHorizOutlinedIcon />
		},
		dataQa: "testDataProp",
		dataTags: "testDataTag1",
		items: DEFAULT_MENU_ITEMS,
		numOfMenuItemDisplayed: 3 // default to 9 if this number is not specified
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole("button"));
	}
};

export const TextMenuButton = {
	args: {
		buttonProps: {
			variant: "text",
			children: "Click"
		},
		dataQa: "testDataProp",
		dataTags: "testDataTag1",
		items: DEFAULT_MENU_ITEMS
	}
};

export const MultilineSolaceMenu = {
	args: {
		buttonProps: {
			variant: "icon",
			children: <MoreHorizOutlinedIcon />
		},
		items: [
			{
				name: "Option 1",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 2",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 3",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 4",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 5",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			}
		],
		multiline: true,
		numOfMenuItemDisplayed: 4 // default to 9 if this number is not specified
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("button"));
	}
};

export const CustomMaxWidthSolaceMenu = {
	args: {
		buttonProps: {
			variant: "icon",
			children: <MoreHorizOutlinedIcon />
		},
		items: [
			{
				name: "Option 1",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 2",
				subText: SUBTEXT + " " + SUBTEXT + " " + SUBTEXT + " " + SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 3",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 4",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 5",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			}
		],
		multiline: true,
		maxWidth: 500
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("button"));
	}
};

export const CustomMaxWidthMaxHeightSolaceMenu = {
	args: {
		buttonProps: {
			variant: "icon",
			children: <MoreHorizOutlinedIcon />
		},
		items: [
			{
				name: "Option 1",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 2",
				subText: SUBTEXT + " " + SUBTEXT + " " + SUBTEXT + " " + SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 3",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 4",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 5",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			}
		],
		multiline: true,
		numOfMenuItemDisplayed: 4,
		maxWidth: 400
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("button"));
	}
};

export const SecondaryActionSolaceMenu = {
	args: {
		buttonProps: {
			variant: "icon",
			children: <MoreHorizOutlinedIcon />
		},
		items: [
			{
				name: "Option 1",
				secondaryAction: <SolaceButton href="http://www.cnn.com" variant="link" />,
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 2",
				secondaryAction: <SolaceButton href="http://www.cnn.com" variant="link" />,
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 3",
				secondaryAction: <SolaceButton href="http://www.cnn.com" variant="link" />,
				onMenuItemClick: action("callback")
			}
		]
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("button"));
	}
};

export const SecondaryActionSolaceMenuWithSubtext = {
	args: {
		buttonProps: {
			variant: "icon",
			children: <MoreHorizOutlinedIcon />
		},
		items: [
			{
				name: "Option 1",
				secondaryAction: <SolaceButton href="http://www.cnn.com" variant="link" />,
				onMenuItemClick: action("callback"),
				subText: SUBTEXT
			},
			{
				name: "Option 2",
				secondaryAction: <SolaceButton href="http://www.cnn.com" variant="link" />,
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 3",
				secondaryAction: <SolaceButton href="http://www.cnn.com" variant="link" />,
				onMenuItemClick: action("callback"),
				subText: SUBTEXT
			}
		]
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("button"));
	}
};

export const IconOnRight = {
	args: {
		buttonProps: {
			variant: "icon",
			children: <MoreHorizOutlinedIcon />
		},
		items: [
			{
				name: "Option 1",
				secondaryAction: (
					<SolaceTooltip title="Help">
						<HelpOutlineOutlinedIcon />
					</SolaceTooltip>
				),
				onMenuItemClick: action("callback"),
				subText: SUBTEXT
			},
			{
				name: "Option 2",
				secondaryAction: (
					<SolaceTooltip title="Help">
						<HelpOutlineOutlinedIcon />
					</SolaceTooltip>
				),
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 3",
				secondaryAction: (
					<SolaceTooltip title="Help">
						<HelpOutlineOutlinedIcon />
					</SolaceTooltip>
				),
				onMenuItemClick: action("callback"),
				subText: SUBTEXT
			}
		]
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("button"));
	}
};

export const IconAndTextOnRight = {
	args: {
		buttonProps: {
			variant: "icon",
			children: <MoreHorizOutlinedIcon />
		},
		items: [
			{
				name: "Option 1",
				secondaryAction: (
					<SolaceTooltip title="Help">
						<HelpOutlineOutlinedIcon />
					</SolaceTooltip>
				),
				onMenuItemClick: action("callback"),
				subText: SUBTEXT,
				disabled: true
			},
			{
				name: "Option 2",
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback"),
				disabled: true
			},
			{
				name: "Option 3",
				secondaryAction: (
					<SolaceTooltip title="Help">
						<HelpOutlineOutlinedIcon />
					</SolaceTooltip>
				),
				onMenuItemClick: action("callback"),
				subText: SUBTEXT
			},
			{
				name: "Option 4",
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback"),
				subText: SUBTEXT
			}
		]
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("button"));
	}
};

export const DisabledMenuItem = {
	args: {
		buttonProps: {
			variant: "icon",
			children: <MoreHorizOutlinedIcon />
		},
		items: [
			{
				name: "Option 1",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback"),
				disabled: true
			},
			{
				name: "Option 2",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 3",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			}
		],
		multiline: true
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("button"));
	}
};

export const DisabledMenuItemWithToolTip = {
	args: {
		buttonProps: {
			variant: "icon",
			children: <MoreHorizOutlinedIcon />
		},
		items: [
			{
				name: "Option 1",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback"),
				disabled: true,
				disabledMenuItemTooltipContent: "Application domain has deletion protection enabled."
			},
			{
				name: "Option 2",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 3",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			}
		],
		multiline: true
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("button"));
		const option1Element = await screen.findByText("Option 1");
		await fireEvent.mouseOver(option1Element);
	}
};

export const DisabledMenu = (): JSX.Element => {
	const [disabled, setDisabled] = useState(true);

	return (
		<div style={{ display: "flex", alignItems: "center", padding: "8px", border: "1px solid rgba(0,0,0, 0.1)" }}>
			<div style={{ marginRight: "24px" }}>
				<SolaceToggle
					id="demoToggleId"
					name="demoToggleId"
					label="Disable"
					onChange={() => {
						setDisabled(!disabled);
					}}
					stateText
					isOn={disabled}
					title="Disable Toggle"
				/>
			</div>
			<SolaceMenu
				buttonProps={{
					variant: "outline",
					isDisabled: disabled,
					endIcon: <SelectDropdownIcon />,
					children: "Actions"
				}}
				items={DEFAULT_MENU_ITEMS}
			></SolaceMenu>
		</div>
	);
};

export const IconMenuItemOnLeft = {
	args: {
		buttonProps: {
			variant: "text",
			children: "Click"
		},
		items: [
			{
				name: "Option 1",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback"),
				icon: <DeleteIcon />,
				disabled: true
			},
			{
				name: "Option 2",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback"),
				icon: <DeleteIcon />
			},
			{
				name: "Option 3",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback"),
				icon: <DeleteIcon />
			}
		],
		multiline: true
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("button"));
	}
};

export const CustomPositionMenu = {
	args: {
		buttonProps: {
			title: TITLE,
			variant: "icon",
			children: <MoreHorizOutlinedIcon />
		},
		dataQa: "testDataProp",
		dataTags: "testDataTag1",
		items: DEFAULT_MENU_ITEMS,
		numOfMenuItemDisplayed: 3, // default to 9 if this number is not specified
		anchorOrigin: { vertical: "top", horizontal: "right" },
		transformOrigin: { vertical: "top", horizontal: "left" }
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("button"));
	}
};

export const MenusWithDivider = {
	args: {
		buttonProps: {
			variant: "icon",
			children: <MoreHorizOutlinedIcon />
		},
		items: [
			{
				name: "Option 1",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			},
			{
				name: "Option 2",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback"),
				divider: true
			},
			{
				name: "Option 3",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback")
			}
		],
		multiline: true
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("button"));
	}
};

export const HeaderAndCategoryHeading = {
	args: {
		buttonProps: {
			variant: "icon",
			children: <MoreHorizOutlinedIcon />
		},
		items: [
			{
				name: "Option 1",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback"),
				categoryHeading: "Category1"
			},
			{
				name: "Option 2",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback"),
				categoryHeading: "Category1",
				divider: true
			},
			{
				name: "Option 3",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback"),
				categoryHeading: "Category2"
			}
		],
		multiline: true,
		header: "Menu Header"
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("button"));
	}
};

export const HeaderAndCategoryHeadingAndNumberOfItemsDisplayed = {
	args: {
		buttonProps: {
			variant: "icon",
			children: <MoreHorizOutlinedIcon />
		},
		items: [
			{
				name: "Option 1",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback"),
				categoryHeading: "Category1"
			},
			{
				name: "Option 2",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback"),
				categoryHeading: "Category1",
				divider: true
			},
			{
				name: "Option 3",
				subText: SUBTEXT,
				supplementalText: SUPPLEMENTALText,
				onMenuItemClick: action("callback"),
				categoryHeading: "Category2"
			}
		],
		multiline: true,
		header: "Menu Header",
		numOfMenuItemDisplayed: 2
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("button"));
	}
};

export const EmptyMenuItems = {
	args: {
		buttonProps: {
			title: TITLE,
			variant: "icon",
			children: <MoreHorizOutlinedIcon />
		},
		dataQa: "testDataProp",
		dataTags: "testDataTag1",
		items: [],
		numOfMenuItemDisplayed: 3 // default to 9 if this number is not specified
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("button"));
	}
};

export const CustomMenuItemsWithRadioButton = (): JSX.Element => {
	const [selected, setSelected] = React.useState(null);
	const handleChange = (e) => {
		setSelected(e.name);
	};
	const itemsArray = [
		{ label: "Option 1", name: "option1" },
		{ label: "Option 2", name: "option2" },
		{ label: "Option 3", name: "option3" }
	];
	const customItems = itemsArray.map((item) => ({
		name: <SolaceRadio label={item.label} name={item.name} checked={selected === item.name} onChange={handleChange} />
	}));

	return (
		<SolaceMenu
			id={"custom-solace-menu"}
			buttonProps={{
				variant: "icon",
				children: <MoreHorizOutlinedIcon />
			}}
			items={customItems}
		></SolaceMenu>
	);
};

CustomMenuItemsWithRadioButton.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const button = canvas.getByRole("button");
	await userEvent.click(button);
	const option1 = await screen.findByText("Option 1");
	await userEvent.click(option1);
	await userEvent.click(button);
};

export const CustomMenuItemsWithCheckbox = (): JSX.Element => {
	const [checked, setChecked] = React.useState<string[]>([]);

	const handleToggle = (item) => {
		const currentIndex = checked.indexOf(item.name);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(item.name);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const customItems: { name: JSX.Element }[] = ["Option 1", "Option 2", "Option 3"].map((value: string) => ({
		name: (
			<SolaceCheckBox
				name={value}
				label={value}
				checked={checked.indexOf(value) !== -1}
				onChange={() => handleToggle(value)}
			/>
		)
	})) as { name: JSX.Element }[];

	return (
		<SolaceMenu
			id={"custom-solace-menu"}
			buttonProps={{
				variant: "icon",
				children: <MoreHorizOutlinedIcon />
			}}
			items={customItems}
			closeOnSelect={false}
		></SolaceMenu>
	);
};

CustomMenuItemsWithCheckbox.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	await userEvent.click(canvas.getByRole("button"));

	const option1 = await screen.findByText("Option 1");
	const option2 = await screen.findByText("Option 2");
	await userEvent.click(option1);
	await userEvent.click(option2);
};

export const ClickNotPropagateToParent = (): JSX.Element => {
	const [clickCount, setClickCount] = useState(0);
	return (
		<>
			<div
				style={{ display: "flex", alignItems: "center", padding: "8px", border: "1px solid rgba(0,0,0, 0.1)" }}
				onClick={() => setClickCount(clickCount + 1)}
			>
				<span style={{ marginRight: "16px" }}>Hello World!</span>
				<SolaceMenu
					buttonProps={{
						variant: "icon",
						children: <MoreHorizOutlinedIcon />
					}}
					items={DEFAULT_MENU_ITEMS}
				></SolaceMenu>
			</div>
			<div style={{ paddingTop: "16px" }}>Parent Clicked {clickCount}</div>
		</>
	);
};

export const ClickPropagateToParent = (): JSX.Element => {
	const [clickCount, setClickCount] = useState(0);
	return (
		<>
			<div
				style={{ display: "flex", alignItems: "center", padding: "8px", border: "2px solid rgba(0,0,0, 0.1)" }}
				onClick={() => setClickCount(clickCount + 1)}
			>
				<span style={{ marginRight: "16px" }}>Hello World!</span>
				<SolaceMenu
					buttonProps={{
						variant: "icon",
						children: <MoreHorizOutlinedIcon />
					}}
					items={DEFAULT_MENU_ITEMS}
					propagateMenuClick={true}
				></SolaceMenu>
			</div>
			<div style={{ paddingTop: "16px" }}>Parent Clicked {clickCount}</div>
		</>
	);
};

const MENU_WITH_NESTED_ITEMS = (hasDivider: boolean) => [
	{
		name: "Option 1",
		onMenuItemClick: action("callback"),
		dataQa: "testDataProp2",
		dataTags: "testDataTag2",
		subMenuItems: [
			{ name: "Option 1-1", onMenuItemClick: action("callback") },
			{ name: "Option 1-2", onMenuItemClick: action("callback") }
		],
		divider: hasDivider
	},
	{
		name: "Option 2",
		subText: SUBTEXT,
		onMenuItemClick: action("callback")
	},
	{
		name: "Option 3",
		onMenuItemClick: action("callback"),
		divider: hasDivider
	},
	{
		name: "Option 4",
		subText: SUBTEXT,
		supplementalText: SUPPLEMENTALText,
		subMenuItems: [
			{
				name: "SubOption 4-1",
				disabled: true,
				onMenuItemClick: action("callback")
			},
			{
				name: "SubOption 4-2",
				onMenuItemClick: action("callback"),
				divider: hasDivider
			},
			{
				name: "SubOption 4-3",
				subText: SUBTEXT,
				subMenuItems: [
					{
						name: "SubSubOption 4-3-1",
						subText: SUBTEXT,
						supplementalText: SUPPLEMENTALText,
						onMenuItemClick: action("callback"),
						categoryHeading: "Category1"
					},
					{
						name: "SubSubOption 4-3-2",
						subText: SUBTEXT,
						supplementalText: SUPPLEMENTALText,
						onMenuItemClick: action("callback"),
						categoryHeading: "Category1",
						divider: hasDivider
					},
					{
						name: "SubSubOption 4-3-3",
						subText: SUBTEXT,
						onMenuItemClick: action("callback"),
						categoryHeading: "Category2"
					},
					{
						name: "SubSubOption 4-3-4",
						subText: SUBTEXT,
						onMenuItemClick: action("callback"),
						categoryHeading: "Category2"
					}
				]
			}
		]
	}
];

export const NestedMenuItems = (): JSX.Element => {
	return (
		<SolaceMenu
			buttonProps={{
				variant: "icon",
				children: <MoreHorizOutlinedIcon />
			}}
			items={MENU_WITH_NESTED_ITEMS(false)}
		/>
	);
};

NestedMenuItems.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	await userEvent.click(canvas.getByRole("button"));
};

export const NestedMenuItemsWithDividers = (): JSX.Element => {
	return (
		<SolaceMenu
			buttonProps={{
				variant: "icon",
				children: <MoreHorizOutlinedIcon />
			}}
			items={MENU_WITH_NESTED_ITEMS(true)}
		/>
	);
};

NestedMenuItemsWithDividers.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	await userEvent.click(canvas.getByRole("button"));
};

const MenuItemsWithToggle = ({ isOn = false }): JSX.Element => {
	const item: SolaceMenuItemProps[] = [
		{
			name: (
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<SolaceToggle
						id="demoToggleId"
						name="demoToggleId"
						label="Toggle Label"
						onChange={action("callback")}
						stateText
						isOn={isOn}
						title="Disable Toggle"
					/>
					<SolaceLabel id="demo-label">{"\u00A0Separate Label"}</SolaceLabel>
				</div>
			)
		}
	];

	return (
		<SolaceMenu
			buttonProps={{
				variant: "icon",
				children: <MoreHorizOutlinedIcon />
			}}
			closeOnSelect={false}
			items={item}
		></SolaceMenu>
	);
};

export const MenuItemsWithToggleOff = (): JSX.Element => {
	return <MenuItemsWithToggle />;
};

MenuItemsWithToggleOff.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	await userEvent.click(canvas.getByRole("button"));
};

export const MenuItemsWithToggleOn = (): JSX.Element => {
	return <MenuItemsWithToggle isOn={true} />;
};

MenuItemsWithToggleOn.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	await userEvent.click(canvas.getByRole("button"));
};
