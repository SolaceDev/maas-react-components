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
	const sensitiveField = props.schema.options?.format === "password";

	// state
	const [showSensitiveField, setShowSensitiveField] = useState(false);

	const fieldValue = useMemo(() => {
		let fieldValue = props.value ?? "";

		if (props) {
			if (props.readonly) {
				if (sensitiveField) {
					fieldValue = showSensitiveField ? fieldValue : "**********";
				} else {
					fieldValue = fieldValue ?? "-";
				}
			} else if (props.schema.const) {
				fieldValue = props.schema.const;
			}
		}

		return fieldValue;
	}, [props, sensitiveField, showSensitiveField]);

	const endAdornment = useMemo(() => {
		if (props && !props.readonly && sensitiveField) {
			return [
				<SolaceButton
					key={showSensitiveField ? "eyeIcon" : "hideEyeIcon"}
					dataQa={showSensitiveField ? "showPasswordButton" : "hidePasswordButton"}
					variant="icon"
					onClick={() => setShowSensitiveField(!showSensitiveField)}
				>
					{showSensitiveField ? <VisibilityShowIcon /> : <VisibilityHideIcon />}
				</SolaceButton>
			];
		}

		return undefined;
	}, [props, sensitiveField, showSensitiveField]);

	const errorMessage = props[CustomProperty.error] ?? "";

	return (
		<Box sx={{ display: props.readonly && sensitiveField ? "flex" : "block", flexDirection: "row", alignItems: "end" }}>
			{props.schema?.maxLength && props.schema?.maxLength > 100 ? (
				<SolaceTextArea
					name={props.name}
					label={props.label}
					onChange={(e) => onChangeTrigger(props, e)}
					value={fieldValue}
					readOnly={props.readonly}
					required={props.required && !props.readonly}
					disabled={props.disabled}
					width="100%"
					maxLength={props.schema.maxLength}
					dataQa={`${props.label}-form-textArea`}
					hasErrors={!!errorMessage}
					helperText={errorMessage || props.schema.description}
				></SolaceTextArea>
			) : (
				<SolaceTextField
					type={sensitiveField && !showSensitiveField ? "password" : "text"}
					label={props.label}
					name={props.name}
					onChange={(e) => onChangeTrigger(props, e)}
					value={fieldValue}
					readOnly={props.readonly}
					required={props.required && !props.readonly}
					disabled={props.disabled}
					endAdornment={endAdornment}
					dataQa={`${props.label}-form-textField`}
					hasErrors={!!errorMessage}
					helperText={errorMessage || props.schema.description}
				/>
			)}

			{props.readonly && sensitiveField && (
				<Box ml={1}>
					<SolaceButton
						key={showSensitiveField ? "eyeIcon" : "hideEyeIcon"}
						dataQa={showSensitiveField ? "showPasswordButton" : "hidePasswordButton"}
						variant="icon"
						onClick={() => setShowSensitiveField(!showSensitiveField)}
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
				helperText={errorMessage || props.schema.description}
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
			helperText={errorMessage}
			subTextProps={{ label: errorMessage ? "" : props.schema.description, light: true }}
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
		TextWidget: (props: WidgetProps) => CustomTextWidget(props, transformWidgetProps)
	};
};
