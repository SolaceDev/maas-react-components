import React, { useState } from "react";
import { Meta } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { SolacePagination } from "@SolaceDev/maas-react-components";

export default {
	title: "Under Construction/SolacePagination",
	component: SolacePagination,
	parameters: {},
	argTypes: {
		totalResults: {
			control: {
				type: "number",
				defaultValue: 156
			}
		},
		pageSize: {
			control: {
				type: "select",
				options: [10, 20, 50, 100]
			}
		},
		displayText: {
			control: {
				type: "text",
				defaultValue: "Showing ${firstItemIndex}-${lastItemIndex} of ${totalResults} results"
			}
		},
		loading: {
			control: {
				type: "boolean",
				description: "The loading state flag for pagination component, default to false"
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

const isDisabled = "Mui-disabled";

export const DefaultPagination = {
	render: (args) => (
		<PaginationWithState
			initialPage={args.initialPage}
			totalResults={args.totalResults}
			pageSize={args.pageSize}
			displayText={args.displayText}
		/>
	),

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const rightArrow = canvas.getByTestId("ArrowRightIcon").parentElement;
		const leftArrow = canvas.getByTestId("ArrowLeftIcon").parentElement;
		const text = canvas.getByText(/Showing \d+-\d+ of \d+ results/);

		// clicks through to check if the arrows are disabled at the right time
		await expect(text).toHaveTextContent("Showing 1-10 of 156 results");
		await expect(leftArrow).toHaveClass(isDisabled);
		await expect(rightArrow).not.toHaveClass(isDisabled);
		rightArrow && (await userEvent.click(rightArrow));
		await expect(text).toHaveTextContent("Showing 11-20 of 156 results");
		await expect(leftArrow).not.toHaveClass(isDisabled);
		await userEvent.click(canvas.getByText("16", { selector: "button" }));
		await expect(text).toHaveTextContent("Showing 151-156 of 156 results");
		await expect(rightArrow).toHaveClass(isDisabled);

		// Go back to the first page
		await userEvent.click(canvas.getByText("1", { selector: "button" }));
	}
};

export const CustomMessageText = {
	render: (args) => (
		<PaginationWithState
			totalResults={156}
			initialPage={args.initialPage}
			pageSize={50}
			displayText={"Showing page ${activePage} with ${pageSize} results"}
		/>
	),

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const rightArrow = canvas.getByTestId("ArrowRightIcon").parentElement;
		const text = canvas.getByText(/Showing page \d+ with \d+ results/);

		// clicks through to check if the arrows are disabled at the right time
		await expect(text).toHaveTextContent("Showing page 1 with 50 results");
		rightArrow && (await userEvent.click(rightArrow));
		await expect(text).toHaveTextContent("Showing page 2 with 50 results");
		await userEvent.click(canvas.getByText("4", { selector: "button" }));
		await expect(text).toHaveTextContent("Showing page 4 with 50 results");

		// Go back to the first page
		await userEvent.click(canvas.getByText("1", { selector: "button" }));
	}
};

export const SmallPagination = {
	render: (args) => (
		<PaginationWithState
			initialPage={args.initialPage}
			totalResults={10}
			pageSize={args.pageSize}
			displayText={args.displayText}
		/>
	),

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const rightArrow = canvas.getByTestId("ArrowRightIcon").parentElement;
		const leftArrow = canvas.getByTestId("ArrowLeftIcon").parentElement;

		await expect(leftArrow).toHaveClass(isDisabled);
		await expect(rightArrow).toHaveClass(isDisabled);
	}
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
