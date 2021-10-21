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
export const BigCards = Template.bind({});
BigCards.args = {
	components: [
		{
			component: (
				<Card>
					<Typography>
						Hello world! <br />
						<br />
						asdf
						<br />
						dkasjldsa
						<br />
					</Typography>
				</Card>
			),
			treeChildren: [
				<Card>
					<Typography>
						Hello world! <br />
						<br />
						asdf
						<br />
						dkasjldsa
						<br />
					</Typography>
				</Card>,
				<Card>
					<Typography>
						Hello world! <br />
						<br />
						asdf
						<br />
						dkasjldsa
						<br />
					</Typography>
				</Card>
			]
		},
		{
			component: (
				<Card>
					<Typography>
						Hello world! <br />
						<br />
						asdf
						<br />
						dkasjldsa
						<br />
					</Typography>
				</Card>
			),
			treeChildren: [
				<Card>
					<Typography>
						Hello world! <br />
						<br />
						asdf
						<br />
						dkasjldsa
						<br />
					</Typography>
				</Card>
			]
		}
	],
	connectorOffset: "5rem",
	rowHeight: "6rem",
	connectorWidth: "1rem",
	connectorBorderRadius: "0.5rem",
	connectorStroke: "2px",
	connectorColor: "red",
	spacing: 1,
	leftOffset: "1rem"
};
