import { styled, useTheme } from "@material-ui/core";
import React from "react";
import SolaceButton from "./form/SolaceButton";
import SolaceComponentProps from "./SolaceComponentProps";
import { ErrorIcon } from "../resources/icons/ErrorIcon";
import { CloseIcon } from "../resources/icons/CloseIcon";

const Container = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	height: "100%",
	backgroundColor: "rgba(208, 2, 27, 0.1)",
	borderRadius: "2px",
	borderLeft: `3px solid ${theme.palette.error.main}`,
	paddingRight: "4px",
	color: theme.palette.error.main
}));

const MessageSection = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(),
	padding: `${theme.spacing()} 0 ${theme.spacing()} ${theme.spacing()} `
}));

export interface SolaceErrorBoxProps extends SolaceComponentProps {
	/**
	 * the error message to display in the error box
	 */
	message: string | JSX.Element;
	/**
	 * Boolean flag to control whether to show an error icon in front of the error message
	 */
	showErrorIcon?: boolean;
	/**
	 * Boolean flag to control whether to show a close button in the end of the error box
	 */
	showCloseButton?: boolean;
}

function SolaceErrorBox({
	message,
	showErrorIcon = true,
	showCloseButton = false
}: SolaceErrorBoxProps): JSX.Element | null {
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);

	const handleClose = () => {
		setOpen(false);
	};

	return open ? (
		<Container>
			<MessageSection>
				{showErrorIcon && <ErrorIcon size={20} fill={theme.palette.error.main} />}
				{message}
			</MessageSection>
			{showCloseButton && (
				<SolaceButton variant="icon" onClick={handleClose}>
					<CloseIcon size={20} />
				</SolaceButton>
			)}
		</Container>
	) : null;
}

export default SolaceErrorBox;
