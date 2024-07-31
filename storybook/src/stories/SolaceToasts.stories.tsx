import React from "react";
import { Meta } from "@storybook/react";
import { SolaceToasts, SolaceButton } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import CloseIcon from "@mui/icons-material/Close";

export default {
	title: "Under Construction/SolaceToasts",
	component: SolaceToasts,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=4434%3A30917"
		},
		docs: {
			description: {
				component: "SolaceToasts component for reuse in all Solace based applications"
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
			control: { type: "text" },
			description: "Title displayed at the top of the tooltip"
		},
		open: {
			control: { type: "boolean" }
		}
	}
} as Meta<typeof SolaceToasts>;

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
		open: true
	}
};

export const InfoToast = {
	args: {
		severity: "info",
		message: "This is a sample info toast",
		open: true
	}
};

export const WarningToast = {
	args: {
		severity: "warning",
		message: "This is a sample warning toast",
		open: true
	}
};

export const ErrorToast = {
	args: {
		severity: "error",
		message: "This is a sample error toast",
		open: true
	}
};

export const WithActionIcon = {
	args: {
		message: "This is with an action icon",
		action: <CloseIcon className="close-icon" onClick={action("delete icon clicked")} />,
		open: true
	}
};

export const WithActionAndCloseIcon = {
	args: {
		message: "This is with an action icon and a close icon",
		action: (
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				<SolaceButton variant="text" onClick={action("action button clicked")}>
					Action
				</SolaceButton>
				<CloseIcon className="close-icon" onClick={action("close icon clicked")} />
			</div>
		),
		open: true
	}
};

// MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root
