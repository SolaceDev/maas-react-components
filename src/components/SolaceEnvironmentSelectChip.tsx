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

import React, { useCallback, useEffect, useState } from "react";
import { styled, Select, MenuItem, FormControl, SelectChangeEvent } from "@mui/material";
import SolaceComponentProps from "./SolaceComponentProps";
import { SolaceSelectChangeEvent } from "./form/SolaceSelect";
import { SelectDropdownIcon } from "../resources/icons/SelectIcons";

const shouldForwardProp = (key: string) => key !== "bgColor" && key !== "fgColor";

const ColorLayer = styled("div", { shouldForwardProp })<{ bgColor?: string; fgColor?: string }>(
	({ theme, bgColor = "#FFFFFF", fgColor = "#000000" }) => `
	background-color: ${bgColor};
	border-color: ${bgColor?.toUpperCase() === "#FFFFFF" ? theme.palette.ux.secondary.w100 : "transparent"};
	border-style: solid;
	border-width: 1px;
	border-radius: ${theme.spacing(0.5)};
	box-sizing: border-box;
	color: ${fgColor};
	fill: ${fgColor};`
);

const StateLayer = styled("div")(
	({ theme }) => `
	align-items: center;
	column-gap: ${theme.spacing(1)};
	display: flex;
	flex-direction: row;
	font-weight: ${theme.typography.body1.fontWeight};
	justify-content: space-between;
	padding: ${theme.spacing(0, 0, 0, 0.5)};
	&:hover {
		background-color: ${theme.palette.ux.stateLayer.w10};
	}
	& > svg {
		vertical-align: middle;
	}`
);

const StyledSelect = styled(Select)(
	({ theme }) => `
	border-radius: ${theme.spacing(0.5)};
	font-size: ${theme.typography.body1.fontSize};
	font-weight: ${theme.typography.body1.fontWeight};
	& .MuiSelect-select {
		padding: 0;
		display: flex;
		align-items: center;
		column-gap: ${theme.spacing(1)};
	}
	& .MuiOutlinedInput-notchedOutline {
		border: none;
	}
	& .MuiSelect-icon {
		display: none;
	}`
);

const IconWrapper = styled(ColorLayer)(
	({ theme }) => `
	display: flex;
	padding: ${theme.spacing(0.5)};`
);

const Icon = styled("span")`
	display: flex;
`;

const Text = styled("span")`
	max-width: 134px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const StyledMenuItem = styled(MenuItem)(
	({ theme }) => `
	align-items: center;
	column-gap: ${theme.spacing(2)};
	display: flex;
	flex-direction: row;
	&:hover {
		background-color: ${theme.palette.ux.deprecated.secondary.w10};
	}
	&.Mui-selected {
		background-color: ${theme.palette.ux.brand.w10};
	}
	&.Mui-selected:hover {
		background-color: ${theme.palette.ux.brand.w10};
	}`
);

const StickyChildren = styled("div")(
	({ theme }) => `
	background-color: ${theme.palette.ux.background.w10};
	bottom: 0;
	display: block;
	padding-top: ${theme.spacing(1)};
	position: sticky;`
);

export interface SolaceEnvironmentSelectChipOption {
	/**
	 * Environment's label
	 */
	label: string;
	/**
	 * Environment's value (or unique ID)
	 */
	value: string;
	/**
	 * Background color
	 */
	bgColor: string;
	/**
	 * Text color
	 */
	fgColor: string;
	/**
	 * Icon from maas-icons (16x16)
	 */
	icon: JSX.Element;
}

export interface SolaceEnvironmentSelectChipProps extends SolaceComponentProps {
	/**
	 * Unique identifier ... if `id` is not specified, `name` value will be used in order to make `label` and `helperText` accessible for screen readers
	 */
	id?: string;
	/**
	 * Name attribute to assign to the `input` element
	 */
	name: string;
	/**
	 * Array of environment options
	 */
	options: SolaceEnvironmentSelectChipOption[];
	/**
	 * The value of the `input` element, required for controlled component
	 */
	value?: string;
	/**
	 * Callback function to trigger whenever the value of the `input` is changed, required for controlled component
	 */
	onChange?: (event: SolaceSelectChangeEvent) => void;
	/**
	 * Additional elements to render below the environments
	 */
	children?: JSX.Element | Array<JSX.Element>;
}

function SolaceEnvironmentSelectChip({
	id,
	name,
	options,
	value = "",
	onChange,
	dataQa,
	dataTags,
	children
}: SolaceEnvironmentSelectChipProps): JSX.Element {
	const [selectedValue, setSelectedValue] = useState(value);

	useEffect(() => {
		setSelectedValue(value);
	}, [value]);

	const handleChange = (event: SelectChangeEvent<string>) => {
		const newValue = event.target.value;
		setSelectedValue(newValue);
		if (onChange) {
			onChange({
				name: name,
				value: newValue
			});
		}
	};

	const getId = () => {
		return id ? id : name;
	};

	const selectedOption = options.find((option) => option.value === selectedValue);

	const renderValue = useCallback(
		(value: string) => {
			const details = options.find((o) => o.value === value);
			if (!details) return "";

			return (
				<ColorLayer bgColor={details.bgColor} fgColor={details.fgColor}>
					<StateLayer>
						{details.icon && <Icon>{details.icon}</Icon>}
						<Text>{details.label}</Text>
						<SelectDropdownIcon />
					</StateLayer>
				</ColorLayer>
			);
		},
		[options]
	);

	return (
		<FormControl fullWidth>
			<StyledSelect
				id={getId()}
				name={name}
				data-qa={dataQa}
				data-tags={dataTags}
				value={selectedValue}
				onChange={handleChange}
				renderValue={renderValue}
				MenuProps={{
					PaperProps: {
						style: {
							borderRadius: 4,
							boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.2)",
							minWidth: 320,
							maxHeight: "min(416px, calc(100vh - 80px))",
							minHeight: 80
						}
					}
				}}
			>
				{options.map(({ label, value, fgColor, bgColor, icon }) => (
					<StyledMenuItem key={value} value={value}>
						{icon && (
							<IconWrapper fgColor={fgColor} bgColor={bgColor}>
								{icon}
							</IconWrapper>
						)}
						<span>{label}</span>
					</StyledMenuItem>
				))}
				{children && <StickyChildren>{children}</StickyChildren>}
			</StyledSelect>
		</FormControl>
	);
}

export default SolaceEnvironmentSelectChip;
