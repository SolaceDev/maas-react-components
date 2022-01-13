import { Tooltip, Fade, styled, TooltipProps } from "@material-ui/core";
import SolaceComponentProps from "./SolaceComponentProps";

const ToBeStyledTooltip = ({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className, tooltip: className }} />
);
const StyledTooltip = styled(ToBeStyledTooltip)(({ theme }) => theme.mixins.formComponent_SolacePopover);

interface SolacePopoverProps extends SolaceComponentProps {
	/**
	 * This prop is used to help implement the accessibility logic. If you don't provide this prop. It falls back to a randomly generated id by Mui
	 */
	id?: string;
	/**
	 * 	Popover title. Zero-length titles string are never displayed.
	 */
	title?: JSX.Element;
	/**
	 * Popover reference element. Note: Needs to be able to hold a ref.
	 */
	children: JSX.Element;
	/**
	 * Disable listener to show popover when referenced element is hovered, default to false
	 */
	disableHoverListener?: boolean;
	/**
	 * 	Popover placement.
	 */
	placement?:
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
}

const SolacePopover = ({
	id,
	title,
	placement,
	disableHoverListener = false,
	dataQa,
	dataTags,
	children
}: SolacePopoverProps) => {
	return (
		<StyledTooltip
			id={id}
			title={title || ""}
			data-qa={dataQa}
			data-tags={dataTags}
			disableHoverListener={disableHoverListener}
			enterDelay={500}
			enterNextDelay={0}
			leaveDelay={150}
			placement={placement}
			TransitionComponent={Fade}
			TransitionProps={{ timeout: { enter: 150, exit: 500 } }}
		>
			{children}
		</StyledTooltip>
	);
};

export default SolacePopover;
