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

import { useCallback, useRef } from "react";
import { FIELD_TYPES } from "../types/fieldTypes";
import SolaceComponentProps from "./SolaceComponentProps";
import SolaceButton from "./form/SolaceButton";
import SolaceTextField, { SolaceTextFieldChangeEvent } from "./form/SolaceTextField";
import { CloseIcon } from "../resources/icons/CloseIcon";
import { FilterIcon } from "../resources/icons/FilterIcon";
import { SearchIcon } from "../resources/icons/SearchIcon";
import { styled } from "@mui/material";
import { constants } from "../constants";

const SvgContainer = styled("div")(({ theme }) => ({
	margin: `${theme.spacing(1)} ${theme.spacing(1)} 0 -${theme.spacing(0.5)}`,
	".MuiSvgIcon-root": {
		fill: theme.palette.ux.secondary.wMain
	}
}));

export interface SolaceSearchAndFilterProps extends SolaceComponentProps {
	/**
	 * Unique identifier ... if `id` is not specified, `name` value will be used in order to make `label` and `helperText` accessible for screen readers
	 */
	id?: string;
	/**
	 * Name attribute to assign to the `input` element
	 */
	name: string;
	/**
	 * the label content to display on the screen
	 */
	label?: string | JSX.Element;
	/**
	 * Content to display as supportive/explanitory text
	 */
	helperText?: string | JSX.Element;
	/**
	 * The value of the `input` element, required for controlled component
	 */
	value?: string;
	/**
	 * Short hint displayed in the `input` before user enters a value
	 */
	placeholder?: string;
	/**
	 * Custom Width of the component.
	 */
	width?: string;
	/**
	 * Boolean flag to disable the `input`
	 */
	disabled?: boolean;
	/**
	 * Boolean flag to keep the `input` focused
	 */
	autoFocus?: boolean;
	/**
	 * Indicates whether this is a "search" or "filter" field (appropriate icon will show as the adornment)
	 */
	type?: FIELD_TYPES;
	/**
	 * Boolean flag to mark the field in error state
	 */
	hasErrors?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `input` is changed
	 */
	onChange: (event: SolaceTextFieldChangeEvent) => void;
	/**
	 * Callback function to notify the callee when the `input` is focused
	 */
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	/**
	 * Callback function to notify the callee when the `input` is blurred
	 */
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	/**
	 * Callback function to notify the callee when the clear (x) button is clicked (in case
	 * the callee wishes to perform any additional operations other than clearing the search/filter text)
	 */
	onClearAll?: () => void;
}

function SolaceSearchAndFilter({
	id,
	name,
	label,
	helperText,
	value = "",
	placeholder,
	width,
	disabled = false,
	autoFocus = false,
	type = FIELD_TYPES.DEFAULT,
	hasErrors = false,
	onChange,
	onFocus,
	onBlur,
	onClearAll
}: SolaceSearchAndFilterProps): JSX.Element {
	const inputRef = useRef<HTMLElement | null>(null);
	const getAdornment = useCallback(() => {
		const handleClearInput = () => {
			onChange({ name, value: "" });
			onClearAll && onClearAll();
			inputRef.current?.focus(); // The input shall not lose focus after the clear action per UX requirement
		};

		const getFieldIcon = (type: FIELD_TYPES) => {
			switch (type) {
				case FIELD_TYPES.FILTER:
					return (
						<SvgContainer key="filterIcon">
							<FilterIcon size={20} />
						</SvgContainer>
					);
				case FIELD_TYPES.SEARCH:
					return (
						<SvgContainer key="searchIcon">
							<SearchIcon size={20} />
						</SvgContainer>
					);
				default:
					return undefined;
			}
		};

		const icons = [];

		if (value && value.trim().length > 0) {
			icons.push(
				<SolaceButton
					key={"closeIcon"}
					dataQa="clearButton"
					isDisabled={disabled}
					variant="icon"
					onClick={handleClearInput}
					aria-label={constants.clearButtonAriaLabel}
				>
					<CloseIcon size={20} key="closeIcon" />
				</SolaceButton>
			);
		}

		icons.push(getFieldIcon(type));

		return icons;
	}, [value, type, onChange, name, onClearAll, disabled]);

	const handleChange = (event: SolaceTextFieldChangeEvent) => {
		onChange(event);
	};

	const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		onFocus && onFocus(event);
	};

	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		onBlur && onBlur(event);
	};

	return (
		<SolaceTextField
			id={id}
			name={name}
			label={label}
			helperText={helperText}
			value={value}
			autoFocus={autoFocus}
			onChange={handleChange}
			onFocus={handleFocus}
			onBlur={handleBlur}
			width={width}
			endAdornment={getAdornment()}
			hasErrors={hasErrors}
			disabled={disabled}
			dataQa={`searchAndFilter-${id}`}
			placeholder={placeholder}
			inputRef={(input) => {
				inputRef.current = input;
			}}
		/>
	);
}

export default SolaceSearchAndFilter;
