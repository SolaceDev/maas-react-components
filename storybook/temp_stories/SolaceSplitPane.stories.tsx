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

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SolaceSplitPane } from "@SolaceDev/maas-react-components";

export default {
	title: "Layout/SolaceSplitPane",
	component: SolaceSplitPane,
	parameters: {
		docs: {
			description: {
				component: "List component used for rendering collections of data based on a specified 'grid' layout"
			}
		}
	},
	argTypes: {
		minSize: {
			control: { type: "number" },
			description:
				"the smallest size the left side pane can be (numeric value specified is the number of pixels from the left side of the parent container). Default value is 0 (collapse all the way to the left)",
			table: {
				defaultValue: {
					summary: 0
				}
			}
		},
		maxSize: {
			control: { type: "number" },
			description:
				"the largest size the left side pane can be (specified as a negative value will measure that many pixels from the right side of the parent container). Default value is -8 (collapse all the way to the right and account for the 8px wide divider)",
			table: {
				defaultValue: {
					summary: -8
				}
			}
		},
		defaultSize: {
			control: { type: "text" },
			description:
				"the default placement of the divider ... specify a numeric value (representing number of pixels from the left side of the parent container) or a string percentage. Default value is '50%' (split the parent container in half)",
			table: {
				defaultValue: {
					summary: "50%"
				}
			}
		},
		split: {
			options: ["vertical", "horizontal"],
			control: {
				type: "radio"
			},
			description:
				"Flag for alternating between a vertical or horizontal split of the parent container (divider will run vertical or horizontally across the parent container respectively). Default value is 'vertical' split",
			table: {
				defaultValue: {
					summary: "vertical"
				}
			}
		},
		allowedResize: {
			control: {
				type: "boolean"
			},
			description:
				"Flag for enabling the resizing of the split (i.e. make the left or right side bigger/smaller. Default is true (allowed resizing)",
			table: {
				defaultValue: {
					summary: true
				}
			}
		},
		onDragFinished: {
			description: "Callback function to indicate the new 'size' (in pixels) following a resizing of the divider"
		},
		children: {
			description:
				"an array of components to be rendered in the panels... first item in the array will be displayed in the left panel, second item will be displayed in the right panel"
		}
	}
} as ComponentMeta<typeof SolaceSplitPane>;

const Template: ComponentStory<typeof SolaceSplitPane> = (args) => <SolaceSplitPane {...args} />;

const content = [
	<div key="leftDiv">
		This is a pragraph in a Pane with really long text. This is a pragraph in a Pane with really long text. This is a
		pragraph in a Pane with really long text. This is a pragraph in a Pane with really long text. This is a pragraph in
		a Pane with really long text. This is a pragraph in a Pane with really long text. This is a pragraph in a Pane with
		really long text. This is a pragraph in a Pane with really long text. This is a pragraph in a Pane with really long
		text. This is a pragraph in a Pane with really long text.
	</div>,
	<div key="rightDiv">This is another pragraph</div>
];

const wideContent = [
	<div key="leftDiv" style={{ minWidth: "1000px" }}>
		<p>This containing div is 1000px wide...</p>
		<p>
			This is a pragraph in a Pane with really long text. This is a pragraph in a Pane with really long text. This is a
			pragraph in a Pane with really long text. This is a pragraph in a Pane with really long text. This is a pragraph
			in a Pane with really long text. This is a pragraph in a Pane with really long text. This is a pragraph in a Pane
			with really long text. This is a pragraph in a Pane with really long text. This is a pragraph in a Pane with
			really long text. This is a pragraph in a Pane with really long text.
		</p>
	</div>,
	<div key="rightDiv">This is another pragraph</div>
];

export const DefaultSplitPane = Template.bind({});
DefaultSplitPane.args = {
	children: content,
	onDragFinished: action("resized")
};

export const MinMaxDefaultSplitPane = Template.bind({});
MinMaxDefaultSplitPane.args = {
	minSize: 100,
	maxSize: -200,
	defaultSize: 300,
	children: [
		<div key="leftDiv">
			This left side pane has a min size of 100px (achieved by setting minSize to 100) and a default size of 300px
			(achieved by setting defaultSize to 300)
		</div>,
		<div key="rightDiv">This right side pane has a min size of 200px (achieved by setting maxSize -200)</div>
	]
};

export const HorizontalSplitPane = Template.bind({});
HorizontalSplitPane.args = {
	split: "horizontal",
	children: content
};

export const WithScrollbars = Template.bind({});
WithScrollbars.args = {
	defaultSize: 300,
	children: wideContent
};

export const NoResizeSplitPane = Template.bind({});
NoResizeSplitPane.args = {
	allowedResize: false,
	defaultSize: 300,
	children: content
};
