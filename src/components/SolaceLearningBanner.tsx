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

import React, { isValidElement } from "react";
import { styled } from "@mui/material";
import SolaceButton from "./form/SolaceButton";
import { CloseIcon } from "../resources/icons/CloseIcon";
import SolaceComponentProps from "./SolaceComponentProps";
import { getCloseButtonAriaLabel } from "../utils";

const BannerContainer = styled("div", {
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

interface SolaceLearningBannerProps extends SolaceComponentProps {
	/**
	 * The title of the banner.
	 */
	title?: string | JSX.Element;
	/**
	 * The content of the banner.
	 */
	children: JSX.Element;
	/**
	 * Boolean flag to control whether to show a close button in the end of the banner
	 */
	showCloseButton?: boolean;
	/**
	 * Callback function after the banner is closed
	 */
	onClose?: () => void;
	/**
	 * Background color of the banner
	 */
	backgroundColor?: string;
}

function SolaceLearningBanner({
	title,
	children,
	showCloseButton = false,
	onClose,
	backgroundColor,
	dataQa,
	dataTags
}: SolaceLearningBannerProps): JSX.Element | null {
	const [open, setOpen] = React.useState(true);

	const handleClose = () => {
		setOpen(false);
		onClose?.();
	};

	return open ? (
		<BannerContainer backgroundColor={backgroundColor} hasTitle={!!title} data-qa={dataQa} data-tags={dataTags}>
			{title && (
				<>
					<TitleRow>
						{isValidElement(title) ? title : <TitleSection>{title}</TitleSection>}
						{showCloseButton && (
							<SolaceButton aria-label={getCloseButtonAriaLabel()} variant="icon" onClick={handleClose}>
								<CloseIcon size={24} />
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
							<SolaceButton aria-label={getCloseButtonAriaLabel()} variant="icon" onClick={handleClose}>
								<CloseIcon size={24} />
							</SolaceButton>
						</div>
					)}
				</>
			)}
		</BannerContainer>
	) : null;
}

export default SolaceLearningBanner;
