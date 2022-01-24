import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
	SolaceMenu,
	SolaceMenuItemProps,
	SolaceButton,
	SolaceCheckBox,
	DeleteIcon
} from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { MoreHorizOutlinedIcon } from "../../../src/resources/icons/MoreHorizOutlinedIcon";
import {
	MenuList,
	MenuItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Typography,
	ListItem,
	List,
	ListItemButton
} from "@material-ui/core";

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
	items: [
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
	]
};

export const TextMenuButton = Template.bind({});
TextMenuButton.args = {
	buttonProps: {
		variant: "text",
		children: "Click"
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
			onMenuItemClick: action("callback")
		},
		{
			name: "Option 3",
			onMenuItemClick: action("callback")
		}
	]
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

export const CustomPositionMenu = Template.bind({});
CustomPositionMenu.args = {
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
	multiline: true,
	anchorOrigin: { vertical: "top", horizontal: "right" }
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

export const CustomMenuItems = (): JSX.Element => {
	function renderCustomMenuItems(id: string) {
		return (
			<MenuList id={id}>
				<MenuItem>
					<ListItemText>Cut</ListItemText>
					<Typography variant="body2" color="text.secondary">
						⌘X
					</Typography>
				</MenuItem>
				<MenuItem>
					<ListItemText>Copy</ListItemText>
					<Typography variant="body2" color="text.secondary">
						⌘C
					</Typography>
				</MenuItem>
				<MenuItem>
					<ListItemText>Paste</ListItemText>
					<Typography variant="body2" color="text.secondary">
						⌘V
					</Typography>
				</MenuItem>
				<Divider />
				<MenuItem>
					<ListItemText>Web Clipboard</ListItemText>
				</MenuItem>
			</MenuList>
		);
	}

	return (
		<SolaceMenu
			id={"custom-solace-menu"}
			buttonProps={{
				variant: "icon",
				children: <MoreHorizOutlinedIcon />
			}}
			renderCustomMenuItems={renderCustomMenuItems}
		></SolaceMenu>
	);
};

export const CustomMenuItemsWithCheckbox = (): JSX.Element => {
	const [checked, setChecked] = React.useState([]);

	const handleToggle = (value: number) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};
	function renderCustomMenuItems(id: string) {
		return (
			<List sx={{ width: "100%", bgcolor: "background.paper" }}>
				{[0, 1, 2, 3].map((value) => {
					const labelId = `checkbox-list-label-${value}-${id}`;

					return (
						<ListItem
							key={value}
							secondaryAction={
								<SolaceButton variant="icon">
									<DeleteIcon />
								</SolaceButton>
							}
						>
							<ListItemButton role={undefined} onClick={handleToggle(value)} dense>
								<ListItemIcon>
									<SolaceCheckBox name={labelId} checked={checked.indexOf(value) !== -1} />
								</ListItemIcon>
								<ListItemText id={labelId} primary={`Line item ${value + 1}`} />
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
		);
	}

	return (
		<SolaceMenu
			id={"custom-solace-menu"}
			buttonProps={{
				variant: "icon",
				children: <MoreHorizOutlinedIcon />
			}}
			renderCustomMenuItems={renderCustomMenuItems}
		></SolaceMenu>
	);
};
