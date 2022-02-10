import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
	SolaceMenu,
	SolaceMenuItemProps,
	SolaceButton,
	SolaceCheckBox,
	DeleteIcon,
	SolaceRadio
} from "@solacedev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { MoreHorizOutlinedIcon } from "../../../src/resources/icons/MoreHorizOutlinedIcon";

export default {
	title: "Under Construction/SolaceMenu",
	component: SolaceMenu,
	parameters: {},
	argTypes: {}
} as ComponentMeta<typeof SolaceMenu>;

const Template: ComponentStory<typeof SolaceMenu> = (args) => <SolaceMenu {...args} />;

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
	}
];

export const DefaultSolaceMenu = Template.bind({});
DefaultSolaceMenu.args = {
	id: "demo-solace-menu",
	buttonProps: {
		title: TITLE,
		variant: "icon",
		children: <MoreHorizOutlinedIcon />
	},
	dataQa: "testDataProp",
	dataTags: "testDataTag1",
	items: DEFAULT_MENU_ITEMS
};

export const TextMenuButton = Template.bind({});
TextMenuButton.args = {
	buttonProps: {
		variant: "text",
		children: "Click"
	},
	dataQa: "testDataProp",
	dataTags: "testDataTag1",
	items: DEFAULT_MENU_ITEMS
};

export const MultilineSolaceMenu = Template.bind({});
MultilineSolaceMenu.args = {
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
		}
	],
	multiline: true
};

export const SecondaryActionSolaceMenu = Template.bind({});
SecondaryActionSolaceMenu.args = {
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
};

export const DisabledMenuItem = Template.bind({});
DisabledMenuItem.args = {
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
};

export const IconMenuItem = Template.bind({});
IconMenuItem.args = {
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
			icon: <DeleteIcon />
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
};

export const CustomPositionMenu = (): JSX.Element => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				border: "2px solid rgba(0,0,0, 0.1)",
				height: "100px",
				width: "20%"
			}}
		>
			<SolaceMenu
				buttonProps={{
					variant: "icon",
					children: <MoreHorizOutlinedIcon />
				}}
				items={DEFAULT_MENU_ITEMS}
				multiline={true}
				anchorOrigin={{ vertical: "center", horizontal: "left" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
			></SolaceMenu>
		</div>
	);
};

export const HeaderAndCategoryHeading = Template.bind({});
HeaderAndCategoryHeading.args = {
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
};

export const EmptyMenuItems = (): JSX.Element => {
	const emptyItems: SolaceMenuItemProps[] = [];
	return (
		<SolaceMenu
			id={"custom-solace-menu2"}
			buttonProps={{
				variant: "icon",
				children: <MoreHorizOutlinedIcon />
			}}
			items={emptyItems}
		></SolaceMenu>
	);
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

export const CustomMenuItemsWithCheckbox = (): JSX.Element => {
	const [checked, setChecked] = React.useState([]);

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

	const customItems = ["Option 1", "Option 2", "Option 3"].map((value) => ({
		name: <SolaceCheckBox name={value} label={value} checked={checked.indexOf(value) !== -1} onChange={handleToggle} />
	}));

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
					propagateMenuClick={true}
				></SolaceMenu>
			</div>
			<div style={{ paddingTop: "16px" }}>Parent Clicked {clickCount}</div>
		</>
	);
};
