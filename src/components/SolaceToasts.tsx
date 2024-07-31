import { IconButton, Snackbar, useTheme } from "@mui/material";
import Alert from "@mui/material/Alert";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

export type SolaceToastsProps = {
	severity?: "success" | "info" | "warning" | "error";
	message?: string;
	open?: boolean;
	action?: React.ReactNode;
	onClose: (event: React.SyntheticEvent<Element> | Event) => void;
};

/**
 * Provides toasts that match solace ui guidelines.
 * If severity is not passed in no icon would be shown.
 * Default action button is close icon, but can be overwritten by any react element.
 * @type SolaceToasts
 * @param props
 * @returns JSX.Element
 */
export default function SolaceToasts(props: SolaceToastsProps): JSX.Element {
	const theme = useTheme();
	const defaultAction = props.action ?? (
		<IconButton aria-label="delete" onClick={props.onClose} size="large">
			<CloseIcon className="close-icon" />
		</IconButton>
	);
	const iconMapping = {
		success: <CheckCircleOutlineIcon sx={{ color: theme.palette.ux.brand.wMain }} />,
		error: <CancelOutlinedIcon sx={{ color: theme.palette.ux.error.w100 }} fontSize="inherit" />,
		info: <InfoOutlinedIcon sx={{ color: theme.palette.ux.info.w100 }} fontSize="inherit" />,
		warning: <ReportProblemOutlinedIcon sx={{ color: theme.palette.ux.warning.w100 }} fontSize="inherit" />
	};

	const { message, severity, onClose } = props;

	return (
		<Snackbar
			className="alert-toast"
			{...props}
			message={severity === undefined && message}
			// will persist in case of error until closed manually.
			autoHideDuration={severity === "error" ? null : 6000}
			onClose={(_event, reason) => {
				// disable close on clickaway
				if (onClose && reason !== "clickaway") {
					onClose(_event);
				}
			}}
			action={defaultAction}
			role="toast"
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
		>
			{severity && (
				<Alert
					style={{ padding: severity ? "0 16px 0 8px" : "0 16px" }}
					icon={iconMapping[severity]}
					severity={severity}
					onClose={props.onClose}
					action={props.action}
				>
					{message}
				</Alert>
			)}
		</Snackbar>
	);
}
