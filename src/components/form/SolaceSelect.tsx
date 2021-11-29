import { TextField, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SolaceComponentProps from "../SolaceComponentProps";
import FormChildBase from "./FormChildBase";
import { SelectDropdownIcon } from "../../resources/icons/SelectIcons";

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
	onChange?: (event: SolaceSelectChangeEvent) => void;
	/**
	 * An array of MenuItems to render as the select options
	 */
	children: Array<JSX.Element>;
}

function SolaceSelect({
	id,
	name,
	label,
	value = "",
	helperText,
	title,
	hasErrors = false,
	isRequired = false,
	isDisabled = false,
	isReadOnly = false,
	isInlineLabel = false,
	onChange,
	dataQa,
	dataTags,
	children
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
				"aria-readonly": isReadOnly,
				role: "select",
				title: title
			}}
			select
			InputProps={{
				sx: { height: theme.spacing(4) },
				className: isReadOnly ? "readOnlySelect" : "",
				disabled: isDisabled,
				readOnly: isReadOnly,
				required: isRequired
			}}
			title={title}
			autoComplete="off"
			required={isRequired}
			disabled={isDisabled || isReadOnly}
			margin="dense"
			value={selectedValue}
			onChange={handleChange}
			SelectProps={{
				IconComponent: () => <SelectDropdownIcon />
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
			isDisabled={isDisabled}
			isReadOnly={isReadOnly}
			isRequired={isRequired}
			isInlineLabel={isInlineLabel}
		>
			{select()}
		</FormChildBase>
	);
}

export default SolaceSelect;
