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

import { useCallback, useEffect } from "react";

export const useOutsideClicked = (
	ref: React.RefObject<HTMLElement>,
	setRowWithOpenActionMenu: (value: string | null) => void
): void => {
	const handleClick = useCallback(
		(event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setRowWithOpenActionMenu(null);
			}
		},
		[ref, setRowWithOpenActionMenu]
	);

	useEffect(() => {
		document.addEventListener("mousedown", handleClick);

		return () => {
			document.removeEventListener("mousedown", handleClick);
			setRowWithOpenActionMenu(null);
		};
	}, [ref, handleClick, setRowWithOpenActionMenu]);
};
