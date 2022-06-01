import { IconProps } from "./IconProps";
import { SvgIcon } from "@mui/material";

const ExpandIcon = ({ size, fill }: IconProps): JSX.Element => {
	return (
		<SvgIcon sx={{ width: `${size}px`, height: `${size}px`, fill: "none" }} viewBox="0 0 24 24">
			<g transform="translate(3,3)">
				<path
					d="M7 18.5V16.5H3.41L7.91 12L6.5 10.59L2 15.09V11.5H0V18.5H7ZM11.5 8.41L16 3.91V7.5H18V0.5H11V2.5H14.59L10.09 7L11.5 8.41Z"
					fill={fill}
				/>
			</g>
		</SvgIcon>
	);
};

export default ExpandIcon;
