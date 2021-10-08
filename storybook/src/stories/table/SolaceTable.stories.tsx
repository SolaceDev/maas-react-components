import React from "react";
import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SolaceTable } from "@SolaceDev/maas-react-components";
import { SELECTION_TYPE, SORT_DIRECTION, TableColumn } from "../../../../src/components/table/SolaceTable";

export default {
	title: "Table/SolaceTable",
	component: SolaceTable,
	parameters: {
		design: {
			type: "figma",
			url: ""
		}
	},
	argTypes: {
		variant: {
			control: { type: "radio" }
		}
	}
} as ComponentMeta<typeof SolaceTable>;

const Template: ComponentStory<typeof SolaceTable> = (args) => <SolaceTable {...args} />;

const rows = [
	{
		id: 1,
		first_name: "Fern",
		last_name: "Vanstone",
		email: "fvanstone0@ft.com",
		gender: "Agender"
	},
	{
		id: 2,
		first_name: "Avery",
		last_name: "Delcastel",
		email: "adelcastel1@chicagotribune.com",
		gender: "Polygender"
	},
	{
		id: 3,
		first_name: "Shepard",
		last_name: "Bowering",
		email: "sbowering2@globo.com",
		gender: "Agender"
	},
	{
		id: 4,
		first_name: "Hana",
		last_name: "Wingeatt",
		email: "hwingeatt3@pcworld.com",
		gender: "Female"
	},
	{
		id: 5,
		first_name: "Cash",
		last_name: "Hull",
		email: "chull4@tiny.cc",
		gender: "Female"
	},
	{
		id: 6,
		first_name: "Deni",
		last_name: "Karsh",
		email: "dkarsh5@forbes.com",
		gender: "Agender"
	},
	{
		id: 7,
		first_name: "Katlin",
		last_name: "O'Grogane",
		email: "kogrogane6@narod.ru",
		gender: "Non-binary"
	},
	{
		id: 8,
		first_name: "Warner",
		last_name: "Spillard",
		email: "wspillard7@e-recht24.de",
		gender: "Polygender"
	},
	{
		id: 9,
		first_name: "Lazarus",
		last_name: "Trahear",
		email: "ltrahear8@telegraph.co.uk",
		gender: "Male"
	},
	{
		id: 10,
		first_name: "Veronike",
		last_name: "Malsher",
		email: "vmalsher9@twitpic.com",
		gender: "Polygender"
	}
];

const columns: TableColumn[] = [
	{
		field: "first_name",
		headerName: "First Name",
		sortable: true,
		disableToggling: true,
		sortDirection: SORT_DIRECTION.DCS
	},
	{
		headerName: "Last Name",
		field: "last_name",
		sortable: false,
		disableToggling: true,
		sortDirection: SORT_DIRECTION.DCS
	},
	{
		headerName: "Email",
		field: "email",
		sortable: true,
		disableToggling: true,
		sortDirection: SORT_DIRECTION.DCS
	},
	{
		headerName: "Gender",
		field: "gender",
		sortable: true,
		disableToggling: true,
		sortDirection: SORT_DIRECTION.DCS
	}
];

export const DefaultTable = Template.bind({});
DefaultTable.args = {
	selectionChangedCallback: action("selection callback"),
	sortCallback: action("sort callback"),
	rows: rows.slice(0, 3),
	columns: columns,
	selectionType: SELECTION_TYPE.MULTI
};
