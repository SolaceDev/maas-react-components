import { SolaceJsonSchemaForm } from "@SolaceDev/maas-react-components";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/testing-library";

(SolaceJsonSchemaForm as React.FC & { displayName?: string }).displayName = "SolaceJsonSchemaForm";

//================================================================================

const thresholdProperties = {
	clearPercent: {
		title: "Clear Percent",
		type: "integer"
	},
	clearValue: {
		title: "Clear Value",
		type: "integer"
	},
	setPercent: {
		title: "Set Percent",
		type: "integer"
	},
	setValue: {
		title: "Set Value",
		type: "integer"
	}
};
const solaceQueueSchema = {
	$id: "https://solace.cloud/schemas/solace/msg-vpn-queue-2-31-0-v2.schema.json",
	type: "object",
	title: "SolaceMsgVpnQueue",
	$schema: "http://json-schema.org/draft-07/schema#all",
	properties: {
		accessType: {
			default: "exclusive",
			enum: ["exclusive", "non-exclusive"],
			title: "Access Type",
			type: "string"
		},
		consumerAckPropagationEnabled: {
			default: true,
			title: "Consumer Acknowledgement Propagation Enabled",
			type: "boolean"
		},
		deadMsgQueue: {
			default: "#DEAD_MSG_QUEUE",
			title: "Dead Message Queue",
			type: "string"
		},
		deliveryCountEnabled: {
			default: false,
			title: "Delivery Count Enabled",
			type: "boolean"
		},
		deliveryDelay: {
			default: 0,
			title: "Delivery Delay",
			type: "integer"
		},
		egressEnabled: {
			default: false,
			title: "Egress Enabled",
			type: "boolean"
		},
		eventBindCountThreshold: {
			properties: thresholdProperties,
			title: "Event Bind Count Threshold",
			type: "object"
		},
		eventMsgSpoolUsageThreshold: {
			properties: thresholdProperties,
			title: "Event Message Spool Usage Threshold",
			type: "object"
		},
		eventRejectLowPriorityMsgLimitThreshold: {
			properties: thresholdProperties,
			title: "Event Reject Low Priority Message Limit Threshold",
			type: "object"
		},
		ingressEnabled: {
			default: false,
			title: "Ingress Enabled",
			type: "boolean"
		},
		maxBindCount: {
			default: 1000,
			title: "Max Bind Count",
			type: "integer"
		},
		maxDeliveredUnackedMsgsPerFlow: {
			default: 10000,
			title: "Max Delivered Unacknowledged Messages Per Flow",
			type: "integer"
		},
		maxMsgSize: {
			default: 10000000,
			title: "Max Message Size",
			type: "integer"
		},
		maxMsgSpoolUsage: {
			default: 5000,
			title: "Max Message Spool Usage",
			type: "integer"
		},
		maxRedeliveryCount: {
			default: 0,
			title: "Max Redelivery Count",
			type: "integer"
		},
		maxTtl: {
			default: 0,
			title: "Max TTL",
			type: "integer"
		},
		partitionCount: {
			default: 0,
			title: "Partition Count",
			type: "integer"
		},
		partitionRebalanceDelay: {
			default: 3,
			title: "Partition Rebalance Delay",
			type: "integer"
		},
		partitionRebalanceMaxHandoffTime: {
			default: 30,
			title: "Partition Rebalance Max Handoff Time",
			type: "integer"
		},
		permission: {
			default: "no-access",
			enum: ["no-access", "consume", "modify-topic", "read-only", "delete"],
			title: "Permission",
			type: "string"
		},
		redeliveryDelayEnabled: {
			default: false,
			title: "Redelivery Delay Enabled",
			type: "boolean"
		},
		redeliveryDelayInitialInterval: {
			default: 1000,
			title: "Redelivery Delay Initial Interval",
			type: "integer"
		},
		redeliveryDelayMaxInterval: {
			default: 64000,
			title: "Redelivery Delay Max Interval",
			type: "integer"
		},
		redeliveryDelayMultiplier: {
			default: 200,
			title: "Redelivery Delay Multiplier",
			type: "integer"
		},
		redeliveryEnabled: {
			default: true,
			title: "Redelivery Enabled",
			type: "boolean"
		},
		rejectLowPriorityMsgEnabled: {
			default: false,
			title: "Reject Low Priority Message Enabled",
			type: "boolean"
		},
		rejectLowPriorityMsgLimit: {
			default: 0,
			title: "Reject Low Priority Message Limit",
			type: "integer"
		},
		rejectMsgToSenderOnDiscardBehavior: {
			default: "when-queue-enabled",
			enum: ["never", "when-queue-enabled", "always"],
			title: "Reject Message To Sender On Discard Behavior",
			type: "string"
		},
		respectMsgPriorityEnabled: {
			default: false,
			title: "Respect Message Priority Enabled",
			type: "boolean"
		},
		respectTtlEnabled: {
			default: false,
			title: "Respect TTL Enabled",
			type: "boolean"
		}
	}
};

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
			type: "boolean",
			readOnly: true // displayed in UI, but disabled
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
			const: "no-access", // not displayed in UI
			type: "string"
		},
		queueName: {
			pattern: "^sc_ep_[a-z]+$",
			description: "sc_ep_<squad>",
			placeholder: "sc_ep_event",
			type: "string"
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
	title: "Under Construction/SolaceJsonSchemaForm",
	component: SolaceJsonSchemaForm
};

type Story = StoryObj<typeof SolaceJsonSchemaForm>;

export default meta;
export const Default: Story = {
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
	}
};

export const PasswordFieldsWithDifferentConfigs: Story = {
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

export const SolaceQueue: Story = {
	args: {
		formItem: {
			id: "solaceQueue1",
			schema: solaceQueueSchema
		},
		onChange: (data, errors) => action("onChangeHandler")(data, errors)
	}
};

export const SolaceQueueWithCustomFields: Story = {
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
						return data?.const !== undefined || propertyName === "accessType";
					default:
						return false;
				}
			},
			tagName: "div"
		},
		onChange: (data, errors) => action("onChangeHandler")(data, errors),
		transformError: defaultTransformError,
		transformWidget: defaultTransform,
		transformTitle: defaultTransform
	}
};

export const SolaceQueueWithOrderedFields: Story = {
	args: {
		formItem: {
			id: "solaceQueue1",
			schema: solaceQueueSchemaPartial
		},
		formData: {
			queueName: "sc_ep_event"
		},
		formOptions: {
			order: ["deadMsgQueue", "queueName", "accessType", "maxMsgSpoolUsage"]
		},
		onChange: (data, errors) => action("onChangeHandler")(data, errors),
		transformError: defaultTransformError
	}
};
