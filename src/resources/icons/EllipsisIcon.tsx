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

import { useTheme } from "@mui/material";

export const EllipsisIcon = ({ fill = "" }): JSX.Element => {
	const defaultFill = useTheme().palette.ux?.secondary.wMain;
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="8" viewBox="0 0 24 8" fill="none">
			<circle cx="6" cy="4" r="2" fill={fill || defaultFill} />
			<circle cx="12" cy="4" r="2" fill={fill || defaultFill} />
			<circle cx="18" cy="4" r="2" fill={fill || defaultFill} />
		</svg>
	);
};
