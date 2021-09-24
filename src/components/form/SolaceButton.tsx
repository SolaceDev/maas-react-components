import { Button, IconButton, Link, Tooltip } from "@material-ui/core";
import React from "react";
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
				>
					{children}
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
				>
					{children}
				</Button>
			</Tooltip>
		);
	}
}

export default SolaceButton;
