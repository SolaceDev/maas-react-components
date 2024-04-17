let dataCollectionApi: React.Dispatch<
	React.SetStateAction<{
		[key: string]: unknown;
	}>
>;

export const initializeDataTrackingApi = (api: React.Dispatch<React.SetStateAction<{ [key: string]: unknown }>>) => {
	// Initialize the data tracking API here
	// For example, you can assign an instance of the API to the `dataCollectionApi` variable

	dataCollectionApi = api;
};

// Export the dataCollectionApi variable so that it can be used by other components
export { dataCollectionApi };
