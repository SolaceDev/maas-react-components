import React, { useState, useCallback } from "react";
import { ComponentMeta } from "@storybook/react";
import { SolaceAttributeValuePairForm } from "@SolaceDev/maas-react-components";
import { useEffect } from "react";

export default {
	title: "Forms/SolaceAttributeValuePairForm",
	component: SolaceAttributeValuePairForm,
	argTypes: {}
} as ComponentMeta<typeof SolaceAttributeValuePairForm>;

const kafkaTopicPattern = /^[A-Za-z0-9-_.]*$/;
const unspecifiedEnumValuePattern = /^[A-Za-z0-9]*$/;
const solaceTopicPattern = /^[^/*#!>]*$/;

// custom Emum input validation
const validateEnumInput = (currentInput, values: Array<any>) => {
	let error = "";
	// validate individual input values
	if (currentInput.trim().length === 0) {
		error = "Cannot be blank";
	} else if (!currentInput.match(kafkaTopicPattern)) {
		// use kafka topic pattern for all enum value validation for simplicity
		error = "Can only contain alphanumeric characters, dots, dashes and underscores";
	} else if (currentInput.length > 40) {
		error = "Must not exceed 40 characters";
	}

	// validate the input against the current list
	if (currentInput.trim().length > 0) {
		const duplicatedValues = values.filter((value) => value.key === currentInput);
		if (duplicatedValues.length > 1) {
			error = "Must be unique";
		}
	}

	return error;
};
interface AVPItem {
	id?: string;
	key: string;
	value: string;
	keyErrorText?: string;
	valueErrorText?: string;
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
				name="avpForm"
				labelForKeys="Keys"
				labelForValues="Values"
				initialAVPList={[]}
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
	const [currentList, setCurrentList] = useState([]);

	const handleListUpdate = (updatedList: Array<AVPItem>) => {
		setCurrentList(updatedList);
	};
	return (
		<div>
			<SolaceAttributeValuePairForm
				name="avpForm"
				labelForKeys="Keys"
				labelForValues="Values"
				initialAVPList={SAMPLE_AVP_LIST}
				onAVPListUpdate={handleListUpdate}
			/>
			<div style={{ marginTop: 20 }}>
				<div>Show me the data:</div>
				<div>{JSON.stringify(currentList)}</div>
			</div>
		</div>
	);
};

export const UpdateData = () => {
	const [initialList, setInitialList] = useState([]);
	const [currentList, setCurrentList] = useState([]);

	// or this can be an async function that fetches the data to update initialList
	const updateInitialAVPList = (updatedInitList: Array<AVPItem>) => {
		setInitialList(updatedInitList);
	};

	const handleListUpdate = (updatedList: Array<AVPItem>) => {
		setCurrentList(updatedList);
	};

	return (
		<div>
			<SolaceAttributeValuePairForm
				name="updateAVPForm"
				labelForKeys="Keys"
				labelForValues="Values"
				initialAVPList={initialList}
				onAVPListUpdate={handleListUpdate}
			/>
			<button onClick={() => updateInitialAVPList(SAMPLE_AVP_LIST)}>Update Data</button>
			<div style={{ marginTop: 20 }}>
				<div>Current data:</div>
				<div>{JSON.stringify(currentList)}</div>
			</div>
		</div>
	);
};

export const ReadOnly = () => {
	return (
		<div>
			<SolaceAttributeValuePairForm
				name="avpForm"
				readOnly={true}
				labelForKeys="Keys"
				labelForValues="Values"
				initialAVPList={SAMPLE_AVP_LIST}
			/>
		</div>
	);
};

const SAMPLE_AVP_LIST_WITH_FALSE_VALUES = [
	{ key: "", value: "January" },
	{ key: "Feb", value: "February" },
	{ key: "Feb", value: "March" },
	{ key: "@April", value: "April" }
];

export const WithValidation = () => {
	const [currentList, setCurrentList] = useState<Array<AVPItem>>(SAMPLE_AVP_LIST_WITH_FALSE_VALUES);
	const [enumValidated, setEnumValidated] = useState(true);

	useEffect(() => {
		const errors = currentList.filter((item) => item.keyErrorText || item.valueErrorText);
		if (errors.length > 0) {
			setEnumValidated(false);
		} else {
			setEnumValidated(true);
		}
	}, [currentList]);

	const handleListUpdate = (updatedList: Array<AVPItem>) => {
		setCurrentList(updatedList);
	};

	return (
		<div>
			<SolaceAttributeValuePairForm
				name="avpForm"
				initialAVPList={currentList}
				onAVPListUpdate={handleListUpdate}
				avpKeyValidationCallback={validateEnumInput}
			/>
			<div style={{ marginTop: 20 }}>
				<div>
					Is form OK: <b>{enumValidated ? "Yes" : "No"}</b>
				</div>
				<div>Show me the data:</div>
				<div>{JSON.stringify(currentList)}</div>
			</div>
		</div>
	);
};
