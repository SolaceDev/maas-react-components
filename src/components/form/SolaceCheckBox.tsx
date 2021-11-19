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
	helperText?: string | JSX.Element;
	/**
	 * Boolean flag to mark the `input` in error state
	 */
	hasErrors?: boolean;
	/**
	 * Boolean flag to check or uncheck the `checkbox`
	 */
	isChecked?: boolean;
	/**
	 * Boolean flag used to display an indicator of whether or not this `checkbox` is mandatory
	 */
	isRequired?: boolean;
	/**
	 * Boolean flag to disable the `checkbox`
	 */
	isDisabled?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `checkbox` is changed
	 */
	onChange?: (event: SolaceCheckboxChangeEvent) => void;
	/**
	 * Boolean flag to set the checkbox to indeterminate
	 */
	isIndeterminate?: boolean;
	/**
	 * Boolean flag to set the checkbox to readOnly
	 */
	readOnly?: boolean;
}

interface CheckBoxLabelProps {
	id: string;
	htmlForId?: string;
	isRequired?: boolean;
	isDisabled?: boolean;
	children?: React.ReactNode;
}

function CheckBoxLabel({
	id,
	htmlForId,
	isRequired = false,
	isDisabled = false,
	children
}: CheckBoxLabelProps): JSX.Element {
	const theme = useTheme();
	return (
		<FormLabel
			id={id}
			htmlFor={htmlForId}
			required={isRequired}
			disabled={isDisabled}
			className="SolaceCheckBoxLabel"
			sx={{ display: "block", color: theme.palette.text.primary }}
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
	isChecked = false,
	isRequired = false,
	isDisabled = false,
	isIndeterminate = false,
	readOnly = false,
	onChange,
	dataQa,
	dataTags
}: SolaceCheckBoxProps): JSX.Element => {
	const theme = useTheme();
	const [selected, setSelected] = useState(isChecked);

	useEffect(() => {
		setSelected(isChecked);
	}, [isChecked]);

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
		if (isIndeterminate) {
			return IndeterminateCheckBoxIcon;
		} else {
			return RestingCheckBoxIcon;
		}
	};

	const getSelectedIcon = () => {
		if (isIndeterminate) {
			return IndeterminateCheckBoxIcon;
		} else {
			return SelectedCheckBoxIcon;
		}
	};

	return (
		<React.Fragment>
			<Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
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
					disabled={isDisabled || readOnly}
					className={readOnly ? "readOnly" : undefined}
					disableRipple
					checked={selected}
					onChange={handleChange}
				/>
				{label && (
					<CheckBoxLabel
						id={`${getId()}-label`}
						htmlForId={`${getId()}-checkbox`}
						isRequired={isRequired}
						isDisabled={isDisabled}
					>
						{label}
					</CheckBoxLabel>
				)}
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
