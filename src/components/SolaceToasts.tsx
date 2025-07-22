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

import { Snackbar, useTheme } from "@mui/material";
import Alert from "@mui/material/Alert";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import React from "react";

export type SolaceToastsProps = {
	/** @deprecated This prop will be removed in a future version. Target: August 2025 */
	severity?: "success" | "info" | "warning" | "error";
	message: React.ReactNode;
	open?: boolean;
	action?: React.ReactNode;
	autoDismiss?: boolean;
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
	const iconMapping = {
		success: <CheckCircleOutlineIcon sx={{ color: theme.palette.ux.brand.wMain }} />,
		error: <CancelOutlinedIcon sx={{ color: theme.palette.ux.error.w100 }} fontSize="inherit" />,
		info: <InfoOutlinedIcon sx={{ color: theme.palette.ux.info.w100 }} fontSize="inherit" />,
		warning: <ReportProblemOutlinedIcon sx={{ color: theme.palette.ux.warning.w100 }} fontSize="inherit" />
	};

	const { message, severity, open, action, autoDismiss = true, onClose } = props;

	return (
		<Snackbar
			className="alert-toast"
			open={open}
			message={severity === undefined && message}
			//if null, autoHide is disabled, if there is action then 8000 else 4000
			autoHideDuration={!autoDismiss ? null : action ? 8000 : 4000}
			resumeHideDuration={1000}
			onClose={(_event, reason) => {
				// disable close on clickaway
				if (onClose && reason !== "clickaway") {
					onClose(_event);
				}
			}}
			action={action}
			role="toast"
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
		>
			{severity && (
				<Alert
					style={{ padding: severity ? "0 16px 0 8px" : "0 16px" }}
					icon={iconMapping[severity]}
					severity={severity}
				>
					{message}
				</Alert>
			)}
		</Snackbar>
	);
}
