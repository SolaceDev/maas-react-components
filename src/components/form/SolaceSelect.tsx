import { TextField, useTheme } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { SelectDropdownIcon } from "../../resources/icons/SelectIcons";
import SolaceComponentProps from "../SolaceComponentProps";
import FormChildBase from "./FormChildBase";
export interface SolaceSelectChangeEvent {
	name: string;
	value: string;
}
export interface SolaceSelectProps extends SolaceComponentProps {
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
	 * The value of the `input` element, required for controlled component
	 */
	value?: string;
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
	 * Callback function to trigger whenever the value of the `input` is changed
	 */
	onChange?: (event: SolaceSelectChangeEvent) => void;
	/**
	 * Callback function to return option display value based on selected option value
	 */
	getOptionDisplayValue?: (value: unknown) => ReactNode;
	/**
	 * An array of MenuItems to render as the select options
	 */
	children: Array<JSX.Element>;
	/**
	 * Custom Width of the component.
	 */
	width?: string;
}

function SolaceSelect({
	id,
	name,
	label,
	value = "",
	helperText,
	title,
	hasErrors = false,
	required = false,
	disabled = false,
	readOnly = false,
	inlineLabel = false,
	onChange,
	getOptionDisplayValue,
	dataQa,
	dataTags,
	children,
	width
}: SolaceSelectProps): JSX.Element {
	const theme = useTheme();
	const [selectedValue, setSelectedValue] = useState(value);

	useEffect(() => {
		setSelectedValue(value);
	}, [value]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value);
		if (onChange) {
			onChange({
				name: name,
				value: event.target.value
			});
		}
	};

	const getId = () => {
		return id ? id : name;
	};

	const select = () => (
		<TextField
			id={getId()}
			name={name}
			inputProps={{
				"data-qa": dataQa,
				"data-tags": dataTags,
				"aria-describedby": helperText ? `${getId()}-select-helper-text` : "",
				"aria-labelledby": label ? `${getId()}-label` : "",
				"aria-readonly": readOnly,
				role: "select",
				title: title
			}}
			select
			InputProps={{
				sx: { height: theme.spacing(4) },
				className: readOnly ? "readOnlySelect" : "",
				disabled: disabled,
				readOnly: readOnly,
				required: required
			}}
			title={title}
			autoComplete="off"
			required={required}
			disabled={disabled || readOnly}
			margin="dense"
			value={selectedValue}
			onChange={handleChange}
			SelectProps={{
				IconComponent: SelectDropdownIcon,
				renderValue: getOptionDisplayValue
					? (value: unknown) => {
							return getOptionDisplayValue(value);
					  }
					: undefined
			}}
		>
			{children}
		</TextField>
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

export default SolaceSelect;
