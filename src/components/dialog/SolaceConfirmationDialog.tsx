import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { ReactNode } from "react";

import SolaceButton, { SolaceButtonProps } from "../form/SolaceButton";

type actionProps = Partial<SolaceButtonProps> & { label: string };

export interface SolaceConfirmationDialogProps {
	title?: string;
	contentText?: string;
	actions: actionProps[];
	isOpen: boolean;
	children: ReactNode;
}

function SolaceConfirmationDialog({
	title,
	contentText,
	actions,
	isOpen = false,
	children
}: SolaceConfirmationDialogProps): JSX.Element {
	return (
		<Dialog open={isOpen}>
			<DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
			<DialogContent>
				{contentText && <DialogContentText>{contentText}</DialogContentText>}
				{children}
			</DialogContent>
			<DialogActions>
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

export default SolaceConfirmationDialog;
