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

import { styled, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { appTheme } from "../../theming/themeUtils";
import { SupportedThemes } from "../../types/supportedThemes";
import SolaceComponentProps from "../SolaceComponentProps";

export interface SolaceToggleButtonGroupProps extends SolaceComponentProps {
	options: SolaceToggleButtonGroupOptionProps[];
	onChange: (event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => void;
	activeValue?: string;
	isDisabled?: boolean;
}

export interface SolaceToggleButtonGroupOptionProps extends SolaceComponentProps {
	label: string | JSX.Element;
	value: string;
	disabled?: boolean;
}

// override here to match specificity of default mui styles
const OutlineSolaceToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => {
	const sharedStyles = {
		height: theme.spacing(4),
		padding: theme.spacing(0, 2),

		color: theme.palette.ux.deprecated.secondary.text.wMain,
		fontWeight: theme.typography.fontWeightRegular,
		textTransform: "none",
		backgroundColor: theme.palette.ux.background.w10,
		borderColor: theme.palette.ux.secondary.w40,

		"&:hover": {
			backgroundColor: theme.palette.ux.secondary.w10,
			borderColor: theme.palette.ux.secondary.w40,
			// remove "solace" option when new palette is adopted
			color:
				appTheme === SupportedThemes.solace
					? theme.palette.ux.deprecated.secondary.text.wMain
					: theme.palette.ux.primary.text.wMain
		},

		"&.Mui-selected": {
			color: theme.palette.ux.primary.wMain,
			fontWeight: theme.typography.fontWeightMedium,
			backgroundColor: theme.palette.ux.brand.w10,

			"&:hover": {
				backgroundColor: theme.palette.ux.brand.w10
			},

			"&.Mui-disabled": {
				backgroundColor: theme.palette.ux.background.w20
			}
		},

		"&:focus-visible, &.Mui-selected:focus-visible": {
			borderColor: theme.palette.ux.deprecated.accent.n2.wMain
		},

		"&.Mui-disabled, &.Mui-selected.Mui-disabled": {
			borderColor: theme.palette.ux.secondary.w40,
			color: theme.palette.ux.secondary.text.w50
		}
	};

	// override the sharedStyles for the new Solace Theme
	const newSolaceStyles = {
		color: theme.palette.ux.secondary.text.wMain,

		"&.Mui-selected": {
			color: theme.palette.ux.primary.text.wMain,
			fontWeight: theme.typography.fontWeightMedium,
			backgroundColor: theme.palette.ux.accent.n2.w10,

			"&:hover": {
				backgroundColor: theme.palette.ux.accent.n2.w10
			},

			"&.Mui-disabled": {
				backgroundColor: theme.palette.ux.secondary.w10
			}
		}
	};

	return {
		".MuiToggleButtonGroup-grouped:not(:first-of-type)": {
			marginLeft: 0,
			borderLeft: "none",

			"&:focus-visible": {
				borderLeftColor: theme.palette.ux.deprecated.accent.n2.wMain
			}
		},

		button: {
			...sharedStyles,
			...(appTheme === SupportedThemes.newSolace && newSolaceStyles)
		}
	};
});

function SolaceToggleButtonGroup({
	onChange,
	options = [],
	activeValue = undefined,
	isDisabled = false
}: SolaceToggleButtonGroupProps): JSX.Element {
	return (
		<OutlineSolaceToggleButtonGroup exclusive={true} onChange={onChange} disabled={isDisabled} size={"small"}>
			{options.map((option) => (
				<ToggleButton
					key={option.value}
					value={option.value}
					disableRipple={true}
					disableFocusRipple={true}
					disabled={option.disabled ?? false}
					selected={activeValue === option.value}
				>
					{option.label}
				</ToggleButton>
			))}
		</OutlineSolaceToggleButtonGroup>
	);
}

export default SolaceToggleButtonGroup;
