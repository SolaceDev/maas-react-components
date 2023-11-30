import * as React from "react";
import { Meta } from "@storybook/react";
import { Card, Typography, SolaceTree } from "@SolaceDev/maas-react-components";

export default {
	title: "Under Construction/SolaceTree",
	component: SolaceTree,
	parameters: {},
	argTypes: {}
} as Meta<typeof SolaceTree>;

export const DefaultExample = {
	args: {
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
				children: [
					{
						component: (
							<Card>
								<Typography>
									I like trains <br /> asd
								</Typography>
							</Card>
						),
						children: [
							{
								component: (
									<Card>
										<Typography>
											Whoa recursion! <br />
											recursion yay!
										</Typography>
									</Card>
								)
							},
							{
								component: (
									<Card>
										<Typography>
											Whoa recursion! <br />
											recursion yay!
										</Typography>
									</Card>
								),
								children: [
									{
										component: (
											<Card>
												<Typography>
													dude <br />
													this is so deep
												</Typography>
											</Card>
										)
									}
								]
							},

							{
								component: (
									<Card>
										<Typography>
											More Recursion! <br />
											recursion yay!
										</Typography>
									</Card>
								)
							}
						]
					},
					{
						component: (
							<Card>
								<Typography>
									I like pizza <br />
									Next Card <br />
								</Typography>
							</Card>
						)
					}
				]
			},
			{
				component: (
					<Card>
						<Typography>
							Stuff <br />
							More stuƒƒ
						</Typography>
					</Card>
				),
				children: [
					{
						component: (
							<Card>
								<Typography>
									More stuff <br /> Other stuff
								</Typography>
							</Card>
						)
					}
				]
			}
		]
	}
};

export const BigCards = {
	args: {
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
				children: [
					{
						component: (
							<Card>
								<Typography>
									Hello world!
									<br />
									asdf
									<br />
									dkasjldsa
									<br />
								</Typography>
							</Card>
						)
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
						)
					}
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
				children: [
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
						)
					}
				]
			}
		],
		connectorOffset: 8,
		rowHeight: 11,
		connectorWidth: 2,
		connectorBorderRadius: 4,
		connectorStroke: 0.1,
		connectorColor: "red",
		leftOffset: 3
	}
};
