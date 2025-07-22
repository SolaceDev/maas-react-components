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
