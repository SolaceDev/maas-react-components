import { CircularProgress, useTheme } from "@mui/material";
import SolaceComponentProps from "./SolaceComponentProps";
import { BASE_SIZE_TYPES } from "../resources/sizing";

/**
 * Helper component to show the circular spinner with capability to display the value in progress of something
 * Please see https://mui.com/material-ui/api/circular-progress/ to view all the props supported.
 * @param props SolaceCircularProgress
 * @returns JSX.Element
 */

const PROGRESS_SIZES: BASE_SIZE_TYPES = {
	sm: 24,
	md: 30,
	lg: 42
};

export interface SolaceCircularProgressProps extends SolaceComponentProps {
	/**
	 * 	The variant to use.
	 */
	variant?: "indeterminate" | "determinate";
	/**
	 * 	useful only if the variant is "determinate". Represent the progress value
	 */
	value?: number;
	/**
	 *  Size of the spinner
	 */
	size?: keyof BASE_SIZE_TYPES;
}

export default function SolaceCircularProgress(props: SolaceCircularProgressProps): JSX.Element {
	const { variant, value, size } = props;
	return (
		<CircularProgress
			variant={variant ?? "indeterminate"}
			value={variant === "determinate" ? value : undefined}
			size={PROGRESS_SIZES[size ?? "sm"]}
			sx={{ color: useTheme().palette.ux.brand.w30 }}
		/>
	);
}
