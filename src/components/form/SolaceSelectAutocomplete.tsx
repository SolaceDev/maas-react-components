import React, { SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { Box, Autocomplete, TextField, useTheme, styled, Divider, AutocompleteChangeReason, Chip } from "@mui/material";
import SolaceComponentProps from "../SolaceComponentProps";
import FormChildBase from "./FormChildBase";
import CloseIcon from "@mui/icons-material/Close";
import { SelectDropdownIcon } from "../../resources/icons/SelectIcons";
import SolaceTooltip from "../SolaceToolTip";

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
	 * Boolean flag to disable close on select. If not set, it is enabled by default for multiple select
	 */
	disableCloseOnSelect?: boolean;
	/**
	 * Boolean flag to clear search input on select. This flag is only applicable for multiple select and is false by default
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
	width,
	inputRef,
	openOnFocus = false,
	disableCloseOnSelect,
	clearSearchOnSelect = false,
	maxHeight,
	fullWidth = false,
	minWidth
}: SolaceSelectAutoCompleteProps<T, V>): JSX.Element {
	const theme = useTheme();
	const [selectedValue, setSelectedValue] = useState(value || null);
	const [inputValue, setInputValue] = useState("");
	const [filteredOptions, setFilteredOptions] = useState(options || []);
	const [loading, setLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [open, setOpen] = useState(false);
	const [resetOptions, setResetOptions] = useState(false);
	const currentInputValue = useRef<string>("");
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
			setIsFetching(true);
			fetchOptionsCallback(inputValue);
		}
	}, [inputValue, fetchOptionsCallback]);

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
				// Reset options when inputValue is empty
				setResetOptions(true);
			}
		}
	};

	const handleOpen = () => {
		setOpen(true);
		setResetOptions(true);
	};

	const handleClose = () => {
		onCloseCallback && onCloseCallback(); // notify parent select closed
		if (persistInputValueOnSelect) {
			setInputValue("");
		}
		setOpen(false);
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

	// eslint-disable-next-line sonarjs/cognitive-complexity
	const select = () => (
		<Autocomplete
			ListboxProps={{ style: { maxHeight: maxHeight } }}
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
			getOptionKey={(option) => {
				const mappedOption = itemMappingCallback(option);
				return getOptionKeyCallback?.(option) ?? optionsLabelCallback(mappedOption);
			}}
			renderOption={(props, option) => {
				if (option) {
					const mappedOption = itemMappingCallback(option);
					const showDivider = getShowOptionDividerCallback?.(option) ?? false;

					return (
						<Box
							component="li"
							{...props}
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
			popupIcon={<SelectDropdownIcon />}
			renderInput={(params) => {
				const { InputProps, inputProps, ...rest } = params;

				return (
					<CustomHeightTextField
						{...rest}
						title={title}
						autoComplete="off"
						placeholder={placeholder}
						error={hasErrors}
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
					/>
				);
			}}
			isOptionEqualToValue={isOptionEqualToValueCallback}
			getOptionDisabled={getOptionDisabledCallback}
			renderTags={renderTags}
			limitTags={limitTags}
			getLimitTagsText={getLimitTagsText}
			ChipProps={{
				deleteIcon: <CloseIcon />,
				component:
					multiple && readOnly
						? (props) => {
								const selectedOptions = (selectedValue as V[]) || [];
								const option = selectedOptions[props["data-tag-index"]];
								let label = null;
								if (option) {
									label = optionsLabelCallback(itemMappingCallback(option));
								}
								return label ? (
									<Chip
										label={
											<SolaceTooltip variant="overflow" title={label}>
												{label}
											</SolaceTooltip>
										}
										disabled={true}
									></Chip>
								) : null;
						  }
						: undefined
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
			errorText={hasErrors ? helperText : undefined}
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
