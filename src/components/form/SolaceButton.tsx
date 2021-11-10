import { Button, IconButton, Link, Tooltip } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import { Box } from "@material-ui/system";
import { OpenExternalIcon } from "../../resources/icons/OpenExternalIcon";

import SolaceComponentProps from "../SolaceComponentProps";

export interface SolaceButtonProps extends SolaceComponentProps {
	/**
	 * Unique identifier for the button
	 */
	id?: string;
	/**
	 * The type/style of button to render
	 */
	variant: "call-to-action" | "outline" | "text" | "icon" | "link";
	/**
	 * Renders the button disabled
	 */
	isDisabled?: boolean;
	/**
	 * Controls when the link should have an underline
	 */
	underline?: "none" | "hover" | "always";
	/**
	 * Text to use for tooltip and arial-label (assecibility)
	 */
	title?: string;
	/**
	 * URL to navigate to on click
	 */
	href?: string;
	/**
	 * The component used for the root node. Either a string to use a HTML element or a component button
	 */
	component?: "button" | "span";
	/**
	 * Attribute which specifies the type of button (button, submit or reset)
	 */
	type?: "button" | "submit" | "reset";
	/**
	 * Element placed before the children
	 */
	startIcon?: symbol;
	/**
	 * Element placed after the children
	 */
	endIcon?: symbol;
	/**
	 * Optional click handler
	 */
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	/**
	 * Button label or contents
	 */
	children?: string | JSX.Element;
}

function SolaceButton({
	id,
	variant = "text",
	isDisabled = false,
	underline = "hover",
	title = "",
	href,
	component = "button",
	type = "button",
	startIcon,
	endIcon,
	onClick,
	dataQa,
	dataTags,
	children
}: SolaceButtonProps): JSX.Element {
	const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (onClick) {
			onClick(event);
		}
	};
	const theme = useTheme();

	if (variant === "icon") {
		return (
			<Tooltip title={title} arial-lable={title}>
				<IconButton
					data-qa={dataQa}
					data-tags={dataTags}
					type={type}
					id={id}
					disabled={isDisabled}
					onClick={handleClick}
				>
					{children}
				</IconButton>
			</Tooltip>
		);
	} else if (variant === "link") {
		let styles;
		if (!href) {
			styles = {
				padding: `${theme.spacing(6 / 8)} ${theme.spacing(16 / 8)}`,
				borderRadius: theme.spacing(4 / 8),
				minWidth: "100px",
				height: theme.spacing(32 / 8)
			};
		} else {
			styles = {
				padding: "0",
				display: "inline-flex",
				alignItems: "center"
			};
		}
		return (
			<Tooltip title={title} arial-lable={title}>
				<Link
					id={id}
					data-qa={dataQa}
					data-tags={dataTags}
					component={href ? "a" : "button"}
					target={href ? "_blank" : "_self"}
					href={href}
					type={type}
					disabled={isDisabled}
					underline={isDisabled ? "none" : underline ?? "hover"}
					sx={styles}
				>
					<Box sx={{ marginRight: theme.spacing(4 / 8) }} component="span">
						{children}
					</Box>
					{href && <OpenExternalIcon></OpenExternalIcon>}
				</Link>
			</Tooltip>
		);
	} else {
		enum MATERIAL_VARIANTS {
			contained = "contained",
			outlined = "outlined",
			text = "text"
		}
		const BUTTON_VARIANT_MAP = {
			"call-to-action": MATERIAL_VARIANTS.contained,
			outline: MATERIAL_VARIANTS.outlined,
			text: MATERIAL_VARIANTS.text
		};

		let padding;
		if (startIcon || endIcon) {
			padding = `${theme.spacing(4 / 8)}`;
		} else {
			padding = `${theme.spacing(6 / 8)} ${theme.spacing(16 / 8)}`;
		}

		return (
			<Tooltip title={title} arial-lable={title}>
				<Button
					id={id}
					data-qa={dataQa}
					data-tags={dataTags}
					startIcon={startIcon}
					endIcon={endIcon}
					component={component}
					type={type}
					disabled={isDisabled}
					variant={BUTTON_VARIANT_MAP[variant]}
					onClick={handleClick}
					sx={{ padding: padding }}
				>
					{children}
				</Button>
			</Tooltip>
		);
	}
}

export default SolaceButton;
