import React from "react";
import SolaceComponentProps from "../components/SolaceComponentProps";
import { SolaceNewCardHeaderProps } from "./solaceNewCardHeader";

/**
 * Props for the SolaceNewCard component
 */
export interface SolaceNewCardProps extends SolaceComponentProps {
	/**
	 * Props for the card header component
	 */
	cardHeaderProps?: SolaceNewCardHeaderProps;

	/**
	 * Content to display in the card body
	 */
	cardContent?: React.ReactNode;

	/**
	 * Actions to display at the bottom of the card
	 */
	cardActions?: React.ReactNode;

	/**
	 * Width of the card
	 */
	width?: string;

	/**
	 * Height of the card
	 */
	height?: string;

	/**
	 * Minimum width of the card
	 * @default "250px"
	 */
	minWidth?: string;

	/**
	 * Padding for the entire card
	 * @default theme.spacing(2) (16px)
	 */
	padding?: string;

	/**
	 * Whether the card is in read-only mode
	 *
	 * Read-only cards are used as a visual layout option to help categorize and group topics.
	 * They are not interactive and serve primarily as information containers.
	 *
	 * When set to true:
	 * - The card receives a "readOnly" CSS class that can be styled differently
	 * - The card maintains its role as "article" for accessibility
	 * - Interactive elements within the card should be avoided or disabled
	 *
	 * When set to false (default):
	 * - The card can serve as an entry point into deeper levels of detail or navigation
	 * - Interactive elements like buttons and menus can be included
	 *
	 * @default false
	 */
	readOnly?: boolean;

	/**
	 * ARIA label for the card
	 */
	ariaLabel?: string;

	/**
	 * Data-qa attribute for testing
	 */
	dataQa?: string;

	/**
	 * Data-tags attribute for additional metadata
	 */
	dataTags?: string;
}
