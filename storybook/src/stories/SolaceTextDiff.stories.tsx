import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceConfirmationDialog, SolaceTextDiff } from "@SolaceDev/maas-react-components";

export default {
	title: "Under Construction/SolaceTextDiff",
	component: SolaceTextDiff,
	parameters: {}
} as ComponentMeta<typeof SolaceTextDiff>;

const Template: ComponentStory<typeof SolaceTextDiff> = (args) => <SolaceTextDiff {...args} />;

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

// Ensure that the numbers don't overflow outside of the container
export const DefaultSolaceTextDiffInDialog = ({ text1, text2 }): JSX.Element => {
	return (
		<SolaceConfirmationDialog
			title="Small container for text diff"
			isOpen={true}
			actions={[
				{
					label: "Submit",
					onClick: () => {
						console.log("Do nothing to appease linter");
					},
					isDisabled: true
				}
			]}
		>
			<SolaceTextDiff text1={text1} text2={text2} />
		</SolaceConfirmationDialog>
	);
};
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
