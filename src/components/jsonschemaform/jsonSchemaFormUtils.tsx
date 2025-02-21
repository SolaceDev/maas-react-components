import { DescriptionFieldProps, RegistryWidgetsType, TitleFieldProps, WidgetProps } from "@rjsf/utils";
import { isEmpty, toString } from "lodash";
import { useMemo, useState } from "react";
import SolaceButton from "../form/SolaceButton";
import SolaceCheckBox from "../form/SolaceCheckBox";
import SolaceSelect from "../form/SolaceSelect";
import SolaceTextArea from "../form/SolaceTextArea";
import SolaceTextField from "../form/SolaceTextField";
import SolaceTypography from "../SolaceTypography";
import { VisibilityShowIcon } from "../../resources/icons/VisibilityShowIcon";
import { VisibilityHideIcon } from "../../resources/icons/VisibilityHideIcon";
import { Box, MenuItem } from "@mui/material";

export enum CustomProperty {
	error = "x-custom-error",
	hidden = "x-custom-hidden"
}

const EMPTY_VALUE = "-";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onChangeTrigger = (props: any, e: any) => {
	const value = e.value;

	if (isEmpty(toString(value))) {
		props.onChange(undefined);
	} else {
		props.onChange(value);
	}
};

const CustomTextWidget = function (
	widgetProps: WidgetProps,
	transformWidgetProps?: (props: WidgetProps) => WidgetProps
) {
	const props = transformWidgetProps ? transformWidgetProps(widgetProps) : widgetProps;
	const { disabled, label, name, readonly, required, schema, value } = props;

	const errorMessage = props[CustomProperty.error] ?? "";
	const helperMessage = readonly ? "" : errorMessage || schema.description;
	const isSensitiveField = schema.options?.format === "password" || schema.format === "password";

	// state
	const [showSensitiveField, setShowSensitiveField] = useState(false);

	const fieldValue = useMemo(() => {
		let fieldValue = value ?? "";

		if (readonly) {
			if (isSensitiveField) {
				fieldValue = showSensitiveField ? fieldValue : "**********";
			} else {
				fieldValue = fieldValue || EMPTY_VALUE;
			}
		} else if (schema.const) {
			fieldValue = schema.const;
		}

		return fieldValue;
	}, [value, readonly, schema.const, isSensitiveField, showSensitiveField]);

	const endAdornment = useMemo(() => {
		if (!readonly && isSensitiveField) {
			return [
				<SolaceButton
					key={showSensitiveField ? "eyeIcon" : "hideEyeIcon"}
					variant="icon"
					onClick={() => setShowSensitiveField(!showSensitiveField)}
					dataQa={showSensitiveField ? "showPasswordButton" : "hidePasswordButton"}
				>
					{showSensitiveField ? <VisibilityShowIcon /> : <VisibilityHideIcon />}
				</SolaceButton>
			];
		}

		return undefined;
	}, [isSensitiveField, readonly, showSensitiveField]);

	return (
		<Box sx={{ display: readonly && isSensitiveField ? "flex" : "block", flexDirection: "row", alignItems: "end" }}>
			{schema.maxLength && schema.maxLength > 100 ? (
				<SolaceTextArea
					name={name}
					label={label}
					onChange={(e) => onChangeTrigger(props, e)}
					value={fieldValue}
					readOnly={readonly}
					required={required && !readonly}
					disabled={disabled}
					width="100%"
					maxLength={schema.maxLength}
					hasErrors={!!errorMessage}
					helperText={helperMessage}
					placeholder={schema.placeholder ?? ""}
					dataQa={`${label}-form-textArea`}
				></SolaceTextArea>
			) : (
				<SolaceTextField
					type={isSensitiveField && !showSensitiveField ? "password" : "text"}
					label={label}
					name={name}
					onChange={(e) => onChangeTrigger(props, e)}
					value={fieldValue}
					readOnly={readonly}
					required={required && !readonly}
					disabled={disabled}
					endAdornment={endAdornment}
					hasErrors={!!errorMessage}
					helperText={helperMessage}
					placeholder={schema.placeholder ?? ""}
					dataQa={`${label}-form-textField`}
				/>
			)}

			{readonly && isSensitiveField && (
				<Box ml={1}>
					<SolaceButton
						key={showSensitiveField ? "eyeIcon" : "hideEyeIcon"}
						variant="icon"
						onClick={() => setShowSensitiveField(!showSensitiveField)}
						dataQa={showSensitiveField ? "showPasswordButton" : "hidePasswordButton"}
					>
						{showSensitiveField ? <VisibilityShowIcon /> : <VisibilityHideIcon />}
					</SolaceButton>
				</Box>
			)}
		</Box>
	);
};

const CustomSelectWidget = function (
	widgetProps: WidgetProps,
	transformWidgetProps?: (props: WidgetProps) => WidgetProps
) {
	const props = transformWidgetProps ? transformWidgetProps(widgetProps) : widgetProps;
	const errorMessage = props[CustomProperty.error] ?? "";
	const helperMessage = props.readonly ? "" : errorMessage || props.schema.description;

	return props.options.enumOptions !== undefined ? (
		<Box mb={props.id.includes("oneof") ? 2 : 0}>
			<SolaceSelect
				label={props.label}
				name={props.name}
				onChange={(e) => onChangeTrigger(props, e)}
				value={props.value}
				readOnly={props.readonly}
				required={props.required && !props.readonly}
				disabled={props.disabled}
				title={props.title}
				id={props.id}
				hasErrors={!!errorMessage}
				helperText={helperMessage}
				dataQa={`${props.id}-form-select`}
			>
				{props.options.enumOptions.map((option) => (
					<MenuItem value={option.value} key={option.label}>
						{option.label}
					</MenuItem>
				))}
			</SolaceSelect>
		</Box>
	) : (
		<></>
	);
};

const CustomCheckboxWidget = function (
	widgetProps: WidgetProps,
	transformWidgetProps?: (props: WidgetProps) => WidgetProps
) {
	const props = transformWidgetProps ? transformWidgetProps(widgetProps) : widgetProps;
	const errorMessage = props[CustomProperty.error] ?? "";
	const helperMessage = props.readonly ? "" : errorMessage || props.schema.description;

	return (
		<SolaceCheckBox
			name={props.name}
			label={props.label}
			onChange={(e) => props.onChange(e.value)}
			readOnly={props.readonly}
			required={props.required && !props.readonly}
			disabled={props.disabled}
			checked={props.value}
			hasErrors={!!errorMessage}
			helperText={helperMessage}
			dataQa={`${props.label}-form-checkbox`}
		/>
	);
};

function CustomDescriptionFieldTemplate(
	templateProps: DescriptionFieldProps,
	transformTemplateProps?: (props: DescriptionFieldProps) => DescriptionFieldProps
) {
	const props = transformTemplateProps ? transformTemplateProps(templateProps) : templateProps;
	const { description, id } = props;

	return description === CustomProperty.hidden ? null : <SolaceTypography id={id}>{description}</SolaceTypography>;
}

function CustomTitleFieldTemplate(
	templateProps: TitleFieldProps,
	transformTemplateProps?: (props: TitleFieldProps) => TitleFieldProps
) {
	const props = transformTemplateProps ? transformTemplateProps(templateProps) : templateProps;
	const { id, title } = props;

	return title === CustomProperty.hidden ? null : (
		<SolaceTypography id={id} variant="h5">
			{title}
		</SolaceTypography>
	);
}

export const getTemplates = (
	transformDescriptionProps?: (props: DescriptionFieldProps) => DescriptionFieldProps,
	transformTitleProps?: (props: TitleFieldProps) => TitleFieldProps
) => {
	return {
		DescriptionFieldTemplate: (props: DescriptionFieldProps) =>
			CustomDescriptionFieldTemplate(props, transformDescriptionProps),
		TitleFieldTemplate: (props: TitleFieldProps) => CustomTitleFieldTemplate(props, transformTitleProps)
	};
};

export const getWidgets = (transformWidgetProps?: (props: WidgetProps) => WidgetProps): RegistryWidgetsType => {
	return {
		CheckboxWidget: (props: WidgetProps) => CustomCheckboxWidget(props, transformWidgetProps),
		SelectWidget: (props: WidgetProps) => CustomSelectWidget(props, transformWidgetProps),
		TextWidget: (props: WidgetProps) => CustomTextWidget(props, transformWidgetProps),
		PasswordWidget: (props: WidgetProps) => CustomTextWidget(props, transformWidgetProps)
	};
};
