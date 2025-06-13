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

import { SolaceFileUploader } from "@SolaceDev/maas-react-components";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SolaceFileUploader> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/configure/#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "Input/File Uploader",
	component: SolaceFileUploader,
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceFileUploader"
			}
		}
	}
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
		onFileChange: (files: File[]) => {
			window.alert(`Files changed: ${files.length}`);
		},
		fileNames: ["file1.txt", "file2.txt"]
	}
};

export const MaxSize: Story = {
	args: {
		maxSize: 250000
	}
};

export const PDFOnly: Story = {
	args: {
		accept: {
			"application/pdf": [".pdf"]
		}
	}
};
