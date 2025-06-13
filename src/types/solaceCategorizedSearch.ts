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

import { SolaceTextFieldChangeEvent } from "../components/form/SolaceTextField";
import { SolaceToggleButtonGroupOptionProps } from "../components/form/SolaceToggleButtonGroup";
import SolaceComponentProps from "../components/SolaceComponentProps";

export enum SolaceCategorizedSearchLayout {
	horizontal = "horizontal",
	vertical = "vertical"
}

export interface SolaceCategorizedSearchProps extends SolaceComponentProps {
	/**
	 * Unique identifier ... if `id` is not specified, `name` value will be used in order to make `helperText` accessible for screen readers
	 */
	id?: string;
	/**
	 * Name attribute to assign to the search `input` element
	 */
	name: string;
	/**
	 * Options for the category buttons
	 */
	categoryOptions?: SolaceToggleButtonGroupOptionProps[];
	/**
	 * Custom Width of the category options.
	 */
	categoryOptionsWidth?: string;
	/**
	 * The value of the selected category button
	 */
	selectedCategoryValue?: string;
	/**
	 * Callback function to notify the callee when a category button is clicked
	 */
	onCategoryChange: (event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => void;
	/**
	 * Content to display as supportive/explanitory text
	 */
	helperText?: string | JSX.Element;
	/**
	 * The value of the `input` element, required for controlled component
	 */
	searchValue?: string;
	/**
	 * Short hint displayed in the search `input` before user enters a value
	 */
	placeholder?: string;
	/**
	 * Custom Width of the search input.
	 */
	searchInputWidth?: string;
	/**
	 * Boolean flag to disable the search `input` and category buttons
	 */
	disabled?: boolean;
	/**
	 * Boolean flag to keep the search `input` focused
	 */
	autoFocus?: boolean;
	/**
	 * Boolean flag to mark the field in error state
	 */
	hasErrors?: boolean;
	/**
	 * Callback function to trigger whenever the value of the search `input` is changed
	 */
	onSearchValueChange: (event: SolaceTextFieldChangeEvent) => void;
	/**
	 * Callback function to notify the callee when the search `input` is focused
	 */
	onSearchInputFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	/**
	 * Callback function to notify the callee when the search `input` is blurred
	 */
	onSearchInputBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	/**
	 * Callback function to notify the callee when the clear (x) button is clicked (in case
	 * the callee wishes to perform any additional operations other than clearing the search/filter text)
	 */
	onClearAll?: () => void;
	/**
	 * Layout direction of buttons and search input. Default is vertical.
	 */
	layout?: SolaceCategorizedSearchLayout;
	/**
	 * Boolean flag to indicate whether category buttons should have equal width
	 */
	equalButtonWidth?: boolean;
}
