import { Box, TextField, InputLabel, useTheme, FormHelperText } from "@material-ui/core";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import React, { useEffect, useState } from "react";
import SolaceComponentProps from "../SolaceComponentProps";

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
	 * The type of `input` element to render
	 */
	type?: "text" | "number" | "password" | "email" | "url";
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
}

const SolaceSelect: React.FC<SolaceSelectProps> = ({
	id,
	name,
	label,
	value = "",
	helperText,
	type = "text",
	title,
	hasErrors = false,
	isRequired = false,
	isInlineLabel = false,
	isDisabled = false,
	isReadOnly = false,
	onChange,
	dataQa,
	dataTags,
	children
}) => {
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

	const getHelperText = () => (
		<Box display="flex">
			{hasErrors && <ErrorOutlineOutlinedIcon sx={{ marginRight: theme.spacing() }} />}
			{helperText}
		</Box>
	);

	const getId = () => {
		return id ? id : name;
	};

	const select = () => (
		<React.Fragment>
			<TextField
				id={`${getId()}-select`}
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
				FormHelperTextProps={{
					variant: "standard",
					error: hasErrors
				}}
				helperText={getHelperText()}
				title={title}
				type={type}
				error={hasErrors}
				autoComplete="off"
				required={isRequired}
				disabled={isDisabled}
				margin="dense"
				value={selectedValue}
				onChange={handleChange}
			>
				{children}
			</TextField>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			{!isInlineLabel && label && (
				<Box marginTop={theme.spacing()}>
					<InputLabel
						id={`${getId()}-label`}
						htmlFor={`${getId()}-select`}
						required={isRequired}
						disabled={isDisabled}
						error={hasErrors}
					>
						{label}
					</InputLabel>
					{select()}
				</Box>
			)}
			{isInlineLabel && label && (
				<Box
					marginBottom={theme.spacing()}
					display="flex"
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<InputLabel
						id={`${getId()}-label`}
						htmlFor={`${getId()}-select`}
						required={isRequired}
						color="primary"
						disabled={isDisabled}
						error={hasErrors}
					>
						{label}
					</InputLabel>
					{select()}
				</Box>
			)}
			{!label && select()}
		</React.Fragment>
	);
};

export default SolaceSelect;
