import { Backdrop, BackdropProps, CircularProgress, styled } from "@mui/material";

const StyledBackDrop = styled(Backdrop)(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1,
	color: theme.palette.ux.primary.text.w10
}));

export default function SolaceBackDrop(props: BackdropProps): JSX.Element {
	return (
		<StyledBackDrop {...props}>
			<CircularProgress />
		</StyledBackDrop>
	);
}
