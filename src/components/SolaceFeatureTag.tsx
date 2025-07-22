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

const FeatureTag = styled("span")(
	({ theme }) => `
	border: 2px solid ${theme.palette.ux.secondary.text.w50};
	border-radius: ${theme.spacing(0.5)};
	box-sizing: border-box;
	color: ${theme.palette.ux.secondary.text.w50};
	font-size: 10px;
	font-weight: 500;
	line-height: 10px;
	padding: ${theme.spacing(0.25, 1)};
	text-transform: uppercase;
	&.active {
		border-color: ${theme.palette.ux.primary.wMain};
		color: ${theme.palette.ux.primary.wMain};
	}`
);

export interface SolaceFeatureTagProps extends SolaceComponentProps {
	/**
	 * The feature's text (e.g. "BETA")
	 */
	text: string;
	/**
	 * When true, use the branding color
	 */
	active?: boolean;
}

export default function SolaceFeatureTag({ text, active, dataQa, dataTags }: SolaceFeatureTagProps): JSX.Element {
	return (
		<FeatureTag data-qa={dataQa} data-tags={dataTags} className={active ? "active" : ""}>
			{text}
		</FeatureTag>
	);
}
