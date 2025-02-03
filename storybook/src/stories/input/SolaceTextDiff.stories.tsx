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
