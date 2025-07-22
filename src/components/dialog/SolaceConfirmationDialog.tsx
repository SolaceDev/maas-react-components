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
	actions?: actionProps[];
	customAction?: JSX.Element;
	/**
	 * whether to disable the default padding of Dialog and Dialog Title components
	 * @default false
	 */
	disableDefaultPadding?: boolean;
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
	disableDefaultPadding = false,
	isOpen = false,
	maxWidth = "dialogMd",
	contentLayout = "block",
	linearProgressIndicator = false,
	children
}: SolaceConfirmationDialogProps): JSX.Element {
	const linearProgressIndicatorClass = linearProgressIndicator ? "linearProgressIndicator" : "";
	const disablePaddingClass = disableDefaultPadding ? "disableDefaultPadding" : "";
	return (
		<Dialog open={isOpen} maxWidth={maxWidth} className={`${linearProgressIndicatorClass} ${disablePaddingClass}`}>
			<DialogTitle>
				<div data-qa="title" style={{ wordBreak: "break-word" }}>
					{title}
				</div>
			</DialogTitle>
			<DialogContent data-qa="content" sx={{ display: contentLayout }}>
				{contentText && <DialogContentText>{contentText}</DialogContentText>}
				{children}
			</DialogContent>
			{(customAction || (actions && actions.length > 0)) && (
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
			)}
		</Dialog>
	);
}

export default SolaceConfirmationDialog;
