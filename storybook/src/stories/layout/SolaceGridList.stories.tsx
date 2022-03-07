import { ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SolaceGridList, SolaceChip, SolaceMenu, SolaceTooltip } from "@SolaceDev/maas-react-components";
import { useState } from "react";
import { MoreHorizOutlinedIcon } from "../../../../src/resources/icons/MoreHorizOutlinedIcon";

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
		}
	}
} as ComponentMeta<typeof SolaceGridList>;

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

const createActionMenu = (item) => {
	const handleViewSelection = () => {
		action("viewDetailsSelected")(item);
	};

	const handleDeleteSelection = () => {
		action("deleteSelected")(item);
	};

	return (
		<SolaceMenu
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
		/>
	);
};

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

const customCellMapping = (testItem) => {
	const itemCells = [];
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
			<SolaceChip label={testItem.environment.name} />
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
	const itemCells = [];
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
			<SolaceChip label={testItem.environment.name} />
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

export const DefaultList = (): JSX.Element => {
	const [selectedId, setSelectedId] = useState();

	const handleRowSelection = (selectedItem) => {
		action("rowSelected")(selectedItem);
		setSelectedId(selectedItem.id);
	};

	return (
		<SolaceGridList
			items={testListItems}
			headers={testHeaders}
			onSelection={handleRowSelection}
			rowMapping={basicRowMapping}
			selectedItemId={selectedId}
			gridTemplate="minmax(120px, 200px) minmax(120px, 200px) minmax(300px, 1fr)"
			dataQa="demoDefaultList"
		/>
	);
};

export const ContainedList = (): JSX.Element => {
	const [selectedId, setSelectedId] = useState();

	const handleRowSelection = (selectedItem) => {
		action("rowSelected")(selectedItem);
		setSelectedId(selectedItem.id);
	};

	return (
		<div style={{ height: "200px" }}>
			<SolaceGridList
				items={testListItems}
				headers={testHeaders}
				onSelection={handleRowSelection}
				rowMapping={basicRowMapping}
				selectedItemId={selectedId}
				gridTemplate="minmax(120px, 1fr) minmax(120px, 1fr) 300px"
				dataQa="demoDefaultList"
			/>
		</div>
	);
};

export const CustomRenderer = (): JSX.Element => {
	const [selectedId, setSelectedId] = useState();

	const handleRowSelection = (selectedItem) => {
		action("rowSelected")(selectedItem);
		setSelectedId(selectedItem.id);
	};

	return (
		<SolaceGridList
			items={testListItems}
			headers={testHeaders}
			onSelection={handleRowSelection}
			rowMapping={customCellMapping}
			selectedItemId={selectedId}
			gridTemplate="minmax(120px, 1fr) minmax(120px, 1fr) 300px"
			dataQa="demoDefaultList"
		/>
	);
};

export const CustomObjectIdentifier = (): JSX.Element => {
	const [selectedId, setSelectedId] = useState();
	// the following list of objects no longer have an "id" attribute (which was used as the object identifier), but rather "customId"
	const customListItems = [
		{
			createdTime: 1635527600270,
			updatedTime: 1635527600270,
			createdBy: "10lota8vwsr",
			changedBy: "10lota8vwsr",
			customId: 1,
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
			customId: 2,
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
			customId: 3,
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
			customId: 4,
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
			customId: 5,
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

	const handleRowSelection = (selectedItem) => {
		action("rowSelected")(selectedItem);
		setSelectedId(selectedItem.customId);
	};

	return (
		<SolaceGridList
			items={customListItems}
			objectIdentifier="customId" // testing the custom identifier
			headers={testHeaders}
			onSelection={handleRowSelection}
			rowMapping={customCellMapping}
			selectedItemId={selectedId}
			gridTemplate="minmax(120px, 1fr) minmax(120px, 1fr) 300px"
			dataQa="demoDefaultList"
		/>
	);
};

export const WithActionMenus = (): JSX.Element => {
	const [selectedId, setSelectedId] = useState();

	const handleRowSelection = (selectedItem) => {
		action("rowSelected")(selectedItem);
		setSelectedId(selectedItem.id);
	};

	return (
		<SolaceGridList
			items={testListItems}
			headers={testHeaders}
			onSelection={handleRowSelection}
			rowMapping={withActionColumnMapping}
			selectedItemId={selectedId}
			gridTemplate="minmax(120px, 1fr) minmax(120px, 1fr) 300px 40px"
			dataQa="demoDefaultList"
		/>
	);
};
