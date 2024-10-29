import { CircularProgress, styled, useTheme } from "@mui/material";
import SolaceComponentProps from "./SolaceComponentProps";
import { BASE_SIZE_TYPES } from "../types/sizing";

/**
 * Helper component to show the circular spinner with capability to display the value in progress of something
 * Please see https://mui.com/material-ui/api/circular-progress/ to view all the props supported.
 * @param props SolaceCircularProgress
 * @returns JSX.Element
 */

const PROGRESS_SIZES: BASE_SIZE_TYPES = {
	xs: 14,
	sm: 24,
	md: 30,
	lg: 42
};

const Container = styled("div")(({ theme }) => ({
	width: "fit-content",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	rowGap: theme.spacing(1.5)
}));

export interface SolaceCircularProgressProps extends SolaceComponentProps {
	/**
	 * 	Text to display below the spinner
	 */
	message?: string | JSX.Element;

	/**
	 * 	Used to locate this component for testing purpose
	 */
	dataQa?: string;
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
	/**
	 * If `true`, the shrink animation is disabled.
	 * This only works if variant is `indeterminate`.
	 * @default false
	 */
	disableShrink?: boolean;
}

export default function SolaceCircularProgress(props: SolaceCircularProgressProps): JSX.Element {
	const { variant, value, size, disableShrink, dataQa, message } = props;
	return (
		<Container data-qa={dataQa ?? "loading-spinner"}>
			<CircularProgress
				variant={variant ?? "indeterminate"}
				value={variant === "determinate" ? value : undefined}
				size={PROGRESS_SIZES[size ?? "sm"]}
				disableShrink={disableShrink}
				sx={{ color: useTheme().palette.ux.brand.w30 }}
			/>
			{message && <div>{message}</div>}
		</Container>
	);
}
