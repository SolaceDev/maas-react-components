import React from "react";
import { Meta } from "@storybook/react";
import { SolaceList, SolaceListItem, SolaceListItemButton } from "@SolaceDev/maas-react-components";
import { Divider, Paper } from "@mui/material";

export default {
	title: "Layout/SolaceList",
	component: SolaceList,
	parameters: {
		docs: {
			description: {
				component:
					"Helper layout component to display a list of items. For more examples and documentation please refer to https://mui.com/material-ui/react-list/"
			}
		}
	},
	argTypes: {
		disablePadding: {
			description: "If true, the left and right padding is removed.",
			table: {
				type: { summary: "bool" },
				defaultValue: { summary: "false" }
			},
			control: { type: "boolean" }
		},
		dense: {
			description: "If true, compact vertical padding designed for keyboard and mouse input is used.",
			table: {
				type: { summary: "bool" },
				defaultValue: { summary: "false" }
			},
			control: { type: "boolean" }
		},
		subheader: {
			description: "The content to use as the subheader.",
			table: {
				type: { summary: "node" },
				defaultValue: { summary: "null" }
			},
			control: { type: "text" }
		},
		solaceListProps: {
			description: "Other SolaceList props",
			table: {
				type: { summary: "object" },
				defaultValue: { summary: "null" }
			},
			control: { type: "object" }
		}
	}
} as Meta;

export const Basic = {
	args: {
		children: (
			<Paper variant="outlined" sx={{ width: "100px" }}>
				<SolaceList>
					<SolaceListItem>Item 1</SolaceListItem>
					<SolaceListItem>Item 2</SolaceListItem>
				</SolaceList>
				<Divider />
				<SolaceList>
					<SolaceListItem>Item 3</SolaceListItem>
				</SolaceList>
			</Paper>
		)
	}
};

export const WithButtons = () => (
	<Paper variant="outlined" sx={{ width: "100px" }}>
		<SolaceList>
			<SolaceListItem>
				<SolaceListItemButton selected>Item 1</SolaceListItemButton>
			</SolaceListItem>
			<SolaceListItem>
				<SolaceListItemButton>Item 2</SolaceListItemButton>
			</SolaceListItem>
			<SolaceListItem>
				<SolaceListItemButton>Item 3</SolaceListItemButton>
			</SolaceListItem>
		</SolaceList>
	</Paper>
);
