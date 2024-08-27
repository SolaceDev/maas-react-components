/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "@rjsf/mui";
import { CustomProperty, getTemplates, getWidgets } from "./jsonSchemaFormUtils";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import { customizeValidator } from "@rjsf/validator-ajv8";
import Ajv2020 from "ajv/dist/2020";
import { styled } from "@mui/material";
import SolaceComponentProps from "../SolaceComponentProps";

const custom2020Validator = customizeValidator({ AjvClass: Ajv2020 });

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
					".MuiFormLabel-asterisk": {
						display: "none"
					},
					"> label .MuiFormLabel-asterisk": {
						display: "inline" // display only first asterisk on label
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

const hideProperties = (isHidden: any, uiSchema: UiSchema, properties: any) => {
	if (!properties) {
		return;
	}

	for (const property in properties) {
		// hide all errors - errors are displayed with custom widgets
		uiSchema[property] = { "ui:hideError": true };

		if (isHidden(FormFieldType.property, property, properties[property])) {
			// hide rjsf property widge
			uiSchema[property]["ui:widget"] = "hidden";
		} else if (isHidden(FormFieldType.description, property, properties[property])) {
			// hide rjsf property description via custom handling - descriptions are displayed with custom widgets
			uiSchema[property]["ui:description"] = CustomProperty.hidden;
		}

		// recursively hide nested properties
		hideProperties(isHidden, uiSchema, properties[property].properties);
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
	 * 	order?: string[]; // ordered property keys for display
	 *  isHidden?: () => boolean; // function to determine if field should be hidden
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
	 * Custom validator to use for the form.
	 */
	validator?: any;
}

function SolaceJsonSchemaForm({
	formItem,
	formData = {},
	formOptions = {},
	readOnly = false,
	disabled = false,
	onChange,
	transformDescription,
	transformError,
	transformWidget,
	transformTitle,
	validator
}: SolaceJsonSchemaFormProps) {
	const schema = formItem.schema as RJSFSchema;
	const { order, isHidden } = formOptions;

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

		hideProperties(isHidden, uiSchema, schema.properties);
	}

	/**
	 * Returns the transformed widget props with the first error message set as a custom error message for display
	 */
	function transformWidgetProps(props: any) {
		const newProps = transformWidget?.(props) ?? { ...props };
		const hasErrors = props.rawErrors && props.rawErrors.length > 0;

		if (hasErrors) {
			newProps[CustomProperty.error] = props.rawErrors.join(", ");
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
			key={formItem.id}
			idPrefix={formItem.id}
			schema={schema}
			uiSchema={uiSchema}
			validator={validator ?? custom2020Validator}
			widgets={getWidgets(transformWidgetProps)}
			templates={getTemplates(transformDescription, transformTitle)}
			formData={formData}
			onChange={handleOnChange}
			readonly={readOnly}
			disabled={disabled}
			liveValidate={true}
			showErrorList={false}
			transformErrors={transformErrors}
			data-qa={formItem.id}
		/>
	);
}

export default SolaceJsonSchemaForm;
