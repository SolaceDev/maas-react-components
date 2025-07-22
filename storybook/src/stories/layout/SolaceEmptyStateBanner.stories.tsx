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
import EmptyBannerImage from "../../resources/images/EmptyBannerImage";

(SolaceEmptyStateBanner as React.FC & { displayName?: string }).displayName = "SolaceEmptyStateBanner";

const meta: Meta<typeof SolaceEmptyStateBanner> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/configure/#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "Layout/Empty State/Learning",
	component: SolaceEmptyStateBanner
};

export default meta;

type Story = StoryObj<typeof SolaceEmptyStateBanner>;

export const EmptyBanner: Story = {
	args: {
		bannerImage: <EmptyBannerImage />,
		subtitle: "Get started with integration",
		title: "Bring your data into the event mesh",
		description:
			"In this sample, Acme Inc. enterprise is taking their next step in optimizing their operations by using Event Portal to discover, audit, catalog, extend, and govern their event-driven architecture. Code component name: SolaceEmptyStateBanner",
		primaryButton: {
			label: "Check Out Available Connectors",
			onClick: () => alert("Primary button clicked")
		},
		secondaryButton: {
			label: "Explore On My Own",
			onClick: () => alert("Secondary button clicked")
		}
	}
};

export const EmptyBannerWithoutSecondaryButton: Story = {
	args: {
		bannerImage: <EmptyBannerImage />,
		subtitle: "Get started with integration",
		title: "Bring your data into the event mesh",
		description:
			"In this sample, Acme Inc. enterprise is taking their next step in optimizing their operations by using Event Portal to discover, audit, catalog, extend, and govern their event-driven architecture. Code component name: SolaceEmptyStateBanner",
		primaryButton: {
			label: "Check Out Available Connectors",
			onClick: () => alert("Primary button clicked")
		}
	}
};
