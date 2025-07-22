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

import { Grid, useTheme } from "@mui/material";
import { SolaceGridProps } from "../../types/solaceGrid";

/**
 * All of the supported props related to SolaceGrid can be found at https://mui.com/api/grid/
 * Examples on how to use this components can be found at https://mui.com/components/grid/
 * All props provided by mui have been extended, to provide more flexibility for developers while using these layout components.
 */
export default function SolaceGrid(props: SolaceGridProps) {
	const { children, container, ...rest } = props;
	let { spacing } = rest;

	if (container && !spacing) {
		// defaulting the spacing to 16px if nothing is provided.
		spacing = 2;
	}

	const theme = useTheme();
	return (
		<Grid container={container} spacing={spacing} color={theme.palette.ux.primary.text.wMain} {...rest}>
			{children}
		</Grid>
	);
}
