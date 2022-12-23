import { constants } from "./constants";

// This file contains all the utility functions for constants used all around the application

export const getMenuItemHeight = (isMultiLine: boolean): number => {
	return isMultiLine ? constants.menuItemHeight : constants.menuItemHeightMultiline;
};

export const getGridListItemHeight = (): number => {
	return constants.GridListItemHeight;
};

export const getCloseButtonAriaLabel = (): string => {
	return constants.closeButtonAriaLabel;
};

export const getActionMenuAriaLabel = (): string => {
	return constants.actionMenuAriaLabel;
};
