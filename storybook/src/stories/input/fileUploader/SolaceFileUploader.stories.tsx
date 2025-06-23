/* eslint-disable sonarjs/no-duplicate-string */
import { SolaceFileUploader } from "@SolaceDev/maas-react-components";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SolaceFileUploader> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/configure/#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "Input/File Uploader",
	component: SolaceFileUploader,
	args: {
		maxFiles: 1,
		maxSize: undefined,
		accept: undefined,
		fileNames: [],
		readOnly: false,
		errorText: "",
		onFileChange: undefined,
		dataQa: "",
		dataTags: ""
	},
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceFileUploader"
			}
		}
	},
	argTypes: {
		maxFiles: {
			control: { type: "number" },
			description:
				"Maximum number of files that can be uploaded. Use this to limit file selection and prevent users from uploading too many files at once.",
			table: {
				type: { summary: "number | undefined" },
				defaultValue: { summary: "1" }
			}
		},
		maxSize: {
			control: { type: "number" },
			description:
				"Maximum file size in bytes. Use this to prevent large file uploads that could impact performance or exceed server limits. For example, 250000 for 250KB limit.",
			table: {
				type: { summary: "number | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		accept: {
			control: { type: "object" },
			description:
				'File type restrictions using MIME types and extensions. Format: {"mime/type": [".ext1", ".ext2"]}. For example, {"application/pdf": [".pdf"]} for PDF only.',
			table: {
				type: { summary: "Record<string, string[]> | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		fileNames: {
			control: { type: "object" },
			description:
				"Array of existing file names to display. Use this to show previously uploaded files or default files in the uploader component.",
			table: {
				type: { summary: "string[] | undefined" },
				defaultValue: { summary: "[]" }
			}
		},
		readOnly: {
			control: { type: "boolean" },
			description:
				"If true, displays the file uploader in read-only mode. Users can see uploaded files but cannot add or remove files. Use this for displaying file information without editing capability.",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		errorText: {
			control: { type: "text" },
			description:
				"Error message to display below the file uploader. Use this to show validation errors, upload failures, or file requirement issues.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		onFileChange: {
			description:
				"Callback function fired when files are added or removed. Receives an array of File objects. Essential for handling file upload state and processing uploaded files.",
			table: {
				type: { summary: "(files: File[]) => void | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify the file uploader during automated testing.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data attribute for additional tagging. Use this for analytics, tracking, or additional metadata.",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
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
