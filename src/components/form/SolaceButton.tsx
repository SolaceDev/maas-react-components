import { Button, IconButton, Link } from "@material-ui/core";
import React from "react";

// type Buttons = ButtonProps | IconButtonProps | LinkProps;

// export type SolaceButtonProps = Buttons & { variant: "text" | "outlined" | "contained" | "icon" | "link" };

export interface SolaceButtonProps {
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
	disabled?: boolean;
	/**
	 * Controls when the link should have an underline
	 */
	underline?: "none" | "hover" | "always";
	/**
	 * Optional click handler
	 */
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const SolaceButton: React.FC<SolaceButtonProps> = ({
	id,
	variant = "text",
	disabled = false,
	underline = "hover",
	onClick,
	children
}) => {
	const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (onClick) {
			onClick(event);
		}
	};

	if (variant === "icon") {
		return <IconButton id={id}>{children}</IconButton>;
	} else if (variant === "link") {
		return (
			<Link id={id} component="button" underline={disabled ? "none" : underline ?? "hover"}>
				{children}
			</Link>
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
			<Button id={id} variant={BUTTON_VARIANT_MAP[variant]} onClick={handleClick}>
				{children}
			</Button>
		);
	}
};

export default SolaceButton;
