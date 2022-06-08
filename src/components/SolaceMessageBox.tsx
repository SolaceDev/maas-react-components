import React from "react";
import { styled, Theme, useTheme } from "@mui/material";
import SolaceButton from "./form/SolaceButton";
import { ErrorIcon } from "../resources/icons/ErrorIcon";
import { InfoIcon } from "../resources/icons/InfoIcon";
import { SuccessIcon } from "../resources/icons/SuccessIcon";
import { CloseIcon } from "../resources/icons/CloseIcon";
import { BASE_COLORS } from "../resources/colorPallette";
import { WarnIcon } from "../resources/icons/WarnIcon";
import SolaceComponentProps from "./SolaceComponentProps";
import { CSSProperties } from "@mui/styled-engine";

const InfoBoxContainer = styled("div")(({ theme }) => ({
	...(theme.mixins.component_MessageBox.container as CSSProperties)
}));
const InfoBoxMessageContainer = styled("div")(({ theme }) => ({
	...(theme.mixins.component_MessageBox.messageContainer as CSSProperties)
}));
const DetailsContainer = styled("div")(({ theme }) => ({
	...(theme.mixins.component_MessageBox.detailsContainer as CSSProperties)
}));
const MessageTextContainer = styled("div")(({ theme }) => ({
	...(theme.mixins.component_MessageBox.messageTextContainer as CSSProperties)
}));
const IconContainer = styled("div")(({ theme }) => ({
	...(theme.mixins.component_MessageBox.iconContainer as CSSProperties)
}));
const InfoBoxMessage = styled("div", { shouldForwardProp: (prop) => prop !== "color" })<{ color?: string }>(
	({ theme, color }) => ({
		...(theme.mixins.component_MessageBox.message as CSSProperties),
		color: color
	})
);

interface SolaceInfoBoxProps extends SolaceComponentProps {
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
	 * Variants, currently supports error, info, warn and success, default to info, can be expanded as needed
	 */
	variant: "info" | "error" | "warn" | "success";
	/**
	 * message text color
	 */
	color?: string;
	/**
	 *  If true, compact vertical padding is used
	 */
	dense?: boolean;
	/**
	 * To display further details about the message
	 */
	details?: string | JSX.Element;
}

function renderIcons(theme: Theme, variant: "info" | "error" | "warn" | "success"): JSX.Element {
	if (variant === "info") return <InfoIcon size={20} fill={theme.palette.ux.info.w100} />;
	else if (variant === "error") return <ErrorIcon size={20} fill={theme.palette.ux.error.w100} />;
	else if (variant === "warn") return <WarnIcon size={20} fill={theme.palette.ux.warning.w100} />;
	else if (variant === "success") return <SuccessIcon size={20} fill={theme.palette.ux.success.w100} />;
	return <InfoIcon size={20} fill={BASE_COLORS.blues.blue2} />;
}

function SolaceMessageBox({
	message,
	showIcon = true,
	showCloseButton = false,
	onClose,
	variant = "info",
	color,
	dense = false,
	details,
	dataQa,
	dataTags
}: SolaceInfoBoxProps): JSX.Element | null {
	const [open, setOpen] = React.useState(true);
	const theme = useTheme();
	const handleClose = () => {
		setOpen(false);
		onClose?.();
	};

	return open ? (
		<React.Fragment>
			<InfoBoxContainer className={variant} data-qa={dataQa} data-tags={dataTags}>
				<InfoBoxMessageContainer>
					<InfoBoxMessage color={color} className={`${dense ? "dense" : ""}`}>
						{showIcon && (
							<IconContainer className={`iconContainer ${dense ? "dense" : ""}`}>
								{renderIcons(theme, variant)}
							</IconContainer>
						)}
						<MessageTextContainer>{message}</MessageTextContainer>
					</InfoBoxMessage>
					{showCloseButton && (
						<SolaceButton variant="icon" onClick={handleClose}>
							<CloseIcon size={20} />
						</SolaceButton>
					)}
				</InfoBoxMessageContainer>
				{!!details && <DetailsContainer>{details}</DetailsContainer>}
			</InfoBoxContainer>
		</React.Fragment>
	) : null;
}

export default SolaceMessageBox;
