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

import { DescriptionFieldProps, RegistryWidgetsType, RJSFSchema, TitleFieldProps, WidgetProps } from "@rjsf/utils";
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

const isPasswordField = (schema: RJSFSchema) => {
	return schema.options?.format === "password" || schema.format === "password";
};
const getMaxLength = (schema: RJSFSchema, value: string, readonly = false) => {
	// if readonly and maxLength is set, use the length of the data to reduce empty space
	if (readonly) {
		return schema.maxLength ? value.length : schema.maxLength;
	}

	return schema.maxLength;
};

const CustomTextWidget = function (
	widgetProps: WidgetProps,
	transformWidgetProps?: (props: WidgetProps) => WidgetProps
) {
	const props = transformWidgetProps ? transformWidgetProps(widgetProps) : widgetProps;
	const { disabled, label, name, readonly, required, schema, value } = props;

	const errorMessage = props[CustomProperty.error] ?? "";
	const helperMessage = readonly ? "" : errorMessage || schema.description;
	const isSensitiveField = isPasswordField(schema);

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

	const sensitiveFieldToggle = useMemo(() => {
		if (isSensitiveField) {
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
	}, [isSensitiveField, showSensitiveField]);

	const maxLength = getMaxLength(schema, fieldValue, readonly);
	return (
		<Box
			sx={{
				display: isSensitiveField ? "grid" : "block",
				gridTemplateColumns: "1fr auto",
				alignItems: "flex-end",
				overflow: "hidden"
			}}
		>
			{maxLength && maxLength > 100 ? (
				<SolaceTextArea
					name={name}
					label={label}
					onChange={(e) => onChangeTrigger(props, e)}
					value={fieldValue}
					readOnly={readonly}
					required={required && !readonly}
					disabled={disabled}
					width="100%"
					maxLength={maxLength + 1} // add one to the maxLength to display error message to user
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
					endAdornment={!readonly ? sensitiveFieldToggle : undefined}
					hasErrors={!!errorMessage}
					helperText={helperMessage}
					placeholder={schema.placeholder ?? ""}
					dataQa={`${label}-form-textField`}
				/>
			)}
			{readonly && sensitiveFieldToggle ? <Box ml={1}>{sensitiveFieldToggle}</Box> : null}
		</Box>
	);
};

const CustomSelectWidget = function (
	widgetProps: WidgetProps,
	transformWidgetProps?: (props: WidgetProps) => WidgetProps
) {
	const props = transformWidgetProps ? transformWidgetProps(widgetProps) : widgetProps;
	const { disabled, id, label, name, options, readonly, required, schema, title, value } = props;
	const errorMessage = props[CustomProperty.error] ?? "";
	const helperMessage = readonly ? "" : errorMessage || schema.description;

	return options.enumOptions !== undefined ? (
		<Box mb={props.id.includes("oneof") ? 2 : 0}>
			<SolaceSelect
				label={label}
				name={name}
				onChange={(e) => onChangeTrigger(props, e)}
				value={value}
				readOnly={readonly}
				required={required && !readonly}
				disabled={disabled}
				title={title}
				id={id}
				hasErrors={!!errorMessage}
				helperText={helperMessage}
				dataQa={`${id}-form-select`}
			>
				{options.enumOptions.map((option) => (
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
	const { disabled, label, name, readonly, required, schema, value } = props;
	const errorMessage = props[CustomProperty.error] ?? "";
	const helperMessage = readonly ? "" : errorMessage || schema.description;

	return (
		<SolaceCheckBox
			name={name}
			label={label}
			onChange={(e) => props.onChange(e.value)}
			readOnly={readonly}
			required={required && !readonly}
			disabled={disabled}
			checked={value}
			hasErrors={!!errorMessage}
			helperText={helperMessage}
			dataQa={`${label}-form-checkbox`}
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
