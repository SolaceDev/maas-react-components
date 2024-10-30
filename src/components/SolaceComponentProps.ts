export default interface SolaceComponentProps {
	/**
	 * This is the data-qa attribute for the component to identify it in tests
	 */
	dataQa?: string;
	/**
	 * This is the data-tags attribute for the component to identify it in tests
	 */
	dataTags?: string;
	/**
	 * Event name to be used in tracking facility
	 */
	eventName?: string;
}
