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

import { styled } from "@mui/material";
import SolaceTypography from "./SolaceTypography";
import { SolaceCardHeaderProps } from "../types";

/**
 * Styled container for the card header
 */
const CardHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: theme.spacing(1),
	width: "100%",
	boxSizing: "border-box"
}));

const CardHeaderContent = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(1)
}));

/**
 * Styled container for the icon
 */
const IconContainer = styled("div")(() => ({
	display: "flex",
	alignSelf: "flex-start",
	justifyContent: "center",
	alignItems: "center"
}));

/**
 * Styled container for the title and subheader
 */
const CardHeaderText = styled("div")(() => ({
	flex: 1,
	display: "flex",
	flexDirection: "column"
}));

/**
 * Styled container for the action elements
 */
const CardHeaderActions = styled("div")(({ theme }) => ({
	display: "flex",
	alignSelf: "flex-start",
	alignItems: "center",
	marginTop: theme.spacing(-0.5)
}));

/**
 * SolaceCardHeader component
 *
 * A custom card header component that doesn't wrap the title in a Typography element,
 * allowing for direct use of custom Typography components.
 */
function SolaceCardHeader({
	icon,
	title,
	subTitle,
	actionElements = null,
	dataQa,
	dataTags
}: SolaceCardHeaderProps): JSX.Element {
	return (
		<CardHeader data-qa={dataQa} data-tags={dataTags}>
			<CardHeaderContent>
				{icon && <IconContainer>{icon}</IconContainer>}
				{title && (
					<CardHeaderText>
						<SolaceTypography variant="h3">{title}</SolaceTypography>
						{subTitle && <SolaceTypography variant="body1">{subTitle}</SolaceTypography>}
					</CardHeaderText>
				)}
			</CardHeaderContent>
			{actionElements && <CardHeaderActions>{actionElements}</CardHeaderActions>}
		</CardHeader>
	);
}

export default SolaceCardHeader;
