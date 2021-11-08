import { FormLabel, useTheme } from "@material-ui/core";
import React from "react";
import SolaceComponentProps from "../SolaceComponentProps";

export interface HelperTextProps extends SolaceComponentProps {
	children: string | JSX.Element;
}

function HelperText({ children }: HelperTextProps): JSX.Element {
	const theme = useTheme();
	return (
		<FormLabel sx={{ color: theme.palette.text.secondary, fontSize: theme.typography.caption.fontSize }}>
			{children}
		</FormLabel>
	);
}

export default HelperText;
