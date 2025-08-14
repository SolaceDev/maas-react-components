/* eslint-disable sonarjs/no-duplicate-string */
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
import type { Meta, StoryObj } from "@storybook/react";
import { SolaceEmptyStateBanner } from "@SolaceDev/maas-react-components";
import React from "react";

(SolaceEmptyStateBanner as React.FC & { displayName?: string }).displayName = "SolaceEmptyStateBanner";

const meta: Meta<typeof SolaceEmptyStateBanner> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/configure/#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "Layout/Empty State/Learning",
	component: SolaceEmptyStateBanner,
	args: {},
	parameters: {},
	argTypes: {
		bannerImage: {
			control: { type: "object" },
			description:
				"React element representing the banner image or illustration. Use this to provide visual context for the empty state. Should be an SVG or optimized image component.",
			table: {
				type: { summary: "React.ReactElement | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		title: {
			control: { type: "text" },
			description:
				"The main heading text for the empty state banner. Use this to clearly communicate what the user can do or what they're missing. Should be concise and action-oriented.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		subtitle: {
			control: { type: "text" },
			description:
				"Secondary heading text that provides additional context. Use this to give more specific information about the empty state or the next steps the user should take.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		description: {
			control: { type: "text" },
			description:
				"Detailed description text explaining the empty state and providing guidance. Use this to give users comprehensive information about why they're seeing this state and what they can do about it.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		primaryButton: {
			control: { type: "object" },
			description:
				"Configuration object for the primary action button. Should include 'label' (string) and 'onClick' (function) properties. Use this for the main action you want users to take.",
			table: {
				type: { summary: "{label: string, onClick: () => void} | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		secondaryButton: {
			control: { type: "object" },
			description:
				"Configuration object for the secondary action button. Should include 'label' (string) and 'onClick' (function) properties. Use this for alternative actions or exploration options.",
			table: {
				type: { summary: "{label: string, onClick: () => void} | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description:
				"Data attribute for QA testing. Use this to identify the empty state banner during automated testing.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof SolaceEmptyStateBanner>;

export const EmptyBanner: Story = {
	args: {}
};
