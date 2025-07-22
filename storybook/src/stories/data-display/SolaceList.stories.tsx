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
	parameters: {
		docs: {
			description: {
				component:
					"Helper layout component to display a list of items. For more examples and documentation please refer to https://mui.com/material-ui/react-list/. Code component name: SolaceList"
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
