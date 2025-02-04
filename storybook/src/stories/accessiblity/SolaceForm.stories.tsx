import React from "react";
import { Decorator, Meta } from "@storybook/react";
import SolaceTestForm from "./SolaceTestForm";

const withSnapshotContainer: Decorator = (Story) => {
	return (
		<div id="snapshot" style={{ height: "100vh", padding: "0px", margin: "0px" }}>
			<Story />
		</div>
	);
};

export default {
	title: "Accessibility/Form",
	component: SolaceTestForm,
	decorators: [withSnapshotContainer],
	argTypes: {}
} as Meta;

const FormTemplate: Story = (args) => <SolaceTestForm {...args} />;

export const AccessibleForm = FormTemplate.bind({});
