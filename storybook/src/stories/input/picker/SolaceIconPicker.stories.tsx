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
import React from "react";
import { Meta, Decorator, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/test";
import { SolacePicker } from "@SolaceDev/maas-react-components";
import {
	Maintenance24Icon,
	Construction24Icon,
	Toolkit24Icon,
	Terminal24Icon,
	Bug24Icon,
	TestTube24Icon,
	NewRelease24Icon,
	ContentSearch24Icon,
	Broker24Icon,
	RocketLaunch24Icon,
	Verified24Icon,
	DeployedCode24Icon,
	Announcement24Icon,
	Calendar24Icon,
	Infrastructure24Icon,
	PsCloudLogo24Icon,
	Source24Icon,
	Target24Icon,
	Tree24Icon,
	UsageReports24Icon,
	User24Icon,
	VisibilityHide24Icon,
	VisibilityShow24Icon,
	NoSelection24Icon
} from "@SolaceDev/maas-icons";

(SolacePicker as React.FC & { displayName?: string }).displayName = "SolacePicker";

// Create a decorator to include the dropdown inside the snapshot"
const withSnapshotContainer: Decorator = (Story) => {
	return (
		<div id="snapshot" style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}>
			<div style={{ margin: "16px" }}>
				<Story />
			</div>
		</div>
	);
};

export default {
	title: "Input/Picker/Icon",
	component: SolacePicker,
	args: {
		id: "",
		name: "",
		label: "Icon",
		value: "",
		variant: "icons",
		title: "",
		helperText: "",
		hasErrors: false,
		hasWarnings: false,
		inlineLabel: false,
		required: false,
		disabled: false,
		readOnly: false,
		displayEmpty: false,
		numOfItemsPerRow: 4,
		numOfRowsDisplayed: 3,
		autoFocusItem: false,
		icons: {},
		iconKeyOrderedList: undefined,
		dataQa: "",
		dataTags: "",
		onChange: undefined
	},
	parameters: {
		controls: { sort: "alpha" }
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Unique identifier for the icon picker component. Used for accessibility and programmatic access.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		name: {
			control: { type: "text" },
			description: "Name attribute for the icon picker input. Used for form submission and identification.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		label: {
			control: { type: "text" },
			description: "Label text displayed for the icon picker. Provides context for what the user is selecting.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		value: {
			control: { type: "text" },
			description: "The currently selected icon key. This should match one of the keys in the icons object.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		variant: {
			control: { type: "text" },
			description: "The variant type for the picker component. Set to 'icons' for icon picker functionality.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		title: {
			control: { type: "text" },
			description: "Title attribute for the icon picker, displayed as a tooltip on hover. Use for additional context.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		helperText: {
			control: { type: "text" },
			description: "Additional text displayed below the icon picker to provide guidance or error messages.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		hasErrors: {
			control: { type: "boolean" },
			description:
				"If true, displays the icon picker in an error state with red styling. Use to indicate validation failures.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		hasWarnings: {
			control: { type: "boolean" },
			description:
				"If true, displays the icon picker in a warning state with amber styling. Use to indicate potential issues or cautionary information about the icon selection.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		inlineLabel: {
			control: { type: "boolean" },
			description:
				"If true, displays the label inline with the icon picker instead of above it. Use for compact form layouts.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		required: {
			control: { type: "boolean" },
			description: "If true, marks the icon picker as required for form validation. Displays a required indicator.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		disabled: {
			control: { type: "boolean" },
			description: "If true, disables the icon picker preventing user interaction. The picker appears grayed out.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		readOnly: {
			control: { type: "boolean" },
			description:
				"If true, displays the icon picker in read-only mode. Users can see the selected icon but cannot change it.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		displayEmpty: {
			control: { type: "boolean" },
			description:
				"If true, displays an empty option in the icon picker. Use when you want to allow users to select no icon.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		numOfItemsPerRow: {
			control: { type: "number" },
			description:
				"Number of icons to display per row in the picker dropdown. Use to control the grid layout of icon options.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "4" }
			}
		},
		numOfRowsDisplayed: {
			control: { type: "number" },
			description:
				"Number of rows to display before scrolling in the picker dropdown. Controls the maximum height of the icon grid.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "3" }
			}
		},
		autoFocusItem: {
			control: { type: "boolean" },
			description:
				"If true, automatically focuses the currently selected icon when the picker opens. Improves keyboard navigation.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		icons: {
			control: { type: "object" },
			description:
				"Object mapping icon keys to React icon components. Each key should be a string and each value should be a React element.",
			table: {
				type: { summary: "Record<string, React.ReactElement>" },
				defaultValue: { summary: "{}" }
			}
		},
		iconKeyOrderedList: {
			control: { type: "object" },
			description:
				"Array of icon keys defining the display order of icons in the picker. If not provided, icons will be displayed in object key order.",
			table: {
				type: { summary: "string[]" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify the icon picker during automated testing.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description:
				"Data attribute for additional tagging. Use this for analytics, tracking, or additional metadata related to the icon picker.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		onChange: {
			description:
				"Callback function triggered when icon selection changes. Receives the new selected icon key as parameter. Essential for handling icon picker state."
		}
	},
	decorators: [withSnapshotContainer]
} as Meta<typeof SolacePicker>;

const iconMap = {
	MAINTENANCE: <Maintenance24Icon />,
	CONSTRUCTION: <Construction24Icon />,
	TOOLKIT: <Toolkit24Icon />,
	TERMINAL: <Terminal24Icon />,
	BUG: <Bug24Icon />,
	TEST_TUBE: <TestTube24Icon />,
	NEW_RELEASE: <NewRelease24Icon />,
	CONTENT_SEARCH: <ContentSearch24Icon />,
	BROKER: <Broker24Icon />,
	ROCKET_LAUNCH: <RocketLaunch24Icon />,
	VERIFIED: <Verified24Icon />,
	DEPLOYED_CODE: <DeployedCode24Icon />
};

const longIconMap = {
	...iconMap,
	ANNOUNCEMENT: <Announcement24Icon />,
	CALENDAR: <Calendar24Icon />,
	INFRASTRUCTURE: <Infrastructure24Icon />,
	PS_CLOUD_LOGO: <PsCloudLogo24Icon />,
	SOURCE: <Source24Icon />,
	TARGET: <Target24Icon />,
	TREE: <Tree24Icon />,
	USAGE_REPORT: <UsageReports24Icon />,
	USER: <User24Icon />,
	VISIBILITY_HIDE: <VisibilityHide24Icon />,
	VISIBILITY_SHOW: <VisibilityShow24Icon />,
	NO_SELECTION: <NoSelection24Icon />
};

const iconKeyOrderedList = ["NO_SELECTION", "DEPLOYED_CODE"].concat(
	Object.keys(longIconMap)
		.filter((key) => key !== "NO_SELECTION" && key !== "DEPLOYED_CODE")
		.sort()
);

const Template: StoryFn<typeof SolacePicker> = (args) => {
	return (
		<SolacePicker
			{...args}
			variant="icons"
			name="demoIconPicker"
			value={"DEPLOYED_CODE"}
			onChange={action("callback")}
		/>
	);
};

export const DefaultIconPicker = {
	render: Template,
	args: { icons: iconMap },

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole("combobox"));
	},

	parameters: {
		// Delay snapshot 1 second until all interactions are done
		chromatic: { delay: 1000 }
	}
};

export const NumberOfItemsPerRow = {
	render: Template,
	args: { icons: longIconMap, numOfItemsPerRow: 6 },

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole("combobox"));
	},

	parameters: {
		// Delay snapshot 1 second until all interactions are done
		chromatic: { delay: 1000 }
	}
};

export const OrderedIcons = {
	render: Template,
	args: { icons: longIconMap, iconKeyOrderedList: iconKeyOrderedList, numOfItemsPerRow: 6 },

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole("combobox"));
	},

	parameters: {
		// Delay snapshot 1 second until all interactions are done
		chromatic: { delay: 1000 }
	}
};

export const MaxHeight = {
	render: Template,
	args: { icons: longIconMap, numOfItemsPerRow: 4, numOfRowsDisplayed: 5 },

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole("combobox"));
	},

	parameters: {
		// Delay snapshot 1 second until all interactions are done
		chromatic: { delay: 1000 }
	}
};
