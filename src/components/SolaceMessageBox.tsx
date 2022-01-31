import React from "react";
import { styled } from "@material-ui/core";
import SolaceButton from "./form/SolaceButton";
import { ErrorIcon } from "../resources/icons/ErrorIcon";
import { CloseIcon } from "../resources/icons/CloseIcon";

const InfoBoxContainer = styled("div")(({ theme }) => theme.mixins.component_MessageBox.container);
const InfoBoxMessage = styled("div")(({ theme }) => theme.mixins.component_MessageBox.message);

interface SolaceInfoBoxProps {
	/**
	 * the info message to display in the info box
	 */
	message: string | JSX.Element;
	/**
	 * Boolean flag to control whether to show an info icon in front of the info message
	 */
	showIcon?: boolean;
	/**
	 * Boolean flag to control whether to show a close button in the end of the info box
	 */
	showCloseButton?: boolean;
	/**
	 * Callback function after the message box is closed
	 */
	onClose?: () => void;
	/**
	 * Variants, currently supports error and info, can be expanded as needed
	 */
	variant: "info" | "error";
}

function SolaceMessageBox({
	message,
	showIcon = true,
	showCloseButton = false,
	onClose,
	variant = "info"
}: SolaceInfoBoxProps): JSX.Element | null {
	const [open, setOpen] = React.useState(true);

	const handleClose = () => {
		setOpen(false);
		onClose?.();
	};

	return open ? (
		<InfoBoxContainer className={variant}>
			<InfoBoxMessage>
				{showIcon && <ErrorIcon size={20} fill="" />}
				{message}
			</InfoBoxMessage>
			{showCloseButton && (
				<SolaceButton variant="icon" onClick={handleClose}>
					<CloseIcon size={20} />
				</SolaceButton>
			)}
		</InfoBoxContainer>
	) : null;
}

export default SolaceMessageBox;
