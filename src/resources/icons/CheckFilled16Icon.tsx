import { IconProps } from "./IconProps";
import { SvgIcon } from "@mui/material";
import { useTheme } from "@mui/material";

export function CheckFilled16Icon({ size, fill }: IconProps): JSX.Element {
	const theme = useTheme();
	return (
		<SvgIcon
			sx={{ width: `${size}px`, height: `${size}px`, background: theme.palette.ux.background.w10 }}
			viewBox="0 0 16 16"
		>
			<g clipPath="url(#clip0_8332_25903)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M14.6668 8C14.6668 11.6819 11.6821 14.6667 8.00016 14.6667C4.31826 14.6667 1.3335 11.6819 1.3335 8C1.3335 4.3181 4.31826 1.33333 8.00016 1.33333C11.6821 1.33333 14.6668 4.3181 14.6668 8ZM6.84111 11.404L12.2361 6.00901L11.2933 5.0662L6.84049 9.51904L4.70569 7.38708L3.76351 8.33052L6.84111 11.404Z"
					fill={fill}
				/>
			</g>
			<defs>
				<clipPath id="clip0_8332_25903">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</SvgIcon>
	);
}
