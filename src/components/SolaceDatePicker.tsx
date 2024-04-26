import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import { useState, useEffect } from "react";
import SolaceComponentProps from "./SolaceComponentProps";

export interface SolaceDatePickerProps extends SolaceComponentProps {
	/**
	 * The current value of the date picker, represented as a string in ISO 8601 format.
	 * This prop makes the date picker a controlled component
	 */
	value?: string | null;

	/**
	 * A callback that's called when the date picker's value changes. The new value is passed
	 * as a string in ISO 8601 format. If the date picker is cleared, `null` is passed.
	 */
	onChange?: (date: string | null) => void;

	/**
	 * A callback that's called when the date picker is cleared.
	 */
	onClear?: () => void;
}

export default function SolaceDatePicker({ value = null, onChange, onClear, dataQa }: SolaceDatePickerProps) {
	const [date, setDate] = useState<Moment | null>(value ? moment(value) : null);

	useEffect(() => {
		setDate(value ? moment(value) : null);
	}, [value]);

	const handleChange = (newValue: Moment | null) => {
		setDate(newValue);
		if (onChange) {
			onChange(newValue ? moment(newValue).toISOString() : null);
		}
	};

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<DatePicker
				value={date}
				onChange={handleChange}
				data-qa={dataQa}
				slotProps={{
					field: { clearable: true, onClear: () => onClear && onClear() }
				}}
				format="YYYY-MM-DD"
			/>
		</LocalizationProvider>
	);
}
