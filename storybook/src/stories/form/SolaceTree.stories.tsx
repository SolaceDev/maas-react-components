import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceToggle } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import SolaceTree from "../../../../src/components/SolaceTree";
import { Box, Card } from "@material-ui/core";

export default {
	title: "Under Construction/SolaceTree",
	component: SolaceTree,
	parameters: {},
	argTypes: {}
} as ComponentMeta<typeof SolaceToggle>;

const Template: ComponentStory<typeof SolaceTree> = (args) => <SolaceTree {...args} />;

export const DefaultExample = Template.bind({});
DefaultExample.args = {
	components: [
		{
			component: (
				<Card>
					Hello world! <br />
					This is a large card it has a lot of lines
				</Card>
			),
			treeChildren: [
				<Card>
					I like trains <br /> This is a large card it has a lot of lines
				</Card>,
				<Card>
					I like pizza <br />
					Next Card <br />
					Another line</br>
				</Card>
			]
		},
		{
			component: <Card>Stuff</Card>,
			treeChildren: [
				<Card>
					More stuff <br /> Other stuff
				</Card>
			]
		}
	]
};
