import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SolaceTree from "../../../../src/components/SolaceTree";
import { Card, Typography } from "@material-ui/core";

export default {
	title: "Under Construction/SolaceTree",
	component: SolaceTree,
	parameters: {},
	argTypes: {}
} as ComponentMeta<typeof SolaceTree>;

const Template: ComponentStory<typeof SolaceTree> = (args) => <SolaceTree {...args} />;

export const DefaultExample = Template.bind({});
DefaultExample.args = {
	components: [
		{
			component: (
				<Card>
					<Typography>
						Hello world! <br />
						asdf
					</Typography>
				</Card>
			),
			treeChildren: [
				<Card>
					<Typography>
						I like trains <br /> asd
					</Typography>
				</Card>,
				<Card>
					<Typography>
						I like pizza <br />
						Next Card <br />
					</Typography>
				</Card>
			]
		},
		{
			component: (
				<Card>
					<Typography>Stuff</Typography>
				</Card>
			),
			treeChildren: [
				<Card>
					<Typography>
						More stuff <br /> Other stuff
					</Typography>
				</Card>
			]
		}
	]
};
