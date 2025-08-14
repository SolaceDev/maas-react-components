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
	parameters: {
		controls: { sort: "alpha" },
		docs: {
			description: {
				component: "Code component name: SolacePicker"
			}
		}
	},
	argTypes: {
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
