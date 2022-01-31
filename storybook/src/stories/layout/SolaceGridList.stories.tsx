import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SolaceGridList, SolaceChip, SolaceMenu } from "@SolaceDev/maas-react-components";
import { useState } from "react";
import { MoreHorizOutlinedIcon } from "../../../../src/resources/icons/MoreHorizOutlinedIcon";

export default {
	title: "Layout/SolaceGridList",
	component: SolaceGridList,
	argTypes: { onSelection: { action: "rowSelected" } }
} as ComponentMeta<typeof SolaceGridList>;

const Template: ComponentStory<typeof SolaceGridList> = (args) => <SolaceGridList {...args} />;

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
		description: "The event mesh for accounting",
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
			name: "Environment 2",
			description: ENV_DESCRIPTION
		}
	},
	{
		createdTime: 1635527600270,
		updatedTime: 1635527600270,
		createdBy: "10lota8vwsr",
		changedBy: "10lota8vwsr",
		id: 4,
		name: "Event Mesh 4",
		description: "More borring description text",
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
		description: "The event mesh for accounting",
		environmentId: "environment2",
		type: "eventMesh",
		environment: {
			id: "environment2",
			name: "Environment 2",
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
				title: "More actions",
				variant: "icon",
				children: <MoreHorizOutlinedIcon />
			}}
		/>
	);
};

const basicRowMapping = (testItem) => {
	const itemCells = [];
	itemCells.push(<div key={`${testItem.id}-${testItem.name}`}>{testItem.name}</div>);
	itemCells.push(<div key={`${testItem.id}-${testItem.environment.name}`}>{testItem.environment.name}</div>);
	itemCells.push(<div key={`${testItem.id}-${testItem.description}`}>{testItem.description}</div>);
	return itemCells;
};

const customCellMapping = (testItem) => {
	const itemCells = [];
	itemCells.push(<div key={`${testItem.id}-${testItem.name}`}>{testItem.name}</div>);
	itemCells.push(
		<div key={`${testItem.id}-${testItem.environment.name}`}>
			<SolaceChip label={testItem.environment.name} />
		</div>
	);
	itemCells.push(<div key={`${testItem.id}-${testItem.description}`}>{testItem.description}</div>);
	return itemCells;
};

const withActionColumnMapping = (testItem) => {
	const itemCells = [];
	itemCells.push(<div key={`${testItem.id}-${testItem.name}`}>{testItem.name}</div>);
	itemCells.push(
		<div key={`${testItem.id}-${testItem.environment.name}`}>
			<SolaceChip label={testItem.environment.name} />
		</div>
	);
	itemCells.push(<div key={`${testItem.id}-${testItem.description}`}>{testItem.description}</div>);
	itemCells.push(<div style={{ justifySelf: "center" }}>{createActionMenu(testItem)}</div>);
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
			gridTemplate="minmax(120px, 1fr) minmax(120px, 1fr) 300px"
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
