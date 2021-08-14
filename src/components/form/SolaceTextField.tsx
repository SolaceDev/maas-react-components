import { Box, FormHelperText, InputLabel, styled, TextField, TextFieldProps, useTheme } from "@material-ui/core";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { constants } from "../constants";

type CommonTextFieldProps = TextFieldProps & {
	// Pass true to use original mui label style.
	useMuiLabelFormat: boolean;
	// Pass true to have the label placed in the same line as the text field
	useSameLineLabel?: boolean;
	// data-testId for the textfield component.
	testId?: string;
	// Pass true to enable LastPass browser extension.
	useLastPass?: boolean;
};

const StyledTextField = styled(TextField)(() => ({
	".MuiInputBase-root.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
		borderColor: "rgba(0, 0, 0, 0.35)"
	}
}));

/**
 * Common text field that provides the ability to use textfield with mui styled label or bold formatted label.
 * @type CommonTextFieldProps
 * @param props
 * @returns
 */

export default function SolaceTextField(props: CommonTextFieldProps): JSX.Element {
	const { helperText, testId, margin, useMuiLabelFormat, label, useSameLineLabel, InputProps, useLastPass, ...rest } =
		props;
	const theme = useTheme();

	const textField = () => (
		<React.Fragment>
			<StyledTextField
				{...rest}
				inputProps={{
					maxLength: constants.maxLength,
					"data-lpignore": !useLastPass,
					"data-testid": testId,
					...props.inputProps
				}}
				role="textfield"
				InputProps={{
					...InputProps,
					// define input height
					sx: rest.multiline || rest.select ? undefined : { height: theme.spacing(4) }
				}}
				FormHelperTextProps={{ variant: "standard" }}
				helperText={!props.error && helperText}
				margin={!useMuiLabelFormat ? "dense" : margin}
				label={useMuiLabelFormat && label}
				SelectProps={{
					SelectDisplayProps: { style: { paddingBottom: theme.spacing(0.75), paddingTop: theme.spacing(0.75) } },
					IconComponent: ExpandMoreIcon
				}}
			/>
			{props.error && (
				<FormHelperText component={"div"} error role="error">
					<Box display="flex">
						<ErrorOutlineOutlinedIcon fontSize="small" sx={{ marginRight: theme.spacing() }} />
						{helperText}
					</Box>
				</FormHelperText>
			)}
		</React.Fragment>
	);

	return (
		<React.Fragment>
			{!useMuiLabelFormat && !useSameLineLabel && props.label && (
				<Box marginTop={theme.spacing()}>
					<InputLabel required={props.required} color="primary" disabled={props.disabled} error={props.error}>
						{label}
					</InputLabel>
					{textField()}
				</Box>
			)}
			{!useMuiLabelFormat && useSameLineLabel && props.label && (
				<Box
					marginTop={theme.spacing()}
					display="flex"
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<InputLabel required={props.required} color="primary" disabled={props.disabled}>
						{label}
					</InputLabel>
					{textField()}
				</Box>
			)}
			{(useMuiLabelFormat || !props.label) && textField()}
		</React.Fragment>
	);
}

SolaceTextField.defaultProps = {
	size: "small",
	margin: "normal",
	useMuiLabelFormat: false,
	useSameLineLabel: false,
	useLastPass: false
};
