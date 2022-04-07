import React, { useState } from "react";
import { ComponentMeta } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";

import { SolaceAttributeValuePairForm } from "@SolaceDev/maas-react-components";
import { useEffect } from "react";

export default {
	title: "Forms/SolaceAttributeValuePairForm",
	component: SolaceAttributeValuePairForm,
	argTypes: {}
} as ComponentMeta<typeof SolaceAttributeValuePairForm>;

const kafkaTopicPattern = /^[A-Za-z0-9-_.]*$/;

// custom Emum input validation
const validateEnumInput = (currentInput, values: Array<any>) => {
	let error = "";
	// validate only alph-numeric values
	if (!currentInput.match(kafkaTopicPattern)) {
		// use kafka topic pattern for all enum value validation for simplicity
		error = "Can only contain alphanumeric characters, dots, dashes and underscores";
	}

	// validate key uniqueness
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
	{ key: "Apr", value: "    April" },
	{ key: "May", value: "  May Again  " }
];

const SAMPLE_AVP_LIST_READ_ONLY = [
	{ key: "Jan", value: "January" },
	{ key: "Feb", value: "February" },
	{ key: "Mar", value: "March" },
	{ key: "Apr", value: "April" }
];

const SAMPLE_AVP_LIST_MISSING_VALUES = [
	{ key: "Jan", value: "January" },
	{ key: "Feb", value: "" },
	{ key: "Mar", value: "March" },
	{ key: "Apr", value: undefined }
];

const AVP_KEY = "avpKey";
const AVP_VALUE = "avpValue";

export const Default = () => {
	const [currentAVPList, setAVPList] = useState([]);

	const handleListUpdate = (updatedList: Array<AVPItem>) => {
		setAVPList(updatedList);
	};

	return (
		<div>
			<SolaceAttributeValuePairForm
				name="avpForm"
				labelForKeys="Keys"
				labelForValues="Values"
				avpList={currentAVPList}
				onAVPListUpdate={handleListUpdate}
			/>
			<div style={{ marginTop: 20 }}>
				<div>Returned Data:</div>
				<div>{JSON.stringify(currentAVPList)}</div>
			</div>
		</div>
	);
};

export const WithInitialData = () => {
	const list = SAMPLE_AVP_LIST.map((item) => ({ ...item }));
	const [currentAVPList, setAVPList] = useState(list);

	const handleListUpdate = (updatedList: Array<AVPItem>) => {
		setAVPList(updatedList);
	};

	return (
		<div>
			<SolaceAttributeValuePairForm
				name="avpForm"
				labelForKeys="Keys"
				labelForValues="Values"
				avpList={currentAVPList}
				onAVPListUpdate={handleListUpdate}
			/>
			<div style={{ marginTop: 20 }}>
				<div>Returned Data:</div>
				<div>{JSON.stringify(currentAVPList)}</div>
			</div>
		</div>
	);
};

export const ReadOnly = () => {
	const data = SAMPLE_AVP_LIST_READ_ONLY.map((item) => ({ ...item }));
	return (
		<div>
			<SolaceAttributeValuePairForm
				name="avpForm"
				readOnly={true}
				labelForKeys="Keys"
				labelForValues="Values"
				avpList={data}
			/>
		</div>
	);
};

export const ReadOnlyWithEmptyFieldDisplayValue = () => {
	const data = SAMPLE_AVP_LIST_MISSING_VALUES.map((item) => ({ ...item }));
	return (
		<div>
			<SolaceAttributeValuePairForm
				name="avpForm"
				readOnly={true}
				labelForKeys="Keys"
				labelForValues="Values"
				avpList={data}
				emptyFieldDisplayValue="-"
			/>
		</div>
	);
};

export const UpdateData = () => {
	const list = [];
	const [currentAVPList, setAVPList] = useState(list);

	const handleListUpdate = (updatedList: Array<AVPItem>) => {
		setAVPList(updatedList);
	};

	return (
		<div>
			<SolaceAttributeValuePairForm
				name="avpForm"
				labelForKeys="Keys"
				labelForValues="Values"
				avpList={currentAVPList}
				onAVPListUpdate={handleListUpdate}
			/>
			<div style={{ marginTop: 20 }}>
				<div>Returned Data:</div>
				<div>{JSON.stringify(currentAVPList)}</div>
			</div>
		</div>
	);
};
UpdateData.play = async ({ canvasElement }) => {
	// Starts querying the component from it's root element
	const canvas = within(canvasElement);

	// input first AVP data
	await userEvent.click(await canvas.findByTestId(`${AVP_KEY}-0`));
	await userEvent.type(await canvas.findByTestId(`${AVP_KEY}-0`), SAMPLE_AVP_LIST[0].key, {
		delay: 100
	});
	await userEvent.click(await canvas.findByTestId(`${AVP_VALUE}-0`));
	await userEvent.type(await canvas.findByTestId(`${AVP_VALUE}-0`), SAMPLE_AVP_LIST[0].value, {
		delay: 100
	});

	// input second AVP data
	await userEvent.click(await canvas.findByTestId(`${AVP_KEY}-1`));
	await userEvent.type(await canvas.findByTestId(`${AVP_KEY}-1`), SAMPLE_AVP_LIST[1].key, {
		delay: 100
	});
	await userEvent.click(await canvas.findByTestId(`${AVP_VALUE}-1`));
	await userEvent.type(await canvas.findByTestId(`${AVP_VALUE}-1`), SAMPLE_AVP_LIST[1].value, {
		delay: 100
	});

	// input third AVP data
	await userEvent.click(await canvas.findByTestId(`${AVP_KEY}-2`));
	await userEvent.type(await canvas.findByTestId(`${AVP_KEY}-2`), SAMPLE_AVP_LIST[2].key, {
		delay: 100
	});
	await userEvent.click(await canvas.findByTestId(`${AVP_VALUE}-2`));
	await userEvent.type(await canvas.findByTestId(`${AVP_VALUE}-2`), SAMPLE_AVP_LIST[2].value, {
		delay: 100
	});

	// input forth AVP data
	await userEvent.click(await canvas.findByTestId(`${AVP_KEY}-3`));
	await userEvent.type(await canvas.findByTestId(`${AVP_KEY}-3`), SAMPLE_AVP_LIST[3].key, {
		delay: 100
	});
	await userEvent.click(await canvas.findByTestId(`${AVP_VALUE}-3`));
	await userEvent.type(await canvas.findByTestId(`${AVP_VALUE}-3`), SAMPLE_AVP_LIST[3].value, {
		delay: 100
	});

	// input fifth AVP data
	await userEvent.click(await canvas.findByTestId(`${AVP_KEY}-4`));
	await userEvent.type(await canvas.findByTestId(`${AVP_KEY}-4`), SAMPLE_AVP_LIST[4].key, {
		delay: 100
	});
	await userEvent.click(await canvas.findByTestId(`${AVP_VALUE}-4`));
	await userEvent.type(await canvas.findByTestId(`${AVP_VALUE}-4`), SAMPLE_AVP_LIST[4].value, {
		delay: 100
	});

	await userEvent.click(await canvas.findByTestId(`${AVP_KEY}-5`));
};

export const MissingMandatoryKeyValidation = () => {
	const data = [];
	const [avpList, setAVPList] = useState<Array<AVPItem>>(data);

	const handleListUpdate = (updatedList: Array<AVPItem>) => {
		setAVPList(updatedList);
	};

	return (
		<SolaceAttributeValuePairForm
			name="avpForm"
			avpList={avpList}
			onAVPListUpdate={handleListUpdate}
			enableRequiredKeyFieldIndicator={true}
		/>
	);
};
MissingMandatoryKeyValidation.play = async ({ canvasElement }) => {
	// Starts querying the component from it's root element
	const canvas = within(canvasElement);

	await userEvent.click(await canvas.findByTestId(`${AVP_VALUE}-0`));
	await userEvent.type(await canvas.findByTestId(`${AVP_VALUE}-0`), "January", {
		delay: 100
	});
	await userEvent.click(await canvas.findByTestId(`${AVP_VALUE}-1`));
};

export const MissingMandatoryKeyWithCustomMessage = () => {
	const data = [];
	const [avpList, setAVPList] = useState<Array<AVPItem>>(data);

	const handleListUpdate = (updatedList: Array<AVPItem>) => {
		setAVPList(updatedList);
	};

	return (
		<SolaceAttributeValuePairForm
			name="avpForm"
			avpList={avpList}
			onAVPListUpdate={handleListUpdate}
			enableRequiredKeyFieldIndicator={true}
			keyIsRequiredMessage="Enumeration key is required"
		/>
	);
};
MissingMandatoryKeyWithCustomMessage.play = async ({ canvasElement }) => {
	// Starts querying the component from it's root element
	const canvas = within(canvasElement);

	await userEvent.click(await canvas.findByTestId(`${AVP_VALUE}-0`));
	await userEvent.type(await canvas.findByTestId(`${AVP_VALUE}-0`), "January", {
		delay: 100
	});
	await userEvent.click(await canvas.findByTestId(`${AVP_KEY}-1`));
};

const SAMPLE_AVP_LIST_WITH_FALSE_VALUES = [
	{ key: "Jan", value: "January" },
	{ key: "Jan", value: "February" },
	{ key: "March", value: "March" },
	{ key: "@April", value: "April" }
];

export const WithCustomValidation = () => {
	const data = [];
	const [currentAVPList, setAVPList] = useState<Array<AVPItem>>(data);

	const handleListUpdate = (updatedList: Array<AVPItem>) => {
		setAVPList(updatedList);
	};

	return (
		<SolaceAttributeValuePairForm
			name="avpForm"
			avpList={currentAVPList}
			onAVPListUpdate={handleListUpdate}
			avpKeyValidationCallback={validateEnumInput}
			enableRequiredKeyFieldIndicator={true}
		/>
	);
};
WithCustomValidation.play = async ({ canvasElement }) => {
	// Starts querying the component from it's root element
	const canvas = within(canvasElement);

	// input first AVP data
	await userEvent.click(await canvas.findByTestId(`${AVP_KEY}-0`));
	await userEvent.type(await canvas.findByTestId(`${AVP_KEY}-0`), SAMPLE_AVP_LIST_WITH_FALSE_VALUES[0].key, {
		delay: 100
	});
	await userEvent.click(await canvas.findByTestId(`${AVP_VALUE}-0`));
	await userEvent.type(await canvas.findByTestId(`${AVP_VALUE}-0`), SAMPLE_AVP_LIST_WITH_FALSE_VALUES[0].value, {
		delay: 100
	});

	// input second AVP data
	await userEvent.click(await canvas.findByTestId(`${AVP_KEY}-1`));
	await userEvent.type(await canvas.findByTestId(`${AVP_KEY}-1`), SAMPLE_AVP_LIST_WITH_FALSE_VALUES[1].key, {
		delay: 100
	});
	await userEvent.click(await canvas.findByTestId(`${AVP_VALUE}-1`));
	await userEvent.type(await canvas.findByTestId(`${AVP_VALUE}-1`), SAMPLE_AVP_LIST_WITH_FALSE_VALUES[1].value, {
		delay: 100
	});

	// input third AVP data
	await userEvent.click(await canvas.findByTestId(`${AVP_KEY}-2`));
	await userEvent.type(await canvas.findByTestId(`${AVP_KEY}-2`), SAMPLE_AVP_LIST_WITH_FALSE_VALUES[2].key, {
		delay: 100
	});
	await userEvent.click(await canvas.findByTestId(`${AVP_VALUE}-2`));
	await userEvent.type(await canvas.findByTestId(`${AVP_VALUE}-2`), SAMPLE_AVP_LIST_WITH_FALSE_VALUES[2].value, {
		delay: 100
	});

	// input forth AVP data
	await userEvent.click(await canvas.findByTestId(`${AVP_KEY}-3`));
	await userEvent.type(await canvas.findByTestId(`${AVP_KEY}-3`), SAMPLE_AVP_LIST_WITH_FALSE_VALUES[3].key, {
		delay: 100
	});
	await userEvent.click(await canvas.findByTestId(`${AVP_VALUE}-3`));
	await userEvent.type(await canvas.findByTestId(`${AVP_VALUE}-3`), SAMPLE_AVP_LIST_WITH_FALSE_VALUES[3].value, {
		delay: 100
	});

	await userEvent.click(await canvas.findByTestId(`${AVP_KEY}-4`));
};
