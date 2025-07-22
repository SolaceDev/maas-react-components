/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { styled, Theme, useTheme } from "@mui/material";
import SolaceButton from "./form/SolaceButton";
import { ErrorIcon } from "../resources/icons/ErrorIcon";
import { InfoIcon } from "../resources/icons/InfoIcon";
import { SuccessIcon } from "../resources/icons/SuccessIcon";
import { CloseIcon } from "../resources/icons/CloseIcon";
import { WarnIcon } from "../resources/icons/WarnIcon";
import SolaceComponentProps from "./SolaceComponentProps";
import { CSSProperties } from "@mui/styled-engine";
import { getCloseButtonAriaLabel } from "../utils";

const InfoBoxContainer = styled("div")(({ theme }) => ({
	...(theme.mixins.component_MessageBox.container as CSSProperties)
}));
const InfoBoxMessageContainer = styled("div")(({ theme }) => ({
	...(theme.mixins.component_MessageBox.messageContainer as CSSProperties)
}));
const DetailsContainer = styled("div")(({ theme }) => ({
	...(theme.mixins.component_MessageBox.detailsContainer as CSSProperties)
}));
const MessageTextContainer = styled("div", { shouldForwardProp: (prop) => prop !== "color" })<{ color?: string }>(
	({ theme, color }) => ({
		...(theme.mixins.component_MessageBox.messageTextContainer as CSSProperties),
		color: color
	})
);
const IconContainer = styled("div")(({ theme }) => ({
	...(theme.mixins.component_MessageBox.iconContainer as CSSProperties)
}));
const InfoBoxMessage = styled("div")(({ theme }) => ({
	...(theme.mixins.component_MessageBox.message as CSSProperties)
}));

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
	const variantMap = {
		info: { Icon: InfoIcon, color: theme.palette.ux.info.w100 },
		error: { Icon: ErrorIcon, color: theme.palette.ux.error.w100 },
		warn: { Icon: WarnIcon, color: theme.palette.ux.warning.w100 },
		success: { Icon: SuccessIcon, color: theme.palette.ux.success.w100 }
	};

	const { Icon, color } = variantMap[variant] || variantMap.info;

	return <Icon size={24} fill={color} />;
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
	const getColor = () => {
		const colorOverride = color || theme.mixins.component_MessageBox.messageTextContainer.color;
		if (colorOverride) {
			if (variant === "error") {
				return color || theme.palette.ux.error.w100;
			}
			return colorOverride;
		}
		switch (variant) {
			case "error":
				return theme.palette.ux.error.w100;
			case "warn":
				return theme.palette.ux.primary.text.wMain;
			case "success":
				return theme.palette.ux.success.w100;
			case "info":
				return theme.palette.ux.info.w100;
		}
	};

	return open ? (
		<React.Fragment>
			<InfoBoxContainer className={variant} data-qa={dataQa} data-tags={dataTags}>
				<InfoBoxMessageContainer>
					<InfoBoxMessage className={`${dense ? "dense" : ""}`}>
						{showIcon && (
							<IconContainer className={`iconContainer ${dense ? "dense" : ""}`}>
								{renderIcons(theme, variant)}
							</IconContainer>
						)}
						<MessageTextContainer color={getColor()}>{message}</MessageTextContainer>
					</InfoBoxMessage>
					{showCloseButton && (
						<SolaceButton aria-label={getCloseButtonAriaLabel()} variant="icon" onClick={handleClose}>
							<CloseIcon size={24} />
						</SolaceButton>
					)}
				</InfoBoxMessageContainer>
				{!!details && <DetailsContainer>{details}</DetailsContainer>}
			</InfoBoxContainer>
		</React.Fragment>
	) : null;
}

export default SolaceMessageBox;
