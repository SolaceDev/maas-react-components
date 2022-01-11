import { Popper } from "@material-ui/core";

interface SolacePopperProps {
	/**
	 * Unique identifier for the component
	 */
	id?: string;
	/**
	 *
	 */
	open: boolean;
	/**
	 * Direction of popper text TODO:?
	 */
	direction?: "ltr" | "rtl";
	/**
	 * flag whether the children will be under the DOM hierarchy of the parent component
	 */
	disablePortal?: boolean;
	/**
	 * Always keep the children in the DOM.
	 */
	keepMounted?: boolean;
	/**
	 * expose this? TODO:
	 */
	modifiers?: any;
	/**
	 * Popper placement
	 */
	placement?:
		| "auto-end"
		| "auto-start"
		| "auto"
		| "bottom-end"
		| "bottom-start"
		| "bottom"
		| "left-end"
		| "left-start"
		| "left"
		| "right-end"
		| "right-start"
		| "right"
		| "top-end"
		| "top-start"
		| "top";
	/**
	 * Options provided to the Popper.js instance TODO:??
	 */
	popperOptions?: any;
	/**
	 * A ref that points to the used popper instance TODO:?
	 */
	popperRef?: any;
	transition?: boolean;
	container?: Element | (() => Element | null) | null;
	/**
	 * The React component that displays the popover when hovered over TODO:?
	 */
	anchorEl?: any;
	/**
	 * Popper render function or node
	 */
	children: JSX.Element;
}

const SolacePopper = ({
	id,
	open = false,
	// direction = "ltr",
	disablePortal,
	keepMounted,
	modifiers,
	placement,
	popperOptions,
	popperRef,
	transition,
	container,
	anchorEl,
	children
}: SolacePopperProps) => {
	return (
		<Popper
			id={id}
			open={open}
			disablePortal={disablePortal}
			keepMounted={keepMounted}
			modifiers={modifiers}
			placement={placement}
			popperOptions={popperOptions}
			popperRef={popperRef}
			transition={transition}
			container={container}
			anchorEl={anchorEl}
		>
			{children}
		</Popper>
	);
};

export default SolacePopper;
