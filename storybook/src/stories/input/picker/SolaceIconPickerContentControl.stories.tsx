import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Meta, Decorator, StoryFn } from "@storybook/react";
import {
	SolaceCategorizedSearch,
	SolacePicker,
	SolacePickerChangeEvent,
	SolacePickerIconWrapper,
	SolaceToggleButtonGroupOptionProps,
	SolaceTooltip
} from "@SolaceDev/maas-react-components";
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
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

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
		iconLabelMap: {},
		hideToggle: false,
		disableLogos: false,
		searchValue: "",
		customEmptyMessage: ""
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
		name: {
			control: { type: "text" },
			description: "Name attribute for the icon picker input. Used for form submission and identification.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		label: {
			control: {
				type: "text"
			},
			description:
				"Label text displayed above or beside the icon picker. Provides context for what the user is selecting.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		value: {
			control: {
				type: "text"
			},
			description: "The currently selected icon value. This is the controlled value of the picker.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		variant: {
			control: { type: "select" },
			options: ["icons", "colors"],
			description: "The type of picker to display. 'icons' shows an icon selection interface.",
			table: {
				type: { summary: "'icons' | 'colors'" },
				defaultValue: { summary: "'icons'" }
			}
		},
		title: {
			control: { type: "text" },
			description: "Title attribute for the picker input. Provides additional context on hover.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		helperText: {
			control: {
				type: "text"
			},
			description:
				"Helper text displayed below the picker. Can be used for instructions, error messages, or additional context.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		hasErrors: {
			control: {
				type: "boolean"
			},
			description: "If true, displays the picker in an error state with red styling to indicate validation issues.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
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
		inlineLabel: {
			control: {
				type: "boolean"
			},
			description:
				"If true, displays the label inline (beside) the picker instead of above it. Useful for compact layouts.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		required: {
			control: {
				type: "boolean"
			},
			description: "If true, marks the picker as required and displays a required indicator (*) in the label.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		disabled: {
			control: {
				type: "boolean"
			},
			description: "If true, disables the picker and prevents user interaction. The picker appears grayed out.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		readOnly: {
			control: {
				type: "boolean"
			},
			description: "If true, makes the picker read-only. Users can see the value but cannot change it.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		displayEmpty: {
			control: {
				type: "boolean"
			},
			description: "If true, allows the picker to display an empty state when no value is selected.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		numOfItemsPerRow: {
			control: {
				type: "number"
			},
			description: "Number of icon items to display per row in the picker dropdown. Controls the grid layout width.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "4" }
			}
		},
		numOfRowsDisplayed: {
			control: {
				type: "number"
			},
			description:
				"Number of rows to display in the picker dropdown before scrolling. Controls the grid layout height.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "3" }
			}
		},
		autoFocusItem: {
			control: {
				type: "boolean"
			},
			description: "If true, automatically focuses the first item when the picker dropdown opens.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		icons: {
			control: { type: "object" },
			description:
				"Object mapping icon keys to React elements. Each key represents an icon option with its corresponding JSX element.",
			table: {
				type: { summary: "{ [key: string]: React.ReactElement }" },
				defaultValue: { summary: "{}" }
			}
		},
		iconKeyOrderedList: {
			control: { type: "object" },
			description:
				"Array of icon keys that defines the display order of icons in the picker. If not provided, icons will be displayed in object key order.",
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
		iconLabelMap: {
			control: { type: "object" },
			description: "Object mapping icon keys to their display labels. Used for search functionality and accessibility.",
			table: {
				type: { summary: "{ [key: string]: string }" },
				defaultValue: { summary: "{}" }
			}
		},
		hideToggle: {
			control: { type: "boolean" },
			description:
				"If true, hides the toggle buttons for switching between icon categories (icons/logos). Shows all items in a single view.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		disableLogos: {
			control: { type: "boolean" },
			description:
				"If true, disables the logos category option in the toggle group. Only icon category will be available.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		searchValue: {
			control: { type: "text" },
			description: "Initial search text value for filtering icons. Use this to pre-populate the search field.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		customEmptyMessage: {
			control: { type: "text" },
			description:
				"Custom message to display when no icons match the search criteria. If not provided, a default 'No Results Found' message is shown.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		onChange: {
			description:
				"Callback function triggered when the icon selection changes. Receives an event object with the selected icon value.",
			table: {
				type: { summary: "(event: SolacePickerChangeEvent) => void" },
				defaultValue: { summary: "undefined" }
			}
		},
		getOptionDisplayValue: {
			description:
				"Function that returns the React element to display for a selected icon value. Used to customize how the selected icon appears in the picker input.",
			table: {
				type: { summary: "(value: string) => React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		contentControlPanel: {
			description:
				"React element for custom content control panel (search, filters, etc.). Typically used for search and category filtering functionality.",
			table: {
				type: { summary: "React.ReactElement" },
				defaultValue: { summary: "undefined" }
			}
		},
		emptyStateMessage: {
			description: "Message to display when no icons are available or match the current filter criteria.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		}
	},
	decorators: [withSnapshotContainer]
} as Meta<typeof SolacePicker>;

interface IconInfo {
	id: string;
	icon: JSX.Element;
	label: string;
}

const iconMap: { [key: string]: IconInfo } = {
	MAINTENANCE: {
		id: "MAINTENANCE",
		icon: <Maintenance24Icon />,
		label: "Maintenance"
	},
	CONSTRUCTION: {
		id: "CONSTRUCTION",
		icon: <Construction24Icon />,
		label: "Construction"
	},
	TOOLKIT: {
		id: "TOOLKIT",
		icon: <Toolkit24Icon />,
		label: "Toolkit"
	},
	TERMINAL: {
		id: "TERMINAL",
		icon: <Terminal24Icon />,
		label: "Terminal"
	},
	BUG: {
		id: "BUG",
		icon: <Bug24Icon />,
		label: "Bug"
	},
	TEST_TUBE: {
		id: "TEST_TUBE",
		icon: <TestTube24Icon />,
		label: "Test Tube"
	},
	NEW_RELEASE: {
		id: "NEW_RELEASE",
		icon: <NewRelease24Icon />,
		label: "New Release"
	},
	CONTENT_SEARCH: {
		id: "CONTENT_SEARCH",
		icon: <ContentSearch24Icon />,
		label: "Content Search"
	},
	BROKER: {
		id: "BROKER",
		icon: <Broker24Icon />,
		label: "Broker"
	},
	ROCKET_LAUNCH: {
		id: "ROCKET_LAUNCH",
		icon: <RocketLaunch24Icon />,
		label: "Rocket Launch"
	},
	VERIFIED: {
		id: "VERIFIED",
		icon: <Verified24Icon />,
		label: "Verified"
	},
	DEPLOYED_CODE: {
		id: "DEPLOYED_CODE",
		icon: <DeployedCode24Icon />,
		label: "Deployed Code"
	},
	ANNOUNCEMENT: {
		id: "ANNOUNCEMENT",
		icon: <Announcement24Icon />,
		label: "Announcement"
	},
	CALENDAR: {
		id: "CALENDAR",
		icon: <Calendar24Icon />,
		label: "Calendar"
	},
	INFRASTRUCTURE: {
		id: "INFRASTRUCTURE",
		icon: <Infrastructure24Icon />,
		label: "Infrastructure"
	},
	PS_CLOUD_LOGO: {
		id: "PS_CLOUD_LOGO",
		icon: <PsCloudLogo24Icon />,
		label: "PS Cloud Logo"
	},
	SOURCE: {
		id: "SOURCE",
		icon: <Source24Icon />,
		label: "Source"
	},
	TARGET: {
		id: "TARGET",
		icon: <Target24Icon />,
		label: "Target"
	},
	TREE: {
		id: "TREE",
		icon: <Tree24Icon />,
		label: "Tree"
	},
	USAGE_REPORT: {
		id: "USAGE_REPORT",
		icon: <UsageReports24Icon />,
		label: "Usage Report"
	},
	USER: {
		id: "USER",
		icon: <User24Icon />,
		label: "User"
	},
	VISIBILITY_HIDE: {
		id: "VISIBILITY_HIDE",
		icon: <VisibilityHide24Icon />,
		label: "Visibility Hide"
	},
	VISIBILITY_SHOW: {
		id: "VISIBILITY_SHOW",
		icon: <VisibilityShow24Icon />,
		label: "Visibility Show"
	},
	NO_SELECTION: {
		id: "NO_SELECTION",
		icon: <NoSelection24Icon />,
		label: "No Selection"
	}
};

const iconKeyOrderedList = ["NO_SELECTION", "DEPLOYED_CODE"].concat(
	Object.keys(iconMap)
		.filter((key) => key !== "NO_SELECTION" && key !== "DEPLOYED_CODE")
		.sort()
);

const iconAndLogoKeyOrderedList = iconKeyOrderedList.concat(iconKeyOrderedList.map((key) => "logo_" + key));

const getIconsWithTooltip = () => {
	const icons = {};
	Object.entries(iconMap).forEach(([key, value]) => {
		icons[key] = (
			<SolaceTooltip key={key} title={value.label}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						width: "24px",
						height: "24px"
					}}
				>
					{value.icon}
				</div>
			</SolaceTooltip>
		);
	});

	return icons;
};

const getLogosWithTooltip = (colors: string[]) => {
	const logos = {};
	Object.entries(iconMap).forEach(([key, value], index) => {
		const colorIndex = index % colors.length;
		logos["logo_" + key] = (
			<SolaceTooltip key={key} title={value.label}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						width: "24px",
						height: "24px"
					}}
				>
					{React.cloneElement(value.icon, { fill: colors[colorIndex] })}
				</div>
			</SolaceTooltip>
		);
	});

	return logos;
};

const getIconLabelMap = () => {
	const iconLabelMap = {};
	Object.entries(iconMap).forEach(([key, value]) => {
		iconLabelMap[key] = value.label;
	});

	return iconLabelMap;
};

const sampleColors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3"];

function performFilterOnIconKey(
	key: string,
	labelMap: { [key: string]: string },
	searchText: string,
	activeTab: string
) {
	const searchLower = searchText.toLowerCase();
	const label = (labelMap?.[key.replace("logo_", "")] ?? "").toLowerCase();

	if (activeTab === "logo") {
		return key.startsWith("logo_") && label.includes(searchLower);
	} else if (activeTab === "icon") {
		return !key.startsWith("logo_") && label.includes(searchLower);
	} else if (activeTab === "") {
		return label.includes(searchLower);
	}

	return false;
}

interface ExtendedSolacePickerProps extends React.ComponentProps<typeof SolacePicker> {
	iconLabelMap: { [key: string]: string };
	hideToggle?: boolean;
	disableLogos?: boolean;
	searchValue?: string;
	customEmptyMessage?: string;
}

const ContentControlTemplate: StoryFn<ExtendedSolacePickerProps> = (args) => {
	const { icons, iconLabelMap, hideToggle, disableLogos, searchValue, customEmptyMessage, ...rest } = args;
	const [selectedOption, setSelectedOption] = useState<string>("DEPLOYED_CODE");
	const [searchText, setSearchText] = useState(searchValue ?? "");
	const [activeTab, setActiveTab] = useState("icon");
	const toggleGroupOptions: SolaceToggleButtonGroupOptionProps[] = [
		{ value: "icon", label: "Icons" },
		{ value: "logo", label: "Logos", disabled: !!disableLogos }
	];
	const [filteredIcons, setFilteredIcons] = useState<{ [x: string]: JSX.Element }>({});
	const [autoFocusItem, setAutoFocusItem] = useState<boolean>(true);

	useEffect(() => {
		if (icons) {
			const filteredResults = Object.entries(icons).reduce((acc, [key, value]) => {
				if (performFilterOnIconKey(key, iconLabelMap, searchText, hideToggle ? "" : activeTab)) {
					acc[key] = value;
				}
				return acc;
			}, {});

			setFilteredIcons(filteredResults);
		} else {
			setFilteredIcons({});
		}
	}, [activeTab, icons, searchText, hideToggle, iconLabelMap]);

	const handleSelectionChange = useCallback((event: SolacePickerChangeEvent) => {
		setSelectedOption(event.value);
	}, []);

	const getOptionDisplayValue = useCallback(
		(value): ReactNode => {
			if (icons?.[value]) {
				return <SolacePickerIconWrapper>{icons[value]}</SolacePickerIconWrapper>;
			}
			return null;
		},
		[icons]
	);

	return (
		<SolacePicker
			{...rest}
			variant="icons"
			name="demoIconPicker"
			value={selectedOption}
			onChange={handleSelectionChange}
			icons={filteredIcons}
			iconKeyOrderedList={iconAndLogoKeyOrderedList}
			getOptionDisplayValue={getOptionDisplayValue}
			autoFocusItem={autoFocusItem}
			contentControlPanel={
				<SolaceCategorizedSearch
					name={"iconSearchAndFilter"}
					searchValue={searchText}
					onSearchValueChange={(event) => setSearchText(event.value)}
					selectedCategoryValue={activeTab}
					onCategoryChange={(_event, value) => setActiveTab(value)}
					categoryOptions={hideToggle ? [] : toggleGroupOptions}
					placeholder="Search by name"
					equalButtonWidth={true}
					onSearchInputFocus={() => setAutoFocusItem(false)}
					onSearchInputBlur={() => setAutoFocusItem(true)}
					searchInputWidth="100%"
					categoryOptionsWidth="100%"
				/>
			}
			emptyStateMessage={customEmptyMessage}
		/>
	);
};

export const FilterContent = {
	render: ContentControlTemplate,
	args: {
		icons: { ...getIconsWithTooltip(), ...getLogosWithTooltip(sampleColors) },
		iconLabelMap: getIconLabelMap(),
		numOfItemsPerRow: 6,
		numOfRowsDisplayed: 5
	},

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

export const FilterContentWithInitalSearchText = {
	render: ContentControlTemplate,
	args: {
		icons: { ...getIconsWithTooltip(), ...getLogosWithTooltip(sampleColors) },
		iconLabelMap: getIconLabelMap(),
		numOfItemsPerRow: 6,
		numOfRowsDisplayed: 5,
		searchValue: "te"
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		const root = within(canvasElement.parentElement);

		await userEvent.click(canvas.getByRole("combobox"));
		await waitFor(() => expect(root.getAllByRole("option")).toHaveLength(5));
	},

	parameters: {
		// Delay snapshot 1 second until all interactions are done
		chromatic: { delay: 1000 }
	}
};

export const FilterContentWithInvalidSearchText = {
	render: ContentControlTemplate,
	args: {
		icons: { ...getIconsWithTooltip(), ...getLogosWithTooltip(sampleColors) },
		iconLabelMap: getIconLabelMap(),
		numOfItemsPerRow: 6,
		numOfRowsDisplayed: 5,
		searchValue: "invalid"
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		const root = within(canvasElement.parentElement);

		await userEvent.click(canvas.getByRole("combobox"));
		await waitFor(() => expect(root.getAllByRole("option")).toHaveLength(2));
		await waitFor(() => expect(root.getByText("No Results Found")).toBeInTheDocument());
	},

	parameters: {
		// Delay snapshot 1 second until all interactions are done
		chromatic: { delay: 1000 }
	}
};

export const FilterContentWithCustomEmptyMessage = {
	render: ContentControlTemplate,
	args: {
		icons: { ...getIconsWithTooltip(), ...getLogosWithTooltip(sampleColors) },
		iconLabelMap: getIconLabelMap(),
		numOfItemsPerRow: 6,
		numOfRowsDisplayed: 5,
		searchValue: "invalid",
		customEmptyMessage: "No items found"
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		const root = within(canvasElement.parentElement);

		await userEvent.click(canvas.getByRole("combobox"));
		await waitFor(() => expect(root.getAllByRole("option")).toHaveLength(2));
		await waitFor(() => expect(root.getByText("No items found")).toBeInTheDocument());
	},

	parameters: {
		// Delay snapshot 1 second until all interactions are done
		chromatic: { delay: 1000 }
	}
};

export const FilterContentAndMaxHeight = {
	render: ContentControlTemplate,
	args: {
		icons: { ...getIconsWithTooltip(), ...getLogosWithTooltip(sampleColors) },
		iconLabelMap: getIconLabelMap(),
		numOfItemsPerRow: 4,
		numOfRowsDisplayed: 5
	},

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

export const SearchContentAndMaxHeight = {
	render: ContentControlTemplate,
	args: {
		icons: { ...getIconsWithTooltip(), ...getLogosWithTooltip(sampleColors) },
		iconLabelMap: getIconLabelMap(),
		numOfItemsPerRow: 6,
		numOfRowsDisplayed: 5,
		hideToggle: true
	},

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
