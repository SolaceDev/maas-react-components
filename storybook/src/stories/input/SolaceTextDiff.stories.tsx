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
import { SolaceButton, SolaceConfirmationDialog, SolaceTextDiff } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { userEvent, within } from "@storybook/testing-library";

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
	render: function Render({ text1, text2 }) {
		const [isOpen, setIsOpen] = useState(false);
		return (
			<>
				<SolaceButton variant="text" onClick={() => setIsOpen(true)}>
					Click to see the diff in a modal
				</SolaceButton>
				<SolaceConfirmationDialog
					title="Small container for text diff"
					isOpen={isOpen}
					actions={[
						{
							label: "Close",
							onClick: () => setIsOpen(false)
						},
						{
							label: "Submit",
							onClick: action("Do nothing to appease linter"),
							isDisabled: true
						}
					]}
				>
					<SolaceTextDiff text1={text1} text2={text2} />
				</SolaceConfirmationDialog>
			</>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole("button"));
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

export const NoDifferences = {
	args: {
		text1: `{
            "subscriptions": ["match"]
        }`,
		text2: `{
            "subscriptions": ["match"]
        }`
	}
};

export const NoDifferencesWithCustomMessage = {
	args: {
		text1: `{
            "subscriptions": ["match"]
        }`,
		text2: `{
            "subscriptions": ["match"]
        }`,
		noDifferencesText: "There are no differences",
		hideWhenNoDifferences: true
	}
};

export const EmptyInputs = {
	args: {
		text1: ``,
		text2: ``,
		noContentText: "There is no content to compare"
	}
};

export const AdditionsOnly = {
	args: {
		text1: ``,
		text2: `{
            "subscriptions": ["new-addition"]
        }`
	}
};

export const DeletionsOnly = {
	args: {
		text1: `{
            "subscriptions": ["to-be-deleted"]
        }`,
		text2: ``
	}
};
export const LargeInputsWithMultipleDifferences = {
	args: {
		text1: `
{
    "name": "John Doe",
    "age": 30,
    "isStudent": false,
    "courses": [
        {"title": "History", "credits": 3},
        {"title": "Math", "credits": 4}
    ],
    "address": {
        "street": "123 Main St",
        "city": "Anytown"
    }
}
`,
		text2: `
{
    "name": "Jane Doe",
    "age": 32,
    "isStudent": false,
    "courses": [
        {"title": "History", "credits": 3},
        {"title": "Math", "credits": 4}
    ],
    "address": {
        "street": "456 Oak Ave",
        "city": "Newville"
    }
}
`
	}
};
