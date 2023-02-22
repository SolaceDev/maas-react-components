import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SolaceGridList, SolaceAttributeBadge, SolaceMenu, SolaceTooltip } from "@SolaceDev/maas-react-components";
import { MoreHorizOutlinedIcon } from "../../../../src/resources/icons/MoreHorizOutlinedIcon";
import React from "react";

const LIST_ITEM_DESCRIPTION = "The event mesh for accounting";
const ANOTHER_ENVIRONMENT_NAME = "Environment 2";

export default {
	title: "Layout/SolaceGridList",
	component: SolaceGridList,
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
		selectedItemId: {
			control: { type: "text" },
			description: "The id of the item to be selected in the list",
			table: {
				defaultValue: {
					summary: undefined
				}
			}
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
		onSelection: {
			description:
				"A callback function which is triggered on row selection (will pass the data object associated wit hthat row)"
		},
		background: {
			control: { type: "text" },
			description: "Text used to set the background color of the list"
		},
		numOfGridListItemDisplayed: {
			control: { type: "number" },
			description: "Number of items to be displayed in the List"
		}
	}
} as ComponentMeta<typeof SolaceGridList>;

const ENV_1_NAME = "Environment 1";
const ENV_DESCRIPTION = "The dev environment";
const testHeaders = ["Modeled Event Mesh", "Environment", "Description"];
const DEFAULT_GRID_TEMPALTE = "minmax(120px, 1fr) minmax(120px, 1fr) 300px";
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
					onMenuItemClick: handleViewSelection
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

const withActionColumnMapping = (testItem) => {
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
	itemCells.push(
		<div key={`${testItem.id}-actionMenu`} style={{ justifySelf: "center" }}>
			{createActionMenu(testItem)}
		</div>
	);
	return itemCells;
};

const Template: ComponentStory<typeof SolaceGridList> = (args) => <SolaceGridList {...args} />;

export const DefaultList = Template.bind({});
DefaultList.args = {
	items: testListItems,
	headers: testHeaders,
	onSelection: action("rowSelected"),
	rowMapping: basicRowMapping,
	gridTemplate: "minmax(120px, 200px) minmax(120px, 200px) minmax(300px, 1fr)",
	dataQa: "demoDefaultList"
};

export const ContainedList = Template.bind({});
ContainedList.args = {
	items: testListItems,
	headers: testHeaders,
	onSelection: action("rowSelected"),
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPALTE,
	dataQa: "demoDefaultList",
	numOfGridListItemDisplayed: 3
};

export const ColoredList = Template.bind({});
ColoredList.args = {
	items: testListItems,
	headers: testHeaders,
	onSelection: action("rowSelected"),
	rowMapping: basicRowMapping,
	gridTemplate: DEFAULT_GRID_TEMPALTE,
	dataQa: "demoDefaultList",
	background: "rgba(0, 0, 0, 0.03)"
};

export const CustomRenderer = Template.bind({});
CustomRenderer.args = {
	items: testListItems,
	headers: testHeaders,
	onSelection: action("rowSelected"),
	rowMapping: customCellMapping,
	gridTemplate: DEFAULT_GRID_TEMPALTE,
	dataQa: "demoDefaultList"
};

export const CustomObjectIdentifier = Template.bind({});
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

CustomObjectIdentifier.args = {
	items: customListItems,
	objectIdentifier: "customId", // testing the custom identifier
	headers: testHeaders,
	onSelection: action("rowSelected"),
	rowMapping: customCellMapping,
	gridTemplate: DEFAULT_GRID_TEMPALTE,
	dataQa: "demoDefaultList"
};

export const WithActionMenus = Template.bind({});
WithActionMenus.args = {
	items: testListItems,
	headers: testHeaders,
	onSelection: action("rowSelected"),
	rowMapping: withActionColumnMapping,
	gridTemplate: "minmax(120px, 1fr) minmax(120px, 1fr) 300px 40px",
	dataQa: "demoDefaultList"
};

export const LargeDataList = Template.bind({});
LargeDataList.args = {
	items: largeListItems,
	headers: testHeaders,
	onSelection: action("rowSelected"),
	rowMapping: customCellMapping,
	gridTemplate: DEFAULT_GRID_TEMPALTE,
	virtualizedListOption: {
		height: 500,
		overscanCount: 5
	},
	dataQa: "demoDefaultList"
};

export const LargeDataColoredList = Template.bind({});
LargeDataColoredList.args = {
	items: largeListItems,
	headers: testHeaders,
	onSelection: action("rowSelected"),
	rowMapping: customCellMapping,
	gridTemplate: DEFAULT_GRID_TEMPALTE,
	virtualizedListOption: {
		height: 500,
		overscanCount: 20
	},
	dataQa: "demoDefaultList",
	background: "rgba(0, 0, 0, 0.03)"
};

export const LargeDataListWithContentPlaceHolder = Template.bind({});
LargeDataListWithContentPlaceHolder.args = {
	items: largeListItems,
	headers: testHeaders,
	onSelection: action("rowSelected"),
	rowMapping: customCellMapping,
	gridTemplate: DEFAULT_GRID_TEMPALTE,
	virtualizedListOption: {
		height: 500,
		contentPlaceholder: <div style={{ color: "rgba(0,0,0,0.5)" }}>Scrolling...</div>
	},
	dataQa: "demoDefaultList"
};
