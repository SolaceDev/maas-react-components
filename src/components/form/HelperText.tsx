import { FormLabel, useTheme } from "@material-ui/core";
import { Box } from "@material-ui/system";
import React from "react";
import SolaceComponentProps from "../SolaceComponentProps";

export interface HelperTextProps extends SolaceComponentProps {
	children: string | JSX.Element;
}

function HelperText({ children }: HelperTextProps): JSX.Element {
	const theme = useTheme();
	return (
		<Box component="span">
			<FormLabel sx={{ color: theme.palette.text.secondary, fontSize: theme.typography.caption }}>{children}</FormLabel>
		</Box>
	);
}

export default HelperText;
