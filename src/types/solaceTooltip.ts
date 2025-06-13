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

const text = "text";
const overflow = "overflow";
const rich = "rich";
/** @deprecated - as of Nov 12, 2024 the 'html variant is being deprecated in favour of using the rich variant**/
const html = "html";

export const TooltipVariant = {
	text: text,
	overflow: overflow,
	rich: rich,
	/** @deprecated [Nov 2024] the "html" variant for SolaceTooltip has been deprecated, please use rich variant instead */
	html: html
};

export type TooltipVariantTypes = (typeof TooltipVariant)[keyof typeof TooltipVariant];
