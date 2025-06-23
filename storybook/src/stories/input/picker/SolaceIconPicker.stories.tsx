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
		dataQa: ""
	},
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
		hasWarnings: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the icon picker in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the icon selection.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		label: {
			control: {
				type: "text"
			}
		},
		helperText: {
			control: {
				type: "text"
			}
		},
		hasErrors: {
			control: {
				type: "boolean"
			}
		},
		inlineLabel: {
			control: {
				type: "boolean"
			}
		},
		required: {
			control: {
				type: "boolean"
			}
		},
		disabled: {
			control: {
				type: "boolean"
			}
		},
		readOnly: {
			control: {
				type: "boolean"
			}
		},
		value: {
			control: {
				type: "text"
			}
		},
		displayEmpty: {
			control: {
				type: "boolean"
			}
		},
		numOfItemsPerRow: {
			control: {
				type: "number"
			}
		},
		numOfRowsDisplayed: {
			control: {
				type: "number"
			}
		},
		autoFocusItem: {
			control: {
				type: "boolean"
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
