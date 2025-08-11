<<<<<<< HEAD:storybook/src/stories/layout/jsonSchemaForm/SolaceJsonSchemaForm.stories.tsx
import React from "react";
=======
import { expect } from "@storybook/jest";
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

>>>>>>> main:storybook/src/stories/layout/SolaceJsonSchemaForm.stories.tsx
import { SolaceJsonSchemaForm } from "@SolaceDev/maas-react-components";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/testing-library";

(SolaceJsonSchemaForm as React.FC & { displayName?: string }).displayName = "SolaceJsonSchemaForm";

//================================================================================

const demoSchema = {
	type: "object",
	title: "DemoSchema",
	description: "added by me",
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

const OPTION_A_FIELD = "Option A Field";

const comprehensiveSchema = {
	type: "object",
	title: "Comprehensive Form Test",
	description: "Tests all hiding scenarios in one schema",
	properties: {
		// Basic fields from demoSchema
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
		constProp: {
			const: "no-access",
			description: "constProp description (should be hidden)",
			type: "string"
		},
		longStringProp: {
			type: "string",
			description: "longStringProp description (should be hidden)",
			maxLength: 500
		},

		// Nested object testing
		nestedObject: {
			type: "object",
			title: "Nested Object",
			properties: {
				visibleNested: {
					type: "string",
					title: "Visible Nested",
					description: "This nested field should be visible"
				},
				hiddenNested: {
					type: "string",
					title: "Hidden Nested",
					description: "This nested field should be hidden"
				},
				deeplyNested: {
					type: "object",
					title: "Deeply Nested",
					properties: {
						visibleDeep: {
							type: "string",
							title: "Visible Deep",
							description: "This deeply nested field should be visible"
						},
						hiddenDeep: {
							type: "string",
							title: "Hidden Deep",
							description: "This deeply nested field should be hidden"
						}
					}
				}
			}
		},

		// AnyOf conditional testing
		conditionalSection: {
			type: "object",
			title: "Conditional Section",
			properties: {
				conditionalField: {
					anyOf: [
						{
							title: "Option A",
							type: "object",
							properties: {
								OPTION_A_FIELD: {
									type: "string",
									title: OPTION_A_FIELD
								},
								hiddenInA: {
									type: "string",
									title: "Hidden in A"
								}
							}
						},
						{
							title: "Option B",
							type: "object",
							properties: {
								optionB: {
									type: "string",
									title: "Option B Field"
								},
								hiddenInB: {
									type: "string",
									title: "Hidden in B"
								}
							}
						}
					]
				},
				regularNested: {
					type: "string",
					title: "Regular Nested Field"
				}
			}
		}
	},
	required: ["enumProp", "stringProp"]
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
	parameters: {}
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
			id: "comprehensiveHiding",
			schema: comprehensiveSchema
		},
		formOptions: {
			isHidden: (fieldType, propertyName, data) => {
				switch (fieldType) {
					case "submitButton":
					case "title":
					case "description":
						return true;
					case "property":
						// Hide fields based on property name patterns
						return (
							data?.const !== undefined ||
							propertyName === "longStringProp" ||
							propertyName === "hiddenNested" ||
							propertyName === "hiddenDeep" ||
							propertyName === "hiddenInA" ||
							propertyName === "hiddenInB"
						);
					default:
						return false;
				}
			},
			tagName: "div"
		},
		formData: {
			enumProp: "exclusive",
			stringProp: "test value",
			booleanProp: true,
			constProp: "no-access",
			longStringProp: "should be hidden",
			nestedObject: {
				visibleNested: "visible nested value",
				hiddenNested: "this should be hidden",
				deeplyNested: {
					visibleDeep: "visible deep value",
					hiddenDeep: "this should also be hidden"
				}
			},
			conditionalSection: {
				conditionalField: {
					OPTION_A_FIELD: "option A value",
					hiddenInA: "this should be hidden"
				},
				regularNested: "regular nested value"
			}
		},
		liveValidate: false,
		onChange: (data, errors) => action("onChangeHandler")(data, errors),
		transformError: defaultTransformError,
		transformWidget: defaultTransform,
		transformTitle: defaultTransform
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step("Test basic field hiding", async () => {
			// Assert visible basic fields are present
			expect(canvas.getByText("enumProp")).toBeInTheDocument();
			expect(canvas.getByText("stringProp")).toBeInTheDocument();
			expect(canvas.getByText("booleanProp")).toBeInTheDocument();

			// Assert hidden basic fields are not present
			expect(canvas.queryByText("longStringProp")).not.toBeInTheDocument();
			expect(canvas.queryByText("constProp")).not.toBeInTheDocument();
		});

		await step("Test nested field hiding", async () => {
			// Assert visible nested fields are present
			expect(canvas.getByText("Visible Nested")).toBeInTheDocument();
			expect(canvas.getByText("Visible Deep")).toBeInTheDocument();

			// Assert hidden nested fields are not present
			expect(canvas.queryByText("Hidden Nested")).not.toBeInTheDocument();
			expect(canvas.queryByText("Hidden Deep")).not.toBeInTheDocument();
		});

		await step("Test anyOf conditional hiding - Option A", async () => {
			// Assert Option A is initially selected and visible
			expect(canvas.getByText(OPTION_A_FIELD)).toBeInTheDocument();
			expect(canvas.getByDisplayValue("option A value")).toBeInTheDocument();
			expect(canvas.getByText("Regular Nested Field")).toBeInTheDocument();

			// Assert hiddenInA field is not present
			expect(canvas.queryByText("Hidden in A")).not.toBeInTheDocument();
		});

		await step("Test anyOf conditional hiding - Option B", async () => {
			// Switch to Option B
			const dropdown = canvas.getAllByText("Option A");
			await userEvent.click(dropdown[0]);

			await new Promise((resolve) => setTimeout(resolve, 500));
			await userEvent.keyboard("[ArrowDown]");
			await userEvent.keyboard("[Enter]");

			// Wait for form to update
			await new Promise((resolve) => setTimeout(resolve, 100));

			// Assert Option B field is now visible
			expect(canvas.getByLabelText("Option B Field")).toBeInTheDocument();

			// Assert hiddenInB field is not present
			expect(canvas.queryByLabelText("Hidden in B")).not.toBeInTheDocument();

			// Assert Option A field is no longer visible
			expect(canvas.queryByLabelText(OPTION_A_FIELD)).not.toBeInTheDocument();
		});

		await step("Test form structure integrity", async () => {
			// Assert submit button and titles are hidden
			expect(canvas.queryByRole("button", { name: "Submit" })).not.toBeInTheDocument();
			expect(canvas.queryByText("Comprehensive Form Test")).not.toBeInTheDocument();
			expect(canvas.queryByText("Tests all hiding scenarios in one schema")).not.toBeInTheDocument();
		});
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
