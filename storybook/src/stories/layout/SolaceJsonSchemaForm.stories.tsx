/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { SolaceJsonSchemaForm } from "@SolaceDev/maas-react-components";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/testing-library";

(SolaceJsonSchemaForm as React.FC & { displayName?: string }).displayName = "SolaceJsonSchemaForm";

//================================================================================

const demoSchema = {
	type: "object",
	title: "DemoSchema",
	properties: {
		enumProp: {
			default: "exclusive",
			enum: ["exclusive", "non-exclusive"],
			description: "enumProp description",
			type: "string"
		},
		booleanProp: {
			default: true,
			description: "booleanProp description",
			type: "boolean"
		},
		stringProp: {
			default: "#DEAD_MSG_QUEUE",
			minLength: 10,
			maxLength: 30,
			description: "stringProp description",
			type: "string"
		},
		stringWithPatternProp: {
			pattern: "^sc_[a-z]+$",
			description: "sc_<squad>",
			placeholder: "sc_team",
			type: "string"
		},
		pairedProp: {
			properties: {
				clearPercent: {
					type: "integer",
					description: "nested description 1",
					const: 50
				},
				setPercent: {
					type: "integer",
					description: "nested description 2",
					default: 70
				}
			},
			required: ["setPercent"]
		},
		integerProp: {
			default: 5000,
			minimum: 1000,
			maximum: 10000,
			description: "integerProp description",
			type: "integer"
		},
		constProp: {
			const: "no-access",
			description: "constProp description",
			type: "string"
		},
		arrayProp: {
			type: "array",
			items: {
				type: "object",
				properties: {
					name: {
						type: "string",
						description: "name description",
						title: "Name"
					},
					accessLevel: {
						type: "integer",
						description: "access level description",
						title: "Access Level"
					}
				}
			}
		},
		longStringProp: {
			type: "string",
			description: "longStringProp description",
			maxLength: 500
		},
		longPasswordStringProp: {
			type: "string",
			description: "longPasswordStringProp description",
			format: "password",
			maxLength: 1000
		}
	},
	required: ["enumProp", "stringProp", "stringWithPatternProp"]
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
export const Standard: Story = {
	args: {
		formItem: {
			id: "person1",
			schema: {
				type: "object",
				title: "Person",
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
								type: "string",
								maxLength: 3
							}
						},
						required: ["option1"]
					},
					{
						title: "Option 2",
						type: "object",
						properties: {
							option2: {
								type: "string",
								minLength: 4
							}
						},
						required: ["option2"]
					}
				]
			}
		},
		formData: {
			option1: "abc"
		},
		onChange: (data, errors) => action("onChangeHandler")(data, errors)
	}
};

export const Arrays: Story = {
	args: {
		formItem: {
			id: "people",
			schema: {
				type: "object",
				properties: {
					people: {
						type: "array",
						title: "People",
						items: {
							type: "object",
							properties: {
								name: {
									title: "Name",
									type: "string"
								},
								accessLevel: {
									title: "Access Level",
									type: "integer"
								}
							}
						}
					}
				}
			}
		},
		formData: {
			people: [
				{ name: "Bob", accessLevel: 100 },
				{ name: "Boris", accessLevel: 75 }
			]
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
				title: "Person",
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
					},
					longContent: {
						type: "string",
						title: "Long Content",
						maxLength: 150
					}
				},
				required: ["name", "password"]
			}
		},
		formData: {
			password: "pw", // too short
			longContent: "a".repeat(151) // too long
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

export const Hidden: Story = {
	args: {
		formItem: {
			id: "demoSchema1",
			schema: demoSchema
		},
		formOptions: {
			isHidden: (fieldType, propertyName, data) => {
				switch (fieldType) {
					case "submitButton":
					case "title":
					case "description":
						return true;
					case "property":
						return data?.const !== undefined || propertyName === "stringLong";
					default:
						return false;
				}
			},
			tagName: "div"
		},
		formData: {
			arrayProp: [{ name: "Bob", accessLevel: 50 }],
			longPasswordStringProp: "x".repeat(500)
		},
		liveValidate: false,
		onChange: (data, errors) => action("onChangeHandler")(data, errors),
		transformError: defaultTransformError,
		transformWidget: defaultTransform,
		transformTitle: defaultTransform
	}
};

export const Ordered: Story = {
	args: {
		formItem: {
			id: "demoSchema1",
			schema: demoSchema
		},
		formData: {
			stringWithPatternProp: "sc_ui"
		},
		formOptions: {
			order: ["arrayProp", "stringProp", "longPasswordStringProp", "constProp", "integerProp"]
		},
		onChange: (data, errors) => action("onChangeHandler")(data, errors),
		transformError: defaultTransformError
	}
};

export const ReadOnly: Story = {
	args: {
		formItem: {
			id: "demoSchema1",
			schema: demoSchema
		},
		formData: {
			stringWithPatternProp: "sc_ui",
			arrayProp: [{ name: "Antti", accessLevel: 99 }],
			longPasswordStringProp: "it's a secret.",
			longStringProp: new Array(100).fill("item").join(",")
		},
		readOnly: true,
		onChange: (data, errors) => action("onChangeHandler")(data, errors),
		transformError: defaultTransformError
	}
};
