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

const SIZE = 24;

function Container() {
	return <circle className="SolaceRadioContainer" cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 2 - 1}></circle>;
}

export const RestingRadioIcon = (
	<SvgIcon width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
		<Container></Container>
	</SvgIcon>
);

export const SelectedRadioIcon = (
	<SvgIcon width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
		<Container />
		<circle className="SolaceRadioSelection" cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 4}></circle>
	</SvgIcon>
);
