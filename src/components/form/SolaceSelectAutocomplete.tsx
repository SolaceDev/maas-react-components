import React, { SyntheticEvent, useEffect, useState } from "react";
import { Box, Autocomplete, TextField, useTheme, styled } from "@mui/material";
import SolaceComponentProps from "../SolaceComponentProps";
import FormChildBase from "./FormChildBase";
import CloseIcon from "@mui/icons-material/Close";
import { SelectDropdownIcon } from "../../resources/icons/SelectIcons";

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
}

const CustomHeightTextField = styled(TextField)`
	& .MuiOutlinedInput-input {
		height: 32px;
	}
`;

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
	dataQa,
	dataTags,
	options,
	renderTags,
	limitTags,
	fetchOptionsCallback,
	onCloseCallback,
	isOptionEqualToValueCallback,
	getOptionDisabledCallback
}: SolaceSelectAutoCompleteProps<T, V>): JSX.Element {
	const theme = useTheme();
	const [selectedValue, setSelectedValue] = useState(value || null);
	const [inputValue, setInputValue] = React.useState("");
	const [filteredOptions, setFilteredOptions] = useState(options || []);
	const [loading, setLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setSelectedValue(value || null);
	}, [value]);

	useEffect(() => {
		setLoading(open && isFetching);
	}, [open, isFetching]);

	useEffect(() => {
		setFilteredOptions([]);
		setIsFetching(true);
		fetchOptionsCallback(inputValue);
	}, [inputValue, fetchOptionsCallback]);

	useEffect(() => {
		setFilteredOptions(options);
		setIsFetching(false);
	}, [options]);

	const handleChange = (_event: SyntheticEvent<Element, Event>, _value: V | V[] | null) => {
		// set internal state for selected value
		setSelectedValue(_value || null);

		// notify externally
		if (onChange) {
			onChange({
				name: name,
				value: _value
			});
		}
	};

	const getId = () => {
		return id ? id : name;
	};

	const select = () => (
		<Autocomplete
			id={getId()}
			data-qa={dataQa}
			filterOptions={(x) => x}
			onInputChange={(_event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			options={filteredOptions}
			autoHighlight
			value={selectedValue}
			getOptionLabel={(option) => {
				const mappedOption = itemMappingCallback(option);
				return optionsLabelCallback(mappedOption);
			}}
			renderOption={(props, option) => {
				if (option) {
					const mappedOption = itemMappingCallback(option);
					return (
						<Box component="li" {...props}>
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
			disableCloseOnSelect={multiple}
			onClose={() => {
				onCloseCallback && onCloseCallback(); // notify parent select closed
				setOpen(false);
			}}
			onOpen={() => {
				setIsFetching(true);
				setOpen(true);
				fetchOptionsCallback(inputValue);
			}}
			onChange={handleChange}
			popupIcon={<SelectDropdownIcon />}
			renderInput={(params) => (
				<CustomHeightTextField
					{...params}
					title={title}
					autoComplete="off"
					placeholder={placeholder}
					inputProps={{
						...params.inputProps,
						"data-qa": `${dataQa}-input`,
						"data-tags": dataTags,
						"aria-describedby": helperText ? `${getId()}-select-helper-text` : "",
						"aria-labelledby": label ? `${getId()}-label` : "",
						"aria-readonly": readOnly,
						role: "select",
						title: title
					}}
					InputProps={{
						...params.InputProps,
						sx: { height: theme.spacing(4) },
						className: readOnly ? "readOnlySelect" : "",
						disabled: disabled,
						readOnly: readOnly,
						required: required
					}}
				/>
			)}
			isOptionEqualToValue={isOptionEqualToValueCallback}
			getOptionDisabled={getOptionDisabledCallback}
			renderTags={renderTags}
			limitTags={limitTags}
			ChipProps={{
				deleteIcon: <CloseIcon />
			}}
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
		>
			{select()}
		</FormChildBase>
	);
}

export default SolaceSelectAutocomplete;
