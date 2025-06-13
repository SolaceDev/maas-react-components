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

export type Globals = "-moz-initial" | "inherit" | "initial" | "revert" | "unset";
export type SpacingValues = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type SX = {
	marginTop?: SpacingValues;
	marginBottom?: SpacingValues;
	margin?: SpacingValues;
	marginLeft?: SpacingValues;
	marginRight?: SpacingValues;

	paddingTop?: SpacingValues;
	paddingBottom?: SpacingValues;
	padding?: SpacingValues;
	paddingLeft?: SpacingValues;
	paddingRight?: SpacingValues;

	width?:
		| Globals
		| string
		| "-moz-fit-content"
		| "-moz-max-content"
		| "-moz-min-content"
		| "-webkit-fit-content"
		| "-webkit-max-content"
		| "auto"
		| "fit-content"
		| "intrinsic"
		| "max-content"
		| "min-content"
		| "min-intrinsic";
	height?:
		| Globals
		| string
		| "-moz-max-content"
		| "-moz-min-content"
		| "-webkit-fit-content"
		| "auto"
		| "fit-content"
		| "max-content"
		| "min-content";
};
