import SolaceComponentProps from "./SolaceComponentProps";
import { ArrowRightIcon } from "../resources/icons/ArrowRight";
import React from "react";
import clsx from "clsx";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

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
	indicatorVariant?: "info" | "error" | "warn" | "success";
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
}

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
	square = true
}: SolaceAccordionProps) => {
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
			sx={{ backgroundColor: backgroundColor ?? "transparent" }}
			className={indicatorVariant ? `indicator-${indicatorVariant}` : ""}
		>
			<AccordionSummary expandIcon={<ArrowRightIcon />} className={clsx({ hasHoverEffect: hover })}>
				{summary}
			</AccordionSummary>
			<AccordionDetails>{details}</AccordionDetails>
		</Accordion>
	);
};

export default SolaceAccordion;
