import { Box, FormLabel, InputLabel, Radio, useRadioGroup, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import SolaceComponentProps from "../SolaceComponentProps";
import SolaceHTMLAttributeProps from "../SolaceHTMLAttributesProps";
import clsx from "clsx";
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
	 * allow subText to be displayed at 55% black (default to 80%)
	 */
	lightSubText?: boolean;
	/**
	 * Boolean flag to check or uncheck the `radio`
	 */
	checked?: boolean;
	/**
	 * Boolean flag used to display an indicator of whether or not this `radio` is mandatory
	 */
	required?: boolean;
	/**
	 * Boolean flag to disable the `radio`
	 */
	disabled?: boolean;
	/**
	 * Display the label with a larger font
	 */
	largeLabel?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `radio` is changed
	 */
	onChange?: (event: SolaceRadioChangeEvent) => void;
	/**
	 * Boolean flag to set the radio to readOnly
	 */
	readOnly?: boolean;
}

interface LabelElementProps {
	bold: boolean;
	large: boolean;
	disabled: boolean;
	children: string | JSX.Element;
}

function LabelElement({ children, bold, large, disabled }: LabelElementProps): JSX.Element {
	const theme = useTheme();
	const typography = large ? theme.typography.subtitle1 : theme.typography.body1;
	// 24 px is the row height in the grid because it's the height of the svg
	// It needs to be 24 px, because otherwise the text won't be centered
	// Attempts to find another solution: 1
	return (
		<Box
			component={"span"}
			sx={{
				fontSize: typography.fontSize,
				lineHeight: "24px",
				fontWeight: bold ? "medium" : "regular",
				color: disabled ? theme.palette.ux.secondary.text.w50 : theme.palette.ux.primary.text.wMain
			}}
		>
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
	lightSubText = false,
	checked = false,
	required = false,
	disabled = false,
	largeLabel = false,
	onChange,
	dataQa,
	dataTags,
	readOnly = false
}: SolaceRadioProps): JSX.Element {
	const theme = useTheme();
	const [selected, setSelected] = useState(checked);
	const radioGroup = useRadioGroup();

	useEffect(() => {
		setSelected(checked);
	}, [checked]);

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

	return (
		<Box display="grid" gridTemplateColumns="auto 1fr" gridTemplateRows="auto auto" alignItems="center">
			<Radio
				id={`${id}-radio`}
				name={name}
				value={value}
				inputProps={
					{
						"aria-labelledby": label ? `${id}-label` : "",
						"data-qa": dataQa,
						"data-tags": dataTags
					} as SolaceHTMLAttributeProps
				}
				role="radio"
				title={title}
				className={clsx({ readOnly: readOnly })}
				disabled={disabled || readOnly}
				disableRipple
				checked={selected}
				onChange={handleChange}
				sx={{
					"&": {
						padding: 0,
						alignItems: "flex-start",
						marginRight: "16px"
					},
					"& .MuiSvgIcon-root": {
						width: "24px",
						height: "24px"
					},
					"& .MuiSvgIcon-root path": {
						// Outer circle
						d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z",
						transform: "scale(1)"
					},
					// Unselected state
					"&:not(.Mui-checked) .MuiSvgIcon-root": {
						color: theme.palette.ux.secondary.w40
					},
					// Hover state
					"&:hover:not(.Mui-checked):not(.Mui-disabled) .MuiSvgIcon-root": {
						color: theme.palette.ux.secondary.wMain
					},
					// Selected state
					"&.Mui-checked .MuiSvgIcon-root": {
						color: theme.palette.ux.accent.n2.wMain
					},
					"&.Mui-checked .MuiSvgIcon-root path": {
						// Filled circle for selected state - adjusted to make inner circle 12x12px (from position 6 to 18)
						d: "M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0-4C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
					},
					// Disabled state
					"&.Mui-disabled:not(.Mui-checked) .MuiSvgIcon-root": {
						color: theme.palette.ux.secondary.w20
					},
					"&.Mui-disabled.Mui-checked .MuiSvgIcon-root": {
						color: theme.palette.ux.accent.n2.w30
					},
					// Read-only state
					"&.readOnly": {
						backgroundColor: theme.palette.ux.background.w20
					},
					"&.readOnly:not(.Mui-checked) .MuiSvgIcon-root": {
						color: theme.palette.ux.secondary.w40
					},
					"&.readOnly.Mui-checked .MuiSvgIcon-root": {
						color: theme.palette.ux.secondary.wMain
					}
				}}
			/>
			{label && (
				<Box>
					<InputLabel
						id={`${id}-label`}
						htmlFor={`${id}-radio`}
						required={required}
						disabled={disabled}
						sx={{ color: theme.palette.ux.primary.text.wMain, cursor: disabled ? "auto" : "pointer" }}
					>
						<LabelElement bold={largeLabel || subText !== undefined} large={largeLabel} disabled={disabled}>
							{label}
						</LabelElement>
					</InputLabel>
				</Box>
			)}
			{subText && (
				<Box gridColumn="2" gridRow="2">
					<FormLabel
						id={`${id}-subtext`}
						disabled={disabled}
						className={clsx({ "light-sub-text": lightSubText, "radio-btn-label": true })}
					>
						{subText}
					</FormLabel>
				</Box>
			)}
		</Box>
	);
}

export default SolaceRadio;
