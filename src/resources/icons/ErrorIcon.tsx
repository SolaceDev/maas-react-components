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

export function ErrorIcon({ size, fill }: IconProps): JSX.Element {
	return (
		<SvgIcon sx={{ width: `${size}px`, height: `${size}px` }} viewBox="0 0 24 24">
			<path
				d="M11.208 14.784C11.2827 14.8587 11.3733 14.896 11.48 14.896H12.776C12.8933 14.896 12.984 14.8587 13.048 14.784C13.1227 14.7093 13.16 14.6187 13.16 14.512V7.184C13.16 7.06667 13.1227 6.976 13.048 6.912C12.984 6.83733 12.8933 6.8 12.776 6.8H11.48C11.3733 6.8 11.2827 6.83733 11.208 6.912C11.1333 6.98667 11.096 7.07733 11.096 7.184V14.512C11.096 14.6187 11.1333 14.7093 11.208 14.784Z"
				fill={fill}
			/>
			<path
				d="M11.112 17.888C11.1867 17.9627 11.2773 18 11.384 18H12.872C12.9893 18 13.0853 17.9627 13.16 17.888C13.2347 17.8133 13.272 17.7227 13.272 17.616V16.128C13.272 16.0107 13.2347 15.9147 13.16 15.84C13.0853 15.7653 12.9893 15.728 12.872 15.728H11.384C11.2773 15.728 11.1867 15.7653 11.112 15.84C11.0373 15.9147 11 16.0107 11 16.128V17.616C11 17.7227 11.0373 17.8133 11.112 17.888Z"
				fill={fill}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"
				fill={fill}
			/>
		</SvgIcon>
	);
}
