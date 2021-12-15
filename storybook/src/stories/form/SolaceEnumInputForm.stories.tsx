import React, { useState } from "react";
import { ComponentMeta } from "@storybook/react";

import { SolaceEnumInputForm } from "@SolaceDev/maas-react-components";

export default {
	title: "Forms/SolaceEnumValueInputForm",
	component: SolaceEnumInputForm,
	argTypes: {}
} as ComponentMeta<typeof SolaceEnumInputForm>;
interface EnumItem {
	name: string;
	displayName: string;
}
interface SolaceEnumInputFormProps {
	initialEnumList: EnumItem[];
	updateEnumList: (list: EnumItem[]) => void;
}

const ENUM_LIST = [
	{ name: "1", displayName: "Jan" },
	{ name: "2", displayName: "Feb" },
	{ name: "3", displayName: "March" },
	{ name: "4", displayName: "April" }
];

// eslint-disable-next-line sonarjs/no-identical-functions
export const WithoutInitialData = ({ initialEnumList }: SolaceEnumInputFormProps) => {
	const [currentList, setCurrentList] = useState(initialEnumList);

	const handleListUpdate = (updatedList: EnumItem[]) => {
		setCurrentList(updatedList);
	};
	return (
		<div>
			<SolaceEnumInputForm initialEnumList={initialEnumList} updateEnumList={handleListUpdate} />
			<div style={{ marginTop: 20 }}>
				<div>Show me the data:</div>
				<div>{JSON.stringify(currentList)}</div>
			</div>
		</div>
	);
};
WithoutInitialData.args = {
	initialEnumList: []
};

// eslint-disable-next-line sonarjs/no-identical-functions
export const WithData = ({ initialEnumList }: SolaceEnumInputFormProps) => {
	const [currentList, setCurrentList] = useState(initialEnumList);

	const handleListUpdate = (updatedList: EnumItem[]) => {
		setCurrentList(updatedList);
	};
	return (
		<div>
			<SolaceEnumInputForm initialEnumList={initialEnumList} updateEnumList={handleListUpdate} />
			<div style={{ marginTop: 20 }}>
				<div>Show me the data:</div>
				<div>{JSON.stringify(currentList)}</div>
			</div>
		</div>
	);
};
WithData.args = {
	initialEnumList: ENUM_LIST
};
