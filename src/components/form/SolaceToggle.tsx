import { Box, FormHelperText, Switch, InputLabel, useTheme } from "@material-ui/core";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import React, { useEffect, useState } from "react";
import SolaceComponentProps from "../SolaceComponentProps";
import SolaceHTMLAttributeProps from "../SolaceHTMLAttributesProps";

export interface SolaceToggleChangeEvent {
	name: string;
	value: boolean;
}

interface LabelElementProps {
	bold: boolean;
	disabled: boolean;
	large: boolean;
	children: string | JSX.Element;
}

function LabelElement({ children, bold, large, disabled }: LabelElementProps): JSX.Element {
	const theme = useTheme();
	const typography = large ? theme.typography.subtitle1 : theme.typography.body1;
	return (
		<Box
			component={"span"}
			sx={{
				fontSize: typography.fontSize,
				lineHeight: typography.lineHeight,
				fontWeight: bold ? "medium" : "regular",
				color: disabled ? theme.palette.text.disabled : theme.palette.text.primary
			}}
		>
			{children}
		</Box>
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

	const getStateText = (selected: boolean, disabled: boolean) => {
		if (disabled) {
			return ": Disabled";
		}
		if (selected) {
			return ": On";
		} else {
			return ": Off";
		}
	};

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
					<Box>
						<InputLabel
							id={`${id}-label`}
							htmlFor={`${id}-toggle`}
							required={required}
							disabled={disabled}
							sx={{ color: theme.palette.text.primary, cursor: disabled ? "auto" : "pointer" }}
						>
							<LabelElement bold={false} large={largeLabel} disabled={disabled}>
								{label}
							</LabelElement>
							<LabelElement bold={true} large={largeLabel} disabled={disabled}>
								{getStateText(selected, disabled)}
							</LabelElement>
						</InputLabel>
					</Box>
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
