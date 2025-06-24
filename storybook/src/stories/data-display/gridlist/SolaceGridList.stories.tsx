import { Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
	SolaceGridList,
	SolaceAttributeBadge,
	SolaceMenu,
	SolaceTooltip,
	MoreHorizOutlinedIcon
} from "@SolaceDev/maas-react-components";
import React, { useEffect, useState } from "react";
import { cloneDeep } from "lodash";

(SolaceGridList as React.FC & { displayName?: string }).displayName = "SolaceGridList";

const LIST_ITEM_DESCRIPTION = "The event mesh for accounting";
const ANOTHER_ENVIRONMENT_NAME = "Environment 2";

export default {
	title: "Data Display/List/Single Selection",
	component: SolaceGridList,
	parameters: {
		docs: {
			description: {
				component:
					"List component used for rendering collections of data based on a specified 'grid' layout. Code component name: SolaceGridList. The component uses indicator variants (info, error, warn, success, secondary) defined at https://github.com/SolaceDev/maas-react-components/blob/main/src/types/states.ts"
			}
		}
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description:
				"Unique identifier for the GridList component. Used for accessibility and programmatic access to the grid list instance.",
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
		selectedItemId: {
			control: { type: "text" },
			description: "The id of the item to be selected in the list. Use this for controlled selection state.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
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
		onSelection: {
			control: false,
			description:
				"Callback function triggered when a row is selected. Receives the data object associated with the selected row."
		},
		background: {
			control: { type: "text" },
			description:
				"CSS background color value to apply to the entire list container. Useful for creating visual distinction or theming.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		numOfGridListItemDisplayed: {
			control: { type: "number" },
			description:
				"Maximum number of items to display in the list. When set, the list will be contained and show only the specified number of items.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "undefined" }
			}
		},
		objectIdentifier: {
			control: { type: "text" },
			description:
				"Custom field name to use as the unique identifier for each object instead of the default 'id' field.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "'id'" }
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
} as Meta<typeof SolaceGridList>;

const ENV_1_NAME = "Environment 1";
const ENV_DESCRIPTION = "The dev environment";
const testHeaders = ["Modeled Event Mesh", "Environment", "Description"];
const DEFAULT_GRID_TEMPLATE = "minmax(120px, 1fr) minmax(120px, 1fr) 300px";
const GRID_TEMPLATE_1 = "minmax(120px, 200px) minmax(120px, 200px) minmax(300px, 1fr)";
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
	},
	{
		createdTime: 1635527600270,
		updatedTime: 1635527600270,
		createdBy: "10lota8vwsr",
		changedBy: "10lota8vwsr",
		id: "6",
		name: "Event Mesh 6",
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

const createActionMenu = (item) => {
	const handleViewSelection = () => {
		action("viewDetailsSelected")(item);
	};

	const handleDeleteSelection = () => {
		action("deleteSelected")(item);
	};

	return (
		<SolaceMenu
			id={item.id}
			items={[
				{
					name: "View Details",
					onMenuItemClick: handleViewSelection,
					disabled: true
				},
				{
					name: "Delete",
					onMenuItemClick: handleDeleteSelection
				}
			]}
			buttonProps={{
				title: "More Actions",
				variant: "icon",
				children: <MoreHorizOutlinedIcon />
			}}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right"
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "right"
			}}
		/>
	);
};

const basicRowMapping = (testItem) => {
	const itemCells: unknown[] = [];
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
	const itemCells: unknown[] = [];
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

const withActionColumnMapping = (testItem) => {
	const itemCells: unknown[] = [];
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
	itemCells.push(
		<div key={`${testItem.id}-actionMenu`} style={{ justifySelf: "center" }}>
			{createActionMenu(testItem)}
		</div>
	);
	return itemCells;
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

export const DefaultList = {
	args: {
		items: testListItems,
		headers: testHeaders,
		onSelection: action("rowSelected"),
		rowMapping: basicRowMapping,
		gridTemplate: GRID_TEMPLATE_1,
		dataQa: "demoDefaultList"
	}
};

export const ContainedList = {
	args: {
		items: testListItems,
		headers: testHeaders,
		onSelection: action("rowSelected"),
		rowMapping: basicRowMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		dataQa: "demoDefaultList",
		numOfGridListItemDisplayed: 3
	}
};

export const ColoredList = {
	args: {
		items: testListItems,
		headers: testHeaders,
		onSelection: action("rowSelected"),
		rowMapping: basicRowMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		dataQa: "demoDefaultList",
		background: "rgba(0, 0, 0, 0.03)"
	}
};

export const CustomRenderer = {
	args: {
		items: testListItems,
		headers: testHeaders,
		onSelection: action("rowSelected"),
		rowMapping: customCellMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		dataQa: "demoDefaultList"
	}
};

// the following list of objects no longer have an "id" attribute (which was used as the object identifier), but rather "customId"
const customListItems = [
	{
		createdTime: 1635527600270,
		updatedTime: 1635527600270,
		createdBy: "10lota8vwsr",
		changedBy: "10lota8vwsr",
		customId: "1",
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
		customId: "2",
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
		customId: "3",
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
		customId: "4",
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
		customId: "5",
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

export const CustomObjectIdentifier = {
	args: {
		items: customListItems,
		objectIdentifier: "customId", // testing the custom identifier
		headers: testHeaders,
		onSelection: action("rowSelected"),
		rowMapping: customCellMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		dataQa: "demoDefaultList"
	}
};

export const WithActionMenus = {
	args: {
		items: testListItems,
		headers: testHeaders,
		onSelection: action("rowSelected"),
		rowMapping: withActionColumnMapping,
		gridTemplate: "minmax(120px, 1fr) minmax(120px, 1fr) 300px 40px",
		dataQa: "demoDefaultList"
	}
};

export const LargeDataList = {
	args: {
		items: largeListItems,
		headers: testHeaders,
		onSelection: action("rowSelected"),
		rowMapping: customCellMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		virtualizedListOption: {
			height: 500,
			overscanCount: 5
		},
		dataQa: "demoDefaultList"
	}
};

export const LargeDataColoredList = {
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
		dataQa: "demoDefaultList",
		background: "rgba(0, 0, 0, 0.03)"
	}
};

export const LargeDataListWithContentPlaceHolder = {
	args: {
		items: largeListItems,
		headers: testHeaders,
		onSelection: action("rowSelected"),
		rowMapping: customCellMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		virtualizedListOption: {
			height: 500,
			contentPlaceholder: <div style={{ color: "rgba(0,0,0,0.5)" }}>Scrolling...</div>
		},
		dataQa: "demoDefaultList"
	}
};

export const LargeContainerList = {
	args: {
		items: testListItems,
		headers: testHeaders,
		onSelection: action("rowSelected"),
		rowMapping: basicRowMapping,
		gridTemplate: DEFAULT_GRID_TEMPLATE,
		virtualizedListOption: {
			height: 500,
			overscanCount: 20
		},
		dataQa: "demoDefaultList"
	}
};

export const NoHeaderList = {
	args: {
		items: testListItems,
		onSelection: action("rowSelected"),
		rowMapping: basicRowMapping,
		gridTemplate: GRID_TEMPLATE_1,
		dataQa: "demoDefaultList"
	}
};

const SolaceGridListSelectStory = ({ selectedRowId, ...args }) => {
	const [selectedId, setSelectedId] = useState(selectedRowId || undefined);

	useEffect(() => {
		setSelectedId(selectedRowId);
	}, [selectedRowId]);

	const handleRowSelection = (selectedItem) => {
		action("selectedRows")(selectedItem);
		setSelectedId(selectedItem?.id);
	};
	return (
		<SolaceGridList
			{...args}
			items={args.items}
			rowMapping={args.rowMapping}
			gridTemplate={args.gridTemplate}
			selectedItemId={selectedId}
			onSelection={handleRowSelection}
		/>
	);
};

export const ListWithSelection = {
	render: SolaceGridListSelectStory,

	args: {
		items: testListItems,
		headers: testHeaders,
		onSelection: action("rowSelected"),
		rowMapping: basicRowMapping,
		gridTemplate: GRID_TEMPLATE_1,
		dataQa: "demoDefaultList"
	}
};

export const ListWithSelectionAndActionMenu = {
	render: SolaceGridListSelectStory,

	args: {
		items: testListItems,
		headers: testHeaders,
		onSelection: action("rowSelected"),
		rowMapping: withActionColumnMapping,
		gridTemplate: "minmax(120px, 1fr) minmax(120px, 1fr) 300px 40px",
		dataQa: "demoDefaultList"
	}
};

export const ListWithSelectionIndicatorEmphasized = {
	render: SolaceGridListSelectStory,

	args: {
		items: getListItemsWithDifferentIndicators(testListItems),
		headers: testHeaders,
		onSelection: action("rowSelected"),
		rowMapping: basicRowMapping,
		gridTemplate: GRID_TEMPLATE_1,
		dataQa: "demoDefaultList"
	}
};

export const ListWithSelectionIndicatorEmphasizedInitialSelection = {
	render: SolaceGridListSelectStory,

	args: {
		items: getListItemsWithDifferentIndicators(testListItems),
		headers: testHeaders,
		onSelection: action("rowSelected"),
		rowMapping: basicRowMapping,
		gridTemplate: GRID_TEMPLATE_1,
		selectedRowId: "2",
		dataQa: "demoDefaultList"
	}
};

export const LargeDataListWithSelectionIndicatorEmphasized = {
	render: SolaceGridListSelectStory,

	args: {
		items: getListItemsWithDifferentIndicators(largeListItems),
		headers: testHeaders,
		onSelection: action("rowSelected"),
		rowMapping: basicRowMapping,
		gridTemplate: GRID_TEMPLATE_1,
		virtualizedListOption: {
			height: 500,
			overscanCount: 5
		},
		dataQa: "demoDefaultList"
	}
};
