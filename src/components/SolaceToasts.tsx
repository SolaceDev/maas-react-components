import { IconButton, Snackbar, styled } from "@mui/material";
import Alert from "@mui/material/Alert";
import { green, grey } from "@mui/material/colors";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

export type SolaceToasts = {
	severity?: "success" | "info" | "warning" | "error";
	message?: string;
	open?: boolean;
	action?: React.ReactNode;
	onClose: (event: React.SyntheticEvent<Element, Event>) => void;
};

const iconMapping = {
	success: <CheckCircleOutlineIcon sx={{ color: green[500] }} />,
	error: <CancelOutlinedIcon color="error" fontSize="inherit" />,
	info: <InfoOutlinedIcon fontSize="inherit" />,
	warning: <ReportProblemOutlinedIcon fontSize="inherit" />
};

const StyledAlert = styled(Alert)(() => ({ backgroundColor: grey[800], color: "white" }));

/**
 * Provides toasts that match solace ui guidelines.
 * If severity is not passed in no icon would be shown.
 * Default action button is close icon, but can be overwritten by any react element.
 * @type SolaceToasts
 * @param props
 * @returns JSX.Element
 */

export default function SolaceToasts(props: SolaceToasts): JSX.Element {
	const defaultAction = props.action ?? (
		<IconButton aria-label="delete" onClick={props.onClose} size="large">
			<CloseIcon />
		</IconButton>
	);

	const { message, severity } = props;

	return (
		<Snackbar
			id="alert-toast"
			{...props}
			message={severity === undefined && message}
			// will persist in case of error until closed manually.
			autoHideDuration={severity === "error" ? null : 6000}
			onClose={(_event, reason) => {
				// disable close on clickaway
				if (reason !== "clickaway") {
					props.onClose;
				}
			}}
			action={defaultAction}
			role="toast"
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
		>
			{severity && (
				<StyledAlert icon={iconMapping[severity]} severity={severity} onClose={props.onClose} action={props.action}>
					{message}
				</StyledAlert>
			)}
		</Snackbar>
	);
}
