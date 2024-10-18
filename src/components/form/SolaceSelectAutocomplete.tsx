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

export interface SolaceSelectAutoCompleteProps<T, V> extends SolaceComponentProps {
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
}

const CustomHeightTextField = styled(TextField)(() => ({
	"& .MuiOutlinedInput-input": {
		height: "32px"
	}
}));

const GroupItems = styled("ul")(() => ({
	padding: 0
}));

const DEFAULT_DATA_QA = "SolaceSelectAutocomplete";

function ErrorChipToolTipContent({ label, error }: { label: string; error: string | JSX.Element }) {
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
	maxHeight,
	fullWidth = false,
	minWidth,
	tagMaxWidth = "200px"
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
	const listboxRef = useRef<HTMLUListElement | null>(null);
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

	/**
	 * The following use callback is used to determine if there is a scrollbar and if true to calculate the maxHeight based on the total height of visible items and the height of the label div in the last visible item.
	 * The calculation ensures that the last visible item is cut at the label div.
	 * A condition checking if there are group dividers is present to add additional required conditioning to calculate the height based on nested elements
	 *
	 * Steps:
	 * 1. Iterate through the list items and sum their heights until the total height exceeds the client height of the listbox.
	 * 2. Identify the div containing the label within the last visible item.
	 * 3. Add half the height of the label div to the total height.
	 *
	 * For example, if the listbox can display items with a total height of 300px, and the label div in the last visible item has a height of 20px:
	 * maxHeight = totalHeight (300px) + half of labelDivHeight (10px)
	 * maxHeight = 300px + 10px
	 * maxHeight = 310px
	 *
	 * This ensures that the last visible item is cut at the label div.
	 */
	const setListBoxRef = useCallback(
		(node: HTMLUListElement | null) => {
			if (!node) return;

			// Set the listbox reference
			listboxRef.current = node;
			const listbox = listboxRef.current;

			// If the listbox doesn't have a scrollbar, no need to adjust the height
			if (listbox.scrollHeight <= listbox.clientHeight) return;

			const totalHeightObj = { value: 0 };
			let lastVisibleElementHeight = 0;
			const items = listbox.children;

			// Function to set the height of the last visible element
			const setLastVisibleElementHeight = (height: number) => {
				lastVisibleElementHeight = height;
			};

			// Wrappers for the helper functions to pass necessary parameters
			const calculateHeightWrapper = (item: HTMLElement) =>
				calculateHeight(item, totalHeightObj, listbox, setLastVisibleElementHeight);
			const processNestedItemsWrapper = (nestedUl: HTMLElement) =>
				processNestedItems(nestedUl, totalHeightObj, listbox, calculateHeightWrapper);
			const processGroupDividerWrapper = (item: HTMLElement) =>
				processGroupDivider(
					item,
					showGroupDivider,
					totalHeightObj,
					listbox,
					calculateHeightWrapper,
					processNestedItemsWrapper
				);

			// Iterate through the list items and calculate the total height
			for (let i = 0; i < items.length; i++) {
				const item = items[i] as HTMLElement;
				if (!processGroupDividerWrapper(item) && !calculateHeightWrapper(item)) break;
			}

			// Calculate the new height for the listbox
			const newHeight = totalHeightObj.value + lastVisibleElementHeight / 2 - 8; // 8 is the padding of the listbox
			listbox.style.maxHeight = `${newHeight}px`;
		},
		[showGroupDivider]
	);

	const calculateHeight = (
		item: HTMLElement,
		totalHeightObj: { value: number },
		listbox: HTMLElement,
		setLastVisibleElementHeight: (height: number) => void
	) => {
		const itemHeight = item.clientHeight;
		if (totalHeightObj.value + itemHeight > listbox.clientHeight) {
			setLastVisibleElementHeight(itemHeight);
			return false;
		}
		totalHeightObj.value += itemHeight;
		setLastVisibleElementHeight(itemHeight);
		return true;
	};

	const processNestedItems = (
		nestedUl: HTMLElement,
		totalHeightObj: { value: number },
		listbox: HTMLElement,
		calculateHeight: (
			item: HTMLElement,
			totalHeightObj: { value: number },
			listbox: HTMLElement,
			setLastVisibleElementHeight: (height: number) => void
		) => boolean
	) => {
		const nestedItems = nestedUl.children;
		for (let j = 0; j < nestedItems.length; j++) {
			const nestedItem = nestedItems[j] as HTMLElement;
			if (!calculateHeight(nestedItem, totalHeightObj, listbox, () => {})) return false;
		}
		return true;
	};

	const processGroupDivider = (
		item: HTMLElement,
		showGroupDivider: boolean,
		totalHeightObj: { value: number },
		listbox: HTMLElement,
		calculateHeight: (
			item: HTMLElement,
			totalHeightObj: { value: number },
			listbox: HTMLElement,
			setLastVisibleElementHeight: (height: number) => void
		) => boolean,
		processNestedItems: (
			nestedUl: HTMLElement,
			totalHeightObj: { value: number },
			listbox: HTMLElement,
			calculateHeight: (
				item: HTMLElement,
				totalHeightObj: { value: number },
				listbox: HTMLElement,
				setLastVisibleElementHeight: (height: number) => void
			) => boolean
		) => boolean
	) => {
		const labelGroupDiv = item.querySelector("div.MuiAutocomplete-groupLabel") as HTMLElement;
		if (showGroupDivider || labelGroupDiv) {
			if (!calculateHeight(labelGroupDiv, totalHeightObj, listbox, () => {})) return false;

			const nestedUl = item.querySelector("ul") as HTMLElement;
			return !(nestedUl?.tagName === "UL" && !processNestedItems(nestedUl, totalHeightObj, listbox, calculateHeight));
		}
		return false;
	};

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

	const renderMultiSelectedTags = (tagValue: V[]) => {
		return tagValue.map((option, index) => {
			const label = optionsLabelCallback(itemMappingCallback(option));
			const error = getOptionValidationErrorCallback?.(option) ?? null;

			return (
				<SolaceChip
					key={`${dataQa ?? DEFAULT_DATA_QA}-${index}`}
					label={
						<div style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
							<SolaceTooltip
								variant={error ? "html" : "overflow"}
								title={error ? <ErrorChipToolTipContent label={label} error={error} /> : label}
								placement={"bottom-start"}
							>
								{label}
							</SolaceTooltip>
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
			ListboxProps={{ style: { maxHeight: maxHeight }, ref: setListBoxRef }}
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

				return (
					<CustomHeightTextField
						{...rest}
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
							required: required
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
