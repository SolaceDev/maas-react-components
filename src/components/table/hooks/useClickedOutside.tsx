import { useCallback, useEffect } from "react";

export const useOutsideClicked = (
	ref: React.RefObject<HTMLElement>,
	setRowWithOpenActionMenu: (value: any) => void
): void => {
	const handleClick = useCallback(
		(event) => {
			if (ref.current && !ref.current.contains(event.target)) {
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
