import { ComponentMeta } from "@storybook/react";
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

const LIST_ITEM_DESCRIPTION = "The event mesh for accounting";
const ANOTHER_ENVIRONMENT_NAME = "Environment 2";

export default {
	title: "Layout/SolaceGridListMultiSelect",
	component: SolaceGridListMultiSelect,
	parameters: {
		docs: {
			description: {
				component: "List component used for rendering collections of data based on a specified 'grid' layout"
			}
		}
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Unique identifier for the list"
		},
		items: {
			control: {
				type: "object"
			},
			description:
				"The collection of object data to populate the list with. Each object MUST have an associated id field",
			table: {
				defaultValue: {
					summary: []
				}
			}
		},
		headers: {
			control: { type: "object" },
			description: "Ordered list of collumn header names",
			table: {
				defaultValue: {
					summary: []
				}
			}
		},
		highlightedRowId: {
			control: { type: "number" },
			description: "The id of the item to be highlighted in the list",
			table: {
				defaultValue: {
					summary: undefined
				}
			}
		},
		onRowHighlight: {
			description:
				"A callback function which is triggered on row is highlighted (row is clicked),  will pass the data object associated with the highlighted row"
		},
		selectedRowIds: {
			control: { type: "array" },
			description: "The ids of all the items currenlty selected (checkbox selected) in the list",
			table: {
				defaultValue: {
					summary: undefined
				}
			}
		},
		onSelection: {
			description:
				"A callback function which is triggered on row is selected (row's checkbox is clicked), will pass the list of data objects associated with all the selected rows)"
		},
		gridTemplate: {
			control: { type: "text" },
			description:
				"Text used to desribe the layout of each list item (and header). Defines the columns of the list with values representing the track size, and the space between them"
		},
		dataQa: {
			control: { type: "text" },
			description: "identifier assigned to the data-qa tag to assist with testing"
		},
		rowMapping: {
			description:
				"A callback function which maps an individual object into an ordered list of HTMLDivElements of how to render each individual attribute"
		},
		selectAll: {
			control: { type: "boolean" },
			description:
				"Flag for enabling or disabling the 'Select All' functionality (disabling will not render the 'Select All' checkbox)",
			table: {
				defaultValue: {
					summary: true
				}
			}
		},
		numOfGridListItemDisplayed: {
			control: { type: "number" },
			description: "Number of items to be displayed in the List"
		},
		showCount: {
			control: { type: "boolean" },
			description: "Show the number of selected items"
		},
		itemsType: {
			control: { type: "text" },
			description: "Type of the Items"
		}
	}
} as ComponentMeta<typeof SolaceGridListMultiSelect>;

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

const basicRowMapping = (testItem) => {
	const itemCells: any[] = [];
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

const customCellMapping = (testItem) => {
	const itemCells: any[] = [];
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
	const actionList: any[] = [];
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
			highlightedRowId={highlightedId}
			onRowHighlight={handleRowHighlight}
			selectedRowIds={selectedIds}
			onSelection={handleRowSelection}
		/>
	);
};

export const DefaultList = SolaceGridListMultiSelectStory.bind({});
DefaultList.args = {
	items: testListItems,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPLATE,
	dataQa: "demoDefaultList"
};

export const NoSelectAll = SolaceGridListMultiSelectStory.bind({});
NoSelectAll.args = {
	items: testListItems,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPLATE,
	selectAll: false,
	dataQa: "demoDefaultList"
};

export const WithCustomSelectAllText = SolaceGridListMultiSelectStory.bind({});
WithCustomSelectAllText.args = {
	items: testListItems,
	rowMapping: basicRowMapping,
	selectAllLabel: "Choose All",
	gridTemplate: DEFAULT_GRID_TEMPLATE,
	dataQa: "demoDefaultList"
};

export const WithDefaultHighlight = SolaceGridListMultiSelectStory.bind({});
WithDefaultHighlight.args = {
	items: testListItems,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPLATE,
	highlightedRowId: "2",
	dataQa: "demoDefaultList"
};

export const WithDefaultSelections = SolaceGridListMultiSelectStory.bind({});
WithDefaultSelections.args = {
	items: testListItems,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPLATE,
	selectedRowIds: ["2", "3", "5"],
	dataQa: "demoDefaultList"
};

export const WithAllSelected = SolaceGridListMultiSelectStory.bind({});
WithAllSelected.args = {
	items: testListItems,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPLATE,
	selectedRowIds: testListItems.map((item) => item.id),
	dataQa: "demoDefaultList"
};

export const WithClearSelectAllAction = (): JSX.Element => {
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

export const WithActionMenus = SolaceGridListMultiSelectStory.bind({});
WithActionMenus.args = {
	items: testListItems,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPLATE,
	actions: getActions(false),
	dataQa: "demoDefaultList"
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

export const WithOnlyActionMenus = SolaceGridListMultiSelectStory.bind({});
WithOnlyActionMenus.args = {
	items: testListItems,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPLATE,
	actions: getActions(false),
	selectAll: false,
	dataQa: "demoDefaultList"
};

export const WithHeaders = SolaceGridListMultiSelectStory.bind({});
WithHeaders.args = {
	items: testListItems,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPLATE,
	headers: testHeaders,
	dataQa: "demoDefaultList"
};

export const ContainedList = SolaceGridListMultiSelectStory.bind({});
ContainedList.args = {
	items: testListItems,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPLATE,
	actions: getActions(false),
	dataQa: "demoDefaultList",
	numOfGridListItemDisplayed: 3
};

export const ContainedListNoHeader = SolaceGridListMultiSelectStory.bind({});
ContainedListNoHeader.args = {
	items: testListItems,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPLATE,
	dataQa: "demoDefaultList",
	numOfGridListItemDisplayed: 3,
	selectAll: false
};

export const LargeDataList = SolaceGridListMultiSelectStory.bind({});
LargeDataList.args = {
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
};

export const LargeDataListDefaultHighlightAndSelection = SolaceGridListMultiSelectStory.bind({});
LargeDataListDefaultHighlightAndSelection.args = {
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
};

export const ListWithIndicatorEmphasized = SolaceGridListMultiSelectStory.bind({});
ListWithIndicatorEmphasized.args = {
	items: getListItemsWithDifferentIndicators(testListItems),
	headers: testHeaders,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPLATE,
	dataQa: "demoDefaultList"
};

export const ListWithIndicatorEmphasizedInitialHighlight = SolaceGridListMultiSelectStory.bind({});
ListWithIndicatorEmphasizedInitialHighlight.args = {
	items: getListItemsWithDifferentIndicators(testListItems),
	headers: testHeaders,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPLATE,
	highlightedRowId: "2",
	dataQa: "demoDefaultList"
};

export const LargeDataListWithIndicatorEmphasized = SolaceGridListMultiSelectStory.bind({});
LargeDataListWithIndicatorEmphasized.args = {
	items: getListItemsWithDifferentIndicators(largeListItems),
	headers: testHeaders,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPLATE,
	virtualizedListOption: {
		height: 500,
		overscanCount: 20
	},
	dataQa: "demoDefaultList"
};
