import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Meta, Decorator, StoryFn } from "@storybook/react";
import {
	FIELD_TYPES,
	SolacePicker,
	SolacePickerChangeEvent,
	SolacePickerIconWrapper,
	SolaceSearchAndFilter,
	SolaceTextFieldChangeEvent,
	SolaceToggleButtonGroup,
	SolaceTooltip,
	styled
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
import { within } from "@storybook/testing-library";
import { userEvent } from "@storybook/testing-library";

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
	title: "Input/Picker/Icon/ContentControl",
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
	Object.entries(iconMap).forEach(([key, value]) => {
		const index = Math.floor(Math.random() * colors.length);
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
					{React.cloneElement(value.icon, { fill: colors[index] })}
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

const ContentControlPanelWrapper = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "stretch",
	rowGap: theme.spacing(1),
	".MuiToggleButtonGroup-root": {
		".MuiToggleButtonGroup-grouped": {
			flex: 1
		}
	}
}));

interface CustomContentControlPanelProps {
	searchText: string;
	setSearchText: React.Dispatch<React.SetStateAction<string>>;
	onSearchTextBlur: () => void;
	onSearchTextFocus: () => void;
	activeTab: string;
	setActiveTab: React.Dispatch<React.SetStateAction<string>>;
	toggleGroupOptions: { value: string; label: string }[];
	hideToggle?: boolean;
}

function CustomContentControlPanel({
	searchText,
	setSearchText,
	onSearchTextBlur,
	onSearchTextFocus,
	activeTab,
	setActiveTab,
	toggleGroupOptions,
	hideToggle
}: CustomContentControlPanelProps) {
	const handleSearchTextChange = (event: SolaceTextFieldChangeEvent) => {
		setSearchText(event.value);
	};

	const handleTabChange = (_event: React.MouseEvent<HTMLElement>, value: string) => {
		setActiveTab(value);
	};

	return (
		<ContentControlPanelWrapper>
			{!hideToggle && (
				<SolaceToggleButtonGroup
					options={toggleGroupOptions}
					activeValue={activeTab}
					onChange={handleTabChange}
				></SolaceToggleButtonGroup>
			)}
			<SolaceSearchAndFilter
				name="iconSearchAndFilter"
				value={searchText}
				onChange={handleSearchTextChange}
				type={FIELD_TYPES.SEARCH}
				onFocus={onSearchTextFocus}
				onBlur={onSearchTextBlur}
			/>
		</ContentControlPanelWrapper>
	);
}

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
}

const ContentControlTemplate: StoryFn<ExtendedSolacePickerProps> = (args) => {
	const { icons, iconLabelMap, hideToggle, ...rest } = args;
	const [selectedOption, setSelectedOption] = useState<string>("DEPLOYED_CODE");
	const [searchText, setSearchText] = useState("");
	const [activeTab, setActiveTab] = useState("icon");
	const toggleGroupOptions = [
		{ value: "icon", label: "Icons" },
		{ value: "logo", label: "Logos" }
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
				<CustomContentControlPanel
					searchText={searchText}
					setSearchText={setSearchText}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					toggleGroupOptions={toggleGroupOptions}
					hideToggle={hideToggle}
					onSearchTextBlur={() => setAutoFocusItem(true)}
					onSearchTextFocus={() => setAutoFocusItem(false)}
				/>
			}
		/>
	);
};

export const ToggleAndSearch = {
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

export const ToggleAndSearchAndMaxHeight = {
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

export const SearchAndMaxHeight = {
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
