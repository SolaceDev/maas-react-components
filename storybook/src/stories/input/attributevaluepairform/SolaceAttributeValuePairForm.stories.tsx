import React, { useState } from "react";
import { Meta } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";

import {
	InfoIcon,
	SolaceAttributeValuePairForm,
	SolaceTooltip,
	TooltipVariant,
	Typography,
	useTheme
} from "@SolaceDev/maas-react-components";

(SolaceAttributeValuePairForm as React.FC & { displayName?: string }).displayName = "SolaceAttributeValuePairForm";

export default {
	title: "Input/Textfield/Attribute Pair",
	component: SolaceAttributeValuePairForm,
	args: {
		id: "",
		name: "",
		labelForKeys: "Keys",
		labelForValues: "Values",
		avpList: [],
		hasWarnings: false,
		hasErrors: false,
		helperText: "",
		disableReorder: false,
		readOnly: false,
		emptyFieldDisplayValue: "",
		enableRequiredKeyFieldIndicator: false,
		keyIsRequiredMessage: "",
		avpListMaxHeight: "",
		virtualizedAvpListOption: undefined
	},
	parameters: {
		docs: {
			story: { height: "500px" },
			description: {
				component: "Code component name: SolaceAttributeValuePairForm"
			}
		}
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description:
				"Unique identifier for the attribute value pair form component. Used for accessibility and programmatic access.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		name: {
			control: { type: "text" },
			description: "Name attribute for the form component.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		labelForKeys: {
			control: { type: "text" },
			description: "Label text or component for the keys column.",
			table: {
				type: { summary: "string | ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		labelForValues: {
			control: { type: "text" },
			description: "Label text or component for the values column.",
			table: {
				type: { summary: "string | ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		avpList: {
			control: { type: "object" },
			description: "Array of key-value pairs to display in the form.",
			table: {
				type: { summary: "Array<AVPItem>" },
				defaultValue: { summary: "[]" }
			}
		},
		onAVPListUpdate: {
			description: "Callback function triggered when the list is updated."
		},
		hasWarnings: {
			control: { type: "boolean" },
			description:
				"If true, displays the attribute value pair form in a warning state with amber styling. Use this to indicate potential issues or cautionary information about the form content.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		hasErrors: {
			control: { type: "boolean" },
			description: "If true, displays the form in an error state.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		helperText: {
			control: { type: "text" },
			description: "Additional text displayed below the form for guidance or error messages.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		disableReorder: {
			control: { type: "boolean" },
			description: "If true, disables the ability to reorder items in the list.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		readOnly: {
			control: { type: "boolean" },
			description: "If true, makes the form read-only.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		emptyFieldDisplayValue: {
			control: { type: "text" },
			description: "Value to display for empty fields in read-only mode.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		enableRequiredKeyFieldIndicator: {
			control: { type: "boolean" },
			description: "If true, shows required field indicators for keys.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		keyIsRequiredMessage: {
			control: { type: "text" },
			description: "Custom message for required key validation.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		avpKeyValidationCallback: {
			description: "Custom validation function for key fields."
		},
		avpValueValidationCallback: {
			description: "Custom validation function for value fields."
		},
		avpListMaxHeight: {
			control: { type: "text" },
			description: "Maximum height for the list container.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		virtualizedAvpListOption: {
			control: { type: "object" },
			description: "Configuration for virtualized list rendering.",
			table: {
				type: {
					summary:
						"{ height?: number, increaseViewportBy?: number, useWindowScrolling?: boolean, initialTopMostItemIndex?: number }"
				},
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceAttributeValuePairForm>;

const kafkaTopicPattern = /^[A-Za-z0-9-_.]*$/;

// custom Enum input validation
const validateEnumInput = (currentInput, values: Array<AVPItem>) => {
	const MAX_KEY_CHARACTERS = 40;
	let error = "";

	// validate only alpha-numeric values
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

	if (currentInput?.length > MAX_KEY_CHARACTERS) {
		error = `Enumeration value can not exceed ${MAX_KEY_CHARACTERS} characters`;
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

const generateAVPList = (count: number): Array<AVPItem> => {
	const list: Array<AVPItem> = [];
	for (let i = 0; i < count; i++) {
		list.push({ key: `${AVP_KEY} ${i}`, value: `${AVP_VALUE} ${i}` });
	}
	return list;
};

const Component = ({ ...args }) => {
	const [currentAVPList, setAVPList] = useState<AVPItem[]>(args?.avpList ? args.avpList : []);
	return (
		<div>
			<SolaceAttributeValuePairForm
				name="avpForm"
				labelForKeys="Keys"
				labelForValues="Values"
				avpList={currentAVPList}
				onAVPListUpdate={setAVPList}
				{...args}
			/>
			{args?.showOutput && (
				<div style={{ marginTop: 20 }}>
					<Typography variant="h6">👇 Returned Data 👇</Typography>
					<pre>{JSON.stringify(currentAVPList, null, 2)}</pre>
				</div>
			)}
		</div>
	);
};

export const Default = {
	render: Component,
	args: { showOutput: true }
};

export const WithInitialData = {
	render: Component,
	args: {
		showOutput: true,
		avpList: SAMPLE_AVP_LIST.map((item) => ({ ...item }))
	}
};

const HELPER_TEXT = "This Attribute Value Pair Form has helper text";

export const WithHelperText = {
	render: Component,
	args: {
		avpList: SAMPLE_AVP_LIST.map((item) => ({ ...item })),
		helperText: HELPER_TEXT
	}
};

export const WithWarnings = {
	render: Component,
	args: {
		avpList: SAMPLE_AVP_LIST.map((item) => ({ ...item })),
		hasWarnings: true,
		helperText: HELPER_TEXT
	}
};

export const WithErrors = {
	render: Component,
	args: {
		avpList: SAMPLE_AVP_LIST.map((item) => ({ ...item })),
		hasErrors: true,
		helperText: HELPER_TEXT
	}
};

export const WithReOrderingDisabled = {
	render: Component,
	args: {
		avpList: SAMPLE_AVP_LIST.map((item) => ({ ...item })),
		disableReorder: true
	}
};

export const ReadOnly = {
	render: Component,
	args: {
		avpList: SAMPLE_AVP_LIST_READ_ONLY.map((item) => ({ ...item })),
		readOnly: true
	}
};

export const ReadOnlyWithEmptyFieldDisplayValue = {
	render: Component,
	args: {
		avpList: SAMPLE_AVP_LIST_MISSING_VALUES.map((item) => ({ ...item })),
		readOnly: true,
		emptyFieldDisplayValue: "-"
	}
};

export const UpdateData = {
	render: Component,
	args: {
		name: "avpForm",
		labelForKeys: "Keys",
		labelForValues: "Values"
	},

	play: async ({ canvasElement }) => {
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
	},

	parameters: {
		// Delay snapshot 10 seconds until all interactions are done
		chromatic: { delay: 10000 }
	}
};

export const MissingMandatoryKeyValidation = {
	render: Component,
	args: {
		name: "avpForm",
		enableRequiredKeyFieldIndicator: true
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		await userEvent.click(await canvas.findByTestId(`${AVP_VALUE}-0`));
		await userEvent.type(await canvas.findByTestId(`${AVP_VALUE}-0`), "January", {
			delay: 100
		});
		await userEvent.click(await canvas.findByTestId(`${AVP_VALUE}-1`));
	},

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { delay: 5000 }
	}
};

export const MissingMandatoryKeyWithCustomMessage = {
	render: Component,
	args: {
		name: "avpForm",
		enableRequiredKeyFieldIndicator: true,
		keyIsRequiredMessage: "Enumeration key is required"
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		await userEvent.click(await canvas.findByTestId(`${AVP_VALUE}-0`));
		await userEvent.type(await canvas.findByTestId(`${AVP_VALUE}-0`), "January", {
			delay: 100
		});
		await userEvent.click(await canvas.findByTestId(`${AVP_KEY}-1`));
	},

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { delay: 5000 }
	}
};

const SAMPLE_AVP_LIST_WITH_FALSE_VALUES = [
	{ key: "Jan", value: "January" },
	{ key: "Jan", value: "February" },
	{ key: "March", value: "@March" },
	{ key: "@April", value: "Message Longer Than 40 Characters........" }
];

export const WithCustomValidation = {
	render: Component,
	args: {
		name: "avpForm",
		enableRequiredKeyFieldIndicator: true,
		avpKeyValidationCallback: validateEnumInput,
		avpValueValidationCallback: validateEnumInput
	},

	play: async ({ canvasElement }) => {
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
	},

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { delay: 5000 }
	}
};

const Title = (props: { label: string }) => {
	const theme = useTheme();
	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			{props.label}
			<SolaceTooltip variant={TooltipVariant.rich} maxWidth="full" title="Important information">
				<div style={{ display: "flex", marginLeft: theme.spacing(0.5) }}>
					<InfoIcon size={20} fill={theme.palette.ux.secondary.wMain} />
				</div>
			</SolaceTooltip>
		</div>
	);
};

export const WithCustomLabels = {
	render: Component,
	args: {
		labelForKeys: <Title label="Key" />,
		labelForValues: <Title label="Value" />
	}
};

export const WithInitialLargeData = {
	render: Component,
	args: {
		showOutput: false,
		avpList: generateAVPList(100)
	}
};

export const WithInitialLargeDataFixHeight = {
	render: Component,
	args: {
		showOutput: true,
		avpList: generateAVPList(100),
		avpListMaxHeight: "500px"
	}
};

export const WithInitialLargeDataFixedHeightWithVirtualizedList = {
	render: Component,
	args: {
		showOutput: true,
		avpList: generateAVPList(100),
		virtualizedAvpListOption: {
			height: 500,
			increaseViewportBy: 50
		}
	}
};

export const WithInitialLargeDataFixedHeightWithVirtualizedListInitialIndex = {
	render: Component,
	args: {
		showOutput: true,
		avpList: generateAVPList(100),
		virtualizedAvpListOption: {
			height: 500,
			increaseViewportBy: 50,
			initialTopMostItemIndex: 25
		}
	}
};

export const WithInitialLargeDataReadOnlyFixedHeightWithVirtualizedList = {
	render: Component,
	args: {
		showOutput: false,
		avpList: generateAVPList(100),
		readOnly: true,
		virtualizedAvpListOption: {
			height: 500,
			increaseViewportBy: 50
		}
	}
};

export const WithInitialLargeDataDisableReorderFixedHeightWithVirtualizedList = {
	render: Component,
	args: {
		showOutput: false,
		avpList: generateAVPList(100),
		disableReorder: true,
		virtualizedAvpListOption: {
			height: 500,
			increaseViewportBy: 50
		}
	}
};

export const WithInitialLargeDataFullWindowWithVirtualizedList = {
	render: Component,
	args: {
		showOutput: false,
		avpList: generateAVPList(100),
		virtualizedAvpListOption: {
			useWindowScrolling: true,
			increaseViewportBy: 50
		}
	}
};

export const WithInitialLargeDataReadOnlyFullWindowWithVirtualizedList = {
	render: Component,
	args: {
		showOutput: false,
		avpList: generateAVPList(100),
		readOnly: true,
		virtualizedAvpListOption: {
			useWindowScrolling: true,
			increaseViewportBy: 50
		}
	}
};

export const WithInitialLargeDataDisableReorderFullWindowVirtualizedList = {
	render: Component,
	args: {
		showOutput: false,
		avpList: generateAVPList(100),
		disableReorder: true,
		virtualizedAvpListOption: {
			useWindowScrolling: true,
			increaseViewportBy: 50
		}
	}
};
