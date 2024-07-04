import { SolaceFileUploader } from "@SolaceDev/maas-react-components";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SolaceFileUploader> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/configure/#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "Components/SolaceFileUploader",
	component: SolaceFileUploader
};

export default meta;

type Story = StoryObj<typeof SolaceFileUploader>;

export const Simple: Story = {
	args: {}
};

export const MaxThreeFiles: Story = {
	args: {
		maxFiles: 3
	}
};

export const Error: Story = {
	args: {
		errorText: "This is an error message"
	}
};

export const ReadOnlyMode: Story = {
	args: {
		readOnly: true,
		fileNames: ["file1.txt", "file2.txt"]
	}
};

export const EditMode: Story = {
	args: {
		fileNames: ["file1.txt", "file2.txt"]
	}
};
