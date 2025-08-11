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

import { SvgIcon } from "@mui/material";

export const ArrowRightIcon = ({ className = "" }): JSX.Element => {
	return (
		<SvgIcon className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" data-testid="ArrowRightIcon">
			<path
				d="M9.73,6.117L8.892,7c-0.156,0.156-0.156,0.373,0,0.529l4.443,4.46l-4.443,4.481C8.736,16.627,8.723,16.844,8.879,17
	l0.851,0.883c0.156,0.156,0.414,0.156,0.57,0l5.583-5.61c0.156-0.156,0.156-0.41,0-0.567L10.3,6.117
	C10.143,5.961,9.886,5.961,9.73,6.117z"
			/>
		</SvgIcon>
	);
};
