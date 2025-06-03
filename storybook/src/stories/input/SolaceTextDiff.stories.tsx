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
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Unique identifier for the text diff component. Used for accessibility and programmatic access.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		hasWarnings: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the text diff in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the text differences.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
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
