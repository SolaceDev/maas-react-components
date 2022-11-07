// SolaceTypography.stories.tsx

import React from "react";

import { ComponentStory } from "@storybook/react";

import { Box, Link, SolaceTypography } from "@SolaceDev/maas-react-components";

import { Meta } from "@storybook/react";

import { Title, Primary, ArgsTable, Stories, PRIMARY_STORY } from "@storybook/addon-docs";
export default {
	title: "Typography/SolaceTypography",
	component: SolaceTypography,
	argTypes: {
		variant: {
			options: ["h1", "h2", "h3", "h4", "h5", "body1", "body2"],
			control: { type: "select" },
			table: {
				defaultValue: {
					summary: "body1"
				},
				type: {
					summary: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body1' | 'body2'"
				}
			},
			description: "Set the text-align on the component."
		},
		noWrap: {
			control: { type: "boolean" },
			description:
				"If true, the text will not wrap, but instead will truncate with a text overflow ellipsis.Note that text overflow can only happen with block or inline-block level elements (the element needs to have a width in order to overflow).",
			table: {
				defaultValue: {
					summary: false
				},
				type: {
					summary: "bool"
				}
			}
		},
		paragraph: {
			control: { type: "boolean" },
			description: "If true, the element will be a paragraph element.",
			table: {
				defaultValue: {
					summary: false
				},
				type: {
					summary: "bool"
				}
			}
		},
		gutterBottom: {
			control: { type: "boolean" },
			description: "If true, the text will have a bottom margin.",
			table: {
				defaultValue: {
					summary: false
				},
				type: {
					summary: "bool"
				}
			}
		},
		align: {
			options: ["center", "inherit", "justify", "left", "right"],
			control: { type: "select" },
			table: {
				defaultValue: {
					summary: "inherit"
				},
				type: {
					summary: "'center' | 'inherit' | 'justify' | 'left' | 'right'"
				}
			},
			description: "Set the text-align on the component."
		},
		classes: {
			control: {
				type: "object"
			},
			description: "Override or extend the styles applied to the component. See CSS API in mui for more details."
		},
		sx: { control: { type: "object" } }
	},
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<SolaceTypography sx={{ marginBottom: 2 }}>
						For detailed documentation and more examples please refer to {""}
						{
							<Link href="https://mui.com/material-ui/react-typography/#component">
								https://mui.com/material-ui/react-typography/#component
							</Link>
						}
						. Default variant is set to body1
					</SolaceTypography>
					<SolaceTypography sx={{ marginBottom: 2 }}>
						The SolaceTypography component makes it easy to apply a default set of font weights and sizes in your
						application.
					</SolaceTypography>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
					<Stories />
				</>
			)
		}
	}
} as Meta;
const Template: ComponentStory<typeof SolaceTypography> = (args) => <Box {...args} />;

const defaultContent = (
	<>
		<SolaceTypography variant="h1" gutterBottom>
			h1. Heading
		</SolaceTypography>
		<SolaceTypography variant="h2" gutterBottom>
			h2. Heading
		</SolaceTypography>
		<SolaceTypography variant="h3" gutterBottom>
			h3. Heading
		</SolaceTypography>
		<SolaceTypography variant="h4" gutterBottom>
			h4. Heading
		</SolaceTypography>
		<SolaceTypography variant="h5" gutterBottom>
			h5. Heading
		</SolaceTypography>
		<SolaceTypography variant="body1" gutterBottom>
			body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam
			beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
			quasi quidem quibusdam.
		</SolaceTypography>
		<SolaceTypography variant="body2" gutterBottom>
			body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam
			beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
			quasi quidem quibusdam.
		</SolaceTypography>
	</>
);

export const AllVariants = Template.bind({});
AllVariants.args = {
	children: defaultContent
};
