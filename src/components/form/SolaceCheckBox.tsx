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

import { Box, Checkbox, FormHelperText, useTheme, FormLabel } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import React, { useEffect, useState } from "react";
import SolaceComponentProps from "../SolaceComponentProps";
import SolaceHTMLAttributeProps from "../SolaceHTMLAttributesProps";
import clsx from "clsx";
import { Remove } from "@mui/icons-material";

export interface SolaceCheckboxChangeEvent {
	name: string;
	value: boolean;
}

export interface SolaceCheckBoxProps extends SolaceComponentProps {
	/**
	 * Unique identifier ... if `id` is not specified, `name` value will be used in order to make `label` accessible for screen readers
	 */
	id?: string;
	/**
	 * Name attribute to assign to the `checkbox` element
	 */
	name: string;
	/**
	 * the label content to display on the screen
	 */
	label?: string | JSX.Element;
	/**
	 * The text to display as the tooltip hint
	 */
	title?: string;
	/**
	 * Content to display as supportive/explanitory text
	 */
	subTextProps?: { label?: string | JSX.Element; light?: boolean };
	/**
	 * Content to display as supportive/explanitory text
	 */
	helperText?: string | JSX.Element;
	/**
	 * Boolean flag to mark the `input` in error state
	 */
	hasErrors?: boolean;
	/**
	 * Boolean flag to check or uncheck the `checkbox`
	 */
	checked?: boolean;
	/**
	 * Boolean flag used to display an indicator of whether or not this `checkbox` is mandatory
	 */
	required?: boolean;
	/**
	 * Boolean flag to disable the `checkbox`
	 */
	disabled?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `checkbox` is changed
	 */
	onChange?: (event: SolaceCheckboxChangeEvent) => void;
	/**
	 * Boolean flag to set the checkbox to indeterminate
	 */
	indeterminate?: boolean;
	/**
	 * Boolean flag to set the checkbox to readOnly
	 */
	readOnly?: boolean;
	/**
	 * Boolean flag to allow font weight of medium (default to regular) for label
	 */
	boldLabel?: boolean;
	/**
	 * Display the label with a larger font
	 */
	largeLabel?: boolean;
}

interface CheckBoxLabelProps {
	id: string;
	htmlForId?: string;
	required: boolean;
	disabled: boolean;
	bold: boolean;
	large: boolean;
	readOnly: boolean;
	children?: JSX.Element | string;
}

function CheckBoxLabel({
	id,
	htmlForId,
	required = false,
	disabled = false,
	bold = false,
	large = false,
	readOnly = false,
	children
}: CheckBoxLabelProps): JSX.Element {
	const theme = useTheme();
	return (
		<FormLabel
			id={id}
			htmlFor={htmlForId}
			required={required}
			disabled={disabled}
			sx={{ display: "block", fontSize: large ? theme.typography.subtitle1 : theme.typography.body1 }}
			className={clsx({ "bold-label": bold, "check-box-label": true, readOnly: readOnly })}
		>
			{children}
		</FormLabel>
	);
}

const SolaceCheckBox = ({
	id,
	name,
	label,
	title,
	helperText,
	hasErrors = false,
	checked = false,
	required = false,
	disabled = false,
	indeterminate = false,
	readOnly = false,
	boldLabel = false,
	largeLabel = false,
	subTextProps = { label: "", light: false },
	onChange,
	dataQa,
	dataTags
}: SolaceCheckBoxProps): JSX.Element => {
	const theme = useTheme();
	const [selected, setSelected] = useState(checked);

	useEffect(() => {
		setSelected(checked);
	}, [checked]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelected(event.target.checked);
		if (onChange) {
			onChange({
				name: name,
				value: event.target.checked
			});
		}
	};

	const getHelperText = () => (
		<Box display="flex">
			{hasErrors && <ErrorOutlineOutlinedIcon sx={{ marginRight: theme.spacing() }} />}
			{helperText}
		</Box>
	);

	const getId = () => {
		return id ? id : name;
	};

	// No need to get custom icons as we're using MUI's built-in icons

	return (
		<React.Fragment>
			<Box display="grid" gridTemplateColumns="auto 1fr" gridTemplateRows="auto auto" alignItems="center">
				<Checkbox
					id={`${getId()}-checkbox`}
					name={name}
					indeterminate={indeterminate}
					inputProps={
						{
							"aria-labelledby": label ? `${getId()}-label` : "",
							"data-qa": dataQa,
							"data-tags": dataTags
						} as SolaceHTMLAttributeProps
					}
					role="checkbox"
					title={title}
					disabled={disabled || readOnly}
					className={clsx({ readOnly: readOnly })}
					disableRipple
					checked={selected}
					onChange={handleChange}
					checkedIcon={<CheckIcon />}
					indeterminateIcon={<Remove />}
				/>
				{label && (
					<Box>
						<CheckBoxLabel
							id={`${getId()}-label`}
							htmlForId={`${getId()}-checkbox`}
							required={required}
							disabled={disabled}
							bold={boldLabel || (!!subTextProps.label && !subTextProps.light)}
							large={largeLabel}
							readOnly={readOnly}
						>
							{label}
						</CheckBoxLabel>
					</Box>
				)}
				{subTextProps.label && (
					<Box gridColumn="2" gridRow="2">
						<FormLabel
							id={`${id}-subtext`}
							disabled={disabled}
							className={clsx({ "light-sub-text": subTextProps.light, "check-box-label": true })}
						>
							{subTextProps.label}
						</FormLabel>
					</Box>
				)}
				{helperText && (
					<Box gridColumn="2" gridRow="3">
						<FormHelperText error={hasErrors} component="div" sx={{ marginTop: theme.spacing(0.25) }}>
							{getHelperText()}
						</FormHelperText>
					</Box>
				)}
			</Box>
		</React.Fragment>
	);
};

export default SolaceCheckBox;
