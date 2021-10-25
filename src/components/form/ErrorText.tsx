import { FormLabel, useTheme } from "@material-ui/core";
import { Box } from "@material-ui/system";
import React from "react";
import SolaceComponentProps from "../SolaceComponentProps";
import { ErrorIcon } from "../../resources/icons/ErrorIcon";

export interface ErrorTextProps extends SolaceComponentProps {
	children: string | JSX.Element;
}

function ErrorText({ children }: ErrorTextProps): JSX.Element {
	const theme = useTheme();
	return (
		<Box display="flex" flexDirection="row" alignItems="center">
			<ErrorIcon size={16} fill={theme.palette.error.main}></ErrorIcon>
			<FormLabel
				sx={{ color: theme.palette.error.main, fontSize: theme.typography.caption, marginLeft: theme.spacing(0.5) }}
			>
				{children}
			</FormLabel>
		</Box>
	);
}

export default ErrorText;
