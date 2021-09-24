import { Box, Radio, FormHelperText, useTheme, useRadioGroup } from "@material-ui/core";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import React, { useEffect, useState } from "react";
import { SolaceLabel } from "../..";
import SolaceComponentProps from "../SolaceComponentProps";
import SolaceHTMLAttributeProps from "../SolaceHTMLAttributesProps";
import { RestingRadioIcon, SelectedRadioIcon } from "../../resources/icons/RadioIcons";

export interface SolaceRadioChangeEvent {
	name: string;
	value: boolean;
}

export interface SolaceRadioProps extends SolaceComponentProps {
	/**
	 * Unique identifier ... if `id` is not specified, `name` value will be used in order to make `label` accessible for screen readers
	 */
	id?: string;
	/**
	 * Name attribute to assign to the `radio` element
	 */
	name: string;
	/**
	 * Value assign to the `radio` element
	 */
	value?: string;
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
	 * Boolean flag to check or uncheck the `radio`
	 */
	isChecked?: boolean;
	/**
	 * Boolean flag used to display an indicator of whether or not this `radio` is mandatory
	 */
	isRequired?: boolean;
	/**
	 * Boolean flag to disable the `radio`
	 */
	isDisabled?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `radio` is changed
	 */
	onChange?: (event: SolaceRadioChangeEvent) => void;
}

function SolaceRadio({
	id,
	name,
	label,
	value,
	title,
	helperText,
	hasErrors = false,
	isChecked = false,
	isRequired = false,
	isDisabled = false,
	onChange,
	dataQa,
	dataTags
}: SolaceRadioProps): JSX.Element {
	const theme = useTheme();
	const [selected, setSelected] = useState(isChecked);
	const radioGroup = useRadioGroup();

	useEffect(() => {
		setSelected(isChecked);
	}, [isChecked]);

	useEffect(() => {
		if (radioGroup) {
			setSelected(radioGroup.value === value);
		}
	}, [radioGroup, value]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelected(event.target.checked);
		if (onChange && event.target.checked) {
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

	return (
		<React.Fragment>
			<Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="top">
				<Radio
					name={name}
					value={value}
					icon={RestingRadioIcon}
					checkedIcon={SelectedRadioIcon}
					inputProps={
						{
							"aria-labelledby": label ? `${getId()}-label` : "",
							"data-qa": dataQa,
							"data-tags": dataTags
						} as SolaceHTMLAttributeProps
					}
					role="radio"
					title={title}
					disabled={isDisabled}
					disableRipple
					checked={selected}
					onChange={handleChange}
				/>
				{label && (
					<div>
						<SolaceLabel
							id={`${getId()}-label`}
							htmlForId={`${getId()}-radio`}
							isRequired={isRequired}
							isDisabled={isDisabled}
						>
							{label}
						</SolaceLabel>
						{helperText && (
							<FormHelperText error={hasErrors} component="div">
								{getHelperText()}
							</FormHelperText>
						)}
					</div>
				)}
			</Box>
		</React.Fragment>
	);
}

export default SolaceRadio;
