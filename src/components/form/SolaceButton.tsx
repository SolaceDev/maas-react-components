import { Button, ButtonProps, IconButton, IconButtonProps, Link, LinkProps } from "@material-ui/core";
import React from "react";

type Buttons = ButtonProps | IconButtonProps | LinkProps;

export type SolaceButtonProps = Buttons & { variant: "text" | "outlined" | "contained" | "icon" | "link" };

/**
 * SolaceButton
 * Contains all variants of buttons.
 * @interface SolaceButtonProps
 * @param props
 * @returns JSX.Element
 */
export default function SolaceButton(props: SolaceButtonProps): JSX.Element {
	const { variant, ...rest } = props;

	if (variant === "icon") {
		const props = rest as IconButtonProps;

		return <IconButton {...props}>{props.children}</IconButton>;
	} else if (variant === "link") {
		const props = rest as LinkProps & ButtonProps;

		return (
			<Link {...props} component="button" underline={props.disabled ? "none" : props.underline ?? "hover"}>
				{props.children}
			</Link>
		);
	} else {
		const props = rest as ButtonProps;

		return (
			<Button {...props} variant={variant}>
				{props.children}
			</Button>
		);
	}
}

SolaceButton.defaultProps = {
	variant: "text"
};
