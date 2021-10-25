import { TextField, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { constants } from "../../constants";
import SolaceComponentProps from "../SolaceComponentProps";
import FormChildBase from "./FormChildBase";

export interface SolaceTextFieldChangeEvent {
	name: string;
	value: string;
}

export interface SolaceTextFieldProps extends SolaceComponentProps {
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
	 * Short hint displayed in the `input` before user enters a value
	 */
	placeholder?: string;
	/**
	 * The maximum number of characters which can be typed as the `input` value
	 */
	maxLength?: number;
	/**
	 * The type of `input` element to render
	 */
	type?: "text" | "number" | "password" | "email" | "url";
	/**
	 * The size/width of the `input` measured in characters
	 */
	size?: number;
	/**
	 * The text to display as the tooltip hint
	 */
	title?: string;
	/**
	 * Boolean flag to control whether the `input` element is focused during first mount
	 */
	autoFocus?: boolean;
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
	onChange?: (event: SolaceTextFieldChangeEvent) => void;
}

function SolaceTextField({
	id,
	name,
	label,
	value,
	helperText,
	placeholder,
	maxLength = constants.maxLength,
	type = "text",
	size = 50,
	title,
	autoFocus = false,
	hasErrors = false,
	isRequired = false,
	isInlineLabel = false,
	isDisabled = false,
	isReadOnly = false,
	onChange,
	dataQa,
	dataTags
}: SolaceTextFieldProps): JSX.Element {
	const theme = useTheme();
	const [textValue, setTextValue] = useState(value);

	useEffect(() => {
		setTextValue(value);
	}, [value]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

	const textField = () => (
		<TextField
			id={`${getId()}`}
			name={name}
			inputProps={{
				maxLength: maxLength,
				size: size,
				"data-qa": dataQa,
				"data-tags": dataTags,
				"data-lpignore": true,
				readOnly: isReadOnly,
				"aria-describedby": helperText ? `${getId()}-textfield-helper-text` : "",
				"aria-labelledby": label ? `${getId()}-label` : "",
				"aria-readonly": isReadOnly,
				role: "textbox",
				title: title
			}}
			type={type}
			error={hasErrors}
			autoComplete="off"
			autoFocus={autoFocus}
			InputProps={{
				sx: { height: theme.spacing(4) },
				disabled: isDisabled,
				required: isRequired
			}}
			margin="dense"
			placeholder={placeholder}
			value={textValue}
			onChange={handleChange}
		/>
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
			{textField()}
		</FormChildBase>
	);
}

export default SolaceTextField;
