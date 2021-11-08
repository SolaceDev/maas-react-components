import { Box, FormHelperText, InputLabel, styled, TextField, TextFieldProps, useTheme } from "@material-ui/core";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";

type CommonAutoCompleteTextFieldProps = TextFieldProps;

const StyledAutoCompleteTextField = styled(TextField)(({ theme }) => ({
	marginTop: theme.spacing(),
	marginBottom: theme.spacing(0.5),
	".MuiInputBase-root.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
		borderColor: "rgba(0, 0, 0, 0.35)"
	}
})) as unknown as React.ComponentType<TextFieldProps>;

export default function SolaceAutoCompleteTextField(props: CommonAutoCompleteTextFieldProps): JSX.Element {
	const { InputProps, label, helperText, ...rest } = props;
	const theme = useTheme();
	/**
	 * Inline styles should be fixed once global css issues are resolved.
	 */

	return (
		<Box>
			<InputLabel
				required={props.required}
				color="primary"
				disabled={props.disabled}
				error={props.error}
				sx={{ color: "rgba(0, 0, 0, 0.65)" }}
			>
				{label}
			</InputLabel>
			<StyledAutoCompleteTextField
				InputProps={{
					...InputProps,
					style: { paddingTop: "5px", paddingBottom: "5px" }
				}}
				{...rest}
			/>
			{props.error && (
				<FormHelperText component={"div"} error role="error">
					<Box display="flex">
						<ErrorOutlineOutlinedIcon fontSize="small" sx={{ marginRight: theme.spacing() }} />
						{helperText}
					</Box>
				</FormHelperText>
			)}
		</Box>
	);
}

SolaceAutoCompleteTextField.defaultProps = {
	variant: "outlined",
	fullWidth: true
};
