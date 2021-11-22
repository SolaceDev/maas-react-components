import { FormLabel, useTheme } from "@material-ui/core";
import { Box } from "@material-ui/system";
import SolaceComponentProps from "../SolaceComponentProps";
import { ErrorIcon } from "../../resources/icons/ErrorIcon";
import { BASE_FONT_PX_SIZES } from "../../resources/typography";

export interface ErrorTextProps extends SolaceComponentProps {
	children: string | JSX.Element;
}

function ErrorText({ children }: ErrorTextProps): JSX.Element {
	const theme = useTheme();
	const size = theme.typography.subtitle1.fontSize?.toString();
	return (
		<Box
			display="flex"
			flexDirection="row"
			justifyContent="flex-start"
			alignItems="center"
			sx={{ marginTop: theme.spacing(1.5) }}
		>
			<ErrorIcon size={size ? parseInt(size) : BASE_FONT_PX_SIZES.md} fill={theme.palette.error.main}></ErrorIcon>
			<FormLabel
				sx={{
					color: theme.palette.error.main,
					fontSize: theme.typography.caption.fontSize,
					marginLeft: theme.spacing(1)
				}}
			>
				{children}
			</FormLabel>
		</Box>
	);
}

export default ErrorText;
