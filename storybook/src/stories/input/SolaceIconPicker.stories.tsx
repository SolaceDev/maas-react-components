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
	parameters: {
		controls: { sort: "alpha" },
		docs: {
			description: {
				component: "Code component name: SolacePicker"
			}
		}
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
		variant: {
			control: { type: "select" },
			options: ["icons"],
			description: "The type of picker to display. For icon picker, this should always be 'icons'.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "icons" }
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
		icons: {
			control: { type: "object" },
			description: "Object mapping icon keys to icon components. These are the icons that will be displayed in the picker.",
			table: {
				type: { summary: "Record<string, React.ReactElement>" },
				defaultValue: { summary: "{}" }
			}
		},
		iconKeyOrderedList: {
			control: { type: "array" },
			description: "Array of icon keys that determines the order in which icons are displayed in the picker. If not provided, icons will be displayed in the order they appear in the icons object.",
			table: {
				type: { summary: "string[]" },
				defaultValue: { summary: "undefined" }
			}
		},
		onChange: {
			description: "Callback function triggered when icon selection changes. Receives the new selected icon key as parameter.",
			table: {
				type: { summary: "(value: string) => void" },
				defaultValue: { summary: "undefined" }
			}
		},
		label: {
			control: { type: "text" },
			description: "Label text displayed above or beside the icon picker. Provides context for what the user is selecting.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		helperText: {
			control: { type: "text" },
			description: "Helper text displayed below the picker. Can be used for instructions, error messages, or additional context.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		hasErrors: {
			control: { type: "boolean" },
			description: "If true, displays the icon picker in an error state with red styling to indicate validation issues.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		hasWarnings: {
			control: { type: "boolean" },
			description: "If true, displays the icon picker in a warning state with amber styling to indicate potential issues.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		inlineLabel: {
			control: { type: "boolean" },
			description: "If true, displays the label inline (beside) the picker instead of above it. Useful for compact layouts.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		required: {
			control: { type: "boolean" },
			description: "If true, marks the picker as required and displays a required indicator (*) in the label.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		disabled: {
			control: { type: "boolean" },
			description: "If true, disables the picker and prevents user interaction. The picker appears grayed out.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		readOnly: {
			control: { type: "boolean" },
			description: "If true, makes the picker read-only. Users can see the selected icon but cannot change it.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		displayEmpty: {
			control: { type: "boolean" },
			description: "If true, allows the picker to display an empty state when no icon is selected.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		numOfItemsPerRow: {
			control: { type: "number" },
			description: "Controls how many icons are displayed per row in the dropdown. Useful for adjusting the layout based on icon size and available space.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "4" }
			}
		},
		numOfRowsDisplayed: {
			control: { type: "number" },
			description: "Sets the maximum number of rows to display before adding a scrollbar. Used to control the height of the dropdown.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "undefined" }
			}
		},
		autoFocusItem: {
			control: { type: "boolean" },
			description: "If true, automatically focuses on the currently selected icon when the dropdown opens.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify the icon picker during automated testing.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
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
