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

export function SuccessIcon({ size, fill }: IconProps): JSX.Element {
	return (
		<SvgIcon sx={{ width: `${size}px`, height: `${size}px` }} viewBox="0 0 24 24">
			<path
				d="M13.6946 2.13962C6.85362 1.01462 1.01462 6.85362 2.13962 13.6946C2.82062 17.8376 6.16262 21.1796 10.3056 21.8606C17.1466 22.9856 22.9856 17.1466 21.8606 10.3056C21.1786 6.16162 17.8376 2.82062 13.6946 2.13962ZM13.5676 19.8496C7.94262 20.9256 3.07362 16.0566 4.14962 10.4316C4.75062 7.28662 7.28662 4.75062 10.4316 4.14962C16.0566 3.07362 20.9256 7.94262 19.8496 13.5676C19.2476 16.7126 16.7126 19.2476 13.5676 19.8496ZM16.0646 8.10462L9.99962 14.1696L7.92162 12.1006C7.76762 11.9466 7.51762 11.9466 7.36362 12.1016L6.51762 12.9476C6.35962 13.1056 6.35962 13.3606 6.51762 13.5186L9.71362 16.8926C9.87162 17.0506 10.1266 17.0506 10.2846 16.8926L17.4756 9.52462C17.6316 9.36862 17.6326 9.11462 17.4766 8.95762L16.6326 8.10762C16.4766 7.94862 16.2216 7.94762 16.0646 8.10462Z"
				fill={fill}
			/>
		</SvgIcon>
	);
}
