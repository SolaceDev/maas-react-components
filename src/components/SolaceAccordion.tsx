import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import SolaceComponentProps from "./SolaceComponentProps";
import { ArrowRightIcon } from "../resources/icons/ArrowRight";
import React from "react";

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
}

const SolaceAccordion = ({
	id,
	summary,
	details,
	disabled = false,
	expanded = false,
	onChange,
	dataQa,
	dataTags
}: SolaceAccordionProps) => {
	return (
		<Accordion
			id={id}
			square={true}
			disableGutters={true}
			disabled={disabled}
			expanded={expanded}
			onChange={onChange}
			data-qa={dataQa}
			data-tags={dataTags}
		>
			<AccordionSummary expandIcon={<ArrowRightIcon />}>{summary}</AccordionSummary>
			<AccordionDetails>{details}</AccordionDetails>
		</Accordion>
	);
};

export default SolaceAccordion;
