import React from "react";
import { Stack } from "@mui/material";
import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
	SolaceConfirmationDialog,
	SolaceSelect,
	SolaceTextField,
	MenuItem,
	styled
} from "@SolaceDev/maas-react-components";
import { DefaultTable } from "../table/SolaceTable.stories";

export default {
	title: "Dialogs/SolaceConfirmationDialog",
	component: SolaceConfirmationDialog,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/UI-Library%3A-Patterns?node-id=1%3A3"
		}
	},
	argTypes: {
		title: {
			control: { type: "text" },
			description: "Title of the dialog"
		},
		isOpen: {
			control: { type: "boolean" },
			description: "Open/Close the dialog window"
		},
		maxWidth: {
			options: ["sm", "md", "dialogMd", "lg", "xl"],
			control: { type: "select" },
			description: "Determine the max-width of the dialog.",
			table: {
				defaultValue: {
					summary: "dialogMd"
				}
			}
		},
		contentText: {
			control: { type: "text" },
			description: "Text to be displayed in the dialog content section"
		},
		contentLayout: {
			options: ["block", "contents", "flex"],
			control: { type: "select" },
			description: "To override the display attribute of the dialog content section",
			table: {
				defaultValue: {
					summary: "block"
				}
			}
		}
	}
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

const BUTTON_CLICK_ACTION_CALLBACK = "button-clicked-callback";

export const WithChildrenComponents = (): JSX.Element => (
	<SolaceConfirmationDialog
		title="Children"
		contentText="Some content text sitting above dialog child components (form elements in this case)"
		isOpen={true}
		actions={[{ label: "Ok", onClick: action(BUTTON_CLICK_ACTION_CALLBACK), variant: "outline" }]}
	>
		<Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={2} sx={{ marginTop: "24px" }}>
			<SolaceTextField
				onChange={action("textfield-change-callback")}
				title="Demo Text Field"
				id="demoTextFieldId"
				name="demoTextField"
				label="Some Label"
			/>
			<SolaceSelect
				onChange={action("select-change-callback")}
				title="Demo Select"
				name="demoSelect"
				label="Some Label"
			>
				{SELECT_OPTIONS}
			</SolaceSelect>
		</Stack>
	</SolaceConfirmationDialog>
);

export const WithNoChildren = (): JSX.Element => (
	<SolaceConfirmationDialog
		title="No Children"
		contentText="Some content text sitting above dialog child components (form elements in this case)"
		isOpen={true}
		actions={[{ label: "Ok", onClick: action(BUTTON_CLICK_ACTION_CALLBACK), variant: "outline" }]}
	/>
);

export const WithLinearProgressIndicator = (): JSX.Element => (
	<SolaceConfirmationDialog
		title="Simple Form"
		contentText="Submission in progress"
		isOpen={true}
		linearProgressIndicator={true}
		actions={[{ label: "Submit", onClick: action(BUTTON_CLICK_ACTION_CALLBACK), isDisabled: true }]}
	/>
);

const CustomContentWrapper = styled("div")(() => ({
	display: "flex",
	flexDirection: "column",
	overflow: "auto",
	rowGap: 16,
	maxHeight: 450,
	// set box-sizing to border-box so that
	// the 1px border applied to table wrapper will be neglected from width & height
	// this is to simulate the global style applied in maas-ui/ep
	".tableWrapper": {
		boxSizing: "border-box"
	}
}));

const TableWrapper = (props) => {
	return <CustomContentWrapper>{props.children}</CustomContentWrapper>;
};

export const TableAsChildComponent = Template.bind({});
TableAsChildComponent.args = {
	title: "Dialog contains a scrollable table",
	isOpen: true,
	maxWidth: "sm",
	contentLayout: "contents",
	actions: [{ label: "Close", onClick: action(BUTTON_CLICK_ACTION_CALLBACK), variant: "outline" }],
	children: (
		<TableWrapper>
			<DefaultTable {...DefaultTable.args} />
		</TableWrapper>
	)
};
