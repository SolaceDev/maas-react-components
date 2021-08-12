import { Backdrop, BackdropProps, CircularProgress, styled } from "@material-ui/core";
import React from "react";

const StyledBackDrop = styled(Backdrop)(({ theme }) => ({ zIndex: theme.zIndex.drawer + 1, color: "#fff" }));

export default function SolaceBackDrop(props: BackdropProps): JSX.Element {
	return (
		<StyledBackDrop {...props}>
			<CircularProgress />
		</StyledBackDrop>
	);
}
