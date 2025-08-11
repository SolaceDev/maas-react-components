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

import { ListClasses, ListItemButtonClasses, ListItemClasses, SxProps, Theme } from "@mui/material";

export type solaceListProps = {
	/**
	 * The content of the component.
	 */
	children?: React.ReactNode;
	/**
	 * Override or extend the styles applied to the component.
	 */
	classes?: Partial<ListClasses>;
	/**
	 * If `true`, compact vertical padding designed for keyboard and mouse input is used for
	 * the list and list items.
	 * The prop is available to descendant components as the `dense` context.
	 * @default false
	 */
	dense?: boolean;
	/**
	 * If `true`, vertical padding is removed from the list.
	 * @default false
	 */
	disablePadding?: boolean;
	/**
	 * The content of the subheader, normally `ListSubheader`.
	 */
	subheader?: React.ReactNode;
	/**
	 * The system prop that allows defining system overrides as well as additional CSS styles.
	 */
	sx?: SxProps<Theme>;
};

export type solaceListItemProps = {
	/**
	 * Defines the `align-items` style property.
	 * @default 'center'
	 */
	alignItems?: "flex-start" | "center";
	/**
	 * The content of the component if a `ListItemSecondaryAction` is used it must
	 * be the last child.
	 */
	children?: React.ReactNode;
	/**
	 * Override or extend the styles applied to the component.
	 */
	classes?: Partial<ListItemClasses>;
	/**
	 * If `true`, compact vertical padding designed for keyboard and mouse input is used.
	 * The prop defaults to the value inherited from the parent List component.
	 * @default false
	 */
	dense?: boolean;
	/**
	 * If `true`, the left and right padding is removed.
	 * @default false
	 */
	disableGutters?: boolean;
	/**
	 * If `true`, all padding is removed.
	 * @default false
	 */
	disablePadding?: boolean;
	/**
	 * If `true`, a 1px light border is added to the bottom of the list item.
	 * @default false
	 */
	divider?: boolean;
	/**
	 * The element to display at the end of ListItem.
	 */
	secondaryAction?: React.ReactNode;
	/**
	 * The system prop that allows defining system overrides as well as additional CSS styles.
	 */
	sx?: SxProps<Theme>;
};

export type solaceListItemButtonProps = {
	/**
	 * Defines the `align-items` style property.
	 * @default 'center'
	 */
	alignItems?: "flex-start" | "center";
	/**
	 * If `true`, the list item is focused during the first mount.
	 * Focus will also be triggered if the value changes from false to true.
	 * @default false
	 */
	autoFocus?: boolean;
	/**
	 * The content of the component if a `ListItemSecondaryAction` is used it must
	 * be the last child.
	 */
	children?: React.ReactNode;
	/**
	 * Override or extend the styles applied to the component.
	 */
	classes?: Partial<ListItemButtonClasses>;
	/**
	 * If `true`, compact vertical padding designed for keyboard and mouse input is used.
	 * The prop defaults to the value inherited from the parent List component.
	 * @default false
	 */
	dense?: boolean;
	/**
	 * If `true`, the component is disabled.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * If `true`, the left and right padding is removed.
	 * @default false
	 */
	disableGutters?: boolean;
	/**
	 * If `true`, a 1px light border is added to the bottom of the list item.
	 * @default false
	 */
	divider?: boolean;
	/**
	 * Use to apply selected styling.
	 * @default false
	 */
	selected?: boolean;
	/**
	 * The system prop that allows defining system overrides as well as additional CSS styles.
	 */
	sx?: SxProps<Theme>;

	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
