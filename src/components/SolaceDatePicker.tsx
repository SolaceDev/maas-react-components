/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Moment } from "moment";
import moment from "moment-timezone";
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
	 * Optional timezone string to be used for the date picker. This is useful for
	 * displaying the date in a specific timezone. If not provided, the local timezone
	 * will be used.
	 */
	timezone?: string;

	/**
	 * This prop prevents the selection of all dates after the current date.
	 */
	disableFuture?: boolean;
}

/**
 * Helper function to create a Moment object with timezone support
 * If timezone is provided, uses moment.tz to parse the date in that timezone
 * If no timezone is provided, uses moment directly (local timezone)
 */
const createMomentWithTimezone = (value: string | null, timezone?: string): Moment | null => {
	if (!value) return null;
	return timezone ? moment.tz(value, timezone) : moment(value);
};

export default function SolaceDatePicker({
	value = null,
	onChange,
	onClear,
	dataQa,
	variant = SolaceDatePickerVariant.FORMAT_YEAR_MONTH_DAY,
	disabled = false,
	timezone = undefined,
	disableFuture = false
}: Readonly<SolaceDatePickerProps>) {
	// Initialize date state with timezone support using the helper function
	const [date, setDate] = useState<Moment | null>(createMomentWithTimezone(value, timezone));

	const { views, openTo, format } = variantConfig[variant];

	// Update date when value or timezone changes
	useEffect(() => {
		setDate(createMomentWithTimezone(value, timezone));
	}, [value, timezone]);

	const handleChange = (newValue: Moment | null) => {
		setDate(newValue);
		if (onChange && newValue) {
			// We need to convert the Moment object to a string first
			const momentValue = createMomentWithTimezone(newValue.format(), timezone);
			onChange(momentValue ? momentValue.toISOString() : null);
		} else if (onChange) {
			onChange(null);
		}
	};

	const theme = useTheme();
	const color = theme.palette.ux.accent.n2.wMain;
	const styles = {
		".MuiPickersCalendarHeader-switchViewButton:focus-visible": {
			border: `1px solid ${color}`,
			padding: "3px",
			borderRadius: "3px"
		},

		".MuiPickersArrowSwitcher-button:focus-visible": {
			border: `1px solid ${color}`,
			padding: "3px",
			borderRadius: "3px"
		},

		".MuiPickersDay-root:focus-visible": {
			border: `1px solid ${color}`,
			borderRadius: "50%"
		}
	};

	return (
		<LocalizationProvider dateAdapter={AdapterMoment} dateLibInstance={moment}>
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
				timezone={timezone ?? "system"}
			/>
		</LocalizationProvider>
	);
}
