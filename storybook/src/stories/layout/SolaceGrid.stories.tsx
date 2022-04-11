// SolaceGrid.stories.tsx

import React from "react";

import { ComponentStory } from "@storybook/react";

import { Link, Paper, SolaceGrid, Typography } from "@SolaceDev/maas-react-components";

import { Meta } from "@storybook/react";

import { Title, Primary, ArgsTable, Stories, PRIMARY_STORY } from "@storybook/addon-docs";
export default {
	title: "Layout/SolaceGrid",
	component: SolaceGrid,
	argTypes: {
		spacing: {
			control: { type: "range", min: 1, max: 10, step: 1 },
			description:
				"Defines the space between the type item components. It can only be used on a type container component.",
			table: {
				defaultValue: {
					summary: 2
				},
				type: { summary: "Array<number| string>| number| object|string" }
			}
		},
		container: {
			control: { type: "boolean" },
			description:
				"If true, the component will have the flex container behavior. You should be wrapping items with a container.",
			table: {
				defaultValue: {
					summary: false
				},
				type: {
					summary: "bool"
				}
			}
		},
		item: {
			control: { type: "boolean" },
			description:
				"If true, the component will have the flex item behavior. You should be wrapping items with a container.",
			table: {
				defaultValue: {
					summary: false
				},
				type: {
					summary: "bool"
				}
			}
		},
		columns: {
			control: { type: "text" },
			description: "The number of columns",
			table: {
				defaultValue: {
					summary: 12
				},
				type: {
					summary: "Array<number>| number| object"
				}
			}
		},
		direction: {
			options: ["column-reverse", "column", "row-reverse", "row"],
			control: { type: "select" },
			table: {
				defaultValue: {
					summary: "row"
				},
				type: {
					summary:
						"'column-reverse'| 'column'| 'row-reverse'| 'row'| Array<'column-reverse'| 'column'| 'row-reverse'| 'row'>| object"
				}
			},
			description: "Defines the flex-direction style property. It is applied for all screen sizes."
		},
		sx: { control: { type: "object" } }
	},
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Typography sx={{ marginBottom: 2 }}>
						For detailed documentation and more examples please refer to {""}
						{<Link href="https://mui.com/components/grid/">https://mui.com/components/grid/</Link>}. Default spacing is
						set to 16px
					</Typography>
					<Typography sx={{ marginBottom: 2 }}>Component to handle 2 dimensional layouts</Typography>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
					<Stories />
				</>
			)
		}
	}
} as Meta;
const Template: ComponentStory<typeof SolaceGrid> = (args) => <SolaceGrid container {...args} />;

const defaultStyle = { backgroundColor: "lightgrey", padding: 1, textAlign: "center" };
const defaultContent = (
	<>
		<SolaceGrid item xs>
			<Paper sx={defaultStyle}>xs</Paper>
		</SolaceGrid>
		<SolaceGrid item xs={6}>
			<Paper sx={defaultStyle}>xs=6</Paper>
		</SolaceGrid>
		<SolaceGrid item xs>
			<Paper sx={defaultStyle}>xs</Paper>
		</SolaceGrid>
	</>
);

export const AutoLayoutGrid = Template.bind({});
AutoLayoutGrid.args = {
	children: defaultContent
};
