import { FormLabel, useTheme, styled } from "@mui/material";
import { Box } from "@mui/system";
import SolaceComponentProps from "../SolaceComponentProps";
import { ErrorIcon } from "../../resources/icons/ErrorIcon";
import { BASE_FONT_PX_SIZES } from "../../resources/typography";

const ErrorTextContainer = styled(Box)(({ theme }) => theme.mixins.formComponent_ErrorText.container);

const ErrorTextLabel = styled(FormLabel)(({ theme }) => theme.mixins.formComponent_ErrorText.label);

export interface ErrorTextProps extends SolaceComponentProps {
	children: string | JSX.Element;
}

function ErrorText({ children }: ErrorTextProps): JSX.Element {
	const theme = useTheme();
	const size = theme.typography.subtitle1.fontSize?.toString();
	return (
		<ErrorTextContainer>
			<ErrorIcon size={size ? parseInt(size) : BASE_FONT_PX_SIZES.md} fill={theme.palette.ux.error.w100}></ErrorIcon>
			<ErrorTextLabel>{children}</ErrorTextLabel>
		</ErrorTextContainer>
	);
}

export default ErrorText;
