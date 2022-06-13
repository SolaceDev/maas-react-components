import React, { useState, useEffect } from "react";

// after attach the hook's onScrollHandler to onScroll event handler of any html element,
// this custom hook returns mask-image styles and scroll positions in one of following scroll position values: isTop, isBottom or isBetween
export function useScrollIndicator() {
	const [scrollTop, setScrollTop] = useState(0);
	const [scrollHeight, setScrollHeight] = useState(0);
	const [clientHeight, setClientHeight] = useState(0);
	const [scrollReset, setScrollReset] = useState(false);

	// scroll event handler
	const onScrollHandler = (event: React.SyntheticEvent) => {
		setScrollTop((event.target as HTMLElement).scrollTop);
		setScrollHeight((event.target as HTMLElement).scrollHeight);
		setClientHeight((event.target as HTMLElement).clientHeight);
	};

	useEffect(() => {
		if (scrollReset && scrollTop > 0) {
			setScrollTop(0);
			setScrollReset(false);
		}
	}, [scrollReset, scrollTop]);

	// reset scrollTop, scrollHeight, and clientHeight to 0
	function resetScrollPosition() {
		setScrollReset(true);
		setScrollTop(0);
		setScrollHeight(0);
		setClientHeight(0);
	}

	// returns the maskImage style based on one of following scroll positions: isTop, isBottom or isBetween
	function getMaskImage() {
		const scrollPosition = getScrollPosition();

		// apply fade effect using mask-image
		const topFade = "linear-gradient(to top, black 85%, transparent 100%)";
		const bottomFade = "linear-gradient(to bottom, black 85%, transparent 100%)";
		const betweenFade = "linear-gradient(transparent 0%, black 15%, black 85%, transparent 100%)";

		let maskImage = "none";
		if (scrollPosition === "isTop") {
			maskImage = bottomFade;
		} else if (scrollPosition === "isBetween") {
			maskImage = betweenFade;
		} else if (scrollPosition === "isBottom") {
			maskImage = topFade;
		}
		return maskImage;
	}

	// returns the scroll position in one of following string values: isTop, isBottom or isBetween
	function getScrollPosition() {
		const isBottom = clientHeight === scrollHeight - scrollTop;
		const isTop = scrollTop === 0;
		const isBetween = scrollTop > 0 && clientHeight < scrollHeight - scrollTop;

		let scrollPosition = "";
		if (isTop) {
			scrollPosition = "isTop";
		} else if (isBetween) {
			scrollPosition = "isBetween";
		} else if (isBottom) {
			scrollPosition = "isBottom";
		}
		return scrollPosition;
	}

	return {
		maskImage: getMaskImage(),
		scrollPosition: getScrollPosition(),
		resetScrollPosition,
		onScrollHandler
	};
}
