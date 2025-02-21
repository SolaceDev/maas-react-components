import { SolaceJsonSchemaForm } from "@SolaceDev/maas-react-components";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/testing-library";

(SolaceJsonSchemaForm as React.FC & { displayName?: string }).displayName = "SolaceJsonSchemaForm";

//================================================================================

const solaceQueueSchemaPartial = {
	type: "object",
	title: "SolaceMsgVpnQueue",
	properties: {
		accessType: {
			default: "exclusive",
			enum: ["exclusive", "non-exclusive"],
			description: "Specifies how multiple consumer flows are bound to the queue",
			type: "string"
		},
		consumerAckPropagationEnabled: {
			default: true,
			description: "Enables or disables the propagation of consumer acknowledgments",
			type: "boolean"
		},
		deadMsgQueue: {
			default: "#DEAD_MSG_QUEUE",
			minLength: 10,
			maxLength: 30,
			description: "Queue receive messages that are discarded from one or more queues or topic endpoints",
			type: "string"
		},
		eventBindCountThreshold: {
			properties: {
				clearPercent: {
					type: "integer",
					const: 50
				},
				setPercent: {
					type: "integer",
					default: 70
				}
			},
			required: ["setPercent"]
		},
		maxMsgSpoolUsage: {
			default: 5000,
			minimum: 1000,
			maximum: 10000,
			description: "Message spool size should support the number of messages the spool may need to store",
			type: "integer"
		},
		permission: {
			const: "no-access",
			type: "string"
		},
		queueName: {
			pattern: "^sc_ep_[a-z]+$",
			description: "sc_ep_<squad>",
			placeholder: "sc_ep_event",
			type: "string"
		},
		owners: {
			type: "array",
			title: "Owners",
			items: {
				type: "object",
				properties: {
					name: {
						type: "string",
						title: "Name"
					},
					level: {
						type: "string",
						title: "Level"
					}
				}
			}
		}
	},
	required: ["accessType", "deadMsgQueue", "queueName"]
};

const defaultTransformError = (error) => {
	const { name, message } = error;
	let newMessage;

	if (name === "required") {
		newMessage = "Required. Enter a value";
	} else if (message) {
		newMessage = `Value ${message}`;
	} else if (name) {
		// i.e. no detail message
		newMessage = "Value is invalid";
	}
	error.message = newMessage;

	return error;
};

const defaultTransform = (props) => {
	const newProps = { ...props };

	if (newProps.label === "queueName") {
		// properties have labels
		newProps.label = "Queue Name";
	} else if (newProps.title === "eventBindCountThreshold") {
		// titles have descriptions
		newProps.title = "Event Bind Count Threshold";
	}

	return newProps;
};

//================================================================================

const meta: Meta<typeof SolaceJsonSchemaForm> = {
	title: "Layout/Form/Dynamic",
	component: SolaceJsonSchemaForm
};

type Story = StoryObj<typeof SolaceJsonSchemaForm>;

export default meta;
export const BasicForm: Story = {
	args: {
		formItem: {
			id: "person1",
			schema: {
				type: "object",
				title: "SolacePerson",
				properties: {
					name: {
						type: "string",
						title: "Name"
					},
					password: {
						title: "Password",
						type: "string",
						options: {
							format: "password"
						}
					}
				}
			}
		},
		onChange: (data) => action("onChangeHandler")(data)
	},
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceJsonSchemaForm"
			}
		}
	}
};

export const Password: Story = {
	args: {
		formItem: {
			id: "password1",
			schema: {
				type: "object",
				title: "Passwords",
				properties: {
					passwordFieldWithOptions: {
						type: "string",
						options: {
							format: "password"
						}
					},
					passwordFieldWithoutOptions: {
						type: "string",
						format: "password"
					}
				}
			}
		},
		onChange: (data) => action("onChangeHandler")(data)
	}
};

export const AnyOf: Story = {
	args: {
		formItem: {
			id: "anyOf",
			schema: {
				type: "object",
				anyOf: [
					{
						title: "Option 1",
						type: "object",
						properties: {
							option1: {
								type: "string"
							}
						}
					},
					{
						title: "Option 2",
						type: "object",
						properties: {
							option2: {
								type: "integer"
							}
						}
					}
				]
			}
		},
		onChange: (data) => action("onChangeHandler")(data)
	}
};

export const List: Story = {
	args: {
		formItem: {
			id: "people",
			schema: {
				type: "object",
				properties: {
					people: {
						type: "array",
						title: "List of people",
						items: {
							type: "object",
							properties: {
								name: {
									type: "string",
									title: "Name"
								},
								height: {
									type: "number",
									title: "Height (cm)"
								}
							},
							required: ["name"]
						}
					}
				}
			}
		},
		formData: {
			people: [{ name: "Bob", height: 170 }]
		},
		onChange: (data) => action("onChangeHandler")(data)
	}
};

export const Validation: Story = {
	args: {
		formItem: {
			id: "person1",
			schema: {
				type: "object",
				title: "SolacePerson",
				properties: {
					name: {
						type: "string",
						title: "Name"
					},
					password: {
						type: "string",
						title: "Password",
						options: {
							format: "password"
						},
						minLength: 6,
						maxLength: 8
					}
				},
				required: ["name", "password"]
			}
		},
		formData: {
			password: "otters_r_us" // too long
		},
		onChange: (data, errors) => action("onChangeHandler")(data, errors),
		transformError: defaultTransformError
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// trigger to display validation error
		await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
	}
};

export const HiddenFields: Story = {
	args: {
		formItem: {
			id: "solaceQueue1",
			schema: solaceQueueSchemaPartial
		},
		formOptions: {
			isHidden: (fieldType, propertyName, data) => {
				switch (fieldType) {
					case "submitButton":
					case "title":
					case "description":
						return true;
					case "property":
						return data?.const !== undefined || propertyName === "accessType" || propertyName === "secret";
					default:
						return false;
				}
			},
			tagName: "div"
		},
		formData: {
			owners: [{ name: "Bob", level: "Read" }]
		},
		liveValidate: false,
		onChange: (data, errors) => action("onChangeHandler")(data, errors),
		transformError: defaultTransformError,
		transformWidget: defaultTransform,
		transformTitle: defaultTransform
	}
};

export const OrderedFields: Story = {
	args: {
		formItem: {
			id: "solaceQueue1",
			schema: solaceQueueSchemaPartial
		},
		formData: {
			queueName: "sc_ep_event"
		},
		formOptions: {
			order: ["owners", "deadMsgQueue", "queueName", "accessType", "maxMsgSpoolUsage"]
		},
		onChange: (data, errors) => action("onChangeHandler")(data, errors),
		transformError: defaultTransformError
	}
};

export const ReadOnly: Story = {
	args: {
		formItem: {
			id: "solaceQueue1",
			schema: solaceQueueSchemaPartial
		},
		formData: {
			queueName: "sc_ep_event",
			owners: [{ name: "Antti", level: "Write" }]
		},
		readOnly: true,
		onChange: (data, errors) => action("onChangeHandler")(data, errors),
		transformError: defaultTransformError
	}
};
