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

import { useState, useEffect, useCallback } from "react";

// after attach the hook's onScrollHandler to onScroll event handler of any html element,
// this custom hook returns mask-image styles and scroll positions in one of following scroll position values: isTop, isBottom or isBetween
export function useScrollIndicator() {
	const [scrollTop, setScrollTop] = useState(0);
	const [scrollHeight, setScrollHeight] = useState(0);
	const [offsetHeight, setOffsetHeight] = useState(0);
	const [scrollReset, setScrollReset] = useState(false);

	// scroll event handler
	const onScrollHandler = useCallback((event: Event) => {
		setScrollTop(Math.round((event.target as HTMLElement).scrollTop));
		setScrollHeight((event.target as HTMLElement).scrollHeight);
		setOffsetHeight((event.target as HTMLElement).offsetHeight);
	}, []);

	useEffect(() => {
		if (scrollReset && scrollTop > 0) {
			setScrollTop(0);
			setScrollReset(false);
		}
	}, [scrollReset, scrollTop]);

	// reset scrollTop, scrollHeight, and clientHeight to 0
	const resetScrollPosition = useCallback(() => {
		setScrollReset(true);
		setScrollTop(0);
		setScrollHeight(0);
		setOffsetHeight(0);
	}, []);

	// returns the scroll position in one of following string values: isTop, isBottom or isBetween
	const getScrollPosition = useCallback(() => {
		const isBottom = offsetHeight === scrollHeight - scrollTop;
		const isTop = scrollTop === 0;
		const isBetween = scrollTop > 0 && offsetHeight < scrollHeight - scrollTop;

		let scrollPosition = "";
		if (isTop) {
			scrollPosition = "isTop";
		} else if (isBetween) {
			scrollPosition = "isBetween";
		} else if (isBottom) {
			scrollPosition = "isBottom";
		}
		return scrollPosition;
	}, [offsetHeight, scrollHeight, scrollTop]);

	// returns the maskImage style based on one of following scroll positions: isTop, isBottom or isBetween
	const getMaskImage = useCallback(() => {
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
	}, [getScrollPosition]);

	return {
		maskImage: getMaskImage(),
		scrollPosition: getScrollPosition(),
		resetScrollPosition,
		onScrollHandler
	};
}
