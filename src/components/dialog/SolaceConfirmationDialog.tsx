import {
	Breakpoint,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	styled
} from "@mui/material";
import { ReactNode } from "react";

import SolaceButton, { SolaceButtonProps } from "../form/SolaceButton";

export type actionProps = Partial<SolaceButtonProps> & { label: string; id?: string };

const CustomAction = styled("div")(({ theme }) => ({
	marginRight: "auto",
	paddingRight: theme.spacing(1)
}));

export interface SolaceConfirmationDialogProps {
	title?: string | JSX.Element;
	contentText?: string;
	actions: actionProps[];
	customAction?: JSX.Element;
	isOpen: boolean;
	/**
	 * whether to show an indeterminate linear progress indicator at the bottom border of the dialog
	 */
	linearProgressIndicator?: boolean;
	/**
	 * To override the display attribute of DialogContent, default: block
	 * currently supports block, contents, and flex
	 */
	contentLayout?: "block" | "contents" | "flex";
	maxWidth?: Breakpoint;
	children?: ReactNode;
}

function SolaceConfirmationDialog({
	title,
	contentText,
	actions,
	customAction,
	isOpen = false,
	maxWidth = "dialogMd",
	contentLayout = "block",
	linearProgressIndicator = false,
	children
}: SolaceConfirmationDialogProps): JSX.Element {
	return (
		<Dialog open={isOpen} maxWidth={maxWidth} className={linearProgressIndicator ? "linearProgressIndicator" : ""}>
			<DialogTitle>
				<div data-qa="title" style={{ wordBreak: "break-word" }}>
					{title}
				</div>
			</DialogTitle>
			<DialogContent data-qa="content" sx={{ display: contentLayout }}>
				{contentText && <DialogContentText>{contentText}</DialogContentText>}
				{children}
			</DialogContent>
			<DialogActions>
				{customAction && <CustomAction>{customAction}</CustomAction>}
				{actions?.map((action) => (
					<SolaceButton
						dataQa={action.dataQa}
						key={action.label}
						onClick={action.onClick}
						variant={action.variant ?? "text"}
						isDisabled={action.isDisabled}
						endIcon={action.endIcon}
					>
						{action.label}
					</SolaceButton>
				))}
			</DialogActions>
		</Dialog>
	);
}

export default SolaceConfirmationDialog;
