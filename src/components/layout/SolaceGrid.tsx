import { Grid, useTheme } from "@mui/material";
import { SolaceGridProps } from "../../types/solaceGrid";

/**
 * All of the supported props related to SolaceGrid can be found at https://mui.com/api/grid/
 * Examples on how to use this components can be found at https://mui.com/components/grid/
 * All props provided by mui have been extended, to provide more flexibility for developers while using these layout components.
 */
export default function SolaceGrid(props: SolaceGridProps) {
	const { children, container, ...rest } = props;
	let { spacing } = rest;

	if (container && !spacing) {
		// defaulting the spacing to 16px if nothing is provided.
		spacing = 2;
	}

	const theme = useTheme();
	return (
		<Grid container={container} spacing={spacing} color={theme.palette.ux.primary.wMain} {...rest}>
			{children}
		</Grid>
	);
}
