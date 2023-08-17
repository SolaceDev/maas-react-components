import SolaceComponentProps from "../components/SolaceComponentProps";
import { BASE_SIZE_TYPES } from "./sizing";
import { RANGE_0_TO_100 } from "./numericTypes";

export const PROGRESS_HEIGHT: BASE_SIZE_TYPES = {
	xs: 4, // size of the progress bar in modal dialog component
	sm: 6, // size of small progress indicator on side panels
	md: 10, // size of progress bar when used on pages
	lg: 14
};

export interface SolaceLinearProgressProps extends SolaceComponentProps {
	/**
	 * The variant style to use. Use indeterminate when there is no progress value to showcase
	 */
	variant: "indeterminate" | "determinate";

	/**
	 *  Height of the linear indicator
	 */
	height?: keyof BASE_SIZE_TYPES;

	/**
	 * Represent the progress value in percentage (useful only if the variant is "determinate", value between 0 and 100).
	 */
	value?: RANGE_0_TO_100;

	/**
	 * Color to style the progress bar with.
	 */
	color?: "default" | "learning";
}
