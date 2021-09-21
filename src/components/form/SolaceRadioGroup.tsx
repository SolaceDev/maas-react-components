import { Box, FormHelperText, useTheme, RadioGroup } from "@material-ui/core";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import React, { useEffect, useState } from "react";
import { SolaceLabel } from "../..";
import SolaceComponentProps from "../SolaceComponentProps";

export interface SolaceRadioGroupChangeEvent {
	name: string;
	value: string;
}

export interface SolaceRadioGroupProps extends SolaceComponentProps {
	/**
	 * Unique identifier ... if `id` is not specified, `name` value will be used in order to make `label` accessible for screen readers
	 */
	id?: string;
	/**
	 * Name attribute to assign to the `radio group` element
	 */
	name: string;
	/**
	 * the label content to display on the screen
	 */
	label?: string | JSX.Element;
	/**
	 * Content to display as supportive/explanitory text
	 */
	helperText?: string | JSX.Element;
	/**
	 * Boolean flag to mark the `input` in error state
	 */
	hasErrors?: boolean;
	/**
	 * The value of the selected 'radio' managed by this group
	 */
	value?: string;
	/**
	 * Boolean flag to control whether to stack the label on top of the `input` element (false) or place them inline to one another (true)
	 */
	isInlineLabel?: boolean;
	/**
	 * Boolean flag used to display an indicator of whether or not this `radio group` is mandatory
	 */
	isRequired?: boolean;
	/**
	 * Boolean flag to disable the `radio group`
	 */
	isDisabled?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `radio group` is changed
	 */
	onChange?: (event: SolaceRadioGroupChangeEvent) => void;
	/**
	 * Callback function to trigger whenever the value of the `radio group` is changed
	 */
	children: React.ReactNode;
}

const SolaceRadioGroup: React.FC<SolaceRadioGroupProps> = ({
	id,
	name,
	label,
	value,
	helperText,
	hasErrors = false,
	isInlineLabel = false,
	isRequired = false,
	isDisabled = false,
	onChange,
	children
}) => {
	const theme = useTheme();
	const [selected, setSelected] = useState(value);

	useEffect(() => {
		setSelected(value);
	}, [value]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelected(event.target.value);
		if (onChange) {
			onChange({
				name: name,
				value: event.target.value
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

	const getRadioGroup = () => (
		<React.Fragment>
			<Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
				<RadioGroup aria-lable={name} name={name} role="radiogroup" value={selected} onChange={handleChange}>
					{children}
				</RadioGroup>
			</Box>
			{helperText && (
				<FormHelperText error={hasErrors} component="div" sx={{ marginLeft: theme.spacing(0.4) }}>
					{getHelperText()}
				</FormHelperText>
			)}
		</React.Fragment>
	);

	return (
		<React.Fragment>
			{!isInlineLabel && label && (
				<Box marginTop={theme.spacing()}>
					<SolaceLabel
						id={`${getId()}-label`}
						htmlForId={`${getId()}-textfield`}
						isRequired={isRequired}
						isDisabled={isDisabled}
					>
						{label}
					</SolaceLabel>
					{getRadioGroup()}
				</Box>
			)}
			{isInlineLabel && label && (
				<Box
					marginBottom={theme.spacing()}
					display="flex"
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<SolaceLabel
						id={`${getId()}-label`}
						htmlForId={`${getId()}-textfield`}
						isRequired={isRequired}
						isDisabled={isDisabled}
					>
						{label}
					</SolaceLabel>
					{getRadioGroup()}
				</Box>
			)}
			{!label && getRadioGroup()}
		</React.Fragment>
	);
};

export default SolaceRadioGroup;
