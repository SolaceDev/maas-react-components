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
import SolaceComponentProps from "./SolaceComponentProps";
import SolaceTooltip from "./SolaceToolTip";
import SolaceButton from "./form/SolaceButton";

const TextWrapper = styled("div")(() => ({
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
	maxWidth: "100%"
}));

const SolaceButtonWrapper = styled("div")(() => ({
	display: "flex",
	button: {
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		display: "inline-block",
		maxWidth: "100%",
		// Overriding a default global button style
		"&.MuiLink-root:hover": {
			backgroundColor: "inherit"
		}
	},
	a: {
		overflow: "hidden",
		maxWidth: "100%",
		span: {
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis",
			width: "100%"
		}
	}
}));

export interface SolaceTruncatableLinkProps extends SolaceComponentProps {
	/**
	 * Unique identifier for the component
	 */
	id: string;
	/**
	 * This is the text that will be displayed in the button
	 */
	text: string | JSX.Element;
	/**
	 * This is the function that will be called when the button/link is clicked
	 */
	onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	/**
	 * This is the data-qa attribute for the component to identify it in tests
	 */
	dataQa?: string;
	/**
	 * This is the href for the external link
	 */
	href?: string;
}

/**
 * This component allows the SolaceButton ("link") to truncate its text with an ellipsis and provide a tooltip
 */
function SolaceTruncatableLink({ id, text, onClick, dataQa, href }: SolaceTruncatableLinkProps) {
	return (
		<>
			{(href || onClick) && (
				<SolaceButtonWrapper key={`${id}-link`} data-qa={`${id}-link`}>
					<SolaceButton
						variant={"link"}
						href={!onClick && href ? href : undefined}
						onClick={!href && onClick ? onClick : undefined}
						dense={true}
						dataQa={dataQa}
					>
						<SolaceTooltip variant="overflow" title={text} maxWidth="medium" placement="bottom-end">
							{text}
						</SolaceTooltip>
					</SolaceButton>
				</SolaceButtonWrapper>
			)}
			{!onClick && !href && (
				<TextWrapper key={`${id}-text`} data-qa={`${id}-text`} className="textWrapper">
					<SolaceTooltip variant="overflow" title={text} maxWidth="medium" placement="bottom-end">
						{text}
					</SolaceTooltip>
				</TextWrapper>
			)}
		</>
	);
}

export default SolaceTruncatableLink;
