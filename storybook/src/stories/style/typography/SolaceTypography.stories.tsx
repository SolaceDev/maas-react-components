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
/* eslint-disable sonarjs/no-duplicate-string */
// SolaceTypography.stories.tsx

import React from "react";

import { StoryFn } from "@storybook/react";

import { Box, SolaceTypography } from "@SolaceDev/maas-react-components";

import { Meta } from "@storybook/react";

(SolaceTypography as React.FC & { displayName?: string }).displayName = "SolaceTypography";
(Box as React.FC & { displayName?: string }).displayName = "Box";

export default {
	title: "Style/Typography",
	component: SolaceTypography,
	parameters: {},
	argTypes: {
		variant: {
			options: ["h1", "h2", "h3", "h4", "h5", "body1", "caption"],
			control: { type: "select" },
			table: {
				defaultValue: {
					summary: "body1"
				},
				type: {
					summary: '"h1" | "h2" | "h3" | "h4" | "h5" | "body1" | "caption" | undefined'
				}
			},
			description:
				"Typography variant to use. Uses SolaceVariant type from https://github.com/SolaceDev/maas-react-components/blob/main/src/types/solaceTypography.ts"
		},
		color: {
			options: ["success", "error", "warning", "info"],
			control: { type: "select" },
			table: {
				type: {
					summary: '"success" | "error" | "warning" | "info" | undefined'
				}
			},
			description:
				"Set the text color based on theme mappings. Uses color union type from https://github.com/SolaceDev/maas-react-components/blob/main/src/types/solaceTypography.ts"
		},
		noWrap: {
			control: { type: "boolean" },
			description:
				"If true, the text will not wrap, but instead will truncate with a text overflow ellipsis.Note that text overflow can only happen with block or inline-block level elements (the element needs to have a width in order to overflow).",
			table: {
				defaultValue: {
					summary: "false"
				},
				type: {
					summary: "boolean | undefined"
				}
			}
		},
		paragraph: {
			control: { type: "boolean" },
			description: "If true, the element will be a paragraph element.",
			table: {
				defaultValue: {
					summary: "false"
				},
				type: {
					summary: "boolean | undefined"
				}
			}
		},
		gutterBottom: {
			control: { type: "boolean" },
			description: "If true, the text will have a bottom margin.",
			table: {
				defaultValue: {
					summary: "false"
				},
				type: {
					summary: "boolean | undefined"
				}
			}
		},
		component: {
			control: { type: "text" },
			description: "The component used for the root node. Either a string to use a HTML element or a component.",
			table: {
				type: {
					summary: "React.ElementType | undefined"
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
					summary: '"center" | "inherit" | "justify" | "left" | "right" | undefined'
				}
			},
			description: "Set the text-align on the component."
		},
		classes: {
			control: {
				type: "object"
			},
			description: "Override or extend the styles applied to the component. See CSS API in mui for more details.",
			table: {
				type: {
					summary: "object | undefined"
				}
			}
		},
		sx: {
			control: { type: "object" },
			table: {
				type: {
					summary: "object | undefined"
				}
			}
		},
		variantMapping: {
			control: {
				type: "object"
			},
			table: {
				type: {
					summary:
						"{ h1?: string; h2?: string; h3?: string; h4?: string; h5?: string; body1?: string; caption?: string; } | undefined"
				}
			},
			description:
				"The component maps the variant prop to a range of different HTML element types. For instance, subtitle1 to <h6>. If you wish to change that mapping, you can provide your own. Alternatively, you can use the component prop."
		},
		backgroundColor: {
			control: "color",
			table: {
				type: {
					summary: "string | undefined"
				}
			}
		}
	}
} as Meta;
const Template: StoryFn<typeof SolaceTypography> = (args) => <Box {...args} />;

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
		<SolaceTypography variant="caption" display="block" gutterBottom>
			caption text
		</SolaceTypography>
	</>
);

export const AllVariants = {
	render: Template,

	args: {
		children: defaultContent
	}
};

const coloredContent = (
	<>
		<SolaceTypography color="success" variant="h1" gutterBottom>
			success
		</SolaceTypography>
		<SolaceTypography color="error" variant="h2" gutterBottom>
			error
		</SolaceTypography>
		<SolaceTypography color="info" variant="h3" gutterBottom>
			info
		</SolaceTypography>
		<SolaceTypography color="warning" variant="h4" gutterBottom>
			warning
		</SolaceTypography>
	</>
);

export const CustomColors = {
	render: Template,

	args: {
		children: coloredContent
	}
};
