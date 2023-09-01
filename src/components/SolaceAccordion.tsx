import SolaceComponentProps from "./SolaceComponentProps";
import { ArrowRightIcon } from "../resources/icons/ArrowRight";
import React from "react";
import clsx from "clsx";
import { Accordion, AccordionSummary, AccordionDetails, useTheme } from "@mui/material";

export interface SolaceAccordionProps extends SolaceComponentProps {
	/**
	 * unique identifier
	 */
	id?: string;
	/**
	 * 	The summary section of the Accordion component.
	 */
	summary: string | JSX.Element;
	/**
	 * 	The details section of the Accordion component, which can be expanded or closed.
	 */
	details: string | JSX.Element;
	/**
	 * A colored vertical bar displayed inside the left border to indicate the variant
	 */
	indicatorVariant?: "info" | "error" | "warn" | "success" | "secondary";
	/**
	 * If true, the Accordion component is disabled.
	 */
	disabled?: boolean;
	/**
	 *	If true, expands the Accordion component, otherwise collapse it.
	 */
	expanded: boolean;
	/**
	 * Callback function that fires when the expand/collapse state of the Accordion component is changed
	 * event: the event source of the callback function. Note: this is a generic event not a change event
	 * expanded: the expanded state of the Accordion component
	 */
	onChange: (event: React.SyntheticEvent, expanded: boolean) => void;
	/**
	 * If true, the Accordion component is has hover effect.
	 */
	hover?: boolean;
	/**
	 * Background color of the accordion
	 */
	backgroundColor?: string;
	/**
	 * If `false`, rounded corners are enabled. The default is `true`.
	 */
	square?: boolean;
	/**
	 * if `false`, the component will be borderless.  The default is `true`.
	 */
	border?: boolean;
	/**
	 * border color variants: error, info, warn and success, default to `palette.ux.secondary.w10`
	 */
	borderColor?: "info" | "error" | "warn" | "success";
	/**
	 * If `true`, the Accordion details component will not have padding. The default is `false`.
	 * If enabled, the content will not left align with the header title anymore.
	 */
	disablePadding?: boolean;
}

const parseBorderColor = (borderColor: string): string => {
	return `1px solid ${borderColor}`;
};

const SolaceAccordion = ({
	id,
	summary,
	details,
	indicatorVariant,
	disabled = false,
	expanded = false,
	hover = false,
	onChange,
	dataQa,
	dataTags,
	backgroundColor,
	square = true,
	border = true,
	borderColor,
	disablePadding = false
}: SolaceAccordionProps) => {
	const theme = useTheme();
	const getBorderColor = () => {
		switch (borderColor) {
			case "error":
				return theme.palette.ux.error.w100;
			case "warn":
				return theme.palette.ux.warning.w100;
			case "success":
				return theme.palette.ux.success.w100;
			case "info":
				return theme.palette.ux.info.w100;
			default:
				return theme.palette.ux.secondary.w10;
		}
	};

	return (
		<Accordion
			id={id}
			square={square}
			disableGutters={true}
			disabled={disabled}
			expanded={expanded}
			onChange={onChange}
			data-qa={dataQa}
			data-tags={dataTags}
			sx={{
				backgroundColor: backgroundColor ?? "transparent",
				border: border ? parseBorderColor(getBorderColor()) : "none"
			}}
		>
			<AccordionSummary
				expandIcon={<ArrowRightIcon />}
				className={clsx({ hasHoverEffect: hover }, indicatorVariant ? `indicator-${indicatorVariant}` : "")}
			>
				{summary}
			</AccordionSummary>
			<AccordionDetails sx={{ padding: disablePadding ? 0 : undefined }}>{details}</AccordionDetails>
		</Accordion>
	);
};

export default SolaceAccordion;
