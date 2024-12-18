import { Pagination, PaginationItem, styled } from "@mui/material";
import { BASE_FONT_PX_SIZES } from "../resources/typography";
import { ArrowRightIcon } from "../resources/icons/ArrowRight";
import { ArrowLeftIcon } from "../resources/icons/ArrowLeft";
import { useRef, useState, useEffect } from "react";

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
	/**
	 * loading state (renders a half transparent overlay on top of the pagination component, currently is designed to use along with table component's loading state)
	 */
	loading?: boolean;
}

const PaginationContainer = styled("div")<{ isSmall: boolean }>(({ theme, isSmall }) => ({
	width: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	margin: "0",
	position: "relative",
	padding: theme.spacing(1, 0),
	flexDirection: isSmall ? "column" : "row"
}));

const PageListContainer = styled("div")(() => ({
	margin: "0"
}));

const MessageContainer = styled("p")<{ isSmall: boolean }>(({ theme, isSmall }) => ({
	margin: isSmall ? theme.spacing(0) : theme.spacing(0, 2, 0, 0),
	fontSize: BASE_FONT_PX_SIZES.xs,
	color: theme.palette.ux.deprecated.secondary.text.wMain,
	position: isSmall ? "relative" : "absolute",
	right: isSmall ? 0 : "0",
	paddingTop: isSmall ? theme.spacing(1) : "0"
}));

const LoadingOverlay = styled("div")(() => ({
	position: "absolute",
	width: "100%",
	height: "100%",
	top: 0,
	left: 0,
	backgroundColor: "rgba(255, 255, 255, 0.45)", // temp decision on the color by uiux, not available from theme, will update once finalized
	zIndex: 2
}));

function SolacePagination({
	activePage = 1,
	pageSize = 10,
	displayText = "${firstItemIndex}-${lastItemIndex} of ${totalResults} results",
	totalResults,
	loading = false,
	onPageSelection
}: SolacePaginationProps): JSX.Element {
	const totalPages = Math.ceil(totalResults / pageSize);
	const firstItemIndex = (activePage - 1) * pageSize + 1;
	const lastItemIndex = Math.min(activePage * pageSize, totalResults);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isSmall, setIsSmall] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => {
			if (containerRef.current) {
				setIsSmall(containerRef.current.offsetWidth <= 730);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [isSmall]);

	const handlePageSelection = (event: React.ChangeEvent<unknown> | null, page: number) => {
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
		<PaginationContainer ref={containerRef} isSmall={isSmall}>
			<PageListContainer>
				<Pagination
					count={totalPages}
					shape="rounded"
					page={activePage}
					boundaryCount={2}
					onChange={handlePageSelection}
					renderItem={(item) => (
						<PaginationItem
							slots={{
								previous: ArrowLeftIcon,
								next: ArrowRightIcon
							}}
							{...item}
						/>
					)}
				/>
			</PageListContainer>
			<MessageContainer isSmall={isSmall}>{substituteMessageValues()}</MessageContainer>
			{loading && <LoadingOverlay />}
		</PaginationContainer>
	);
}

export default SolacePagination;
