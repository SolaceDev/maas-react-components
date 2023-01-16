import { Typography, useTheme } from "@mui/material";
import { SolaceTypographyProps } from "../types";

export default function SolaceTypography(props: SolaceTypographyProps) {
	const theme = useTheme();

	const colorMap = {
		info: theme.palette.ux.info.w100,
		error: theme.palette.ux.error.w100,
		warning: theme.palette.ux.warning.w100,
		success: theme.palette.ux.success.w100
	};

	const { variant = "body1", children, color, ...rest } = props;

	return (
		<Typography variant={variant} color={color ? colorMap[`${color}`] : "textPrimary"} {...rest}>
			{children}
		</Typography>
	);
}
