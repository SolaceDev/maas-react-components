import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceMenu, SolaceButton } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
// import LaunchIcon from "@material-ui/icons/Launch";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import {
	MenuList,
	MenuItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Typography,
	ListItem,
	List,
	Checkbox,
	ListItemButton,
	IconButton
} from "@material-ui/core";
import ContentCut from "@material-ui/icons/ContentCut";
import ContentCopy from "@material-ui/icons/ContentCopy";
import Cloud from "@material-ui/icons/Cloud";
import ContentPaste from "@material-ui/icons/ContentPaste";
import CommentIcon from "@material-ui/icons/Comment";

export default {
	title: "Under Construction/SolaceMenu",
	component: SolaceMenu,
	parameters: {},
	argTypes: {}
} as ComponentMeta<typeof SolaceMenu>;

const Template: ComponentStory<typeof SolaceMenu> = (args) => <SolaceMenu {...args} />;

const SUBTEXT = "Subtext subtext";
const SUPPLEMENTALText = "Supplemental text";

export const DefaultSolaceMenu = Template.bind({});
DefaultSolaceMenu.args = {
	index: 1,
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
	index: 1,
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
	index: 1,
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
	index: 1,
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
	index: 1,
	items: [
		{
			name: "Option 1",
			subText: SUBTEXT,
			supplementalText: SUPPLEMENTALText,
			onMenuItemClick: action("callback"),
			icon: <EditOutlinedIcon fontSize="small" />
		},
		{
			name: "Option 2",
			subText: SUBTEXT,
			supplementalText: SUPPLEMENTALText,
			onMenuItemClick: action("callback"),
			icon: <EditOutlinedIcon fontSize="small" />
		},
		{
			name: "Option 3",
			subText: SUBTEXT,
			supplementalText: SUPPLEMENTALText,
			onMenuItemClick: action("callback"),
			icon: <DeleteOutlineOutlinedIcon fontSize="small" />
		}
	],
	multiline: true
};

export const CustomPositionMenu = Template.bind({});
CustomPositionMenu.args = {
	index: 1,
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
	index: 1,
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

export const CustomMenuItems = (): JSX.Element => {
	function renderCustomMenuItems(index: number) {
		return (
			<MenuList id={`${index}`}>
				<MenuItem>
					<ListItemIcon>
						<ContentCut fontSize="small" />
					</ListItemIcon>
					<ListItemText>Cut</ListItemText>
					<Typography variant="body2" color="text.secondary">
						⌘X
					</Typography>
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<ContentCopy fontSize="small" />
					</ListItemIcon>
					<ListItemText>Copy</ListItemText>
					<Typography variant="body2" color="text.secondary">
						⌘C
					</Typography>
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<ContentPaste fontSize="small" />
					</ListItemIcon>
					<ListItemText>Paste</ListItemText>
					<Typography variant="body2" color="text.secondary">
						⌘V
					</Typography>
				</MenuItem>
				<Divider />
				<MenuItem>
					<ListItemIcon>
						<Cloud fontSize="small" />
					</ListItemIcon>
					<ListItemText>Web Clipboard</ListItemText>
				</MenuItem>
			</MenuList>
		);
	}

	return <SolaceMenu index={1} renderCustomMenuItems={renderCustomMenuItems}></SolaceMenu>;
};

export const CustomMenuItemsWithCheckbox = (): JSX.Element => {
	const [checked, setChecked] = React.useState([0]);

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
	function renderCustomMenuItems(index: number) {
		return (
			<List sx={{ width: "100%", bgcolor: "background.paper" }}>
				{[0, 1, 2, 3].map((value) => {
					const labelId = `checkbox-list-label-${value}-${index}`;

					return (
						<ListItem
							key={value}
							secondaryAction={
								<IconButton edge="end" aria-label="comments">
									<CommentIcon />
								</IconButton>
							}
						>
							<ListItemButton role={undefined} onClick={handleToggle(value)} dense>
								<ListItemIcon>
									<Checkbox
										edge="start"
										checked={checked.indexOf(value) !== -1}
										tabIndex={-1}
										disableRipple
										inputProps={{ "aria-labelledby": labelId }}
									/>
								</ListItemIcon>
								<ListItemText id={labelId} primary={`Line item ${value + 1}`} />
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
		);
	}

	return <SolaceMenu index={1} renderCustomMenuItems={renderCustomMenuItems}></SolaceMenu>;
};
