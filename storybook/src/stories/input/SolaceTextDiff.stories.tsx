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

import React from "react";
import { Meta } from "@storybook/react";
import { SolaceConfirmationDialog, SolaceTextDiff } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

(SolaceTextDiff as React.FC & { displayName?: string }).displayName = "SolaceTextDiff";

export default {
	title: "Input/Code/Diff",
	component: SolaceTextDiff,
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceTextDiff"
			}
		}
	}
} as Meta<typeof SolaceTextDiff>;

export const DefaultSolaceTextDiff = {
	args: {
		text1: `{
            "subscriptions": ["match"]
        }`,
		text2: `{
            "subscriptions": [
                "partial/match"
            ]
        }`
	}
};

export const DefaultSolaceTextDiffInDialog = {
	render: ({ text1, text2 }): JSX.Element => {
		return (
			<SolaceConfirmationDialog
				title="Small container for text diff"
				isOpen={true}
				actions={[
					{
						label: "Submit",
						onClick: action("Do nothing to appease linter"),
						isDisabled: true
					}
				]}
			>
				<SolaceTextDiff text1={text1} text2={text2} />
			</SolaceConfirmationDialog>
		);
	},

	args: {
		text1: `{
            "subscriptions": ["match"]
        }`,
		text2: `{
            "subscriptions": [
                "partial/match",
                "somethingVeryLongSomethingVeryLongSomethingVeryLongSomethingVeryLongSomethingVeryLongSomethingVeryLongSomethingVeryLongSomethingVeryLongSomethingVeryLong",
                "partial/match",
                "partial/match",
                "partial/match",
                "partial/match",
                "partial/match",
                "partial/match",
                "partial/match",
                "partial/match",
                "partial/match",
                "partial/match"
            ]
        }`
	}
};
