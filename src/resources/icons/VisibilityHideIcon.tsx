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

import { SvgIcon, useTheme } from "@mui/material";

export const VisibilityHideIcon = ({ size = 24, fill = "" }): JSX.Element => {
	const theme = useTheme();
	return (
		<SvgIcon sx={{ width: `${size}px`, height: `${size}px` }} viewBox="0 0 24 24">
			<g clipPath="url(#clip0_3496_34944)">
				<path
					d="M13.224 9.162C9.80697 8.253 6.75497 11.305 7.66397 14.722C8.06297 16.223 9.27797 17.438 10.779 17.837C14.196 18.746 17.248 15.694 16.339 12.277C15.939 10.776 14.725 9.562 13.224 9.162ZM13.224 9.162C9.80697 8.253 6.75497 11.305 7.66397 14.722C8.06297 16.223 9.27797 17.438 10.779 17.837C14.196 18.746 17.248 15.694 16.339 12.277C15.939 10.776 14.725 9.562 13.224 9.162ZM12.001 6C7.41597 6 3.94897 8.608 2.04097 12.428C1.90997 12.69 2.10997 13 2.40197 13H3.77397C3.91497 13 4.04397 12.923 4.11497 12.801C5.83797 9.837 8.47897 8 12.001 8C15.523 8 18.164 9.838 19.888 12.802C19.958 12.923 20.083 13 20.223 13H21.476C21.892 13 22.091 12.689 21.96 12.426C20.052 8.607 16.585 6 12.001 6ZM13.224 9.162C9.80697 8.253 6.75497 11.305 7.66397 14.722C8.06297 16.223 9.27797 17.438 10.779 17.837C14.196 18.746 17.248 15.694 16.339 12.277C15.939 10.776 14.725 9.562 13.224 9.162ZM13.224 9.162C9.80697 8.253 6.75497 11.305 7.66397 14.722C8.06297 16.223 9.27797 17.438 10.779 17.837C14.196 18.746 17.248 15.694 16.339 12.277C15.939 10.776 14.725 9.562 13.224 9.162ZM13.224 9.162C9.80697 8.253 6.75497 11.305 7.66397 14.722C8.06297 16.223 9.27797 17.438 10.779 17.837C14.196 18.746 17.248 15.694 16.339 12.277C15.939 10.776 14.725 9.562 13.224 9.162Z"
					fill={fill || theme.palette.ux.secondary.wMain}
				/>
			</g>
			<defs>
				<clipPath id="clip0_3496_34944">
					<rect width={size} height={size} fill={theme.palette.ux.background.w10} />
				</clipPath>
			</defs>
		</SvgIcon>
	);
};
