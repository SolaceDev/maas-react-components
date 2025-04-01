import SolaceComponentProps from "../components/SolaceComponentProps";

/**
 * Props for the SolacePopover component.
 *
 * @extends SolaceComponentProps
 */
export interface SolacePopoverProps extends SolaceComponentProps {
	/**
	 * Optional unique identifier for the popover.
	 */
	id?: string;

	/**
	 * Optional unique key for the popover.
	 */
	key?: string;

	/**
	 * The element to which the popover is anchored.
	 * Can be `null` or an `Element`.
	 */
	anchorElement?: null | Element;

	/**
	 * The position of the anchor element in terms of top and left coordinates.
	 */
	anchorPosition?: { top: number; left: number };

	/**
	 * The origin point on the anchor element where the popover is aligned.
	 *
	 * @property vertical - Vertical alignment, can be "center", "top", "bottom", or a numeric value.
	 * @property horizontal - Horizontal alignment, can be "center", "right", "left", or a numeric value.
	 */
	anchorOrigin: { vertical: "center" | "top" | "bottom" | number; horizontal: "center" | "right" | "left" | number };

	/**
	 * The origin point on the popover where it is aligned relative to the anchor element.
	 *
	 * @property vertical - Vertical alignment, can be "center", "top", "bottom", or a numeric value.
	 * @property horizontal - Horizontal alignment, can be "center", "right", "left", or a numeric value.
	 */
	transformOrigin: { vertical: "center" | "top" | "bottom" | number; horizontal: "center" | "right" | "left" | number };

	/**
	 * Whether the popover is open or not.
	 */
	open: boolean;

	/**
	 * The content to be displayed inside the popover.
	 */
	children: JSX.Element;

	/**
	 * Callback function triggered when the popover is closed.
	 *
	 * @param event - The mouse event that triggered the close action.
	 */
	onClose?: (event: React.MouseEvent<HTMLDivElement>) => void;

	/**
	 * The margin threshold for the popover's positioning.
	 */
	marginThreshold?: number;

	/**
	 * Whether the popover should activate on hover.
	 */
	activateOnHover?: boolean;
}
