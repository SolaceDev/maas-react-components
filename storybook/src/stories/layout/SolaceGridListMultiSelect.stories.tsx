import { ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
	SolaceGridListMultiSelect,
	SolaceTooltip,
	SolaceMenu,
	SolaceButton,
	SelectDropdownIcon
} from "@SolaceDev/maas-react-components";
import { useState, useEffect } from "react";

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
		}
	}
} as ComponentMeta<typeof SolaceGridListMultiSelect>;

const ENV_1_NAME = "Environment 1";
const ENV_DESCRIPTION = "The dev environment";
const testHeaders = ["Modeled Event Mesh", "Environment", "Description"];
const testListItems = [
	{
		createdTime: 1635527600270,
		updatedTime: 1635527600270,
		createdBy: "10lota8vwsr",
		changedBy: "10lota8vwsr",
		id: 1,
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
		id: 2,
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
		id: 3,
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
		id: 4,
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
		id: 5,
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
const DEFAULT_GRID_TEMPALTE = "minmax(120px, 200px) minmax(120px, 200px) minmax(300px, 1fr)";

const basicRowMapping = (testItem) => {
	const itemCells = [];
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

const getActions = (): JSX.Element[] => {
	const actionList = [];
	actionList.push(
		<SolaceMenu
			id={"custom-solace-menu"}
			buttonProps={{
				variant: "icon",
				children: (
					<SolaceButton
						variant="outline"
						endIcon={
							<span style={{ marginTop: "5px" }}>
								<SelectDropdownIcon />
							</span>
						}
					>
						Actions
					</SolaceButton>
				)
			}}
			items={DEFAULT_MENU_ITEMS}
		></SolaceMenu>
	);
	return actionList;
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
	gridTemplate: DEFAULT_GRID_TEMPALTE,
	dataQa: "demoDefaultList"
};

export const NoSelectAll = SolaceGridListMultiSelectStory.bind({});
NoSelectAll.args = {
	items: testListItems,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPALTE,
	selectAll: false,
	dataQa: "demoDefaultList"
};

export const WithCustomSelectAllText = SolaceGridListMultiSelectStory.bind({});
WithCustomSelectAllText.args = {
	items: testListItems,
	rowMapping: basicRowMapping,
	selectAllLabel: "Choose All",
	gridTemplate: DEFAULT_GRID_TEMPALTE,
	dataQa: "demoDefaultList"
};

export const WithDefaultHighlight = SolaceGridListMultiSelectStory.bind({});
WithDefaultHighlight.args = {
	items: testListItems,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPALTE,
	highlightedRowId: 2,
	dataQa: "demoDefaultList"
};

export const WithDefaultSelections = SolaceGridListMultiSelectStory.bind({});
WithDefaultSelections.args = {
	items: testListItems,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPALTE,
	selectedRowIds: [2, 3, 5],
	dataQa: "demoDefaultList"
};

export const WithActionMenus = SolaceGridListMultiSelectStory.bind({});
WithActionMenus.args = {
	items: testListItems,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPALTE,
	actions: getActions(),
	dataQa: "demoDefaultList"
};

export const WithOnlyActionMenus = SolaceGridListMultiSelectStory.bind({});
WithOnlyActionMenus.args = {
	items: testListItems,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPALTE,
	actions: getActions(),
	selectAll: false,
	dataQa: "demoDefaultList"
};

export const WithHeaders = SolaceGridListMultiSelectStory.bind({});
WithHeaders.args = {
	items: testListItems,
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPALTE,
	headers: testHeaders,
	dataQa: "demoDefaultList"
};
