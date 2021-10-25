import { Box, InputLabel, Radio, useRadioGroup, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
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
	subText?: string | JSX.Element;
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
	 * Display the label with a larger font
	 */
	isLargeLabel?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `radio` is changed
	 */
	onChange?: (event: SolaceRadioChangeEvent) => void;
	/**
	 * Boolean flag to set the radio to readOnly
	 */
	readOnly: boolean;
}

interface LabelElementProps {
	bold: boolean;
	large: boolean;
	children: string | JSX.Element;
}

function LabelElement({ children, bold, large }: LabelElementProps) {
	const theme = useTheme();
	const component = bold ? "strong" : "span";
	const typography = large ? theme.typography.subtitle1 : theme.typography.body1;
	// 24 px is the row height in the grid because it's the height of the svg
	// It needs to be 24 px, because otherwise the text won't be centered
	// Attempts to find another solution: 1
	return (
		<Box component={component} sx={{ fontSize: typography.fontSize, lineHeight: "24px" }}>
			{children}
		</Box>
	);
}

function SolaceRadio({
	id,
	name,
	label,
	value,
	title,
	subText,
	isChecked = false,
	isRequired = false,
	isDisabled = false,
	isLargeLabel = false,
	onChange,
	dataQa,
	dataTags,
	readOnly = false
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

	if (!id) {
		id = name;
	}

	const pickSelectedIcon = (): JSX.Element => {
		if (readOnly) {
			console.log("readonly");
			return <SelectedRadioIcon color={theme.palette.grey[700]}></SelectedRadioIcon>;
		} else {
			return <SelectedRadioIcon></SelectedRadioIcon>;
		}
	};

	return (
		<React.Fragment>
			<Box display="grid" gridTemplateColumns="auto 1fr" gridTemplateRows="auto auto" alignItems="center">
				<Radio
					id={`${id}-radio`}
					name={name}
					value={value}
					icon={RestingRadioIcon}
					checkedIcon={pickSelectedIcon()}
					inputProps={
						{
							"aria-labelledby": label ? `${id}-label` : "",
							"data-qa": dataQa,
							"data-tags": dataTags
						} as SolaceHTMLAttributeProps
					}
					role="radio"
					title={title}
					disabled={isDisabled || readOnly}
					disableRipple
					checked={selected}
					onChange={handleChange}
				/>
				{label && (
					<Box>
						<InputLabel
							id={`${id}-label`}
							htmlFor={`${id}-radio`}
							required={isRequired}
							disabled={isDisabled}
							sx={{ color: theme.palette.text.primary, cursor: isDisabled ? "auto" : "pointer" }}
						>
							<LabelElement bold={isLargeLabel || subText !== undefined} large={isLargeLabel}>
								{label}
							</LabelElement>
						</InputLabel>
					</Box>
				)}
				{subText && (
					<Box gridColumn="2" gridRow="2">
						<InputLabel id={`${id}-subtext`} disabled={isDisabled} sx={{ color: theme.palette.text.primary }}>
							{subText}
						</InputLabel>
					</Box>
				)}
			</Box>
		</React.Fragment>
	);
}

export default SolaceRadio;
