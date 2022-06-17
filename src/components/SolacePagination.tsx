import { Pagination, styled } from "@mui/material";

export interface SolacePaginationProps {
	/**
	 * Flag signifying if the side panel is expanded or collapsed
	 */
	activePage?: number;
	/**
	 * The desired width of the side panel
	 */
	pageSize?: number;
	/**
	 * property to control which side of the main content the side panel is rendered on
	 */
	totalResults: number;
	/**
	 * The string template to use for communicating pagination details. Use the following placeholders
	 * to substitute values if and where needed
	 *  - firstItemIndex: index of the first item being displayed
	 *  - lastItemIndex: index of the last item being displayed
	 *  - totalResults: total number of items that are paginated
	 *  - pageSize: the number of items currently rendered
	 *  - activePage: the currently selected page number
	 *
	 *  Ex: "Showing ${firstItemIndex}-${lastItemIndex} of ${totalResults} results" would result in:
	 *  -> Showing 1-10 of 156 results
	 */
	displayText?: string;
	/**
	 * Callback function to notify which page was clicked/selected by the end user
	 */
	onPageSelection?: (selectedPage: number) => void;
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

const MessageContainer = styled("p")(({ theme }) => ({
	margin: "0px",
	fontSize: "13px",
	color: theme.palette.ux.deprecated.secondary.text.wMain
}));

function SolacePagination({
	activePage = 1,
	pageSize = 10,
	displayText = "Showing ${firstItemIndex}-${lastItemIndex} of ${totalResults} results",
	totalResults,
	onPageSelection
}: SolacePaginationProps): JSX.Element {
	const totalPages = Math.ceil(totalResults / pageSize);
	const firstItemIndex = (activePage - 1) * pageSize + 1;
	const lastItemIndex = Math.min(activePage * pageSize, totalResults);

	const handlePageSelection = (event: React.ChangeEvent<unknown>, page: number) => {
		if (event && page > 0 && onPageSelection) {
			onPageSelection(page);
		}
	};

	const substituteMessageValues = () => {
		const firstItemString = displayText.replace("${firstItemIndex}", `${firstItemIndex}`);
		const lastItemString = firstItemString.replace("${lastItemIndex}", `${lastItemIndex}`);
		const pageSizeText = lastItemString.replace("${pageSize}", `${pageSize}`);
		const activePageText = pageSizeText.replace("${activePage}", `${activePage}`);
		return activePageText.replace("${totalResults}", `${totalResults}`);
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
			<MessageContainer>{substituteMessageValues()}</MessageContainer>
		</PaginationContainer>
	);
}

export default SolacePagination;
