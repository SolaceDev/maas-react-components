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

import React, { SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Autocomplete, TextField, useTheme, styled, Divider, AutocompleteChangeReason } from "@mui/material";
import SolaceComponentProps from "../SolaceComponentProps";
import FormChildBase from "./FormChildBase";
import CloseIcon from "@mui/icons-material/Close";
import { SelectDropdownIcon } from "../../resources/icons/SelectIcons";
import SolaceTooltip from "../SolaceToolTip";
import { ErrorIcon } from "../../resources/icons/ErrorIcon";
import SolaceChip from "../SolaceChip";
import { STATUSES } from "../../types/statuses";
import { TooltipVariant } from "../../types/solaceTooltip";

export interface SolaceSelectAutoCompleteProps<T, V> extends SolaceComponentProps {
	/**
	 * Unique identifier ... if `id` is not specified, `name` value will be used in order to make `label` and `helperText` accessible for screen readers
	 */
	id?: string;
	/**
	 * Controls the position of the ellipsis when text overflows
	 * @default 'end'
	 */
	textEllipsisPosition?: "start" | "end";
	/**
	 * Name attribute to assign to the `input` element
	 */
	name: string;
	/**
	 * the label content to display on the screen
	 */
	label?: string | JSX.Element;
	/**
	 * The value of the autocomplete
	 */
	value?: V | V[];
	/**
	 * Content to display as supportive/explanatory text
	 */
	helperText?: string | JSX.Element;
	/**
	 * The text to display as the tooltip hint
	 */
	title?: string;
	/**
	 * The text to display as the input placeholder
	 */
	placeholder?: string;
	/**
	 * Boolean flag to mark the `input` in error state
	 */
	hasErrors?: boolean;
	/**
	 * Boolean flag used to display an indicator of whether or not this `input` is mandatory
	 */
	required?: boolean;
	/**
	 * Boolean flag to control whether to stack the label on top of the `input` element (false) or place them inline to one another (true)
	 */
	inlineLabel?: boolean;
	/**
	 * Boolean flag to disable the `input`
	 */
	disabled?: boolean;
	/**
	 * Boolean flag to set the `input` in a read-only state
	 */
	readOnly?: boolean;
	/**
	 * allow multiple selection
	 */
	multiple?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `input` is changed
	 */
	onChange?: (event: { name: string; value: V | V[] | null }) => void;
	/**
	 * The component type to use for rendering all option instances
	 */
	itemComponent: (item: T) => React.ReactNode;
	/**
	 * The mapping callback which will map/translate the original option object to the formatted type required by the itemComponent
	 */
	itemMappingCallback: (item: V) => T;
	/**
	 * The callback function which generates the display label for the selected option
	 */
	optionsLabelCallback: (item: T) => string;
	/**
	 * An array of SolaceSelectAutocompleteItems to render as the select options
	 */
	options: Array<V>;
	/**
	 * Custom renderer for selected values when we have multi-selection
	 */
	renderTags?: (value: V[]) => React.ReactNode;
	/**
	 * The maximum number of tags that will be visible when not focused. Set -1 to disable the limit.
	 */
	limitTags?: number;
	/**
	 * The label to display when the tags are truncated by limitTags.
	 */
	getLimitTagsText?: (more: number) => string;
	/**
	 * Fetch updated list of options
	 */
	fetchOptionsCallback: (searchTerm: string) => void;
	/**
	 * The callback to notify container that the select closed (can use this to clear fetched options)
	 */
	onCloseCallback?: () => void;
	/**
	 * Used to determine if the option represents the given value.
	 */
	isOptionEqualToValueCallback?: (option: V, value: V) => boolean;
	/**
	 * Used to determine the disabled state for a given option.
	 */
	getOptionDisabledCallback?: (option: V) => boolean;
	/**
	 * Whether there should be a divider after the option
	 */
	getShowOptionDividerCallback?: (option: V) => boolean;
	/**
	 * Used to determin the key for a given option
	 */
	getOptionKeyCallback?: (option: V) => string;
	/**
	 * The callback function which generates group heading
	 */
	groupByCallback?: (option: V) => string;
	/**
	 * Whether to clear search input when the option is selected
	 */
	shouldClearSearchOnSelectCallback?: (option: V) => boolean;
	/**
	 * Used to determine if an option has validation error, applicable to multiple select
	 */
	getOptionValidationErrorCallback?: (option: V) => string | JSX.Element;
	/**
	 * Used to validate search input, applicable to multiple select
	 */
	validateInputCallback?: (searchTerm: string) => string | JSX.Element;
	/**
	 * Whether to show divider between group headings
	 */
	showGroupDivider?: boolean;
	/**
	 * Custom Width of the component.
	 */
	width?: string;
	/**
	 * for adding a reference to the TextField component
	 */
	inputRef?: (input: HTMLInputElement) => void;
	/**
	 * Boolean flag to open the dropdown on focus
	 */
	openOnFocus?: boolean;
	/**
	 * Boolean flag to disable close on select. It is enabled by default for multiple select
	 */
	disableCloseOnSelect?: boolean;
	/**
	 * Boolean flag to clear search input on select. It is only applicable to multiple select and is false by default
	 */
	clearSearchOnSelect?: boolean;
	/**
	 * Custom max-height of the expanded dropdown,
	 * MaxHeight supports standard css units (px,rems, etc.)
	 */
	maxHeight?: string;
	/**
	 * Boolean flag to make the component full width
	 */
	fullWidth?: boolean;
	/**
	 * Custom min-width of the component
	 */
	minWidth?: string;
	/**
	 * Maximum width of selected value tag rendered by default renderer, applicable to multiple select
	 */
	tagMaxWidth?: string;
	/**
	 * Will display supplementalText or secondaryAction icon (used with SolaceSelectAutocompleteItem) inside input box if present in the selected option, not applicable to multiple select.
	 */
	showSupplementalTextOrSecondaryAction?: boolean;
	/**
	 * Will display left icon (used with SolaceSelectAutocompleteItem) inside input box if present in the selected option, not applicable to multiple select.
	 */
	showLeftIcon?: boolean;
}

const CustomHeightTextField = styled(TextField)<{ textEllipsisPosition?: "start" | "end" }>(
	({ textEllipsisPosition }) => ({
		"& .MuiOutlinedInput-input": {
			height: "32px",
			...(textEllipsisPosition === "start" && {
				direction: "rtl",
				textAlign: "left"
			})
		}
	})
);

const GroupItems = styled("ul")(() => ({
	padding: 0
}));

const MenuItemIcon = styled("span")(({ theme }) => ({
	color: theme.palette.ux.secondary.text.wMain,
	// padding: `0 ${theme.spacing(1)}`,
	whiteSpace: "nowrap",
	display: "flex",
	justifyContent: "flex-end",
	className: "menuItemIcon",
	".MuiSvgIcon-root": {
		fill: theme.palette.ux.secondary.wMain
	}
}));

const DEFAULT_DATA_QA = "SolaceSelectAutocomplete";

function ErrorChipToolTipContent({ label, error }: { label: string | JSX.Element; error: string | JSX.Element }) {
	const theme = useTheme();
	return (
		<Box display={"flex"} flexDirection={"column"} rowGap={theme.spacing(1.5)}>
			<Box style={{ wordBreak: "break-word" }}>{label}</Box>
			<Divider />
			<Box display={"flex"} alignItems={"flex-start"} columnGap={theme.spacing(0.5)}>
				<ErrorIcon size={18} fill={theme.palette.ux.error.w100} />
				{error}
			</Box>
		</Box>
	);
}

function SolaceSelectAutocomplete<T, V>({
	id,
	name,
	label,
	value,
	helperText,
	title,
	placeholder,
	hasErrors = false,
	required = false,
	inlineLabel = false,
	disabled = false,
	readOnly = false,
	multiple = false,
	onChange,
	itemComponent,
	itemMappingCallback,
	optionsLabelCallback,
	getShowOptionDividerCallback,
	shouldClearSearchOnSelectCallback,
	groupByCallback,
	showGroupDivider = false,
	dataQa,
	dataTags,
	options,
	renderTags,
	limitTags,
	getLimitTagsText,
	fetchOptionsCallback,
	onCloseCallback,
	isOptionEqualToValueCallback,
	getOptionDisabledCallback,
	getOptionKeyCallback,
	getOptionValidationErrorCallback,
	validateInputCallback,
	width,
	inputRef,
	openOnFocus = false,
	disableCloseOnSelect,
	clearSearchOnSelect = false,
	maxHeight = "40vh", // default value set by MUI so that dropdown calculation can work if value is omited
	fullWidth = false,
	minWidth,
	tagMaxWidth = "200px",
	showSupplementalTextOrSecondaryAction = false,
	showLeftIcon = false,
	textEllipsisPosition = "end"
}: SolaceSelectAutoCompleteProps<T, V>): JSX.Element {
	const theme = useTheme();
	const [selectedValue, setSelectedValue] = useState(value || null);
	const [inputValue, setInputValue] = useState("");
	const [inputValidationError, setInputValidationError] = useState<string | JSX.Element | null>(null);
	const [filteredOptions, setFilteredOptions] = useState(options || []);
	const [loading, setLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [open, setOpen] = useState(false);
	const [resetOptions, setResetOptions] = useState(false);
	const currentInputValue = useRef<string>("");
	const dropdownRef = useRef<HTMLUListElement | null>(null);
	const [dropdownRefState, setDropdownRefState] = useState<HTMLUListElement | null>(null);
	const persistInputValueOnSelect = useMemo(() => {
		return multiple && !clearSearchOnSelect;
	}, [clearSearchOnSelect, multiple]);

	useEffect(() => {
		setSelectedValue(value || null);
	}, [value]);

	useEffect(() => {
		setLoading(open && isFetching);
	}, [open, isFetching]);

	useEffect(() => {
		if (inputValue.length > 0) {
			setFilteredOptions([]);
			if (multiple) {
				if (!validateInputCallback?.(inputValue)) {
					setIsFetching(true);
					fetchOptionsCallback(inputValue);
				} else {
					setIsFetching(false);
					setOpen(false);
				}
			} else {
				setIsFetching(true);
				fetchOptionsCallback(inputValue);
			}
		}
	}, [inputValue, fetchOptionsCallback, validateInputCallback, multiple]);

	useEffect(() => {
		setFilteredOptions(options);
		setIsFetching(false);
	}, [options]);

	useEffect(() => {
		if (resetOptions) {
			setIsFetching(true);
			fetchOptionsCallback("");
			setResetOptions(false);
		}
	}, [fetchOptionsCallback, resetOptions]);

	const HEADING_HEIGHT = 32;

	const setDropdownRef = useCallback((node: HTMLUListElement | null) => {
		if (!node) return;

		// Set the dropdown reference to get the height properties of the dropdown
		dropdownRef.current = node;
		setDropdownRefState(node);
	}, []);

	const calculateItemHeight = useCallback((option: V) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return (option as any).subText ? 58 : 38;
	}, []);

	const shouldBreakLoop = useCallback(
		(dropdownHeight: number, itemHeight: number, groupCount: number, maxHeight: number) => {
			return dropdownHeight + itemHeight + groupCount * HEADING_HEIGHT + 16 >= maxHeight; // 16 is total padding of the dropdown
		},
		[]
	);

	const updateGroupCount = useCallback(
		(option: V, prevCategoryGroup: string) => {
			return !!(groupByCallback && groupByCallback(option) !== prevCategoryGroup);
		},
		[groupByCallback]
	);

	const updatePrevCategoryGroup = useCallback(
		(option: V) => {
			if (option && groupByCallback) {
				return groupByCallback(option);
			}
			return "";
		},
		[groupByCallback]
	);

	const convertToPixels = (value: string): number | string | null => {
		const units = value.match(/[\d.]+|\D+/g);
		if (dropdownRef.current) {
			const currentDropdownRef = dropdownRef.current;

			if (!units || units.length < 2) {
				return value;
			}

			const [number, unit] = units;
			const num = parseFloat(number);

			if (isNaN(num)) return null;

			switch (unit) {
				case "px":
					return num;
				case "em":
					return currentDropdownRef ? num * parseFloat(getComputedStyle(currentDropdownRef).fontSize) : null;
				case "rem":
					return num * parseFloat(getComputedStyle(document.documentElement).fontSize);
				case "%":
					return currentDropdownRef ? (num * currentDropdownRef.clientHeight) / 100 : null;
				case "vh":
					return (num * window.innerHeight) / 100;
				case "vw":
					return (num * window.innerWidth) / 100;
				default:
					return null;
			}
		}

		return null;
	};

	/**
	 * The `maxDropdownHeight` is calculated by iterating through the  options and summing their heights
	 * until the total height exceeds the specified `maxHeight`. It then takes the last element's difference
	 * from the `maxHeight` and divides it by 2 to cut the last visible element. If the initial `maxHeight` is
	 * larger than the scroll height of the dropdown, it will exit the function as the last element does not
	 * need to be trimmed.
	 *
	 * Function will account for keyword values passed into `maxHeight` ex: fit-content, none, etc. and will return
	 * the value as is
	 */

	// eslint-disable-next-line sonarjs/cognitive-complexity
	const maxDropdownHeight = useMemo(() => {
		let dropdownHeight = 0;
		let itemHeight = 0;
		let prevItemHeight = 0;
		let groupCount = 0;
		let prevCategoryGroup = "";
		let lastElementDifference = 0;

		if (!dropdownRefState) return;

		const maxHeightInPixels = convertToPixels(maxHeight);

		if (typeof maxHeightInPixels === "string") return maxHeightInPixels;
		if (!maxHeightInPixels || maxHeightInPixels <= 58 || maxHeightInPixels >= dropdownRefState.scrollHeight) return;

		for (let i = 0; i < filteredOptions.length; i++) {
			const option = filteredOptions[i];
			itemHeight = calculateItemHeight(option);

			// Check if adding the next item would exceed the max height and calculate the last element difference
			if (shouldBreakLoop(dropdownHeight, itemHeight, groupCount, maxHeightInPixels)) {
				lastElementDifference = maxHeightInPixels - dropdownHeight;
				break;
			}
			if (typeof option === "object") {
				// Check if the current option belongs to a new category group and update the group count
				if (updateGroupCount(option, prevCategoryGroup)) {
					groupCount++;
					// Check if adding a new group would exceed the max height and calculate the last element difference
					if (prevItemHeight && shouldBreakLoop(dropdownHeight, itemHeight, groupCount, maxHeightInPixels)) {
						lastElementDifference = maxHeightInPixels - dropdownHeight;
						break;
					}
				}
				prevCategoryGroup = updatePrevCategoryGroup(option);
			}

			dropdownHeight += itemHeight;
			prevItemHeight = itemHeight;
		}

		return prevItemHeight / 2 + lastElementDifference - 8 - (groupCount === 0 ? 0 : groupCount * 32); // 8 is the padding of the dropdown, groupcount calcuations is added since the group headings have a diffenet height than the normal items
	}, [
		calculateItemHeight,
		dropdownRefState,
		filteredOptions,
		maxHeight,
		shouldBreakLoop,
		updateGroupCount,
		updatePrevCategoryGroup
	]);

	const handleChange = (
		_event: SyntheticEvent<Element, Event>,
		_value: V | V[] | null,
		reason: AutocompleteChangeReason
	) => {
		if (reason === "clear" && persistInputValueOnSelect && inputValue) {
			// If search input needs to be peristed after user select/deselect an option, then clicking on "X" button should clear search input first and then clear selected values
			return;
		}

		// Set internal state for selected value
		setSelectedValue(_value || null);

		// Notify externally
		if (onChange) {
			onChange({
				name: name,
				value: _value
			});
		}

		// Clear search input if needed. Since onChange is called before this, we can assume parent of this component has updated data used to populate the options
		if (reason === "selectOption" && persistInputValueOnSelect && _value && shouldClearSearchOnSelectCallback) {
			const shouldClear =
				(Array.isArray(_value) && _value.some((option) => shouldClearSearchOnSelectCallback(option))) ||
				shouldClearSearchOnSelectCallback(_value as V);
			if (shouldClear) {
				setInputValue("");
				setResetOptions(true);
			}
		}
	};

	const handleInputChange = (_event: SyntheticEvent<Element, Event>, newInputValue: string, reason: string) => {
		// Clear search input when user selects an option is built-in behavior from MUI's Autocomplete. This logic is to prevent that behavior.
		// - NOTE: selectOption, removeOption are only supported in MUI 6.x, they are included here so that the logic is future-proof.
		if (
			persistInputValueOnSelect &&
			(reason === "reset" || reason === "selectOption" || reason === "removeOption") &&
			currentInputValue.current
		) {
			// Manually set inputValue to currentInputValue to keep inputValue state in this component in sync with with underlying Autocomplete component
			setInputValue(currentInputValue.current);
		} else {
			currentInputValue.current = newInputValue;
			setInputValue(newInputValue);
			if (newInputValue === "") {
				setInputValidationError(null);
				// Reset options when inputValue is empty
				setResetOptions(true);
			} else if (!disabled && !readOnly && multiple) {
				const validationError = validateInputCallback?.(newInputValue);

				setInputValidationError(validationError ?? null);
				if (validationError) {
					setOpen(false);
				} else {
					setOpen(true);
				}
			}
		}
	};

	const handleOpen = () => {
		setOpen(true);
		if (!multiple || !inputValue) {
			setResetOptions(true);
		}
	};

	const handleClose = () => {
		onCloseCallback && onCloseCallback(); // notify parent select closed
		if (persistInputValueOnSelect) {
			setInputValue("");
			setInputValidationError(null);
		}
		setOpen(false);
	};

	const handleBlur = () => {
		setInputValue("");
		setInputValidationError(null);
	};

	const handleDeleteChip = (index: number) => {
		const newValue = (selectedValue as V[]).slice();
		newValue.splice(index, 1);

		setSelectedValue(newValue);

		// Notify externally
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const renderGroup = (params: any) => {
		if (groupByCallback && showGroupDivider) {
			return (
				<li key={params.key}>
					{(params.key !== 0 || params.group) && (
						<div>
							{params.key !== 0 && <Divider />}
							{params.group && <div className="MuiAutocomplete-groupLabel">{params.group}</div>}
						</div>
					)}
					{params.children && <GroupItems>{params.children}</GroupItems>}
				</li>
			);
		}
		return null;
	};

	const getErrorMessage = (label: string | JSX.Element, error: string | JSX.Element) => {
		return (
			<SolaceTooltip
				variant={TooltipVariant.rich}
				title={<ErrorChipToolTipContent label={label} error={error} />}
				placement={"bottom-start"}
			>
				<span>{label}</span>
			</SolaceTooltip>
		);
	};

	const getMessage = (label: string | JSX.Element) => {
		return (
			<SolaceTooltip variant={TooltipVariant.overflow} title={label} placement={"bottom-start"}>
				{label}
			</SolaceTooltip>
		);
	};

	const renderMultiSelectedTags = (tagValue: V[]) => {
		return tagValue.map((option, index) => {
			const label = optionsLabelCallback(itemMappingCallback(option));
			const error = getOptionValidationErrorCallback?.(option) ?? null;

			return (
				<SolaceChip
					key={`${dataQa ?? DEFAULT_DATA_QA}-${index}`}
					label={
						<div style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
							{error ? getErrorMessage(label, error) : getMessage(label)}
						</div>
					}
					clickable={!readOnly}
					disabled={disabled}
					onDelete={() => handleDeleteChip(index)}
					dataQa={`${dataQa ?? DEFAULT_DATA_QA}-${index}`}
					status={error ? STATUSES.ERROR_STATUS : STATUSES.NO_STATUS}
					maxWidth={tagMaxWidth === null ? undefined : tagMaxWidth}
				></SolaceChip>
			);
		});
	};

	// eslint-disable-next-line sonarjs/cognitive-complexity
	const select = () => (
		<Autocomplete
			ListboxProps={{
				style: {
					maxHeight:
						typeof maxDropdownHeight === "string"
							? maxDropdownHeight
							: `calc(${maxHeight} - ${maxDropdownHeight ? maxDropdownHeight + "px" : "0px"})` // if maxDropdownHeight a string type then a keyword value was passed into maxHeight ex: fit-content, none, etc.
				},
				ref: setDropdownRef
			}}
			id={getId()}
			data-qa={dataQa ?? DEFAULT_DATA_QA}
			filterOptions={(x) => x}
			onInputChange={handleInputChange}
			options={filteredOptions}
			autoHighlight={true} // auto highlight first option
			value={selectedValue}
			inputValue={inputValue} // Use controlled input value
			getOptionLabel={(option) => {
				const mappedOption = itemMappingCallback(option);
				return optionsLabelCallback(mappedOption);
			}}
			renderOption={(props, option) => {
				if (option) {
					const mappedOption = itemMappingCallback(option);
					const showDivider = getShowOptionDividerCallback?.(option) ?? false;
					const defaultKey = optionsLabelCallback(itemMappingCallback(option));
					const optionKey = getOptionKeyCallback?.(option) ?? defaultKey;
					return (
						<Box
							component="li"
							{...props}
							key={optionKey}
							style={{ borderBottom: showDivider ? `1px solid ${theme.palette.ux.secondary.w20}` : "none" }}
						>
							{itemComponent(mappedOption)}
						</Box>
					);
				}
				return null;
			}}
			disabled={disabled || readOnly}
			loading={loading}
			open={open}
			multiple={multiple}
			disableCloseOnSelect={disableCloseOnSelect ?? multiple}
			onClose={handleClose}
			openOnFocus={openOnFocus}
			onOpen={handleOpen}
			onChange={handleChange}
			onBlur={handleBlur}
			popupIcon={<SelectDropdownIcon />}
			renderInput={(params) => {
				const { InputProps, inputProps, ...rest } = params;
				const selectedOption = selectedValue && !Array.isArray(selectedValue) ? selectedValue : null;
				const supplementalText = selectedOption
					? (selectedOption as V & { supplementalText?: string }).supplementalText
					: null;
				const secondaryAction = selectedOption
					? (selectedOption as V & { secondaryAction?: JSX.Element | HTMLElement }).secondaryAction
					: null;
				const leftIcon = selectedOption ? (selectedOption as V & { icon?: JSX.Element | HTMLElement }).icon : null;

				return (
					<CustomHeightTextField
						{...rest}
						textEllipsisPosition={textEllipsisPosition}
						title={title}
						autoComplete="off"
						placeholder={placeholder}
						error={!!inputValidationError || hasErrors}
						inputProps={{
							...inputProps,
							"data-qa": `${dataQa ?? DEFAULT_DATA_QA}-input`,
							"data-tags": dataTags,
							"aria-describedby": helperText ? `${getId()}-select-helper-text` : "",
							"aria-labelledby": label ? `${getId()}-label` : "",
							"aria-readonly": readOnly,
							title: title
						}}
						InputProps={{
							...InputProps,
							sx: { height: theme.spacing(4) },
							className: readOnly ? "readOnlySelect" : "",
							disabled: disabled,
							readOnly: readOnly,
							required: required,
							startAdornment: (
								<>
									{InputProps.startAdornment}
									{showLeftIcon && leftIcon && (
										<MenuItemIcon sx={{ padding: theme.spacing(0, 1, 0, 0) }}>{leftIcon}</MenuItemIcon>
									)}
								</>
							),
							endAdornment: (
								<>
									{InputProps.endAdornment}
									{showSupplementalTextOrSecondaryAction && supplementalText && (
										<MenuItemIcon sx={{ padding: theme.spacing(0, 1) }}>{supplementalText}</MenuItemIcon>
									)}
									{showSupplementalTextOrSecondaryAction && secondaryAction && (
										<MenuItemIcon sx={{ padding: theme.spacing(0, 1) }}>{secondaryAction}</MenuItemIcon>
									)}
								</>
							)
						}}
						inputRef={inputRef}
						onKeyDown={(event) => {
							// prevent multi-selected values from being deleted when user presses backspace or delete key
							if (event.key === "Backspace" || event.key === "Delete") {
								event.stopPropagation();
							}
						}}
					/>
				);
			}}
			isOptionEqualToValue={isOptionEqualToValueCallback}
			getOptionDisabled={getOptionDisabledCallback}
			renderTags={renderTags ? renderTags : renderMultiSelectedTags}
			limitTags={limitTags}
			getLimitTagsText={getLimitTagsText}
			ChipProps={{
				deleteIcon: <CloseIcon />
			}}
			groupBy={groupByCallback}
			renderGroup={groupByCallback && showGroupDivider ? renderGroup : undefined}
			fullWidth={fullWidth}
			sx={{ minWidth: minWidth }}
			clearText={persistInputValueOnSelect && inputValue ? "Clear Search" : "Clear"}
		/>
	);

	return (
		<FormChildBase
			id={getId()}
			label={label}
			helperText={helperText}
			errorText={inputValidationError ? inputValidationError : hasErrors ? helperText : undefined}
			disabled={disabled}
			readOnly={readOnly}
			required={required}
			inlineLabel={inlineLabel}
			centerInlineLabel={inlineLabel}
			sx={{ width }}
		>
			{select()}
		</FormChildBase>
	);
}

export default SolaceSelectAutocomplete;
