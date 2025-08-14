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

import { Box, RadioGroup, useTheme } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import React, { useEffect, useState, useRef, useMemo } from "react";
import SolaceComponentProps from "../SolaceComponentProps";
import FormChildBase from "./FormChildBase";

const keyMapping: Record<string, number> = {
	ArrowDown: 1,
	ArrowRight: 1,
	ArrowUp: -1,
	ArrowLeft: -1
};

export interface SolaceRadioGroupChangeEvent {
	name: string;
	value: string;
}

export interface SolaceRadioGroupProps extends SolaceComponentProps {
	/**
	 * Unique identifier ... if `id` is not specified, `name` value will be used in order to make `label` accessible for screen readers
	 */
	id?: string;
	/**
	 * Name attribute to assign to the `radio group` element
	 */
	name: string;
	/**
	 * the label content to display on the screen
	 */
	label?: string | JSX.Element;
	/**
	 * Boolean flag to render stack label for a group of select components
	 */
	stackLabel?: boolean;
	/**
	 * Boolean flag to allow font size of 16px (default to 14px) for stack label
	 */
	large?: boolean;
	/**
	 * Boolean flag to allow font weight of medium (default to regular) for stack label
	 */
	bold?: boolean;
	/**
	 * Content to display as supportive/explanatory text
	 */
	helperText?: string | JSX.Element;
	/**
	 * Boolean flag to mark the `input` in error state
	 */
	hasErrors?: boolean;
	/**
	 * The value of the selected 'radio' managed by this group
	 */
	value?: string;
	/**
	 * Boolean flag to control whether to stack the label on top of the `input` element (false) or place them inline to one another (true)
	 */
	inlineLabel?: boolean;
	/**
	 * Boolean flag to control whether to arrange the `input` elements horizontally
	 */
	inline?: boolean;
	/**
	 * Boolean flag used to display an indicator of whether or not this `radio group` is mandatory
	 */
	required?: boolean;
	/**
	 * Boolean flag to disable the `radio group`
	 */
	disabled?: boolean;
	/**
	 * Boolean flag to disable the `radio group`
	 */
	readOnly?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `radio group` is changed
	 */
	onChange?: (event: SolaceRadioGroupChangeEvent) => void;
	/**
	 * Callback function to trigger whenever the value of the `radio group` is changed
	 */
	children: Array<React.ReactNode>;
}

function SolaceRadioGroup({
	id,
	name,
	label,
	stackLabel = true, // use stack label for radio group
	large = false,
	bold = false,
	value,
	helperText,
	hasErrors = false,
	readOnly = false,
	required = false,
	disabled = false,
	inlineLabel = false,
	inline = false,
	onChange,
	children
}: SolaceRadioGroupProps): JSX.Element {
	const theme = useTheme();
	const [selected, setSelected] = useState(value);
	const radioGroupRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setSelected(value);
	}, [value]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelected(event.target.value);
		if (onChange) {
			onChange({
				name: name,
				value: event.target.value
			});
		}
	};

	if (!id) {
		id = name;
	}

	useEffect(() => {
		const group = radioGroupRef.current;
		if (!group) return;

		const focusTarget = group.querySelector(`input[value="${selected}"]`) ?? group.querySelector("input");

		if (focusTarget && focusTarget instanceof HTMLElement) {
			focusTarget.focus();
		}
	}, [selected]);

	const radioOptions = useMemo((): string[] => {
		/*
		 * 1. Convert the children prop to an array.
		 * 2. Filter valid React elements.
		 * 3. Map over the valid elements to extract their "value" prop.
		 * 4. Filter out any null or undefined values.
		 * This ensures that the radioOptions array only contains valid string values,
		 * and it will only be recomputed when the "children" prop changes.
		 * */
		return React.Children.toArray(children)
			.filter(React.isValidElement)
			.map((child) => (child as React.ReactElement<any>).props.value)
			.filter((option): option is string => option !== null && option !== undefined);
	}, [children]);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (disabled || readOnly) return;

		if (radioOptions.length === 0) return;

		const delta = keyMapping[event.key] ?? 0;
		if (delta === 0) return;

		event.preventDefault();

		const currentIndex = selected ? radioOptions.indexOf(selected) : 0;
		const newIndex = (currentIndex + delta + radioOptions.length) % radioOptions.length;

		if (newIndex !== currentIndex) {
			const newValue = radioOptions[newIndex];
			setSelected(newValue);
			onChange?.({ name, value: newValue });
		}
	};

	const getRadioGroup = () => {
		const childItems: Array<React.ReactNode> = children.map((child, i) => (
			<Grid item key={i}>
				{child}
			</Grid>
		));

		return (
			<Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
				<RadioGroup
					aria-label={name}
					name={name}
					role="radiogroup"
					value={selected}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					ref={radioGroupRef}
				>
					<Grid container spacing={inline ? 4.5 : 1.5} direction={inline ? "row" : "column"}>
						{childItems}
					</Grid>
				</RadioGroup>
			</Box>
		);
	};

	return (
		<FormChildBase
			id={id}
			label={label}
			stackLabel={stackLabel}
			large={large}
			bold={bold}
			helperText={helperText}
			errorText={hasErrors ? helperText : undefined}
			disabled={disabled}
			readOnly={readOnly}
			required={required}
			inlineLabel={inlineLabel}
		>
			<Box sx={{ marginTop: inlineLabel ? 0 : theme.spacing(1), marginBottom: hasErrors ? theme.spacing(1.25) : 0 }}>
				{getRadioGroup()}
			</Box>
		</FormChildBase>
	);
}

export default SolaceRadioGroup;
