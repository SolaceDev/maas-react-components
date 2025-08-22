import React, { useState, useCallback } from "react";
import { SolaceNavigationLink, SolaceNavigationUserAction } from "./SolaceNavigationBar";

export const useMobileMenu = (onMobileMenuToggle?: (isOpen: boolean) => void) => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const handleMobileMenuToggle = useCallback(() => {
		const newMenuState = !mobileMenuOpen;
		setMobileMenuOpen(newMenuState);
		onMobileMenuToggle?.(newMenuState);
	}, [mobileMenuOpen, onMobileMenuToggle]);

	return { mobileMenuOpen, handleMobileMenuToggle };
};

export const useLinkClickHandler = (handleMobileMenuToggle: () => void, mobileMenuOpen: boolean) => {
	return useCallback(
		(link: SolaceNavigationLink, event: React.MouseEvent<HTMLAnchorElement>) => {
			link.onClick?.(event);
			if (mobileMenuOpen) {
				handleMobileMenuToggle();
			}
		},
		[handleMobileMenuToggle, mobileMenuOpen]
	);
};

export const useUserActionClickHandler = () => {
	return useCallback((action: SolaceNavigationUserAction, event: React.MouseEvent<HTMLButtonElement>) => {
		action.onClick?.(event);
	}, []);
};
