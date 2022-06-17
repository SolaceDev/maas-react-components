import React, { isValidElement } from "react";
import { styled } from "@mui/material";
import SolaceButton from "./form/SolaceButton";
import { CloseIcon } from "../resources/icons/CloseIcon";
import SolaceComponentProps from "./SolaceComponentProps";

const CardContainer = styled("div", {
	shouldForwardProp: (prop) => prop !== "backgroundColor" && prop !== "hasTitle"
})<{
	backgroundColor?: string;
	hasTitle: boolean;
}>(({ backgroundColor, hasTitle, theme }) => ({
	backgroundColor: backgroundColor ?? theme.palette.ux.background.w20,
	color: theme.palette.ux.primary.text.wMain,
	borderRadius: "4px",
	display: "flex",
	flexDirection: hasTitle ? "column" : "row",
	justifyContent: "space-between",
	alignContent: "flex-start",
	padding: theme.spacing(2)
}));

const TitleRow = styled("div")({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center"
});

const TitleSection = styled("div")(({ theme }) => ({
	fontSize: theme.typography.subtitle1.fontSize,
	fontWeight: theme.typography.fontWeightMedium
}));

interface SolaceCardProps extends SolaceComponentProps {
	/**
	 * The title of the card.
	 */
	title?: string | JSX.Element;
	/**
	 * The content of the card.
	 */
	children: JSX.Element;
	/**
	 * Boolean flag to control whether to show a close button in the end of the card
	 */
	showCloseButton?: boolean;
	/**
	 * Callback function after the card is closed
	 */
	onClose?: () => void;
	/**
	 * Background color of the card
	 */
	backgroundColor?: string;
}

function SolaceCard({
	title,
	children,
	showCloseButton = false,
	onClose,
	backgroundColor,
	dataQa,
	dataTags
}: SolaceCardProps): JSX.Element | null {
	const [open, setOpen] = React.useState(true);

	const handleClose = () => {
		setOpen(false);
		onClose?.();
	};

	return open ? (
		<CardContainer backgroundColor={backgroundColor} hasTitle={!!title} data-qa={dataQa} data-tags={dataTags}>
			{title && (
				<>
					<TitleRow>
						{isValidElement(title) ? title : <TitleSection>{title}</TitleSection>}
						{showCloseButton && (
							<SolaceButton variant="icon" onClick={handleClose}>
								<CloseIcon size={20} />
							</SolaceButton>
						)}
					</TitleRow>
					{children}
				</>
			)}
			{!title && (
				<>
					{children}
					{showCloseButton && (
						<div>
							<SolaceButton variant="icon" onClick={handleClose}>
								<CloseIcon size={20} />
							</SolaceButton>
						</div>
					)}
				</>
			)}
		</CardContainer>
	) : null;
}

export default SolaceCard;
