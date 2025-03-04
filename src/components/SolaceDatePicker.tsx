import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import { useState, useEffect } from "react";
import SolaceComponentProps from "./SolaceComponentProps";
import { SolaceDatePickerVariant, variantConfig } from "../types/solaceDatePicker";
import { useTheme } from "@mui/material";

export interface SolaceDatePickerProps extends SolaceComponentProps {
	/**
	 * The current value of the date picker, represented as a string in ISO 8601 format.
	 * This prop makes the date picker a controlled component
	 */
	value?: string | null;

	/**
	 * If `true`, the date picker is readOnly and cannot be changed.
	 */
	disabled?: boolean;

	/**
	 * The variant of the date picker to use. Defaults to `FORMAT_YEAR_MONTH_DAY` if not provided.
	 */
	variant?: SolaceDatePickerVariant;

	/**
	 * A callback that's called when the date picker's value changes. The new value is passed
	 * as a string in ISO 8601 format. If the date picker is cleared, `null` is passed.
	 */
	onChange?: (date: string | null) => void;

	/**
	 * A callback that's called when the date picker is cleared.
	 */
	onClear?: () => void;

	/**
	 * This prop prevents the selection of all dates after the current date.
	 */
	disableFuture?: boolean;
}

export default function SolaceDatePicker({
	value = null,
	onChange,
	onClear,
	dataQa,
	variant = SolaceDatePickerVariant.FORMAT_YEAR_MONTH_DAY,
	disabled = false,
	disableFuture = false
}: Readonly<SolaceDatePickerProps>) {
	const [date, setDate] = useState<Moment | null>(value ? moment(value) : null);

	const { views, openTo, format } = variantConfig[variant];

	useEffect(() => {
		setDate(value ? moment(value) : null);
	}, [value]);

	const handleChange = (newValue: Moment | null) => {
		setDate(newValue);
		if (onChange) {
			onChange(newValue ? moment(newValue).toISOString() : null);
		}
	};

	const theme = useTheme();
	const color = theme.palette.ux.accent.n2.wMain;
	const styles = {
		".MuiPickersCalendarHeader-switchViewButton:focus-visible": {
			border: `1px solid ${color}`,
			borderRadius: "3px"
		},

		".MuiPickersArrowSwitcher-button:focus-visible": {
			border: `1px solid ${color}`,
			borderRadius: "3px"
		},

		'[role="gridcell"] button:focus-visible': {
			outline: `1px solid ${color}`,
			borderRadius: "50%"
		}
	};

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<DatePicker
				className="SolaceDatePicker"
				value={date}
				onChange={handleChange}
				data-qa={dataQa}
				slotProps={{
					field: { clearable: true, onClear: () => onClear && onClear() },
					popper: {
						sx: styles
					}
				}}
				disabled={disabled}
				views={views}
				openTo={openTo}
				format={format}
				disableFuture={disableFuture}
			/>
		</LocalizationProvider>
	);
}
