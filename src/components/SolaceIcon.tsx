import { SvgIcon } from "@material-ui/core";
import { SolaceIconProps } from "../types/solaceIcon";

/**
 * Helper function to retrieve a icon using the maas-icon library
 * This wraps the svg in a react component, so theme and other variables can be easily controlled.
 * Please see https://mui.com/api/svg-icon/ to view all the props supported.
 * @param props SolaceIcon
 * @returns JSX.Element
 */
export default function SolaceIcon(props: SolaceIconProps): JSX.Element {
	const { name, ...rest } = props;
	return (
		<SvgIcon {...rest}>
			<use xlinkHref={`#${name}`} />
		</SvgIcon>
	);
}
