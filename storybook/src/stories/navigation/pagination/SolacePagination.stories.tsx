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

/* eslint-disable sonarjs/no-duplicate-string */
import React, { useState } from "react";
import { Meta } from "@storybook/react";
import { SolacePagination } from "@SolaceDev/maas-react-components";

(SolacePagination as React.FC & { displayName?: string }).displayName = "SolacePagination";

export default {
	title: "Navigation/Pagination",
	component: SolacePagination,
	parameters: {},
	args: {},
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Optional ID of this component",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		activePage: {
			control: { type: "number" },
			description: "The current active page",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "1" }
			}
		},
		totalResults: {
			control: { type: "number" },
			description: "The total number of results",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "156" }
			}
		},
		pageSize: {
			control: {
				type: "select",
				options: [10, 20, 50, 100]
			},
			description: "The number of items per page",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "10" }
			}
		},
		displayText: {
			control: { type: "text" },
			description: "The string template to use for communicating pagination details",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: '"Showing {start} to {end} of {total} results"' }
			}
		},
		onPageSelection: {
			action: "page selected",
			description: "Callback function to notify which page was clicked/selected by the end user",
			table: {
				defaultValue: { summary: "undefined" }
			}
		},
		loading: {
			control: { type: "boolean" },
			description: "The loading state flag for pagination component",
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data QA attribute for testing",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data tags attribute for additional metadata",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		// Future accessibility and interaction props (not currently implemented in component)
		"aria-label": {
			control: { type: "text" },
			description: "Accessibility label for the pagination component",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		"aria-labelledby": {
			control: { type: "text" },
			description: "ID of element that labels the pagination component for accessibility",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		startIcon: {
			control: false,
			description: "Element placed before the pagination controls",
			table: {
				type: { summary: "React.ReactNode | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		endIcon: {
			control: false,
			description: "Element placed after the pagination controls",
			table: {
				type: { summary: "React.ReactNode | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		onClick: {
			action: "clicked",
			description: "Optional click handler for pagination component",
			table: {
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolacePagination>;

interface PaginationWithStateProps {
	initialPage: number;
	totalResults: number;
	pageSize: number;
	displayText: string;
	onPageSelection?: (page: number) => void;
}

const PaginationWithState = ({
	initialPage = 1,
	totalResults = 156,
	pageSize,
	displayText,
	onPageSelection
}: PaginationWithStateProps): JSX.Element => {
	const [selectedPage, setSelectedPage] = useState(initialPage);

	return (
		<SolacePagination
			totalResults={totalResults}
			activePage={selectedPage}
			pageSize={pageSize}
			displayText={displayText}
			onPageSelection={(page) => {
				setSelectedPage(page);
				onPageSelection && onPageSelection(page);
			}}
		/>
	);
};

export const DefaultPagination = {
	render: (args) => (
		<PaginationWithState
			initialPage={8}
			totalResults={args.totalResults}
			pageSize={args.pageSize}
			displayText={args.displayText}
		/>
	)
};

export const DefaultPaginationOnFirstPage = {
	render: (args) => (
		<PaginationWithState
			initialPage={args.initialPage}
			totalResults={args.totalResults}
			pageSize={args.pageSize}
			displayText={args.displayText}
		/>
	)
};

export const DefaultPaginationOnLastPage = {
	render: (args) => (
		<PaginationWithState
			initialPage={16}
			totalResults={args.totalResults}
			pageSize={args.pageSize}
			displayText={args.displayText}
		/>
	)
};

export const DefaultPaginationSmallContainer = {
	render: (args) => (
		<div style={{ maxWidth: "600px", margin: "0 auto" }}>
			<PaginationWithState
				initialPage={8}
				totalResults={args.totalResults}
				pageSize={args.pageSize}
				displayText={args.displayText}
			/>
		</div>
	)
};

export const SmallPagination = {
	render: (args) => (
		<PaginationWithState
			initialPage={args.initialPage}
			totalResults={10}
			pageSize={args.pageSize}
			displayText={args.displayText}
		/>
	)
};

export const LargeNumberPagination = {
	render: (args) => (
		<PaginationWithState
			initialPage={995}
			totalResults={args.totalResults || 10000}
			pageSize={args.pageSize}
			displayText={args.displayText}
		/>
	)
};
