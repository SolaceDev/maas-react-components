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

import { Card, CardActions, CardContent, useTheme } from "@mui/material";
import SolaceCardHeader from "./SolaceCardHeader";
import { SolaceCardProps } from "../types";

/**
 * SolaceCard component
 *
 * A customizable card component for displaying learning resources with optional
 * icon, title, content, custom action elements, and menu.
 */
function SolaceCard({
	cardHeaderProps,
	cardContent,
	cardActions,
	width,
	height,
	minWidth = "250px",
	padding,
	readOnly = false,
	ariaLabel,
	dataQa,
	dataTags,
	onClick
}: SolaceCardProps): JSX.Element {
	const theme = useTheme();

	return (
		<Card
			className={`solaceCard ${readOnly ? "readOnly" : ""}`}
			sx={{
				width,
				height,
				minWidth,
				padding: padding ?? theme.spacing(2)
			}}
			data-qa={dataQa}
			data-tags={dataTags}
			aria-label={ariaLabel}
			role="article"
			onClick={!readOnly ? onClick : undefined}
		>
			{cardHeaderProps && <SolaceCardHeader {...cardHeaderProps} />}

			{cardContent && (
				<CardContent
					sx={{
						"&.MuiCardContent-root:last-child": {
							paddingBottom: theme.spacing(0)
						},
						padding: theme.spacing(0)
					}}
				>
					{cardContent}
				</CardContent>
			)}

			{cardActions && (
				<CardActions
					sx={{
						padding: theme.spacing(0)
					}}
				>
					{cardActions}
				</CardActions>
			)}
		</Card>
	);
}

export default SolaceCard;
