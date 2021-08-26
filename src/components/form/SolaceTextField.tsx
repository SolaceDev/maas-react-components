import { TextField } from "@material-ui/core";
import { Box, InputLabel, useTheme } from "@material-ui/core";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import React from "react";
import { constants } from "../../constants";
import SolaceComponentProps from "../SolaceComponentProps";

export interface SolaceTextFieldChangeEvent {
	id: string;
	value: string;
}

export interface SolaceTextFieldProps extends SolaceComponentProps {
	id: string;
	label?: string | JSX.Element;
	value?: string;
	helperText?: string | JSX.Element;
	placeholder?: string;
	maxLength?: number;
	size?: number;
	title?: string;
	hasErrors?: boolean;
	isRequired?: boolean;
	isInlineLabel?: boolean;
	isDisabled?: boolean;
	isReadOnly?: boolean;
	isPassword?: boolean;
	onChange?: (event: SolaceTextFieldChangeEvent) => void;
}

const SolaceTextField: React.FC<SolaceTextFieldProps> = ({
	id,
	label,
	value,
	helperText,
	placeholder,
	maxLength = constants.maxLength,
	size = 50,
	title,
	hasErrors = false,
	isRequired = false,
	isInlineLabel = false,
	isDisabled = false,
	isReadOnly = false,
	isPassword = false,
	onChange,
	dataQa,
	dataTags
}) => {
	const theme = useTheme();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange({
				id: id,
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

	const textField = () => (
		<React.Fragment>
			<TextField
				id={`${id}-textfield`}
				inputProps={{
					maxLength: maxLength,
					size: size,
					"data-qa": dataQa,
					"data-tags": dataTags
				}}
				role="textbox"
				title={title}
				type={isPassword ? "password" : "text"}
				autoComplete="off"
				aria-describedby={helperText ? `${id}-textfield-helper-text` : ""}
				aria-labelledby={label ? `${id}-label` : ""}
				InputProps={{
					sx: { height: theme.spacing(4) },
					readOnly: isReadOnly,
					disabled: isDisabled,
					required: isRequired
				}}
				FormHelperTextProps={{
					variant: "standard",
					error: hasErrors
				}}
				helperText={getHelperText()}
				margin="dense"
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
			/>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			{!isInlineLabel && label && (
				<Box marginTop={theme.spacing()}>
					<InputLabel
						id={`${id}-label`}
						htmlFor={`${id}-textfield`}
						required={isRequired}
						disabled={isDisabled}
						error={hasErrors}
					>
						{label}
					</InputLabel>
					{textField()}
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
						id={`${id}-label`}
						htmlFor={`${id}-textfield`}
						required={isRequired}
						color="primary"
						disabled={isDisabled}
						error={hasErrors}
					>
						{label}
					</InputLabel>
					{textField()}
				</Box>
			)}
			{!label && textField()}
		</React.Fragment>
	);
};

export default SolaceTextField;
