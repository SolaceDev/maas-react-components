import React from "react";
import { Meta } from "@storybook/react";
import { SolaceList, SolaceListItem, SolaceListItemButton } from "@SolaceDev/maas-react-components";
import { Divider, Paper } from "@mui/material";

(SolaceList as React.FC & { displayName?: string }).displayName = "SolaceList";
(SolaceListItem as React.FC & { displayName?: string }).displayName = "SolaceListItem";
(SolaceListItemButton as React.FC & { displayName?: string }).displayName = "SolaceListItemButton";
(Paper as React.FC & { displayName?: string }).displayName = "Paper";
(Divider as React.FC & { displayName?: string }).displayName = "Divider";

export default {
	title: "Data Display/List/Standard",
	component: SolaceList,
	parameters: {},
	argTypes: {
		disablePadding: {
			control: { type: "boolean" },
			description:
				"If true, removes the left and right padding from the list. Use this when you want the list items to extend to the full width of their container.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		dense: {
			control: { type: "boolean" },
			description:
				"If true, applies compact vertical padding designed for keyboard and mouse input. Use this to display more items in less vertical space.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		subheader: {
			control: { type: "text" },
			description:
				"The content to use as the subheader for the list. Typically used to group list items under a descriptive heading.",
			table: {
				type: { summary: "React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		children: {
			control: false,
			description:
				"The list items to render inside the list. Should be SolaceListItem components or similar list item elements.",
			table: {
				type: { summary: "React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		className: {
			control: { type: "text" },
			description: "Additional CSS class name to apply to the list component for custom styling.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		sx: {
			control: false,
			description:
				"System prop to customize the component's CSS styling using the MUI sx prop. Allows for responsive and theme-aware styling.",
			table: {
				type: { summary: "object" },
				defaultValue: { summary: "undefined" }
			}
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
