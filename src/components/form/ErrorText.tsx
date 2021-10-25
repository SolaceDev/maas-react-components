import { FormLabel, useTheme } from "@material-ui/core";
import { ErrorOutlineOutlined } from "@material-ui/icons";
import { Box } from "@material-ui/system";
import React from "react";
import SolaceComponentProps from "../SolaceComponentProps";

export interface ErrorTextProps extends SolaceComponentProps {
	children: string | JSX.Element;
}

function ErrorText({ children }: ErrorTextProps): JSX.Element {
	const theme = useTheme();
	return (
		<Box display="flex" flexDirection="row">
			<FormLabel sx={{ color: theme.palette.error.main, fontSize: theme.typography.caption }}>
				<Box display="flex" flexDirection="row" alignItems="center">
					<ErrorOutlineOutlined sx={{ marginRight: theme.spacing() }} />
					{children}
				</Box>
			</FormLabel>
		</Box>
	);
}

export default ErrorText;
