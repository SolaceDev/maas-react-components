import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogProps,
	DialogTitle,
	Typography,
	useTheme
} from "@material-ui/core";
import React from "react";

import SolaceButton, { SolaceButtonProps } from "./form/SolaceButton";

type actionProps = Partial<SolaceButtonProps> & { label: string };

interface SolaceConfirmationDialog extends DialogProps {
	contentText?: string;
	actions: actionProps[];
}

/**
 * Common Confirmation Dialog.
 * @interface SolaceConfirmationDialog
 * @param props
 * @returns
 */
export default function SolaceConfirmationDialog(props: SolaceConfirmationDialog): JSX.Element {
	const { contentText, children, title, actions, ...rest } = props;
	const theme = useTheme();

	return (
		<Dialog {...rest}>
			<DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
			<DialogContent>
				{contentText && (
					<DialogContentText>
						<Typography
							variant="body1"
							sx={{ color: theme.palette.text.primary }}
							gutterBottom={children !== undefined ? true : false}
						>
							{contentText}
						</Typography>
					</DialogContentText>
				)}
				{children}
			</DialogContent>
			<DialogActions sx={{ padding: theme.spacing(3), paddingTop: theme.spacing(1.5) }}>
				{actions.map((action) => (
					<SolaceButton
						key={`key-${action.label}`}
						onClick={action.onClick}
						variant={action.variant ?? "text"}
						isDisabled={action.isDisabled}
					>
						{action.label}
					</SolaceButton>
				))}
			</DialogActions>
		</Dialog>
	);
}

SolaceConfirmationDialog.defaultProps = {
	maxWidth: "md"
};
