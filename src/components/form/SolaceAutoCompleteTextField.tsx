/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Box, FormHelperText, InputLabel, styled, TextField, TextFieldProps, useTheme } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

type CommonAutoCompleteTextFieldProps = TextFieldProps;

const StyledAutoCompleteTextField = styled(TextField)(({ theme }) => ({
	marginTop: theme.spacing(),
	marginBottom: theme.spacing(0.5),
	".MuiInputBase-root.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
		borderColor: theme.palette.ux.deprecated.secondary.wMain
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
				sx={{ color: theme.palette.ux.secondary.text.wMain }}
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
