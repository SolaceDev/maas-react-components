import type { Meta, StoryObj } from "@storybook/react";
import { SolaceEmptyStateBanner } from "@SolaceDev/maas-react-components";
import React from "react";
import EmptyBannerImage from "../resources/images/EmptyBannerImage";

(SolaceEmptyStateBanner as React.FC & { displayName?: string }).displayName = "SolaceEmptyStateBanner";

const meta: Meta<typeof SolaceEmptyStateBanner> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/configure/#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "Components/SolaceEmptyStateBanner",
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
			"In this sample, Acme Inc. enterprise is taking their next step in optimizing their operations by using Event Portal to discover, audit, catalog, extend, and govern their event-driven architecture.",
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
