import { Box, RadioGroup, Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/system";
import React, { useEffect, useState } from "react";
import SolaceComponentProps from "../SolaceComponentProps";
import FormChildBase from "./FormChildBase";

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
	 * Boolean flag to disable the `radio group`
	 */
	isReadOnly?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `radio group` is changed
	 */
	onChange?: (event: SolaceRadioGroupChangeEvent) => void;
	/**
	 * Callback function to trigger whenever the value of the `radio group` is changed
	 */
	children: Array<React.ReactNode>;
}

function SolaceRadioGroup({
	id,
	name,
	label,
	value,
	helperText,
	hasErrors = false,
	isReadOnly = false,
	isRequired = false,
	isDisabled = false,
	isInlineLabel = false,
	onChange,
	children
}: SolaceRadioGroupProps): JSX.Element {
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

	if (!id) {
		id = name;
	}

	const getRadioGroup = () => {
		const childItems: Array<React.ReactNode> = children.map((child, i) => (
			<Grid item key={i}>
				{child}
			</Grid>
		));

		return (
			<Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
				<RadioGroup aria-label={name} name={name} role="radiogroup" value={selected} onChange={handleChange}>
					<Grid container spacing={1.5} direction="column">
						{childItems}
					</Grid>
				</RadioGroup>
			</Box>
		);
	};

	return (
		<FormChildBase
			id={id}
			label={label}
			helperText={helperText}
			errorText={hasErrors ? helperText : undefined}
			isDisabled={isDisabled}
			isReadOnly={isReadOnly}
			isRequired={isRequired}
			isInlineLabel={isInlineLabel}
		>
			<Box sx={{ marginTop: isInlineLabel ? 0 : theme.spacing(1) }}>{getRadioGroup()}</Box>
		</FormChildBase>
	);
}

export default SolaceRadioGroup;
