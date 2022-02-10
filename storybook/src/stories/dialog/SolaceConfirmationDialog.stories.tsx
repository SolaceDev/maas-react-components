import React from "react";
import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceConfirmationDialog, SolaceSelect, SolaceTextField } from "@solacedev/maas-react-components";
import { MenuItem } from "@material-ui/core";

export default {
	title: "Dialogs/SolaceConfirmationDialog",
	component: SolaceConfirmationDialog,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/UI-Library%3A-Patterns?node-id=1%3A3"
		}
	},
	argTypes: {}
} as ComponentMeta<typeof SolaceConfirmationDialog>;

const SELECT_OPTIONS: Array<React.ReactNode> = [];
SELECT_OPTIONS.push(
	<MenuItem key="option1" value="option1">
		Menu Option #1
	</MenuItem>
);
SELECT_OPTIONS.push(
	<MenuItem key="option2" value="option2">
		Menu Option #2
	</MenuItem>
);
SELECT_OPTIONS.push(
	<MenuItem key="option3" value="option3">
		Menu Option #3
	</MenuItem>
);

const Template: ComponentStory<typeof SolaceConfirmationDialog> = (args) => <SolaceConfirmationDialog {...args} />;

export const DefaultDialog = Template.bind({});
DefaultDialog.args = {
	title: "Test Dialog Title",
	contentText:
		"Placeholder text to showcase a modal dialog with a title, some content text and two action buttons (primary action and secondary secondary)",
	isOpen: true,
	actions: [
		{
			label: "Secondary",
			onClick: action("secondary-callback")
		},
		{
			label: "Primary",
			onClick: action("primary-callback"),
			variant: "outline"
		}
	]
};

export const WithChildrenComponents = (): JSX.Element => (
	<SolaceConfirmationDialog
		title="Children"
		contentText="Some content text sitting above dialog child components (form elements in this case)"
		isOpen={true}
		actions={[{ label: "Ok", onClick: action("button-clicked-callback"), variant: "outline" }]}
	>
		<SolaceTextField
			onChange={action("textfield-change-callback")}
			title="Demo Text Field"
			id="demoTextFieldId"
			name="demoTextField"
			label="Some Label"
		/>
		<SolaceSelect onChange={action("select-change-callback")} title="Demo Select" name="demoSelect" label="Some Label">
			{SELECT_OPTIONS}
		</SolaceSelect>
	</SolaceConfirmationDialog>
);

export const WithNoChildren = (): JSX.Element => (
	<SolaceConfirmationDialog
		title="No Children"
		contentText="Some content text sitting above dialog child components (form elements in this case)"
		isOpen={true}
		actions={[{ label: "Ok", onClick: action("button-clicked-callback"), variant: "outline" }]}
	/>
);
