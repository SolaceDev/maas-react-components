import { Breakpoint, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { ReactNode } from "react";

import SolaceButton, { SolaceButtonProps } from "../form/SolaceButton";

type actionProps = Partial<SolaceButtonProps> & { label: string; id?: string };

export interface SolaceConfirmationDialogProps {
	title?: string;
	contentText?: string;
	actions: actionProps[];
	isOpen: boolean;
	/**
	 * whether to show an indeterminate linear progress indicator at the bottom border of the dialog
	 */
	linearProgressIndicator?: boolean;
	maxWidth?: Breakpoint;
	children?: ReactNode;
}

function SolaceConfirmationDialog({
	title,
	contentText,
	actions,
	isOpen = false,
	maxWidth = "dialogMd",
	linearProgressIndicator = false,
	children
}: SolaceConfirmationDialogProps): JSX.Element {
	return (
		<Dialog open={isOpen} maxWidth={maxWidth} className={linearProgressIndicator ? "linearProgressIndicator" : ""}>
			<DialogTitle>
				<div data-qa="title">{title}</div>
			</DialogTitle>
			<DialogContent>
				<div data-qa="content">
					{contentText && <DialogContentText>{contentText}</DialogContentText>}
					{children}
				</div>
			</DialogContent>
			<DialogActions>
				{actions.map((action) => (
					<SolaceButton
						data-qa={action.id}
						key={action.label}
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
