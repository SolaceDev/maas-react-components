import { Box, InputLabel, FormControl } from "@material-ui/core";
import { createStyles, withStyles, Theme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";

export interface SolaceSelectOptionProps {
	value: string;
	label: string;
}

export interface SolaceSelectProps {
	/**
	 * id of the select component
	 */
	id: string;
	/**
	 * Text value to accompany the select input element
	 */
	label?: string;
	/**
	 * The input value representing the selected option
	 */
	value?: string;
	/**
	 * List of options to populate the select dropdown
	 * Each options (SolaceSelectOptionProps) consists of:
	 *   - value: assigned value of the select option
	 *   - label: display text of the select option
	 */
	options: Array<SolaceSelectOptionProps>;
	/**
	 * Supporting text describing the select
	 */
	helperText?: string;
	/**
	 * Adds an indicator if selection of an option is mandatory
	 */
	required?: boolean;
	/**
	 * Renders the select element disabled
	 */
	disabled?: boolean;
	/**
	 * Prevents the user from making a new selection
	 */
	readOnly?: boolean;
	/**
	 * indicator of whether there is an error with the associated selection
	 */
	error?: boolean;
	/**
	 * Flag to have the label placed in the same line as the select element (otherwise stacked)
	 */
	useSameLineLabel?: boolean;
	/**
	 * Callback function fired when a menu item is selected
	 */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SolaceSelectInput = withStyles((theme: Theme) =>
	createStyles({
		root: {
			"label + &": {
				marginTop: theme.spacing(3)
			}
		},
		input: {
			borderRadius: 4,
			position: "relative",
			backgroundColor: theme.palette.background.paper,
			border: "1px solid #ced4da",
			fontSize: 16,
			padding: "10px 26px 10px 12px",
			transition: theme.transitions.create(["border-color", "box-shadow"]),
			// Use the system font instead of the default Roboto font.
			fontFamily: [
				"-apple-system",
				"BlinkMacSystemFont",
				'"Segoe UI"',
				"Roboto",
				'"Helvetica Neue"',
				"Arial",
				"sans-serif",
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"'
			].join(","),
			"&:focus": {
				borderRadius: 4,
				borderColor: "#80bdff",
				boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
			}
		}
	})
)(InputBase);

const SolaceSelect: React.FC<SolaceSelectProps> = ({
	id,
	label,
	value,
	// options,
	// helperText,
	required = false,
	disabled = false,
	// readOnly = false,
	error = false,
	useSameLineLabel = false,
	// testId,
	// useLastPass = false,
	onChange
}) => {
	const getSelect = () => (
		<React.Fragment>
			<Select input={SolaceSelectInput} id={id} labelId={`${id}-solace-select-label`} value={value} onChange={onChange}>
				<MenuItem value="hello">Hello</MenuItem>
				<MenuItem value="bye">Goodbye</MenuItem>
			</Select>
		</React.Fragment>
	);

	const getComponent = () => {
		if (!useSameLineLabel && label) {
			return (
				<Box marginTop={theme.spacing()}>
					<InputLabel
						id={`${id}-solace-select-label`}
						required={required}
						color="primary"
						disabled={disabled}
						error={error}
					>
						{label}
					</InputLabel>
					{getSelect()}
				</Box>
			);
		} else if (useSameLineLabel && label) {
			return (
				<Box
					marginTop={theme.spacing()}
					display="flex"
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<InputLabel id={`${id}-solace-select-label`} required={required} color="primary" disabled={disabled}>
						{label}
					</InputLabel>
					{getSelect()}
				</Box>
			);
		} else {
			return getSelect();
		}
	};

	return <FormControl>{getComponent()}</FormControl>;
};

export default SolaceSelect;
