import { useCallback, useEffect } from "react";

export const useOutsideClicked = (ref: React.RefObject<HTMLElement>, setRowWithOpenActionMenu: Function): void => {
	const handleClick = useCallback(
		(event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setRowWithOpenActionMenu();
			}
		},
		[ref, setRowWithOpenActionMenu]
	);

	useEffect(() => {
		document.addEventListener("mousedown", handleClick);

		return () => {
			document.removeEventListener("mousedown", handleClick);
			setRowWithOpenActionMenu();
		};
	}, [ref, handleClick, setRowWithOpenActionMenu]);
};
