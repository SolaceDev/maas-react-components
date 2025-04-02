import React from "react";
import SolaceComponentProps from "../components/SolaceComponentProps";

/**
 * Props for the SolaceNewCardHeader component
 */
export interface SolaceNewCardHeaderProps extends SolaceComponentProps {
	/**
	 * The avatar element to display
	 */
	icon?: React.ReactNode;

	/**
	 * The title element to display
	 */
	title?: string;

	/**
	 * The subheader element to display
	 * This will only render if `title` is provided.
	 */
	subTitle?: string;

	/**
	 * The action elements to display in the header
	 * Can be any React node such as a div containing buttons, menus, etc.
	 * These will be aligned to the top of the header.
	 */
	actionElements?: React.ReactNode;

	/**
	 * Data-qa attribute for testing
	 */
	dataQa?: string;

	/**
	 * Data-tags attribute for additional metadata
	 */
	dataTags?: string;
}
