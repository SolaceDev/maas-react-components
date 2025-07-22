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

import { Meta } from "@storybook/react";
import { SolaceFeatureTag } from "@SolaceDev/maas-react-components";

(SolaceFeatureTag as React.FC & { displayName?: string }).displayName = "SolaceFeatureTag";

export default {
	title: "Data Display/Badge/Feature",
	component: SolaceFeatureTag,
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceFeatureTag"
			}
		}
	},
	argTypes: {
		text: { control: { type: "text" } },
		active: { control: { type: "boolean" } }
	}
} as Meta<typeof SolaceFeatureTag>;

export const DefaultReleaseTag = {
	args: {
		text: "beta",
		active: false
	}
};
