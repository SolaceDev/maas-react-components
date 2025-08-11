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

import { BASE_SIZE_TYPES } from "./sizing";

export enum CHIP_COLORS {
	ROYAL_BLUE = "royalBlue",
	DARK_BLUE = "darkBlue",
	OPAQUE_BLUE = "opaqueBlue",
	infoBlue = "infoBlue",
	infoBgBlue = "infoBgBlue",
	warnYellow = "warnYellow",
	warnBgYellow = "warnBgYellow",
	LIGHT_GREY = "lightGrey",
	SMOKE_GREY = "smokeGrey",
	DARK_GREY = "darkGrey",
	WHITE = "white",
	INFO_LIGHT_BG_BLUE = "infoLightBgBlue",
	ERROR_BG_RED = "errorBgRed",
	SUCCESS_BG_GREEN = "successBgGreen",
	INFO_BLUE_LABEL = "infoLightLabelBlue",
	ERROR_RED_LABEL = "errorLabel",
	SUCCESS_GREEN_LABEL = "successLabel"
}

export enum CHIP_VARIANT {
	FILLED = "filled",
	OUTLINED = "outlined"
}

export const CHIP_PX_HEIGHTS: BASE_SIZE_TYPES = {
	xs: 14,
	sm: 18,
	md: 24,
	lg: 30
};

export const CHIP_PX_BORDER_RADIUS: BASE_SIZE_TYPES = {
	xs: 2,
	sm: 3,
	md: 4,
	lg: 5
};
