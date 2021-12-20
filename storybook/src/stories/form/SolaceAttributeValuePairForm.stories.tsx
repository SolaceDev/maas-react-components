import React, { useState } from "react";
import { ComponentMeta } from "@storybook/react";
import { SolaceAttributeValuePairForm } from "@SolaceDev/maas-react-components";

export default {
	title: "Forms/SolaceAttributeValuePairForm",
	component: SolaceAttributeValuePairForm,
	argTypes: {}
} as ComponentMeta<typeof SolaceAttributeValuePairForm>;

interface AVPItem {
	id?: string;
	key: string;
	value: string;
	type?: string;
}

interface SolaceAttributeValuePairFormProps {
	labelForKeys: string;
	labelForValues: string;
	initialAVPList: AVPItem[];
	onAVPListUpdate: (list: AVPItem[]) => void;
}

const SAMPLE_AVP_LIST = [
	{ key: "Jan", value: "January" },
	{ key: "Feb", value: "February" },
	{ key: "Mar", value: "March" },
	{ key: "Apr", value: "April" }
];

// eslint-disable-next-line sonarjs/no-identical-functions
export const WithoutInitialData = () => {
	const [currentList, setCurrentList] = useState([]);

	const handleListUpdate = (updatedList: Array<AVPItem>) => {
		setCurrentList(updatedList);
	};
	return (
		<div>
			<SolaceAttributeValuePairForm
				labelForKeys="Keys"
				labelForValues="Values"
				initialAVPList={currentList}
				onAVPListUpdate={handleListUpdate}
			/>
			<div style={{ marginTop: 20 }}>
				<div>Show me the data:</div>
				<div>{JSON.stringify(currentList)}</div>
			</div>
		</div>
	);
};

// eslint-disable-next-line sonarjs/no-identical-functions
export const WithData = () => {
	const [currentList, setCurrentList] = useState(SAMPLE_AVP_LIST);

	const handleListUpdate = (updatedList: Array<AVPItem>) => {
		setCurrentList(updatedList);
	};
	return (
		<div>
			<SolaceAttributeValuePairForm
				labelForKeys="Keys"
				labelForValues="Values"
				initialAVPList={currentList}
				onAVPListUpdate={handleListUpdate}
			/>
			<div style={{ marginTop: 20 }}>
				<div>Show me the data:</div>
				<div>{JSON.stringify(currentList)}</div>
			</div>
		</div>
	);
};
