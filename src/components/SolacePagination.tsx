import { Pagination, styled } from "@material-ui/core";

export interface SolacePaginationProps {
	/**
	 * Flag signifying if the side panel is expanded or collapsed
	 */
	activePage: number;
	/**
	 * The desired width of the side panel
	 */
	pageSize: number;
	/**
	 * property to control which side of the main content the side panel is rendered on
	 */
	totalResults: number;
	/**
	 * Callback function to notify which page was clicked/selected by the end user
	 */
	onPageSelection: (selectedPage: number) => void;
}

const PaginationContainer = styled("div")(() => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	margin: "0px"
}));

const PageListContainer = styled("div")(() => ({
	margin: "0px"
}));

const MessageContainer = styled("p")(() => ({
	margin: "0px",
	fontSize: "13px",
	color: "rgba(0, 0, 0, 0.5)"
}));

function SolacePagination({
	activePage = 1,
	pageSize = 10,
	totalResults,
	onPageSelection
}: SolacePaginationProps): JSX.Element {
	const totalPages = Math.ceil(totalResults / pageSize);
	const firstItemIndex = (activePage - 1) * pageSize + 1;
	const lastItemIndex = Math.min(activePage * pageSize, totalResults);

	const handlePageSelection = (event: React.ChangeEvent<unknown>, page: number) => {
		if (event && page > 0) {
			onPageSelection(page);
		}
	};
	return (
		<PaginationContainer>
			<PageListContainer>
				<Pagination
					count={totalPages}
					shape="rounded"
					page={activePage}
					hideNextButton={true}
					hidePrevButton={true}
					boundaryCount={2}
					onChange={handlePageSelection}
				/>
			</PageListContainer>
			<MessageContainer>
				Showing {firstItemIndex}-{lastItemIndex} of {totalResults}
			</MessageContainer>
		</PaginationContainer>
	);
}

export default SolacePagination;
