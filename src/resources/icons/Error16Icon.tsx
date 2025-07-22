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

import { IconProps } from "./IconProps";
import { SvgIcon } from "@mui/material";
import { useTheme } from "@mui/material";

export function Error16Icon({ size, fill }: IconProps): JSX.Element {
	const theme = useTheme();

	return (
		<SvgIcon
			sx={{ width: `${size}px`, height: `${size}px`, background: theme.palette.ux.background.w10 }}
			viewBox="0 0 16 16"
		>
			<g clipPath="url(#clip0_3499_35806)">
				<path
					d="M10 5.013L8 7.013L6 5.013C5.8901 4.9031 5.713 4.9031 5.6031 5.013L5.013 5.6038C4.9031 5.7137 4.9031 5.8908 5.013 6.0007L7.013 8L5.013 10C4.9031 10.1099 4.9031 10.287 5.013 10.3969L5.6031 10.987C5.713 11.0969 5.8901 11.0969 6 10.987L8 8.987L10 10.987C10.1099 11.0969 10.287 11.0969 10.3969 10.987L10.987 10.3969C11.0969 10.287 11.0969 10.1099 10.987 10L8.987 8L10.987 6C11.0969 5.8901 11.0969 5.713 10.987 5.6031L10.3969 5.013C10.287 4.9038 10.1092 4.9038 10 5.013ZM8 1C4.15 1 1 4.15 1 8C1 11.85 4.15 15 8 15C11.85 15 15 11.85 15 8C15 4.15 11.85 1 8 1ZM8 2.4C11.08 2.4 13.6 4.92 13.6 8C13.6 11.08 11.08 13.6 8 13.6C4.92 13.6 2.4 11.08 2.4 8C2.4 4.92 4.92 2.4 8 2.4Z"
					fill={fill}
				/>
			</g>
			<defs>
				<clipPath id="clip0_3499_35806">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</SvgIcon>
	);
}
