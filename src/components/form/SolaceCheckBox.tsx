import { Box, Checkbox, FormHelperText, useTheme, FormLabel } from "@material-ui/core";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import React, { useEffect, useState } from "react";
import SolaceComponentProps from "../SolaceComponentProps";
import SolaceHTMLAttributeProps from "../SolaceHTMLAttributesProps";
import {
	IndeterminateCheckBoxIcon,
	RestingCheckBoxIcon,
	SelectedCheckBoxIcon
} from "../../resources/icons/CheckBoxIcons";
import clsx from "clsx";

export interface SolaceCheckboxChangeEvent {
	name: string;
	value: boolean;
}

export interface SolaceCheckBoxProps extends SolaceComponentProps {
	/**
	 * Unique identifier ... if `id` is not specified, `name` value will be used in order to make `label` accessible for screen readers
	 */
	id?: string;
	/**
	 * Name attribute to assign to the `checkbox` element
	 */
	name: string;
	/**
	 * the label content to display on the screen
	 */
	label?: string | JSX.Element;
	/**
	 * The text to display as the tooltip hint
	 */
	title?: string;
	/**
	 * Content to display as supportive/explanitory text
	 */
	subTextProps?: { label?: string | JSX.Element; light?: boolean };
	/**
	 * Content to display as supportive/explanitory text
	 */
	helperText?: string | JSX.Element;
	/**
	 * Boolean flag to mark the `input` in error state
	 */
	hasErrors?: boolean;
	/**
	 * Boolean flag to check or uncheck the `checkbox`
	 */
	checked?: boolean;
	/**
	 * Boolean flag used to display an indicator of whether or not this `checkbox` is mandatory
	 */
	required?: boolean;
	/**
	 * Boolean flag to disable the `checkbox`
	 */
	disabled?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `checkbox` is changed
	 */
	onChange?: (event: SolaceCheckboxChangeEvent) => void;
	/**
	 * Boolean flag to set the checkbox to indeterminate
	 */
	indeterminate?: boolean;
	/**
	 * Boolean flag to set the checkbox to readOnly
	 */
	readOnly?: boolean;
	/**
	 * Boolean flag to allow font weight of medium (default to regular) for label
	 */
	boldLabel?: boolean;
	/**
	 * Display the label with a larger font
	 */
	largeLabel?: boolean;
}

interface CheckBoxLabelProps {
	id: string;
	htmlForId?: string;
	required: boolean;
	disabled: boolean;
	bold: boolean;
	large: boolean;
	children?: JSX.Element | string;
}

function CheckBoxLabel({
	id,
	htmlForId,
	required = false,
	disabled = false,
	bold = false,
	large = false,
	children
}: CheckBoxLabelProps): JSX.Element {
	const theme = useTheme();
	return (
		<FormLabel
			id={id}
			htmlFor={htmlForId}
			required={required}
			disabled={disabled}
			sx={{ display: "block", fontSize: large ? theme.typography.subtitle1 : theme.typography.body1 }}
			className={clsx({ "bold-label": bold, "check-box-label": true })}
		>
			{children}
		</FormLabel>
	);
}

const SolaceCheckBox = ({
	id,
	name,
	label,
	title,
	helperText,
	hasErrors = false,
	checked = false,
	required = false,
	disabled = false,
	indeterminate = false,
	readOnly = false,
	boldLabel = false,
	largeLabel = false,
	subTextProps = { label: "", light: false },
	onChange,
	dataQa,
	dataTags
}: SolaceCheckBoxProps): JSX.Element => {
	const theme = useTheme();
	const [selected, setSelected] = useState(checked);

	useEffect(() => {
		setSelected(checked);
	}, [checked]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelected(event.target.checked);
		if (onChange) {
			onChange({
				name: name,
				value: event.target.checked
			});
		}
	};

	const getHelperText = () => (
		<Box display="flex">
			{hasErrors && <ErrorOutlineOutlinedIcon sx={{ marginRight: theme.spacing() }} />}
			{helperText}
		</Box>
	);

	const getId = () => {
		return id ? id : name;
	};

	const getCheckboxIcon = () => {
		if (indeterminate) {
			return IndeterminateCheckBoxIcon;
		} else {
			return RestingCheckBoxIcon;
		}
	};

	const getSelectedIcon = () => {
		if (indeterminate) {
			return IndeterminateCheckBoxIcon;
		} else {
			return SelectedCheckBoxIcon;
		}
	};

	return (
		<React.Fragment>
			<Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="flex-start">
				<Checkbox
					id={`${getId()}-checkbox`}
					name={name}
					icon={getCheckboxIcon()}
					checkedIcon={getSelectedIcon()}
					inputProps={
						{
							"aria-labelledby": label ? `${getId()}-label` : "",
							"data-qa": dataQa,
							"data-tags": dataTags
						} as SolaceHTMLAttributeProps
					}
					role="checkbox"
					title={title}
					disabled={disabled || readOnly}
					className={clsx({ readOnly: readOnly })}
					disableRipple
					checked={selected}
					onChange={handleChange}
				/>
				<Box
					display="flex"
					flexDirection="column"
					justifyContent={subTextProps.label ? "flex-start" : "center"}
					alignItems="flex-start"
					sx={{ paddingLeft: theme.spacing(2) }}
				>
					{label && (
						<CheckBoxLabel
							id={`${getId()}-label`}
							htmlForId={`${getId()}-checkbox`}
							required={required}
							disabled={disabled}
							bold={boldLabel}
							large={largeLabel}
						>
							{label}
						</CheckBoxLabel>
					)}
					{subTextProps.label && (
						<FormLabel
							id={`${id}-subtext`}
							disabled={disabled}
							className={clsx({ "light-sub-text": subTextProps.light, "check-box-label": true })}
						>
							{subTextProps.label}
						</FormLabel>
					)}
				</Box>
			</Box>
			{helperText && (
				<FormHelperText
					error={hasErrors}
					component="div"
					sx={{ marginLeft: theme.spacing(0.4), marginTop: theme.spacing(0.25) }}
				>
					{getHelperText()}
				</FormHelperText>
			)}
		</React.Fragment>
	);
};

export default SolaceCheckBox;
