import { Tooltip, TooltipProps } from "@material-ui/core";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";

interface SolaceToolTip extends Omit<TooltipProps, "children"> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children?: React.ReactElement<any, any>;
}

/**
 * SolaceToolTip Component
 * This component provides question mark icon by default to be used as tooltip.
 * If custom children element is passed the default icon would be replaced by that.
 * @interface SolaceToolTip
 * @param props
 * @returns JSX.Element
 *
 */
export default function SolaceToolTip(props: SolaceToolTip): JSX.Element {
	return <Tooltip {...props}>{props?.children ?? <HelpOutlineOutlinedIcon fontSize="small" />}</Tooltip>;
}

SolaceToolTip.defaultProps = {
	placement: "right"
};
