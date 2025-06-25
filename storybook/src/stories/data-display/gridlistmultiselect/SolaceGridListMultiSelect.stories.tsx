import { Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
	SolaceGridListMultiSelect,
	SolaceTooltip,
	SolaceMenu,
	SelectDropdownIcon,
	SolaceAttributeBadge,
	SolaceButton
} from "@SolaceDev/maas-react-components";
import React, { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import { userEvent, within } from "@storybook/testing-library";

(SolaceGridListMultiSelect as React.FC & { displayName?: string }).displayName = "SolaceGridListMultiSelect";

const LIST_ITEM_DESCRIPTION = "The event mesh for accounting";
const ANOTHER_ENVIRONMENT_NAME = "Environment 2";

export default {
	title: "Data Display/List/Multi-Select",
	component: SolaceGridListMultiSelect,
	parameters: {},
	argTypes: {
		id: {
			control: { type: "text" },
			description:
				"Unique identifier for the GridList MultiSelect component. Used for accessibility and programmatic access to the grid list instance.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		items: {
			control: { type: "object" },
			description:
				"The collection of object data to populate the list with. Each object MUST have an associated id field (or custom identifier field if objectIdentifier is specified).",
			table: {
				type: { summary: "Array<object>" },
				defaultValue: { summary: "[]" }
			}
		},
		headers: {
			control: { type: "object" },
			description:
				"Ordered list of column header names to display at the top of the grid. If not provided, no headers will be shown.",
			table: {
				type: { summary: "string[]" },
				defaultValue: { summary: "[]" }
			}
		},
		highlightedRowId: {
			control: { type: "text" },
			description:
				"The id of the item to be highlighted in the list. Use this for controlled highlight state to show focus or current selection.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		onRowHighlight: {
			control: false,
			description:
				"Callback function triggered when a row is highlighted (clicked). Receives the data object associated with the highlighted row."
		},
		selectedRowIds: {
			control: { type: "object" },
			description:
				"Array of ids for all items currently selected (checkbox selected) in the list. Use this for controlled multi-selection state.",
			table: {
				type: { summary: "string[]" },
				defaultValue: { summary: "[]" }
			}
		},
		onSelection: {
			control: false,
			description:
				"Callback function triggered when row selection changes (checkbox clicked). Receives array of all selected data objects."
		},
		gridTemplate: {
			control: { type: "text" },
			description:
				"CSS grid-template-columns value that defines the layout of each list item and header. Defines the columns with values representing track size and spacing.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description:
				"Identifier assigned to the data-qa attribute to assist with automated testing and element identification.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		rowMapping: {
			control: false,
			description:
				"A callback function that maps an individual object into an ordered array of React elements defining how to render each attribute in the grid columns."
		},
		selectAll: {
			control: { type: "boolean" },
			description:
				"Flag for enabling or disabling the 'Select All' functionality. When false, the 'Select All' checkbox will not be rendered.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" }
			}
		},
		numOfGridListItemDisplayed: {
			control: { type: "number" },
			description:
				"Maximum number of items to display in the list viewport. When set, the list will be contained to show only the specified number of items at once, with the remaining items accessible through scrolling within the container.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "undefined" }
			}
		},
		showCount: {
			control: { type: "boolean" },
			description:
				"When true, displays the number of selected items. Useful for providing selection feedback to users.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		itemsType: {
			control: { type: "text" },
			description: "Type description of the items being displayed. Used for accessibility and user interface labels.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		selectAllLabel: {
			control: { type: "text" },
			description:
				"Custom label text for the 'Select All' checkbox. Use this to provide localized or context-specific text.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "'Select All'" }
			}
		},
		actions: {
			control: false,
			description:
				"Array of action components (typically buttons or menus) to display alongside the selection controls. Provides bulk operations for selected items.",
			table: {
				type: { summary: "React.ReactElement[]" },
				defaultValue: { summary: "undefined" }
			}
		},
		virtualizedListOption: {
			control: false,
			description:
				"Configuration options for virtualized rendering when dealing with large datasets. Includes height, overscanCount, and contentPlaceholder properties.",
			table: {
				type: { summary: "object" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceGridListMultiSelect>;

const ENV_1_NAME = "Environment 1";
const ENV_DESCRIPTION = "The dev environment";
const testHeaders = ["Modeled Event Mesh", "Environment", "Description"];
const GRID_LIST_INDICATOR_VARIANT = ["info", "error", "warn", "success", "secondary"];
const testListItems = [
	{
		createdTime: 1635527600270,
		updatedTime: 1635527600270,
		createdBy: "10lota8vwsr",
		changedBy: "10lota8vwsr",
		id: "1",
		name: "Event Mesh 1",
		description: LIST_ITEM_DESCRIPTION,
		environmentId: "environment1",
		type: "eventMesh",
		environment: {
			id: "environment1",
			name: ENV_1_NAME,
			description: ENV_DESCRIPTION
		}
	},
	{
		createdTime: 1635527600270,
		updatedTime: 1635527600270,
		createdBy: "10lota8vwsr",
		changedBy: "10lota8vwsr",
		id: "2",
		name: "Event Mesh 2",
		description: "Another fun and exciting mesh",
		environmentId: "environment1",
		type: "eventMesh",
		environment: {
			id: "environment1",
			name: ENV_1_NAME,
			description: ENV_DESCRIPTION
		}
	},
	{
		createdTime: 1635527600270,
		updatedTime: 1635527600270,
		createdBy: "10lota8vwsr",
		changedBy: "10lota8vwsr",
		id: "3",
		name: "Event Mesh 3",
		description: "Coolest MEM around",
		environmentId: "environment2",
		type: "eventMesh",
		environment: {
			id: "environment2",
			name: ANOTHER_ENVIRONMENT_NAME,
			description: ENV_DESCRIPTION
		}
	},
	{
		createdTime: 1635527600270,
		updatedTime: 1635527600270,
		createdBy: "10lota8vwsr",
		changedBy: "10lota8vwsr",
		id: "4",
		name: "Event Mesh 4 with super loooooooong name",
		description: "A Modeled Event Mesh with a really long name (40 characters which is the max)",
		environmentId: "environment1",
		type: "eventMesh",
		environment: {
			id: "environment1",
			name: ENV_1_NAME,
			description: ENV_DESCRIPTION
		}
	},
	{
		createdTime: 1635527600270,
		updatedTime: 1635527600270,
		createdBy: "10lota8vwsr",
		changedBy: "10lota8vwsr",
		id: "5",
		name: "Event Mesh 5",
		description: LIST_ITEM_DESCRIPTION,
		environmentId: "environment2",
		type: "eventMesh",
		environment: {
			id: "environment2",
			name: ANOTHER_ENVIRONMENT_NAME,
			description: ENV_DESCRIPTION
		}
	}
];
const DEFAULT_MENU_ITEMS = [
	{
		name: "Option 1",
		onMenuItemClick: action("callback"),
		dataQa: "testDataProp2",
		dataTags: "testDataTag2"
	},
	{
		name: "Option 2",
		onMenuItemClick: action("callback")
	},
	{
		name: "Option 3",
		onMenuItemClick: action("callback")
	}
];
const DEFAULT_GRID_TEMPLATE = "minmax(120px, 200px) minmax(120px, 200px) minmax(300px, 1fr)";

const largeListItems = Array.from({ length: 500 }).map((item, index) => {
	return {
		createdTime: 1635527600270,
		updatedTime: 1635527600270,
		createdBy: "10lota8vwsr",
		changedBy: "10lota8vwsr",
		id: index + "",
		name: "Event Mesh " + index,
		description: LIST_ITEM_DESCRIPTION,
		environmentId: "environment1",
		type: "eventMesh",
		environment: {
			id: "environment1",
			name: ENV_1_NAME,
			description: ENV_DESCRIPTION
		}
	};
});

const basicRowMapping = (testItem): JSX.Element[] => {
	const itemCells: JSX.Element[] = [];
	itemCells.push(
		<div
			style={{ textOverflow: "ellipsis", maxWidth: "100%", overflow: "hidden" }}
			key={`${testItem.id}-${testItem.name}`}
		>
			<SolaceTooltip variant="overflow" title={testItem.name}>
				{testItem.name}
			</SolaceTooltip>
		</div>
	);
	itemCells.push(<div key={`${testItem.id}-${testItem.environment.name}`}>{testItem.environment.name}</div>);
	itemCells.push(
		<div
			style={{ textOverflow: "ellipsis", maxWidth: "100%", overflow: "hidden" }}
			key={`${testItem.id}-${testItem.description}`}
		>
			<SolaceTooltip variant="overflow" title={testItem.description}>
				{testItem.description}
			</SolaceTooltip>
		</div>
	);
	return itemCells;
};

const customCellMapping = (testItem): JSX.Element[] => {
	const itemCells: JSX.Element[] = [];
	itemCells.push(
		<div
			style={{ textOverflow: "ellipsis", maxWidth: "100%", overflow: "hidden" }}
			key={`${testItem.id}-${testItem.name}`}
		>
			{testItem.name}
		</div>
	);
	itemCells.push(
		<div key={`${testItem.id}-${testItem.environment.name}`}>
			<SolaceAttributeBadge label={testItem.environment.name} />
		</div>
	);
	itemCells.push(
		<div
			style={{ textOverflow: "ellipsis", maxWidth: "100%", overflow: "hidden" }}
			key={`${testItem.id}-${testItem.description}`}
		>
			{testItem.description}
		</div>
	);
	return itemCells;
};

const getActions = (isDisabled): JSX.Element[] => {
	const actionList: JSX.Element[] = [];
	actionList.push(
		<SolaceMenu
			id={"custom-solace-menu"}
			buttonProps={{
				isDisabled: isDisabled,
				variant: "outline",
				endIcon: (
					<span style={{ marginTop: "-2px" }}>
						<SelectDropdownIcon />
					</span>
				),
				children: "Actions"
			}}
			items={DEFAULT_MENU_ITEMS}
		/>
	);
	return actionList;
};

const getListItemsWithDifferentIndicators = (listItems) => {
	return listItems.map((item, index) => {
		const newItem = cloneDeep(item);

		if (index < GRID_LIST_INDICATOR_VARIANT.length) {
			newItem["indicatorVariant"] = GRID_LIST_INDICATOR_VARIANT[index % GRID_LIST_INDICATOR_VARIANT.length];
			if (newItem["indicatorVariant"] === "secondary") {
				newItem["emphasized"] = true;
			}
		}

		return newItem;
	});
};

const SolaceGridListMultiSelectStory = ({ selectedRowIds, highlightedRowId, ...args }) => {
	const [highlightedId, setHighlightedId] = useState(highlightedRowId || undefined);
	const [selectedIds, setSelectedIds] = useState(selectedRowIds || []);

	useEffect(() => {
		setHighlightedId(highlightedRowId);
	}, [highlightedRowId]);

	useEffect(() => {
		setSelectedIds(selectedRowIds);
	}, [selectedRowIds]);

	const handleRowHighlight = (selectedItem) => {
		action("rowHighlighted")(selectedItem);
		setHighlightedId(selectedItem.id);
	};

	const handleRowSelection = (selectedItems) => {
		action("selectedRows")(selectedItems);
		setSelectedIds(selectedItems.map((item) => item.id));
	};
	return (
		<SolaceGridListMultiSelect
			{...args}
			items={args.items}
			rowMapping={args.rowMapping}
			gridTemplate={args.gridTemplate}
			highlightedRowId={highlightedId}
			onRowHighlight={handleRowHighlight}
			selectedRowIds={selectedIds}
			onSelection={handleRowSelection}
		/>
	);
};

export const DefaultList = {
	render: SolaceGridListMultiSelectStory,

	args: {
		items: testListItems,
		rowMapping: basicRowMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		dataQa: "demoDefaultList"
	}
};

export const NoSelectAll = {
	render: SolaceGridListMultiSelectStory,

	args: {
		items: testListItems,
		rowMapping: basicRowMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		selectAll: false,
		dataQa: "demoDefaultList"
	}
};

export const WithCustomSelectAllText = {
	render: SolaceGridListMultiSelectStory,

	args: {
		items: testListItems,
		rowMapping: basicRowMapping,
		selectAllLabel: "Choose All",
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		dataQa: "demoDefaultList"
	}
};

export const WithDefaultHighlight = {
	render: SolaceGridListMultiSelectStory,

	args: {
		items: testListItems,
		rowMapping: basicRowMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		highlightedRowId: "2",
		dataQa: "demoDefaultList"
	}
};

export const WithDefaultSelections = {
	render: SolaceGridListMultiSelectStory,

	args: {
		items: testListItems,
		rowMapping: basicRowMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		selectedRowIds: ["2", "3", "5"],
		dataQa: "demoDefaultList"
	}
};

export const WithAllSelected = {
	render: SolaceGridListMultiSelectStory,

	args: {
		items: testListItems,
		rowMapping: basicRowMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		selectedRowIds: testListItems.map((item) => item.id),
		dataQa: "demoDefaultList"
	}
};

export const WithClearSelectAllAction = () => {
	const [highlightedRowId, setHighlightedRowId] = useState();
	const [selectedRowIds, setSelectedRowIds] = useState(testListItems.map((item) => item.id));

	const handleRowHighlight = (selectedItem) => {
		action("rowHighlighted")(selectedItem);
		setHighlightedRowId(selectedItem.id);
	};

	const handleRowSelection = (selectedItems) => {
		action("selectedRows")(selectedItems);
		setSelectedRowIds(selectedItems.map((item) => item.id));
	};

	const handleClearAllSelections = () => {
		action("clearAllSelections")();
		setSelectedRowIds([]);
	};

	return (
		<div style={{ display: "flex", flexDirection: "column", rowGap: "24px" }}>
			<SolaceGridListMultiSelect
				items={testListItems}
				rowMapping={basicRowMapping}
				highlightedRowId={highlightedRowId}
				onRowHighlight={handleRowHighlight}
				selectedRowIds={selectedRowIds}
				onSelection={handleRowSelection}
				gridTemplate={DEFAULT_GRID_TEMPLATE}
				dataQa="demoDefaultList"
			/>
			<div style={{ width: "200px" }}>
				<SolaceButton variant={"outline"} onClick={handleClearAllSelections}>
					Clear All Selections
				</SolaceButton>
			</div>
		</div>
	);
};

WithClearSelectAllAction.play = async ({ canvasElement }) => {
	// Starts querying the component from it's root element
	const canvas = within(canvasElement);

	// clear all selection
	await userEvent.click(await canvas.findByRole("button", { name: /Clear All Selections/i }));
};

WithClearSelectAllAction.parameters = {
	// Delay snapshot 5 seconds until all interactions are done
	chromatic: { delay: 5000 }
};

export const WithActionMenus = {
	render: SolaceGridListMultiSelectStory,

	args: {
		items: testListItems,
		rowMapping: basicRowMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		actions: getActions(false),
		dataQa: "demoDefaultList"
	}
};

export const WithActionMenusEnabledOnItemsSelect = (): JSX.Element => {
	const [highlightedRowId, setHighlightedRowId] = useState();
	const [selectedRowIds, setSelectedRowIds] = useState([]);
	const [isDisabled, setIsDisabled] = useState(true);

	const handleRowHighlight = (selectedItem) => {
		action("rowHighlighted")(selectedItem);
		setHighlightedRowId(selectedItem.id);
	};

	const handleRowSelection = (selectedItems) => {
		action("selectedRows")(selectedItems);
		if (selectedItems.length > 0) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
		setSelectedRowIds(selectedItems.map((item) => item.id));
	};

	return (
		<SolaceGridListMultiSelect
			items={testListItems}
			rowMapping={basicRowMapping}
			highlightedRowId={highlightedRowId}
			onRowHighlight={handleRowHighlight}
			selectedRowIds={selectedRowIds}
			onSelection={handleRowSelection}
			gridTemplate={DEFAULT_GRID_TEMPLATE}
			actions={getActions(isDisabled)}
			dataQa="demoDefaultList"
		/>
	);
};

export const WithOnlyActionMenus = {
	render: SolaceGridListMultiSelectStory,

	args: {
		items: testListItems,
		rowMapping: basicRowMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		actions: getActions(false),
		selectAll: false,
		dataQa: "demoDefaultList"
	}
};

export const WithHeaders = {
	render: SolaceGridListMultiSelectStory,

	args: {
		items: testListItems,
		rowMapping: basicRowMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		headers: testHeaders,
		dataQa: "demoDefaultList"
	}
};

export const ContainedList = {
	render: SolaceGridListMultiSelectStory,

	args: {
		items: testListItems,
		rowMapping: basicRowMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		actions: getActions(false),
		dataQa: "demoDefaultList",
		numOfGridListItemDisplayed: 3
	}
};

export const ContainedListNoHeader = {
	render: SolaceGridListMultiSelectStory,

	args: {
		items: testListItems,
		rowMapping: basicRowMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		dataQa: "demoDefaultList",
		numOfGridListItemDisplayed: 3,
		selectAll: false
	}
};

export const LargeDataList = {
	render: SolaceGridListMultiSelectStory,

	args: {
		items: largeListItems,
		headers: testHeaders,
		onSelection: action("rowSelected"),
		rowMapping: customCellMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		virtualizedListOption: {
			height: 500,
			overscanCount: 20
		},
		dataQa: "demoDefaultList"
	}
};

export const LargeDataListDefaultHighlightAndSelection = {
	render: SolaceGridListMultiSelectStory,

	args: {
		items: largeListItems,
		headers: testHeaders,
		onSelection: action("rowSelected"),
		rowMapping: customCellMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		highlightedRowId: "20",
		selectedRowIds: ["2", "4", "20"],
		virtualizedListOption: {
			height: 500,
			overscanCount: 20
		},
		dataQa: "demoDefaultList"
	}
};

export const ListWithIndicatorEmphasized = {
	render: SolaceGridListMultiSelectStory,

	args: {
		items: getListItemsWithDifferentIndicators(testListItems),
		headers: testHeaders,
		rowMapping: basicRowMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		dataQa: "demoDefaultList"
	}
};

export const ListWithIndicatorEmphasizedInitialHighlight = {
	render: SolaceGridListMultiSelectStory,

	args: {
		items: getListItemsWithDifferentIndicators(testListItems),
		headers: testHeaders,
		rowMapping: basicRowMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		highlightedRowId: "2",
		dataQa: "demoDefaultList"
	}
};

export const LargeDataListWithIndicatorEmphasized = {
	render: SolaceGridListMultiSelectStory,

	args: {
		items: getListItemsWithDifferentIndicators(largeListItems),
		headers: testHeaders,
		rowMapping: basicRowMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		virtualizedListOption: {
			height: 500,
			overscanCount: 20
		},
		dataQa: "demoDefaultList"
	}
};
