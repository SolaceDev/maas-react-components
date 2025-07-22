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

import { Button, IconButton, Link, SxProps, Theme, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { OpenExternalIcon } from "../../resources/icons/OpenExternalIcon";
import SolaceTooltip from "../SolaceToolTip";

import SolaceComponentProps from "../SolaceComponentProps";
import { dataCollectionApi } from "../../resources/trackingapi";

export interface SolaceButtonProps extends SolaceComponentProps {
	id?: string;
	variant: "call-to-action" | "outline" | "text" | "icon" | "link";
	"aria-label"?: string;
	"aria-labelledby"?: string;
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
	openLinkInNewTab?: boolean;
	disabledFocusState?: boolean;
}

// Todo: Refactor this function to reduce its Cognitive Complexity from 18 to the 15 allowed
// eslint-disable-next-line sonarjs/cognitive-complexity
function SolaceButton({
	id,
	variant = "text",
	"aria-label": ariaLabel,
	"aria-labelledby": ariaLabelledby,
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
	dense = false,
	openLinkInNewTab = href ? true : false,
	eventName,
	disabledFocusState = false
}: SolaceButtonProps): JSX.Element {
	const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (onClick) {
			onClick(event);
		}
		dataCollectionApi && dataCollectionApi({ title, variant, id, href, dataQa, dataTags, eventName });
	};
	const theme = useTheme();

	if (variant === "icon") {
		const focusStyles: SxProps<Theme> = disabledFocusState
			? {}
			: {
					"&.MuiIconButton-root.Mui-focusVisible": {
						outline: `1px solid ${theme.palette.ux.accent.n2.wMain}`,
						outlineOffset: "1px",
						borderRadius: "3px"
					}
			  };

		return (
			<SolaceTooltip title={title}>
				<IconButton
					aria-label={ariaLabel}
					aria-labelledby={ariaLabelledby}
					data-qa={dataQa}
					data-tags={dataTags}
					type={type}
					id={id}
					disabled={isDisabled}
					onClick={handleClick}
					size="large"
					href={href}
					component={href ? "a" : "button"}
					sx={focusStyles}
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
				height: theme.spacing(32 / 8),
				"&.Mui-focusVisible": {
					borderRadius: 0,
					outline: `1px solid ${theme.palette.ux.accent.n2.wMain}`,
					outlineOffset: "-1px"
				}
			};
		} else {
			styles = {
				padding: "0",
				display: "inline-flex",
				alignItems: "center",
				verticalAlign: "inherit",
				"&.Mui-focusVisible": {
					outline: `1px solid ${theme.palette.ux.accent.n2.wMain}`,
					outlineOffset: "1px"
				}
			};
		}
		return (
			<SolaceTooltip title={title}>
				<Link
					id={id}
					data-qa={dataQa}
					data-tags={dataTags}
					component={href ? "a" : "button"}
					target={openLinkInNewTab ? "_blank" : "_self"}
					href={href}
					type={type}
					disabled={isDisabled}
					underline={isDisabled ? "none" : underline ?? "hover"}
					sx={styles}
					onClick={handleClick}
				>
					<Box sx={{ marginRight: href ? theme.spacing(4 / 8) : 0 }} component="span">
						{children}
					</Box>
					{href && openLinkInNewTab && <OpenExternalIcon></OpenExternalIcon>}
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
		if (startIcon) {
			padding = `${theme.spacing(4 / 8)} ${theme.spacing(16 / 8)} ${theme.spacing(4 / 8)} ${theme.spacing(6 / 8)}`;
		} else if (endIcon) {
			padding = `${theme.spacing(4 / 8)} ${theme.spacing(6 / 8)} ${theme.spacing(4 / 8)} ${theme.spacing(16 / 8)}`;
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
					<div style={{ width: "100%", textAlign: "center" }}>{children}</div>
				</Button>
			</SolaceTooltip>
		);
	}
}

export default SolaceButton;
