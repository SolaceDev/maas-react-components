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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "@rjsf/mui";
import { CustomProperty, getTemplates, getWidgets } from "./jsonSchemaFormUtils";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import { customizeValidator } from "@rjsf/validator-ajv8";
import Ajv2020 from "ajv/dist/2020";
import { styled } from "@mui/material";
import SolaceComponentProps from "../SolaceComponentProps";
import { ElementType } from "react";
import Ajv from "ajv";

enum FormFieldType {
	description = "description",
	property = "property",
	submitButton = "submitButton",
	title = "title"
}
interface FormItem {
	id: string; // unique id for the form
	schema: unknown; // must be castable to RJSFSchema
}
interface FormOptions {
	order?: string[];
	isHidden?: (fieldType: FormFieldType, propertyName?: string, data?: any) => boolean;
	tagName?: ElementType<any> | undefined;
}

/**
 * Custom form component to override Form styles built into rjsf
 */
const CustomForm = styled(Form)(({ theme }) => ({
	".solaceJsonSchemaForm": {
		maxWidth: "585px",
		".MuiTypography-root": {
			padding: theme.spacing(3, 0), // form titles

			"&.MuiTypography-caption": {
				display: "none" // hide form captions
			}
		},
		".MuiFormControl-root": {
			".MuiGrid-root": {
				padding: 0,
				margin: `0 16px 0 0 !important` // override rjsf element margin styles
			},
			".form-group.field": {
				paddingBottom: theme.spacing(2), // form fields

				"&.field-error ul": {
					display: "none" // hide error list
				},

				".MuiBox-root": {
					"label .MuiFormLabel-asterisk": {
						display: "none"
					},
					"label[for] .MuiFormLabel-asterisk": {
						display: "inline" // display only first asterisk on label for input
					}
				}
			},
			".form-group.field-array": {
				// override rjsf array styles
				".MuiPaper-root": {
					boxShadow: "none",
					border: `1px solid ${theme.palette.ux.secondary.w20}`,
					padding: 0,
					margin: theme.spacing(1, 0, 0, 0)
				},
				".MuiTypography-root": {
					padding: theme.spacing(1, 0)
				},
				".form-group.field": {
					paddingBottom: theme.spacing(2),
					"&.field-object": {
						paddingBottom: 0
					}
				}
			}
		}
	}
}));

/**
 * Returns the order of the form items ensuring there is an asterisk to include all fields
 */
const getOrder = (order: any) => {
	let uiOrder;

	if (order?.length > 0) {
		if (!order.includes("*")) {
			order.push("*");
		}

		uiOrder = order;
	}

	return uiOrder;
};

/**
 * Recursively hides properties based on the isHidden function
 */
const hideProperties = (isHidden: any, uiSchema: UiSchema, schema: any) => {
	if (!schema) {
		return;
	}

	const properties = schema.properties;

	if (properties) {
		for (const property in properties) {
			// hide all errors - errors are displayed with custom widgets
			uiSchema[property] = { "ui:hideError": true };

			if (isHidden(FormFieldType.property, property, properties[property])) {
				// hide rjsf property widget
				uiSchema[property]["ui:widget"] = "hidden";
			} else if (isHidden(FormFieldType.description, property, properties[property])) {
				// hide rjsf property description via custom handling - descriptions are displayed with custom widgets
				uiSchema[property]["ui:description"] = CustomProperty.hidden;
			}
		}

		hideProperties(isHidden, uiSchema, properties);
	} else if (typeof schema === "object") {
		for (const property in schema) {
			hideProperties(isHidden, uiSchema, schema[property]);
		}
	}
};

export interface SolaceJsonSchemaFormProps extends SolaceComponentProps {
	/*
	 * The form item to render with an id and schema.
	 *
	 * id: string; // unique id for the form
	 * schema: unknown; // must be castable to RJSFSchema
	 */
	formItem: FormItem;
	/**
	 * The form data to render in the form.
	 */
	formData?: Record<string, unknown>;
	/**
	 * The form options to customize the form, including:
	 *
	 *  order?: string[]; // ordered property keys for display
	 *  isHidden?: () => boolean; // function to determine if field should be hidden,
	 *  tagName?: ElementType<any> | undefined; // tag name (eg. "div") to replace "form" and support embedding in other forms
	 */
	formOptions?: FormOptions;
	/*
	 * Whether the form is read-only.
	 */
	readOnly?: boolean;
	/**
	 * Whether the form is disabled.
	 */
	disabled?: boolean;
	/**
	 * Can be used in trigger form validation manually
	 * e.g. formRef.current.validateForm()
	 */
	formRef?: any;
	/**
	 * Whether to validate the form data live
	 */
	liveValidate?: boolean;
	/**
	 * Callback function when the form data changes.
	 */
	onChange?: (formData: any, formErrors: any[]) => void;
	/**
	 * Function to transform the description widget props.
	 */
	transformDescription?: (props: any) => any;
	/**
	 * Function to transform the error message.
	 */
	transformError?: (error: { name: string; message: string }) => any;
	/**
	 * Function to transform the widget props.
	 */
	transformWidget?: (props: any) => any;
	/**
	 * Function to transform the title widget props.
	 */
	transformTitle?: (props: any) => any;
	/**
	 * Custom Ajv to use for the form, default to Ajv2020.
	 */
	ajvClass?: typeof Ajv;
}

function SolaceJsonSchemaForm({
	formItem,
	formData = {},
	formOptions = {},
	readOnly = false,
	disabled = false,
	formRef,
	liveValidate = true,
	onChange,
	transformDescription,
	transformError,
	transformWidget,
	transformTitle,
	ajvClass
}: Readonly<SolaceJsonSchemaFormProps>) {
	const schema = formItem.schema as RJSFSchema;
	const { order, isHidden, tagName } = formOptions;
	const customValidator = customizeValidator({ AjvClass: ajvClass ?? Ajv2020 });

	/**
	 * Build the uiSchema to support:
	 * - overriding default styles
	 * - ordering form items
	 * - hiding widgets/properties
	 */
	const uiSchema: UiSchema = {
		"ui:classNames": "solaceJsonSchemaForm"
	};

	uiSchema["ui:order"] = getOrder(order);

	if (isHidden) {
		if (isHidden(FormFieldType.submitButton)) {
			uiSchema["ui:submitButtonOptions"] = { norender: true };
		}

		if (isHidden(FormFieldType.title)) {
			uiSchema["ui:options"] = { label: false };
		}

		hideProperties(isHidden, uiSchema, schema);
	}

	/**
	 * Returns the transformed widget props with the first error message set as a custom error message for display
	 */
	function transformWidgetProps(props: any) {
		const newProps = transformWidget?.(props) ?? { ...props };
		const hasErrors = props.rawErrors && props.rawErrors.length > 0;

		if (hasErrors) {
			newProps[CustomProperty.error] = Array.from(new Set(props.rawErrors)).join(", ");
		}

		return newProps;
	}

	/**
	 * Returns all errors, transformed by the provided function if it exists
	 */
	function transformErrors(errors: any[]) {
		if (!transformError) {
			return errors;
		}

		return errors.map((error) => {
			return transformError?.(error) ?? error;
		});
	}

	function handleOnChange(data: any) {
		onChange?.(data.formData, data.errors);
	}

	return (
		<CustomForm
			tagName={tagName}
			key={formItem.id}
			idPrefix={formItem.id}
			schema={schema}
			uiSchema={uiSchema}
			validator={customValidator}
			widgets={getWidgets(transformWidgetProps)}
			templates={getTemplates(transformDescription, transformTitle)}
			formData={formData}
			onChange={handleOnChange}
			readonly={readOnly}
			disabled={disabled}
			liveValidate={liveValidate}
			showErrorList={false}
			transformErrors={transformErrors}
			data-qa={formItem.id}
			ref={formRef}
		/>
	);
}

export default SolaceJsonSchemaForm;
