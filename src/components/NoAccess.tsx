import { Box, Grid, styled, Typography } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";

const StyledGrid = styled(Grid)(() => ({ minHeight: "calc(100vh - 108px)" }));

export default function NoAccess(props: { pageName: string }): JSX.Element {
	return (
		<StyledGrid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
			<Grid item>
				<Box display="flex" flexDirection="row">
					<BlockIcon color="error" fontSize="large" />
					<Typography variant="h4">Access Required</Typography>
				</Box>
			</Grid>
			<Grid item>
				<Typography variant="body1">
					{`You do not have access to ${props.pageName}. To request access, please contact your Solace account representative.`}
				</Typography>
			</Grid>
		</StyledGrid>
	);
}
