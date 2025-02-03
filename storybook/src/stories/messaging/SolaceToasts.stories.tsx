import React from "react";
import { Meta } from "@storybook/react";
import { SolaceToasts, SolaceButton, IconButton } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import CloseIcon from "@mui/icons-material/Close";

(SolaceToasts as React.FC & { displayName?: string }).displayName = "SolaceToasts";
(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";
(CloseIcon as React.FC & { displayName?: string }).displayName = "CloseIcon";
(IconButton as React.FC & { displayName?: string }).displayName = "IconButton";

export default {
	title: "Messaging/Toast",
	component: SolaceToasts,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=4434%3A30917"
		},
		docs: {
			description: {
				component:
					"SolaceToasts component for reuse in all Solace based applications. Code component name: SolaceToasts"
			}
		}
	},
	argTypes: {
		severity: {
			options: ["success", "info", "warning", "error"],
			control: {
				type: "select"
			}
		},
		message: {
			control: { type: "object" },
			description: "Title displayed at the top of the tooltip"
		},
		open: {
			control: { type: "boolean" }
		},
		autoDismiss: {
			control: { type: "boolean" }
		}
	}
} as Meta<typeof SolaceToasts>;

const buttonClickedAction = action("action button clicked");

export const DefaultToast = {
	args: {
		message: "This is a default toast",
		open: true,
		onClose: action("closing")
	}
};

export const SuccessToast = {
	args: {
		severity: "success",
		message: "This is a sample success toast",
		open: true,
		onClose: action("closing")
	}
};

export const InfoToast = {
	args: {
		severity: "info",
		message: "This is a sample info toast",
		open: true,
		onClose: action("closing")
	}
};

export const WarningToast = {
	args: {
		severity: "warning",
		message: "This is a sample warning toast",
		open: true,
		onClose: action("closing")
	}
};

export const ErrorToast = {
	args: {
		severity: "error",
		message: "This is a sample error toast",
		open: true,
		onClose: action("closing")
	}
};

export const WithActionIcon = {
	args: {
		message: "This is with an action icon",
		action: (
			<IconButton onClick={action("close icon clicked")}>
				<CloseIcon className="close-icon" />
			</IconButton>
		),
		open: true,
		onClose: action("closing")
	}
};

export const WithActionAndCloseIcon = {
	args: {
		message: "This is with an action icon and a close icon",
		action: (
			<React.Fragment>
				<SolaceButton variant="text" onClick={buttonClickedAction}>
					Action
				</SolaceButton>
				<IconButton onClick={action("close icon clicked")}>
					<CloseIcon className="close-icon" />
				</IconButton>
			</React.Fragment>
		),
		open: true,
		onClose: action("closing")
	}
};

export const WithStyledMessage = {
	args: {
		message: (
			<span>
				3 applications added to <b>Staging EventMesh</b>
			</span>
		),
		action: (
			<SolaceButton variant="text" onClick={buttonClickedAction}>
				Undo
			</SolaceButton>
		),
		open: true,
		onClose: action("closing")
	}
};

export const WithAutoDismissDisabled = {
	args: {
		message: "This is toast that will not auto dismiss",
		action: (
			<SolaceButton variant="text" onClick={buttonClickedAction}>
				Refresh
			</SolaceButton>
		),
		open: true,
		autoDismiss: false,
		onClose: action("closing")
	}
};
