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

import { styled } from "@mui/material";

import { ColoredBase, SolaceEnvironmentChipProps } from "./SolaceEnvironmentChip";

const ColoredIcon = styled(ColoredBase, { shouldForwardProp: (prop) => prop !== "disabled" })<{ disabled?: boolean }>(
	({ theme, disabled }) => `
	opacity: ${disabled ? 0.38 : 1}; // Use same opacity for disabled icon container as MUI menu item
	justify-content: center;
	min-width: ${theme.spacing(3)};`
);

const Container = styled("div")(
	({ theme }) => `
	align-items: center;
	column-gap: ${theme.spacing(2)};
	display: inline-flex;
	font-family: ${theme.typography.body1.fontFamily};
	font-size: ${theme.typography.body1.fontSize};
	font-weight: ${theme.typography.body1.fontWeight};
	height: ${theme.spacing(3)};
	width: 100%`
);

const Text = styled("span")(`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`);

const Label = styled(Text, { shouldForwardProp: (key: string) => key !== "variant" && key !== "disabled" })<{
	variant?: "standard" | "title";
	disabled?: boolean;
}>(({ theme, variant, disabled = false }) =>
	variant === "title"
		? `
	color: ${disabled ? theme.palette.ux.deprecated.secondary.text.w50 : theme.palette.ux.primary.text.wMain};
	font-family: ${theme.typography.h1.fontFamily};
	font-size: ${theme.typography.h1.fontSize};
	font-weight: ${theme.typography.h1.fontWeight};`
		: `
	color: ${disabled ? theme.palette.ux.deprecated.secondary.text.w50 : theme.palette.ux.primary.text.wMain};`
);

export interface SolaceEnvironmentLabelProps extends SolaceEnvironmentChipProps {
	/**
	 * With "standard", the label is inside the box, whereas with "label" and "title" only the icon displays the colours.
	 * The "title" variant use bold and bigger font (h4)
	 */
	variant?: "standard" | "title";
	disabled?: boolean;
}

export default function SolaceEnvironmentLabel({
	label,
	bgColor,
	fgColor,
	icon,
	variant,
	dataQa,
	dataTags,
	disabled = false
}: SolaceEnvironmentLabelProps): JSX.Element {
	return (
		<Container data-qa={dataQa} data-tags={dataTags}>
			<ColoredIcon bgColor={bgColor} fgColor={fgColor} disabled={disabled}>
				{icon}
			</ColoredIcon>
			<Label variant={variant} disabled={disabled}>
				{label}
			</Label>
		</Container>
	);
}
