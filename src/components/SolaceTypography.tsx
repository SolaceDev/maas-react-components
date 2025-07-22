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

import { Typography, useTheme } from "@mui/material";
import { SolaceTypographyProps } from "../types";

export default function SolaceTypography(props: SolaceTypographyProps) {
	const theme = useTheme();

	const colorMap = {
		info: theme.palette.ux.info.w100,
		error: theme.palette.ux.error.w100,
		warning: theme.palette.ux.warning.w100,
		success: theme.palette.ux.success.w100
	};

	const { variant = "body1", children, color, ...rest } = props;

	return (
		<Typography variant={variant} color={color ? colorMap[`${color}`] : "textPrimary"} {...rest}>
			{children}
		</Typography>
	);
}
