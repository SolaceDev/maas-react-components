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

import { IconButton, styled } from "@mui/material";
import SolaceComponentProps from "./SolaceComponentProps";
import { CloseIcon } from "../resources/icons/CloseIcon";

export const ColoredBase = styled("div", {
	shouldForwardProp: (key: string) => key !== "bgColor" && key !== "fgColor"
})<{
	bgColor: string;
	fgColor: string;
}>(
	({ theme, bgColor = "#FFFFFF", fgColor = "#000000" }) => `
	align-items: center;
	background-color: ${bgColor};
	border-color: ${bgColor?.toUpperCase() === "#FFFFFF" ? theme.palette.ux.secondary.w100 : "transparent"};
	border-style: solid;
	border-width: 1px;
	border-radius: ${theme.spacing(0.5)};
	box-sizing: border-box;
	color: ${fgColor};
	cursor: default;
	display: inline-flex;
	height: ${theme.spacing(3)};
	svg {
		fill: ${fgColor};
	}`
);

const ColoredContainer = styled(ColoredBase, {
	shouldForwardProp: (key: string) => key !== "maxWidth" && key !== "iconOnly" && key !== "removable"
})<{
	maxWidth: `${number}px` | `${number}%`;
	iconOnly: boolean;
	removable: boolean;
}>(
	({ theme, maxWidth, iconOnly, removable }) => `
	column-gap: ${theme.spacing(0.5)};
	font-family: ${theme.typography.body1.fontFamily};
	font-size: ${theme.typography.body1.fontSize};
	font-weight: ${theme.typography.body1.fontWeight};
	width: fit-content;
	max-width: ${maxWidth};
	padding: ${iconOnly || removable ? theme.spacing(0, 0.5) : theme.spacing(0, 1, 0, 0.5)};
	.MuiIconButton-root:hover {
		background-color: ${theme.palette.ux.secondary.w20};
	}`
);

const Icon = styled("span")`
	display: flex;
`;

const Text = styled("span")`
	flex: 1 0 0%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export interface SolaceEnvironmentChipProps extends SolaceComponentProps {
	/**
	 * 	The text of the component
	 */
	label?: string;
	/**
	 * Sets the fill color of the component (RGB like "#3C69E1")
	 */
	bgColor: string;
	/**
	 * Sets the text color of the label (RGB like "#FFFFFF")
	 */
	fgColor: string;
	/**
	 * Add a leading icon (from maas-icons) and ensure the size of the icon is 16x16 pixels
	 */
	icon: JSX.Element;
	/**
	 * Adds a close icon and makes the component removable
	 */
	onDelete?: () => void;
	/**
	 * Max width of the chip, default to 200px
	 */
	maxWidth?: `${number}px` | `${number}%`;
}

export default function SolaceEnvironmentChip({
	label,
	bgColor,
	fgColor,
	icon,
	maxWidth,
	dataQa,
	dataTags,
	onDelete
}: SolaceEnvironmentChipProps): JSX.Element {
	return (
		<ColoredContainer
			bgColor={bgColor}
			fgColor={fgColor}
			data-qa={dataQa}
			data-tags={dataTags}
			maxWidth={maxWidth ?? "200px"}
			iconOnly={!label}
			removable={!!onDelete}
		>
			{icon && <Icon>{icon}</Icon>}
			{label && <Text>{label}</Text>}
			{onDelete && (
				<IconButton data-qa={`${dataQa}-delete`} type="button" onClick={onDelete}>
					<CloseIcon size={16} fill={fgColor} />
				</IconButton>
			)}
		</ColoredContainer>
	);
}
