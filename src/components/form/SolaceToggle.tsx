import { Box, FormHelperText, Switch, InputLabel, Typography, useTheme } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import React, { useEffect, useState } from "react";
import SolaceComponentProps from "../SolaceComponentProps";
import SolaceHTMLAttributeProps from "../SolaceHTMLAttributesProps";

export interface SolaceToggleChangeEvent {
	name: string;
	value: boolean;
}

interface SolaceToggleLabelProps {
	bold: boolean;
	disabled: boolean;
	large: boolean;
	children: string | JSX.Element;
}

function SolaceToggleLabel({ children, bold, large, disabled }: SolaceToggleLabelProps): JSX.Element {
	const theme = useTheme();

	return (
		<Typography
			variant={large ? "subtitle1" : "body1"}
			sx={{
				color: disabled ? theme.palette.ux.secondary.text.w50 : theme.palette.ux.primary.text.wMain,
				fontWeight: bold ? "medium" : "regular",
				alignSelf: "center"
			}}
			component="span"
		>
			{children}
		</Typography>
	);
}

export interface SolaceToggleProps extends SolaceComponentProps {
	/**
	 * Unique identifier ... if `id` is not specified, `name` value will be used in order to make `label` accessible for screen readers
	 */
	id?: string;
	/**
	 * Name attribute to assign to the `toggle` element
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
	 * Boolean flag to show the state of toggle element
	 */
	stateText?: boolean;
	/**
	 * Boolean flag to mark the `input` in error state
	 */
	hasErrors?: boolean;
	/**
	 * Boolean flag to check or uncheck the `toggle`
	 */
	isOn?: boolean;
	/**
	 * Boolean flag used to display an indicator of whether or not this `toggle` is mandatory
	 */
	required?: boolean;
	/**
	 * Boolean flag to disable the `toggle`
	 */
	disabled?: boolean;
	/**
	 * Display the label with a larger font
	 */
	largeLabel?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `toggle` is changed
	 */
	onChange?: (event: SolaceToggleChangeEvent) => void;
}

function SolaceToggle({
	id,
	name,
	label,
	title,
	helperText,
	hasErrors = false,
	isOn = false,
	required = false,
	disabled = false,
	largeLabel = false,
	stateText = false,
	onChange,
	dataQa,
	dataTags
}: SolaceToggleProps): JSX.Element {
	const theme = useTheme();
	const [selected, setSelected] = useState(isOn);

	useEffect(() => {
		setSelected(isOn);
	}, [isOn]);

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

	const getStateText = (selected: boolean) => (selected ? "On" : "Off");

	const getId = () => {
		return id ? id : name;
	};

	return (
		<React.Fragment>
			<Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
				<Switch
					id={`${getId()}-toggle`}
					name={name}
					size="small"
					inputProps={
						{
							"aria-labelledby": label ? `${getId()}-label` : "",
							"data-qa": dataQa,
							"data-tags": dataTags
						} as SolaceHTMLAttributeProps
					}
					role="switch"
					title={title}
					disabled={disabled}
					disableRipple
					checked={selected}
					onChange={handleChange}
				/>
				{label && (
					<>
						<InputLabel
							id={`${id}-label`}
							htmlFor={`${id}-toggle`}
							required={required}
							disabled={disabled}
							sx={{ color: theme.palette.ux.primary.text.wMain, cursor: disabled ? "auto" : "pointer" }}
						>
							<SolaceToggleLabel bold={false} large={largeLabel} disabled={disabled}>
								{`${label}${stateText ? ": " : ""}`}
							</SolaceToggleLabel>
							{stateText && (
								<SolaceToggleLabel bold={true} large={largeLabel} disabled={disabled}>
									{getStateText(selected)}
								</SolaceToggleLabel>
							)}
						</InputLabel>
					</>
				)}
			</Box>
			{helperText && (
				<FormHelperText error={hasErrors} component="div" sx={{ marginLeft: theme.spacing(0.4) }}>
					{getHelperText()}
				</FormHelperText>
			)}
		</React.Fragment>
	);
}

export default SolaceToggle;
