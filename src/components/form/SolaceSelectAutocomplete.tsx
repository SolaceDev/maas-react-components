import React, { SyntheticEvent, useEffect, useState } from "react";
import { Box, Autocomplete, TextField, useTheme } from "@material-ui/core";
import SolaceComponentProps from "../SolaceComponentProps";
import FormChildBase from "./FormChildBase";

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
	value?: V;
	/**
	 * Content to display as supportive/explanitory text
	 */
	helperText?: string | JSX.Element;
	/**
	 * The text to display as the tooltip hint
	 */
	title?: string;
	/**
	 * Boolean flag to mark the `input` in error state
	 */
	hasErrors?: boolean;
	/**
	 * Boolean flag used to display an indicator of whether or not this `input` is mandatory
	 */
	isRequired?: boolean;
	/**
	 * Boolean flag to control whether to stack the label on top of the `input` element (false) or place them inline to one another (true)
	 */
	isInlineLabel?: boolean;
	/**
	 * Boolean flag to disable the `input`
	 */
	isDisabled?: boolean;
	/**
	 * Boolean flag to set the `input` in a read-only state
	 */
	isReadOnly?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `input` is changed
	 */
	onChange?: (event: { name: string; value: V | null }) => void;
	/**
	 * The component type to use for rendering all option instances
	 */
	itemComponent: (item: T) => React.ReactNode;
	/**
	 * The mapping callback which will map/translate the original option object to the formatted type required by the itemComponent
	 */
	itemMappingCallback: (item: V) => T;
	/**
	 * The callback function which generates the display lable for the selected option
	 */
	optionsLabelCallback: (item: T) => string;
	/**
	 * An array of SolaceSelectAutocompleteItems to render as the select options
	 */
	options: Array<V>;
	/**
	 * Fetch updated list of options
	 */
	fetchOptionsCallback: (searchTerm: string) => void;
	/**
	 * The callback to notify container that the select closed (can use this to clear fetched options)
	 */
	onCloseCallback?: () => void;
}

function SolaceSelectAutocomplete<T extends unknown, V extends unknown>({
	id,
	name,
	label,
	value,
	helperText,
	title,
	hasErrors = false,
	isRequired = false,
	isInlineLabel = false,
	isDisabled = false,
	isReadOnly = false,
	onChange,
	itemComponent,
	itemMappingCallback,
	optionsLabelCallback,
	dataQa,
	dataTags,
	options,
	fetchOptionsCallback,
	onCloseCallback
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

	// @ts-ignore ... this is to prevent TS never read error for event
	const handleChange = (event: SyntheticEvent<Element, Event>, value: V | null) => {
		// set internal state for selected value
		setSelectedValue(value || null);

		// notify externally
		if (onChange) {
			onChange({
				name: name,
				value: value
			});
		}
	};

	const getId = () => {
		return id ? id : name;
	};

	const select = () => (
		<Autocomplete
			id={getId()}
			sx={{ width: 300 }}
			filterOptions={(x) => x}
			// @ts-ignore ... this is to prevent TS never read error for event
			onInputChange={(event, newInputValue) => {
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
			disabled={isDisabled || isReadOnly}
			loading={loading}
			open={open}
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
			renderInput={(params) => (
				<TextField
					{...params}
					title={title}
					inputProps={{
						...params.inputProps,
						"data-qa": dataQa,
						"data-tags": dataTags,
						"aria-describedby": helperText ? `${getId()}-select-helper-text` : "",
						"aria-labelledby": label ? `${getId()}-label` : "",
						"aria-readonly": isReadOnly,
						role: "select",
						title: title
					}}
					InputProps={{
						...params.InputProps,
						sx: { height: theme.spacing(4) },
						className: isReadOnly ? "readOnlySelect" : "",
						disabled: isDisabled,
						readOnly: isReadOnly,
						required: isRequired
					}}
				/>
			)}
		/>
	);

	return (
		<React.Fragment>
			<FormChildBase
				id={getId()}
				label={label}
				helperText={helperText}
				errorText={hasErrors ? helperText : undefined}
				isDisabled={isDisabled}
				isReadOnly={isReadOnly}
				isRequired={isRequired}
				isInlineLabel={isInlineLabel}
			>
				{select()}
			</FormChildBase>
		</React.Fragment>
	);
}

export default SolaceSelectAutocomplete;
