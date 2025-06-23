import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { SolaceConfirmationDialog, SolaceTextDiff } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

(SolaceTextDiff as React.FC & { displayName?: string }).displayName = "SolaceTextDiff";

export default {
	title: "Input/Code/Diff",
	component: SolaceTextDiff,
	args: {
		id: "",
		text1: "",
		text2: "",
		hasWarnings: false
	},
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
		text1: {
			control: { type: "text" },
			description:
				"First text to compare against. This will be shown as the 'before' or 'original' text in the diff view.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		text2: {
			control: { type: "text" },
			description:
				"Second text to compare with. This will be shown as the 'after' or 'modified' text in the diff view.",
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

const Template: StoryFn<typeof SolaceTextDiff> = (args) => <SolaceTextDiff {...args} />;

const DialogTemplate: StoryFn<typeof SolaceTextDiff> = (args) => {
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
			<SolaceTextDiff {...args} />
		</SolaceConfirmationDialog>
	);
};

export const DefaultSolaceTextDiff = Template.bind({});
DefaultSolaceTextDiff.args = {
	text1: `{
    "subscriptions": ["match"]
}`,
	text2: `{
    "subscriptions": [
        "partial/match"
    ]
}`
};

export const DefaultSolaceTextDiffInDialog = DialogTemplate.bind({});
DefaultSolaceTextDiffInDialog.args = {
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
};
