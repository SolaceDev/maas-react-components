import { DateView } from "@mui/x-date-pickers";

export enum SolaceDatePickerVariant {
	FORMAT_YEAR_MONTH_DAY = "yearMonthDay", // view have day, month and year with format: format: "YYYY-MM-DD" i.e. 2022-01-24
	FORMAT_MONTH_YEAR = "monthYear" // view have month and year with format: format: "MMMM YYYY" i.e. January 2022
}

/**
 * these properties are defined in the Material-UI DatePicker component ( https://mui.com/x/api/date-pickers/date-picker/ )
 * `views` is used for controlliing which views are shown in the date picker (e.g. year, month, day) and an array
 * `openTo` is used for controlling which view the date picker should open to (e.g. year, month, day)
 * `format` is used for controlling the format of the date displayed in the input field
 */
export const variantConfig: Record<SolaceDatePickerVariant, { views?: DateView[]; openTo?: DateView; format: string }> =
	{
		[SolaceDatePickerVariant.FORMAT_YEAR_MONTH_DAY]: {
			views: undefined,
			openTo: undefined,
			format: "YYYY-MM-DD"
		},
		[SolaceDatePickerVariant.FORMAT_MONTH_YEAR]: {
			views: ["year", "month"],
			openTo: "month",
			format: "MMMM YYYY"
		}
	};
