import { Button, IconButton, Link } from "@mui/material";
import { useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { OpenExternalIcon } from "../../resources/icons/OpenExternalIcon";
import SolaceTooltip from "../SolaceToolTip";

import SolaceComponentProps from "../SolaceComponentProps";

export interface SolaceButtonProps extends SolaceComponentProps {
	id?: string;
	variant: "call-to-action" | "outline" | "text" | "icon" | "link";
	isDisabled?: boolean;
	underline?: "none" | "hover" | "always";
	title?: string;
	href?: string;
	component?: "button" | "span";
	type?: "button" | "submit" | "reset";
	startIcon?: symbol | JSX.Element;
	endIcon?: symbol | JSX.Element;
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	children?: string | JSX.Element;
	dense?: boolean; // only applicable to link variant
}

// Todo: Refactor this function to reduce its Cognitive Complexity from 18 to the 15 allowed
// eslint-disable-next-line sonarjs/cognitive-complexity
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
	children,
	dense = false
}: SolaceButtonProps): JSX.Element {
	const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (onClick) {
			onClick(event);
		}
	};
	const theme = useTheme();

	if (variant === "icon") {
		return (
			<SolaceTooltip title={title}>
				<IconButton
					data-qa={dataQa}
					data-tags={dataTags}
					type={type}
					id={id}
					disabled={isDisabled}
					onClick={handleClick}
					size="large"
				>
					{children}
				</IconButton>
			</SolaceTooltip>
		);
	} else if (variant === "link") {
		let styles;
		if (!href && !dense) {
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
				alignItems: "center",
				verticalAlign: "inherit"
			};
		}
		return (
			<SolaceTooltip title={title}>
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
					onClick={handleClick}
				>
					<Box sx={{ marginRight: href ? theme.spacing(6 / 8) : 0 }} component="span">
						{children}
					</Box>
					{href && <OpenExternalIcon></OpenExternalIcon>}
				</Link>
			</SolaceTooltip>
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
			<SolaceTooltip title={title}>
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
			</SolaceTooltip>
		);
	}
}

export default SolaceButton;
