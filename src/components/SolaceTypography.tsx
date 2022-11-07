import { Typography } from "@mui/material";
import { SolaceTypographyProps } from "../types";

export default function SolaceTypography(props: SolaceTypographyProps) {
	const { variant = "body1", children, ...rest } = props;
	return (
		<Typography variant={variant} {...rest}>
			{children}
		</Typography>
	);
}
