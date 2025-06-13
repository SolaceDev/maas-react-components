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
