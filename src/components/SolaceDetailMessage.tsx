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

import SolaceButton, { SolaceButtonProps } from "./form/SolaceButton";
import { BASE_FONT_PX_SIZES } from "../resources/typography";
import { isEmpty } from "lodash";

export interface SolaceDetailMessageProps {
	/**
	 * An image to display above the message title
	 */
	msgImg?: JSX.Element;
	/**
	 * Title associated with the message
	 */
	title?: string;
	/**
	 * Detailed message to display
	 */
	details?: string | JSX.Element;
	/**
	 * An array of actions to display as SolaceButtons
	 */
	actions?: SolaceButtonProps[] | JSX.Element;
}

const Container = styled("div")(({ theme }) => ({
	// need to move this styled componet definition into the theme file once we figure out how
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	fontFamily: theme.typography.fontFamily
}));

const ImgContainer = styled("div")(() => ({
	// need to move this styled componet definition into the theme file once we figure out how
	margin: "0px 0px 40px 0px"
}));

const TitleText = styled("p")(({ theme }) => ({
	// need to move this styled componet definition into the theme file once we figure out how
	margin: "0px 0px 14px 0px",
	fontSize: BASE_FONT_PX_SIZES.xl,
	color: theme.palette.ux.primary.text.wMain,
	textAlign: "center"
}));

const DetailsContainer = styled("div")(({ theme }) => ({
	// need to move this styled componet definition into the theme file once we figure out how
	margin: "0px 0px 14px 0px",
	fontSize: BASE_FONT_PX_SIZES.sm,
	color: theme.palette.ux.primary.text.wMain
}));

const ButtonGroup = styled("div")(() => ({
	// need to move this styled componet definition into the theme file once we figure out how
	display: "flex",
	flexDirection: "row",
	alignItems: "center"
}));

function SolaceDetailMessage({ msgImg, title, details, actions }: SolaceDetailMessageProps): JSX.Element {
	const buildActionButtons = () => {
		const buttons: JSX.Element[] = [];
		if (Array.isArray(actions) && !isEmpty(actions)) {
			actions.forEach((action: SolaceButtonProps) =>
				buttons.push(<SolaceButton dataQa={action.dataQa} key={action.id} {...action} />)
			);
			return buttons;
		} else {
			return actions;
		}
	};

	return (
		<Container>
			{msgImg && <ImgContainer>{msgImg}</ImgContainer>}
			{title && <TitleText>{title}</TitleText>}
			{details && <DetailsContainer>{details}</DetailsContainer>}
			{actions && <ButtonGroup>{buildActionButtons() as React.ReactNode}</ButtonGroup>}
		</Container>
	);
}

export default SolaceDetailMessage;
