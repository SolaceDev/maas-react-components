import { Box, InputBase, styled } from "@mui/material";
export const ChipInputContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	flexWrap: "wrap",
	alignItems: "flex-start",
	width: "100%",
	minHeight: theme.spacing(4),
	padding: "2px 4px",
	border: `1px solid ${theme.palette.ux.secondary.w40}`,
	borderRadius: "4px",
	"&.error": {
		borderColor: theme.palette.ux.error.wMain,
		borderWidth: "1px"
	},
	"&:focus-within": {
		borderColor: theme.palette.ux.primary.wMain,
		borderWidth: "1px"
	}
}));

export const ChipItem = styled(Box)(({ theme }) => ({
	margin: theme.spacing(0.5),
	display: "inline-flex",
	alignItems: "flex-start"
}));

export const InputWrapper = styled("div")({
	display: "inline-flex",
	flexGrow: 1,
	minWidth: "50px"
});

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
	flex: 1,
	padding: theme.spacing(0.5, 0),
	"& .MuiInputBase-input": {
		padding: 0,
		height: "120px"
	}
}));
