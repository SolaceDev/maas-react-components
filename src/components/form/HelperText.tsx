import { FormLabel, useTheme } from "@mui/material";
import SolaceComponentProps from "../SolaceComponentProps";

export interface HelperTextProps extends SolaceComponentProps {
	children: string | JSX.Element;
}

function HelperText({ children }: HelperTextProps): JSX.Element {
	const theme = useTheme();
	return (
		<FormLabel
			sx={{
				color: theme.palette.ux.secondary.text.wMain,
				fontSize: theme.typography.caption.fontSize,
				marginTop: "2px"
			}}
		>
			{children}
		</FormLabel>
	);
}

export default HelperText;
