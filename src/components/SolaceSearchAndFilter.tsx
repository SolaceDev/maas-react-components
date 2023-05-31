import { useCallback } from "react";
import { FIELD_TYPES } from "../types/fieldTypes";
import SolaceComponentProps from "./SolaceComponentProps";
import SolaceButton from "./form/SolaceButton";
import SolaceTextField, { SolaceTextFieldChangeEvent } from "./form/SolaceTextField";
import SolaceIcon from "./SolaceIcon";
import { styled } from "@mui/material";
const SvgContainer = styled("div")(({ theme }) => ({
	margin: `${theme.spacing(1)} ${theme.spacing(1)} 0 -${theme.spacing(0.5)}`,
	".MuiSvgIcon-root": {
		fill: theme.palette.ux.secondary.wMain
	}
}));

export interface SolaceSearchAndFilterProps extends SolaceComponentProps {
	/**
	 * Unique identifier ... if `id` is not specified, `name` value will be used in order to make `label` and `helperText` accessible for screen readers
	 */
	id?: string;
	/**
	 * Name attribute to assign to the `input` element
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
	 * The value of the `input` element, required for controlled component
	 */
	value?: string;
	/**
	 * Short hint displayed in the `input` before user enters a value
	 */
	placeholder?: string;
	/**
	 * Custom Width of the component.
	 */
	width?: string;
	/**
	 * Boolean flag to disable the `input`
	 */
	disabled?: boolean;
	/**
	 * Indicates whether this is a "search" or "filter" field (appropriate icon will show as the adornment)
	 */
	type?: FIELD_TYPES;
	/**
	 * Boolean flag to mark the field in error state
	 */
	hasErrors?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `input` is changed
	 */
	onChange: (event: SolaceTextFieldChangeEvent) => void;
}

function SolaceSearchAndFilter({
	id,
	name,
	label,
	helperText,
	value = "",
	placeholder,
	width,
	disabled = false,
	type = FIELD_TYPES.DEFAULT,
	hasErrors = false,
	onChange
}: SolaceSearchAndFilterProps): JSX.Element {
	const getAdornment = useCallback(() => {
		const handleClearInput = () => onChange({ name, value: "" });

		const getFieldIcon = (type: FIELD_TYPES) => {
			switch (type) {
				case FIELD_TYPES.FILTER:
					return (
						<SvgContainer>
							<SolaceIcon key="filterIcon" fontSize="small" name="icons_24px_filter" />
						</SvgContainer>
					);
				case FIELD_TYPES.SEARCH:
					return (
						<SvgContainer>
							<SolaceIcon key="searchIcon" fontSize="small" name="icons_24px_search" />
						</SvgContainer>
					);
				default:
					return undefined;
			}
		};

		const icons = [];

		if (value && value.trim().length > 0) {
			icons.push(
				<SolaceButton key={"closeIcon"} dataQa="clearButton" variant="icon" onClick={handleClearInput}>
					<SolaceIcon key="closeIcon" fontSize="small" name="icons_24px_close" />
				</SolaceButton>
			);
		}

		icons.push(getFieldIcon(type));

		return icons;
	}, [value, type, onChange, name]);

	const handleChange = (event: SolaceTextFieldChangeEvent) => {
		onChange(event);
	};

	return (
		<SolaceTextField
			id={id}
			name={name}
			label={label}
			helperText={helperText}
			value={value}
			onChange={handleChange}
			width={width}
			endAdornment={getAdornment()}
			hasErrors={hasErrors}
			disabled={disabled}
			dataQa={`searchAndFilter-${id}`}
			placeholder={placeholder}
		/>
	);
}

export default SolaceSearchAndFilter;
